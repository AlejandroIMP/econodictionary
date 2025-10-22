# 🔧 SEO Implementation Examples - React Router v7 with SSR

## Tabla de Contenidos

1. [Patrón Básico de Meta Tags](#patrón-básico-de-meta-tags)
2. [Patrón Dinámico con Loader](#patrón-dinámico-con-loader)
3. [Estructura Semántica HTML](#estructura-semántica-html)
4. [Accesibilidad + SEO](#accesibilidad--seo)
5. [Utilidades Helper](#utilidades-helper)
6. [Testing y Validación](#testing-y-validación)

---

## 1. Patrón Básico de Meta Tags

### Estructura básica en una ruta

```typescript
// routes/terms/terms.tsx
import type { Route } from "./+types/terms";

export function meta({}: Route.MetaArgs) {
  const baseUrl = "https://econodictionary.com";

  return [
    // Title único y descriptivo (50-70 caracteres)
    { title: "Diccionario Económico - Términos y Conceptos Financieros" },

    // Meta description (120-160 caracteres)
    {
      name: "description",
      content: "Explora nuestro diccionario de términos económicos con definiciones claras, ejemplos prácticos y búsqueda avanzada."
    },

    // Keywords relevantes
    {
      name: "keywords",
      content: "diccionario económico, términos financieros, conceptos económicos, educación financiera"
    },

    // Open Graph para redes sociales
    { property: "og:title", content: "Diccionario Económico" },
    {
      property: "og:description",
      content: "Explora conceptos económicos con definiciones claras y ejemplos prácticos."
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${baseUrl}/terms` },
    { property: "og:site_name", content: "EconoDictionary" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Diccionario Económico" },
    {
      name: "twitter:description",
      content: "Descubre términos económicos y financieros."
    },

    // Metadata técnico
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "es-ES" },
    { name: "author", content: "EconoDictionary Team" },
    { name: "robots", content: "index, follow" },

    // Canonical URL
    { rel: "canonical", href: `${baseUrl}/terms` },
  ];
}

export default function TermsPage() {
  // ... componente
}
```

---

## 2. Patrón Dinámico con Loader

### Usando Loader para datos completos en SSR

```typescript
// routes/terms/term.tsx
import type { Route } from "./+types/term";
import { useLoaderData } from "react-router";

// Loader ejecutado en servidor (SSR)
export async function loader({ params }: Route.LoaderArgs) {
  try {
    const term = await fetchTerm(params.term || "");

    if (!term) {
      throw new Response("Término no encontrado", { status: 404 });
    }

    return { term };
  } catch (error) {
    throw new Response("Error cargando término", { status: 500 });
  }
}

// Meta function con datos del loader
export function meta({ data, params }: Route.MetaArgs) {
  const term = data?.term;
  const baseUrl = "https://econodictionary.com";
  const termUrl = `${baseUrl}/terms/${params.term}`;

  // Si no hay datos, metadatos genéricos
  if (!term) {
    return [
      { title: "Término Económico - Diccionario" },
      { name: "robots", content: "noindex" },
    ];
  }

  // Metadatos dinámicos del término
  return [
    { 
      title: `${term.name} - Diccionario Económico`
    },
    {
      name: "description",
      content: truncateDescription(term.definition, 160)
    },
    {
      name: "keywords",
      content: `${term.name}, ${term.category}, término económico`
    },
    { property: "og:title", content: term.name },
    {
      property: "og:description",
      content: term.definition.substring(0, 100) + "..."
    },
    {
      property: "og:image",
      content: term.image?.url || `${baseUrl}/default-og-image.jpg`
    },
    { property: "og:type", content: "article" },
    { property: "og:url", content: termUrl },
    
    // Article metadata
    { 
      property: "article:published_time", 
      content: new Date(term.createdAt).toISOString() 
    },
    {
      property: "article:modified_time",
      content: new Date(term.updatedAt).toISOString()
    },
    {
      property: "article:author",
      content: term.author?.name || "EconoDictionary"
    },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: term.name },
    {
      name: "twitter:description",
      content: term.definition.substring(0, 100) + "..."
    },
    {
      name: "twitter:image",
      content: term.image?.url || `${baseUrl}/default-og-image.jpg`
    },

    // Technical
    { rel: "canonical", href: termUrl },
  ];
}

// Componente usando datos del loader
export default function TermPage() {
  const { term } = useLoaderData<typeof loader>();
  
  return (
    <article>
      <header>
        <h1>{term.name}</h1>
      </header>
      
      <section>
        <h2>Definición</h2>
        <p>{term.definition}</p>
      </section>
    </article>
  );
}

// Helper function
function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + "...";
}
```

---

## 3. Estructura Semántica HTML

### Elementos HTML5 correctos para SEO

```html
<!-- Página de detalle de término -->
<article>
  <!-- Header principal -->
  <header>
    <h1>Nombre del Término</h1>
    <p>Breve descripción</p>
    <time datetime="2025-10-21">21 de octubre de 2025</time>
  </header>

  <!-- Secciones de contenido -->
  <section aria-labelledby="definition-heading">
    <h2 id="definition-heading">Definición</h2>
    <p>Contenido de la definición...</p>
  </section>

  <section aria-labelledby="example-heading">
    <h2 id="example-heading">Ejemplo</h2>
    <blockquote cite="...">
      Ejemplo de uso del término...
    </blockquote>
  </section>

  <section aria-labelledby="media-heading">
    <h2 id="media-heading">Multimedia</h2>
    <figure>
      <img 
        src="..." 
        alt="Descripción relevante del término"
        loading="lazy"
      />
      <figcaption>Descripción de la imagen</figcaption>
    </figure>
  </section>

  <!-- Footer del artículo -->
  <footer>
    <p>
      <strong>Categoría:</strong> 
      <a href="/terms?category=...">Macroeconomía</a>
    </p>
    <p>
      <strong>Actualizado:</strong>
      <time datetime="2025-10-21">21 de octubre de 2025</time>
    </p>
  </footer>
</article>

<!-- Página de listado -->
<main>
  <header>
    <h1>Diccionario Económico</h1>
    <p>Explora términos y conceptos económicos</p>
  </header>

  <section aria-label="Herramientas de búsqueda y filtrado">
    <form>
      <!-- Búsqueda -->
      <!-- Filtros -->
    </form>
  </section>

  <section aria-label="Lista de términos económicos">
    <!-- Lista de términos -->
  </section>

  <nav aria-label="Paginación">
    <!-- Controles de paginación -->
  </nav>
</main>
```

---

## 4. Accesibilidad + SEO

### Labels y ARIA para mejor a11y y SEO

```tsx
// Formulario accesible
<form role="search">
  {/* Label visible o hidden */}
  <label htmlFor="search-input">Buscar términos económicos</label>
  
  <input
    id="search-input"
    type="search" // No "text", sino "search"
    placeholder="Escribe para buscar..."
    aria-label="Buscar términos por nombre o definición"
    aria-describedby="search-hint"
  />
  
  <p id="search-hint" className="text-sm text-gray-500">
    Puedes buscar por nombre del término o definición
  </p>
</form>

// Filtros con fieldset
<fieldset>
  <legend>Filtrar por categoría</legend>
  
  <select 
    aria-label="Selecciona una categoría para filtrar"
  >
    <option value="">Todas las categorías</option>
    <option value="micro">Microeconomía</option>
    <option value="macro">Macroeconomía</option>
  </select>
</fieldset>

// Estado de búsqueda
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
>
  Se encontraron 25 resultados
</div>

// Links internos descriptivos
<a href="/terms/inflacion" title="Aprende sobre Inflación">
  Leer más sobre Inflación
</a>
```

---

## 5. Utilidades Helper

### Funciones útiles para SEO

```typescript
// app/features/shared/utils/seo.ts

/**
 * Trunca descripción a longitud óptima para meta tags
 * @param description - Texto a truncar
 * @param maxLength - Longitud máxima (default: 160)
 * @returns Descripción truncada con ellipsis
 */
export function truncateDescription(
  description: string,
  maxLength: number = 160
): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3).trim() + "...";
}

