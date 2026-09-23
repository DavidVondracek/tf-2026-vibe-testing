---
name: team-setup
description: Sets up a workshop team — forks the repository, creates the team-N branch and teams/team-N folder, and opens the team's draft pull request to Wopee-io. Use when someone says "set up my team", "set up team N", "fork the repo for our team", or starts the 11:50 Teams block.
---

# Set up a team

Run every command from the repository root, in the VS Code terminal (Git Bash on Windows). Say
what you are about to do before each step, and show the output.

## Before you start

You need two facts no tool knows. Ask for them in one question if the person did not give them:

- **The team number** `N` (a whole number, from the mission card).
- **The team's tool**: AI Coding Agent, Playwright Agents, Playwright CLI + Skills, or Wopee.io.

Then check, and stop with the fix if one fails:

1. `gh auth status --hostname github.com` — signed in to github.com. Check only that host: a
   plain `gh auth status` also fails on any other account the person has (a company GitHub
   Enterprise login with an expired token), which does not matter here. Not signed in? Ask the
   person to run `gh auth login` themselves (GitHub.com, HTTPS, web browser). Never type
   credentials for them.
2. `git status --short` — no uncommitted changes outside `teams/`. If there are, list them and
   ask before continuing.

## Steps

1. **Fork**, unless it is done already. Look first: `git remote -v`.
   - `upstream` already points at `Wopee-io/tf-2026-vibe-testing` → skip to step 2.
   - Otherwise: `gh repo fork --remote`. If gh says it is too old, stop and give the update
     command: `brew upgrade gh` (macOS) or `winget upgrade GitHub.cli` (Windows).
2. **Make pull requests target Wopee-io:** `gh repo set-default Wopee-io/tf-2026-vibe-testing`.
3. **Branch from Wopee-io's `main`, never from the branch you happen to be on** — otherwise the
   team's pull request drags in whatever that branch holds:
   ```bash
   git fetch upstream
   git switch -c team-N upstream/main   # or: git switch team-N, if it exists
   cp -r teams/_template teams/team-N   # skip if teams/team-N exists
   mkdir -p .github/skills/team-N-my-skill
   mv teams/team-N/SKILL.md .github/skills/team-N-my-skill/SKILL.md
   ```

   Then set `name: team-N-my-skill` in that file. This is the team's skill, committed where the
   agent finds it.
4. **Fill the header** of `teams/team-N/README.md`: the team line (ask for names if you do not
   have them; "Team N" is fine) and the tool line, keeping only the team's tool.
5. **Check the folder runs:** `cd teams/team-N && npx playwright test --project=chromium; cd ../..`.
   *Error: No tests found* is the correct result for a new team — say so.
6. **Commit, push, draft PR:**
   ```bash
   git add teams/team-N .github/skills/team-N-my-skill
   git commit -m "Team N: start"
   git push -u origin team-N
   gh pr create --draft --title "Team N · <tool>" --body "Team N suite and skill"
   ```

## Done when

Report, in four lines: the fork (`origin` = the person's fork, `upstream` = Wopee-io), the
branch, the folder, and the draft pull request's URL. Then check the pull request:
`gh pr view --json baseRefName,files` must show base `main` and **only** files under
`teams/team-N/` and `.github/skills/team-N-my-skill/`. Anything else means the branch did not start from `upstream/main` — say so.

## Rules

- Do these steps and nothing else. Wiring the team's tool (`npm run agents`, seed tests, MCP
  servers, skills) belongs to the Build block after lunch, in `day/04-build.md` — do not start it
  here, even if it looks helpful.
- Touch only `teams/team-N/` and `.github/skills/team-N-my-skill/`. Never edit `experiments/`, `spec/` or another team's folder.
- Never force-push, never delete a branch, never close someone else's pull request.
- A step fails? Stop, show the error and the one command that fixes it. Do not work around it.
- `gh` missing, too old or not signed in, and the person cannot fix it now? Do the `git` steps
  yourself and hand the two GitHub steps to them in the browser, from `day/03-teams.md`:
  **Fork** on Wopee-io's page (then `git remote rename origin upstream` and
  `git remote add origin https://github.com/<them>/tf-2026-vibe-testing`), and **Compare & pull
  request → Create draft pull request** after the push.
