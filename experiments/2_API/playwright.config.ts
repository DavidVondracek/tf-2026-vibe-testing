import { defineConfig, devices } from '@playwright/test'
import { join } from 'node:path'

// Settings from the repository's .env (e.g. FOODORA_URL for the Battle). A variable set in the
// terminal wins over the file.
try {
  process.loadEnvFile(join(__dirname, '../..', '.env'))
} catch {}

export default defineConfig({
  testDir: '.',
  // Your tests go in tests/; the reference answers live in solutions/.
  testMatch: ['tests/**/*.spec.ts', 'solutions/**/*.spec.ts'],
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // FOODORA_URL points the same tests at another build of the app (the Battle uses this).
    baseURL: process.env.FOODORA_URL || 'https://foodora.lovable.app',
    trace: 'on-first-retry',
  },
  // A browser is still needed once per worker: the fixture reads the API key from the app's own traffic.
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
