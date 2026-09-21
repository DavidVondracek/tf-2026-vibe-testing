---
theme: default
title: 'Vibe Testing Lab: AI Agents, MCP, and the New Stack for Web App Testing'
info: |
  Tesena Fest 2026 · 24 September 2026 · Prague
  Marcel Veselka, Wopee.io
author: Marcel Veselka
layout: cover
aspectRatio: 16/9
canvasWidth: 980
colorSchema: light
fonts:
  provider: none
transition: fade
drawings:
  persist: false
exportFilename: vibe-testing-lab-tf-2026
favicon: /favicon.svg
---

# Vibe Testing Lab

## AI Agents, MCP, and the New Stack for Web App Testing

24\. 9. 2026 @ Tesena Fest, Prague

Marcel Veselka · Wopee.io

<Wifi compact class="mt-6 max-w-max" />

<!--
08:50 — on screen while people arrive, with the wifi on it. Read it out once at 09:00 anyway:
somebody always joins late, and somebody always mistypes the password.
-->

---
block: kickoff
label: Welcome
---

# Your zookeeper today

<div class="flex items-center justify-center gap-10 mt-4">
  <img src="/img/marcel.jpg" class="w-44 h-44 rounded-full object-cover border-6 border-[#ffcc00]" />
  <div>
    <h3 class="text-4xl">Marcel Veselka</h3>
    <p class="muted text-2xl mt-2">Founder of Wopee.io and Tesena</p>
  </div>
  <img src="/img/wopee-monkey.svg" class="h-52 -rotate-6" />
</div>

<div class="flex items-center justify-center gap-14 mt-8">
  <img src="/img/wopee-logo.svg" class="h-16" />
  <img src="/img/tesena.jpg" class="h-16" />
</div>

<!--
09:00 — 1 minute. Who I am, why I built Wopee.io, and the promise: every tool gets a fair test, including mine.
-->

---
block: kickoff
label: Welcome
---

# Meet your neighbour

Pairs. 2 minutes each. Then 3 volunteers share with the room.

<div class="cards c4">
<div class="card"><div class="num">1</div><h3>Your name</h3><p>and where you work</p></div>
<div class="card"><div class="num">2</div><h3>Your role</h3><p>engineer, lead, manager</p></div>
<div class="card"><div class="num">3</div><h3>Your stack</h3><p>Playwright, Cypress, something else</p></div>
<div class="card"><div class="num">4</div><h3>Your AI use</h3><p>none, curious, daily driver</p></div>
</div>

<p class="text-2xl font-bold mt-8 text-center">What do you want to <span class="y">take home</span> today?</p>

<!--
09:02 — 5 minutes max. Pairs, not a round of 30 intros.
-->

---
block: kickoff
label: Welcome
---

# Everything lives in <span class="y">one repo</span>

<div class="flex items-center justify-center gap-14">
  <Qr url="https://github.com/Wopee-io/tf-2026-vibe-testing-web-apps" size="11rem" caption="Scan to open" />
  <div>
    <a class="repo-link" href="https://github.com/Wopee-io/tf-2026-vibe-testing-web-apps"><span>github.com/Wopee-io/</span><span>tf-2026-vibe-testing-web-apps</span></a>
    <p class="text-2xl">Clone it, run <code>npm install</code>, check the README.</p>
  </div>
</div>

<Wifi class="mt-7" />

<p class="text-center muted mt-3">Then <code>npm run verify</code>. Seven checks, and it tells you what to fix.</p>

<!--
09:05 — the wifi is on this slide, on the cover and on every break slide. Say it out loud here too.
Anyone without a working setup: pair them with a neighbour now, fix it during the concepts block.
`npm run verify` checks Node, deps, the Playwright version, the browser CLI, the test MCP server,
Chromium on disk, and that the demo app answers. Green all the way down or they are not ready.
-->

---
block: kickoff
label: Welcome
---

# How to get <span class="y">unstuck</span>

One zookeeper, up to 30 visitors. This is the queue.

<div class="cards c4">
<div class="card"><div class="num">1</div><h3>Ask your neighbour</h3><p>Or your team, after lunch.</p></div>
<div class="card"><div class="num">2</div><h3>Check the README</h3><p>Setup troubleshooting covers the usual suspects.</p></div>
<div class="card"><div class="num">3</div><h3>Raise your hand</h3><p>Or flip your laptop lid halfway. I work through the queue.</p></div>
<div class="card dark"><div class="num">4</div><h3>Take the shortcut</h3><p>Every exhibit has a solutions/ folder. Use it and keep going.</p></div>
</div>

<!--
09:06 — 1 minute. Repeat the rule before each hands-on block.
-->

