# Exhibit 4 · Wopee.io + MCP

**20 minutes.** Paste the URL, watch it map the app — then call the same agent from your own agent.

Built by your zookeeper, judged by you. Same rules as the other three.

## Steps

1. Sign in at [cmd.wopee.io](https://cmd.wopee.io) and create a project with the Foodora URL.
   Test instructions: *order a meal and verify the confirmation.*
2. Start it, then watch the agent explore live while it maps the app.
3. Open one visual diff.

## Done when

A run finished, and you opened one visual diff.

## Bonus — the testing agent as a tool

Add the Wopee MCP server to your coding agent and ask **it** to start the run. Your coding agent
now calls a testing agent as a tool.

Copy [`mcp.json.example`](./mcp.json.example) into place and reload VS Code:

```bash
cp experiments/1_Zoo/4-Wopee/mcp.json.example .vscode/mcp.json
```

VS Code prompts you for the project UUID and the API key on first use and keeps them in its
secret storage. **Do not paste the key into a file in this repository** — same rule as the
gateway key at Exhibit 1.

Both values come from **cmd.wopee.io → your project → Settings** (the key under *API Keys*).

Open Copilot Chat in **agent mode** and ask: *start a Wopee analysis on my project and tell me
what it found.* You should see it call `wopee_dispatch_analysis`.

The server exposes seven tools — create a blank suite, fetch suites, dispatch an analysis,
dispatch an agent run, and fetch, update or generate artifacts.

> On Claude Code instead? Same two values, different file and a different top-level key:
> `.mcp.json` with `mcpServers` rather than `servers`, and no `inputs` block. See
> [`.env.example`](./.env.example) for the environment-variable route.

## The question to answer at the debrief

Open a visual diff and decide: **real regression, or noise?**

That judgement is the whole job. A tool that shows you every difference has not saved you
anything; a tool that hides the wrong one has cost you a bug. Score it on the scorecard
accordingly — and score it honestly. Especially this one.
