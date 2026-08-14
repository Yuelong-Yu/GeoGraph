import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { normalizeBasePath, withBasePath } from "./src/base-path.ts";

const basePath = normalizeBasePath(process.env.GEOGRAPH_BASE_PATH ?? "/");

export default defineConfig({
  base: basePath,
  define: { CESIUM_BASE_URL: JSON.stringify(withBasePath(basePath, "cesium")) },
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
