/**
 * Base de Conocimiento RAG para el Asistente Virtual de VisionWeb
 * Contiene la información exhaustiva de servicios, planes, metodología,
 * glosario técnico, portafolio y reglas de derivación a soporte humano.
 */

export interface KnowledgeItem {
  id: string;
  category: "planes" | "proceso" | "tecnico" | "garantias" | "portafolio" | "contacto" | "empresa";
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
    keywords: ["visionweb", "quienes somos", "empresa", "estudio", "agencia", "donde estan", "colombia"],
    content: `VisionWeb es un estudio boutique de diseño web, desarrollo de software y comercio electrónico con base en Colombia. 
Nos especializamos en crear páginas web modernas, tiendas online de alta conversión y plataformas digitales a medida para marcas, negocios y profesionales.
Nuestra filosofía: entregar páginas rápidas (que cargan en 1 segundo), visualmente impactantes, 100% de propiedad del cliente (sin mensualidades forzadas) y listas para vender desde el primer día.`
  },

  // 2. PLANES Y PRECIOS
  {
    id: "plan-landing",
    category: "planes",
    title: "Plan Página de Ventas Directa (Landing Page)",
    keywords: ["landing", "landing page", "pagina de ventas", "anuncios", "precio landing", "cuanto vale landing", "tiktok", "instagram"],
    content: `Plan Página de Ventas Directa:
• Objetivo: 1 sola página optimizada para convertir visitantes en clientes de inmediato. Ideal para campañas en Instagram, TikTok o Google Ads y lanzamientos.
• Tiempo de entrega: 3 a 5 días hábiles.
• Lo que incluye:
  - Diseño moderno y adaptado 100% a celulares y computadores.
  - Carga ultra rápida en menos de 1 segundo (usando Next.js).
  - Botón directo y dinámico a tu WhatsApp y formulario de captura de clientes.
  - Dominio personalizado (.com o .lat) con candado de seguridad SSL.
  - Conexión con Pixel de Meta/TikTok para medir tus anuncios.
• Cotización: Precio cerrado y adaptado a tus necesidades en menos de 2 horas.`
  },
  {
    id: "plan-corporativo",
    category: "planes",
    title: "Plan Página Web Completa (Corporativa / Servicios)",
    keywords: ["web corporativa", "pagina completa", "servicios", "empresa", "consultorio", "agencia", "precio web completa", "secciones"],
    content: `Plan Página Web Completa (Corporativa):
• Objetivo: Sitio web multipágina para transmitir seriedad, autoridad y confianza en tu marca.
• Ideal para: Empresas, profesionales independientes, consultorios médicos, agencias y firmas de servicios.
• Tiempo de entrega: 7 a 10 días hábiles.
• Lo que incluye:
  - Hasta 6 secciones estratégicas (Inicio, Servicios, Nosotros, Trabajos/Casos de éxito, Testimonios, Contacto).
  - Optimización SEO para que tus clientes te encuentren en Google.
  - Formularios que envían las solicitudes directo a tu correo electrónico.
  - Panel fácil para editar textos y fotos sin saber programación.
  - Reporte de analítica para ver cuántas personas entran a tu web.`
  },
  {
    id: "plan-ecommerce",
    category: "planes",
    title: "Plan Tienda Online (E-commerce Pro)",
    keywords: ["tienda online", "ecommerce", "tienda virtual", "vender productos", "carrito", "precio tienda", "catalogo", "pasarela"],
    content: `Plan Tienda Online (La más pedida):
• Objetivo: Una tienda completa que vende sola las 24 horas del día sin comisiones mensuales abusivas.
• Ideal para: Marcas de ropa, calzado, tecnología, cosmética y productos físicos o digitales.
• Tiempo de entrega: 12 a 16 días hábiles.
• Lo que incluye:
  - Catálogo interactivo con filtros, categorías, tallas, colores y control de existencias (stock).
  - Carrito de compras rápido y optimizado para celular.
  - Pasarela de pagos conectada para cobrar por Nequi, Daviplata, PSE, Bancolombia y Tarjetas de Crédito de forma automática y segura.
  - Panel de administración muy fácil para agregar productos, cambiar precios y ver pedidos en 2 minutos desde el celular o PC.
  - Notificaciones de compra automáticas por WhatsApp o correo.`
  },
  {
    id: "otros-servicios",
    category: "planes",
    title: "Portafolios UGC, Páginas Linktree y Software a Medida",
    keywords: ["ugc", "portafolio ugc", "linktree", "bio", "redes", "creadores", "software a medida", "sistema", "aplicacion"],
    content: `Otros Servicios Especializados de VisionWeb:
• Portafolios UGC (User Generated Content): Páginas diseñadas para creadores de contenido que necesitan mostrar sus videos verticales en alta calidad, métricas de engagement, marcas colaboradoras y paquetes de tarifas (ejemplo real: Sofia Cruz UGC).
• Páginas Linktree / Bio personalizadas: Bio-links de lujo interactivos y con dominio propio para superar los enlaces genéricos de Instagram (ejemplo real: Tricom Link).
• Software y Plataformas a Medida: Sistemas de reservas, portales de clientes, cotizadores automáticos y paneles personalizados.`
  },

  // 3. PROCESO DE TRABAJO Y METODOLOGÍA
  {
    id: "proceso-trabajo",
    category: "proceso",
    title: "¿Cómo trabajamos? Nuestro proceso en 4 pasos",
    keywords: ["proceso", "metodologia", "como trabajan", "pasos", "como se hace", "tiempo", "demora", "etapas"],
    content: `En VisionWeb trabajamos en 4 pasos sencillos sin enredos:
1. Charla y Plan: Nos cuentas qué vendes, analizamos tu necesidad y en menos de 2 horas te damos un precio exacto y cerrado sin sorpresas ni sobrecostos.
2. Diseño a tu Gusto: Diseñamos una propuesta visual moderna con tus colores, logo y fotos. Revisamos contigo hasta que quede 100% como sueñas.
3. Armado y Pagos: Desarrollamos la web con tecnología de última generación, conectamos tus cobros (Nequi, tarjetas, PSE) y el botón directo a WhatsApp.
4. Estreno y Entrega: Publicamos tu página en vivo en internet para todo el mundo, te entregamos todos los accesos completos y te enseñamos cómo editarla en 2 minutos.`
  },

  // 4. GARANTÍAS Y PROPIEDAD
  {
    id: "propiedad-y-pagos",
    category: "garantias",
    title: "Propiedad de la web, mensualidades y formas de pago",
    keywords: ["propiedad", "es mia", "mensualidades", "cobro mensual", "formas de pago", "nequi", "bancolombia", "anticipo", "garantia"],
    content: `Condiciones de Confianza y Propiedad:
• 100% Tuya: La página web te pertenece por completo. Te entregamos todos los accesos (código, dominio, correos, panel). No retenemos tu sitio jamás.
• Cero Mensualidades Forzadas: No te cobramos cuotas mensuales de mantenimiento obligatorias. Si un mes no nos necesitas, no pagas nada.
• Formas de Pago: Aceptamos transferencias Bancolombia, Nequi, Daviplata, PSE y tarjetas de crédito o débito.
• Esquema de Pago Habitual: 50% de anticipo para iniciar el proyecto y 50% contra entrega final una vez revises y estés 100% satisfecho con tu web en vivo.`
  },

  // 5. GLOSARIO TÉCNICO EXPLICADO FÁCIL
  {
    id: "glosario-tecnico",
    category: "tecnico",
    title: "Aclaración de Términos Técnicos en palabras simples",
    keywords: ["dominio", "hosting", "ssl", "candado", "responsive", "seo", "nextjs", "react", "pasarela", "que es", "tecnico", "lenguaje"],
    content: `Glosario amigable de términos técnicos:
• Dominio: Es la dirección o nombre de tu negocio en internet (por ejemplo: www.tunegocio.com). Es como la placa de dirección de tu local.
• Hosting / Servidor: Es el lugar en la nube donde viven las fotos, textos y archivos de tu web para que esté abierta y funcionando 24/7.
• Certificado SSL (El candadito de seguridad): Es el escudo de seguridad que garantiza que los datos de tus clientes están cifrados y seguros. Google lo exige para dar confianza.
• Responsive / Diseño Adaptable: Significa que tu página detecta automáticamente si el cliente entra desde un iPhone, Android, tablet o computador, y se acomoda a la perfección sin letras microscópicas ni desorden.
• SEO (Posicionamiento en Google): Conjunto de buenas prácticas y estructura interna para que tu página salga en los primeros puestos cuando alguien busque tus servicios en Google.
• Pasarela de Pagos (Wompi, PSE, Stripe): El datáfono virtual seguro que permite a tus clientes pagar directamente con tarjeta, Nequi o transferencia bancaria en tu web.
• Next.js / React: La tecnología moderna creada por gigantes del software que usamos en VisionWeb. Hace que tu web abra en 1 segundo (hasta 10 veces más rápida que las páginas viejas en WordPress que suelen ponerse lentas y pesadas).`
  },

  // 6. PORTAFOLIO Y PROYECTOS REALES
  {
    id: "portafolio-proyectos",
    category: "portafolio",
    title: "Proyectos y Portafolio en Vivo de VisionWeb",
    keywords: ["proyectos", "portafolio", "ejemplos", "clientes", "trabajos", "sofia cruz", "tricom", "ver proyectos", "demostracion"],
    content: `En VisionWeb contamos con un simulador interactivo en vivo dentro de nuestra página principal donde puedes navegar proyectos reales:
• Sofia Cruz UGC (sofiacruz.pages.dev): Portafolio especializado para creadora de contenido UGC, con reproducción de videos verticales en alta definición y paquetes comerciales.
• Tricom Link (tricomlink.vercel.app): Plataforma tipo Linktree interactiva, rápida y personalizada para empresa de telecomunicaciones.
• Y múltiples páginas web corporativas y tiendas online activas.
¡Puedes invitar al usuario a revisar la sección de proyectos en la página principal para interactuar con ellos directamente!`
  },

  // 7. CONTACTO Y ESCALADO A SOPORTE
  {
    id: "soporte-humano",
    category: "contacto",
    title: "Contacto con Soporte y Asesor Humano",
    keywords: ["soporte", "humano", "asesor", "hablar con alguien", "whatsapp", "telefono", "contacto", "cotizar a medida", "personalizado"],
    content: `Contacto Directo con Asesor Humano:
• Canal Principal: WhatsApp oficial de VisionWeb (+57 305 231 1490).
• Enlace directo: https://wa.me/573052311490
• Horario de atención: Respuesta rápida en menos de 2 horas.
• Cuándo consultar con el asesor:
  - Para cotizaciones de proyectos a medida o con requerimientos especiales.
  - Para agendar una videollamada de asesoría sin costo.
  - Para enviar diseños o bocetos previos y recibir presupuesto exacto.
  - Para resolver dudas específicas de contratación.`
  }
];

