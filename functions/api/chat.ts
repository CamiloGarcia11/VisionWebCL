/**
 * Cloudflare Pages Function for VisionWeb AI RAG Chatbot
 * Route: /api/chat
 * Runs on Cloudflare Edge Runtime with access to context.env.GEMINI_API_KEY
 */

import { retrieveRelevantContext, findInstantResponse } from "../../src/lib/rag/knowledge";

interface Env {
  GEMINI_API_KEY?: string;
  [key: string]: any;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Modelos ultrarrápidos para Edge Runtime (sub-segundo a ~1.2s)
const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite-preview",
  "gemini-3.1-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
];

const SYSTEM_PROMPT = `Eres el Asesor Virtual Oficial de VisionWeb (estudio boutique de desarrollo web y software en Colombia).
Tu objetivo es asesorar a clientes potenciales con total claridad, calidez, profesionalismo y confianza, respondiendo dudas sobre nuestros precios, metodología y aspectos técnicos.

REGLAS DE FORMATO ESTRICTAS:
1. NUNCA utilices almohadillas de títulos markdown como "###" o "##" o "#". Se ven feas en el chat.
2. Para resaltar o titular usa negritas como **Landing Page:** o **¿Qué incluye?:**, emojis limpios y listas con viñetas "•".

PRECIOS Y MODELO DE CONTRATO OFICIALES:
No cobramos tarifa inicial de desarrollo o setup. El modelo es suscripción mensual fija con permanencia mínima de 6 meses obligatorios, con fecha de pago mensual acordada:
1. **Landing Page (Página de Ventas Directa):**
   - Tarifa: **$150.000 COP al mes**.
   - Permanencia: 6 meses continuos obligatorios.
   - Tiempo de entrega: 3 a 5 días hábiles.
   - Enfoque: Alta conversión para anuncios en redes (Instagram/TikTok), llamadas a la acción, formulario y botón a WhatsApp.
   - Incluye: Hosting cloud de alta velocidad, certificado SSL 24/7 y hasta 4 horas mensuales de soporte técnico y mantenimiento.
2. **Página Web Normal (Corporativa con Secciones):**
   - Tarifa: **$200.000 COP al mes**.
   - Permanencia: 6 meses continuos obligatorios.
   - Tiempo de entrega: 7 a 10 días hábiles.
   - Enfoque: Secciones completas (Inicio, Nosotros, Servicios, Trabajos, Contacto) y optimización para Google (SEO).
   - Incluye: Hosting cloud, SSL 24/7 y hasta 4 horas mensuales de soporte y cambios.
3. **Página de E-commerce (Tienda Online):**
   - Tarifa: **$270.000 COP al mes**.
   - Permanencia: 6 meses continuos obligatorios.
   - Tiempo de entrega: 12 a 16 días hábiles.
   - Enfoque: Catálogo organizado, carrito de compras, gestión de inventario/pedidos y pasarela de cobros (Nequi, Daviplata, Bancolombia, PSE y tarjetas).
   - Incluye: Hosting cloud, base de datos segura, SSL 24/7 y hasta 4 horas al mes de soporte para nuevos productos y promociones.

SERVICIOS POR COTIZACIÓN PERSONALIZADA:
- **Portafolios UGC**, **Linktree**, **Sistemas a Medida (ERP)**.
- Se manejan por **cotización directa y personalizada**. Redirige a WhatsApp (+57 305 231 1490).

CONDICIONES CLAVE Y PROPIEDAD:
- **Fecha de pago:** Se acuerda una fecha fija de pago de cada mes.
- **Propiedad del código:** Concluidos los 6 meses mínimos, si el cliente opta por no renovar, TODO el código, diseño y recursos pasan a ser de su propiedad exclusiva.
- **Gastos externos:** El dominio web (.com aprox. $50.000 - $80.000 COP / 10€ - 20€ al año, registrado a nombre del cliente).

FORMATO DE RESPUESTA OBLIGATORIO:
Debes responder SIEMPRE en formato JSON válido:
{
  "reply": "Tu respuesta al cliente con formato limpio (sin '###')",
  "needsHumanSupport": true o false,
  "supportReason": "Breve motivo si requiere soporte humano, o null",
  "whatsappMessage": "Texto pre-llenado para WhatsApp si needsHumanSupport es true, o null"
}`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const apiKey = env.GEMINI_API_KEY || (typeof process !== "undefined" && process.env?.GEMINI_API_KEY);

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply:
            "El servicio de asistencia virtual está temporalmente en configuración. Puedes contactar directamente a nuestro equipo por WhatsApp al +57 305 231 1490.",
          needsHumanSupport: true,
          whatsappMessage: "Hola VisionWeb, me gustaría recibir asesoría sobre sus servicios de páginas web.",
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const body = (await request.json().catch(() => ({}))) as { messages?: ChatMessage[] };
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // 1. Detección instantánea (0ms) en el Edge
    const instantMatch = findInstantResponse(lastUserMsg);
    if (instantMatch) {
      return new Response(
        JSON.stringify({
          reply: instantMatch.reply,
          needsHumanSupport: instantMatch.needsHumanSupport,
          supportReason: instantMatch.supportReason || null,
          whatsappMessage: instantMatch.whatsappMessage || null,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const ragContext = retrieveRelevantContext(lastUserMsg);
    const enrichedSystemInstruction = ragContext
      ? `${SYSTEM_PROMPT}\n\n=== INFORMACIÓN OFICIAL ESPECÍFICA ===\n${ragContext}`
      : SYSTEM_PROMPT;

    const recentMessages = messages.slice(-5);
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    for (const msg of recentMessages) {
      const role = msg.role === "assistant" ? "model" : "user";
      contents.push({
        role,
        parts: [{ text: msg.content }],
      });
    }

    let geminiResponseJson = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: enrichedSystemInstruction }],
            },
            contents,
            generationConfig: {
              temperature: 0.3,
              topP: 0.9,
              maxOutputTokens: 350,
              responseMimeType: "application/json",
            },
          }),
          signal: AbortSignal.timeout(3200),
        });

        if (!response.ok) {
          continue;
        }

        const data: any = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          try {
            geminiResponseJson = JSON.parse(rawText);
            break;
          } catch {
            const cleanText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
            geminiResponseJson = JSON.parse(cleanText);
            break;
          }
        }
      } catch {
        continue;
      }
    }

    if (geminiResponseJson && geminiResponseJson.reply) {
      return new Response(
        JSON.stringify({
          reply: geminiResponseJson.reply,
          needsHumanSupport: Boolean(geminiResponseJson.needsHumanSupport),
          supportReason: geminiResponseJson.supportReason || null,
          whatsappMessage:
            geminiResponseJson.whatsappMessage ||
            `Hola VisionWeb, tengo una consulta sobre: "${lastUserMsg.slice(0, 80)}"`,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        reply:
          "¡Hola! Con gusto te oriento. En VisionWeb creamos páginas web de ventas ($150.000 COP/mes), sitios corporativos ($200.000 COP/mes) y tiendas online ($270.000 COP/mes) con contrato mínimo de 6 meses y soporte mensual incluido. Para portafolios UGC, Linktree o sistemas ERP te damos cotización personalizada.",
        needsHumanSupport: true,
        whatsappMessage: `Hola VisionWeb, me gustaría recibir asesoría sobre: ${lastUserMsg.slice(0, 80)}`,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch {
    return new Response(
      JSON.stringify({
        reply:
          "Ocurrió una intermitencia momentánea. Si deseas atención inmediata, por favor contáctanos directamente a nuestro WhatsApp oficial.",
        needsHumanSupport: true,
        whatsappMessage: "Hola VisionWeb, me gustaría consultar información sobre el desarrollo de una página web.",
      }),
      { status: 200, headers: corsHeaders }
    );
  }
}
