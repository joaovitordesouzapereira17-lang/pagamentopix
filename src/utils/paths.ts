/**
 * Resolves a path inside /public respecting Vite's configured base path
 * (needed because the site is deployed under /pagamentopix/ on GitHub Pages).
 * Usage: withBase("images/profile/foto.jpg") -> "/pagamentopix/images/profile/foto.jpg"
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, "")}`;
}
