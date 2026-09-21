import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  // Your tests go in tests/; the reference answers live in solutions/.
  testMatch: ['tests/**/*.spec.ts', 'solutions/**/*.spec.ts'],
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://foodora.lovable.app',
    trace: 'on-first-retry',
  },
  // A browser is still needed once per worker: the fixture reads the API key from the app's own traffic.
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
