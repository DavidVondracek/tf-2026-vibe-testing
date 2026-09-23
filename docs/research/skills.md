# Skills for AI agents

Researched 23 September 2026. Confidence: **H** primary source read · **M** primary source with a caveat (a vendor claim, a narrow setup), or a reputable secondary source linking to the primary · **L** could not verify (not used).

The practical guide distilled from this is [`docs/skills.md`](../skills.md).

## The short version

- **A skill costs almost nothing until it is used.** Only its name and description sit in the
  agent's context (about 100 tokens); the body loads when a task matches, and the reference files
  only when the body points at them. That is the whole design.
- **Curated, focused skills raise pass rates; big bundles do not.** On SkillsBench, curated skills
  lifted the average pass rate from 33.9% to 50.5%, and "focused Skills with at most three modules
  outperform larger or exhaustive bundles".
- **The description is the trigger, and triggering is the weak point.** In Vercel's evals a
  vendor-quality skill was never invoked in 56% of runs and scored no better than having no skill;
  told explicitly to use it, the agent scored 79%. A description that says *when* is the fix.
- **Loaded is not followed.** Anthropic's own docs call instruction files "context, not enforced
  configuration". A rule that must hold needs a hook or a script, not a sentence.
- **Skills are code you run from strangers.** Of 3,984 public skills Snyk scanned, 36.8% had a
  security flaw and 76 were confirmed malicious, 91% of those using prompt injection in the prose.

## What a skill is

