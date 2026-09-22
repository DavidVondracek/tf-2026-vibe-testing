# Exhibit 4 · Wopee.io + MCP

**20 minutes.** Paste the URL, watch it map the app — then call the same agent from your own agent.

Built by your zookeeper, judged by you. Same rules as the other three.

## Steps

1. Sign in at [cmd.wopee.io](https://cmd.wopee.io) and create a project with the [Foodora URL](https://foodora.lovable.app/).
   Test instructions: paste `FD-05` and `FD-06` from [the spec](../../../spec/foodora-spec.md), or
   the short version, *order a meal and verify the confirmation.*
2. Start it, then watch the agent explore live while it maps the app.
3. Open one visual diff.

## Done when

A run finished, and you opened one visual diff.

## Bonus — the testing agent as a tool

Ask your coding agent to start the Wopee run. It calls a testing agent as a tool — the Wopee MCP
server is already wired up.

The Wopee MCP server is already set up in this repository's
[`.vscode/mcp.json`](../../../.vscode/mcp.json). It reads its two values from `.env` in the
repository root — `npm install` created that file for you. Open it and fill in:

```bash
WOPEE_PROJECT_UUID=<your project UUID>
WOPEE_API_KEY=<your project API key>
```

Both come from **cmd.wopee.io → your project → Settings** (the key under *API Keys*). `.env` is
gitignored — the values stay on your laptop. Then reload VS Code
(`Ctrl/Cmd+Shift+P` → **Developer: Reload Window**).

Open Copilot Chat in **agent mode** and ask: *start a Wopee analysis on my project and tell me
what it found.* You should see it call `wopee_dispatch_analysis`.

The server's tools create and fetch suites, dispatch an analysis, dispatch an agent run on chosen
test cases, fetch the results, and fetch, update or generate artifacts such as user stories and
Playwright code.

> On Claude Code instead? Same server, different file: `.mcp.json` in the repository root, with
> `mcpServers` instead of `servers`. The values come from the same `.env`.

## The question to answer at the debrief

Open a visual diff and decide: **real regression, or noise?**

That judgement is the whole job. A tool that shows you every difference has not saved you
anything; a tool that hides the wrong one has cost you a bug. Score it on the scorecard
accordingly — and score it honestly. Especially this one.

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check [troubleshooting](../../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** use the shared project on the whiteboard — a finished run is already waiting there.
The config is already in [`.vscode/mcp.json`](../../../.vscode/mcp.json); the values go in `.env`.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#get-ready-for-the-workshop)
