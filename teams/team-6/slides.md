---
theme: default
title: 'Team 6 · AI-assisted test suite for Foodora'
info: |
  Tesena Fest 2026 · Vibe Testing Lab · Speed Gap Battle
  Team 6 — Coding agent + Playwright CLI
layout: cover
aspectRatio: 16/9
canvasWidth: 980
colorSchema: light
transition: fade
---

# Team 6

## An AI-assisted test suite for Foodora

Coding agent **+ Playwright CLI**

<div class="mt-8 text-xl opacity-70">
8 stories · 59 tests · 12 findings · 1 skill
</div>

<!--
0:00 — Say the numbers, then move. Do not read the table on the next slide out loud.
-->

---

# What we built

| | |
| --- | --- |
| Stories covered | `FD-01` … `FD-08` — all eight |
| Tests | **59**, one per rule, each named `FD-xx · <the rule>` |
| Files | one spec per story + `tests/helpers.ts` |
| Run | **47 passed · 12 failed** |

<div class="mt-6 text-2xl font-bold">
Every red test is a <span class="text-red-600">finding</span>, not a broken test.
</div>

<!--
0:20 — The last line is the whole point of the deck. Pause after it.
-->

---

# How we worked

<div class="grid grid-cols-5 gap-3 mt-10 text-center">
  <div class="p-3 rounded bg-gray-100"><div class="text-3xl font-bold">1</div>List the rules<div class="text-sm opacity-60 mt-1">from the spec, before the browser</div></div>
  <div class="p-3 rounded bg-gray-100"><div class="text-3xl font-bold">2</div>Look<div class="text-sm opacity-60 mt-1"><code>npx playwright cli snapshot</code></div></div>
  <div class="p-3 rounded bg-gray-100"><div class="text-3xl font-bold">3</div>One test per rule<div class="text-sm opacity-60 mt-1">named after its <code>FD-xx</code></div></div>
  <div class="p-3 rounded bg-gray-100"><div class="text-3xl font-bold">4</div>Run<div class="text-sm opacity-60 mt-1">read every failure</div></div>
  <div class="p-3 rounded bg-yellow-200"><div class="text-3xl font-bold">5</div>Sort the failures<div class="text-sm opacity-60 mt-1">test wrong → fix<br>build wrong → <b>leave red</b></div></div>
</div>

<div class="mt-10 text-xl">
Locators come from the accessibility snapshot's roles and names.
<b>No invented <code>data-testid</code>.</b>
</div>

<!--
0:45 — Step 5 is the one nobody else will say. Lean on it.
-->

---

# One finding, live

<div class="text-2xl mt-6">

**FD-06** · *Place Order only places the order when every required field is filled in.*

</div>

<div class="grid grid-cols-2 gap-8 mt-8">
<div class="p-4 rounded border-2 border-gray-300">
<h3>What we did</h3>
<p class="mt-2">Opened <code>/checkout</code> with one dish in the cart.<br>Left every field blank.<br>Pressed <b>Place Order</b>.</p>
</div>
<div class="p-4 rounded border-2 border-red-500 bg-red-50">
<h3>What happened</h3>
<p class="mt-2 text-xl"><b>Order Confirmed!</b><br><code>Order #FDR-OE08AB</code></p>
<p class="mt-2">No name. No address. No phone.</p>
</div>
</div>

<div class="mt-6 opacity-70">
<code>teams/team-6/tests/fd-06-checkout.spec.ts</code> → <i>FD-06 · Place Order with an empty form places no order</i>
</div>

<!--
1:00 — Do this in the browser if the wifi holds, on the slide if it does not.
-->

---

# The twelve findings

| Story | The spec asks | The build does |
| --- | --- | --- |
| FD-01 | a restaurant that does not deliver here cannot be opened | it opens normally |
| FD-02 | a search and a cuisine chip apply together | the chip is ignored |
| FD-03 | every button has an accessible name | quick-add, stepper, remove have none |
| FD-04 | add-ons in any combination | radio buttons — Bacon clears Extra Cheese |
| FD-04 | the cart is reachable from the dish page | no cart button there |
| FD-05 | Free delivery means $0.00 | Pizza Corner advertises Free, cart charges $2.99 |
| FD-05 | 20% promotion as its own line | no discount at all |
| FD-05 | the cart survives a reload | it empties |
| FD-06 | an empty form places no order | the order goes through |
| FD-06 | a missing field shows a message | silence |
| FD-07 | a fake order number has no tracking page | it renders one |
| FD-07 | total paid cannot be edited in the address | `?total=1.00` rewrites it |

<!--
1:30 — Do not read this. Point at the last three rows and say the next slide's line.
-->

---
layout: center
---

# Three of them are money and privacy

<div class="text-2xl mt-8 text-left max-w-3xl mx-auto">

- An order goes through with a **blank delivery address**
- A **stranger's order number** renders a tracking page
- The **amount paid** can be rewritten from the address bar

</div>

<div class="mt-10 text-xl opacity-70">The other nine are real too. These three ship money out of the door.</div>

<!--
1:50 — Slow down here. This is the Accuracy vote.
-->

---

# The skill

<div class="text-xl mt-4">

`.github/skills/team-6-spec-to-test/SKILL.md` — *turn one story into one spec file*

</div>

<div class="mt-6 p-5 rounded bg-yellow-100 border-l-8 border-yellow-500 text-2xl">
Sort each failure into <i>the test is wrong</i> — fix it — or <i>the build is wrong</i> —
<b>leave it red</b>.
</div>

<div class="grid grid-cols-2 gap-8 mt-8">
<div>
<h3>It carries this app's traps</h3>
<ul class="mt-2 opacity-80">
<li>icon-only buttons have no accessible name</li>
<li>the header is <code>aria-hidden</code> while the cart is open</li>
<li><code>Total</code> matches inside <code>Subtotal</code></li>
</ul>
</div>
<div>
<h3>The shape moves to any app</h3>
<p class="mt-2 opacity-80">
List the rules → look → one test per rule → run → sort the failures.<br><br>
Only the spec paths and the three traps are Foodora-specific.
</p>
</div>
</div>

<!--
2:10 — Reusability vote. Show a cold run if there is time left, not if there is not.
-->

---
layout: center
---

# What we would do next

<div class="text-2xl mt-8">

`FD-09` … `FD-11` through the **same skill**.

One sentence, no new prompt engineering.

</div>

<div class="mt-12 text-lg opacity-60">
Team 6 · <code>teams/team-6/</code> · Wopee-io pull request #78
</div>

<!--
2:40 — Stop here. Leave 20 seconds for the room to raise hands.
-->
