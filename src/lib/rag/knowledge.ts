/**
 * Base de Conocimiento RAG para el Asistente Virtual de VisionWeb
 * Integra los precios y condiciones oficiales:
 * - Landing Page: 6 meses obligatorios a $150.000 COP / mes.
 * - Páginas Web normales (con secciones): 6 meses obligatorios a $200.000 COP / mes.
 * - Tienda Online E-commerce: 6 meses obligatorios a $270.000 COP / mes.
 * - Fecha de pago mensual acordada.
 * - Portafolios UGC, Linktree y Sistemas a medida (ERP): Por cotización personalizada.
 */

export interface KnowledgeItem {
  id: string;
  category: "planes" | "proceso" | "tecnico" | "garantias" | "portafolio" | "contacto" | "empresa" | "operaciones";
  title: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // 1. EMPRESA Y FILOSOFÍA
  {
    id: "sobre-visionweb",
    category: "empresa",
    title: "¿Quiénes somos y qué es VisionWeb?",
    keywords: ["visionweb", "quienes somos", "empresa", "estudio", "agencia", "donde estan", "colombia", "desarrollo"],
    content: `VisionWeb es un estudio boutique especializado en desarrollo de software, diseño web de alto impacto y comercio electrónico con base en Colombia.
Nos caracterizamos por crear páginas rápidas que abren en 1 segundo, con diseños de nivel internacional, arquitectura en la nube de alta disponibilidad y enfoque en conversión para convertir visitantes en clientes reales.`
  },

  // 2. MODELO DE PRECIOS Y TARIFAS MENSUALES
  {
    id: "precios-y-planes",
    category: "planes",
    title: "Precios Oficiales, Planes Mensuales y Condiciones de Contrato",
    keywords: ["precio", "precios", "cuanto vale", "cuanto cuesta", "tarifa", "mensualidad", "cop", "costo", "planes", "contrato", "permanencia"],
    content: `Nuestros Precios y Planes Oficiales (Modelo de Suscripción Mensual):
No cobramos tarifa inicial de desarrollo (setup). Manejamos una mensualidad fija accesible con contrato de permanencia mínima de 6 meses obligatorios, con fecha de pago mensual acordada:

1. Landing Page (Página de Ventas Directa):
   • Tarifa: $150.000 COP al mes.
   • Permanencia mínima: 6 meses continuos obligatorios.
   • Tiempo de entrega: 3 a 5 días hábiles.
   • Incluye: Diseño de alta conversión para anuncios en Instagram/TikTok, botones a WhatsApp, formularios, hosting cloud de alta velocidad, certificado SSL 24/7 y hasta 4 horas al mes de mantenimiento y soporte técnico.

2. Página Web Normal (Corporativa con Secciones):
   • Tarifa: $200.000 COP al mes.
   • Permanencia mínima: 6 meses continuos obligatorios.
   • Tiempo de entrega: 7 a 10 días hábiles.
   • Incluye: Diseño completo estructurado en secciones (Inicio, Nosotros, Servicios, Trabajos, Contacto), optimización para Google (SEO), hosting cloud, certificado SSL 24/7 y hasta 4 horas al mes de mantenimiento y soporte.

3. Tienda Online E-commerce:
   • Tarifa: $270.000 COP al mes.
   • Permanencia mínima: 6 meses continuos obligatorios.
   • Tiempo de entrega: 12 a 16 días hábiles.
   • Incluye: Catálogo completo de productos, carrito de compras, gestión de inventario y pedidos, pasarela de pagos conectada (Nequi, Daviplata, Bancolombia, PSE y tarjetas), hosting cloud, SSL 24/7 y hasta 4 horas al mes de soporte técnico para nuevos productos, fotos y promociones.

4. Servicios Especiales por Cotización Personalizada:
   • Portafolios UGC (para creadores de contenido).
   • Páginas Linktree / Bio-links de lujo.
   • Sistemas a Medida (como ERP, control de inventarios, plataformas empresariales).
   • Estos servicios no tienen tarifa mensual fija estándar; se presupuestan por cotización directa con nuestro asesor.`
  },

