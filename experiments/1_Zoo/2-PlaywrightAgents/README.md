# Exhibit 2 · Playwright Agents

**20 minutes.** Let the planner explore, the generator write, the healer repair. You review the artifacts.

Three agents ship with Playwright itself: **planner**, **generator**, **healer**. They run on a
test-runner-aware MCP server (`npx playwright run-test-mcp-server`) that knows your config,
your projects and your fixtures. The general Playwright MCP (`npx playwright mcp`) cannot replace
it: it has browser tools only, and none of the tools the agents call to run the seed test, save a
plan, write a test or run tests.

## Setup

Everything is in the `playwright` package. There is nothing else to install.

This folder already ships the two things the agents need before they can do anything:

- **[`playwright.config.ts`](./playwright.config.ts)** — read it. The project is named `chromium` and the agents look it
  up by that name. Without a config the seed test lands in the wrong place and nothing lines up.
- **[`tests/seed.spec.ts`](./tests/seed.spec.ts)** — a green test that only checks the app loads.

Keep the **repository root** open in VS Code. Copilot only reads `.github/agents/`,
`.github/prompts/` and `.vscode/mcp.json` at the root of the open folder, so wire up the agents
from the root:

```bash
npx playwright --version      # 1.63.0 in this repository
npm run agents
```

Look for `🎭 Using project "chromium" as a primary project` in the output.

`npm run agents` runs Playwright's own `init-agents` for this exhibit's config, then fixes two things
it gets wrong for this workshop:

- It rewrites [`.vscode/mcp.json`](../../../.vscode/mcp.json) and drops the `--config` that points
  the MCP server at this exhibit. The script puts it back.
- It pins every agent to `model: Claude Sonnet 4.6`, which overrides the model you picked in
  Copilot Chat. The script deletes that line.

What you get: three agent definitions in `.github/agents/` and four example prompts in
`.github/prompts/` (the `/` commands in Copilot Chat) — all gitignored. It also writes
`.github/workflows/copilot-setup-steps.yml` and prints a `TODO: GitHub > Settings > Copilot >
Coding agent` block. Both are for Copilot in the cloud. Ignore them.

Then reload VS Code (`Ctrl/Cmd+Shift+P` → **Developer: Reload Window**) so Copilot picks up the
agents and the MCP server.

<details>
<summary>The same by hand, without the script</summary>

```bash
npx playwright init-agents --loop=vscode --prompts --config experiments/1_Zoo/2-PlaywrightAgents/playwright.config.ts
git restore .vscode/mcp.json
```

Then delete the `model:` line in all three `.github/agents/*.agent.md` files. If the output says
`Using project ""`, the `--config` path is wrong — check you are in the repository root.

</details>

> **Why only one Playwright server?** `playwright-test` already contains every browser tool the
> agents use — tied to your seed test, so they act only on a page the test has set up. The
> general browser server, `npx playwright mcp`, is not needed for any exhibit. Want it for your own
> agent later? Add it to `.vscode/mcp.json` — but Copilot allows at most 128 tools per request.
> `playwright-test` alone has 89 (each agent turns on only the ones it needs), and `playwright mcp`
> adds 24 more.

> Ran `init-agents` from inside this folder? It still works for the terminal, but the files land
> in this folder, where Copilot never looks. Run `npm run agents` from the root instead.

> On Claude Code instead of Copilot? `--loop=claude`. The choices are `claude`, `codex`,
> `copilot`, `opencode`, `vscode`, `vscode-legacy`. `vscode` and `copilot` write the same files.
> Omitting `--loop` also writes them — no error, no prompt.

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
2. **Check [troubleshooting](../../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** [`solutions/`](./solutions/) has [the plan the planner should produce](./solutions/order.md)
and [the test the generator writes from it](./solutions/order.spec.ts). Run it with
`npm run solutions` from the repository root.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#get-ready-for-the-workshop)
