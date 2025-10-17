/**
 * Utility functions for cookie management
 */

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or undefined if not found
 */
export function getCookie(name: string): string | undefined {
  const cookie = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${name}=`));
  
  return cookie?.split('=')[1];
}

/**
 * Get the CSRF token from cookies
 * @returns CSRF token value or undefined
 */
export function getCSRFToken(): string | undefined {
  return getCookie('XSRF-TOKEN');
}

/**
 * Check if a cookie exists
 * @param name - Cookie name
 * @returns true if cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== undefined;
}
