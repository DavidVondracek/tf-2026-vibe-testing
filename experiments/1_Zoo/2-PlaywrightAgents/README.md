# Exhibit 2 · Playwright Agents

**20 minutes.** Let the planner explore, the generator write, the healer repair. You review the artifacts.

Three agents ship with Playwright itself: **planner**, **generator**, **healer**. They run on a
test-runner-aware MCP server (`npx playwright run-test-mcp-server`) that knows your config,
your projects and your fixtures — not the general-purpose Playwright MCP.

## Setup

Everything is in the `playwright` package. There is nothing else to install.

```bash
cd experiments/1_Zoo/2-PlaywrightAgents
npx playwright --version      # must be 1.62.0 or newer
```

This folder already ships the two things the agents need before they can do anything:

- **`playwright.config.ts`** — read it. The project is named `chromium` and the agents look it
  up by that name. Without a config the seed test lands in the wrong place and nothing lines up.
- **`tests/seed.spec.ts`** — a green test that only checks the app loads.

Now wire up the agents:

```bash
npx playwright init-agents --loop=vscode --prompts
```

Look for `🎭 Using project "chromium" as a primary project` in the output. If it says
`Using project ""`, your config was not found — check you are in this folder and run again.

You get four prompt files in `.github/prompts/` (the `/` commands in Copilot Chat), three agent
definitions in `.github/agents/`, and `.vscode/mcp.json` pointing at
`npx playwright run-test-mcp-server`. Reload VS Code so Copilot picks up the MCP server.

> On Claude Code instead of Copilot? `--loop=claude`. The choices are `claude`, `codex`,
> `copilot`, `opencode`, `vscode`. Omitting `--loop` silently writes the VS Code wiring —
> no error, no prompt.

`init-agents` also wants to write `tests/seed.spec.ts`, but it will not overwrite the one that
is already there. Ours asserts the app is reachable; the generated stub is empty.

## Steps

1. Run the seed test once — `npx playwright test --project=chromium`. **It must be green.**
   The planner runs this exact test to boot your environment. If it is red, the problem is your
   network or the app, and none of the rest will work until you fix it.
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
