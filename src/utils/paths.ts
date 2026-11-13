/**
 * Resolves a path inside /public respecting Vite's configured base path
 * (needed because the site is deployed under /pagamentopix/ on GitHub Pages).
 * Usage: withBase("images/profile/foto.jpg") -> "/pagamentopix/images/profile/foto.jpg"
 *
 * Absolute URLs (data:, http(s):, //cdn) are returned untouched — prefixing
 * the base path onto those would corrupt them.
 */
export function withBase(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, "")}`;
}
