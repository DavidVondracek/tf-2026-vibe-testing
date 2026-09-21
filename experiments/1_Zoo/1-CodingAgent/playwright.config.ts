import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  // The Zoo runs on conference wifi against a live Lovable app. One retry absorbs a cold start.
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://foodora.lovable.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Keep the project named `chromium`: the Playwright agents look it up by name.
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
