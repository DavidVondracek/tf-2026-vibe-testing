# 15:15 · Speed Gap Battle

**Time:** 15:15–16:15 · 40 min build (until 15:55) + 18 min demos

**Goal:** the demo app just shipped 3 new features. Extend your suite to cover them. Use exactly
what you built: no rebuilding, no switching tools.

## Checkpoints

| Time | What happens |
| --- | --- |
| 15:15 | Features revealed |
| 15:35 | First feature covered |
| 15:55 | Pencils down, demos start |

## Steps

1. At 15:15, three new stories — `FD-09`, `FD-10` and `FD-11` — appear in `spec/battle/` in
   Wopee-io's repository. Get them on your team branch:

   ```bash
   git switch team-N
   git pull upstream main
   ```

   Never forked (a teammate's own clone)? Then Wopee-io is your `origin`: `git pull origin main`.

2. Point your suite at the new build, `https://foodora-new.lovable.app`, and run it
   from `teams/team-N/`:

   bash (macOS, Linux, Git Bash):

   ```bash
   export FOODORA_URL=https://foodora-new.lovable.app
   npx playwright test
   ```

   PowerShell:

   ```powershell
   $env:FOODORA_URL="https://foodora-new.lovable.app"
   npx playwright test
   ```

   cmd.exe:

   ```bat
   set FOODORA_URL=https://foodora-new.lovable.app
   npx playwright test
   ```

   The variable lives only in that terminal. Your agent's terminal needs it too — tell the agent
   the address once.

3. Read the three stories. Add tests for them with your skill and your tool. **Test against the
   story, not the build**: a test that copies what the new build does passes on every bug.
4. Push before 15:55: `git add teams/team-N`, `git commit -m "Battle"`, `git push`.

**Wopee.io team:** run your suite against the new build — create a second project with
`https://foodora-new.lovable.app` in cmd.wopee.io — and
add test cases for `FD-09` … `FD-11`.

## Scoring

Each team shows its work in **3 minutes** (6 teams, 18 minutes). After each demo the room votes
with **1–5 fingers** on each of:

| | Question |
| --- | --- |
| 🚀 **Speed** | How much did you cover in 40 minutes? |
| 🎯 **Accuracy** | Would your suite catch a real regression? |
| 💡 **Reusability** | Does your `SKILL.md` work beyond today, on another app? |

**You don't vote for your own team.**

A good 3-minute demo: what you covered, one thing your suite caught, and how your skill helped.

## Where files go

`teams/team-N/tests/` and `teams/team-N/skills/`, as before. Do not edit `spec/battle/`.

## Done when

At 15:55 your new tests are pushed, and your team is ready to demo.

## If stuck

- `git pull upstream main` says there is no `upstream`: `git remote add upstream https://github.com/Wopee-io/tf-2026-vibe-testing-web-apps`, then pull again.
- Every test fails against the new build, even the old ones? Check the address in `FOODORA_URL`.
- 15:35 and nothing covered? Pick one story and one test. One solid test beats three guesses.

Next: [16:15 · Wrap-up](07-wrap.md)
