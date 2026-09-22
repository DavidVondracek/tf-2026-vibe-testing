# Intent-driven testing

Researched 22 September 2026. Confidence: **H** primary source read · **M** primary source but a
vendor claim or a narrow setup · **L** could not verify (not used).

## The short version

- **There is no standard definition.** "Intent-driven" or "intent-based" testing is a vendor term
  (Harness, mabl, Momentic, BlazeMeter, testRigor), not a term from research. The shared core: the
  test says *what* the user wants to achieve and what must be true afterwards; an AI agent works out
  the steps and locators.
- **Tools split into two camps.** Some run the agent on every execution (Wopee.io, Momentic,
  Midscene, Shortest). Others use the agent to *write* Playwright code that then runs without an LLM
  (Playwright Test Agents, QA Wolf, Octomind, Checksum). Hybrids cache what the agent resolved and
  replay it (Momentic, Stagehand, Midscene).
- **Independent evidence is thin and sobering.** In the best measured case, agents found real web
  app defects at an F1 of 26%. Given a human-written checklist, the best model reached 49%. Deciding
  *what* to check is the hard part, not the clicking.
- **The risk is the oracle, not the locator.** An agent that adapts can adapt its way past a bug.
- **In practice:** write the intent as goal + constraints + checkable expected results, take the
  expected results from a spec, and compile or cache the resolved steps for regression runs.

## What the term means

