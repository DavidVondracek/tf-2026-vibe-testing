# Instructions for AI agents working in this repository

This is a workshop repository. These are tooling rules, not app knowledge — working out how the
demo app behaves is the exercise, so nothing about it is written down here.

## The shell

On Windows, this repository sets VS Code's terminal to **Git Bash**. Use bash syntax everywhere
(`export`, `cp`, forward slashes) — not PowerShell or `cmd`.

## Running Playwright

Everything ships inside the `playwright` package. There is no separate CLI package to install.

- The browser CLI is **`npx playwright cli …`**. Always invoke it that way.
- **Never call a bare `playwright-cli` binary.** It is not installed by this repository, and
  `playwright-cli` on npm is an unrelated project — running it fetches the wrong tool and
  nothing will work as documented.
- The test-runner MCP server is `npx playwright run-test-mcp-server`.
- Tests run with `npx playwright test --project=chromium` from inside an exhibit folder or a
  team folder.

The bundled `playwright-cli` skill shows a bare `playwright-cli` in its quick-start examples.
Its own Installation section says to fall back to `npx playwright cli` when no global binary
exists. In this repository, that fallback is always the correct form.

## Where things go

Each exhibit lives in [`experiments/1_Zoo/`](experiments/1_Zoo/)`<n>-<name>/` and owns its `playwright.config.ts`.
`cd` into the exhibit folder before running `npx playwright test` — run from the repository root
it will not find the config.

Agent wiring is the exception: run `init-agents`, `init-skills` and `npx playwright cli` from the
**repository root**, because the editor only reads `.github/agents/`, `.github/prompts/`,
`.vscode/mcp.json` and `.claude/skills/` there. Point `init-agents` at a config with
`--config <folder>/playwright.config.ts`, and give `run-test-mcp-server` the same folder with
`--config` in `.vscode/mcp.json`. Without it, `init-agents` reports `Using project ""`.

The optional API experiment lives in [`experiments/2_API/`](experiments/2_API/) and works the
same way: `cd` into it, write into its `tests/`, and import `test` from its `fixtures.ts`.

Write tests into that exhibit's `tests/`. Leave `solutions/` alone: it holds reference answers
and is run separately via `npm run solutions`.

The setup steps are in the [root README](README.md); fixes are in [setup troubleshooting](docs/setup-troubleshooting.md).

## Team work

After lunch each team works in its own fork, in **`teams/team-N/`** only, copied from
[`teams/_template/`](teams/_template/). The block-by-block guide is in [`day/`](day/).

- Write tests into `teams/team-N/tests/` and run them from `teams/team-N/`. Do not touch other
  teams' folders, `experiments/` or `spec/`.
- The same address rule applies: `baseURL` in `teams/team-N/playwright.config.ts` reads
  `FOODORA_URL`, and tests use relative paths.
- Skills are committed in `teams/team-N/skills/<name>/SKILL.md`. Agents load them from
  `.claude/skills/<name>/` at the repository root, which is gitignored — copy the folder there
  after each edit. The folder name must match `name` in the frontmatter.
- A skill that opens the app reads the address from `FOODORA_URL`, falling back to
  `https://foodora.lovable.app`.

## The app address

Never write the app's address into a test. Use relative paths — `page.goto('/checkout')` — and
let `baseURL` in `playwright.config.ts` supply the host. Setting `FOODORA_URL` then points every
test at another build of the app without editing a single file.

## Expected results

Take expected results from the product spec, [`spec/foodora-spec.md`](spec/foodora-spec.md). It
says what the app should do. When the app and the spec disagree, report it — do not change the
test to match the app.

## Secrets

The Vercel AI Gateway key and the Wopee API key are workshop-only and live in the editor's
secret storage. Never write either into a file in this repository, and never echo one into a
terminal transcript.
