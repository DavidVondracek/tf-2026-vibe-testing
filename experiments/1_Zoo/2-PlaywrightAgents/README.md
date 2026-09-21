# Exhibit 2 · Playwright Agents

**20 minutes.** Let the planner explore, the generator write, the healer repair. You review the artifacts.

Three agents ship with Playwright itself: **planner**, **generator**, **healer**. They run on a
test-runner-aware MCP server (`npx playwright run-test-mcp-server`) that knows your config,
your projects and your fixtures — not the general-purpose Playwright MCP.

## Setup

Everything is in the `playwright` package. There is nothing else to install.

This folder already ships the two things the agents need before they can do anything:

- **[`playwright.config.ts`](./playwright.config.ts)** — read it. The project is named `chromium` and the agents look it
  up by that name. Without a config the seed test lands in the wrong place and nothing lines up.
- **[`tests/seed.spec.ts`](./tests/seed.spec.ts)** — a green test that only checks the app loads.

Keep the **repository root** open in VS Code. Copilot only reads `.github/agents/`,
`.github/prompts/` and `.vscode/mcp.json` at the root of the open folder, so wire up the agents
from the root and point them at this exhibit's config:

```bash
npx playwright --version      # must be 1.62.0 or newer
npx playwright init-agents --loop=vscode --prompts --config experiments/1_Zoo/2-PlaywrightAgents/playwright.config.ts
```

Look for `🎭 Using project "chromium" as a primary project` in the output. If it says
`Using project ""`, the `--config` path is wrong — check you are in the repository root.

You get four prompt files in `.github/prompts/` (the `/` commands in Copilot Chat), three agent
definitions in `.github/agents/`, and `.vscode/mcp.json` pointing at
`npx playwright run-test-mcp-server`. All three are gitignored.

**One edit before you reload.** Started from the root, the MCP server does not know which config
to use, and it would see every test in the repository. Open `.vscode/mcp.json` and add the
config to the `playwright-test` server's `args`:

```json
"args": ["playwright", "run-test-mcp-server", "--config", "${workspaceFolder}/experiments/1_Zoo/2-PlaywrightAgents"]
```

Running `init-agents` again resets this line, so make the edit again after every run. Then
reload VS Code (`Ctrl/Cmd+Shift+P` → **Developer: Reload Window**) so Copilot picks up the MCP server.

> Ran `init-agents` from inside this folder? It still works for the terminal, but the files land
> in this folder, where Copilot never looks. Run it again from the root as above.

> On Claude Code instead of Copilot? `--loop=claude`. The choices are `claude`, `codex`,
> `copilot`, `opencode`, `vscode`. Omitting `--loop` silently writes the VS Code wiring —
> no error, no prompt.

`init-agents` also wants to write `tests/seed.spec.ts`, but it will not overwrite the one that
is already there. Ours asserts the app is reachable; the generated stub is empty.

## Steps

1. Run the seed test once. **It must be green.**

   ```bash
   cd experiments/1_Zoo/2-PlaywrightAgents
   npx playwright test --project=chromium
   ```

   The planner runs this exact test to boot your environment. If it is red, the problem is your
   network or the app, and none of the rest will work until you fix it.
2. Ask the **planner** for a plan of ordering a meal, checked against `FD-05` and `FD-06` in
   [the spec](../../../spec/foodora-spec.md), saved as
   `experiments/1_Zoo/2-PlaywrightAgents/specs/order.md` (the planner saves relative to the
   repository root). Read it — [`specs/`](./specs/) explains what that artifact is for.
3. Ask the **generator** for bullet **1.1 only**, then run it.

Generate one bullet at a time, never in parallel — all three agents share one browser page.

## Done when

A plan in [`specs/`](./specs/), a generated test, and a green run you did not write.

Read the plan out loud. That Markdown file is the artifact a non-coder on your team could
review — that is the actual point of this exhibit.

## Bonus

Break a locator on purpose, then ask the **healer** to fix your tests. When it reports success:

```bash
grep -r "test.fixme" tests/
```

PowerShell: `Get-ChildItem -Recurse tests | Select-String "test.fixme"`

Did it repair your test, or just silence it? The healer's own instructions authorise marking a
test `test.fixme()` when it cannot fix it — so a healer "success" can be a skipped test.
It optimises for green, and it cannot tell a broken test from a broken app.

**Commit before you heal.** The healer is the only one of the three with write access to your files.

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check the troubleshooting table** in the [root README](../../../README.md#when-something-breaks).
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** [`solutions/`](./solutions/) has [the plan the planner should produce](./solutions/order.md)
and [the test the generator writes from it](./solutions/order.spec.ts). Run it with
`npm run solutions` from the repository root.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#get-ready-for-the-workshop)