---
block: kickoff
label: Welcome
---

# Agenda

<table class="agenda">
<tbody>
<tr><td>09:00</td><td>Kick-off: Speed Gap Diagnostic</td></tr>
<tr><td>09:15</td><td>Concepts: The New Stack</td></tr>
<tr class="pause"><td>09:55</td><td>Break</td></tr>
<tr><td>10:10</td><td>The Zoo: 4 exhibits, 1 demo app</td></tr>
<tr><td>11:50</td><td>Teams & Mission</td></tr>
<tr class="pause"><td>12:00</td><td>Lunch</td></tr>
<tr><td>13:00</td><td>Build One Thing</td></tr>
<tr><td>14:30</td><td>SKILL.md Swap</td></tr>
<tr class="pause"><td>15:00</td><td>Break</td></tr>
<tr><td>15:15</td><td>Speed Gap Battle</td></tr>
<tr><td>16:15</td><td>Wrap-up & Q&A</td></tr>
</tbody>
</table>

---
block: kickoff
label: Welcome
---

# No death by slides. The day has <span class="y">4 gears</span>.

<div class="cards c4">
<div class="card"><div class="num">1</div><h3>The Zoo</h3><p>4 exhibits, 1 demo app. Every tool gets the same fair test. Including the one we built.</p></div>
<div class="card"><div class="num">2</div><h3>Teams & Mission</h3><p>Before lunch you get a team and a mission card.</p></div>
<div class="card"><div class="num">3</div><h3>Build One Thing</h3><p>90 min. A real AI-assisted test suite and a SKILL.md your agent runs cold. Then another team tests it.</p></div>
<div class="card dark"><div class="num">4</div><h3>Speed Gap Battle</h3><p>3 new features just shipped. Your suite is your only weapon.</p></div>
</div>

<div class="banner">Same app. Different tools. Head-to-head. <em>You pick the winner.</em></div>

<!--
09:08 — the promise of the day. Say the fairness line out loud.
-->

---
layout: section
block: kickoff
emoji: ⏱️
image: /img/photos/diagnostic.jpg
---

# Speed Gap Diagnostic

Kick-off · 15 min

---
block: kickoff
---

# How fast is <span class="y">your</span> team?

Write both numbers on a sticky note. Put it on the board. No judgment.

<div class="gap-eq">
  <div class="card yellow"><div class="n">DEV</div><h3>Time to ship a feature</h3><p>From ticket to merged code.</p></div>
  <div class="gap-eq-mid">GAP</div>
  <div class="card"><div class="n">QA</div><h3>Time to verify it</h3><p>From merged code to "we trust it in production".</p></div>
</div>

<p v-click class="text-2xl font-bold mt-8 text-center">Today is about <span class="y">closing the gap</span> between these two numbers.</p>

<!--
09:10 — sticky notes: yellow for DEV, white for QA. Photograph the board; we come back to it at 16:15.
-->

---
layout: section
block: stack
emoji: 🧭
image: /img/photos/new-stack.jpg
---

# The New Stack

The minimum theory to survive the Zoo

---
block: stack
---

# First, <span class="y">the name on the door</span>

<p class="muted -mt-2">May 2025. Ministry of Testing asks its own community to define the term. Four days, four answers:</p>

<div class="cards c4">
<div class="card"><div class="n">16 MAY · DEMI VAN MALCOT</div><p>"Tell the AI what you want to test… and let them figure out the rest."</p></div>
<div class="card"><div class="n">20 MAY · ANDRE LEROUX</div><p>Ask the model what coverage exists and what is missing — "but you need to verify".</p></div>
<div class="card"><div class="n">25 MAY · YOGENDRA PORWAL</div><p>"Less rigid, more dynamic, aligned with the creative flow AI brings."</p></div>
<div class="card"><div class="n">VENDORS, EVER SINCE</div><p>Testing how the app <em>feels</em> to real users. No method. No oracle.</p></div>
</div>

<div class="banner" style="margin-top: 1rem; font-size: 1.2rem">"An unprofessional, ineffective and pointless software-related activity <em>masquerading as testing</em>." <span style="opacity:.7; font-weight:400">— Steve Green, same thread, 17 May 2025</span></div>

<p v-click class="text-3xl font-bold text-center mt-4">He is right about the word. <span class="hl">Stay for the practice underneath.</span></p>

