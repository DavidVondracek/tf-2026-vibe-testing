# Playwright: MCP, CLI and Test Agents

Researched 21 September 2026. Confidence: **H** primary source checked · **M** partly checked ·
**L** could not verify (not used).

## Three interfaces, one package

Since **Playwright 1.62** (24 Jul 2026), one `npm install playwright` gives you all three:

| Interface | Command | Shipped | What Microsoft says it is for |
| --- | --- | --- | --- |
| **Test Agents** — planner, generator, healer | `npx playwright init-agents` | 1.56 (6 Oct 2025) | Plan a test in Markdown, generate the Playwright test from it, repair failing tests. Run on MCP. |
| **MCP server** | `npx playwright mcp` | standalone `@playwright/mcp` since 2025; bundled in 1.62 | "Exploratory automation, self-healing tests, or long-running autonomous workflows where maintaining continuous browser context outweighs token cost concerns." |
| **CLI + skill** | `npx playwright cli` | standalone `@playwright/cli` 26 Jan 2026; bundled in 1.62 | "High-throughput coding agents" working in "limited context windows". |

Sources: [release notes](https://playwright.dev/docs/release-notes) (dates from the npm registry);
[playwright-mcp README](https://github.com/microsoft/playwright-mcp);
[playwright-cli README](https://github.com/microsoft/playwright-cli). **H** — current version 1.63
(4 Sep 2026).

## How they work

- **Snapshots are ARIA-snapshot YAML** — the page's accessibility tree — with refs like `e15` that
  commands then target (`click e15`). **H**
- **CLI:** each command prints a short page header plus a link,
  `[Snapshot](.playwright-cli/page-<timestamp>.yml)`. The tree stays on disk until the agent reads
  it. (`eval` and `console` return their result as text.) **H**
- **MCP:** since `@playwright/mcp` **0.0.69 / Playwright 1.59** (30 Mar – 1 Apr 2026,
  [PR #39768](https://github.com/microsoft/playwright/pull/39768)), the snapshot taken after each
  action is also written to a file and returned as a link. The tree lands in the agent's context
  only when the agent explicitly calls `browser_snapshot` without a filename. Before that change,
  every action returned the full tree. **H**
- **MCP tools:** 72 in total, **25 on by default**; the other 47 are opt-in through `--caps=`
  (vision, storage, devtools, network, testing, pdf, config). **H**
- **Options that change context use:** `--snapshot-mode full|none`, `--output-dir`,
  `--output-max-size`, `--image-responses allow|omit|only`, and `browser_snapshot`'s `filename` and
  `depth` parameters. Version 0.0.78 (9 Jul 2026) added `browser_find` and less verbose snapshots.
  **H**
- **Test Agents:** "collections of instructions and MCP tools", regenerated whenever Playwright is
  updated. `init-agents --loop=vscode|claude|codex|opencode`; they use a seed test and write plans to
  `specs/`. **H** — [Test Agents docs](https://playwright.dev/docs/test-agents)

## The "4× fewer tokens" claim

| Claim | Verdict |
| --- | --- |
| "CLI uses 27K tokens, MCP 114K — 4× fewer" | **Not from Microsoft.** It traces to a Medium post by Pramod Dutta ([scrolltest](https://scrolltest.medium.com/playwright-mcp-burns-114k-tokens-per-test-the-new-cli-uses-27k-heres-when-to-use-each-65dabeaac7a0)); other blogs call it "the Playwright team's own benchmarks" without linking anything. Method and date unknown (Medium blocked access). |
| Microsoft publishes numbers | **No.** Its READMEs name the mechanism — the CLI avoids "loading large tool schemas and verbose accessibility trees into the model context" — and give no figures. **H** |
| A measured comparison exists | **One, with a stated method:** [Checkly, Stefan Judis, 30 Jul 2026](https://www.checklyhq.com/blog/mcp-vs-cli-token-efficiency/) — one demo-shop task, three runs each: **CLI 45–48K vs MCP 48–50K tokens. Near parity.** No versions given. **H** |

We ran our own: [measurement on Foodora](foodora-measurement.md).

## Adoption

- **npm weekly downloads** (14–20 Sep 2026): `playwright` 69.7M · `@playwright/test` 44.8M ·
  `@playwright/mcp` 5.25M · `@playwright/cli` 0.73M. **H**
- **GitHub stars** (21 Sep 2026): microsoft/playwright 96.4K · playwright-mcp 37.4K ·
  playwright-cli 13.5K. **H**
- **Integrations:** Playwright MCP is on by default in the GitHub Copilot coding agent
  ([GitHub Docs](https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/extending-copilot-coding-agent-with-mcp)); the MCP README gives install steps for VS Code, Cursor,
  Claude Code, Codex, Copilot CLI, Gemini CLI, Goose, Junie and others; the CLI README names Claude
  Code and GitHub Copilot. **H**

## What this means for the workshop

- **Exhibit 2 (Playwright Agents)** runs on MCP — the planner explores, the generator writes, the
  healer repairs.
- **Exhibit 3 (Playwright CLI + Skills)** is the CLI with its skill.
- Microsoft's own positioning matches the evidence: CLI + skills for coding agents, MCP for
  exploring and self-healing loops.
