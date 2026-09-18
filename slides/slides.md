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

<!--
08:50 — on screen while people arrive. Wi-Fi details on the whiteboard.
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

<div class="todo">Replace with the final setup check once the repo has experiments (README steps 6–7).</div>

<!--
09:05 — anyone without a working setup: pair them with a neighbour now, fix it during the concepts block.
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
<div class="card dark"><div class="num">4</div><h3>Take the shortcut</h3><p>Every exhibit has a solution branch. Use it and keep going.</p></div>
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

# Vibe coding → <span class="y">vibe testing</span>

<div class="grid grid-cols-2 gap-10">
<div class="flex flex-col justify-center">
  <p class="text-4xl font-bold my-1">You prompt.</p>
  <p v-click class="text-4xl font-bold my-1">The AI codes.</p>
  <p v-click class="text-4xl muted my-1">Nobody reads the code.</p>
  <p v-click class="text-4xl font-bold my-1">You ship.</p>
</div>
<div v-click class="cards c1 mt-0">
<div class="card yellow"><div class="n">DEV</div><h3>Ships in hours</h3><p>Prompt → AI writes code → commit. The loop runs all day.</p></div>
<div class="card"><div class="n">QA</div><h3>Verifies in weeks</h3><p>Still fixing brittle tests. More features, more work.</p></div>
</div>
</div>

<!--
09:15 — the shift developers already made. QA is next.
-->

---
block: stack
---

# The new stack in <span class="y">4 pieces</span>

<div class="cards c4">
<div class="card"><div class="n">CODING AGENT</div><h3>Claude Code, Copilot, Cursor</h3><p>Writes, runs and fixes test code in your repo.</p></div>
<div class="card"><div class="n">PROTOCOL</div><h3>MCP</h3><p>A standard way to make any tool readable and callable by an LLM.</p></div>
<div class="card"><div class="n">BROWSER CLI</div><h3>Playwright CLI</h3><p>The agent drives the browser with shell commands. Snapshots saved to disk.</p></div>
<div class="card"><div class="n">TESTING AGENT</div><h3>Wopee.io</h3><p>Maps the app, then generates and runs regression tests end to end.</p></div>
</div>

<div class="todo">Draw the one diagram: agent in the middle, MCP and CLI as the two ways to the browser, SKILL.md as the knowledge layer.</div>

<!--
09:22 — one sentence per piece. The Zoo will make each one concrete.
-->

---
block: stack
---

# Playwright CLI vs MCP: <span class="y">~4× fewer tokens</span>

Same Playwright engine. A different interface for the LLM.

<div class="vs">
  <div class="card"><div class="n">@playwright/cli</div><h3>CLI</h3><div class="metric">~27K<small>tokens / session</small></div><p>Shell commands. Snapshots saved to disk, not to the context.</p><p><b>Best for:</b> agents with a shell.</p></div>
  <div class="vs-disc">VS</div>
  <div class="card"><div class="n">@playwright/mcp</div><h3>MCP</h3><div class="metric">~114K<small>tokens / session</small></div><p>JSON-RPC server. Full accessibility tree pushed into the context.</p><p><b>Best for:</b> sandboxed UIs, exploration.</p></div>
</div>

<!--
09:28 — numbers from the OSC workshop deck (August 2026). Re-check against current Playwright releases before the event; drop "4×" from the title if they changed.
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
done: TODO
---

<div class="todo">Steps (max 3), "done when", the solution branch, and which coding agent attendees use.</div>

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
name: Playwright MCP
icon: 🐍
image: /img/photos/exhibit-mcp.jpg
tagline: The protocol that makes tools agent-readable.
facts:
  - { k: Habitat, v: 'Any MCP client: IDE, chat app' }
  - { k: Feeds on, v: '~114K tokens / session' }
  - { k: Best at, v: 'Exploring an app in natural language' }
  - { k: Watch out, v: 'The context window fills up fast' }
---

---
layout: task
block: zoo
kicker: Exhibit 2 · Playwright MCP
goal: Connect Playwright MCP to your agent. Explore the app and generate tests in plain English.
path: experiments/1_Zoo/2-PlaywrightMCP/
until: '10:55'
minutes: 20
done: TODO
---

