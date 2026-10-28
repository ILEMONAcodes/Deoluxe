import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", fullyParallel: false, retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1, timeout: 90_000,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3100", channel: process.env.CI ? undefined : "chrome", trace: "retain-on-failure" },
  projects: [
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: { command: "npm run start -- --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
