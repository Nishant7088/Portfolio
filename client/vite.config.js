import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), viteCompression()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei"],
          vendor: ["react", "react-dom", "react-router-dom", "framer-motion", "axios"],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
