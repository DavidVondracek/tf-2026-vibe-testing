# Exhibit 1 · AI Coding Agent

**20 minutes.** Define the intent. Let the agent write, run and interpret the tests. Find where it breaks.

We use **VS Code + GitHub Copilot Chat**. If you have no Copilot licence, or the free one,
you still do the whole exercise — see [No Copilot licence?](#no-copilot-licence) below.

## The task

Same task at all four exhibits:

> Order a meal on [foodora.lovable.app](https://foodora.lovable.app/) — add a dish to the cart,
> complete the checkout — and get a check that passes. Then find one thing the tool got wrong.

## Setup

You did most of this before the workshop (see the [root README](../../../README.md#get-ready-for-the-workshop)). Two minutes to confirm:

1. Open this repository folder in VS Code.
2. When VS Code offers the recommended extensions, click **Install**. You need
   **GitHub Copilot Chat**, **Vercel AI Gateway** and **Playwright Test**.
3. Open the Chat view: `Ctrl/Cmd+Alt+I`.

### No Copilot licence?

Use the Vercel AI Gateway instead. It is already configured in this repository —
[`.vscode/settings.json`](../../../.vscode/settings.json) sets `deepseek/deepseek-v4.1-flash` as the default chat model.
You only need to add the key:

1. `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication**
2. Paste the API key I gave you. It starts with `vck_`.
3. Open a new chat. The model picker should now show **DeepSeek V4.1 Flash**.
4. Send `hi` and check you get an answer back.

The key is workshop-only and is revoked afterwards. It is stored by the extension in VS Code's
secret storage — **do not paste it into a file in this repository.**

> Paying for Copilot and want the same model as everyone else? The gateway works alongside
> Copilot; just pick DeepSeek V4.1 Flash in the model picker.

## Steps

1. Open this folder in VS Code and start a chat.
2. Ask for what you want, in one sentence:

   ```
   Order a meal on https://foodora.lovable.app/ and write a Playwright test that proves it worked.
   ```

   Attach [the spec](../../../spec/foodora-spec.md) (`#file:spec/foodora-spec.md`), so "worked"
   means what `FD-05` and `FD-06` say, not whatever the app shows.

3. Run the test. If it fails, paste the failure back and let the agent fix it — **twice, no more.**

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
2. **Check the troubleshooting table** in the [root README](../../../README.md#when-something-breaks).
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** [`solutions/`](./solutions/) has both tests —
[the happy path](./solutions/order-a-meal.spec.ts) and
[the negative case](./solutions/empty-cart.spec.ts). Run them with `npm run solutions` from the
repository root. Read them rather than copying them: at the debrief the question is where yours
differed, not whether you finished.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#get-ready-for-the-workshop)