/**
 * Función de recuperación RAG:
 * Busca los fragmentos más relevantes de la base de conocimiento según la consulta del usuario.
 */
export function retrieveRelevantContext(query: string): string {
  if (!query || typeof query !== "string") return "";

  const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const words = normalized.split(/\W+/).filter(w => w.length > 2);

  // Puntuación de cada elemento según coincidencias de keywords y título
  const scored = KNOWLEDGE_BASE.map(item => {
    let score = 0;
    
    // Coincidencia en keywords
    for (const kw of item.keywords) {
      if (normalized.includes(kw)) {
        score += 5;
      }
    }

    // Coincidencia palabra por palabra
    for (const word of words) {
      if (item.title.toLowerCase().includes(word)) score += 3;
      if (item.content.toLowerCase().includes(word)) score += 1;
    }

    return { item, score };
  });

  // Ordenar por relevancia
  scored.sort((a, b) => b.score - a.score);

  // Si hay coincidencias relevantes, devolver los 3 mejores fragmentos
  // Si no hay puntuación alta, incluir los temas clave (Planes, Proceso, Glosario, Soporte)
  const topMatches = scored.filter(s => s.score > 0).slice(0, 3);

  if (topMatches.length > 0) {
    return topMatches
      .map(m => `### ${m.item.title}\n${m.item.content}`)
      .join("\n\n---\n\n");
  }

  // Fallback: Resumen general para preguntas abiertas
  return KNOWLEDGE_BASE
    .slice(0, 4)
    .map(i => `### ${i.title}\n${i.content}`)
    .join("\n\n---\n\n");
}