| Who | Their definition | Conf. |
| --- | --- | --- |
| [Harness](https://developer.harness.io/ai-test-automation/new-to-ai-test-automation/intent-driven) | Express "what a user wants to achieve using natural language"; "the AI intelligently figures out how to perform it". Example: *Verify that a user can add an item to the cart and complete checkout successfully.* | H |
| [mabl](https://www.mabl.com/blog/unlocking-intent-the-next-generation-of-test-automation), 26 Mar 2025 | Automation that "understands the 'why' behind each action" — goals and user stories, not DOM steps. | H |
| [BlazeMeter](https://www.blazemeter.com/blog/ai-copilots-intent-driven-test-automation), 26 Feb 2026 | Agents that act on instructions such as "log in", without locators or generated code. | H |
| [Momentic CEO Wei-Wei Wu](https://morningqa.substack.com/p/momentic-qa-interview), 19 Sep 2026 | "Complete checkout as a guest survives a redesign. A 12-step click script does not." | H |

The same word covers four different things, so ask which one a vendor means:

1. **Intent as a step.** Momentic's intent is one step, such as *click the OK button*. The agent
   finds the element and caches it — an intent-based *locator*.
   [Momentic](https://momentic.ai/blog/how-agentic-testing-works) **H**
2. **Intent as the whole goal.** Harness, BlazeMeter, Wopee.io and
   [Shortest](https://github.com/antiwork/shortest) hand the agent a goal to plan and execute. **H**
3. **Intent as the assertion.** Harness also uses "intent-driven assertions": natural-language
   checks on output that is not deterministic.
   [Harness, 9 Apr 2026](https://www.harness.io/blog/intent-driven-assertions-are-redefining-tests) **H**
4. **Intent as a spec that becomes code.** Playwright's planner writes a Markdown plan, the
   generator turns it into tests, the healer repairs them. The intent is a reviewable file; what
   runs is code. [Playwright Test Agents](https://playwright.dev/docs/test-agents) **H**

### How it differs from what you know

| Approach | Who decides the steps | Who writes the glue |
| --- | --- | --- |
| Script-driven | The author, in code | The author |
| Keyword-driven | The author, from a fixed vocabulary | The team maintains each keyword |
| BDD / Gherkin | The author, in Given/When/Then | A human writes step definitions |
| Model-based | Derived from an explicit state model | The model's author |
| Self-healing | The author; the tool repairs broken locators | The author |
| **Intent-driven** | **The agent, at run time or once at generation** | **The agent** |

Gherkin still works well as the *format* of an intent — the difference is that nobody writes step
definitions.

## How the tools do it

**The agent runs every time.**

- **Wopee.io** — tests are plain-language test cases, versioned in Git; "an LLM is involved in every
  run", so runs take minutes and can vary. Playwright code is generated only for passing runs and
  depends on `@wopee-io/wopee.pw`.
  [Wopee.io website PR #278, 16 Sep 2026](https://github.com/autonomous-testing/website/pull/278) **H**
- **Momentic** — natural-language steps resolved from screenshots, the accessibility tree, network
  and console; resolved selectors are cached. Vendor claim: over 99% of steps replay from cache.
  [Momentic](https://momentic.ai/blog/how-agentic-testing-works) **M**
- **Midscene.js** (ByteDance) — `aiAct`, `aiTap`, `aiAssert`, `aiQuery` in JS or YAML, vision-based,
  optional cache. [GitHub](https://github.com/web-infra-dev/midscene) **H**
- **Shortest** — `shortest("…")` tests on Playwright, calling the Claude API on every run.
  [GitHub](https://github.com/antiwork/shortest) **H**

**The agent writes code, the code runs.**

- **Playwright Test Agents** (1.56+) — planner explores from `seed.spec.ts` and writes a plan in
  `specs/`; generator writes tests and checks locators live; healer fixes locators, waits and data.
  This is [Exhibit 2](../../experiments/1_Zoo/2-PlaywrightAgents/).
  [Playwright docs](https://playwright.dev/docs/test-agents) **H**
- **QA Wolf** — AI writes Playwright code: "Automated tests can't improvise or hallucinate so there's
  no variance between runs". [QA Wolf](https://www.qawolf.com/automation-ai) **M, vendor view**
- **Octomind, Checksum** — exploration, prompts or recorded sessions produce standard Playwright code.
  [Octomind](https://octomind.dev/) · [Checksum](https://checksum.ai/lp/ai-testing) **M**

**Resolve once, replay.** Stagehand caches the selector each action resolved and checks the page
still matches before replaying; on a mismatch it asks the model again. Vendor figure: about 80%
faster on the second of two identical runs.
[Browserbase](https://www.browserbase.com/blog/stagehand-caching) ·
[Stagehand docs](https://docs.stagehand.dev/v3/best-practices/caching) **M**

## What has been measured

Independent or academic — the numbers worth quoting:

| Study | Setup | Result | Conf. |
| --- | --- | --- | --- |
| [WebTestBench](https://arxiv.org/html/2603.25226), Kong et al., 26 Mar 2026 | Computer-use agents testing web apps end-to-end for planted defects | **Best F1 26.4%** (GPT-5.1: recall 33.3%, precision 25.8%). "Most models achieve precision around 30%, indicating that CUAs often misclassify benign behaviors as defects." **With a gold checklist, best F1 49.2%** (Claude Sonnet 4.5). | H |
| [Salva & Taguelmimt](https://arxiv.org/abs/2509.19136), 23 Sep 2025 | 8 open LLMs (3B–70B) executing natural-language test cases, repeated runs | Only **Llama 3.1 70B** reached consistency above the 3-sigma industrial level. | H |
| [Reliability of computer-use agents](https://arxiv.org/abs/2604.17849), 20 Apr 2026 | Repeated OSWorld runs | An agent that succeeds once can fail the next run — stochastic execution, ambiguous task wording. Evaluate over repeated runs. | H |
| [CATTest](https://arxiv.org/abs/2609.00081), 31 Aug 2026 | Agents writing Playwright code to find annotated bugs in 102 AI-generated apps | "All evaluated models perform poorly." | H |
| [Nearform on Midscene](https://nearform.com/digital-community/midscene-js-assessing-a-natural-language-ai-testing-tool/), 2 Jan 2025 | One login test, Midscene vs plain Playwright | 45.8 s vs 1.9 s — about 24× slower. | M, one test |

Vendor claims, not independently verified: mabl 85% less maintenance; testRigor about 95% less
maintenance; Tricentis up to 85% less creation effort; Checksum about 97% accuracy; Momentic over 99%
cache replay at +52 ms per step; QA Wolf 12× faster than computer-use agents. **M**

## Trade-offs

- **Non-determinism.** The same intent can take a different path, or reach a different verdict. One
  green run proves little; count passes over repeated runs.
- **Cost and latency.** Every step that is not cached is an LLM call. WebTestBench sessions used
  0.87–3.37 million tokens per test.
- **The oracle.** *Complete checkout* says nothing about the right total or the confirmation that
  should follow. Left alone, the agent judges success itself — at about 30% precision on defects.
  With a checklist, detection nearly doubles. The expected results have to come from a spec.
- **Passing around a bug.** If the *Pay* button disappears and the agent finds another way, the goal
  still "passes". Playwright's healer can end with "a skipped test if the healer believes that
  functionality is broken"; QA Wolf warns healing "creates false passes that hide real defects".
  [Playwright](https://playwright.dev/docs/test-agents) ·
  [QA Wolf, 28 Jan 2026](https://www.qawolf.com/blog/self-healing-test-automation-types) **H**
- **Auditability.** To reproduce a failure you need the agent's trace, screenshots and reasoning
  per step.
- **Caching replays yesterday's decision.** A page that changes meaning without changing its DOM
  can slip past cache validation.
- **Prompt injection.** Page content can instruct the agent.
  [Anthropic computer-use docs](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/computer-use-tool) **H**

## How to write a good intent

1. **Goal** — one user outcome, in the user's words.
2. **Constraints** — test data, what the agent must not do, where the path is fixed. They stop the
   agent from "succeeding" another way; ambiguous wording is a measured cause of inconsistent runs.
3. **Expected results as checkable facts** — concrete values and states, not "works correctly". This
   is the checklist that doubled detection.
4. **Missing means fail** — say it: if a required step or button is missing, fail; do not look for
   another route.
5. **Evidence** — a trace and a screenshot per step, so anyone can check the verdict.

Where it fits: unit and API tests stay scripted. Intents go at the top — smoke tests, critical user
journeys, UI that changes often, exploration, and bootstrapping coverage. Once an intent is stable,
compile it to code or cache it for runs on every commit. Keep exact calculations, compliance checks,
performance timing and anything that must be reproducible bit for bit out of live agent runs.

## The same test, both ways

On Foodora — the script is shortened from Exhibit 2's
[reference solution](../../experiments/1_Zoo/2-PlaywrightAgents/solutions/order.spec.ts), the
expected results come from [`spec/`](../../spec/foodora-spec.md):

```ts
test('order a single dish with cash on delivery', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Burger Palace/ }).first().click()
  await page.getByRole('link', { name: /Classic Beef Burger/ }).getByRole('button').click()
  await page.getByRole('button', { name: 'Cart 1' }).click()
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
  await page.getByLabel('Full Name').fill('Test Guest')
  // … Street Address, City, Phone Number
  await page.getByRole('radio', { name: /Cash on Delivery/ }).click()
  await page.getByRole('button', { name: 'Place Order' }).click()
  await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible()
  await expect(page.getByText(/^Order #FDR-[A-Z0-9]{6}$/)).toBeVisible()
})
```

```text
Goal: as a guest, order one Classic Beef Burger from Burger Palace and pay cash on delivery.
Constraints: any test name, address and phone. Do not change the payment method once chosen.
  If a required step or button is missing, FAIL — do not look for another route.
Expected (check literally, from spec/foodora-spec.md):
  - the header cart shows 1 and the cart lists Classic Beef Burger
  - after Place Order: the heading "Order Confirmed!" and an order number "Order #FDR-" + 6 characters
Evidence: a trace and a screenshot of every step.
```

The script breaks when a label changes, but it never passes the wrong flow. The intent survives a
redesign, but it is only as strict as its constraints and expected results.

## What this means for the workshop

Every exhibit is one answer to *who turns the intent into clicks*:

| Exhibit | The intent | Who resolves it | When |
| --- | --- | --- | --- |
| [1 · Coding agent](../../experiments/1_Zoo/1-CodingAgent/) | Your prompt + the spec | Copilot writes a Playwright test | Once — then code runs |
| [2 · Playwright Agents](../../experiments/1_Zoo/2-PlaywrightAgents/) | The planner's Markdown plan | The generator | Once — then code runs |
| [3 · CLI + skills](../../experiments/1_Zoo/3-PlaywrightCLI/) | Your prompt + a `SKILL.md` | The agent, command by command | Every time you ask |
| [4 · Wopee.io](../../experiments/1_Zoo/4-Wopee/) | A plain-language test case | Wopee's agent | Every run |

In all four, [`spec/`](../../spec/) is the oracle — which is why [`AGENTS.md`](../../AGENTS.md) tells
the agent to take expected results from the spec, not from what the app happens to do.
