import { Link } from "react-router";
import { Plus } from "lucide-react";
import { Search } from "~/features/terms/components/Search";
import { Filter } from "~/features/terms/components/Filter";
import { TermsList } from "~/features/terms/components/TermsList";
import { Pagination } from "~/features/shared/components/ui/pagination";
import { Button } from "~/features/shared/components/ui/button";
import { 
  useTerms, 
  useTermsSearch, 
  useTermsFilter, 
  useTermsPagination,
  useCategories 
} from "~/features/terms/hooks/useTerms";

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
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl lg:text-4xl">
                Economic Dictionary
              </h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                Explore economic terms and concepts
              </p>
            </div>
            <Link to="/terms/create">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Term
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4 rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-950 sm:p-6">
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Search by name or definition..."
          />
          <Filter
            selectedCategory={category}
            onCategoryChange={setCategory}
            categories={categories}
            isLoading={categoriesLoading}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Terms List */}
        <TermsList terms={terms} isLoading={isLoading} />

        {/* Pagination */}
        {!isLoading && totalCount > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}
