---
name: wopee-intent-tests
description: Write, update and delete Wopee.io test cases as intent — a title plus a Markdown description that carries the whole plan — instead of step lists with locators. Use whenever adding, editing, deleting or reviewing Wopee test cases through the Wopee MCP tools (wopee_fetch_artifact, wopee_update_artifact, USER_STORIES).
---

# Wopee test cases as intent

A Wopee test case is executed by an AI agent, not by a script. The agent reads the test case and
works out the clicks itself. So a test case says **what** the customer wants and **what must be
true afterwards**; it never says which element to click.

## When to ask, and when to look

Find out everything the tools can tell you before you ask the person anything. Which analyses
exist, which test cases are in them, what an artifact currently says, what a run did — all of that
is one call away, and asking for it hands the person homework you could have done.

Ask only about things no tool knows:

- **A decision that cannot be undone** — deleting a test case, overwriting someone's artifact.
- **A genuine ambiguity the map does not settle** — two analyses that both fit, with nothing in
  the request to choose between them.
- **A fact that is neither in the spec nor in the app** — a business rule nobody wrote down.

When you do ask, show what you already found, so the person answers a question rather than
starting the search.

## Words

- **Analysis** — what Wopee calls a suite. `wopee_fetch_analysis_suites` returns its `suiteUuid`;
  every artifact call needs that UUID.
- **Scenario** — a test case, shown under **Scenarios** in cmd.wopee.io.
- **`USER_STORIES`** — the artifact holding the stories and their test cases. Test cases live
  nowhere else.

## Which analysis

A project may hold several analyses (`A001`, `A002`, …), each with its own `suiteUuid` and its own
test cases. Every artifact call works on exactly one of them.

**Always call `wopee_fetch_test_inventory` first.** It returns every analysis with its identifier,
its test cases and their statuses — the map. Then decide from the map, in this order:

1. The person named an analysis (`A002`, "the checkout analysis") → use that one.
2. The request names a test case (`TC005`, "the FD-06 one") and exactly one analysis holds it →
   use that one.
3. The project has exactly one analysis → use it. Say which one you used; do not ask.
4. Several analyses could fit → **now** ask, and ask a question the map answers: list the
   candidates with their identifiers and test-case counts, and let the person pick.
5. The person asked for a new analysis, or nothing fits the flow → `wopee_create_blank_suite`,
   then write into its UUID.

**Do not ask for something the inventory already tells you.** "Which analysis?" before looking is
a question the tools answer in one call — asking it wastes the person's turn and makes the agent
look blind.

Say which analysis you wrote to, by identifier and name, in your answer. A test case that lands in
the wrong analysis is invisible to the person who goes looking for it.

## The rule

In a test case written into `USER_STORIES`:

- **`name`** — one line: the spec rule, then the outcome in the user's words.
  `FD-06: Checkout rejects an order when required fields are empty`
- **`description`** — the whole plan, in Markdown (cmd.wopee.io renders it). This is what the agent
  acts on.
- **`steps`** — always `[]`.

Never write `actionType`, `locator`, `getByRole(...)` or a CSS selector into a test case. Those
belong to generated Playwright code, not to the intent an agent reads.

## The description template

```markdown
**Goal:** <who> wants <outcome>.

**Data**
- <the account, product, address, card to use>
- <what must not change: "keep the default payment method">

**Steps**
1. <one sentence, in the language of the app>
2. …

**Expected (FD-0X)**
- <a checkable fact, with the exact value the spec gives>
- …

**Rules**
- If a required element or step is missing, fail. Do not look for another route.
- Take expected results from the spec, never from what the app happens to show.
```

Keep every section. The **Rules** section is what stops an agent from "succeeding" around the
defect you are testing, and **Expected** is what makes a pass mean something: a value from the
spec, not "works correctly".

### Never invent a number

Write only values the spec actually states. Everything else — prices, a restaurant's delivery fee,
stock, dates — lives in the app and changes without notice.

- The spec gives it? Quote it, with its rule id: *"the service fee is a flat $1.50 (FD-05)"*.
- The app gives it? Express the expectation as a **relationship** and let the agent read the real
  figures during the run: *"Total = Subtotal − 20% of Subtotal + the restaurant's delivery fee +
  the $1.50 service fee, and the discount appears as its own line."*
