---
name: foodora-smoke
description: Smoke-check the Foodora demo app in the browser — the restaurant list, one restaurant's menu, quick-add to cart — against the spec, and write a short report. Use when asked for a smoke test, a quick health check, or whether Foodora works.
allowed-tools: Bash(npx:*)
---

# Foodora smoke check

Three checks in one browser session, judged against [`spec/foodora-spec.md`](../../../spec/foodora-spec.md).
Report what you find. Do not fix anything and do not write test files.

The app address is `$FOODORA_URL`, falling back to https://foodora.lovable.app.

## Steps

Run every command from the repository root, exactly as written: `npx playwright …` is
pre-approved, a command wrapped in a variable or chained with `&&` stops for approval.

1. Open the app in its own session:
   `npx playwright cli -s=smoke open "${FOODORA_URL:-https://foodora.lovable.app}/"`
2. **FD-01 · Browse restaurants.** `npx playwright cli -s=smoke snapshot`. The restaurant cards
   load after the page: if no restaurant links appear under **Popular Restaurants**, snapshot
   again, at most three times. Note every restaurant, which cards say *Not available at your
   address*, and the subtitle under the heading. Check them against FD-01.
3. **FD-03 · Restaurant menu.** Click the first card that is available — cards are links.
   Snapshot. Check the page against FD-03: the restaurant's details, the category tabs, and a name,
   description, price and quick-add button for each dish.
4. **Quick-add.** The quick-add is the unnamed button inside a dish's link, next to the price.
   Click it on the first dish, snapshot, and read the header's cart button. Check it against
   FD-03's quick-add rule. Ignore the toast: it disappears on its own.
5. `npx playwright cli -s=smoke screenshot --filename=test-results/foodora-smoke.png`, then
   `npx playwright cli -s=smoke close`.

## Report

Write `test-results/foodora-smoke.md`, then show the same table in the chat:

| Check | Spec | Result | What the page showed |
| --- | --- | --- | --- |
| Restaurant list | FD-01 | PASS / FAIL | … |
| Restaurant menu | FD-03 | PASS / FAIL | … |
| Quick-add | FD-03 | PASS / FAIL | … |

End with the screenshot, `test-results/foodora-smoke.png`.

## Rules

- Expected results come from the spec, never from what the app shows. When they disagree, the
  check is FAIL: quote the spec line next to what the page showed.
- A check that cannot run — a page that does not load, an element that is not there — is FAIL,
  with what you saw. Do not look for another route.
- Re-snapshot after every click: refs change with the page.
- Use only the `smoke` session. Never run `close-all` or `kill-all`.
