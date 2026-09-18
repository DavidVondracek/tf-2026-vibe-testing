# Vibe Testing Lab: AI Agents, MCP, and the New Stack for Web App Testing

A full-day, hands-on workshop at [Tesena Fest 2026](https://www.tesena.com/tesena-fest) (24 September 2026, Prague). AI coding agents, Playwright MCP, Playwright CLI, and Wopee.io go head-to-head on the same demo app. You build the test suite, then you race to defend it.

- **Instructor:** [Marcel Veselka](https://www.linkedin.com/in/marcelveselka/) (Founder of [Wopee.io](https://wopee.io) and [Tesena](https://www.tesena.com))
- **Format:** Full-day hands-on workshop
- **Language:** English
- **More info:** [tesena.com/tesena-fest](https://www.tesena.com/tesena-fest)

## Target audience

Test automation engineers, QA leads, and QA managers.

## What you will do

- Run Playwright the traditional way, then via CLI, then via MCP, and see exactly what changes at each step
- Try Wopee.io as a purpose-built AI testing agent on the same app and the same task, as a direct comparison
- Wire an AI coding agent to generate, run, and interpret tests autonomously
- Write a `SKILL.md` that encodes your team's testing knowledge so any agent can reuse it
- Get hands-on with AI-assisted API testing: the same agent concepts, one layer below the UI
- Build a working test suite your team can actually use next week

## What you will walk away with

- First-hand experience with the tools shaping web app testing in 2026
- A working AI-assisted test suite you built yourself
- A `SKILL.md` your agent can run cold, without handholding
- A clear answer to the question your team keeps asking: where do we actually start?

## How the day runs

No death by slides. The day has 4 gears:

1. **The Zoo:** 4 exhibits, 1 demo app. An AI coding agent, Playwright MCP, Playwright CLI, and Wopee.io, one at a time, side by side. Every tool gets the same fair test. Including the one we built.
2. **Teams & Mission:** before lunch you are assigned to a team and handed a mission card. Lunch is yours, but your team is already talking.
3. **Build One Thing:** 90 minutes to build a real AI-assisted test suite, including a reusable capability your agent can run cold, without guidance. Then another team runs your SKILL.md cold and tells you where it broke. This is the thing you take home.
4. **Speed Gap Battle:** 3 new features just shipped on the demo app. Your suite is your only weapon. 45 minutes. Speed, accuracy, and reusability count, and the room votes.

### The Zoo

| #   | Exhibit             | What you do                                                                                     | Core concept                                        |
| --- | ------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 🤖  | **AI Coding Agent** | Define intent, watch the agent write, run, and interpret tests. Find where it breaks            | Agent autonomy and where human judgment still wins  |
| 🐍  | **Playwright MCP**  | Connect Playwright to an LLM, generate and run tests via natural language                       | MCP as the protocol that makes tools agent-readable |
| 🦁  | **Playwright CLI**  | Drive browser tests from the command line, pipe the output to an AI agent                       | CLI as the bridge between agent and browser         |
| 🔬  | **Wopee.io**        | Paste the URL, watch it map the app, generate and run visual + functional regression end to end | Purpose-built testing agent vs. general-purpose tools |

### Agenda

| Time  | Block                          |
| ----- | ------------------------------ |
| 09:00 | Kick-off: Speed Gap Diagnostic |
| 09:15 | Concepts: The New Stack        |
| 09:55 | ☕ Break                       |
| 10:10 | The Zoo                        |
| 11:50 | Teams & Mission                |
| 12:00 | 🍽 Lunch                       |
| 13:00 | Build One Thing                |
| 14:30 | SKILL.md Swap                  |
| 15:00 | ☕ Break                       |
| 15:15 | Speed Gap Battle               |
| 16:15 | Wrap-up & Q&A                  |
| 17:00 | End                            |

## Demo app

We test **Foodora**, a food delivery web app: [foodora.lovable.app](https://foodora.lovable.app/). Every exhibit, the team build, and the battle use the same app.

## What to bring

- Laptop with admin rights (let me know if you can't have admin rights)
- Browser (preferably Chrome)
- Accounts for [GitHub](https://github.com) and [Wopee.io](https://wopee.io), using the same email for both
- [VS Code](https://code.visualstudio.com/) with an AI coding agent: TODO (GitHub Copilot free plan / Claude Code / other)
- Leave your comfort zone in the parking lot

## Get ready for the workshop

Please follow these steps before the workshop:

1. **Connect with me via LinkedIn:** [linkedin.com/in/marcelveselka](https://www.linkedin.com/in/marcelveselka) — share your expectations and questions, and I will adjust the workshop based on them.
2. **Submit this form:** [Google Form](TODO-form-url), so I can make sure everything is ready for you.
3. **Install the tools:** [Node.js LTS](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads), and the [GitHub CLI](https://cli.github.com/), then sign in with `gh auth login`.
4. **Set up VS Code and Playwright:** [playwright.dev/docs/getting-started-vscode](https://playwright.dev/docs/getting-started-vscode)
5. **Clone this repo:** in VS Code, `Ctrl/Cmd+Shift+P` → Git: Clone → paste this repository URL, then run `npm install` in the VS Code terminal.
6. **Set up Wopee.io:** TODO (project creation, API key, `.env` variables).
7. **Verify:** TODO (setup check command and expected output).
8. **Let me know you're ready** via LinkedIn chat, or ask any questions there.
