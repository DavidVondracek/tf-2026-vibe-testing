# What the agents did in our rehearsal

One full run of this exhibit on 22 September 2026: Playwright 1.63, VS Code 1.138, a fresh
profile. We asked for a bigger scenario than the README does now: cart with two dishes, the
quantity stepper, the totals. Use this as a checklist for your own run. Read it after the
exhibit, not before.

| Agent | Model | Steps | Time | Result |
| --- | --- | --- | --- | --- |
| Planner | DeepSeek V4.1 Flash | 47 | 1 min | *Sorry, no response was returned* |
| Planner | DeepSeek V4 Pro | 106 | 6 min 43 s | Explored well, found real defects, then failed while saving |
| Planner, save only | Auto (GPT-5.6 Luna) | 2 | < 1 min | Saved a plan with five scenarios |
| Generator | DeepSeek V4 Pro | 114 | 6 min 18 s | Walked every step, then failed while writing the test |
| Generator, write only | Claude Haiku 4.5 | 2 | 18 s | Wrote the test into `tests/` |
| Healer | Claude Haiku 4.5 | 82 | 6 min 49 s | "Passing consistently" |

## What each agent got wrong

**The planner copied the answer key.** On the rerun with the one-path prompt it finished in a minute —
after reading `solutions/order.spec.ts`. Its plan had our test title and our test data, word for
word. The workspace now hides `solutions/` from the agents' search (`search.exclude`) and
`AGENTS.md` forbids it. Still check: a plan with *Marcel Veselka, 123 Main Street* in it came from
the key.

**The planner put tests in the wrong place.** Three of its five scenarios named a test file in
`specs/`. The config only runs `tests/`, so those tests would never have run.

**The generator turned a bug into the expected result.** The plan said *"The 20% promotion is
applied automatically … shown as its own discount line"*. The generated test dropped that check and
expected the app's total instead:

```ts
// expect: Total equals subtotal minus discount plus delivery fee plus service fee.
await expect(total.getByText('$36.43')).toBeVisible()
```

$36.43 is the total **without** the discount. By the spec it is $30.04. The comment quotes the
spec; the assertion encodes the app. The test passes, and by passing it tells you the bug is fine.

**The healer made the test green, not better.**

- It kept `$36.43`, although it was told to keep the expected results from the plan, and then
  reported *"All assertions now match the expected results from specs/order.md."*
- It replaced role-based locators with positional ones: `page.locator('h4').nth(1)`,
  `locator('text=2').nth(1)`, `locator('xpath=ancestor::*[2]')`. Add one element to the page and
  they point at the wrong thing.
- It claimed *"`locator('..')` doesn't work in Playwright"*. It does.
- It reported *"passing consistently"*. Run three times with retries off, it failed once:

  ```bash
  npx playwright test tests/order-cart.spec.ts --project=chromium --retries=0 --repeat-each=3
  ```

  The config retries each failure once, which hides a flaky test.

## The rerun, with the prompts in the README

| Agent | Model | Steps | Time | Result |
| --- | --- | --- | --- | --- |
| Planner | Claude Haiku 4.5 | 66 | 1 min 34 s | One scenario, its own test data, test file in `tests/` |
| Generator | Claude Haiku 4.5 | ~130 | 2 min 10 s | Test written; red 3 of 3 (`getByText('Subtotal')` matched twice) |
| Healer | Claude Haiku 4.5 | 14 | 51 s | Green 3 of 3 with retries off |

Green, and still worth a review:

- **Cash on Delivery is picked by position.** The generator clicked it with raw JavaScript —
  `document.querySelectorAll('[role="radio"]')` then `elements[1].click()` — and the healer kept it.
  Reorder the payment options and the test quietly pays by card. The readable version is
  `page.getByRole('radio', { name: 'Cash on Delivery' }).check()`.
- **The healer moved the checkout checks into the cart drawer.** Step 8 of the plan checks the
  order summary *on the checkout page*. To get past the duplicate "Subtotal", the healer scoped
  those lines to `getByRole('dialog')` — the cart drawer still open behind the page. Green, but it
  no longer checks the page the plan names.

## Check your own run

1. Every `expect`: does its value come from the spec, or from what the app showed?
2. Where the spec and the app disagree, did the test fail, or quietly agree with the app?
3. Run it three times with `--retries=0`. Green three times?
4. Are the locators roles and names (`getByRole('button', { name: 'Place Order' })`), or positions
   (`nth()`, `xpath`)?
5. Does the agent's summary match what the diff actually changed?
