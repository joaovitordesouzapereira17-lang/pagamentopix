import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// No GitHub Pages o site fica em /pagamentopix/; na Vercel (e em outros hosts
// que servem a partir da raiz) o Vercel define a env VERCEL=1 automaticamente.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? "/" : "/pagamentopix/",
});