  // 3. PROPUESTA OPERATIVA: LANDING PAGE
  {
    id: "propuesta-landing-page",
    category: "planes",
    title: "Detalles del Plan Landing Page ($150.000 COP/mes)",
    keywords: ["landing", "landing page", "pagina de ventas", "150000", "anuncios", "un solo producto"],
    content: `Plan Landing Page:
• Precio: $150.000 COP mensuales (permanencia mínima 6 meses).
• Entrega: 3 a 5 días hábiles.
• Enfoque comercial: Estructurada específicamente para cerrar clientes rápidos desde anuncios de Instagram, TikTok o Google.
• Incluye:
  - Diseño moderno optimizado para celular y computador.
  - Botón directo y dinámico a tu WhatsApp y formulario de contacto.
  - Alojamiento cloud de alta velocidad y certificado de seguridad SSL 24/7.
  - Hasta 4 horas al mes de soporte técnico para ajustes (cambiar textos, actualizar fotos o promociones).
• Gastos no incluidos: Dominio web (.com aprox. $50.000 - $80.000 COP / 10€ - 20€ al año, registrado a nombre del cliente).`
  },

  // 4. PROPUESTA OPERATIVA: SITIO WEB CON SECCIONES
  {
    id: "propuesta-sitio-secciones",
    category: "planes",
    title: "Detalles del Plan Página Web Normal ($200.000 COP/mes)",
    keywords: ["sitio web con secciones", "web corporativa", "pagina normal", "200000", "servicios", "empresa", "secciones"],
    content: `Plan Página Web Normal (Corporativa con Secciones):
• Precio: $200.000 COP mensuales (permanencia mínima 6 meses).
• Entrega: 7 a 10 días hábiles.
• Enfoque de marca: Para empresas, marcas o profesionales que necesitan transmitir confianza, seriedad y mostrar sus servicios.
• Incluye:
  - Secciones organizadas (Inicio, Sobre Nosotros, Servicios, Portafolio, Contacto).
  - Optimización SEO para aparecer en Google.
  - Formulario de contacto directo a tu correo y botón de WhatsApp.
  - Alojamiento cloud de alta velocidad y SSL 24/7.
  - Hasta 4 horas al mes de soporte técnico para cambios de textos, fotos o testimonios.`
  },

  // 5. PROPUESTA OPERATIVA: TIENDA ONLINE
  {
    id: "propuesta-tienda-online",
    category: "planes",
    title: "Detalles del Plan Tienda Online E-commerce ($270.000 COP/mes)",
    keywords: ["tienda online", "ecommerce", "tienda virtual", "270000", "carrito", "pasarela", "inventario"],
    content: `Plan Tienda Online E-commerce:
• Precio: $270.000 COP mensuales (permanencia mínima 6 meses).
• Entrega: 12 a 16 días hábiles.
• Enfoque en ventas: Vende productos físicos o digitales en automático las 24 horas del día.
• Incluye:
  - Catálogo interactivo con tallas, colores, categorías y control de inventario.
  - Carrito de compras ágil con pagos por Nequi, Daviplata, Bancolombia, PSE y tarjetas.
  - Base de datos protegida, hosting cloud de alto rendimiento y SSL 24/7.
  - Hasta 4 horas al mes de soporte para agregar nuevos productos, cambiar precios o subir banners de ofertas.`
  },

  // 6. PROYECTOS POR COTIZACIÓN: UGC, LINKTREE, ERP
  {
    id: "proyectos-cotizacion",
    category: "planes",
    title: "Proyectos por Cotización: Portafolio UGC, Linktree y Sistemas ERP",
    keywords: ["ugc", "portafolio ugc", "linktree", "bio", "erp", "sistema a medida", "software", "cotizacion", "cuanto vale erp", "cuanto vale ugc"],
    content: `Proyectos Especiales por Cotización Personalizada:
• Portafolio UGC (User Generated Content): Para creadores de contenido que necesitan un portafolio de lujo para cerrar marcas con videos verticales en alta definición (ejemplo real: Sofia Cruz UGC). Se cotiza a medida.
• Páginas Linktree / Bio personalizadas: Bio-links rápidos, interactivos y con dominio propio para destacar en redes sociales (ejemplo real: Tricom Link). Se cotiza a medida.
• Sistemas a Medida y ERP: Programas en la nube para empresas que necesitan gestionar inventarios, ventas, clientes o procesos internos exclusivos. Se cotiza según la complejidad de módulos requeridos.
• Para estos proyectos, el bot conecta al cliente de inmediato con nuestro asesor de WhatsApp para cotizar en menos de 2 horas.`
  },

