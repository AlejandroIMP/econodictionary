import { Link } from "react-router";
import { Plus } from "lucide-react";
import { Search } from "~/features/terms/components/Search";
import { Filter } from "~/features/terms/components/Filter";
import { TermsList } from "~/features/terms/components/TermsList";
import { Pagination } from "~/features/shared/components/ui/pagination";
import { Button } from "~/features/shared/components/ui/button";
import type { Route } from "./+types/terms";
import { 
  useTerms, 
  useTermsSearch, 
  useTermsFilter, 
  useTermsPagination,
  useCategories 
} from "~/features/terms/hooks/useTerms";

export function meta({}: Route.MetaArgs) {
  const baseUrl = "https://econodictionary.com";
  return [
    { title: "Diccionario Económico - Términos y Conceptos Financieros" },
    { 
      name: "description", 
      content: "Explora nuestro diccionario de términos económicos. Encuentra definiciones claras, ejemplos prácticos y conceptos financieros organizados por categoría." 
    },
    { 
      name: "keywords", 
      content: "términos económicos, conceptos financieros, diccionario economía, definiciones financieras, educación económica" 
    },
    { 
      property: "og:title", 
      content: "Diccionario Económico - Términos y Conceptos" 
    },
    { 
      property: "og:description", 
      content: "Explora términos económicos con definiciones, ejemplos y categorización." 
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
      name: "twitter:card", 
      content: "summary" 
    },
  ];
}

export default function TermsPage() {
  // Use custom hooks for clean separation of concerns
  const { terms, isLoading, error } = useTerms();
  const { search, setSearch } = useTermsSearch();
  const { category, setCategory } = useTermsFilter();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const {
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    setCurrentPage,
    setPageSize,
  } = useTermsPagination();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl lg:text-4xl">
                Diccionario Económico
              </h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                Explora términos y conceptos económicos
              </p>
            </div>
            <Link to="/terms/create">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Término
              </Button>
            </Link>
          </div>
        </header>

        {/* Search and Filter */}
        <section 
          className="mb-6 space-y-4 rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-950 sm:p-6"
          aria-label="Herramientas de búsqueda y filtrado"
        >
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre o definición..."
          />
          <Filter
            selectedCategory={category}
            onCategoryChange={setCategory}
            categories={categories}
            isLoading={categoriesLoading}
          />
        </section>

        {/* Error message */}
        {error && (
          <div 
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950"
            role="alert"
          >
            <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Terms List */}
        <TermsList terms={terms} isLoading={isLoading} />

        {/* Pagination */}
        {!isLoading && totalCount > 0 && (
          <nav className="mt-8" aria-label="Paginación de términos">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </nav>
        )}
      </div>
    </div>
  );
}