/**
 * Sanitiza y prepara título para meta tag
 * @param title - Título principal
 * @param suffix - Sufijo (default: "- EconoDictionary")
 * @returns Título optimizado (≤ 70 chars)
 */
export function cleanTitle(
  title: string,
  suffix: string = "- EconoDictionary"
): string {
  const maxLength = 70;
  const combined = `${title} ${suffix}`;
  
  if (combined.length > maxLength) {
    return combined.substring(0, maxLength - 3).trim() + "...";
  }
  
  return combined;
}

/**
 * Construye URL canonical
 * @param path - Ruta relativa
 * @returns URL absoluta canonical
 */
export function buildCanonicalUrl(path: string): string {
  return `https://econodictionary.com${path}`;
}

/**
 * Genera URL de Open Graph con parámetros
 * @param path - Ruta relativa
 * @param params - Parámetros opcionales
 * @returns URL completa para social sharing
 */
export function generateOGUrl(
  path: string,
  params?: Record<string, string>
): string {
  const url = new URL(`https://econodictionary.com${path}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
}

/**
 * Genera JSON-LD structured data para un término
 * @param term - Datos del término
 * @returns JSON-LD objeto
 */
export function generateTermSchema(term: {
  id: string;
  name: string;
  definition: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  author?: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.name,
    description: term.definition,
    datePublished: term.createdAt,
    dateModified: term.updatedAt,
    ...(term.category && { inDefinedTermSet: term.category }),
    ...(term.author && {
      author: {
        "@type": "Person",
        name: term.author.name,
      },
    }),
  };
}
```

---

## 6. Testing y Validación

### Verificar metadatos renderizados

```bash
# Ver HTML renderizado (SSR)
curl https://econodictionary.com/terms | grep "<meta"

# Extraer solo meta tags
curl -s https://econodictionary.com/terms | grep -o '<meta[^>]*>' | head -20

# Validar estructura HTML
# Usar: https://validator.w3.org/
```

### Herramientas de validación online

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Medir Core Web Vitals y SEO

2. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Validar structured data

3. **Open Graph Validator**
   - https://www.opengraphcheck.com/
   - Ver preview en redes sociales

4. **Schema.org Validator**
   - https://schema.org/validator/
   - Validar JSON-LD

5. **Lighthouse (DevTools)**
   - Presionar F12 → Lighthouse tab
   - Análisis completo de SEO, performance, a11y

---

## 7. Checklist SEO Completo

### Para cada ruta importante:

```
□ Meta function exportada correctamente
□ Title (50-70 caracteres)
□ Meta description (120-160 caracteres)
□ Keywords relevantes (3-5 palabras)
□ Open Graph completo (title, description, url, type)
□ Twitter Card (card, title, description)
□ Canonical URL
□ Robots directive (index/noindex)
□ Language meta tag (es-ES)
□ Viewport meta tag
□ HTML semántico (h1, article, section, header, nav)
□ Labels con htmlFor
□ aria-label en interactivos
□ Links internos descriptivos
□ Alt text en imágenes
□ Time element con dateTime ISO
□ Estructura lógica de headings
□ Sin errores en DevTools Console
```

---

## 8. Referencias

### Documentación
- [React Router Meta Function](https://reactrouter.com/en/main/route/meta)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org](https://schema.org/)
- [Web.dev SEO Guide](https://web.dev/lighthouse-seo/)

### Estándares
- [WCAG Accessibility](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [HTML Semantic Elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)

---

**¡Todo listo para un SEO profesional! 🚀**
