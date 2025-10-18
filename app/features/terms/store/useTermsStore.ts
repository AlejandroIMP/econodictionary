import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Term, TermsFilters, CreateTermRequest } from "~/features/terms/types";
import { authFetch, authFetchJSON } from "~/features/auth/utils";
const isDev = import.meta.env.DEV;
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
        // GET /api/term/paged with query parameters
        // No authentication required
        fetchTerms: async () => {
          const state = get();
          set({ isLoading: true, error: null });

          try {
            if (isDev) console.log("📥 Fetching terms with filters:", {
              page: state.currentPage,
              pageSize: state.pageSize,
              category: state.filters.category,
              search: state.filters.search,
            });

            // Build query parameters for the paged endpoint
            const params = new URLSearchParams();
            
            // Pagination (API uses 1-based page numbers)
            params.append('page', state.currentPage.toString());
            params.append('pageSize', state.pageSize.toString());
            
            // Category filter
            if (state.filters.category && state.filters.category !== "All Categories") {
              params.append('category', state.filters.category);
            }
            
            // Search filter (supported by API with 'search' parameter)
            if (state.filters.search) {
              params.append('search', state.filters.search);
            }
            
            // Order by creation date (newest first)
            params.append('orderBy', 'CreatedAt');
            params.append('orderDirection', 'desc');
            
            // Only show approved terms by default
            params.append('isApproved', 'true');

            // Fetch terms using authFetchJSON (handles auth + CSRF + retry automatically)
            const data = await authFetchJSON<PagedResponse>(
              `/api/term/paged?${params.toString()}`
            );

            if (isDev)console.log("✅ Terms fetched successfully:", {
              count: data.items.length,
              totalCount: data.totalCount,
              totalPages: data.totalPages,
            });

            // Update state with the API response
            set({
              terms: data.items,
              totalCount: data.totalCount,
              totalPages: data.totalPages,
              currentPage: data.page,
              isLoading: false,
            });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch terms";
            console.error("❌ Error fetching terms:", errorMessage);
            set({
              error: errorMessage,
              isLoading: false,
            });
          }
        },

        // CRUD Operations
        // POST /api/term
        // Creates a new term - requires authentication
        // Moderación: Before creating, moderation service runs and can approve, request review, or reject
        createTerm: async (data: CreateTermRequest) => {
          set({ isLoading: true, error: null });

          try {
            if (isDev)console.log("📤 Creating new term:", {
              name: data.name,
              category: data.category,
            });

            // POST /api/term - requires authentication
            // authFetchJSON handles Authorization header and CSRF token automatically
            const newTerm = await authFetchJSON<Term>('/api/term', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (isDev)console.log("✅ Term created successfully:", {
              id: newTerm.id,
              name: newTerm.name,
              isApproved: newTerm.isApproved,
              rejectionReason: newTerm.rejectionReason,
            });

            // Add to local state (prepend to list)
            get().addTerm(newTerm);
            
            set({ isLoading: false });
            return newTerm;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create term";
            console.error("❌ Error creating term:", errorMessage);
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        // PUT /api/term/my/{id}
        // Updates own term - requires authentication, only author can edit
        // Applies automatic moderation on content changes
        editTerm: async (id: string, data: Partial<CreateTermRequest>) => {
          set({ isLoading: true, error: null });

          try {
            if (isDev)console.log("📝 Updating term:", {
              id,
              name: data.name,
              category: data.category,
            });

            // PUT /api/term/my/{id} - Use this endpoint for authors to update their own terms
            // Moderation will be applied to the updated content
            const updatedTerm = await authFetchJSON<Term>(`/api/term/my/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (isDev)console.log("✅ Term updated successfully:", {
              id: updatedTerm.id,
              name: updatedTerm.name,
              isApproved: updatedTerm.isApproved,
              rejectionReason: updatedTerm.rejectionReason,
            });

            // Update in local state
            get().updateTerm(id, updatedTerm);
            
            set({ isLoading: false });
            return updatedTerm;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update term";
            console.error("❌ Error updating term:", errorMessage);
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        // DELETE /api/term/{id}
        // Deletes a term - requires authentication
        // Only author or admin/moderator can delete
        removeTerm: async (id: string) => {
          set({ isLoading: true, error: null });

          try {
            if (isDev)console.log("🗑️ Deleting term:", id);

            // DELETE /api/term/{id} - requires authentication + authorization
            // authFetch handles Authorization header and CSRF token automatically
            await authFetch(`/api/term/${id}`, {
              method: 'DELETE',
            });

            if (isDev)console.log("✅ Term deleted successfully:", id);

            // Remove from local state
            get().deleteTerm(id);
            
            set({ isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete term";
            console.error("❌ Error deleting term:", errorMessage);
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        // GET /api/term/categories
        // Fetches list of distinct categories
        // No authentication required
        fetchCategories: async () => {
          set({ isLoading: true, error: null });
          try {
            if (isDev)console.log("📥 Fetching categories");

            // Fetch distinct categories from API
            const categories = await authFetchJSON<string[]>('/api/term/categories');
            
            if (isDev)console.log("✅ Categories fetched successfully:", {
              count: categories.length,
              categories: categories.slice(0, 5), // Show first 5 for logging
            });

            set({ categories, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch categories";
            console.error("❌ Error fetching categories:", errorMessage);
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
