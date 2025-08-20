import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Hardcoded to the volume paths, as requested
const CLIENT_ROOT = "/data/client";
const OUT_DIR = "/data/dist/public";

export default defineConfig({
  plugins: [react()],
  root: CLIENT_ROOT,
  resolve: {
    alias: {
      "@": path.join(CLIENT_ROOT, "src"),
      "@shared": path.join(CLIENT_ROOT, "shared"),
      "@assets": path.join(CLIENT_ROOT, "attached_assets"),
    },
  },
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
  },
  server: {
    host: true,
    fs: {
      strict: true,
      // deny dotfiles still
      deny: ["**/.*"],
      // (no allow list; root is already /data/client)
    },
  },
});
