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
   **New Project** (top right).
   - **App URL:** keep **My app** selected and paste `https://foodora.lovable.app/`.
   - **Test instructions:** paste `FD-05` and `FD-06` from [the spec](../../../spec/foodora-spec.md),
     or the short version: *order a meal and verify the confirmation.*
   - Leave **Advanced settings** as they are — *Explore the app and generate tests* stays on.
   - Click **Create project and generate tests**.
2. **Watch it explore.** Open **Analysis** in the top menu. The agent opens a real browser, clicks
   through the app and takes a screenshot after every step. Then it writes an app description,
   user stories and test cases. Exploring takes 5–15 minutes; the rest a few more.
3. **Open a comparison.** Open **Runs**, pick the newest run, then a scenario, then a step. The
   **Comparison view** shows **Current Image** on the left and **Baseline** on the right.
   A brand-new project has no baseline yet, so the right side asks you to **APPROVE** the current
   image. Approving makes it the baseline the next run is compared against. To judge a real
   difference, open the same view in the shared project (see [If you get stuck](#if-you-get-stuck)).

## Done when

The analysis finished, you read the test cases it generated, and you opened one step in the
Comparison view.

## Bonus — the testing agent as a tool

Ask your coding agent to start a Wopee analysis. It calls a testing agent as a tool.

The Wopee MCP server is already set up in [`.vscode/mcp.json`](../../../.vscode/mcp.json). It
reads its values from `.env` in the repository root — `npm install` created that file for you.

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
4. Restart the server: `Ctrl/Cmd+Shift+P` → **MCP: List Servers** → **wopee** → **Restart Server**
   (or **Developer: Reload Window**).
5. Open Copilot Chat in **Agent** mode and ask: *list my Wopee analysis suites, then start a new
   Wopee analysis focused on the checkout flow.* Allow the tool calls when asked. You should see
   `wopee_fetch_analysis_suites`, then `wopee_dispatch_analysis`.
6. The new analysis shows up under **Analysis** in cmd.wopee.io. When it has finished, ask Copilot
   to fetch its user stories (`wopee_fetch_artifact`) and compare them with the spec.

The server's other tools create suites, generate and update artifacts (app context, user stories,
test cases, Playwright code), run chosen test cases with the agent (`wopee_dispatch_agent`), and
fetch recent results (`wopee_fetch_recent_executions`).

> On Claude Code instead? It does not read `.vscode/mcp.json`. Add a `.mcp.json` in the
> repository root with the same server under `mcpServers`, plus
> `"env": { "WOPEE_PROJECT_UUID": "${WOPEE_PROJECT_UUID}", "WOPEE_API_KEY": "${WOPEE_API_KEY}" }`.
> Then start Claude Code with the `.env` values loaded: `set -a; . ./.env; set +a; claude`.

## The question to answer at the debrief

Open a comparison and decide: **real regression, or noise?**

That judgement is the whole job. A tool that shows you every difference has not saved you
anything; a tool that hides the wrong one has cost you a bug. Score it on the scorecard
accordingly — and score it honestly. Especially this one.

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
