/**
 * Base de Conocimiento RAG para el Asistente Virtual de VisionWeb
 * Integra la propuesta de valor de la página web oficial junto con
 * las propuestas operativas oficiales de los servicios (Landing Page,
 * Sitio Web con Secciones y Tienda Online E-commerce).
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

  // 2. PROPUESTA OPERATIVA: LANDING PAGE (PÁGINA DE VENTAS DIRECTA)
  {
    id: "propuesta-landing-page",
    category: "planes",
    title: "Propuesta de Servicio: Landing Page de Alta Conversión",
    keywords: ["landing", "landing page", "pagina de ventas", "anuncios", "precio landing", "conversion", "whatsapp", "un solo producto"],
    content: `Propuesta de Servicio: Landing Page (Página de Ventas Directa)
• Objetivo: Estructura comercial optimizada para convertir tráfico de anuncios (Instagram, TikTok, Google Ads) y lanzamientos en ventas inmediatas.
• Tiempos de Entrega: De 3 a 5 días hábiles.
• ¿Qué incluye el servicio integral?:
  - Diseño y desarrollo a medida adaptado a móviles, tablets y ordenadores con navegación fluida.
  - Enfoque en conversión: Llamadas a la acción (CTA) estratégicas, formulario de captura directo y botón dinámico a WhatsApp.
  - Infraestructura activa: Alojamiento cloud de alta velocidad (hosting) y certificado de seguridad SSL activo 24/7.
  - Mantenimiento y soporte técnico incluido: Hasta 4 horas al mes para ajustes operativos (modificar textos, actualizar testimonios, sustituir imágenes o ajustar promociones).
• Gastos no incluidos transparentes:
  - Dominio web (.com u otras extensiones): Aprox. 10 € – 20 € anuales (siempre registrado a nombre del cliente para garantizar su propiedad).
  - Herramientas de terceros de pago: En caso de requerir CRMs externos o plataformas de email marketing prémium.
• Proceso de entrega en 3 pasos:
  1. Paso 1: Envío de textos base, logo, paleta de colores y recursos visuales.
  2. Paso 2: Maquetación de la landing page, configuración de formularios y analítica básica.
  3. Paso 3: Revisión conjunta, validación de formularios y publicación oficial en internet.
• Precios: Se cotiza según las necesidades y alcance del proyecto en menos de 2 horas.`
  },

  // 3. PROPUESTA OPERATIVA: SITIO WEB CON SECCIONES (CORPORATIVO)
  {
    id: "propuesta-sitio-secciones",
    category: "planes",
    title: "Propuesta de Servicio: Sitio Web Corporativo con Secciones",
    keywords: ["sitio web con secciones", "web corporativa", "pagina completa", "servicios", "empresa", "consultorio", "agencia", "secciones"],
    content: `Propuesta de Servicio: Sitio Web Corporativo con Secciones
• Objetivo: Sitio web institucional estructurado para transmitir seriedad, marca y autoridad ante clientes y aliados.
• Tiempos de Entrega: De 7 a 10 días hábiles.
• ¿Qué incluye el servicio integral?:
  - Diseño y desarrollo web completo estructurado por secciones clave (Inicio, Sobre Nosotros, Servicios/Productos, Portafolio/Galería, Contacto).
  - Adaptabilidad y rendimiento: 100% optimizado para móviles, tablets y ordenadores.
  - Infraestructura activa: Alojamiento cloud de alto rendimiento (hosting) y certificado de seguridad SSL activo 24/7.
  - Mantenimiento y soporte técnico incluido: Hasta 4 horas al mes para cambios (modificar textos, renovar fotografías, agregar testimonios o actualizar secciones).
• Gastos no incluidos transparentes:
  - Dominio web (.com u otras extensiones): Aprox. 10 € – 20 € anuales (a nombre del cliente).
  - Servicios externos de pago: Cuentas de correo corporativo de pago (Google Workspace) o plataformas externas prémium si el cliente las desea.
• Proceso de entrega en 3 pasos:
  1. Paso 1: Entrega de estructura, textos de cada sección, logo e imágenes.
  2. Paso 2: Maquetación de la arquitectura web, enlaces y formularios de contacto.
  3. Paso 3: Revisión conjunta, validación integral y publicación oficial en internet.
• Precios: Cotización personalizada y transparente en menos de 2 horas según la magnitud requerida.`
  },

  // 4. PROPUESTA OPERATIVA: TIENDA ONLINE E-COMMERCE
  {
    id: "propuesta-tienda-online",
    category: "planes",
    title: "Propuesta de Servicio: Tienda Online E-commerce",
    keywords: ["tienda online", "ecommerce", "tienda virtual", "vender productos", "carrito", "pasarela de pago", "inventario", "pedidos"],
    content: `Propuesta de Servicio: Tienda Online E-commerce Pro
• Objetivo: Plataforma comercial completa que gestiona pedidos, catálogo e inventario y cobra de forma automatizada las 24 horas del día.
• Tiempos de Entrega: De 12 a 16 días hábiles.
• ¿Qué incluye el servicio integral?:
  - Diseño y montaje de tienda virtual: Completa y optimizada para móviles, tablets y ordenadores.
  - Funcionalidades comerciales: Catálogo de productos organizado, carrito de compras, gestión de pedidos e inventario, y pasarela de pago integrada.
  - Pasarelas de pago admitidas: Nequi, Daviplata, Bancolombia, PSE y tarjetas de crédito/débito.
  - Infraestructura activa: Alojamiento cloud de alta velocidad, base de datos segura y certificado SSL activo 24/7.
  - Mantenimiento y soporte técnico incluido: Hasta 4 horas al mes para cambios (nuevos productos, actualización de fotos, ajuste de precios o banners promocionales).
• Gastos no incluidos transparentes:
  - Dominio web (.com u otras extensiones): Aprox. 10 € – 20 € anuales (a nombre del cliente).
  - Comisión por venta de la pasarela: Descontada automáticamente por la entidad de pago correspondiente por cada transacción procesada (sin cuotas ocultas nuestras).
• Proceso de entrega en 3 pasos:
  1. Paso 1: Entrega de fotos, catálogo de productos, precios, logo e información de marca.
  2. Paso 2: Configuración del inventario, diseño de la tienda y conexión de pagos y envíos.
  3. Paso 3: Compra de prueba conjunta, verificación de pasarela y publicación oficial.
• Precios: Cotización cerrada según catálogo y requerimientos en menos de 2 horas.`
  },

  // 5. TÉRMINOS OPERATIVOS, CONDICIONES CLAVE Y PROPIEDAD
  {
    id: "terminos-y-propiedad",
    category: "garantias",
    title: "Términos, Condiciones Operativas y Propiedad del Proyecto",
    keywords: ["propiedad", "terminos", "condiciones", "entrega de codigo", "archivos", "soporte mensual", "cancelacion", "impago", "mantenimiento"],
    content: `Términos y Condiciones Operativas Oficiales de VisionWeb:
• Propiedad del proyecto al finalizar: Concluido el periodo de servicio acordado, si el cliente opta por no renovar el mantenimiento y soporte mensual, TODO el código, diseño y recursos desarrollados pasan a ser de su propiedad exclusiva, entregándose los archivos íntegros.
• Mantenimiento y Soporte Técnico Incluido: Todos nuestros planes incluyen hasta 4 horas al mes de soporte técnico profesional para cambios cotidianos (textos, fotos, promociones, actualización de productos o testimonios).
• Desarrollos adicionales: Nuevos módulos complejos o requerimientos estructurales que superen las 4 horas mensuales de soporte se presupuestan y aprueban previamente de forma independiente sin sorpresas.
• Suspensión por impago: En servicios activos, el retraso en la cuota fuera del plazo fijado (primeros 5 días naturales del mes) provoca la suspensión temporal del servicio hasta su regularización.
• Cancelación anticipada: Si se cancela el servicio antes de cumplir los plazos mínimos pactados, la web se da de baja sin entrega de código ni reembolsos.`
  },

  // 6. OTROS SERVICIOS ESPECIALES: UGC Y LINKTREE
  {
    id: "otros-servicios",
    category: "planes",
    title: "Portafolios UGC, Páginas Linktree y Software a Medida",
    keywords: ["ugc", "portafolio ugc", "linktree", "bio", "redes", "creadores", "software a medida", "sistema", "aplicacion"],
    content: `Otros Servicios Especializados de VisionWeb:
• Portafolios UGC (User Generated Content): Páginas de alta gama para creadores de contenido que presentan videos verticales interactivos en alta calidad, métricas de engagement, marcas colaboradoras y paquetes comerciales (ejemplo real en el portafolio: Sofia Cruz UGC).
• Páginas Linktree / Bio personalizadas: Bio-links de lujo con dominio propio, ultrarrápidos y adaptados a la identidad visual para maximizar conversiones desde Instagram/TikTok (ejemplo real: Tricom Link).
• Sistemas a Medida (ERP / Software): Paneles de control y programas en internet personalizados para organizar inventarios, cobros y flujos operativos de empresas.`
  },

  // 7. GLOSARIO TÉCNICO EXPLICADO FÁCIL
  {
    id: "glosario-tecnico",
    category: "tecnico",
    title: "Aclaración de Términos Técnicos en palabras sencillas",
    keywords: ["dominio", "hosting", "ssl", "candado", "responsive", "seo", "nextjs", "react", "pasarela", "que es", "tecnico", "lenguaje"],
    content: `Glosario amigable de términos técnicos de desarrollo:
• Dominio: Es el nombre y dirección única de tu negocio en internet (por ejemplo: www.tumarca.com). Es como la placa de dirección de tu local físico (cuesta aprox. 10€ - 20€ al año y siempre queda a tu nombre).
• Hosting / Alojamiento Cloud: El espacio en servidores de alta velocidad donde viven los archivos y datos de tu web para que esté encendida 24/7 sin caídas.
• Certificado SSL (El candadito verde de seguridad): El protocolo criptográfico que protege las transferencias de datos de tus clientes. Google y los navegadores lo exigen para marcar una web como 'Segura'.
• Responsive / Adaptabilidad: Significa que la página está programada para verse y funcionar a la perfección en cualquier pantalla: celulares iPhone/Android, tablets y computadores.
• SEO (Posicionamiento en Google): Estructura técnica interna para que los motores de búsqueda como Google muestren tu negocio cuando la gente busque tus productos.
• Pasarela de Pagos (PSE, Nequi, Wompi, Tarjetas): La conexión bancaria segura que procesa las compras en tu web de forma automática y te deposita el dinero.
• Next.js & Arquitectura Cloud: Las herramientas modernas que utilizamos para que tu página vuele y abra en 1 segundo (a diferencia de sistemas lentos y pesados del pasado).`
  },

  // 8. PORTAFOLIO Y PROYECTOS REALES
  {
    id: "portafolio-proyectos",
    category: "portafolio",
    title: "Proyectos y Portafolio en Vivo de VisionWeb",
    keywords: ["proyectos", "portafolio", "ejemplos", "clientes", "trabajos", "sofia cruz", "tricom", "ver proyectos", "demostracion"],
    content: `Proyectos reales disponibles en nuestro visor interactivo en la web principal:
• Sofia Cruz UGC (sofiacruz.pages.dev): Portafolio dinámico con reproducción de videos verticales en alta resolución y propuesta comercial para marcas.
• Tricom Link (tricomlink.vercel.app): Plataforma bio-link interactiva y moderna para empresa de telecomunicaciones.
• Y tiendas online y páginas corporativas listas para explorar.
¡Invita al cliente a probar el visor interactivo de proyectos en la página principal para ver cómo luce una web terminada!`
  },

  // 9. CONTACTO Y ESCALADO A SOPORTE
  {
    id: "soporte-humano",
    category: "contacto",
    title: "Contacto con Soporte y Asesor Humano",
    keywords: ["soporte", "humano", "asesor", "hablar con alguien", "whatsapp", "telefono", "contacto", "cotizar a medida", "personalizado"],
    content: `Contacto Directo con Asesor Humano:
• Canal Principal: WhatsApp oficial de VisionWeb (+57 305 231 1490).
• Enlace directo: https://wa.me/573052311490
• Compromiso de respuesta: Atención personalizada en menos de 2 horas.
• Cuándo consultar con el asesor:
  - Para cotizaciones a medida con requerimientos específicos.
  - Para agendar una reunión de asesoría inicial sin costo.
  - Para enviar fotos, catálogo o material de marca para arrancar el proyecto.
  - Para consultas comerciales y acuerdos contractuales.`
  }
];

/**
 * Función de recuperación RAG:
 * Busca los fragmentos más relevantes de la base de conocimiento según la consulta del usuario.
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
      .map((m) => `### ${m.item.title}\n${m.item.content}`)
      .join("\n\n---\n\n");
  }

  // Fallback: temas principales si la pregunta es muy general
  return KNOWLEDGE_BASE.slice(0, 4)
    .map((i) => `### ${i.title}\n${i.content}`)
    .join("\n\n---\n\n");
}
