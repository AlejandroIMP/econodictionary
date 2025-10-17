import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getCSRFToken } from "../utils/cookies";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  userId: string;
  email: string;
  username: string;
  name?: string;
  surname?: string;
  avatar?: string;
  requiresEmailConfirmation: boolean;
}

interface AuthError {
  message: string;
  errorCode?: string;
  requiresEmailConfirmation?: boolean;
  remainingAttempts?: number | null;
  lockedUntil?: string | null;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  accessToken: string | null; // Stored in memory only (not persisted)

  // Actions
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, surname: string, username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  refreshToken: () => Promise<boolean>;
  resetPassword: (token: string, newPassword: string, confirmPassword: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  clearError: () => void;
  initializeAuth: () => Promise<void>; // New: Initialize auth on app load
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
              
              // Capture detailed error information from API
              const authError: AuthError = {
                message: errorData.message || "Login failed",
                errorCode: errorData.errorCode,
                requiresEmailConfirmation: errorData.requiresEmailConfirmation,
                remainingAttempts: errorData.remainingAttempts,
                lockedUntil: errorData.lockedUntil,
              };
              
              throw authError;
            }

            const data = await response.json();
            
            console.log("✅ Login successful, checking cookies...");
            console.log("📋 Cookies available:", document.cookie);
            console.log("🛡️ CSRF Token:", getCSRFToken());
            
            // Server returns accessToken in body
            // refreshToken is set as HttpOnly cookie automatically
            // XSRF-TOKEN is set as non-HttpOnly cookie automatically
            const user: User = {
              userId: data.userId || data.user?.userId || data.user?.id,
              email: data.email || data.user?.email,
              username: data.username || data.user?.username,
              name: data.name || data.user?.name,
              surname: data.surname || data.user?.surname,
              avatar: data.avatar || data.user?.avatar,
              requiresEmailConfirmation: data.requiresEmailConfirmation || data.user?.requiresEmailConfirmation || false
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
              accessToken: data.accessToken,
            });
          } catch (error) {
            // Check if error is our AuthError object
            const authError: AuthError = (error as AuthError).errorCode 
              ? (error as AuthError)
              : {
                  message: error instanceof Error ? error.message : "Login failed",
                };
            
            set({
              error: authError,
              isLoading: false,
              accessToken: null,
            });
            
            // Re-throw to allow component-level handling
            throw authError;
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
              console.log("❌ No CSRF token - cannot refresh");
              // No CSRF token means no refresh token cookie
              return false;
            }

            console.log("🔄 Attempting token refresh...");

            const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
              method: "POST",
              credentials: "include", // Send HttpOnly refresh cookie
              headers: {
                "X-CSRF-TOKEN": csrfToken, // CSRF protection
              },
            });

            if (!response.ok) {
              console.log(`❌ Token refresh failed: ${response.status} ${response.statusText}`);
              return false;
            }

            const data = await response.json();
            
            console.log("✅ Token refresh successful");

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
            console.error("❌ Token refresh error:", error);
            set({
              accessToken: null,
              user: null,
              isAuthenticated: false,
            });
            return false;
          }
        },

        register: async (name, surname, username, email, password, confirmPassword) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, surname, username, email, password, confirmPassword }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ 
                message: response.statusText 
              }));
              
              const authError: AuthError = {
                message: errorData.message || "Registration failed",
                errorCode: errorData.errorCode,
              };
              
              set({
                error: authError,
                isLoading: false,
              });
              
              throw authError;
            }

            set({
              isAuthenticated: false,
              isLoading: false
            });
          } catch (error) {
            const authError: AuthError = (error as AuthError).errorCode 
              ? (error as AuthError)
              : {
                  message: error instanceof Error ? error.message : "Registration failed",
                };
            
            set({
              error: authError,
              isLoading: false,
            });
            
            throw authError;
          }
        },

        resetPassword: async (token, newPassword, confirmPassword) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/auth/reset-password`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token, newPassword, confirmPassword }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ 
                message: response.statusText 
              }));
              
              const authError: AuthError = {
                message: errorData.message || "Password reset failed",
                errorCode: errorData.errorCode,
              };
              
              set({
                error: authError,
                isLoading: false,
              });
              
              throw authError;
            }

            set({ isLoading: false });
          } catch (error) {
            const authError: AuthError = (error as AuthError).errorCode 
              ? (error as AuthError)
              : {
                  message: error instanceof Error ? error.message : "Password reset failed",
                };
            
            set({
              error: authError,
              isLoading: false,
            });
            
            throw authError;
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
              
              const authError: AuthError = {
                message: errorData.message || "Request failed",
                errorCode: errorData.errorCode,
              };
              
              set({
                error: authError,
                isLoading: false,
              });
              
              throw authError;
            }

            set({ isLoading: false });
          } catch (error) {
            const authError: AuthError = (error as AuthError).errorCode 
              ? (error as AuthError)
              : {
                  message: error instanceof Error ? error.message : "Request password reset failed",
                };
            
            set({
              error: authError,
              isLoading: false,
            });
            
            throw authError;
          }
        },

        clearError: () => set({ error: null }),

        // Initialize auth - Try to refresh token on app load if user was authenticated
        initializeAuth: async () => {
          const state = get();
          
          // Only try to refresh if we think user should be authenticated
          // but we don't have an access token (lost on page reload)
          if (state.isAuthenticated && !state.accessToken) {
            console.log("🔄 Attempting to restore session...");
            
            // Wait a bit for cookies to be available (browser needs time to load them)
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const success = await get().refreshToken();
            
            if (!success) {
              console.log("⚠️ Session restore failed - user may need to login again");
              // Don't force logout immediately - user might have valid session
              // Just clear the flag but keep user info for UI
              // They'll get prompted to login when they try to do an authenticated action
              set({
                accessToken: null,
                isAuthenticated: false, // Mark as not authenticated so UI can show login
              });
            } else {
              console.log("✅ Session restored successfully");
            }
          }
        },
      }),
      {
        name: "auth-storage-v2", // Changed version to clear old data
        partialize: (state) => ({
          // Only persist safe user data, NOT accessToken
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
        version: 2, // Add versioning
        migrate: (persistedState: any, version: number) => {
          // Migration logic if needed
          if (version === 0 || version === 1) {
            // Clear old data and return fresh state
            return {
              user: null,
              isAuthenticated: false,
            };
          }
          return persistedState;
        },
      }
    )
  )
);
