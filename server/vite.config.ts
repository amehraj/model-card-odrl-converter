// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  root: "./", // Specify root folder (the current directory)
  build: {
    outDir: "dist", // Output folder for compiled files
    sourcemap: true, // Enable source maps for debugging
  },
});
