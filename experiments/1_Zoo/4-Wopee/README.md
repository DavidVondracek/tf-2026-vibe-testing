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

```json
{
  "mcpServers": {
    "wopee": {
      "command": "npx wopee-mcp",
      "env": {
        "WOPEE_PROJECT_UUID": "your-project-uuid",
        "WOPEE_API_KEY": "your-api-key"
      }
    }
  }
}
```

Both values come from your project in `cmd.wopee.io`. The server exposes tools to dispatch an
analysis, dispatch an agent run, fetch suites and read or write artifacts.

Then just ask, in the chat: *start a Wopee analysis on my project and tell me what it found.*

## The question to answer at the debrief

Open a visual diff and decide: **real regression, or noise?**

That judgement is the whole job. A tool that shows you every difference has not saved you
anything; a tool that hides the wrong one has cost you a bug. Score it on the scorecard
accordingly — and score it honestly. Especially this one.