  // 7. TÉRMINOS, CONDICIONES OPERATIVAS Y PROPIEDAD
  {
    id: "terminos-y-propiedad",
    category: "garantias",
    title: "Términos del Contrato, Pagos y Propiedad del Código",
    keywords: ["propiedad", "contrato", "permanencia", "6 meses", "fecha de pago", "codigo", "archivos", "cancelacion", "impago"],
    content: `Términos y Condiciones Operativas Oficiales:
• Modelo de Pago: Suscripción mensual fija ($150.000 COP, $200.000 COP o $270.000 COP según el plan).
• Fecha de Pago: Se acuerda una fecha de pago fija de cada mes con el cliente.
• Permanencia mínima: Como no cobramos tarifa inicial de desarrollo o montaje, el periodo mínimo de 6 meses de suscripción es de obligado cumplimiento.
• Propiedad del proyecto al finalizar: Concluidos los 6 meses mínimos obligatorios, si el cliente decide no renovar el mantenimiento y soporte mensual, TODO el código, diseño y recursos desarrollados pasan a ser de su propiedad exclusiva, entregándosele los archivos íntegros.
• Soporte técnico incluido: Cada mes incluye hasta 4 horas de cambios y soporte. Desarrollos adicionales complejos que superen ese tiempo se presupuestan por separado.`
  },

  // 8. GLOSARIO TÉCNICO EXPLICADO FÁCIL
  {
    id: "glosario-tecnico",
    category: "tecnico",
    title: "Aclaración de Términos Técnicos en palabras sencillas",
    keywords: ["dominio", "hosting", "ssl", "candado", "responsive", "seo", "nextjs", "react", "pasarela", "que es", "tecnico"],
    content: `Glosario amigable de términos técnicos de desarrollo:
• Dominio: Es la dirección de tu negocio en internet (ejemplo: www.tumarca.com). Es como la placa con la dirección de tu local físico (cuesta aprox. 10€ - 20€ al año y siempre queda a tu nombre).
• Hosting / Alojamiento Cloud: El terreno o edificio donde viven tus fotos y datos para que la web funcione 24/7 sin caídas.
• Certificado SSL: El candadito verde de seguridad que garantiza que las compras y datos de tus clientes están protegidos.
• Responsive: La página se adapta automáticamente a cualquier pantalla (celulares iPhone/Android, tablets y computadores).
• Pasarela de Pagos (Nequi, Daviplata, PSE, Tarjetas): La conexión segura para recibir cobros en línea de forma automática.`
  },

  // 9. PORTAFOLIO Y CASOS REALES
  {
    id: "portafolio-proyectos",
    category: "portafolio",
    title: "Proyectos y Portafolio en Vivo de VisionWeb",
    keywords: ["proyectos", "portafolio", "ejemplos", "clientes", "trabajos", "sofia cruz", "tricom", "ver proyectos"],
    content: `Proyectos reales disponibles en el visor interactivo de nuestra página principal:
• Sofia Cruz UGC (sofiacruz.pages.dev): Portafolio especializado para creadora de contenido con video vertical y paquetes comerciales.
• Tricom Link (tricomlink.vercel.app): Plataforma bio-link interactiva para empresa de telecomunicaciones.
¡Invita al cliente a explorar el visor interactivo de proyectos en la página principal!`
  },

  // 10. CONTACTO Y SOPORTE DIRECTO
  {
    id: "soporte-humano",
    category: "contacto",
    title: "Contacto con Soporte y Asesor Humano",
    keywords: ["soporte", "humano", "asesor", "whatsapp", "telefono", "contacto", "cotizar a medida", "personalizado"],
    content: `Contacto Directo con Asesor Humano:
• Canal Principal: WhatsApp oficial de VisionWeb (+57 305 231 1490).
• Enlace directo: https://wa.me/573052311490
• Horario y compromiso: Respuesta en menos de 2 horas.
• Cuándo consultar con el asesor:
  - Para cotizaciones de proyectos a medida (Portafolio UGC, Linktree, sistemas ERP).
  - Para acordar fechas de pago o resolver dudas de contratación.`
  }
];

/**
 * Función de recuperación RAG
 */
export function retrieveRelevantContext(query: string): string {
  if (!query || typeof query !== "string") return "";

  const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const words = normalized.split(/\W+/).filter((w) => w.length > 2);

  const scored = KNOWLEDGE_BASE.map((item) => {
    let score = 0;

    for (const kw of item.keywords) {
      if (normalized.includes(kw)) {
        score += 6;
      }
    }

    for (const word of words) {
      if (item.title.toLowerCase().includes(word)) score += 3;
      if (item.content.toLowerCase().includes(word)) score += 1;
    }

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const topMatches = scored.filter((s) => s.score > 0).slice(0, 3);

  if (topMatches.length > 0) {
    return topMatches
      .map((m) => `[${m.item.title}]\n${m.item.content}`)
      .join("\n\n---\n\n");
  }

  return KNOWLEDGE_BASE.slice(0, 4)
    .map((i) => `[${i.title}]\n${i.content}`)
    .join("\n\n---\n\n");
}
