# Optional · API testing with an agent

**20–30 minutes.** At home, or at the workshop if there is time left.

Foodora has an API. You never see it in the Zoo, because the UI hides it — but the UI's own
traffic tells you where it is.

## The task

> Find Foodora's API. Get your agent to write tests for it. Then use it to prove one thing the UI
> gets wrong.

## Setup

Nothing new: the root `npm install` covers it. Run everything from this folder:

```bash
cd experiments/2_API
```

You do not need to copy an API key. [`fixtures.ts`](./fixtures.ts) opens the app once and reads
the key the app itself sends — it is public, every visitor's browser has it. Your tests get a
ready-to-use `foodoraApi` request context.

## Steps

1. **Find the API yourself.** Open [foodora.lovable.app](https://foodora.lovable.app/), then
   DevTools → **Network** → **Fetch/XHR**, and reload. Open one request: look at the URL, the
   `apikey` header and the JSON that comes back. Then open a restaurant and watch the second call.

   Three things trip people up. The API is **not** on `foodora.lovable.app` — look at the host.
   Rows are picked with filters, `?slug=eq.1`, not paths like `/restaurants/1`. And every request
   needs the key: in a browser tab, add `&apikey=<the key>` to the URL.

   <details>
   <summary>Stuck? A working request to open in your browser</summary>

   Every restaurant, sorted by name:

   ```
   https://uqcjwtfrmayvjhkzgiou.supabase.co/rest/v1/restaurants?select=name,slug,delivery_fee,promo&order=name.asc&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY2p3dGZybWF5dmpoa3pnaW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMjMxMjksImV4cCI6MjA5MTU5OTEyOX0.8rplar0Db8NwpEPPGxn98xkMPipH_MNuzIh7nDhTowA
   ```

   One restaurant: replace `select=name,slug,delivery_fee,promo&order=name.asc` with `slug=eq.2`
   (Pizza Corner). The key is the app's public one — every visitor's browser sends it.

   </details>
2. **Ask your agent for tests**, in one prompt:

   ```
   Write Playwright API tests in tests/restaurants.spec.ts. Use the foodoraApi fixture from
   ../fixtures.ts. Check the restaurant list and one restaurant's menu. Take expected results
   from spec/foodora-spec.md, not from what the API happens to return.
   ```

3. Run them: `npx playwright test tests/`
4. **Use the API as a second source of truth.** It knows each restaurant's delivery fee. Ask your
   agent for a test that the cart charges what the API advertises (`FD-05` in
   [the spec](../../spec/foodora-spec.md)). If it fails, check the spec before you "fix" the test.

## Done when

Your tests run, and one of them proves an `FD-05` bug from the API side.

## Bonus

- What does the API return for a restaurant that does not exist? For a column that does not
  exist? Without the key? Which of those deserve a test — and which would your agent have written
  without being asked?
- Look at `delivery_fee` in the response. What type would you expect? What do you get? Why does
  that matter for the bug you just found?
- Ask your agent to test *placing an order* through the API. What does it find, and what does
  that tell you about the order tracking page?

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check the troubleshooting table** in the [root README](../../README.md#when-something-breaks).
3. **Shortcut:** [`solutions/restaurants.spec.ts`](./solutions/restaurants.spec.ts) — five
   read-only tests, the last one catching the fee bug. Run it with `npx playwright test solutions/`.

Repo map: [the Zoo exhibits](../1_Zoo/) · [the spec](../../spec/) · [what your agent must know](../../AGENTS.md)
