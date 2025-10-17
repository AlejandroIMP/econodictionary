import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Term, TermsFilters, CreateTermRequest } from "~/features/terms/types";
import { authFetch, authFetchJSON } from "~/features/auth/utils";

// API Response type for paginated endpoint
interface PagedResponse {
  items: Term[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface TermsState {
  // Data
  terms: Term[];
  totalCount: number;
  categories: string[]; // List of distinct categories
  
  // Pagination
  currentPage: number;
  pageSize: number;
  totalPages: number;
  
  // Filters
  filters: TermsFilters;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTerms: (terms: Term[], totalCount: number) => void;
  setCategories: (categories: string[]) => void;
  addTerm: (term: Term) => void;
  updateTerm: (id: string, term: Partial<Term>) => void;
  deleteTerm: (id: string) => void;
  
  // CRUD operations (API calls)
  createTerm: (data: CreateTermRequest) => Promise<Term>;
  editTerm: (id: string, data: Partial<CreateTermRequest>) => Promise<Term>;
  removeTerm: (id: string) => Promise<void>;
  
  // Pagination actions
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  
  // Filter actions
  setFilters: (filters: Partial<TermsFilters>) => void;
  clearFilters: () => void;
  
  // UI actions
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Fetch actions (to be implemented with API)
  fetchTerms: () => Promise<void>;

  // Fetch categories
  fetchCategories: () => Promise<void>;
}

export const useTermsStore = create<TermsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        terms: [],
        categories: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 9,
        totalPages: 0,
        filters: {
          search: "",
          category: "",
        },
        isLoading: false,
        error: null,
        
        setCategories: (categories) => set({ categories }),
        // Data actions
        setTerms: (terms, totalCount) =>
          set((state) => ({
            terms,
            totalCount,
            totalPages: Math.ceil(totalCount / state.pageSize),
          })),

        addTerm: (term) =>
          set((state) => ({
            terms: [term, ...state.terms],
            totalCount: state.totalCount + 1,
            totalPages: Math.ceil((state.totalCount + 1) / state.pageSize),
          })),

        updateTerm: (id, updatedTerm) =>
          set((state) => ({
            terms: state.terms.map((term) =>
              term.id === id ? { ...term, ...updatedTerm } : term
            ),
          })),

        deleteTerm: (id) =>
          set((state) => ({
            terms: state.terms.filter((term) => term.id !== id),
            totalCount: state.totalCount - 1,
            totalPages: Math.ceil((state.totalCount - 1) / state.pageSize),
          })),

        // Pagination actions
        setCurrentPage: (page) => set({ currentPage: page }),

        setPageSize: (size) =>
          set((state) => ({
            pageSize: size,
            totalPages: Math.ceil(state.totalCount / size),
            currentPage: 1, // Reset to first page
          })),

        nextPage: () =>
          set((state) => ({
            currentPage: Math.min(state.currentPage + 1, state.totalPages),
          })),

        previousPage: () =>
          set((state) => ({
            currentPage: Math.max(state.currentPage - 1, 1),
          })),

        // Filter actions
        setFilters: (filters) =>
          set((state) => ({
            filters: { ...state.filters, ...filters },
            currentPage: 1, // Reset to first page when filters change
          })),

        clearFilters: () =>
          set({
            filters: { search: "", category: "" },
            currentPage: 1,
          }),

        // UI actions
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),

        // Fetch action using the new /api/term/paged endpoint
        fetchTerms: async () => {
          const state = get();
          set({ isLoading: true, error: null });

          try {
            // Build query parameters for the paged endpoint
            const params = new URLSearchParams();
            
            // Pagination (API uses 1-based page numbers)
            params.append('page', state.currentPage.toString());
            params.append('pageSize', state.pageSize.toString());
            
            // Category filter
            if (state.filters.category && state.filters.category !== "All Categories") {
              params.append('category', state.filters.category);
            }
            
            // Search filter (now supported by API!)
            if (state.filters.search) {
              params.append('search', state.filters.search);
            }
            
            // Order by creation date (newest first)
            params.append('orderBy', 'CreatedAt');
            params.append('orderDirection', 'desc');
            
            // Only show approved terms (optional - remove this line to show all)
            params.append('isApproved', 'true');

            // Fetch terms using authFetch (handles auth + CSRF automatically)
            const data = await authFetchJSON<PagedResponse>(
              `/api/term/paged?${params.toString()}`
            );

            // Update state with the API response
            set({
              terms: data.items,
              totalCount: data.totalCount,
              totalPages: data.totalPages,
              currentPage: data.page,
              isLoading: false,
            });
          } catch (error) {
            console.error('Fetch error:', error);
            set({
              error: error instanceof Error ? error.message : "Failed to fetch terms",
              isLoading: false,
            });
          }
        },

        // CRUD Operations
        createTerm: async (data: CreateTermRequest) => {
          set({ isLoading: true, error: null });

          try {
            // POST /api/term - requires authentication
            const newTerm = await authFetchJSON<Term>('/api/term', {
              method: 'POST',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            // Add to local state (prepend to list)
            get().addTerm(newTerm);
            
            set({ isLoading: false });
            return newTerm;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create term";
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        editTerm: async (id: string, data: Partial<CreateTermRequest>) => {
          set({ isLoading: true, error: null });

          try {
            // PUT /api/term/{id} - requires authentication + authorization (same author)
            const updatedTerm = await authFetchJSON<Term>(`/api/term/${id}`, {
              method: 'PUT',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            // Update in local state
            get().updateTerm(id, updatedTerm);
            
            set({ isLoading: false });
            return updatedTerm;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update term";
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        removeTerm: async (id: string) => {
          set({ isLoading: true, error: null });

          try {
            // DELETE /api/term/{id} - requires authentication + authorization (same author)
            await authFetch(`/api/term/${id}`, {
              credentials: "include",
              method: 'DELETE',
            });

            // Remove from local state
            get().deleteTerm(id);
            
            set({ isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete term";
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        fetchCategories: async () => {
          set({ isLoading: true, error: null });
          try {
            // Fetch distinct categories from API
            const categories = await authFetchJSON<string[]>('/api/term/categories');
            set({ categories, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch categories";
            set({ error: errorMessage, isLoading: false });
          }
        }
      }),
      {
        name: "terms-storage",
        partialize: (state) => ({
          pageSize: state.pageSize,
          filters: state.filters,
        }),
      }
    )
  )
);
