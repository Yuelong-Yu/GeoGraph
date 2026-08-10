import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:5173",
    viewport: { width: 1440, height: 1000 },
  },
  webServer: [
    {
      command: "DEMO_MODE=1 HOST=127.0.0.1 node --import tsx ../api/src/server.ts",
      url: "http://127.0.0.1:4000/health",
      reuseExistingServer: !process.env.CI,
      cwd: ".",
    },
    {
      command: "npm run dev -- --host 127.0.0.1",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: !process.env.CI,
      cwd: ".",
    },
  ],
});
