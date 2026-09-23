---
name: battle-setup
description: Prepares a team for the Speed Gap Battle — pulls the three new stories from Wopee-io onto the team branch, points the suite at the new build with FOODORA_URL, and runs the suite once. Use when someone says "prepare the battle", "get the battle stories", "switch to the new build", or at 15:15.
---

# Prepare the Battle

Run every command from the repository root. Say what you are about to do before each step, and
show the output.

## Before you start

Find the team number yourself: the current branch (`git branch --show-current`) is `team-N`, or
the one folder under `teams/` that is not `_template`. Ask only if neither tells you.

## Steps

1. **Commit what is open,** so the pull cannot conflict with unsaved work:
   `git status --short`. Anything under `teams/team-N/`? Commit it:
   `git add teams/team-N .github/skills && git commit -m "Before the Battle"`.
2. **Get the stories:**
   ```bash
   git switch team-N
   git pull upstream main
   ```
   No `upstream` remote (`git remote -v`)? Then this clone never forked and Wopee-io is `origin`:
   `git pull origin main`.
3. **Check they arrived:** `ls spec/battle/` must list the stories for `FD-09`, `FD-10` and
   `FD-11`. Empty or missing? Stop: the presenter has not published them yet — say so.
4. **Point the suite at the new build.** In `.env` at the repository root, the last line is
   `# FOODORA_URL=https://foodora-new.lovable.app`. Remove the `# ` so it reads
   `FOODORA_URL=https://foodora-new.lovable.app`. Change nothing else in `.env`, and never print
   its other lines — they hold keys.
5. **Run the suite once** against the new build:
   `cd teams/team-N && npx playwright test --project=chromium; cd ../..`.

## Done when

Report: the three story ids and their titles from `spec/battle/`, that `FOODORA_URL` now points
at `https://foodora-new.lovable.app`, and the suite's result line (passed / failed counts). A red
test is information, not a problem to fix yet: the new build may have changed what it tested.

## Rules

- Take expected results for the new stories from `spec/battle/`, never from what the new build
  shows.
- Touch only `.env`'s last line, `teams/team-N/` and the team's `.github/skills/team-N-*/`.
- Never force-push or reset. A pull conflict? Stop and show it.
