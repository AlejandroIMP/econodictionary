import { useAuthStore } from "../store";

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    accessToken,
    csrfToken,
    login,
    logout,
    register,
    refreshToken,
    resetPassword,
    requestPasswordReset,
    clearError,
    initializeAuth,
    setCsrfToken,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    accessToken,
    csrfToken,
    login,
    logout,
    register,
    refreshToken,
    resetPassword,
    requestPasswordReset,
    clearError,
    initializeAuth,
    setCsrfToken,
  };
}