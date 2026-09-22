# Exhibit 1 · AI Coding Agent

**20 minutes.** Define the intent. Let the agent write, run and interpret the tests. Find where it breaks.

We use **VS Code + GitHub Copilot Chat** with the **Agent**. No Copilot licence, or only the free
one? You still do the whole exercise — see [No Copilot licence?](#no-copilot-licence).
Using Claude Code instead? The same steps work; see [Claude Code](#claude-code).

## The task

Same task at all four exhibits:

> Order a meal on [foodora.lovable.app](https://foodora.lovable.app/) — add a dish to the cart,
> complete the checkout — and get a check that passes. Then find one thing the tool got wrong.

## Setup

You did most of this before the workshop (see the [root README](../../../README.md#get-ready-for-the-workshop)). Two minutes to confirm:

1. Open the **repository root** in VS Code (not this folder).
2. Check the extensions: **Vercel AI Gateway** and **Playwright Test for VSCode**. GitHub Copilot
   Chat is built into VS Code, so there is nothing to install for it.
3. Open the Chat view: `Ctrl+Alt+I` (macOS: `Ctrl+Cmd+I`).
4. In the chat input box, set the **agent picker** to **Agent** (not Ask or Plan). The
   **model picker** sits next to it.

### No Copilot licence?

Use the Vercel AI Gateway instead. It is already configured in this repository —
[`.vscode/settings.json`](../../../.vscode/settings.json) sets `deepseek/deepseek-v4.1-flash` as the default chat model.
You only need to add the key:

1. `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication**
2. Paste the API key handed out at the start of the workshop. It starts with `vck_`.
3. Open a new chat. The model picker in the chat input box should now show **DeepSeek V4.1 Flash**.
4. Send `hi` and check you get an answer back.

The key is workshop-only and is revoked afterwards — at home, use your own Copilot plan or your
own [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) key. It is stored by the extension in VS Code's
secret storage — **do not paste it into a file in this repository.**

> Paying for Copilot and want the same model as everyone else? The gateway works alongside
> Copilot: pick DeepSeek V4.1 Flash in the model picker.

### Claude Code

Start `claude` in the repository root. Attach files with `@`, e.g. `@spec/foodora-spec.md`.
Everything else below is the same.

## Steps

1. Start a new chat in **Agent**.
2. Ask for what you want, in one prompt, with [the spec](../../../spec/foodora-spec.md) attached:

   ```
   Order a meal on https://foodora.lovable.app/ and write a Playwright test that proves it worked.
   Put it in experiments/1_Zoo/1-CodingAgent/tests/.
   ```

   Attach the spec before you send: type `#`, start typing `foodora-spec` and pick the file, or
   drag it from the Explorer into the chat. The spec makes "worked" mean what `FD-05` and
   `FD-06` say, not whatever the app shows.

3. Let the agent run the test. It asks before each terminal command; approve it. Or run it
   yourself:

   ```bash
   cd experiments/1_Zoo/1-CodingAgent
   npx playwright test --project=chromium
   ```

   If it fails, let the agent fix it — **twice, no more.**

## Done when

A test file exists, it runs, and **you can name one thing the agent got wrong.**

That last part is the exercise. The test passing is not the point.

## Bonus

Ask for a negative case: checkout with an empty cart.

Did it invent an error message the app never shows? That is the failure mode to remember —
the agent asserts what *should* be true rather than what *is* true, and the test passes
against an app that never behaves that way.

Do not take my word for what the app does. Run the agent's negative test and watch it fail, then
run the one in [`solutions/empty-cart.spec.ts`](./solutions/empty-cart.spec.ts) and watch it pass.
The difference between the two is the whole exhibit.

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check [troubleshooting](../../../docs/setup-troubleshooting.md#on-the-workshop-day)** — the workshop-day table.
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** [`solutions/`](./solutions/) has both tests —
[the happy path](./solutions/order-a-meal.spec.ts) and
[the negative case](./solutions/empty-cart.spec.ts). Run them with `npm run solutions` from the
repository root. Read them rather than copying them: at the debrief the question is where yours
differed, not whether you finished.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#get-ready-for-the-workshop)
