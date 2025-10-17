import { useEffect } from "react";
import { useTermsStore } from "~/features/terms/store/useTermsStore";

/**
 * Hook to manage terms data with automatic fetching
 */
export function useTerms() {
  const {
    setCategories,
    categories,
    terms,
    isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    pageSize,
    filters,
    fetchTerms,
    fetchCategories,
    setCurrentPage,
    setPageSize,
    setFilters,
    clearFilters,
  } = useTermsStore();

  // Fetch categories on mount (only once)
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch terms on mount and when dependencies change
  useEffect(() => {
    fetchTerms();
  }, [currentPage, pageSize, filters.search, filters.category, fetchTerms]);

  return {
    terms,
    categories,
    isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    pageSize,
    filters,
    setCurrentPage,
    setPageSize,
    setFilters,
    clearFilters,
  };
}

/**
 * Hook to manage search functionality with debouncing
 */
export function useTermsSearch() {
  const { filters, setFilters } = useTermsStore();

  const setSearch = (search: string) => {
    setFilters({ search });
  };

  return {
    search: filters.search || "",
    setSearch,
  };
}

/**
 * Hook to manage category filtering
 */
export function useTermsFilter() {
  const { filters, setFilters } = useTermsStore();

  const setCategory = (category: string) => {
    setFilters({ category: category === "All Categories" ? "" : category });
  };

  return {
    category: filters.category || "All Categories",
    setCategory,
  };
}

/**
 * Hook to manage pagination
 */
export function useTermsPagination() {
  const {
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    setCurrentPage,
    setPageSize,
    nextPage,
    previousPage,
  } = useTermsStore();

  return {
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    setCurrentPage,
    setPageSize,
    nextPage,
    previousPage,
  };
}

/**
 * Hook to manage categories with automatic fetching
 */
export function useCategories() {
  const { categories, isLoading, fetchCategories } = useTermsStore();

  // Fetch categories on mount (only once)
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  // Add "All Categories" option at the beginning
  const categoriesWithAll = ["All Categories", ...categories];

  return {
    categories: categoriesWithAll,
    isLoading,
  };
}
