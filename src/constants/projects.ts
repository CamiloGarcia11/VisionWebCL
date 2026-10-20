export interface Project {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  category: "ecommerce" | "web" | "platform" | "bio";
  categoryLabel: string;
  shortDescription: string;
  technologies: string[];
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "pijamas-mi-angel",
    title: "Pijamas Mi Ángel",
    url: "https://www.pijamasmiangel.lat/",
    displayUrl: "pijamasmiangel.lat",
    category: "ecommerce",
    categoryLabel: "Tienda Online",
    shortDescription: "Tienda de ropa con catálogo, carrito de compras y pagos en línea con tarjeta o PSE.",
    technologies: ["Tienda Online", "Pagos Nequi / PSE", "Abre al Instante"]
  },
  {
    id: "cuadros-mi-angel",
    title: "Cuadros Mi Ángel",
    url: "https://www.cuadrosmiangel.lat/",
    displayUrl: "cuadrosmiangel.lat",
    category: "ecommerce",
    categoryLabel: "Catálogo de Fotos",
    shortDescription: "Galería visual para elegir cuadros personalizados y pedir directo por WhatsApp.",
    technologies: ["Catálogo Visual", "Pedido a WhatsApp", "Fácil de Usar"]
  },
  {
    id: "encargos-mi-angel",
    title: "Encargos Mi Ángel",
    url: "https://www.encargosmiangel.lat/",
    displayUrl: "encargosmiangel.lat",
    category: "platform",
    categoryLabel: "Sistema de Pedidos",
    shortDescription: "Página donde los clientes arman y cotizan sus pedidos especiales sin enredos.",
    technologies: ["Cotizador Fácil", "Control de Pedidos", "Avisos al Correo"]
  },
  {
    id: "williams-cruz-co",
    title: "Williams Cruz Co",
    url: "https://williamscruzco.vercel.app",
    displayUrl: "williamscruzco.vercel.app",
    category: "web",
    categoryLabel: "Página con Calculadora",
    shortDescription: "Página empresarial con calculadora para simular cuotas de crédito de vivienda.",
    technologies: ["Calculadora de Cuotas", "Aparece en Google", "Diseño Profesional"]
  },
  {
    id: "pijamas-mi-angel-tree",
    title: "Pijamas Mi Ángel Tree",
    url: "https://pijamasmiangeltree.vercel.app/",
    displayUrl: "pijamasmiangeltree.vercel.app",
    category: "bio",
    categoryLabel: "Menú para Redes",
    shortDescription: "Página para poner en el perfil de Instagram y enviar clientes a WhatsApp y la tienda.",
    technologies: ["Ideal para Instagram", "Abre en 1 Segundo", "100% Celular"]
  },
  {
    id: "crave-detail-co",
    title: "Crave Detail Co",
    url: "https://cravedetailco.netlify.app/",
    displayUrl: "cravedetailco.netlify.app",
    category: "web",
    categoryLabel: "Página de Servicios",
    shortDescription: "Página moderna para mostrar fotos de trabajos y agendar citas de lavado.",
    technologies: ["Agendar Citas", "Diseño Elegante", "Botón a WhatsApp"]
  }
];

export const PROJECT_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "ecommerce", label: "Tiendas Online" },
  { id: "platform", label: "Sistemas & Pedidos" },
  { id: "web", label: "Páginas de Servicios" }
];
