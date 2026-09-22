---
name: foodora-order
description: Order a meal on the Foodora demo app and verify the confirmation. Use when a task needs a completed order, a populated cart, or the order-confirmation screen.
allowed-tools: Bash(npx:*)
---

# Order a meal on the Foodora demo app

The app address is `$FOODORA_URL`, falling back to https://foodora.lovable.app/. No login, no
cookie banner — you can start ordering immediately.

## Steps

1. Open the app in the `lab` session:
   `npx playwright cli -s=lab open "${FOODORA_URL:-https://foodora.lovable.app}/"`
2. Open a restaurant. They are **links**, not buttons: `find "Burger Palace"`, then `click` the
   ref. This is client-side routing to `/restaurant/1` — the page does not reload.
3. Add a dish. The quick-add control is the **`+` button next to the price**, nested inside the
   menu-item link. Snapshot the menu item first, then click the button ref inside it.
4. Confirm it landed by reading the header cart button: its name changes from `Cart` to `Cart 1`.
   Do **not** rely on the "Added to cart!" toast — it auto-dismisses.
5. Click the cart button, then `Proceed to Checkout`. This navigates to `/checkout`.
6. Fill the delivery form: `Full Name`, `Street Address`, `City`, `Phone Number`. Select the
   `Cash on Delivery` radio.
7. Click `Place Order`.

## Verifying

The confirmation renders **in place** — the URL stays `/checkout`. Do not wait for a navigation.

The order succeeded when the page shows:

- a heading `Order Confirmed!`
- the text `Your order has been placed successfully.`
- an order number matching `Order #FDR-` plus six uppercase alphanumerics

## Rules

- Always use `-s=lab`. Never the default session.
- Never run `close-all` or `kill-all` — other people's sessions are running on this machine.
- Re-snapshot after every navigation. Refs are invalidated when the page changes.
- Click through the whole flow in one session, from the home page to the confirmation.
- The app has **no `data-testid` attributes anywhere**. Use roles, labels and text.
- Take expected results from `spec/foodora-spec.md`, not from what the app happens to do. When
  the two disagree, report it.
