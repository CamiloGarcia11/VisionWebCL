export interface DevelopmentPlan {
  id: string;
  name: string;
  tagline: string;
  targetClient: string;
  isPopular?: boolean;
  badge: string;
  estimatedDelivery: string;
  quoteIndicator: string;
  ctaText: string;
  deliverables: string[];
}

export const DEVELOPMENT_PLANS: DevelopmentPlan[] = [
  {
    id: "landing-page",
    name: "Página de Ventas Directa",
    tagline: "1 sola página pensada para mostrar tu producto y conseguir clientes rápido",
    targetClient: "Para anuncios en Instagram/TikTok y lanzamientos",
    isPopular: false,
    badge: "Rápida & Directa",
    estimatedDelivery: "3 a 5 días",
    quoteIndicator: "Precio según lo que necesites",
    ctaText: "Cotizar Página de Ventas",
    deliverables: [
      "Se ve perfecta en celular y computador",
      "Botón directo a tu WhatsApp y formulario de contacto",
      "Abre al instante en 1 segundo sin hacer esperar al cliente",
      "Nombre propio (.com o .lat) con candado de seguridad"
    ]
  },
  {
    id: "web-corporativa",
    name: "Página Web Completa",
    tagline: "Varias secciones para mostrar tus servicios y darle seriedad a tu negocio",
    targetClient: "Empresas, consultorios, agencias y profesionales",
    isPopular: false,
    badge: "Confianza & Marca",
    estimatedDelivery: "7 a 10 días",
    quoteIndicator: "Precio según lo que necesites",
    ctaText: "Cotizar Página Completa",
    deliverables: [
      "Hasta 6 secciones (Inicio, Servicios, Nosotros, Trabajos, Contacto)",
      "Preparada para que la gente te encuentre en Google",
      "Formularios para que te escriban directo al correo",
      "Reporte para ver cuántas personas visitan tu página"
    ]
  },
  {
    id: "ecommerce-pro",
    name: "Tienda Online para Vender",
    tagline: "Tus clientes eligen, compran y pagan solos las 24 horas del día",
    targetClient: "Marcas de ropa, calzado, tecnología y accesorios",
    isPopular: true,
    badge: "La Más Pedida",
    estimatedDelivery: "12 a 16 días",
    quoteIndicator: "Precio según lo que necesites",
    ctaText: "Cotizar Tienda Online",
    deliverables: [
      "Catálogo fácil con fotos, tallas, colores y existencias",
      "Carrito de compras donde el cliente paga en 1 minuto",
      "Recibe pagos con Nequi, Daviplata, PSE y tarjetas",
      "Aviso automático a tu WhatsApp cada vez que alguien compre",
      "Panel facilito para subir o cambiar tus fotos y precios tú mismo"
    ]
  },
  {
    id: "saas-erp",
    name: "Sistema a Medida",
    tagline: "Un programa exclusivo en internet adaptado exactamente a tu negocio",
    targetClient: "Negocios que quieren organizar pedidos, inventarios o cobros",
    isPopular: false,
    badge: "100% Personalizado",
    estimatedDelivery: "Según tus funciones",
    quoteIndicator: "Precio según lo que necesites",
    ctaText: "Cotizar Sistema a Medida",
    deliverables: [
      "Creado desde cero para cómo trabajas tú, sin limitaciones",
      "Acceso privado con usuario y contraseña para ti y tus empleados",
      "Reportes automáticos de tus ventas y números al día",
      "Conexión con facturación o programas que ya utilices"
    ]
  }
];

export const TECHNICAL_SERVICES_ECOSYSTEM = [
  {
    category: "Tus Datos",
    title: "Información Protegida",
    description: "Tus clientes y ventas quedan guardados con copias de respaldo automáticas.",
    icon: "Database"
  },
  {
    category: "Cobros Fáciles",
    title: "Recibe Pagos al Instante",
    description: "Tus clientes te pagan por Nequi, Daviplata, PSE, transferencias o tarjeta sin enredos.",
    icon: "CreditCard"
  },
  {
    category: "Avisos Rápidos",
    title: "Mensajes a tu WhatsApp",
    description: "Cada vez que alguien hace un pedido o pregunta, te llega un mensaje al celular.",
    icon: "MessageSquare"
  },
  {
    category: "Cero Caídas",
    title: "Páginas que Abren Rápido",
    description: "Tu web abre en 1 segundo y nunca se cae, para que nadie se aburra esperando.",
    icon: "ShieldCheck"
  },
  {
    category: "Cuentas Claras",
    title: "Facturas Automáticas",
    description: "Si tu negocio lo necesita, emite facturas electrónicas válidas sin trabajo manual.",
    icon: "FileCheck"
  },
  {
    category: "En Google",
    title: "Lista para Google",
    description: "Cumple las reglas de Google para que te encuentren más fácil cuando busquen tus servicios.",
    icon: "Activity"
  }
];