<!--
09:15 — Open the day's thinking here. Say it before anyone else can: the title on your badge is indefensible as a term.
Four incompatible definitions and one flat rejection inside 96 hours — from the practitioner community itself, not from vendors.
The term has no coiner and no literature. Every other label in this space was minted by a vendor or an analyst.
Simon Willison on his own coinage: "Is this a stupid name? Yeah, probably." Kent Beck: vibe coding "just sounds like you're relaxing in a hot tub."
Then turn the room with the next slide — the man who coined the parent term agrees with the critics.
Attacking your own title is the cheapest credibility you will buy all day, and it disarms the hostile question before it is asked.
-->

---
block: stack
---

# The man who named it <span class="y">already retired the word</span>

<div class="grid grid-cols-2 gap-10">
<div class="flex flex-col justify-center">
  <p class="text-2xl muted my-1">2 Feb 2025 — Karpathy coins <b>vibe coding</b>:</p>
  <p class="text-3xl font-bold my-2">"forget that the code even exists"</p>
  <p v-click class="text-2xl muted mt-6 my-1">8 Feb 2026 — one year later, he replaces it:</p>
  <p v-click class="text-3xl font-bold my-2"><span class="hl">agentic engineering</span></p>
</div>
<div v-click class="flex flex-col justify-center">
  <p class="text-xl">"at the top tiers, deep technical expertise may be <b>even more</b> of a multiplier than before because of the added leverage."</p>
  <p class="muted mt-3">— Karpathy, Feb 2026</p>
</div>
</div>

<!--
09:17 — Open here. Do NOT defend the word; concede it in the first five minutes and the room is yours.
Kent Beck, on why he calls it augmented coding instead: "vibe coding just sounds like you're relaxing in a hot tub."
Steve Green, Ministry of Testing, May 2025: "an unprofessional, ineffective and pointless activity masquerading as testing."
Rosie Sherry asked MoT to define "vibe testing" — four incompatible answers and one flat rejection in 96 hours. The term arrived definition-free.
-->

---
block: stack
---

# They all renamed it. <span class="y">They all landed on your job.</span>

<div class="cards c3">
<div class="card"><div class="n">KENT BECK · JUN 2025</div><h3>Augmented coding</h3><p>"You care deeply about the code, its complexity, <b>the tests, &amp; their coverage</b>."</p></div>
<div class="card"><div class="n">SIMON WILLISON · OCT 2025</div><h3>Vibe engineering</h3><p>Professionals accelerate with LLMs "while staying <b>proudly and confidently accountable</b>".</p></div>
<div class="card"><div class="n">KARPATHY · FEB 2026</div><h3>Agentic engineering</h3><p>You orchestrate agents and <b>act as oversight</b>. Expertise matters more, not less.</p></div>
</div>

<div v-click class="banner">Willison lists <em>11 practices</em> that make it work. <span class="y">Seven of them are testing.</span></div>

<p v-click class="text-2xl font-bold text-center mt-4">Nobody coordinated this. They independently reinvented <span class="hl">the testing profession</span>.</p>

<!--
09:19 — This is the slide that turns a sceptical QA room around. The successors to vibe coding are structurally a QA discipline.
Willison's 11: automated testing and test-first · advance planning · documentation · version control · CI/CD and linting · code review · manual QA and edge cases · research skills · preview environments · intuition for what AI can handle · estimation.
Veracode, Mar 2026: two years of model progress moved code security 55% → 55%. The model is provably not the variable. The discipline is.
-->

---
block: stack
---

# The whole lifecycle moved. <span class="y">Test is stage 4.</span>

<div class="cards c3">
<div class="card"><div class="n">1 · PLAN</div><h3>intent.md</h3><p>The problem and the constraints, in the repo.</p></div>
<div class="card"><div class="n">2 · DESIGN</div><h3>spec.md</h3><p>Requirements and design collapse into one session.</p></div>
<div class="card"><div class="n">3 · BUILD</div><h3>plan.md → code</h3><p>Plan mode first. Several streams at once.</p></div>
<div class="card yellow"><div class="n">4 · TEST</div><h3>The agent checks itself</h3><p>Tests, builds, screenshots — before a human looks.</p></div>
<div class="card"><div class="n">5 · DEPLOY</div><h3>Review + gates</h3><p>Findings ranked by severity. Hooks ask for approval.</p></div>
<div class="card"><div class="n">6 · MAINTAIN</div><h3>Back to intent.md</h3><p>Production anomaly opens the loop again.</p></div>
</div>

<div class="banner">"Code is no longer the bottleneck. <em>The human-speed steps around it are.</em>"</div>

<p v-click class="text-xl text-center mt-3">Stage 4 proves the fix with a test <span class="hl">the agent wrote</span>. Hold that thought.</p>

