import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export function meta({}: Route.MetaArgs) {
  const baseUrl = "https://econodictionary.com";
  return [
    { title: "Diccionario Económico - Aprende Términos Financieros y Económicos" },
    { 
      name: "description", 
      content: "Descubre conceptos económicos, términos financieros y explicaciones claras. Diccionario colaborativo con definiciones, ejemplos prácticos y recursos educativos." 
    },
    { 
      name: "keywords", 
      content: "diccionario económico, términos financieros, conceptos económicos, educación financiera, glosario económico" 
    },
    { 
      property: "og:title", 
      content: "Diccionario Económico - Aprende Términos Financieros" 
    },
    { 
      property: "og:description", 
      content: "Explora conceptos económicos con definiciones claras, ejemplos prácticos y comunidad colaborativa." 
    },
    { 
      property: "og:type", 
      content: "website" 
    },
    { 
      property: "og:url", 
      content: `${baseUrl}/terms` 
    },
    { 
      property: "og:site_name", 
      content: "EconoDictionary" 
    },
    { 
      name: "twitter:card", 
      content: "summary_large_image" 
    },
    { 
      name: "twitter:title", 
      content: "Diccionario Económico - Aprende Términos Financieros" 
    },
    { 
      name: "twitter:description", 
      content: "Explora conceptos económicos con definiciones claras y ejemplos prácticos." 
    },
    { 
      name: "viewport", 
      content: "width=device-width, initial-scale=1" 
    },
    { 
      name: "language", 
      content: "es-ES" 
    },
    { 
      rel: "canonical", 
      href: `${baseUrl}/terms` 
    },
  ];
}

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}