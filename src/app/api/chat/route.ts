import { NextRequest, NextResponse } from "next/server";
import { retrieveRelevantContext, KNOWLEDGE_BASE } from "@/lib/rag/knowledge";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const CANDIDATE_MODELS = [
  "gemini-flash-latest",
  "gemini-3.8-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash"
];

const SYSTEM_PROMPT = `Eres el Asistente Virtual Oficial de VisionWeb (estudio de desarrollo web y software en Colombia).
Tu objetivo es asesorar a clientes potenciales con total claridad, calidez y profesionalismo, respondiendo dudas sobre nuestros servicios, metodología, precios y aspectos técnicos.

LINEAMIENTOS PRINCIPALES:
1. PERSONALIDAD & TONO:
   - Cercano, profesional, seguro, empático y comercial.
   - Da total confianza y tranquilidad al cliente.
   - Habla en español latino natural (evita tecnicismos innecesarios o explícalos de forma muy amigable).

2. ACLARAR DUDAS TÉCNICAS:
   - Si el cliente pregunta qué es un dominio, hosting, SSL, responsive, SEO, Next.js, etc., explícaselo con analogías sencillas de la vida diaria (por ejemplo: el dominio es como la placa de dirección de tu local, el hosting es el terreno donde está construido).

3. PRECIOS, TIEMPOS Y FILOSOFÍA:
   - Landing page / Página de ventas: 3 a 5 días hábiles.
   - Página Web Completa (Corporativa): 7 a 10 días hábiles.
   - Tienda Online (E-commerce): 12 a 16 días hábiles.
   - Todo es 100% PROPIEDAD DEL CLIENTE, entregamos todos los accesos completos y NO cobramos mensualidades forzadas de mantenimiento.
   - Pagos: 50% para arrancar y 50% contra entrega final a satisfacción. Cobros por Bancolombia, Nequi, Daviplata, PSE y tarjetas.

4. RECOMENDACIÓN DE PROYECTOS:
   - Si preguntan por trabajos previos o proyectos, menciónales que pueden interactuar con ellos directamente en el visor de proyectos de nuestra página (por ejemplo: el portafolio UGC de Sofia Cruz o el bio-link de Tricom Link).

5. DERIVACIÓN A SOPORTE HUMANO (FALLBACK):
   - Si la consulta requiere una cotización a medida con especificaciones complejas, contratos legales, soporte técnico especializado, o si el cliente solicita explícitamente hablar con una persona humana:
   - Responde de forma cordial y marca "needsHumanSupport": true.
   - Redacta un "whatsappMessage" corto y profesional que resuma la consulta para que el cliente solo tenga que hacer clic y enviarlo.
   - Nuestro número de soporte por WhatsApp es +57 305 231 1490.

FORMATO DE RESPUESTA OBLIGATORIO:
Debes responder SIEMPRE en formato JSON válido con la siguiente estructura:
{
  "reply": "Tu respuesta al cliente con formato markdown amigable (listas, negritas, saltos de línea)",
  "needsHumanSupport": true o false,
  "supportReason": "Breve motivo si requiere soporte humano, o null",
  "whatsappMessage": "Texto pre-llenado para WhatsApp si needsHumanSupport es true, o null"
}`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "El servicio de inteligencia artificial está temporalmente en configuración. Puedes contactar directamente a nuestro equipo por WhatsApp al +57 305 231 1490.",
          needsHumanSupport: true,
          whatsappMessage: "Hola VisionWeb, me gustaría recibir asesoría sobre sus servicios de páginas web.",
        },
        { status: 200 }
      );
    }

    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Obtener la última pregunta del usuario
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // Recuperar contexto relevante RAG
    const ragContext = retrieveRelevantContext(lastUserMsg);

    // Preparar el historial de mensajes para Gemini API
    // Gemini usa { role: "user" | "model", parts: [{ text: string }] }
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    // Agregar el contexto RAG enriquecido al inicio de la conversación
    const enrichedSystemInstruction = `${SYSTEM_PROMPT}\n\n=== BASE DE CONOCIMIENTO RAG RELEVANTE ===\n${ragContext}`;

    // Limitar el historial a los últimos 6 mensajes para rapidez y precisión
    const recentMessages = messages.slice(-6);

    for (const msg of recentMessages) {
      const role = msg.role === "assistant" ? "model" : "user";
      contents.push({
        role,
        parts: [{ text: msg.content }],
      });
    }

    let lastError = null;
    let geminiResponseJson = null;

    // Intentar con los modelos disponibles hasta que uno responda con éxito
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
              temperature: 0.6,
              topP: 0.95,
              responseMimeType: "application/json",
            },
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          lastError = errData;
          // Si el modelo da 404 o deprecado, continuar con el siguiente
          continue;
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          try {
            geminiResponseJson = JSON.parse(rawText);
            break;
          } catch {
            // Si viene con backticks ```json ... ```
            const cleanText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
            geminiResponseJson = JSON.parse(cleanText);
            break;
          }
        }
      } catch (err: any) {
        lastError = err?.message || err;
      }
    }

    if (geminiResponseJson && geminiResponseJson.reply) {
      return NextResponse.json({
        reply: geminiResponseJson.reply,
        needsHumanSupport: Boolean(geminiResponseJson.needsHumanSupport),
        supportReason: geminiResponseJson.supportReason || null,
        whatsappMessage:
          geminiResponseJson.whatsappMessage ||
          `Hola VisionWeb, tengo una consulta sobre: "${lastUserMsg.slice(0, 80)}"`,
      });
    }

    // Fallback amigable si la API no pudo responder en JSON
    return NextResponse.json({
      reply:
        "¡Hola! Con gusto te ayudo. En VisionWeb creamos páginas web de ventas, sitios corporativos y tiendas online 100% de tu propiedad, listas en pocos días y sin mensualidades forzadas. Si deseas una cotización personalizada o hablar con nuestro equipo, podemos conectarte directamente con nuestro asesor.",
      needsHumanSupport: true,
      whatsappMessage: `Hola VisionWeb, me gustaría recibir asesoría sobre: ${lastUserMsg.slice(0, 80)}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        reply:
          "Ocurrió una intermitencia momentánea. Si deseas atención inmediata, por favor contáctanos directamente a nuestro WhatsApp oficial.",
        needsHumanSupport: true,
        whatsappMessage: "Hola VisionWeb, me gustaría consultar información sobre el desarrollo de una página web.",
      },
      { status: 200 }
    );
  }
}