<!--
09:21 — this is the slide that makes the Speed Gap someone else's argument, not just mine.
Source out loud: Anthropic's AI-native SDLC playbook, 21 August 2026. Six stages, and each one
commits an artifact the next one reads.
The chain of commits is the audit trail: who asked for what, what the agent produced, who approved it.
Ask the room: which of these six does your team already do in the open, in git?
-->

---
block: stack
---

# The new stack in <span class="y">4 pieces</span>

<div class="cards c4">
<div class="card"><div class="n">CODING AGENT</div><h3>Claude Code, Copilot, Cursor</h3><p>Writes, runs and fixes test code in your repo.</p></div>
<div class="card"><div class="n">PROTOCOL</div><h3>MCP</h3><p>A standard way to make any tool readable and callable by an LLM.</p></div>
<div class="card"><div class="n">BROWSER CLI</div><h3>Playwright CLI</h3><p>The agent drives the browser with shell commands. Snapshots saved to disk.</p></div>
<div class="card"><div class="n">TESTING AGENT</div><h3>Wopee.io</h3><p>Maps the app, then generates and runs regression tests. Usable from the cloud — or as an MCP tool your agent calls.</p></div>
</div>

<div class="todo">Draw the one diagram: agent in the middle, MCP and CLI as the two ways to the browser, SKILL.md as the knowledge layer.</div>

<!--
09:26 — one sentence per piece. The Zoo will make each one concrete.
-->

---
block: stack
---

# CLI or MCP? <span class="y">Ask what the agent is doing.</span>

Same Playwright engine. Two interfaces — and the honest difference is architecture, not a multiplier.

<div class="vs">
  <div class="card"><div class="n">npx playwright cli</div><h3>CLI</h3><div class="metric">a path<small>the tree goes to disk</small></div><p>Every command answers with <code>.playwright-cli/page-*.yml</code>. The agent reads it only if it needs to.</p><p><b>Best for:</b> pre-planned runs, agents with a shell.</p></div>
  <div class="vs-disc">VS</div>
  <div class="card"><div class="n">npx playwright mcp</div><h3>MCP</h3><div class="metric">the tree<small>in context, by default</small></div><p>Persistent state and rich introspection. Since v0.0.52 it writes snapshots to disk too — a default, not a limit.</p><p><b>Best for:</b> exploring, self-healing, long autonomous runs.</p></div>
</div>

<div class="banner">Microsoft names the mechanism. <em>It publishes no numbers.</em></div>

<!--
09:29 — DO NOT say "4× fewer tokens". That figure (27K vs 114K) traces to a Medium post via a personal blog; it is not a Playwright benchmark.
The one measured head-to-head with a stated method — Checkly, Stefan Judis, 30 Jul 2026, three runs each — found 45–48K (CLI) vs 48–50K (MCP). Near parity, because harnesses now defer tool loading.
Both ship inside `playwright` since 1.62 — no separate package to install. The standalone @playwright/mcp still exists and still outships the CLI on npm; MCP is not dying, they do different jobs.
If someone pushes: offer to measure it live at the CLI exhibit. That beats any cited number.
-->

---
block: stack
---

# SKILL.md: knowledge an agent can <span class="y">run cold</span>

Reusable instructions and scripts. Teach an agent one workflow, and it runs it without your help.

<div class="skill-grid">

```text
my-skill/
├── SKILL.md
├── scripts/
├── references/
└── assets/
```

```md
---
name: login-flow
description: Log in to the demo
  app and verify the dashboard.
  Use before any authenticated test.
---

# Login flow
1. Open the base URL from `.env`
2. ...
```

</div>

<!--
09:33 — define "run cold" here: a fresh agent session, given only the SKILL.md, does the job without follow-up prompts.
-->

---
layout: demo
block: stack
image: /img/photos/demo-mic.jpg
lines:
  - SKILL.md
  - run cold, live
---

<!--
09:38 — 10 minutes. Fresh agent session, only the SKILL.md, no follow-up prompts. This is the bar for the afternoon.
-->

---
block: stack
---

# API testing with AI agents: <span class="y">an honest map</span>

Same agent concepts, one layer below the UI.

<div class="cards c3 tall">
<div class="card"><div class="n">WORKS TODAY</div><h3>…</h3><p>…</p></div>
<div class="card"><div class="n">WITH CARE</div><h3>…</h3><p>…</p></div>
<div class="card dark"><div class="n">NOT YET</div><h3>…</h3><p>…</p></div>
</div>

<div class="todo">2-minute map of where AI-assisted API testing fits today. Needs the demo app's API endpoint.</div>

<!--
09:50 — if running late, skip this slide and cover it in the Zoo debrief.
-->

---
layout: pause
block: break1
what: Coffee break
emoji: ☕
until: '10:10'
image: /img/photos/break.jpg
---

