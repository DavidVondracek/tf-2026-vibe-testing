# 14:30 · SKILL.md Swap

**Time:** 14:30–15:00 · 30 min (2 min setup, 20 min runs, 8 min feedback), then a break until 15:15

**Goal:** find out if your skill really runs cold — on someone else's laptop, with someone else's
tool. The Battle scores reusability; this is your dress rehearsal.

## Rotation

Each team runs the skill of the team **before** it:

| Your team | You run the skill of |
| --- | --- |
| Team 2 | Team 1 |
| Team 3 | Team 2 |
| Team 4 | Team 3 |
| Team 5 | Team 4 |
| Team 6 | Team 5 |
| Team 1 | Team 6 |

## Steps

1. Commit and push your own work first. Then find the other team's pull request number:

   ```bash
   gh pr list --repo Wopee-io/tf-2026-vibe-testing
   ```

2. Check out their pull request:

   ```bash
   gh pr checkout <number> --repo Wopee-io/tf-2026-vibe-testing
   ```

3. Make it cold. In Copilot Chat, `Ctrl/Cmd+Shift+P` → **Clear All Memory Files**, so nothing your
   agent remembered from the day helps it (Claude Code: `/clear`, and delete any memory notes it
   wrote today). Then remove your own skill from `.github/skills/`, and
   install theirs (`M` is their team number):

   ```bash
   rm -rf .github/skills/<your-skill>
   mkdir -p .github/skills
   cp -r teams/team-M/skills/<their-skill> .github/skills/
   ```

   PowerShell:

   ```powershell
   Remove-Item -Recurse -Force .github/skills/<your-skill> -ErrorAction SilentlyContinue
   New-Item -ItemType Directory -Force .github/skills | Out-Null
   Copy-Item -Recurse teams/team-M/skills/<their-skill> .github/skills/<their-skill>
   ```

4. Start a **new chat** with **your own tool**, with the agent picker on **Agent**. Type only this:

   ```text
   run <their-skill>
   ```

   Do not help it. Note every place where it broke, guessed, or needed a hint.

5. Write 3 lines of feedback on their pull request:

   ```bash
   gh pr comment <number> --repo Wopee-io/tf-2026-vibe-testing --body "Worked: …
   Broke or needed a hint: …
   One fix: …"
   ```

   | Line | Write |
   | --- | --- |
   | Worked | What the agent did without help |
   | Broke or needed a hint | The first place it stopped, guessed, or went wrong |
   | One fix | One change to the `SKILL.md` that would have prevented it |

6. Go back to your own branch and reinstall your skill:

   ```bash
   git switch team-N
   ```

   Then install your skill again as in [Build One Thing](04-build.md#where-files-go).

## Where files go

Nowhere. Do not commit to the other team's branch — feedback goes in the pull request comment.

## Done when

The other team has your 3 lines on their pull request, and you have theirs on yours.

## If stuck

- `gh pr checkout` refuses because of local changes: commit or push your own work first.
- The other team has no skill yet: run their tests instead (`cd teams/team-M`,
  `npx playwright test`) and give feedback on those.
- Their skill uses the Wopee MCP server? Run it against your own Foodora project from
  [Exhibit 4](../experiments/1_Zoo/4-Wopee/). A skill that only works on one project is useful
  feedback too.
- Over the break: fix what the swap found. The Battle starts from your branch.

Next: [15:15 · Speed Gap Battle](06-battle.md)
