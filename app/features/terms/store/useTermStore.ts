import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Term } from "~/features/terms/types";
import { authFetchJSON } from "~/features/auth/utils";

const isDev = import.meta.env.DEV;
interface TermsState {
  // Data
  term: Term | null;

  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTerm: (term: Term) => void;

  // UI actions
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Fetch actions
  fetchTerm: (id: string) => Promise<void>;
}

export const useTermStore = create<TermsState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        term: null,
        isLoading: false,
        error: null,

        // Actions
        setTerm: (term) => set({ term }),

        // UI actions
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),

        // Fetch a single term by ID
        // GET /api/term/{id}
        // No authentication required
        fetchTerm: async (id: string) => {
          set({ isLoading: true, error: null });

          try {
            if (isDev)console.log(`📥 Fetching term with ID: ${id}`);
            
            // Use authFetchJSON for consistency with other API calls
            // GET requests don't require CSRF token
            const data = await authFetchJSON<Term>(`/api/term/${id}`);
            
            if (isDev)console.log("✅ Term fetched successfully:", data);
            set({ term: data, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch term";
            console.error("❌ Error fetching term:", errorMessage);
            set({ error: errorMessage, isLoading: false });
          }
        },
      }),
      {
        name: "term-storage",
      }
    )
  )
);