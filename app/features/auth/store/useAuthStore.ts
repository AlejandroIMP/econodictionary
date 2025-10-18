import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getCSRFToken } from "../utils/cookies";

const API_URL = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
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
  accessToken: string | null; // Stored in memory and persisted
  csrfToken: string | null; // CSRF token from cookie, persisted

  // Actions
  getUserData: () => Promise<void>;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setCsrfToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, surname: string, username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  refreshToken: () => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
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
        accessToken: null,
        csrfToken: null,

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

        setCsrfToken: (token) =>
          set({
            csrfToken: token,
          }),

        getUserData: async () => {
          set({ isLoading: true, error: null });
          
          try {
            const csrfToken = get().csrfToken || getCSRFToken();
            const response = await fetch(`${API_URL}/api/auth/me`, {
              method: "GET",
              credentials: "include",
              headers: csrfToken ? {
                "X-CSRF-TOKEN": csrfToken,
              } : {},
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch user data: ${response.statusText}`);
            }

            const data = await response.json();
            const user: User = {
              userId: data.userId || data.id,
              email: data.email,
              username: data.username,
              name: data.name,
              surname: data.surname,
              avatar: data.avatar,
              requiresEmailConfirmation: data.requiresEmailConfirmation || false
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: {
                message: error instanceof Error ? error.message : "Failed to fetch user data",
              },
              isLoading: false,
            });
          }
        },

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
            
            // Extract CSRF token from cookie
            const csrfFromCookie = document.cookie
              .split('; ')
              .find(row => row.startsWith('XSRF-TOKEN='))
              ?.split('=')[1];
            
            const decodedCsrf = csrfFromCookie ? decodeURIComponent(csrfFromCookie) : null;
            
            if (isDev){
              console.log("✅ Login successful, checking cookies...");
              console.log("📋 Cookies available:", document.cookie);
              console.log("🛡️ CSRF Token:", decodedCsrf);
            }
            
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
              csrfToken: decodedCsrf,
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
              csrfToken: null,
            });
          }
        },

        refreshToken: async () => {
          try {
            // Try to get CSRF token from store first, then from cookie
            let csrfToken = get().csrfToken || getCSRFToken();
            
            if (!csrfToken) {
              // Try to extract from cookie one more time
              const csrfFromCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
              
              if (csrfFromCookie) {
                csrfToken = decodeURIComponent(csrfFromCookie);
                set({ csrfToken });
              }
            }
            
            if (!csrfToken) {
              if (isDev)console.log("❌ No CSRF token - cannot refresh");
              return false;
            }

            if (isDev)console.log("🔄 Attempting token refresh...");

            const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
              method: "POST",
              credentials: "include", // Send HttpOnly refresh cookie
              headers: {
                "X-CSRF-TOKEN": csrfToken, // CSRF protection
              },
            });

            if (!response.ok) {
              if (isDev)console.log(`❌ Token refresh failed: ${response.status} ${response.statusText}`);
              return false;
            }

            const data = await response.json();
            
            if (isDev)console.log("✅ Token refresh successful");

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
              throw new Error(errorData.message || "Registration failed");
            }

            set({
              isAuthenticated: false,
              isLoading: false
            });
          } catch (error) {
            set({
              error: {
                message: error instanceof Error ? error.message : "Registration failed",
              },
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
              error: {
                message: error instanceof Error ? error.message : "Password reset failed",
              },
              isLoading: false,
            });
          }
        },

        requestPasswordReset: async (email) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(`${API_URL}/api/auth/request-password-reset`, {
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
              error: {
                message: error instanceof Error ? error.message : "Request password reset failed",
              },
              isLoading: false,
            });
          }
        },

        clearError: () => set({ error: null }),

        // Initialize auth - Try to refresh token on app load if user was authenticated
        initializeAuth: async () => {
          if (isDev)console.log("🔄 Initializing auth...");
          
          const state = get();
          
          // 1. If we have stored tokens and user, we're good
          if (state.accessToken && state.csrfToken && state.user) {
            if (isDev){
              console.log("✅ Session restored from storage");
              console.log("👤 User:", state.user.username);
              console.log("🔑 Access token present");
              console.log("🛡️ CSRF token present");
            }
            return;
          }
          
          // 2. Try to get CSRF token from cookie if not in storage
          const csrfFromCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
          
          if (csrfFromCookie) {
            const decodedCsrf = decodeURIComponent(csrfFromCookie);
            set({ csrfToken: decodedCsrf });
            if (isDev)console.log("🛡️ CSRF token loaded from cookie:", decodedCsrf);
          }
          
          // 3. If we think user should be authenticated but we don't have an access token
          if (state.isAuthenticated && !state.accessToken) {
            if (isDev)console.log("🔄 Attempting to restore session...");
            
            // Wait a bit for cookies to be available (browser needs time to load them)
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const success = await get().refreshToken();
            
            if (!success) {
              if (isDev)console.log("⚠️ Session restore failed - clearing auth state");
              set({
                accessToken: null,
                csrfToken: null,
                isAuthenticated: false,
                user: null,
              });
            } else {
              if (isDev)console.log("✅ Session restored successfully");
            }
          } else if (!state.isAuthenticated) {
            if (isDev)console.log("ℹ️ No active session found");
          }
        },
      }),
      {
        name: "auth-storage-v3", // Upgraded to v3 to include tokens
        partialize: (state) => ({
          // Persist user data and tokens for session restoration
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          accessToken: state.accessToken,
          csrfToken: state.csrfToken,
        }),
        version: 3, // Upgraded version
        migrate: (persistedState: any, version: number) => {
          // Migration logic from older versions
          if (version === 0 || version === 1 || version === 2) {
            if (isDev)console.log(`🔄 Migrating auth storage from v${version} to v3`);
            // Keep user and isAuthenticated if they exist, but clear tokens
            return {
              user: persistedState?.user || null,
              isAuthenticated: persistedState?.isAuthenticated || false,
              accessToken: null,
              csrfToken: null,
            };
          }
          return persistedState;
        },
      }
    )
  )
);
