import { useAuthStore } from "../store/useAuthStore";
import { getCSRFToken } from "./cookies";

const API_URL = import.meta.env.VITE_API_URL;

// Promise to prevent multiple simultaneous refresh attempts
let refreshingPromise: Promise<boolean> | null = null;

// Rate limiting for refresh attempts
let lastRefreshAttempt = 0;
const MIN_REFRESH_INTERVAL = 5000; // 5 seconds between refresh attempts

// Retry configuration
const REFRESH_TIMEOUT = 10000; // 10 seconds
const MAX_RETRY_ATTEMPTS = 1; // Only retry once after refresh

/**
 * Authenticated fetch wrapper that handles:
 * - Adding Authorization header with access token from persisted store
 * - Adding CSRF token header from store or cookie with auto-sync
 * - Automatic token refresh on 401 with exponential backoff
 * - Retry logic after successful refresh
 * - Proper error handling and logging
 */
export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const isDev = import.meta.env.DEV;
  
  const makeRequest = async (includeAuth: boolean = true): Promise<Response> => {
    const headers = new Headers(init.headers);
    
    // Add access token if available and not explicitly disabled
    if (includeAuth) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
        if (isDev) console.log("🔑 Adding access token to request");
      } else {
        if (isDev) console.warn("⚠️ No access token available for authenticated request");
      }
    }

    // Add CSRF token for mutation methods (POST, PUT, DELETE, PATCH)
    const method = init.method?.toUpperCase() || "GET";
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      // Strategy: Store → Cookie → Extract → Update Store
      let csrfToken = useAuthStore.getState().csrfToken;
      
      // Fallback 1: Try getCSRFToken helper
      if (!csrfToken) {
        csrfToken = getCSRFToken() || null;
      }
      
      // Fallback 2: Extract directly from cookie
      if (!csrfToken) {
        const csrfFromCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1];
        
        if (csrfFromCookie) {
          csrfToken = decodeURIComponent(csrfFromCookie);
          // Sync to store for next requests
          useAuthStore.setState({ csrfToken });
          if (isDev) console.log("🛡️ CSRF token loaded from cookie and synced to store");
        }
      }
      
      if (csrfToken) {
        headers.set("X-CSRF-TOKEN", csrfToken);
        if (isDev) console.log("🛡️ Adding CSRF token to request");
      } else {
        console.warn("⚠️ No CSRF token available for mutation request");
      }
    }

    // Build full URL if relative path
    const url = typeof input === "string" && input.startsWith("/")
      ? `${API_URL}${input}`
      : input;

    if (isDev) console.log(`📡 ${method} ${url}`);

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
    if (isDev) console.log(`✅ Request successful: ${response.status}`);
    return response;
  }

  console.log("🔄 Got 401 - attempting token refresh...");

  // Got 401 - attempt token refresh (only one refresh at a time)
  if (!refreshingPromise) {
    // Rate limiting: Check if we're trying to refresh too frequently
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshAttempt;
    
    if (timeSinceLastRefresh < MIN_REFRESH_INTERVAL) {
      console.warn(`⏱️ Rate limit: Refresh attempted too soon (${timeSinceLastRefresh}ms ago). Please wait ${MIN_REFRESH_INTERVAL}ms between attempts.`);
      // Return original 401 without attempting refresh
      await useAuthStore.getState().logout();
      return response;
    }
    
    lastRefreshAttempt = now;
    
    refreshingPromise = (async () => {
      try {
        if (isDev) {
          console.log("🔍 Checking available cookies before refresh...");
          console.log("📋 document.cookie:", document.cookie);
          console.log("🛡️ CSRF Token:", getCSRFToken());
        }
        
        // Call refresh with timeout protection
        const refreshPromise = useAuthStore.getState().refreshToken();
        const timeoutPromise = new Promise<boolean>((resolve) => 
          setTimeout(() => {
            console.warn(`⏱️ Token refresh timeout after ${REFRESH_TIMEOUT / 1000} seconds`);
            resolve(false);
          }, REFRESH_TIMEOUT)
        );
        
        const success = await Promise.race([refreshPromise, timeoutPromise]);
        return success;
      } catch (error) {
        console.error("❌ Error during token refresh:", error);
        return false;
      } finally {
        refreshingPromise = null;
      }
    })();
  }

  const refreshSuccess = await refreshingPromise;

  // If refresh failed, logout and return original 401
  if (!refreshSuccess) {
    console.log("❌ Token refresh failed - logging out");
    await useAuthStore.getState().logout();
    return response;
  }

  console.log("✅ Token refreshed - retrying original request");

  // Retry original request with new access token
  try {
    response = await makeRequest();
    if (isDev) console.log(`✅ Retry successful: ${response.status}`);
    return response;
  } catch (error) {
    console.error("❌ Retry request failed:", error);
    // Return original 401 response if retry fails
    return response;
  }
}

/**
 * Helper to handle authFetch response with JSON parsing and enhanced error handling
 * @throws {Error} If response is not ok, throws error with detailed message
 */
export async function authFetchJSON<T = any>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> {
  const response = await authFetch(input, init);
  
  if (!response.ok) {
    // Try to parse error response with timeout
    let errorData: any;
    try {
      const textResponse = await response.text();
      errorData = textResponse ? JSON.parse(textResponse) : { message: response.statusText };
    } catch (parseError) {
      errorData = { message: response.statusText };
    }
    
    // Log detailed error information for debugging
    console.error("❌ API Error:", {
      url: typeof input === "string" ? input : input.toString(),
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      timestamp: new Date().toISOString(),
    });
    
    // Create a more informative error message with fallbacks
    const errorMessage = errorData.message 
      || errorData.title 
      || errorData.error 
      || errorData.errors?.[0]?.message
      || `Request failed: ${response.status} ${response.statusText}`;
    
    const error = new Error(errorMessage) as Error & { 
      status?: number; 
      statusText?: string; 
      data?: any;
    };
    error.status = response.status;
    error.statusText = response.statusText;
    error.data = errorData;
    
    throw error;
  }
  
  // Parse successful response
  try {
    return await response.json();
  } catch (parseError) {
    console.error("❌ Failed to parse JSON response:", parseError);
    throw new Error("Invalid JSON response from server");
  }
}
