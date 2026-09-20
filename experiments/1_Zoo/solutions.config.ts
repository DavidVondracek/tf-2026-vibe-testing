import { defineConfig, devices } from '@playwright/test'

// Runs the reference solutions from every exhibit in one go: `npm run solutions`.
//
// They live in their own config because each exhibit's own `playwright.config.ts` points at
// `./tests` — that is where the Playwright agents write, and where your work belongs.
// Solutions stay out of the way until you ask for them.
export default defineConfig({
  testDir: '.',
  testMatch: '**/solutions/**/*.spec.ts',
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: 'https://foodora.lovable.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
