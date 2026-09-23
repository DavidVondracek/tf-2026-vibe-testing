# Writing a skill your agent can run cold

A skill is a folder with a `SKILL.md` — a name, a description, and the instructions an agent
follows when a task matches. It is the smallest unit of testing knowledge you can hand to an
agent, review in a pull request and take home. This page is the good practice, distilled from
[the research](research/skills.md); every rule there has a source.

## The shape

```
my-skill/
├── SKILL.md          ← frontmatter + instructions; loaded when a task matches
├── references/       ← read only when SKILL.md points there
│   └── mocking.md
└── scripts/          ← run, never read into context
    └── check.sh
```

```markdown
---
name: my-skill
description: <what it does>. Use when <the words a tester types>.
---

# My skill

<the task, as numbered steps>
```

- The **folder name must equal `name`** — lower-case letters, digits and hyphens, at most 64
  characters.
- The **description is the trigger.** It is the only part the agent always sees. Third person,
  what the skill does, then *"Use when …"* with the literal phrases people type. Up to 1,024
  characters; a good one is two sentences.
- The **body is the task,** not an encyclopedia. Numbered steps, one default path, an escape
  hatch where needed. Under 500 lines; move detail to `references/`.

## Where it goes

The agent only finds skills at the **root of the open folder**:

| Tool | Reads skills from |
| --- | --- |
| GitHub Copilot in VS Code | `.github/skills/`, and also `.claude/skills/` and `.agents/skills/` |
| Claude Code | `.claude/skills/` (project), `~/.claude/skills/` (user) |
| Codex, OpenCode and others on the shared format | `.agents/skills/` |
| Playwright's `npx playwright init-skills` | writes to `.claude/skills/` (`--loop=claude`, the default) or `.agents/skills/` (`--loop=agents`) |

In this repository, a team's skill is committed where it runs: `.github/skills/team-N-<name>/`.
Edit it in place — the next new chat sees the change. Skills you only try out (the exhibits'
`foodora-order` and `wopee-intent-tests`) are copied in and stay gitignored; remove the old copy
first, or `cp -r` nests it.

## Ten rules

1. **Say when, not only what.** *"Automates browser interactions"* never fires on its own;
   *"Orders a meal on Foodora and checks the confirmation. Use when asked to order, check out or
   test the cart."* does. In one measured case a skill with a vague description was never
   invoked in 56% of runs and scored no better than having no skill at all.
2. **One skill, one job.** Focused skills with a few sections beat exhaustive bundles — the
   measured lift is about +17 points on pass rate for curated, focused skills, and it shrinks as
   skills pile up.
3. **Assume a smart reader.** Do not explain what Playwright is. Add only what the agent does not
   know: your app, your flow, your rules.
4. **Match freedom to fragility.** Heuristics where many paths work ("find the cheapest dish");
   exact commands where one wrong move costs ("run exactly `npx playwright cli -s=lab open …`,
   do not add flags").
5. **Keep app facts out of the skill.** Prices, labels, URLs, locators and test accounts change
   without telling you. Point at the spec — *"take expected results from `spec/foodora-spec.md`,
   FD-05"* — and read the address from `FOODORA_URL`. A skill that carries a price fails on the
   price, and the defect you were hunting hides behind that red.
6. **Make every step leave a trace.** A snapshot path, a file, a line printed. A step that
   produces nothing is the step the agent skips. Say what to do when a required element is
   missing: **fail, do not look for another route.**
7. **Scripts for the deterministic parts.** If the same three commands run every time, put them
   in `scripts/` and say "run it", not "here is how".
8. **References one level deep.** Link them from `SKILL.md` directly; give any file over 100
   lines a table of contents. Deeper nesting gets skimmed, not read.
9. **Expect it to be read, not obeyed.** Instruction files are context. A rule that must always
   hold belongs in a check the agent cannot skip — a script that fails, a test that asserts — not
   in a sentence that says "always".
10. **Test it cold.** A fresh chat, memory cleared, only the skill and `run <name>`. If you have
    to type one more word, the skill is not done. Then try it on a second model: what works on a
    big model often needs more guidance on a small one.

## Before you install someone else's skill

Skills run commands. In a scan of 3,984 public skills, more than a third had a security flaw and
76 were outright malicious — most of those through prompt injection written into the Markdown.
Read the whole file, including anything that downloads, decodes or writes into other files, and
be suspicious of text you cannot see (hidden Unicode). Install skills the way you would run a
script from the internet: only from people you trust.

## Review checklist

Use it on your own skill before the Swap, and on the one you receive.

- [ ] The description says what the skill does **and when to use it**, in the third person, in
      words a tester would type.
- [ ] The folder name equals `name`, and both are lower-case with hyphens.
- [ ] The body is numbered steps with one default path — under 500 lines, nothing the agent
      already knows.
- [ ] Every expected result points at a spec rule or is a relationship the agent reads at run
      time; no invented numbers, no locators.
- [ ] The app address comes from `FOODORA_URL`, with the documented fallback.
- [ ] Every step leaves evidence, and the fail rule is explicit.
- [ ] References are linked one level deep; scripts say "run" or "read".
- [ ] It does not contradict [`AGENTS.md`](../AGENTS.md).
- [ ] It ran cold: new chat, memory cleared, `run <name>`, nothing else.
- [ ] You read every line before installing it — especially the ones that run something.

## Examples in this repository

| Skill | What it shows |
| --- | --- |
| [`foodora-order`](../experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md) | One flow through the CLI, expected results from the spec, the address from `FOODORA_URL` |
| [`wopee-intent-tests`](../experiments/1_Zoo/4-Wopee/skills/wopee-intent-tests/SKILL.md) | Shaping what an agent writes through an MCP tool: a template, look-before-asking, fetch → edit → update → verify around a destructive call |
| [`team-setup`](../.github/skills/team-setup/SKILL.md) and [`battle-setup`](../.github/skills/battle-setup/SKILL.md) | Shipped with the repository, so they work from the first chat: a procedure you would otherwise type, look-before-asking for facts, stop-on-failure rules |
| [`foodora-smoke`](../.github/skills/foodora-smoke/SKILL.md) | The 09:38 live demo, run cold: four checks with spec IDs, a fixed report table, FAIL when a step cannot run |
| [`teams/_template/SKILL.md`](../teams/_template/SKILL.md) | The starting point for your own |
| `.claude/skills/playwright-cli` (after `npx playwright init-skills`) | Microsoft's: a command-surface body plus references loaded on demand — and a description without "use when", which is why our prompts name the CLI |