Setup not working yet? Grab me now, before the Zoo opens.

---
layout: section
block: zoo
emoji: 🎟️
image: /img/photos/zoo.jpg
---

# The Zoo

4 exhibits · 1 demo app · 20 min hands-on + 5 min debrief each

---
block: zoo
---

# Welcome to the Zoo

Everyone on the same exhibit at the same time. Nobody left behind.

<div class="zoo">

| | Exhibit | What you do | Core concept |
|---|---|---|---|
| 🤖 | **AI Coding Agent** | Define intent, watch the agent write, run and interpret tests. Find where it breaks | Agent autonomy, and where human judgment still wins |
| 🐍 | **Playwright MCP** | Connect Playwright to an LLM, generate and run tests in natural language | MCP makes tools agent-readable |
| 🦁 | **Playwright CLI** | Drive browser tests from the command line, pipe the output to an AI agent | CLI as the bridge between agent and browser |
| <img src="/img/wopee-monkey.svg" class="h-9 mx-auto" /> | **Wopee.io** | Paste the URL, watch it map the app, generate and run visual + functional regression | Purpose-built testing agent vs. general-purpose tools |

</div>

<div class="banner">Same rules for all 4, <em>Wopee.io included</em>.</div>

---
block: zoo
---

# One enclosure for every exhibit: <span class="y">Foodora</span>

<div class="flex items-center gap-10">
<div class="browser flex-1">
  <div class="browser-bar"><i></i><i></i><i></i><span>foodora.lovable.app</span></div>
  <img src="/img/foodora.jpg" class="block w-full" />
</div>
<Qr url="https://foodora.lovable.app/" size="9rem" caption="Open the app" />
</div>

<div class="banner">One task, four tools: <em>order a meal and prove it worked.</em></div>

<p class="text-center muted mt-3">Add a dish, check out, get a check that passes — then find one thing the tool got wrong.</p>

---
layout: exhibit
block: zoo
no: '01'
name: AI Coding Agent
icon: 🤖
image: /img/photos/exhibit-agent.jpg
tagline: Agent autonomy, and where human judgment still wins.
facts:
  - { k: Habitat, v: 'Your IDE and your repo' }
  - { k: Feeds on, v: 'Your intent, your code, your tokens' }
  - { k: Best at, v: 'Writing, running and fixing test code' }
  - { k: Watch out, v: 'Confident mistakes' }
---

---
layout: task
block: zoo
kicker: Exhibit 1 · AI Coding Agent
goal: Define the intent. Let the agent write, run and interpret the tests. Find where it breaks.
path: experiments/1_Zoo/1-CodingAgent/
until: '10:30'
minutes: 20
done: A test file exists, it runs, and you can name one thing the agent got wrong.
stuck: Open the solutions/ folder and read what a good run produces.
---

1. Open this folder in VS Code and start a Copilot chat (`Ctrl/Cmd+Alt+I`). No licence? The gateway key is in the folder README.
2. Ask it in one sentence: *order a meal on <code>foodora.lovable.app</code> and write a Playwright test that proves it.*
3. Run the test. If it fails, paste the failure back and let the agent fix it — <b>twice</b>, no more.

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;Ask for a negative case: checkout with an empty cart. Did it invent an error message the app never shows?</p>

<!--
10:10 — intro 2 min, hands-on until 10:30, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 1 debrief: <span class="y">what worked, what broke?</span>

<Scorecard active="agent" />

---
layout: exhibit
block: zoo
no: '02'
name: Playwright Agents
icon: 🐍
image: /img/photos/exhibit-mcp.jpg
tagline: Planner, generator, healer — three agents riding on MCP.
facts:
  - { k: Habitat, v: 'Your repo, over a test-runner-aware MCP server' }
  - { k: Feeds on, v: 'A seed test, and the page tree in context' }
  - { k: Best at, v: 'Plan → test → repair, as reviewable artifacts' }
  - { k: Watch out, v: 'The healer may skip a test instead of fixing it' }
---

---
layout: task
block: zoo
kicker: Exhibit 2 · Playwright Agents
goal: Let the planner explore, the generator write, the healer repair. You review the artifacts.
path: experiments/1_Zoo/2-PlaywrightAgents/
until: '10:55'
minutes: 20
done: A plan in specs/, a generated test, and a green run you did not write.
stuck: The folder ships a working config and a green seed test — start from there.
---

