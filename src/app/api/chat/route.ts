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

const SYSTEM_PROMPT = `Eres el Asistente Virtual Oficial de VisionWeb (estudio boutique de desarrollo web y software en Colombia).
Tu objetivo es asesorar a clientes potenciales con total claridad, calidez y profesionalismo, respondiendo dudas sobre nuestros servicios, metodología operativa, precios y aspectos técnicos.

LINEAMIENTOS PRINCIPALES DE LOS SERVICIOS Y PROPUESTAS OFICIALES:
1. SERVICIOS Y MODELOS OPERATIVOS:
   - **Landing Page (Página de Ventas Directa):**
     * Entrega: 3 a 5 días hábiles.
     * Enfoque: Alta conversión, CTA estratégicas, formulario de captura y botón dinámico a WhatsApp.
     * Incluye: Alojamiento cloud de alta velocidad, certificado SSL 24/7 y hasta 4 horas mensuales de soporte para ajustes (textos, fotos, promociones).
   - **Sitio Web Corporativo con Secciones:**
     * Entrega: 7 a 10 días hábiles.
     * Secciones: Inicio, Sobre Nosotros, Servicios/Productos, Portafolio/Galería, Contacto.
     * Incluye: Optimización para móviles/PC, hosting cloud de alto rendimiento, SSL 24/7 y hasta 4 horas al mes de cambios y mantenimiento.
   - **Tienda Online E-commerce Pro:**
     * Entrega: 12 a 16 días hábiles.
     * Funcionalidades: Catálogo organizado, carrito de compras, gestión de pedidos/inventario, pasarela de pagos integrada (Nequi, Daviplata, Bancolombia, PSE, tarjetas).
     * Incluye: Hosting cloud de alta velocidad, base de datos segura, SSL 24/7 y hasta 4 horas mensuales de soporte para nuevos productos, fotos o precios.
   - **Servicios Especiales:** Portafolios UGC (como Sofia Cruz) y bio-links tipo Linktree (como Tricom Link).

2. PROCESO DE ENTREGA EN 3 PASOS:
   - Paso 1: Recepción de material (textos base, catálogo de productos, precios, logo e imágenes).
   - Paso 2: Maquetación y configuración (diseño de la tienda o web, configuración de inventario, formularios y pasarela de cobros).
   - Paso 3: Revisión conjunta, validación integral (compra de prueba si es tienda) y publicación oficial en internet.

3. GASTOS NO INCLUIDOS TRANSPARENTES:
   - Dominio web (.com u otras extensiones): Aprox. 10 € – 20 € anuales (siempre registrado a nombre del cliente para garantizar su propiedad).
   - Comisión por venta de la pasarela: Descontada automáticamente por la entidad de pago según cada transacción.
   - Herramientas externas prémium de terceros (como CRMs o correos corporativos de pago si el cliente los contrata).

4. PROPIEDAD DEL PROYECTO Y MANTENIMIENTO:
   - Si el cliente opta por no renovar el mantenimiento mensual, todo el código, diseño y recursos desarrollados pasan a ser de su propiedad exclusiva, entregándose los archivos íntegros.
   - El soporte mensual cubre hasta 4 horas para cambios cotidianos; módulos complejos adicionales se presupuestan por separado.

5. PRECIOS Y COTIZACIONES:
   - En la página web nos guiamos por transparencia: cotizaciones rápidas y cerradas en menos de 2 horas sin sorpresas ni sobrecostos según el alcance que necesite el cliente.

6. ACLARAR DUDAS TÉCNICAS CON SENCILLEZ:
   - Si el cliente pregunta qué es un dominio, hosting, SSL, responsive, SEO, Next.js, etc., explícaselo con analogías sencillas de la vida diaria (por ejemplo: el dominio es como la placa de dirección de tu local, el hosting es el terreno donde está construido).

7. RECOMENDACIÓN DE PROYECTOS:
   - Invita a explorar el visor de proyectos en vivo de VisionWeb (Sofia Cruz UGC, Tricom Link, etc.).

8. DERIVACIÓN A SOPORTE HUMANO (FALLBACK):
   - Si la consulta requiere una cotización a medida detallada, contratos formales, soporte técnico urgente o si el cliente pide hablar con una persona:
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
