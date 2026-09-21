# Instructions for AI agents working in this repository

This is a workshop repository. These are tooling rules, not app knowledge — working out how the
demo app behaves is the exercise, so nothing about it is written down here.

## Running Playwright

Everything ships inside the `playwright` package. There is no separate CLI package to install.

- The browser CLI is **`npx playwright cli …`**. Always invoke it that way.
- **Never call a bare `playwright-cli` binary.** It is not installed by this repository, and
  `playwright-cli` on npm is an unrelated project — running it fetches the wrong tool and
  nothing will work as documented.
- The test-runner MCP server is `npx playwright run-test-mcp-server`.
- Tests run with `npx playwright test --project=chromium` from inside an exhibit folder.

The bundled `playwright-cli` skill shows a bare `playwright-cli` in its quick-start examples.
Its own Installation section says to fall back to `npx playwright cli` when no global binary
exists. In this repository, that fallback is always the correct form.

## Where things go

Each exhibit lives in [`experiments/1_Zoo/`](experiments/1_Zoo/)`<n>-<name>/` and owns its `playwright.config.ts`.
`cd` into the exhibit folder before running anything — commands run from the repository root
will not find the config, and `init-agents` will report `Using project ""`.

Write tests into that exhibit's `tests/`. Leave `solutions/` alone: it holds reference answers
and is run separately via `npm run solutions`.

The setup steps and the troubleshooting table are in the [root README](README.md).

## Secrets

The Vercel AI Gateway key and the Wopee API key are workshop-only and live in the editor's
secret storage. Never write either into a file in this repository, and never echo one into a
terminal transcript.
