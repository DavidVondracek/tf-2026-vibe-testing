# Exhibit 4 · Wopee.io + MCP

**20 minutes.** Paste the URL, watch it map the app — then call the same agent from your own agent.

Built by your zookeeper, judged by you. Same rules as the other three.

## The task

Same task at all four exhibits:

> Order a meal on [foodora.lovable.app](https://foodora.lovable.app/) — add a dish to the cart,
> complete the checkout — and get a check that passes. Then find one thing the tool got wrong.

Here you do not write the test. You give Wopee the URL and the goal, and judge what comes back.

## Steps

1. **Create the project.** Sign in at [cmd.wopee.io](https://cmd.wopee.io) and click
   **NEW PROJECT** (top right).
   - **App URL:** keep **My app** selected and paste `https://foodora.lovable.app/`.
   - **Test instructions** (optional): the chips add ready-made ones — **+ Checkout** is the one
     for us. Or type the short version: *order a meal and verify the confirmation.* Leave it empty
     and the agent decides for itself.
   - Leave **Advanced settings** as they are — it says *Playwright · explore and generate on*.
   - Click **Create project and generate tests**.
2. **Answer its one question, then watch.** The analysis opens with a live **Browser** view: the
   agent clicks through your app while you watch, and **TAKE CONTROL** hands you the same browser.
   Left are the scenarios, starting with **Initial crawl**, with its own progress (*6 / 25 steps*).

   Early on it asks *"Where should I explore next?"* and waits. Pick **Browse restaurants and order
   a meal**, or type your own. That is the last thing you have to do here.

   The rest runs by itself, about five minutes in our rehearsal:
   - the crawl orders a meal and reaches the tracking page;
   - **Generating analysis artifacts** — application description, user flows, scenarios;
   - it queues and runs one scenario on its own, so you get a run without asking for one.

   Read the **Agent report** when the crawl is done: every step with its expected outcome and what
   was actually verified, then **Issues Encountered** and recommendations. Ours asked for
   *"more stable accessible labels for item-level add-to-cart controls"* — compare that with what
   your own tests found in Exhibits 1 to 3.

   Watch the scenario's result line. Ours said **Test passed · verdict gate disagreed**: the agent
   called it a pass and Wopee's verdict gate did not. Open it and decide who was right — that is
   the same judgement as the comparison below.
3. **Read the run.** Click a scenario that has run, then its run under **Test Runs** (or open
   **Runs** in the top menu and pick the newest one). Four tabs: **Report**, **Steps**,
   **Playwright report**, **Logs**.

   - **Report** is the agent's account: every step with its *expected outcome* and what it
     *verified*, then **Issues Encountered** and a **Final Analysis**. This is the artifact a
     non-tester can read.
   - **Steps from execution** lists what the agent actually did, one screenshot per step. Click
     through and watch the app go by; this is your evidence when you doubt the verdict.
   - The same view has **✨ GENERATE STEPS**: turn what the agent did into the test's steps — the
     same trade-off as the **Save steps** switch in the run dialog.

   Scroll the report to the bottom, to **Verdict Grounding** and **Verdict Integrity**. That is
   where the agent's prose verdict and the recorded assertions are reconciled, and where a gate
   decides what the run is worth.

## Done when

The analysis finished, you read the test cases it generated, and you opened one step in the
Comparison view.

## Bonus — the testing agent as a tool

Ask your coding agent to start a Wopee analysis. It calls a testing agent as a tool.

The Wopee MCP server is already set up in [`.vscode/mcp.json`](../../../.vscode/mcp.json), and
off until you start it. It reads its values from `.env` in the repository root — `npm install`
created that file for you.

1. In cmd.wopee.io, open your project, then **More → Settings → API Keys**.
2. Type a name (for example `workshop`) and click **Generate a new key**. Copy the
   `WOPEE_API_KEY=…` line — **it is shown only once**.
3. Open `.env` and fill in both values. The API Keys page also shows `WOPEE_PROJECT_UUID=…` with a
   copy button. Leave `WOPEE_API_URL` as it is.

   ```bash
   WOPEE_PROJECT_UUID=<your project UUID>
   WOPEE_API_KEY=<the key you just generated>
   ```

   `.env` is gitignored — the values stay on your laptop.
4. Start the server: `Ctrl/Cmd+Shift+P` → **MCP: List Servers** → **wopee** → **Start Server**
   (**Restart Server** if it is already running, so it reads the new `.env`).
5. Open Copilot Chat in **Agent** mode, in a new chat, and ask three things — one per chat:

   ```
   Use the Wopee tools: what test coverage does my project have? List the analyses, the test cases
   and their latest status, and tell me which FD-05 and FD-06 rules from spec/foodora-spec.md are
   not covered.
   ```

   ```
   Add a new Wopee test case for FD-06: placing an order with an empty checkout form must be
   rejected. Put it in the existing analysis suite and show me what you created.
   ```

   ```
   Run the Wopee test case "Open a restaurant from the homepage" with the agent and tell me the
   result when it finishes.
   ```

   You should see `wopee_fetch_test_inventory`, then `wopee_fetch_artifact` and
   `wopee_update_artifact`, then `wopee_dispatch_agent`. The new test case appears under
   **Scenarios** in cmd.wopee.io, and the run under **Runs**.

   **Wopee words:** an **analysis** is a suite (`A001`, with a `suiteUuid`), a **scenario** is a
   test case, and the test cases live in the `USER_STORIES` artifact of one analysis. Every tool
   call works on exactly one analysis.

   > **The third one will not tell you the result** (September 2026). `wopee_dispatch_agent` starts
   > the run, but with a project API key the two result tools answer `Not Authorised!` and the
   > inventory keeps reporting `NOT_RUN` for test cases that have already run. cmd.wopee.io shows
   > the run and its report correctly. A good agent says exactly that instead of inventing a
   > verdict — watch whether yours does.

## The question to answer at the debrief

Open a run and decide: **who decides whether this passed — the agent, the assertions, or you?**

Our rehearsal gave both halves of that question in one afternoon. A scenario finished as *Test
passed · verdict gate disagreed*. The `FD-06` test we wrote ourselves ended as **Failed**, with the
report noting *"All 1 assertion(s) passed but prose reports FAILED"* and the gate flagging
`unsupported-failure`.

That judgement is the whole job. A tool that calls everything a failure has not saved you anything;
a tool that calls a real defect a pass has cost you a bug. Score it on the scorecard accordingly —
and score it honestly. Especially this one.

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check [troubleshooting](../../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** use the shared Foodora project. The presenter writes its name on the whiteboard and
adds you to it — give them the email you signed up with. It already has a finished analysis and a
second run compared against an approved baseline, so the Comparison view shows real differences.
For the bonus, the whiteboard also lists that project's `WOPEE_PROJECT_UUID` and a workshop
`WOPEE_API_KEY` — put them in `.env` as in step 3.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#get-ready-for-the-workshop)
