# Exhibit 2 · Playwright Agents

**20 minutes.** Let the planner explore, the generator write, the healer repair. You review the artifacts.

Three agents ship with Playwright itself: **planner**, **generator**, **healer**. They run on a
test-runner-aware MCP server (`npx playwright run-test-mcp-server`) that knows your config,
your projects and your fixtures — not the general-purpose Playwright MCP.

## Setup

Everything is in the `playwright` package. There is nothing else to install.

```bash
npx playwright --version      # must be 1.62.0 or newer
```

**Create `playwright.config.ts` before the next command.** Without it the seed test lands in the
wrong place and nothing lines up:

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'https://foodora.lovable.app', trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
})
```

Then:

```bash
npx playwright init-agents --loop=claude --prompts     # or --loop=vscode for Copilot
echo ".playwright-mcp/" >> .gitignore
```

Look for `🎭 Using project "chromium"` in the output. If it says `Using project ""`, your config
was not found — fix it and run again.

> Forgetting `--loop` silently writes Copilot wiring into `.github/`. No error, no prompt.

## Steps

1. Run the seed test once — `npx playwright test --project=chromium`. **It must be green.**
   The planner runs this exact test to boot your environment.
2. Ask the **planner** for a plan of ordering a meal. Read `specs/order.md`.
3. Ask the **generator** for bullet **1.1 only**, then run it.

Generate one bullet at a time, never in parallel — all three agents share one browser page.

## Done when

A plan in `specs/`, a generated test, and a green run you did not write.

Read the plan out loud. That Markdown file is the artifact a non-coder on your team could
review — that is the actual point of this exhibit.

## Bonus

Break a locator on purpose, then ask the **healer** to fix your tests. When it reports success:

```bash
grep -r "test.fixme" tests/
```

Did it repair your test, or just silence it? The healer's own instructions authorise marking a
test `test.fixme()` when it cannot fix it — so a healer "success" can be a skipped test.
It optimises for green, and it cannot tell a broken test from a broken app.

**Commit before you heal.** The healer is the only one of the three with write access to your files.
