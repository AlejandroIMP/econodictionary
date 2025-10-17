import { useAuthStore } from "../store";

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    accessToken,
    login,
    logout,
    register,
    refreshToken,
    resetPassword,
    requestPasswordReset,
    clearError,
    initializeAuth,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    accessToken,
    login,
    logout,
    register,
    refreshToken,
    resetPassword,
    requestPasswordReset,
    clearError,
    initializeAuth,
  };
}