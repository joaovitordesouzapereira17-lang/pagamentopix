import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path matches the GitHub Pages project URL (https://<user>.github.io/pagamentopix/).
// Update this if you rename the repository or deploy somewhere else.
export default defineConfig({
  plugins: [react()],
  base: "/pagamentopix/",
});