1. <code>npx playwright init-agents --loop=vscode --prompts</code> — look for <code>🎭 Using project "chromium"</code>, then run the seed test once. It must be green.
2. Ask the <b>planner</b> for a plan of ordering a meal. Read <code>specs/order.md</code> — that is the artifact a non-coder can review.
3. Ask the <b>generator</b> for bullet 1.1 only, then run it.

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;Break a locator, run the <b>healer</b>, then <code>grep -r "test.fixme" tests/</code>. Did it repair your test — or just silence it?</p>

<!--
10:35 — hands-on until 10:55, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 2 debrief: <span class="y">what worked, what broke?</span>

<Scorecard active="mcp" />

---
layout: exhibit
block: zoo
no: '03'
name: Playwright CLI
icon: 🦁
image: /img/photos/exhibit-cli.jpg
tagline: The CLI as the bridge between agent and browser.
facts:
  - { k: Habitat, v: 'Your terminal' }
  - { k: Feeds on, v: 'Shell commands; snapshots land on disk' }
  - { k: Best at, v: 'Pre-planned runs, agents with a shell' }
  - { k: Watch out, v: 'Needs Playwright 1.62+ — older builds lack half the commands' }
---

---
layout: task
block: zoo
kicker: Exhibit 3 · Playwright CLI + Skills
goal: Install the skills. Watch your agent drive a browser without you writing a locator.
path: experiments/1_Zoo/3-PlaywrightCLI/
until: '11:20'
minutes: 20
done: Snapshots are landing in .playwright-cli/ — not in your context.
stuck: All of it is npx playwright … — nothing extra to install.
---

1. <code>npx playwright init-skills --loop=claude</code>, then <code>head -4 .claude/skills/playwright-cli/SKILL.md</code>. Four lines of frontmatter is all the agent holds.
2. Drive it by hand: <code>npx playwright cli open …</code> → <code>find</code> → <code>click</code>. Every answer is a <em>file path</em>, not a page.
3. Now ask your agent to order the meal. It never had to be told the commands.

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;Write your own <code>SKILL.md</code> for the order flow — then break its <code>description</code> and watch the agent stop finding it.</p>

<!--
11:00 — hands-on until 11:20, debrief 5 min.
-->

---
block: zoo
label: The Zoo · debrief
---

# Exhibit 3 debrief: <span class="y">what worked, what broke?</span>

<Scorecard active="cli" />

<!--
11:20 — one honest observation per table. Fill the row live.
-->

---
layout: exhibit
block: zoo
no: '04'
name: Wopee.io + MCP
icon: monkey
image: /img/photos/exhibit-wopee.jpg
tagline: A purpose-built testing agent — from the cloud, or called by your own agent.
facts:
  - { k: Habitat, v: 'cmd.wopee.io, and any MCP client' }
  - { k: Feeds on, v: 'A URL — or a tool call from your coding agent' }
  - { k: Best at, v: 'Mapping the app, visual + functional regression' }
  - { k: Watch out, v: 'Less control over the generated code' }
---

---
layout: task
block: zoo
kicker: Exhibit 4 · Wopee.io
goal: Paste the URL. Watch it map the app, generate and run regression — then call the same agent from your own agent.
path: experiments/1_Zoo/4-Wopee/
until: '11:45'
minutes: 20
done: A run finished, and you opened one visual diff.
stuck: Use the shared project on the whiteboard — a finished run is already waiting there.
---

1. Sign in at <code>cmd.wopee.io</code>, create a project with the Foodora URL, instruction: *order a meal and verify the confirmation.*
2. Start it and watch the agent explore live while it maps the app.
3. Open one visual diff and decide: real regression, or noise?

<p class="mt-5"><span class="hl">Bonus</span> &nbsp;Add <code>wopee-mcp</code> to your coding agent and ask <em>it</em> to start the run — the testing agent becomes a tool your agent calls.</p>

<!--
11:25 — hands-on until 11:45, debrief 5 min.
-->

---
block: zoo
label: The Zoo · verdict
---

# The Zoo verdict: <span class="y">you pick the winner</span>

<Scorecard active="wopee" />

<!--
11:45 — score Wopee.io last, then ask the room for the overall verdict. Photograph the filled scorecard.
-->

---
layout: section
block: teams
emoji: 🗺️
image: /img/photos/teams.jpg
---

# Teams & Mission

11:50 · 10 min

---
block: teams
---

# Your <span class="y">mission card</span>

<div class="grid grid-cols-2 gap-10">
<div class="card yellow p-6">
  <div class="n">MISSION</div>
  <h3 class="text-2xl mt-2">Build an AI-assisted test suite for the demo app covering its core user flows.</h3>
  <p class="mt-4">Include at least one SKILL.md your agent can run cold.</p>
  <p class="mt-4">You have 90 min after lunch. Your suite goes straight into the Battle.</p>
