import { useEffect } from "react";
import { useTermStore } from "~/features/terms/store/useTermStore";

export function useTerm(termId: string) {
  const { term, isLoading, error, fetchTerm } = useTermStore();

  useEffect(() => {
    if (termId) {
      fetchTerm(termId);
    }
  }, [termId, fetchTerm]);

  return {
    term,
    isLoading,
    error,
  };
}