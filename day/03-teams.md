# 11:50 · Teams & Mission

**Time:** 11:50–12:00 · 10 min, then lunch until 13:00

**Goal:** find your team, read the mission, and set up your team's fork before lunch.

## Your mission card

> **Mission:** Build an AI-assisted test suite for the demo app covering its core user flows.
>
> Include at least one `SKILL.md` your agent can run cold.
>
> You have 90 min after lunch. Your suite goes straight into the Battle.

- **6 teams of 4.** Mixed leads and engineers, assigned in advance.
- **1 tool per team:**

  | Tool | Teams |
  | --- | --- |
  | 🤖 AI Coding Agent | 2 teams |
  | 🐍 Playwright Agents | 1 team |
  | 🦁 Playwright CLI + Skills | 2 teams |
  | Wopee.io | 1 team |

  Two tools are used twice, on purpose. Same tool, different team: the only difference left is
  how you worked.
- **Lunch is yours.** But your team is already talking.

## Steps

Pick **one laptop** as your team's driver. It owns the fork. Do this in the repository you cloned
this morning (`N` is your team number).

1. Fork the repository. Your fork becomes `origin`, and Wopee-io's repository becomes `upstream`:

   ```bash
   gh repo fork --remote
   git remote -v        # origin = your fork, upstream = Wopee-io
   ```

   Starting on a new laptop instead? `gh repo fork Wopee-io/tf-2026-vibe-testing-web-apps --clone`,
   then `npm install` in the new folder.

2. Make a branch and your team folder:

   ```bash
   git switch -c team-N
   cp -r teams/_template teams/team-N
   ```

   PowerShell: `Copy-Item -Recurse teams/_template teams/team-N`

3. Write your names and your tool at the top of `teams/team-N/README.md`.
4. Push, and open a draft pull request to Wopee-io's repository. The Swap finds your skill through it.

   ```bash
   git add teams/team-N
   git commit -m "Team N: start"
   git push -u origin team-N
   gh pr create --draft --title "Team N · <your tool>" --body "Team N suite and skill"
   ```

**Teammates who want to push too (optional):** the fork owner adds them on GitHub — the fork's
**Settings → Collaborators**. Each teammate then, in their own clone:

```bash
git remote add team https://github.com/<owner>/tf-2026-vibe-testing-web-apps
git fetch team
git switch team-N
```

and pushes with `git push team team-N`. Pairing on the driver's laptop is fine too.

## Where files go

Only into `teams/team-N/`. Nothing else in the repository changes.

## Done when

Your team has a fork, a `team-N` branch with `teams/team-N/`, and a draft pull request.

## If stuck

- `gh` says you are not logged in: `gh auth login`.
- No time before lunch? Do these steps first thing at 13:00 — they take 5 minutes.

Next: [13:00 · Build One Thing](04-build.md)
