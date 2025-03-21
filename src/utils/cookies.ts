// Utility functions for working with cookies

/**
 * Get a cookie value by name
 * @param name The name of the cookie
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

/**
 * Set a cookie with the given name and value
 * @param name The name of the cookie
 * @param value The value of the cookie
 * @param days Optional number of days until the cookie expires
 */
export function setCookie(name: string, value: string, days?: number): void {
  if (typeof document === 'undefined') {
    return;
  }
  
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  
  document.cookie = name + '=' + value + expires + '; path=/';
}

/**
 * Delete a cookie by name
 * @param name The name of the cookie to delete
 */
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') {
    return;
  }
  
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
} 