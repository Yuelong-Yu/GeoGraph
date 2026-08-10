import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  define: { CESIUM_BASE_URL: JSON.stringify("/cesium") },
  plugins: [
    react(),
    viteStaticCopy({
      targets: ["Workers", "Assets", "Widgets", "ThirdParty"].map((directory) => ({
        src: `../../node_modules/cesium/Build/Cesium/${directory}/**/*`,
        dest: `cesium/${directory}`,
        rename: { stripBase: 5 },
      })),
    }),
  ],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:4000", "/health": "http://localhost:4000" },
  },
});
