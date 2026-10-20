import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://visionweb.co"),
  title: {
    default: "Vision Web | Estudio de Desarrollo de Software & E-Commerce a Medida",
    template: "%s | Vision Web",
  },
  description:
    "Desarrollamos plataformas web de alto impacto, tiendas e-commerce de máxima conversión y arquitectura de software escalable. Convierte visitantes en clientes.",
  keywords: [
    "Desarrollo de Software",
    "E-commerce a Medida",
    "Landing Pages de Alta Conversión",
    "Next.js Developer",
    "Tiendas Online Colombia",
    "Plataformas Web a Medida",
    "Pasarelas de Pago Wompi PSE Stripe",
    "Vision Web Estudio Digital",
  ],
  authors: [{ name: "Vision Web Studio" }],
  creator: "Vision Web",
  publisher: "Vision Web",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://visionweb.co",
    title: "Vision Web | Desarrollo de Software & E-Commerce a Medida",
    description:
      "Transformamos ideas en plataformas digitales de alto impacto, rápidas, escalables y diseñadas para convertir visitas en ventas.",
    siteName: "Vision Web",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vision Web - Estudio de Desarrollo de Software y E-commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision Web | Software & E-Commerce de Alto Rendimiento",
    description:
      "Plataformas web, tiendas online y software a medida para marcas que buscan liderar su sector.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F2EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F4F2EB] text-[#141534] antialiased selection:bg-[#D5DD54] selection:text-[#141534]">
        {children}
      </body>
    </html>
  );
}
