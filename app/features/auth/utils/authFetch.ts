import { useAuthStore } from "../store/useAuthStore";
import { getCSRFToken } from "./cookies";

const API_URL = import.meta.env.VITE_API_URL;

// Promise to prevent multiple simultaneous refresh attempts
let refreshingPromise: Promise<boolean> | null = null;

/**
 * Authenticated fetch wrapper that handles:
 * - Adding Authorization header with access token
 * - Adding CSRF token header when needed
 * - Automatic token refresh on 401
 * - Retry logic after refresh
 */
export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const makeRequest = async (includeAuth: boolean = true): Promise<Response> => {
    const headers = new Headers(init.headers);
    
    // Add access token if available and not explicitly disabled
    if (includeAuth) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }

    // Add CSRF token for mutation methods (POST, PUT, DELETE, PATCH)
    const method = init.method?.toUpperCase() || "GET";
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        headers.set("X-CSRF-TOKEN", csrfToken);
      }
    }

    // Build full URL if relative path
    const url = typeof input === "string" && input.startsWith("/")
      ? `${API_URL}${input}`
      : input;

    return fetch(url, {
      ...init,
      headers,
      credentials: init.credentials || "include", // Always include cookies
    });
  };

  // First attempt with current access token
  let response = await makeRequest();

  // If not 401, return the response
  if (response.status !== 401) {
    return response;
  }

  // Got 401 - attempt token refresh (only one refresh at a time)
  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      try {
        const success = await useAuthStore.getState().refreshToken();
        return success;
      } finally {
        refreshingPromise = null;
      }
    })();
  }

  const refreshSuccess = await refreshingPromise;

  // If refresh failed, logout and return original 401
  if (!refreshSuccess) {
    useAuthStore.getState().logout();
    return response;
  }

  // Retry original request with new access token
  response = await makeRequest();
  return response;
}

/**
 * Helper to handle authFetch response with JSON parsing
 */
export async function authFetchJSON<T = any>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> {
  const response = await authFetch(input, init);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ 
      message: response.statusText 
    }));
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }
  
  return response.json();
}
