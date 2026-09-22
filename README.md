# Vibe Testing Lab

## AI Agents, MCP, and the New Stack for Web App Testing

The attendee repository for a full-day, hands-on workshop at
[Tesena Fest 2026](https://www.tesena.com/tesena-fest) (24 September 2026, Prague), led by
[Marcel Veselka](https://www.linkedin.com/in/marcelveselka/) ([Wopee.io](https://wopee.io),
[Tesena](https://www.tesena.com)).

Four AI testing tools go head-to-head on the same demo app, then teams build their own
AI-assisted test suite and defend it. Everything you need for the day — and to rerun it at home —
is in this repository: set up below, then follow [the day](day/).

## Get ready for the workshop

Please do this **before Thursday**. It takes **about 45–60 minutes** on a fresh laptop, and
**20–30 minutes** if you already have Node.js, Git and VS Code. Most of it is waiting for downloads.

Why before: we have one day and four tools to try, and the first exercise starts at 10:10. Every
laptop that arrives ready means more time for the interesting part — and less time for me
looking at installers. If something does not work, no problem: write to me, and we fix it before
the workshop, not during it.

**You need:** a laptop with admin rights (tell me if you can't have them), Chrome, and
[GitHub](https://github.com) and [Wopee.io](https://wopee.io) accounts with the same email.
If a step fails, look it up in [setup troubleshooting](docs/setup-troubleshooting.md) — it is
organised by step.

1. **Connect with me on LinkedIn:** [linkedin.com/in/marcelveselka](https://www.linkedin.com/in/marcelveselka) — share your expectations and questions.
2. **Submit this form:** [forms.gle/hU57AS3A5SPrqKWK8](https://forms.gle/hU57AS3A5SPrqKWK8).
3. **Install the tools:** [Node.js LTS](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads) and the [GitHub CLI](https://cli.github.com/), then sign in with `gh auth login`. **On Windows:** one `winget` line installs all three — see [Windows: do these first](docs/setup-troubleshooting.md#windows-do-these-first).
4. **Install [VS Code](https://code.visualstudio.com/)** and sign in to GitHub Copilot Chat (the free plan is enough).
5. **Clone this repo:** in VS Code, `Ctrl/Cmd+Shift+P` → **Git: Clone** → paste this repository's URL, and open it. When VS Code asks whether you trust the authors, click **Yes, I trust the authors** — otherwise it opens in Restricted Mode and ignores the repository's settings, MCP servers and extensions. Then run `npm install` in the VS Code terminal.
6. **Install the two recommended extensions:** open the Extensions view (`Ctrl/Cmd+Shift+X`), type `@recommended`, and under **Workspace Recommendations** click **Install** on **Vercel AI Gateway** and **Playwright Test for VSCode**. GitHub Copilot Chat is built into current VS Code, so it only shows up here on an older version — then install it too.
   The list is empty? Then you have both already — check under `@installed`. See [troubleshooting](docs/setup-troubleshooting.md#steps-6-and-7--extensions-and-ai-models) if they are missing there too.
7. **AI models — nothing to do yet.** The Vercel AI Gateway key is handed out at the workshop, at 09:00.
8. **Set up Wopee.io:** sign in at [wopee.io](https://wopee.io) and create the **SauceDemo demo project** — from the home page, or in [cmd.wopee.io](https://cmd.wopee.io) via **NEW PROJECT** → **App URL** → **Demo app**.
9. **Download the browser:** `npm run browsers` — about 150 MB, so please **not on conference wifi**.
10. **Verify:** `npm run verify`. All seven lines must be green; a red one tells you what to fix.
11. **Let me know you're ready** on LinkedIn, or ask anything there. See you on Thursday — it will be a good day.

## Find your way

| Page | What is in it |
| --- | --- |
| [`docs/workshop.md`](docs/workshop.md) | About the workshop: who it is for, what you do, the four tools, the demo app |
| [`day/`](day/) | The agenda, and one page per block — what to do if you lose the presenter |
| [`spec/`](spec/) | What the demo app should do — the input for every test you write |
| [`docs/setup-troubleshooting.md`](docs/setup-troubleshooting.md) | Fixes, before and during the workshop |
| [`docs/repository.md`](docs/repository.md) | What is where in this repository, and the `npm run` commands |
| [`docs/research/`](docs/research/) | The data behind the concepts: MCP, CLIs, Playwright, and our own measurement |
| [`AGENTS.md`](AGENTS.md) | Rules your AI agent follows in this repository |
| [`slides/`](slides/) | The deck — `npm run slides` |