- You need a specific number you cannot source? Say so in **Data** — *"use the current menu
  price"* — rather than filling in a plausible one.

A test case that carries an invented price fails on the price, and the defect you were hunting
goes unnoticed behind that red. (In our rehearsal an agent wrote "$12.99" and "$2.50" for a dish
that costs $12.95 with a $2.99 delivery fee, and stated the values came from the spec — the wrong
figures are quoted here on purpose.)

## Add a test case

1. Pick the analysis (above) and take its `suiteUuid` from `wopee_fetch_analysis_suites`.
2. `wopee_fetch_artifact` with `type: "USER_STORIES"` and that UUID.
3. Add your test case to the JSON you got back, leaving every other story and test case byte for
   byte as it was. Reuse the story whose `userStoryCategory` fits (`Checkout`, `Cart`,
   `Discovery`); add a new story only when none fits. Keep `userStoryId` / `testCaseId` unique
   (`US007`, `TC007`) and set `runFirst: false` unless you mean this to run first.
4. `wopee_update_artifact` with the **complete** JSON — it replaces the artifact, it does not patch.
5. `wopee_fetch_artifact` again and check your test case is there and nothing else was lost.

## Update a test case

Same fetch → edit → update → verify. Change only the `name` and `description` of the one test case,
and keep its `testCaseId`: its run history hangs off that id. Say in one line what you changed and
why, so the person reading the diff in cmd.wopee.io knows.

Converting an old step-based test case? Read its steps, write the intent they describe, then set
`steps: []`. Do not leave both — a test case with steps and a description says two things at once,
and the agent follows the steps.

## Delete a test case

Deleting rewrites the artifact without it, and there is no undo.

1. Find it with the inventory first (above). Did the person name exactly one test case
   ("delete TC005")? Then delete it and report what you removed and what is left. Anything looser
   ("delete the checkout tests", "clean up the old ones") — **list what you would remove and wait
   for a yes.** Confirm the *deletion*, never ask where the test case lives.
2. Fetch, remove that one entry from its story's `testCases`, update, fetch again to verify.
3. If the story is left with no test cases, remove the story too.
4. Never delete a test case merely because it fails. A failing intent test is usually the app
   breaking the spec — that is the result, not a defect in the test.

## Running a test case

From cmd.wopee.io, **▶ Run** on the test case; from chat, `wopee_dispatch_agent`.

The run dialog in cmd.wopee.io offers **Save steps from this run**. It is on by default, and on a
green run it records the clicks and assertions as the test's steps — from then on the test replays
them instead of being interpreted. Turn it off to keep the test intent-driven; turn it on
deliberately when a flow has settled and you want the cheaper, repeatable version. Never leave a
test half-way: steps plus description means the steps win.

**After dispatching, hand the result to the person — do not go looking for it.** With a project
API key the tools cannot read run results yet (September 2026): `wopee_fetch_recent_executions`,
`wopee_fetch_executed_test_cases` and `wopee_read_chat_history` answer `Not Authorised!`, and the
inventory reports every status as `UNKNOWN`. The dispatch tool's own description tells you to poll
them — do not.

1. Dispatch, and say which test case is running, in which analysis.
2. Tell the person where to watch it: cmd.wopee.io → **Projects** → their project (name it by
   its URL, and say it is the one whose UUID is `WOPEE_PROJECT_UUID` if they have several) — the
   run shows under
   **RUNNING NOW** and then **COMPLETED**; click it, then the run's **Report** down to **Verdict
   Grounding**.
3. Offer to judge the report once they paste it: compare the verdict and the failing step with the
   spec rule the test case names, and say whether it failed for the right reason. Never invent a
   verdict you have not read.

Delete the paragraph above the list once run results are readable with a project key.

## Reviewing a test case

Send it back if it contains a locator; if a step says "click the second button"; if an expected
result says "works correctly" instead of a value from the spec; if the **Rules** section is
missing; or if `steps` is not empty.

Check every number against its source: the spec text, or a relationship the agent computes at run
time. A figure that is in neither was invented, however confident the summary sounds.
