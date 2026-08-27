import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
      "@api": path.resolve(import.meta.dirname, "./src/api"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@store": path.resolve(import.meta.dirname, "./src/store"),
      "@app-types": path.resolve(import.meta.dirname, "./src/types"),
      "@utils": path.resolve(import.meta.dirname, "./src/utils"),
    },
  },
});
