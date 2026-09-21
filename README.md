# Vibe Testing Lab

## AI Agents, MCP, and the New Stack for Web App Testing

The attendee repository for a full-day, hands-on workshop at
[Tesena Fest 2026](https://www.tesena.com/tesena-fest) (24 September 2026, Prague), led by
[Marcel Veselka](https://www.linkedin.com/in/marcelveselka/) ([Wopee.io](https://wopee.io),
[Tesena](https://www.tesena.com)).

Four AI testing tools go head-to-head on the same demo app, then teams build their own
AI-assisted test suite and defend it. Everything you need for the day — and to rerun it at home —
is in this repository.

- **About the workshop** — who it is for, what you do, the four tools: [`docs/workshop.md`](docs/workshop.md)
- **The day, block by block** — agenda and one page per block: [`day/`](day/)
- **The demo app and what it should do:** [`spec/`](spec/)

## Get ready for the workshop

**You need:** a laptop with admin rights (tell me if you can't have them), Chrome, and
[GitHub](https://github.com) and [Wopee.io](https://wopee.io) accounts with the same email.
If a step fails, look it up in [setup troubleshooting](docs/setup-troubleshooting.md) — it is
organised by step.

1. **Connect with me on LinkedIn:** [linkedin.com/in/marcelveselka](https://www.linkedin.com/in/marcelveselka) — share your expectations and questions.
2. **Submit this form:** [forms.gle/hU57AS3A5SPrqKWK8](https://forms.gle/hU57AS3A5SPrqKWK8).
3. **Install the tools:** [Node.js LTS](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads) and the [GitHub CLI](https://cli.github.com/), then sign in with `gh auth login`. **On Windows, do [these two fixes](docs/setup-troubleshooting.md#windows-do-these-first) first.**
4. **Install [VS Code](https://code.visualstudio.com/)** and sign in to GitHub Copilot Chat (the free plan is enough).
5. **Clone this repo:** in VS Code, `Ctrl/Cmd+Shift+P` → **Git: Clone** → paste this repository's URL, then run `npm install` in the VS Code terminal.
6. **Install the recommended extensions** when VS Code asks (or `Ctrl/Cmd+Shift+P` → **Extensions: Show Recommended Extensions**): Vercel AI Gateway, GitHub Copilot Chat and Playwright Test.
7. **AI models — nothing to do yet.** The Vercel AI Gateway key is handed out at the workshop, at 09:00.
8. **Set up Wopee.io:** sign in at [wopee.io](https://wopee.io) and create the **SauceDemo demo project** — from the home page, or in [cmd.wopee.io](https://cmd.wopee.io) via **NEW PROJECT** → the demo project.
9. **Download the browser:** `npm run browsers` — about 150 MB, so please **not on conference wifi**.
10. **Verify:** `npm run verify`. All seven lines must be green; a red one tells you what to fix.
11. **Let me know you're ready** on LinkedIn, or ask anything there.

## More

| | |
| --- | --- |
| [`docs/repository.md`](docs/repository.md) | What is where in this repository, and the `npm run` commands |
| [`docs/setup-troubleshooting.md`](docs/setup-troubleshooting.md) | Fixes, before and during the workshop |
| [`docs/research/`](docs/research/) | The data behind the concepts: MCP, CLIs, Playwright, and our own measurement |
| [`AGENTS.md`](AGENTS.md) | Rules your AI agent follows in this repository |
| [`slides/`](slides/) | The deck — `npm run slides` |
