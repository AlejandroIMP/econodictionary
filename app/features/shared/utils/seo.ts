/**
 * SEO utilities for generating meta tags and structured data
 * Designed for React Router v7 with SSR enabled
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  robots?: string;
}

const BASE_URL = "https://econodictionary.com";

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(config: SEOConfig) {
  return [
    { title: config.title },
    { name: "description", content: config.description },
    ...(config.keywords ? [{ name: "keywords", content: config.keywords }] : []),
    { property: "og:title", content: config.ogTitle || config.title },
    {
      property: "og:description",
      content: config.ogDescription || config.description,
    },
    ...(config.ogImage ? [{ property: "og:image", content: config.ogImage }] : []),
    { property: "og:url", content: config.ogUrl || BASE_URL },
    { property: "og:site_name", content: "EconoDictionary" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: config.ogTitle || config.title },
    { name: "twitter:description", content: config.ogDescription || config.description },
    ...(config.ogImage ? [{ name: "twitter:image", content: config.ogImage }] : []),
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "es-ES" },
    { name: "author", content: "EconoDictionary" },
    {
      name: "robots",
      content: config.robots || "index, follow",
    },
    ...(config.canonical ? [{ rel: "canonical", href: config.canonical }] : []),
  ];
}

/**
 * Generate JSON-LD structured data for a term
 */
export function generateTermStructuredData(term: {
  id: string;
  name: string;
  definition: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: term.name,
    description: term.definition,
    image: term.imageUrl,
    datePublished: term.createdAt,
    dateModified: term.updatedAt,
    author: {
      "@type": "Organization",
      name: "EconoDictionary",
    },
    publisher: {
      "@type": "Organization",
      name: "EconoDictionary",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    ...(term.category && {
      articleSection: term.category,
    }),
  };
}

/**
 * Generate JSON-LD structured data for a dictionary collection
 */
export function generateDictionaryStructuredData(params?: {
  totalTerms?: number;
  categories?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Diccionario Económico",
    description:
      "Un diccionario colaborativo de términos económicos, conceptos financieros y definiciones.",
    url: `${BASE_URL}/terms`,
    ...(params?.totalTerms && {
      numberOfTerms: params.totalTerms,
    }),
    ...(params?.categories && {
      hasDefinedTerm: params.categories.map((cat) => ({
        "@type": "DefinedTerm",
        name: cat,
      })),
    }),
  };
}

/**
 * Construct full URL for Open Graph and social sharing
 */
export function getOGUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

/**
 * Generate SEO-friendly page title
 */
export function generatePageTitle(
  pageTitle: string,
  suffix = "Diccionario Económico"
): string {
  return `${pageTitle} - ${suffix}`;
}

/**
 * Truncate description to optimal length for meta tags
 */
export function truncateDescription(
  description: string,
  maxLength = 160
): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + "...";
}
