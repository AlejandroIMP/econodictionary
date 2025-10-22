# SEO Optimization Guide - EconoDictionary

Este documento describe las mejoras de SEO implementadas en la sección de Términos del Diccionario Económico, optimizadas para React Router v7 con SSR habilitado.

## 📋 Tabla de Contenidos

1. [Mejoras Implementadas](#mejoras-implementadas)
2. [Estructura Semántica](#estructura-semántica)
3. [Meta Tags y Open Graph](#meta-tags-y-open-graph)
4. [Accesibilidad (A11y)](#accesibilidad-a11y)
5. [Rendimiento SEO](#rendimiento-seo)
6. [Recomendaciones Futuras](#recomendaciones-futuras)

## 🚀 Mejoras Implementadas

### 1. **Meta Tags Completos en Rutas**

Cada ruta importante tiene meta tags optimizados:

- **layout.tsx** - Meta tags base para toda la sección de términos
- **terms.tsx** - Meta tags para la página de listado de términos
- **term.tsx** - Meta tags dinámicos para páginas de detalle
- **create-term.tsx** - Meta tags para formulario de creación
- **edit-term.tsx** - Meta tags para formulario de edición

#### Estructura de Meta Tags:

```typescript
// Incluye:
- Title optimizado (60-70 caracteres)
- Description única (120-160 caracteres)
- Keywords relevantes
- Open Graph (og:title, og:description, og:url, og:type)
- Twitter Card (twitter:card, twitter:title, twitter:description)
- Canonical URLs
- Language y viewport
- Robots directives (index/noindex)
```

### 2. **Estructura Semántica HTML5**

Se utilizan elementos semánticos apropiados:

```html
<article>        <!-- Para páginas de detalle de términos -->
  <header>       <!-- Para secciones de encabezado principal -->
    <h1>Título del término</h1>
  </header>
  <section>      <!-- Para agrupaciones lógicas de contenido -->
</article>
<nav>            <!-- Para navegación de paginación -->
```

### 3. **Componentes Mejorados**

#### TermsList.tsx
- Elemento `<section>` con `aria-label`
- Etiqueta `<article>` para cada término
- Elemento `<time>` con atributo `dateTime` ISO

#### Search.tsx
- `<label htmlFor>` con `sr-only` (screen reader only)
- Input type `search` en lugar de `text`
- `aria-label` descriptivos

#### Filter.tsx
- `<fieldset>` y `<legend>` para grupos de filtros
- `aria-label` en select
- `role="status"` y `aria-live="polite"` para actualizaciones

## 🏷️ Meta Tags y Open Graph

### Layout Base (layout.tsx)

```typescript
{
  title: "Diccionario Económico - Aprende Términos Financieros y Económicos",
  description: "Descubre conceptos económicos, términos financieros y explicaciones claras...",
  keywords: "diccionario económico, términos financieros, conceptos económicos...",
  og:type: "website",
  og:url: "https://econodictionary.com/terms",
  canonical: "https://econodictionary.com/terms"
}
```

### Página de Listado (terms.tsx)

- **Title**: "Diccionario Económico - Términos y Conceptos Financieros"
- **Meta Description**: Explora el diccionario con búsqueda y filtrado
- **OG Type**: website
- **Keywords**: Enfocados en descubrimiento y exploración

### Página de Detalle (term.tsx)

- **Meta dinámicos**: Se generan basados en el ID del término
- **OG Type**: article
- **OG URL**: `https://econodictionary.com/terms/{termId}`
- **Nota**: Para metadatos completamente dinámicos, usar Loaders

### Formularios (create-term.tsx, edit-term.tsx)

- **robots**: `noindex, follow` (no indexar formularios)
- **OG Type**: website
- **Purpose**: Información sobre qué esperar

## ♿ Accesibilidad (A11y)

### Mejoras ARIA:

1. **aria-label**: Botones y acciones descriptivas
2. **aria-live**: Actualizaciones dinámicas (filtros activos)
3. **aria-label en Section**: Agrupa contenido relacionado
4. **role="alert"**: Mensajes de error destacados
5. **role="status"**: Cambios de estado no críticos

### Elementos de Accesibilidad:

```tsx
// Labels ocultos para lectores de pantalla
<label htmlFor="search-terms" className="sr-only">
  Buscar términos económicos
</label>

// Campos de formulario correctamente etiquetados
<fieldset>
  <legend>Filtrar por:</legend>
  <select id="category-filter" aria-label="...">
```

## 📊 Rendimiento SEO

### Core Web Vitals Optimizations:

1. **Imágenes**:
   - Usar `<img>` con atributo `alt` descriptivo
   - Considerar WebP con fallback
   - Lazy loading para imágenes no críticas

2. **Estructura de Contenido**:
   - Headings jerárquicos correctos (h1 → h2 → h3)
   - Párrafos descriptivos con palabras clave
   - Listas para agrupar información relacionada

3. **Velocidad de Carga**:
   - SSR ya renderiza en servidor
   - Meta tags en head (no en body)
   - Minimizar JavaScript en camino crítico

4. **Mobile-Friendly**:
   - Responsive design (Tailwind classes)
   - Touch-friendly elements (botones ≥ 44px)
   - Viewport meta tag configurado

## 📈 Recomendaciones Futuras

### 1. **Datos Estructurados (Schema.org)**

Implementar en `app/features/shared/utils/seo.ts`:

```typescript
// JSON-LD para términos
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Inflación",
  "description": "...",
  "author": {...}
}
</script>
```

### 2. **Sitemaps y Robots.txt**

```
/public/sitemap.xml
/public/robots.txt

Incluir:
- Rutas de términos
- Priority: 0.8 para /terms, 0.7 para /terms/{id}
- Changefreq: weekly para listado, monthly para detalle
```

### 3. **Internacionalización (i18n)**

- Agregar `hreflang` tags para versiones en otros idiomas
- Configurar language meta tags
- Url canonical para versión preferida

### 4. **Mejoras en Loaders (React Router v7)**

Para metadatos completamente dinámicos:

```typescript
export async function loader({ params }: Route.LoaderArgs) {
  const term = await fetchTerm(params.termId);
  
  return {
    term,
    meta: [
      { title: `${term.name} - Diccionario Económico` },
      { 
        name: "description", 
        content: term.definition.substring(0, 160) + "..."
      },
    ]
  };
}
```

### 5. **Open Graph Images**

- Generar imágenes dinámicas para términos
- Usar servicio como Vercel OG o similar
- Mejorar visualización en redes sociales

### 6. **Canonical URLs**

- Asegurar que cada página tiene canonical correcto
- Manejar parámetros de query (sort, filter)
- Consolidar contenido duplicado

### 7. **Internal Linking**

- Términos relacionados con links internos
- Estructura de navegación clara
- Breadcrumbs en páginas de detalle

### 8. **Google Search Console**

- Verificar propiedad del sitio
- Monitorear palabras clave principales
- Revisar Core Web Vitals
- Corregir errores de cobertura

### 9. **Analytics y Seguimiento**

- Google Analytics 4 con SSR
- Tracking de conversiones (crear término, etc.)
- Heatmaps y user behavior

### 10. **Rich Snippets**

- FAQ Schema para sección de FAQ
- BreadcrumbList Schema para navegación
- ProductCollection Schema para diccionario

## 🔍 Testing SEO

### Manual Checks:

```bash
# Verificar meta tags en HTML renderizado
curl https://econodictionary.com/terms | grep "<meta"

# Validar structured data
# Usar: https://schema.org/validator/
# Usar: https://search.google.com/test/rich-results
```

### Herramientas Recomendadas:

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Ahrefs SEO Toolbar](https://ahrefs.com/toolbar)

## 📚 Referencias

- [React Router Meta Function](https://reactrouter.com/en/main/route/meta)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Web.dev SEO Guide](https://web.dev/lighthouse-seo/)
- [Schema.org Reference](https://schema.org/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Última actualización**: Octubre 2025
**Versión**: 1.0