</div>
<div class="flex flex-col justify-center">
  <h3>6 teams of 4</h3>
  <p>Mixed leads and engineers, assigned in advance.</p>
  <h3 class="mt-5">1 tool per team</h3>
  <p>🤖 Coding Agent ×2 · 🐍 Playwright Agents · 🦁 CLI + Skills ×2 · <img src="/img/wopee-monkey.svg" class="inline h-5 align-text-bottom" /> Wopee.io</p>
  <p class="muted mt-1">Two tools are used twice — on purpose. Same tool, different team: the only variable left is how you worked.</p>
  <h3 class="mt-5">Lunch is yours</h3>
  <p>But your team is already talking.</p>
</div>
</div>

<!--
11:50 — 10 min. Hand out the cards, then go to lunch.

PREP, 48 h before: 6 teams of 4 from the Tesena attendee list. Mix leads and engineers.
Tools: Coding Agent x2, Playwright Agents, CLI + Skills x2, Wopee.io.
Seat the two head-to-head pairs apart so they cannot watch each other work — the whole point
of doubling a tool is that the difference at the Battle is the team's practice, not the tool.
-->

---
layout: pause
block: lunch
what: Lunch
emoji: 🍽
until: '13:00'
image: /img/photos/lunch.jpg
---

Sit with your team. Come back with a plan.

---
layout: section
block: build
emoji: 🛠️
image: /img/photos/build.jpg
---

# Build One Thing

13:00 · 90 min

---
block: build
---

# Two deliverables

<div class="cards c2">
<div class="card"><div class="num">1</div><h3>A working test suite</h3><p>Covers the demo app's core user flows. Built with your team's assigned tool.</p></div>
<div class="card yellow"><div class="num">2</div><h3>At least one SKILL.md</h3><p>A reusable testing behavior (login flow, visual check pattern, or API assertion) your agent runs cold.</p></div>
</div>

<div class="card mt-5"><div class="n">RUNS COLD = DONE WHEN</div><p class="text-xl">A fresh agent session, given only your SKILL.md and <code>run &lt;skill&gt;</code>, passes without follow-up prompts.</p></div>

<!--
13:00 — 5 min briefing, then switch to the next slide and leave it up.
-->

---
layout: work
block: build
until: '14:30'
minutes: 85
checkpoints:
  - { t: '13:30', v: 'First test green' }
  - { t: '14:00', v: 'SKILL.md drafted' }
  - { t: '14:20', v: 'Cold run passes' }
---

# Build One Thing

<ul class="checklist">
<li>Test suite covers the core user flows</li>
<li>At least one SKILL.md</li>
<li>Fresh agent session runs it cold</li>
<li>Pushed to your team branch</li>
</ul>

<p class="muted mt-6">This is the thing you take home.</p>

<!--
13:05 → 14:30 — leave this slide up. Walk the room; call out the checkpoints.
-->

---
layout: section
block: swap
emoji: 🔁
---

# SKILL.md Swap

14:30 · 30 min · does it really run cold?

---
layout: work
block: swap
until: '15:00'
minutes: 30
checkpoints:
  - { t: '14:30', v: 'Hand over your SKILL.md' }
  - { t: '14:50', v: 'Feedback written' }
  - { t: '15:00', v: 'Fix it over coffee' }
---

# Run another team's skill <span class="y">cold</span>

<ul class="checklist">
<li>1 → 2 → 3 → 4 → 5 → 6 → 1</li>
<li>Fresh agent session, with your own tool, only their SKILL.md</li>
<li>Note every place it broke or needed a hint</li>
<li>Give them 3 lines of feedback</li>
</ul>

<p class="muted mt-6">The Battle scores reusability. This is your dress rehearsal.</p>

<!--
14:30 — 2 min setup, 20 min runs, 8 min feedback. Teams use their own tool on someone else's skill: that is the reusability test.
-->

---
layout: pause
block: break2
what: Coffee break
emoji: ☕
until: '15:15'
image: /img/photos/break.jpg
---

Fix what the swap found. The Battle starts from your branch.

---
layout: section
block: battle
emoji: 🏁
image: /img/photos/battle.jpg
---

# Speed Gap Battle

15:15 · 40 min build + 18 min show

---
block: battle
---

# The demo app just shipped <span class="y">3 new features</span>

Extend your suite to cover them. Use exactly what you built. No rebuilding. No switching tools.

<div class="cards c3">
<div class="card"><div class="n">🚀 SPEED</div><h3>Coverage in 40 min</h3><p>How much did you cover in time?</p></div>
<div class="card"><div class="n">🎯 ACCURACY</div><h3>Bugs it would catch</h3><p>Would it catch a real regression?</p></div>
<div class="card"><div class="n">💡 REUSABILITY</div><h3>Reuse beyond today</h3><p>Does your SKILL.md work on another app?</p></div>
</div>

