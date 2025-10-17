import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Term } from "~/features/terms/types";

const API_URL = import.meta.env.VITE_API_URL;

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
        fetchTerm: async (id: string) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/term/${id}`);
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const data: Term = await response.json();
            set({ term: data, isLoading: false });
          } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
          }
        },
      }),
      {
        name: "term-storage", // unique name
      }
    )
  )
);