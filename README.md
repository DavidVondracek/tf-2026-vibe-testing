# Vibe Testing Lab

## AI Agents, MCP, and the New Stack for Web App Testing

A full-day, hands-on workshop at [Tesena Fest 2026](https://www.tesena.com/tesena-fest) (24 September 2026, Prague). AI coding agents, Playwright MCP, Playwright CLI, and Wopee.io go head-to-head on the same demo app. You build the test suite, then you race to defend it.

- **Instructor:** [Marcel Veselka](https://www.linkedin.com/in/marcelveselka/) (Founder of [Wopee.io](https://wopee.io) and [Tesena](https://www.tesena.com))
- **Format:** Full-day hands-on workshop
- **Language:** English
- **More info:** [tesena.com/tesena-fest](https://www.tesena.com/tesena-fest)

## Target audience

Test automation engineers, QA leads, and QA managers.

## What you will do

- Run Playwright the traditional way, then via CLI, then via MCP, and see exactly what changes at each step
- Try Wopee.io as a purpose-built AI testing agent on the same app and the same task — from its own UI, and as an MCP tool your coding agent calls
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
4. **Speed Gap Battle:** 3 new features just shipped on the demo app. Your suite is your only weapon. 40 minutes, then 3 minutes to show it. Speed, accuracy, and reusability count, and the room votes.

### The Zoo

| #   | Exhibit             | What you do                                                                                     | Core concept                                        |
| --- | ------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 🤖  | **[AI Coding Agent](experiments/1_Zoo/1-CodingAgent/)** | Define intent, watch the agent write, run, and interpret tests. Find where it breaks            | Agent autonomy and where human judgment still wins  |
| 🐍  | **[Playwright Agents](experiments/1_Zoo/2-PlaywrightAgents/)** | Let the planner explore, the generator write and the healer repair — you review the artifacts   | Plan → test → repair, riding on MCP                 |
| 🦁  | **[Playwright CLI + Skills](experiments/1_Zoo/3-PlaywrightCLI/)** | Install one skill, then watch your agent drive the browser without being told the commands | Skills as reusable, reviewable agent knowledge      |
| 🔬  | **[Wopee.io + MCP](experiments/1_Zoo/4-Wopee/)**  | Paste the URL and watch it map the app — then call the same agent from your own coding agent    | Purpose-built testing agent vs. general-purpose tools |

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

What it is supposed to do is in [`spec/`](spec/): eight user stories with the rules your tests check. Take expected results from there, not from what the app happens to do.

## What to bring

- Laptop with admin rights (let me know if you can't have admin rights)
- Browser (preferably Chrome)
- Accounts for [GitHub](https://github.com) and [Wopee.io](https://wopee.io), using the same email for both
- [VS Code](https://code.visualstudio.com/) with [GitHub Copilot Chat](https://code.visualstudio.com/docs/copilot/overview) (the free plan is enough). The AI models come through the Vercel AI Gateway, with a key I give you.
- Leave your comfort zone in the parking lot

## Get ready for the workshop

Please follow these steps before the workshop:

1. **Connect with me via LinkedIn:** [linkedin.com/in/marcelveselka](https://www.linkedin.com/in/marcelveselka) — share your expectations and questions, and I will adjust the workshop based on them.
2. **Submit this form:** [forms.gle/hU57AS3A5SPrqKWK8](https://forms.gle/hU57AS3A5SPrqKWK8), so I can make sure everything is ready for you.
3. **Install the tools:** [Node.js LTS](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads), and the [GitHub CLI](https://cli.github.com/), then sign in with `gh auth login`.
4. **Set up VS Code and Playwright:** [playwright.dev/docs/getting-started-vscode](https://playwright.dev/docs/getting-started-vscode). We need **Playwright 1.62 or newer** — the browser CLI, the test agents and the skills all ship inside the `playwright` package now, so there is nothing else to install.
5. **Clone this repo:** in VS Code, `Ctrl/Cmd+Shift+P` → Git: Clone → paste this repository URL, then run `npm install` in the VS Code terminal. One install at the root covers every exhibit.
6. **Install the recommended extensions:** when VS Code asks, click **Install** (or `Ctrl/Cmd+Shift+P` → Extensions: Show Recommended Extensions). You get [Vercel AI Gateway](https://marketplace.visualstudio.com/items?itemName=SferaDev.vscode-extension-vercel-ai), GitHub Copilot Chat, and Playwright Test.
7. **Connect the AI models:** `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication** → paste the Vercel AI Gateway API key (starts with `vck_`) I send you. Open the Chat view (`Ctrl/Cmd+Alt+I`) and start a new chat: the model picker shows **DeepSeek V4.1 Flash**, set as the default by this repo. Send "hi" to check it answers.
8. **Set up Wopee.io:** create an account at [wopee.io](https://wopee.io), using the same email as
   for GitHub. Then create the **SauceDemo demo project**, either straight from the Wopee.io home
   page, or in [cmd.wopee.io](https://cmd.wopee.io) via **NEW PROJECT** → select the demo project.
   That proves your account works; we create the Foodora project together at
   [Exhibit 4](experiments/1_Zoo/4-Wopee/).
9. **Download the browser:** `npm run browsers`. Please do this **at the office, not on conference wifi** — it is about 150 MB.
10. **Verify:** in the repo folder, run

    ```bash
    npm run verify
    ```

    Seven checks: Node, dependencies, Playwright version, the browser CLI, the test-runner MCP server, Chromium on disk, and the demo app responding. Every line must be green. If one is red it tells you what to fix.
11. **Let me know you're ready** via LinkedIn chat, or ask any questions there.

## Repository layout

| Where | What is in it |
| --- | --- |
| [`spec/`](spec/) | [The product spec](spec/foodora-spec.md) — what Foodora should do, with a screenshot of every page. The input for every experiment |
| [`experiments/1_Zoo/1-CodingAgent/`](experiments/1_Zoo/1-CodingAgent/) | Exhibit 1 — a config and an empty [`tests/`](experiments/1_Zoo/1-CodingAgent/tests/) for the agent to fill |
| [`experiments/1_Zoo/2-PlaywrightAgents/`](experiments/1_Zoo/2-PlaywrightAgents/) | Exhibit 2 — a config, a green [seed test](experiments/1_Zoo/2-PlaywrightAgents/tests/seed.spec.ts), and [`specs/`](experiments/1_Zoo/2-PlaywrightAgents/specs/) for the planner |
| [`experiments/1_Zoo/3-PlaywrightCLI/`](experiments/1_Zoo/3-PlaywrightCLI/) | Exhibit 3 — a [hand-written skill](experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md) to copy and break |
| [`experiments/1_Zoo/4-Wopee/`](experiments/1_Zoo/4-Wopee/) | Exhibit 4 — [MCP config](experiments/1_Zoo/4-Wopee/mcp.json.example) for VS Code, and the [env-var route](experiments/1_Zoo/4-Wopee/.env.example) |
| [`experiments/2_API/`](experiments/2_API/) | **Optional** — API testing with an agent, at home or if there is time. A [fixture](experiments/2_API/fixtures.ts) that finds the API for you, and [reference tests](experiments/2_API/solutions/restaurants.spec.ts) |
| [`scripts/verify-setup.mjs`](scripts/verify-setup.mjs) | What `npm run verify` runs |
| [`scripts/check-links.mjs`](scripts/check-links.mjs) | What `npm run links` runs — keeps the cross-references in these docs honest |
| [`AGENTS.md`](AGENTS.md) | Rules your AI agent follows in this repository |
| [`slides/`](slides/) | The deck (Slidev) — `npm run slides` opens it in your browser |

Each exhibit has a `solutions/` folder — [1](experiments/1_Zoo/1-CodingAgent/solutions/),
[2](experiments/1_Zoo/2-PlaywrightAgents/solutions/). Open it if you fall behind, and run them
all with `npm run solutions`. It is what a good run produces, not a thing to copy blindly.

The verified notes behind those solutions are in
[`SPOILERS-app-notes.md`](experiments/1_Zoo/SPOILERS-app-notes.md) — that is the answer key, so
read it after the exhibits, not before.

## When something breaks

| What you see | What it means |
| --- | --- |
| `npm run verify` red on *Playwright version* | You are on an older Playwright. The CLI, the agents and the skills all need **1.62+**. `npm install` at the repository root. |
| `init-agents` prints `Using project ""` | It did not find a config. `cd` into the exhibit folder and run it there. |
| `Executable doesn't exist at …ms-playwright/` | Run `npm run browsers`. |
| Copilot Chat has no model | The gateway key is not set. `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication**. |
| MCP tools do not appear in chat | Reload the VS Code window after writing `.vscode/mcp.json`, and make sure the chat is in **agent** mode. |
| A test passes locally and fails on the venue wifi | The demo app is live and remote. The configs retry once; if it persists, tell me. |

Still stuck? Ask your neighbour, then raise your hand. Do not spend 10 of your 20 minutes on setup.
