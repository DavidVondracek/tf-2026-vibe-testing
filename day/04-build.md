# 13:00 · Build One Thing

**Time:** 13:00–14:30 · 90 min (5 min briefing, then build)

**Goal:** two deliverables, built with your team's tool:

1. **A working test suite** that covers the demo app's core user flows.
2. **At least one `SKILL.md`** — a reusable testing behaviour your agent runs cold.

This is the thing you take home. It also goes straight into the [Battle](06-battle.md).

## Core user flows

The flows are the stories in [the spec](../spec/foodora-spec.md). Start with the order path, then
add the rest:

| First: the order path | Then |
| --- | --- |
| `FD-01` Browse restaurants | `FD-02` Search and filter |
| `FD-03` Restaurant menu | `FD-04` Customise a dish |
| `FD-05` Cart | `FD-08` Page not found |
| `FD-06` Checkout | |
| `FD-07` Confirmation and tracking | |

Name the story in every test: `test('FD-05 · …')`. Take expected results from the spec. When the
app and the spec disagree, write it down — that may be a bug, not a broken test.

## Checkpoints

| Time | You should have |
| --- | --- |
| 13:30 | First test green |
| 14:00 | `SKILL.md` drafted |
| 14:20 | Cold run passes |
| 14:30 | Pushed, pull request up to date |

## Runs cold

A **fresh agent session**, given **only your `SKILL.md`** and the prompt `run <skill-name>`, does
the job **without follow-up prompts**.

To test it: start a new chat (Copilot: **New Chat**; Claude Code: `/clear`), set the agent picker to **Agent**, type
`run <skill-name>` and nothing else. If you have to type one more word, it is not cold yet. Fix
the `SKILL.md`, not the prompt, and try again.

## Where files go

```text
teams/team-N/
├── README.md             your checklist
├── playwright.config.ts  do not change baseURL
├── tests/                your *.spec.ts
└── skills/<name>/SKILL.md
```

- **Never write the app's address in a test.** Use `page.goto('/checkout')`. The config reads
  `FOODORA_URL`, so the Battle can point your suite at a new build.
- **Your skill must use `FOODORA_URL` too.** Write "open `FOODORA_URL`, or
  `https://foodora.lovable.app` if it is not set" — not a fixed address.
- **Where the agent finds your skill.** Agents look in `.claude/skills/` at the repository root.
  That folder is gitignored, so keep the real copy in `teams/team-N/skills/` and install it
  after every edit:

  ```bash
  mkdir -p .claude/skills
  cp -r teams/team-N/skills/<name> .claude/skills/
  ```

  PowerShell:

  ```powershell
  New-Item -ItemType Directory -Force .claude/skills | Out-Null
  Remove-Item -Recurse -Force .claude/skills/<name> -ErrorAction SilentlyContinue
  Copy-Item -Recurse teams/team-N/skills/<name> .claude/skills/<name>
  ```

  The folder name must match the `name` in the frontmatter.

Run your tests:

```bash
cd teams/team-N
npx playwright test
```

Push often: `git add teams/team-N`, `git commit -m "…"`, `git push`. Your pull request updates by
itself.

## Notes per tool

**🤖 AI Coding Agent.** Same as [Exhibit 1](../experiments/1_Zoo/1-CodingAgent/): attach the spec,
ask for tests in `teams/team-N/tests/`, let the agent fix a failure twice, no more.

**🐍 Playwright Agents.** Wire the agents to your team folder, from the repository root:

```bash
cp experiments/1_Zoo/2-PlaywrightAgents/tests/seed.spec.ts teams/team-N/tests/
npm run agents -- teams/team-N
```

It points the `playwright-test` MCP server at your folder. Reload the window. Before the Swap, run
`git restore .vscode/mcp.json` — that file is shared, so keep your change out of your team's PR. Save plans to `teams/team-N/specs/`. The details are in
[Exhibit 2](../experiments/1_Zoo/2-PlaywrightAgents/README.md#setup).

**🦁 Playwright CLI + Skills.** Your skill drives `npx playwright cli`, like the worked
[`foodora-order`](../experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md). Ask the
agent to turn what it did into Playwright tests in `teams/team-N/tests/`.

**Wopee.io.** Your suite lives in [cmd.wopee.io](https://cmd.wopee.io), in the Foodora project
from [Exhibit 4](../experiments/1_Zoo/4-Wopee/). Check its user stories and test cases against
`FD-01` … `FD-08`. Your `SKILL.md` drives that suite through the Wopee MCP server (set up in the
Exhibit 4 bonus), for example:

1. `wopee_fetch_analysis_suites` — find the suite.
2. `wopee_dispatch_agent` — run the chosen test cases.
3. `wopee_fetch_recent_executions` — wait for the results, then report pass or fail per `FD-xx`.

Write the suite's name in `teams/team-N/README.md`. Never write the API key into a file.
`tests/` can stay empty.

## Done when

- Tests in `teams/team-N/tests/` pass with `npx playwright test` (Wopee.io: a suite run finished).
- A fresh agent session runs your skill cold.
- Everything is pushed and your pull request is up to date.

## If stuck

- No green test by 13:30? Start from the order-path test in
  [Exhibit 1's solutions](../experiments/1_Zoo/1-CodingAgent/solutions/) and extend it.
- The agent cannot find your skill? Check it is in `.claude/skills/<name>/SKILL.md` at the root,
  that the folder name equals `name`, and start a new chat.
- Ask your team first, then raise your hand.

Next: [14:30 · SKILL.md Swap](05-swap.md)