<div class="banner">Last 18 min: each team presents in 3 min. <em>The room votes.</em></div>

---
layout: work
block: battle
until: '15:55'
minutes: 40
checkpoints:
  - { t: '15:15', v: 'Features revealed' }
  - { t: '15:35', v: 'First feature covered' }
  - { t: '15:55', v: 'Pencils down, presentations' }
---

# 3 new features

<div class="cards c1">
<div v-click class="card"><div class="n">FEATURE 1</div><h3>…</h3></div>
<div v-click class="card"><div class="n">FEATURE 2</div><h3>…</h3></div>
<div v-click class="card"><div class="n">FEATURE 3</div><h3>…</h3></div>
</div>

<div class="todo">Pre-script 3 features on the demo app (agree in the dry run): simple enough for 40 min, interesting enough to stress the SKILL.md.</div>

<!--
15:15 — reveal, then leave this slide up until 15:55.
-->

---
block: battle
---

# How the room <span class="y">votes</span>

<div class="cards c3">
<div class="card"><div class="n">🚀 SPEED</div><h3>1–5 fingers</h3></div>
<div class="card"><div class="n">🎯 ACCURACY</div><h3>1–5 fingers</h3></div>
<div class="card"><div class="n">💡 REUSABILITY</div><h3>1–5 fingers</h3></div>
</div>

<p class="text-2xl text-center mt-8">3 min per team, 6 teams. Vote after each one. <b>You don't vote for your own team.</b></p>

<!--
15:55 — tally on the whiteboard, six columns. Keep demos to 3 min or this overruns: 6 x 3 = 18 min and the block ends at 16:15.
The two head-to-head pairs are the interesting comparison — same tool, so the difference is the team's practice, not the tool.
-->

---
layout: section
block: wrap
emoji: 🏆
image: /img/photos/wrapup.jpg
---

# Wrap-up

Winners · honest debrief · Q&A

---
block: wrap
---

# And the winner is…

<div class="cards c3">
<div v-click class="card"><div class="n">TEAM 1</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 2</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 3</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 4</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 5</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 6</div><h3>…</h3></div>
</div>

<div class="todo">Fill in the tally live.</div>

---
block: wrap
---

# Speed Gap, <span class="y">revisited</span>

<div class="gap-eq">
  <div class="card"><div class="n">09:00</div><h3>Your gap this morning</h3><p>The sticky notes on the board.</p></div>
  <div class="gap-eq-mid">→</div>
  <div class="card yellow"><div class="n">NOW</div><h3>Your gap with today's stack</h3><p>What would you estimate now?</p></div>
</div>

<!--
16:20 — bring the photo of the morning board. Ask 3 people what changed.
-->

---
block: wrap
---

# Honest debrief

<div class="cards c3 tall">
<div class="card"><div class="num">1</div><h3>What held you back?</h3><p>Tools, setup, the app, the team?</p></div>
<div v-click class="card"><div class="num">2</div><h3>What surprised you?</h3><p>Which exhibit changed your mind?</p></div>
<div v-click class="card dark"><div class="num">3</div><h3>What breaks in a real codebase?</h3><p>Where does today's approach stop scaling?</p></div>
</div>

---
block: wrap
---

# What you do <span class="y">Monday morning</span>

<div class="cards c3 tall">
<div class="card yellow"><div class="n">DO MONDAY</div><h3>…</h3><p>…</p></div>
<div v-click class="card"><div class="n">TAKES LONGER</div><h3>…</h3><p>…</p></div>
<div v-click class="card dark"><div class="n">DROP NOW</div><h3>…</h3><p>The one habit worth dropping immediately.</p></div>
</div>

<div class="todo">Marcel's Vibe Testing rally: what to do Monday, what takes longer, the one habit to drop.</div>

---
layout: statement
block: wrap
---

# AI changed how code gets written.

<hr>

<h2 v-click>Testing is next.</h2>

---
layout: closing
---

# Thank you

<div class="flex items-center gap-4">
  <img src="/img/marcel.jpg" class="w-20 h-20 rounded-full object-cover border-4 border-black" />
  <div><h3 class="text-2xl">Marcel Veselka</h3><p class="text-xl">marcel.veselka@wopee.io</p></div>
</div>

<div class="flex items-end gap-8 mt-8">
  <Qr url="https://github.com/Wopee-io/tf-2026-vibe-testing-web-apps" size="8rem" caption="The repo" />
  <div class="todo">QR code to the feedback form</div>
</div>
