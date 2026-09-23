# The 09:38 live demo

[`foodora-smoke`](foodora-smoke/SKILL.md) is the skill run cold on stage in the Concepts block: a
fresh chat, the words `run foodora-smoke`, no follow-up prompts. It checks the restaurant list
(`FD-01`), one restaurant's menu and quick-add (`FD-03`) against the spec, and writes a PASS/FAIL
table to `test-results/foodora-smoke.md`.

## Why it lives here

The agent only picks up skills in `.github/skills/`, `.claude/skills/` or `.agents/skills/`. Kept
in `docs/demo/`, the skill stays out of the way during the Zoo, where an agent that finds it on its
own would answer the exhibits for you. You install it when you want to run it.

## Run it yourself

1. Install it — the copy is gitignored, so it never ends up in a commit:

   ```bash
   mkdir -p .github/skills && cp -r docs/demo/foodora-smoke .github/skills/
   ```

   The same command works on macOS and on Windows: the repository's terminal is Git Bash there.
   Or, without the terminal: in the Explorer, copy the `docs/demo/foodora-smoke` folder and paste
   it into `.github/skills`.

2. Start a **new chat**, pick **Agent**, and type:

   ```
   run foodora-smoke
   ```

3. Read the table. Every result is judged against [`spec/foodora-spec.md`](../../spec/foodora-spec.md),
   not against what the app does.

Remove it with `rm -rf .github/skills/foodora-smoke`, or by deleting the folder in the Explorer.

## What it shows

How a skill is written — the description that says when to use it, spec IDs instead of app facts, a
fixed report, FAIL when a step cannot run — is in [Writing a skill](../skills.md). Build your own
the same way at 13:00.
