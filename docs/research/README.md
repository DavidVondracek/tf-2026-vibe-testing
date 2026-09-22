# Research: MCP, CLI, Playwright and intent-driven testing

The data behind the "Concepts: The New Stack" slides, for anyone who wants more than one slide per
topic. Researched 21–22 September 2026 (each report carries its date); every claim links to its source.

| Report | The question it answers |
| --- | --- |
| [MCP in general](mcp.md) | What is MCP, who uses it, and what does it cost? |
| [CLIs for AI agents](cli-for-agents.md) | Why do agents like the command line, and what do head-to-head studies measure? |
| [Playwright: MCP, CLI and Test Agents](playwright.md) | What does Microsoft ship, how does each interface work, and what is true about the "4× fewer tokens" claim? |
| [Intent-driven testing](intent-driven-testing.md) | What does "intent-driven" mean, which tools do it, and what has actually been measured? |
| [measure/](measure/) | The scripts behind the Foodora measurement — `./run.sh` re-runs it |
| [Our measurement on Foodora](foodora-measurement.md) | How many tokens does each Playwright interface put into an agent's context for the same task? Re-runnable. |

## The short version

- **MCP and CLI are both growing.** MCP has about 34,000 servers in its official registry and close
  to half a billion SDK downloads a month; skills and CLIs are supported by every major coding agent.
- **On success rate they tie.** Where both were measured on the same tasks, results were level.
- **CLIs usually cost 2–3× fewer tokens**, mostly because MCP loads its tool list before the agent
  starts. Clients are closing that gap by loading tools only when needed.
- **For Playwright today, each step costs the same** on MCP and CLI — both write the page to a file
  and hand the agent a link. The difference is what loads first.
- **Tool design matters more than the protocol.**
- **Intent-driven testing moves the hard part to the oracle.** The agent works out the steps; it
  still needs a spec to know what is correct. With a human checklist, agents' defect detection
  nearly doubled (F1 26% → 49%).

How confident to be: each report marks claims from a primary source, claims from a reputable
secondary source, and claims that could not be verified. Numbers that could not be traced to a
primary source are listed as such, not used.
