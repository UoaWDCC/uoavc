/**
 * Turns an untrusted `?redirect=` value into a same-site path.
 */
export function getSafeRedirect(
  raw: string | null | undefined,
  origin: string,
  fallback = "/", // Homepage
): string {
  if (!raw?.startsWith("/")) return fallback

  try {
    const url = new URL(raw, origin)
    if (url.origin !== origin) return fallback
    if (url.pathname === "/log-in") return fallback // Don't send people back to the login page after logging in
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return fallback
  }
}
