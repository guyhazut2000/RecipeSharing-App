import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@features": "/src/features",
      "@component": "/src/components/common",
      "@config": "/src/config",
    },
  },
});
