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
        console.log("🔑 Adding access token to request");
      } else {
        console.warn("⚠️ No access token available for authenticated request");
      }
    }

    // Add CSRF token for mutation methods (POST, PUT, DELETE, PATCH)
    const method = init.method?.toUpperCase() || "GET";
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        headers.set("X-CSRF-TOKEN", csrfToken);
        console.log("🛡️ Adding CSRF token to request");
      } else {
        console.warn("⚠️ No CSRF token available for mutation request");
      }
    }

    // Build full URL if relative path
    const url = typeof input === "string" && input.startsWith("/")
      ? `${API_URL}${input}`
      : input;

    console.log(`📡 ${method} ${url}`);

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
    console.log(`✅ Request successful: ${response.status}`);
    return response;
  }

  console.log("🔄 Got 401 - attempting token refresh...");

  // Got 401 - attempt token refresh (only one refresh at a time)
  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      try {
        console.log("🔍 Checking available cookies before refresh...");
        console.log("📋 document.cookie:", document.cookie);
        console.log("🛡️ CSRF Token:", getCSRFToken());
        
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
    console.log("❌ Token refresh failed - logging out");
    useAuthStore.getState().logout();
    return response;
  }

  console.log("✅ Token refreshed - retrying request");

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
    // Try to parse error response
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    
    // Log detailed error information for debugging
    console.error("❌ API Error:", {
      url: typeof input === "string" ? input : input.toString(),
      status: response.status,
      statusText: response.statusText,
      error: errorData,
    });
    
    // Create a more informative error message
    const errorMessage = errorData.message 
      || errorData.title 
      || errorData.error 
      || `Request failed: ${response.status} ${response.statusText}`;
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}
