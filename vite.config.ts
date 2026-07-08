import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Gestão Armony",
        short_name: "Gestão Armony",
        description: "Sistema de Gestão de Obras",
        theme_color: "#003D9B",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192.jpeg",
            sizes: "192x192",
            type: "image/jpeg",
          },
          {
            src: "/pwa-512.jpeg",
            sizes: "512x512",
            type: "image/jpeg",
          },
          {
            src: "/maskable-512.jpeg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});