<div class="todo">Steps (max 3, with exact commands), "done when" and the solution branch.</div>

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
  - { k: Feeds on, v: '~27K tokens / session' }
  - { k: Best at, v: 'Fast, scriptable runs by agents with a shell' }
  - { k: Watch out, v: 'Needs a shell the agent can use' }
---

---
layout: task
block: zoo
kicker: Exhibit 3 · Playwright CLI
goal: Same task through the Playwright CLI. What changed in speed and tokens?
path: experiments/1_Zoo/3-PlaywrightCLI/
until: '11:20'
minutes: 20
done: TODO
---

<div class="todo">Steps (max 3, with exact commands), "done when" and the solution branch.</div>

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
name: Wopee.io
icon: monkey
image: /img/photos/exhibit-wopee.jpg
tagline: A purpose-built AI testing agent. Built by your zookeeper, judged by you.
facts:
  - { k: Habitat, v: 'The cloud: cmd.wopee.io' }
  - { k: Feeds on, v: 'A URL' }
  - { k: Best at, v: 'Mapping the app, visual + functional regression' }
  - { k: Watch out, v: 'Less control over the generated code' }
---

---
layout: task
block: zoo
kicker: Exhibit 4 · Wopee.io
goal: Paste the URL. Watch it map the app, then generate and run visual + functional regression end to end.
path: experiments/1_Zoo/4-Wopee/
until: '11:45'
minutes: 20
done: TODO
---

<div class="todo">Steps (max 3), "done when" and the fallback.</div>

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
  <h3>3 teams</h3>
  <p>Mixed leads and engineers, assigned in advance.</p>
  <h3 class="mt-5">1 tool per team</h3>
  <p>🤖 AI Coding Agent · 🐍 Playwright MCP · 🦁 Playwright CLI</p>
  <h3 class="mt-5">Lunch is yours</h3>
  <p>But your team is already talking.</p>
</div>
</div>

<div class="todo">Team assignment: names per team (from the Tesena attendee list, 48 h before).</div>

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
<li>Team 1 → Team 2 → Team 3 → Team 1</li>
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

15:15 · 45 min build + 15 min show

---
block: battle
---

# The demo app just shipped <span class="y">3 new features</span>

Extend your suite to cover them. Use exactly what you built. No rebuilding. No switching tools.

<div class="cards c3">
<div class="card"><div class="n">🚀 SPEED</div><h3>Coverage in 45 min</h3><p>How much did you cover in time?</p></div>
<div class="card"><div class="n">🎯 ACCURACY</div><h3>Bugs it would catch</h3><p>Would it catch a real regression?</p></div>
<div class="card"><div class="n">💡 REUSABILITY</div><h3>Reuse beyond today</h3><p>Does your SKILL.md work on another app?</p></div>
</div>

<div class="banner">Last 15 min: each team presents in 4 min. <em>The room votes.</em></div>

---
layout: work
block: battle
until: '16:00'
minutes: 45
checkpoints:
  - { t: '15:15', v: 'Features revealed' }
  - { t: '15:40', v: 'First feature covered' }
  - { t: '16:00', v: 'Pencils down, presentations' }
---

# 3 new features

<div class="cards c1">
<div v-click class="card"><div class="n">FEATURE 1</div><h3>…</h3></div>
<div v-click class="card"><div class="n">FEATURE 2</div><h3>…</h3></div>
<div v-click class="card"><div class="n">FEATURE 3</div><h3>…</h3></div>
</div>

<div class="todo">Pre-script 3 features on the demo app (agree in the dry run): simple enough for 45 min, interesting enough to stress the SKILL.md.</div>

<!--
15:15 — reveal, then leave this slide up until 16:00.
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

<p class="text-2xl text-center mt-8">4 min per team. Vote after each one. <b>You don't vote for your own team.</b></p>

<!--
16:00 — tally on the whiteboard, one column per team.
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

<div class="cards c3 tall">
<div v-click class="card"><div class="n">TEAM 1</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 2</div><h3>…</h3></div>
<div v-click class="card"><div class="n">TEAM 3</div><h3>…</h3></div>
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
