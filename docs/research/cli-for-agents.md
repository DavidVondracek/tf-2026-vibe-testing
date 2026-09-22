# CLIs for AI agents

Researched 21 September 2026. Confidence: **H** primary source read · **M** primary source with a caveat (a vendor claim, a narrow setup), or a reputable secondary source linking to the primary · **L** could not verify (not used).

## Why agents are good at the command line

Mostly the view of credible practitioners — reasons, not measurements.

- **Vendors say so.** Anthropic's Claude Code docs: CLI tools are "the most context-efficient way to
  interact with external services", and Claude already knows `gh`. For unfamiliar tools, let the
  agent read `--help` — it learns only what it needs, when it needs it. **H** —
  [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- **Training data.** Models have seen enormous amounts of real code and shell use, but "only a small
  set of contrived examples of tool calls". **H, opinion** — [Cloudflare, "Code Mode", 26 Sep 2025](https://blog.cloudflare.com/code-mode/)
- **Composability.** Pipes, files and scripts compose; MCP tools don't, and they fill the context.
  **H, opinion** — [Armin Ronacher, 3 Jul 2025](https://lucumr.pocoo.org/2025/7/3/tools/)
- **Skills are cheap until used.** A skill costs "a few dozen extra tokens", while GitHub's MCP
  server "consumes tens of thousands". Skills depend on a code-execution environment. **H, opinion** —
  [Simon Willison, 16 Oct 2025](https://simonwillison.net/2025/Oct/16/claude-skills/)

## Head-to-head measurements

The same tasks, done once through MCP and once through a CLI.

| Study | Setup | Result | Conf. |
| --- | --- | --- | --- |
| [Mario Zechner](https://mariozechner.at/posts/2025-08-15-mcp-vs-cli/), 15 Aug 2025 | One tool shipped as both MCP and CLI; 3 tasks × 4 tools × 10 runs = 120 runs | **Success 100% vs 100%.** Cost $19.45 (MCP) vs $19.95 (CLI); 51 vs 66 min. His conclusion: tool design and documentation matter more than the protocol. | H |
| [Scalekit](https://www.scalekit.com/blog/mcp-vs-cli-use), 11 Mar 2026 | Claude Sonnet 4, 5 read-only GitHub tasks, 75 runs | Median tokens **CLI 1,365–9,386 vs MCP 32,279–82,835**. Success 100% vs 72% — but all 7 MCP failures were network timeouts to GitHub's remote server, not protocol errors. An ~800-token `gh` skill cut tool calls by about a third. | M |
| [Kun Chen](https://github.com/kunchenguid/axi/blob/main/bench-github/published-results/STUDY.md), 21 Mar 2026 | Sonnet 4.6, 17 GitHub tasks × 5 repeats, 85 runs per setup | Success roughly equal, **CLI 2–3× cheaper** (table below). A CLI with agent-oriented output reached 100%. | H |
| [Webmaster Ramos](https://webmaster-ramos.com/blog/mcp-vs-cli-aws-benchmark), 9 Apr 2026 | Sonnet 4.6, 5 AWS tasks, 10 runs each | CLI used 43–60% fewer input tokens; **success at parity (90–100%)**. MCP wins on engineering time and coverage. | M |
| GitHub, 29 May 2026 ([via InfoQ](https://www.infoq.com/news/2026/05/github-agentic-token-savings/)) | Production agentic workflows | Replacing some MCP calls with `gh` and pruning unused tools cut tokens **37–62%**; one workflow rose 5%. | M |

Kun Chen's results in detail:

| Setup | Success | Cost per task |
| --- | --- | --- |
| Plain `gh` CLI | 86% | $0.054 |
| MCP, tools loaded upfront | 87% | $0.148 |
| MCP + tool search | 82% | $0.147 |
| MCP code mode | 84% | $0.101 |
| CLI with agent-oriented output | 100% | $0.050 |

Plain `gh` scored 0 of 5 on tasks that needed counting, until its output was redesigned: **output
design beats protocol.**

## Agent Skills: SKILL.md + a CLI

- **What it is.** Launched by Anthropic on 16 Oct 2025: a folder with a `SKILL.md` and optional
  scripts, loaded in three levels — name and description first, the body when the task matches, extra
  files only if needed. **H** — [Anthropic engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- **Token budget.** About 100 tokens of metadata per skill, under 5,000 for the body, `SKILL.md`
  under 500 lines. **H** — [agentskills.io specification](https://agentskills.io/specification)
- **Who supports it.** GitHub Copilot (coding agent, CLI, VS Code) since 18 Dec 2025
  ([changelog](https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/)); agentskills.io lists about 40 clients, including Claude
  Code, Codex, Gemini CLI, Cursor, VS Code, OpenCode, Goose and Kiro. **H**
- **For comparison:** Cloudflare exposes 2,500+ API endpoints through two tools in about 1,000
  tokens, versus 1.17 million as plain MCP tools. **H** — [Cloudflare, 20 Feb 2026](https://blog.cloudflare.com/code-mode-mcp/)

## What a CLI costs

- **It needs a shell, and a shell needs a sandbox.** Prompt injection and data exfiltration (SSH
  keys, for example) are the risks; safe use needs filesystem *and* network isolation. Sandboxing cut
  permission prompts by 84%. **H** — [Anthropic, 20 Oct 2025](https://www.anthropic.com/engineering/claude-code-sandboxing)
- **Windows.** Claude Code on native Windows needs Git for Windows for Bash (otherwise PowerShell),
  and sandboxing is not supported on native Windows. **H** — [Claude Code setup](https://code.claude.com/docs/en/setup)
- **Auth, multi-user, audit** are where MCP is stronger: per-user OAuth, tenant isolation, audit
  trails. The 2026-07-28 MCP spec added cacheable tool lists and tighter OAuth. **H** —
  [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- **Output made for humans breaks agents** — see the counting result above.

## When to use which

Sources on both sides land on the same split:

- **CLI:** a developer or coding agent on a machine with a shell, well-known tools (`gh`, `aws`,
  `git`, `npx playwright cli`), and cost or context pressure.
- **MCP:** multi-user or customer-facing agents that need per-user login, governance and audit;
  clients with no shell (chat, mobile, non-developers); broad coverage with little engineering.
- **Either way:** tool design matters more than the protocol. MCP's token gap shrinks with tool
  search or code mode, and a well-designed CLI output beats both.

## Could not verify (not used)

- **"mcp-vs-cli-bench"** (Alier et al., Zenodo, 8 Aug 2026): its repository still says results are
  being collected; web snippets quoting "10–32× cheaper, 72%" mix it up with Scalekit's numbers.
- Perplexity dropping MCP internally, and its "72% context waste" figure — secondary blogs only.
