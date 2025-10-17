import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getCSRFToken } from "../utils/cookies";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null; // Stored in memory only (not persisted)

  // Actions
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  refreshToken: () => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        accessToken: null, // Not persisted, memory only

        // Actions
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
          }),

        setAccessToken: (token) =>
          set({
            accessToken: token,
          }),

        login: async (email, password) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
              method: "POST",
              credentials: "include", // Important: receive HttpOnly cookies
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ emailOrUsername: email, password }),
            });
            
            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ 
                message: response.statusText 
              }));
              throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            
            // Server returns accessToken in body
            // refreshToken is set as HttpOnly cookie automatically
            // XSRF-TOKEN is set as non-HttpOnly cookie automatically
            const user: User = {
              id: data.user.id,
              email: data.user.email,
              name: data.user.username,
              avatar: data.user.avatar,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
              accessToken: data.accessToken,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Login failed",
              isLoading: false,
              accessToken: null,
            });
          }
        },

        logout: async () => {
          try {
            const csrfToken = getCSRFToken();
            
            // Call logout endpoint to revoke tokens and clear cookies
            await fetch(`${API_URL}/api/auth/logout`, {
              method: "POST",
              credentials: "include",
              headers: csrfToken ? {
                "X-CSRF-TOKEN": csrfToken,
              } : {},
            }).catch(() => {
              // Ignore errors on logout
            });
          } finally {
            // Always clear local state
            set({
              user: null,
              isAuthenticated: false,
              error: null,
              accessToken: null,
            });
          }
        },

        refreshToken: async () => {
          try {
            const csrfToken = getCSRFToken();
            
            if (!csrfToken) {
              // No CSRF token means no refresh token cookie
              return false;
            }

            const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
              method: "POST",
              credentials: "include", // Send HttpOnly refresh cookie
              headers: {
                "X-CSRF-TOKEN": csrfToken, // CSRF protection
              },
            });

            if (!response.ok) {
              return false;
            }

            const data = await response.json();
            
            // Update access token and optionally user data
            set({
              accessToken: data.accessToken,
              isAuthenticated: !!data.accessToken,
            });

            if (data.user) {
              set({ user: data.user });
            }

            return true;
          } catch (error) {
            console.error("Token refresh failed:", error);
            set({
              accessToken: null,
              user: null,
              isAuthenticated: false,
            });
            return false;
          }
        },

        register: async (email, password, name) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ 
                message: response.statusText 
              }));
              throw new Error(errorData.message || "Registration failed");
            }

            const data = await response.json();
            const user: User = {
              id: data.id,
              email: data.email,
              name: data.name,
              avatar: data.avatar,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              accessToken: data.accessToken,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Registration failed",
              isLoading: false,
            });
          }
        },

        resetPassword: async (token, newPassword) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/auth/reset-password`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ 
                message: response.statusText 
              }));
              throw new Error(errorData.message || "Password reset failed");
            }

            set({ isLoading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Password reset failed",
              isLoading: false,
            });
          }
        },

        requestPasswordReset: async (email) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ 
                message: response.statusText 
              }));
              throw new Error(errorData.message || "Request failed");
            }

            set({ isLoading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Request password reset failed",
              isLoading: false,
            });
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          // Only persist safe user data, NOT accessToken
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
