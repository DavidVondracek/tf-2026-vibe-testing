# Exhibit 3 · Playwright CLI + Skills

**20 minutes.** Install one skill. Watch your agent drive a browser from it, without you writing a locator.

The browser CLI and its skills ship inside the `playwright` package. No separate install.

## Steps

1. Install the skill and look at what you got:

   ```bash
   npx playwright init-skills
   head -4 .claude/skills/playwright-cli/SKILL.md
   ls .claude/skills/playwright-cli/references/
   ```

   Four lines of frontmatter — `name`, `description`, `allowed-tools` — is all the agent holds in
   context until a task matches. Then the 15 KB body arrives. The references only load if the
   task needs mocking, or tracing, or video. That is the whole idea.

2. Drive it by hand, so nobody thinks it is magic:

   ```bash
   npx playwright cli -s=lab open https://foodora.lovable.app/
   npx playwright cli -s=lab find "cart"
   npx playwright cli -s=lab click <the ref find printed>
   npx playwright cli -s=lab snapshot --filename=cart.yaml
   ```

   Look at what each command returns: a **file path**, not a page. `cat cart.yaml` to see the
   accessibility tree that was on disk the whole time, never in the model's context.

3. Now ask your agent to order the meal. It was never told the commands — the skill told it.

## Done when

The skill is on disk, and snapshots are landing in `.playwright-cli/` — not in the context.

```bash
ls .playwright-cli/*.yml | wc -l      # 3 or more
```

## Bonus

Write your own skill — this is the thing you take home. Roughly twenty lines:

```markdown
---
name: foodora-order
description: Order a meal on the Foodora demo app and verify the confirmation. Use when a task
  needs a completed order, or a logged-in cart state.
allowed-tools: Bash(npx:*)
---

# Order a meal

1. Open https://foodora.lovable.app/
2. Find a dish, add it to the cart
3. Go to checkout and complete the order
4. Verify the confirmation appears

## Rules
- Always use `-s=lab`, never the default session
- Never run `close-all` or `kill-all`; other people's sessions may be running
- Re-snapshot after every navigation; refs are invalidated when the page changes
```

Then break it: change the `description` to something vague like `helper`, start a fresh chat and
ask for the same thing. Watch the agent fail to find the skill.

**The description is the only part always in context. It is the skill's API.**

## Housekeeping

Close your own session when you leave, and only yours:

```bash
npx playwright cli -s=lab close
```