A folder with a `SKILL.md` whose YAML frontmatter carries a `name` and a `description`, and whose
body holds the instructions. Optional `scripts/` (run, not read), `references/` (read on demand)
and `assets/` sit beside it. Anthropic released the format on 16 October 2025 and opened it as a
vendor-neutral specification at [agentskills.io](https://agentskills.io/specification) on
18 December 2025; the other coding agents adopted it within weeks. **H**

The specification, verbatim where it matters:

- `name`: 1–64 characters, lower-case letters, digits and hyphens, no leading, trailing or double
  hyphen, and "must match the parent directory name".
- `description`: 1–1,024 characters, "describes both what the skill does and when to use it",
  with "specific keywords that help agents identify relevant tasks". Its good example: *"Extracts
  text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with
  PDF documents or when the user mentions PDFs, forms, or document extraction."* Its poor one:
  *"Helps with PDFs."*
- Optional: `license`, `compatibility` (most skills do not need it), `metadata` (free key–value
  pairs, e.g. `version`), `allowed-tools` (experimental; pre-approved tools such as
  `Bash(git:*) Read`).
- Body: "no format restrictions"; recommended sections are step-by-step instructions, examples of
  inputs and outputs, common edge cases.

**Progressive disclosure** is the mechanism, in three stages: *metadata* (~100 tokens per skill —
name and description, loaded at startup for every skill), *instructions* (the `SKILL.md` body,
under 5,000 tokens recommended, loaded when the skill is activated), *resources* (scripts,
references, assets, loaded only when required). "Keep your main `SKILL.md` under 500 lines" and
"keep file references one level deep". `skills-ref validate ./my-skill` checks the frontmatter.
[agentskills.io specification](https://agentskills.io/specification) **H** ·
[Anthropic, skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) **H**

## Where each tool looks

| Tool | Project folders | User folders | Since |
| --- | --- | --- | --- |
| GitHub Copilot in VS Code (also Copilot CLI, coding agent, code review) | `.github/skills/`, `.claude/skills/`, `.agents/skills/` | `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/` | Dec 2025; `/create-skill` and `/skills` in chat |
| Claude Code | `.claude/skills/` (also nested per subfolder, plugins) | `~/.claude/skills/` | Oct 2025; invoked as `/name` |
| OpenAI Codex | `.agents/skills/` (walks up to the repo root) | `~/.agents/skills/` | invoked as `$name` |
| OpenCode | `.opencode/skills/`, `.claude/skills/`, `.agents/skills/` | `~/.config/opencode/skills/`, `~/.claude/skills/`, `~/.agents/skills/` | per-skill permissions in `opencode.json` |
| Cursor | `.agents/skills/`, `.cursor/skills/` | `~/.agents/skills/`, `~/.cursor/skills/` | Cursor 2.4, Jan 2026 |
| Gemini CLI | `.agents/skills/` or `.gemini/skills/` | `~/.agents/skills/` or `~/.gemini/skills/` | on by default Jan 2026 |
| Playwright `npx playwright init-skills` | writes `.claude/skills/` (`--loop=claude`, default) or `.agents/skills/` (`--loop=agents`) | — | Playwright 1.63 as used here |

`.agents/skills/` is the folder every tool except Claude Code reads, which makes it the
cross-tool choice; `.github/skills/` is Copilot's own. Sources:
[VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills) ·
[GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) ·
[Claude Code](https://code.claude.com/docs/en/skills) ·
[OpenAI](https://learn.chatgpt.com/docs/build-skills) ·
[OpenCode](https://opencode.ai/docs/skills/) ·
[Cursor](https://cursor.com/docs/context/skills) ·
[Gemini CLI](https://geminicli.com/docs/cli/skills/) **H**

## What has been measured

| Study | Setup | Result | Conf. |
| --- | --- | --- | --- |
| [SkillsBench](https://arxiv.org/abs/2602.12670), Li et al., Feb 2026 (rev. Jun 2026) | 87 tasks, 8 domains, curated skills with deterministic verifiers, 18 model/harness configurations | Curated skills raise the average pass rate **33.9% → 50.5% (+16.6 pp)**; per-configuration gains +4.1 to +25.7 pp; "focused Skills with at most three modules outperform larger or exhaustive bundles"; smaller models with skills match larger ones without | H |
| [Vercel](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals), 27 Jan 2026 | Teaching an agent Next.js 16 APIs: no docs, a skill, a skill with an explicit instruction, an 8 KB docs index in AGENTS.md | **No docs 53% · skill 53% (never invoked in 56% of runs) · skill with explicit instruction 79% · AGENTS.md index 100%** | M, vendor evals |
| [Scalekit](https://www.scalekit.com/blog/mcp-vs-cli-use), 11 Mar 2026 | Claude Sonnet 4, five read-only GitHub tasks, 25 runs each | An ~800-token `gh` skill "reduced tool calls by about a third"; CLI+skill 2.8–12K tokens per task vs MCP 32–83K | M, vendor blog |
| [Snyk, ToxicSkills](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/), 5 Feb 2026 | 3,984 public skills scanned | **36.8% with at least one flaw, 534 (13.4%) critical, 76 confirmed malicious, 91% of those using prompt injection** alongside code; obfuscated downloads, base64 exfiltration, backdoors | H |
| [Chroma, Context Rot](https://www.trychroma.com/research/context-rot), 2025 | 18 models, growing input | Accuracy declines monotonically as the context grows, well below the window limit — why a long skill body costs more than its tokens | H |

## Failure modes seen in practice

1. **The skill never fires.** The description says *what* but not *when* ("Database utilities");
   the folder is in the wrong place or its name differs from `name:`; the frontmatter is broken.
   Vercel's 56%-never-invoked figure is the measured case.
   [Vercel](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals) **M** ·
   [Anthropic best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) **H**
2. **Loaded but ignored.** The agent reads the skill, acknowledges it, and does something else on a
   long task. Anthropic's memory docs: instruction files are "context, not enforced configuration";
   for a hard rule, use a hook.
   [Claude Code memory docs](https://code.claude.com/docs/en/memory) **H** ·
   [anthropics/claude-code #18454](https://github.com/anthropics/claude-code/issues/18454) **H**
3. **Too long.** "Every token competes with conversation history"; keep the body under 500 lines.
   SkillsBench's finding that exhaustive bundles underperform focused ones is the same effect.
   **H**
4. **Facts that rot.** URLs, locators, labels and prices baked into a skill go stale silently, and
   the outputs still look plausible. Anthropic: no time-sensitive information in a skill, or in an
   "old patterns" section. **H**
5. **Skills that contradict the repository's instruction file.** Both are context; the model
   resolves the conflict, not a precedence rule. **H**
6. **Untrusted skills.** See Snyk above. Hidden Unicode instructions inside a plausible skill made
   an agent run `curl … | bash`.
   [Embrace the Red, 11 Feb 2026](https://embracethered.com/blog/posts/2026/scary-agent-skills/) **H**
7. **Memory bleeding into a "cold" run.** A fresh chat is not cold if the agent's memory tool
   remembered yesterday's workaround. Clear it, or test in an isolated session. **H**

## What works

Each item is Anthropic's guidance unless marked otherwise.
[Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) **H**

- **Description = trigger sentence.** Third person; what it does, then "Use when …" with the words
  people actually type. agentskills.io adds: "err on the side of being pushy" about when to use it.
  [agentskills.io, optimizing descriptions](https://agentskills.io/skill-creation/optimizing-descriptions) **H**
- **A task-shaped body.** Numbered steps, a checklist the agent can copy, a feedback loop ("run the
  validator, fix, repeat"), one default with an escape hatch — not a menu of options and not an
  encyclopedia. "Claude is already very smart": only add what the model does not know.
- **Gotchas are the highest-value content.** Environment facts that defy reasonable assumptions;
  when the agent makes a mistake you correct, add the correction.
  [agentskills.io, best practices](https://agentskills.io/skill-creation/best-practices) **H**
- **Match freedom to fragility.** High freedom (heuristics) where many paths work; low freedom
  ("run exactly this script, do not add flags") where the path is "a narrow bridge with cliffs on
  both sides".
- **References one level deep,** linked straight from `SKILL.md`, with a table of contents in any
  file over 100 lines; deeper nesting gets skimmed with `head -100`.
- **Scripts for deterministic steps.** "Prefer scripts for deterministic operations"; say whether
  to *run* or *read* them; no unexplained constants.
- **App facts live in a spec the skill points to,** not in the skill. Vercel's 8 KB docs index in
  AGENTS.md is the same idea from the other side: index the facts once, put the actions in skills.
  **M**
- **Test cold, against a baseline, on every model.** Build three evaluations before writing the
  skill, measure without it, then with it; one agent writes the skill and a fresh one runs it,
  because "leftover context from authoring the skill will mask gaps"; test on Haiku, Sonnet and
  Opus because "what works perfectly for Opus might need more detail for Haiku".
  [Claude Code skills docs](https://code.claude.com/docs/en/skills) **H**
- **One skill per job.** SkillsBench: at most three modules. **H**

## Skills and their neighbours

| Mechanism | For | Loaded | Lives in |
| --- | --- | --- | --- |
| **Skill** | A procedure with its own references and scripts | Metadata always; body when a task matches or you invoke it | `.github/skills/`, `.claude/skills/`, `.agents/skills/` |
| **Instructions** (`AGENTS.md`, `CLAUDE.md`, `copilot-instructions.md`) | Facts that hold in every session: layout, commands, rules | Every session, at start | Repository root |
| **Prompt file** (`.prompt.md`) | A saved task you run by hand | Only when you invoke it | `.github/prompts/` |
| **Custom agent** (`.agent.md`, subagent) | A persona with its own instructions and tool list, in its own context | When selected or delegated to | `.github/agents/`, `.claude/agents/` |
| **MCP server** | Tools, not instructions | Tool list at session start; a tool when called | `mcp.json` |
| **Hook** | Enforcement that does not depend on the model agreeing | On lifecycle events, always | `settings.json`, `.github/hooks/` |

The rule of thumb from Anthropic's memory docs: instruction files hold *facts*; when a section
grows into a *procedure*, it becomes a skill; when a rule must *always* hold, it becomes a hook.
[Claude Code memory](https://code.claude.com/docs/en/memory) ·
[VS Code customization concepts](https://code.visualstudio.com/docs/agents/concepts/customization) **H**

## Tooling

- **Write:** VS Code `/create-skill`; Anthropic's `skill-creator` plugin (interviews you, drafts
  the skill, builds evals, optimises the description over trigger queries).
  [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator) **H**
- **Check:** `skills-ref validate` for the frontmatter (spec reference library); `/skill-doctor`
  in Claude Code for what each skill costs and how often it fires; `claude plugin eval` runs each
  case with and without the plugin, three times, and reports the delta — "the most common first
  finding is a Δ near zero … Claude isn't choosing your skill on natural phrasing. Adjust the
  description." [Claude Code plugin evals](https://code.claude.com/docs/en/plugin-evals) **H**
- **Install and share:** `npx skills add` (Vercel's registry, installs into any tool's folder),
  `gh skill install|search|publish` (GitHub CLI 2.90+), `copilot skill add`.
  [vercel-labs/skills](https://github.com/vercel-labs/skills) ·
  [GitHub changelog, 16 Apr 2026](https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/) **H**
- **Scan:** `uvx mcp-scan@latest --skills`, Snyk's scanner from the ToxicSkills work. **H**

## Skills for testing

- **Playwright's `playwright-cli` skill** (Microsoft): a body about the command surface — core
  interactions, snapshots and refs, sessions — plus references for test generation, mocking,
  tracing, video and storage state, loaded only when needed. Built for "coding agents that favor
  token-efficient, skill-based workflows", keeping page snapshots in files rather than in context.
  [Playwright docs](https://playwright.dev/docs/getting-started-cli) ·
  [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli) **H**.
  Its description is the counter-example to the trigger rule: *"Automate browser interactions,
  test web pages and work with Playwright tests."* — no "use when". In this workshop the agent
  still finds it, because the prompt names the CLI.
- **Anthropic's `webapp-testing` skill:** a decision tree, reconnaissance before action, "wait for
  networkidle before inspecting the DOM", a helper script for the server lifecycle.
  [anthropics/skills](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md) **H**
- **Our own:** [`foodora-order`](../../experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md)
  (drives the CLI through one flow, expected results from the spec) and
  [`wopee-intent-tests`](../../experiments/1_Zoo/4-Wopee/skills/wopee-intent-tests/SKILL.md)
  (shapes what an agent writes through an MCP server, with the fetch → edit → update → verify
  discipline around a destructive tool). The rehearsal notes in
  [Exhibit 2](../../experiments/1_Zoo/2-PlaywrightAgents/solutions/rehearsal-notes.md) and
  [Exhibit 4](../../experiments/1_Zoo/4-Wopee/README.md) record what happened before and after
  each skill was installed.
- **MCP servers and skills compose.** The MCP project's own guidance ships skills as "portable
  instruction sets" that decide which tool to call and how; Anthropic says to name MCP tools fully
  qualified (`Server:tool`) inside a skill.
  [MCP docs, Build with Agent Skills](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills) **H**

## Sources not used

Several widely quoted figures could not be traced to a page that loads: a 650-trial study of
directive vs passive descriptions (Medium, blocked), a 6,434-skill token measurement (Towards AI,
blocked), and a claimed character budget after which skills stop loading (no official source). They
are consistent with the sources above but are not cited.
