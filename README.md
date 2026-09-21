# Vibe Testing Lab

## AI Agents, MCP, and the New Stack for Web App Testing

A full-day, hands-on workshop at [Tesena Fest 2026](https://www.tesena.com/tesena-fest) (24 September 2026, Prague). An AI coding agent, Playwright Agents, Playwright CLI + Skills, and Wopee.io + MCP go head-to-head on the same demo app. You build the test suite, then you race to defend it.

- **Instructor:** [Marcel Veselka](https://www.linkedin.com/in/marcelveselka/) (Founder of [Wopee.io](https://wopee.io) and [Tesena](https://www.tesena.com))
- **Format:** Full-day hands-on workshop
- **Language:** English
- **More info:** [tesena.com/tesena-fest](https://www.tesena.com/tesena-fest)

## Target audience

Test automation engineers, QA leads, and QA managers.

## What you will do

- Drive the same browser three ways — an AI coding agent writing Playwright tests, Playwright Agents over MCP, and the Playwright CLI with skills — and see exactly what changes at each step
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

No death by slides. Every block has a page in [`day/`](day/) with its goal, steps, where your
files go, when you are done, and what to do if you are stuck. Lost the presenter, or running the
day at home? Follow those pages in order.

### Agenda

| Time  | Block                                                         | Page                                         |
| ----- | ------------------------------------------------------------- | -------------------------------------------- |
| 09:00 | Kick-off: Speed Gap Diagnostic                                | [`00-kickoff.md`](day/00-kickoff.md)         |
| 09:15 | Concepts: The New Stack                                       | [`01-concepts.md`](day/01-concepts.md)       |
| 09:55 | ☕ Break                                                      |                                              |
| 10:10 | The Zoo: 4 exhibits × (20 min hands-on + 5 min debrief)       | [`02-zoo.md`](day/02-zoo.md)                 |
| 11:50 | Teams & Mission                                               | [`03-teams.md`](day/03-teams.md)             |
| 12:00 | 🍽 Lunch                                                      |                                              |
| 13:00 | Build One Thing: a test suite and a `SKILL.md` that runs cold | [`04-build.md`](day/04-build.md)             |
| 14:30 | SKILL.md Swap: another team runs your skill cold              | [`05-swap.md`](day/05-swap.md)               |
| 15:00 | ☕ Break                                                      |                                              |
| 15:15 | Speed Gap Battle: 3 new features, 40 min, 3-min demos         | [`06-battle.md`](day/06-battle.md)           |
| 16:15 | Wrap-up & Q&A                                                 | [`07-wrap.md`](day/07-wrap.md)               |
| 17:00 | End                                                           |                                              |

### The Zoo

| #   | Exhibit             | What you do                                                                                     | Core concept                                        |
| --- | ------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 🤖  | **[AI Coding Agent](experiments/1_Zoo/1-CodingAgent/)** | Define intent, watch the agent write, run, and interpret tests. Find where it breaks            | Agent autonomy and where human judgment still wins  |
| 🐍  | **[Playwright Agents](experiments/1_Zoo/2-PlaywrightAgents/)** | Let the planner explore, the generator write and the healer repair — you review the artifacts   | Plan → test → repair, riding on MCP                 |
| 🦁  | **[Playwright CLI + Skills](experiments/1_Zoo/3-PlaywrightCLI/)** | Install one skill, then watch your agent drive the browser without being told the commands | Skills as reusable, reviewable agent knowledge      |
| 🔬  | **[Wopee.io + MCP](experiments/1_Zoo/4-Wopee/)**  | Paste the URL and watch it map the app — then call the same agent from your own coding agent    | Purpose-built testing agent vs. general-purpose tools |

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

Please follow these steps before the workshop. If one fails, look it up in
[setup troubleshooting](docs/setup-troubleshooting.md) — it is organised by step.

1. **Connect with me via LinkedIn:** [linkedin.com/in/marcelveselka](https://www.linkedin.com/in/marcelveselka) — share your expectations and questions, and I will adjust the workshop based on them.
2. **Submit this form:** [forms.gle/hU57AS3A5SPrqKWK8](https://forms.gle/hU57AS3A5SPrqKWK8), so I can make sure everything is ready for you.
3. **Install the tools:** [Node.js LTS](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads), and the [GitHub CLI](https://cli.github.com/), then sign in with `gh auth login`. **On Windows, do [these two fixes](docs/setup-troubleshooting.md#windows-do-these-first) first.**
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
| [`day/`](day/) | One page per block of the day — goal, steps, where files go, done when, if stuck |
| [`teams/`](teams/) | Team work after lunch. Copy [`_template/`](teams/_template/) to `teams/team-N/` in your team's fork |
| [`experiments/2_API/`](experiments/2_API/) | **Optional** — API testing with an agent, at home or if there is time. A [fixture](experiments/2_API/fixtures.ts) that finds the API for you, and [reference tests](experiments/2_API/solutions/restaurants.spec.ts) |
| [`scripts/verify-setup.mjs`](scripts/verify-setup.mjs) | What `npm run verify` runs |
| [`scripts/check-links.mjs`](scripts/check-links.mjs) | What `npm run links` runs — keeps the cross-references in these docs honest |
| [`AGENTS.md`](AGENTS.md) | Rules your AI agent follows in this repository |
| [`slides/`](slides/) | The deck (Slidev) — `npm run slides` opens it in your browser |

Exhibits 1 and 2 have a `solutions/` folder — [1](experiments/1_Zoo/1-CodingAgent/solutions/),
[2](experiments/1_Zoo/2-PlaywrightAgents/solutions/) — and Exhibit 3 has a
[worked skill](experiments/1_Zoo/3-PlaywrightCLI/skills/foodora-order/SKILL.md). Exhibit 4 runs in
the cloud; its shortcut is a shared project with a finished run. Open them if you fall behind, and
run the tests with `npm run solutions`. They are what a good run produces, not a thing to copy blindly.

The verified notes behind those solutions are in
[`SPOILERS-app-notes.md`](experiments/1_Zoo/SPOILERS-app-notes.md) — that is the answer key, so
read it after the exhibits, not before.

## When something breaks

| What you see | What it means |
| --- | --- |
| `npm run verify` red on *Playwright version* | You are on an older Playwright. The CLI, the agents and the skills all need **1.62+**. `npm install` at the repository root. |
| `init-agents` prints `Using project ""` | It did not find a config. Run it from the repository root with `--config` pointing at the exhibit's `playwright.config.ts` — see [Exhibit 2](experiments/1_Zoo/2-PlaywrightAgents/README.md#setup). |
| `Executable doesn't exist at …ms-playwright/` | Run `npm run browsers`. |
| Copilot Chat has no model | The gateway key is not set. `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication**. |
| MCP tools do not appear in chat | Reload the VS Code window after writing `.vscode/mcp.json`, and make sure the chat is in **agent** mode. |
| A test passes locally and fails on the venue wifi | The demo app is live and remote. The configs retry once; if it persists, tell me. |

Setup problems before the day are in [setup troubleshooting](docs/setup-troubleshooting.md).

Still stuck? Ask your neighbour, then raise your hand. Do not spend 10 of your 20 minutes on setup.
