# Our measurement: Playwright MCP vs CLI on Foodora

**Question:** for the same task, how many tokens does each Playwright interface put into an AI
agent's context?

**Task:** on [foodora.lovable.app](https://foodora.lovable.app/) — open the landing page, open
Burger Palace, add a Classic Beef Burger, open the cart, proceed to checkout.

**When:** 21 September 2026, headless Chromium, Node 22. Re-run the same day from this folder:
every total within about 5% (page snapshots vary slightly between loads).

## Headline

In current releases, **each step costs the same on MCP and CLI — about 80–140 tokens.** Both write
the page snapshot to a `.yml` file and return only a link. The difference is **what the agent loads
before the task**: 24 MCP tool definitions (~4,100 tokens) versus a 43-token skill description, or
~3,000 tokens once the CLI skill body is loaded.

"MCP floods the context" is last year's MCP: version 0.0.41 (Oct 2025) put a full page snapshot of
1,200–1,900 tokens into every step.

## Results (tokens)

### Before the task

| Loaded upfront | Bytes | Tokens |
| --- | --- | --- |
| MCP, built into Playwright 1.63 — `tools/list` (24 tools) | 18,904 | 4,095 |
| `@playwright/mcp` 0.0.82 — `tools/list` (25 tools) | 20,102 | 4,376 |
| `@playwright/mcp` 0.0.41 (Oct 2025) — `tools/list` (21 tools) | 12,516 | 2,762 |
| CLI skill — name and description (always loaded) | 182 | 43 |
| CLI skill — full `SKILL.md` (loaded when the skill is used) | 12,726 | 3,047 |
| CLI skill — 9 reference files (read only if needed) | 46,005 | 11,067 |

### Each step: returned to the agent / page file on disk

| Step | MCP today | CLI | MCP Oct 2025 (tree in every answer) |
| --- | --- | --- | --- |
| Open the landing page | 82 / 878 | 99 / 878 | 937 |
| Explicit snapshot (tree returned directly) | 1,701 | 1,702 | 1,926 |
| Open Burger Palace | 95 / 1,212 | 94 / 1,212 | 1,328 |
| Add Classic Beef Burger | 103 / 1,318 | 102 / 1,318 | 1,421 |
| Open the cart | 140 / 1,095 | 139 / 1,095 | 1,322 |
| Proceed to checkout | 98 / 1,096 | 97 / 1,096 | 1,194 |

MCP built into Playwright 1.63 and `@playwright/mcp` 0.0.82 returned byte-identical results.

### Whole task (upfront + six steps)

| Interface | Agent never reads the page files | Agent reads the file every step |
| --- | --- | --- |
| MCP, Oct 2025 | 10,890 | — (no files) |
| MCP, today | 6,314 | 11,913 |
| CLI, skill loaded | 5,280 | 10,879 |
| CLI, skill description only | 2,276 | 7,875 |

A middle path — skill loaded, and the agent runs `find "<text>"` before each click instead of reading
the whole file — came to 6,352.

These are the numbers on the "Measured on Foodora" slide.

## How it was measured

- **MCP:** a small client speaks JSON-RPC over stdio — `initialize`, `tools/list`, then
  `browser_navigate`, `browser_snapshot` and four `browser_click` calls — and records every result.
  Servers run with `--headless --isolated`.
- **CLI:** runs `playwright cli open | snapshot | click | find | close` and records every output and
  every page file.
- **Tokens:** `js-tiktoken` with `o200k_base` (runs offline). It is an OpenAI tokenizer; bytes ÷ 4 and
  an older Anthropic tokenizer both land within about 10% of it. The real Claude count needs an API
  key and was not run.

## Run it yourself

```bash
cd docs/research/measure
./run.sh
```

It installs its own dependencies (the tokenizers, `@playwright/mcp` 0.0.82 and 0.0.41), uses the
repository's Playwright for the CLI and the built-in MCP, and writes `out/tokens.json`. The results
of the 21 September run are in [`measure/results-2026-09-21.json`](measure/results-2026-09-21.json).
Needs network and Chromium (`npm run browsers`). On Windows, run it from Git Bash.

## What this does not measure

- **"Never reads the files" is a lower bound.** A real agent needs refs to click, so it reads a
  snapshot at least sometimes — for MCP and CLI alike. Reality sits between the two columns.
- **Context contents, not billed tokens.** In a multi-turn loop earlier results are sent again every
  turn, and prompt caching changes the price.
- **Not included:** the model's own reasoning and output, the Bash tool definition the CLI relies
  on, the system prompt, how each client wraps tool definitions, client-side tool search (which
  would shrink MCP's upfront cost), screenshots.
- **One flow on one site.** Heavier pages grow the per-step numbers and shrink the upfront share.
- The SPA loads its restaurant list asynchronously; a 3-second wait on the landing page is not
  counted.
