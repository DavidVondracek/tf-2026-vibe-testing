# Exhibit 3 · Playwright CLI + Skills

**20 minutes.** Install the skills. Watch your agent drive a browser from them, without you writing a locator.

The browser CLI and its skills ship inside the `playwright` package. No separate install.

## Steps

1. Install the skills and look at what you got:

   ```bash
   cd experiments/1_Zoo/3-PlaywrightCLI
   npx playwright init-skills --loop=claude
   head -4 .claude/skills/playwright-cli/SKILL.md
   ls .claude/skills/playwright-cli/references/
   ```

   You get three — `playwright-cli`, `playwright-component-testing`, `playwright-trace`. We only
   use the first.

   Four lines of frontmatter — `name`, `description`, `allowed-tools` — is all the agent holds in
   context until a task matches. Then the 13 KB body arrives. The nine files in `references/` only
   load if the task needs mocking, or tracing, or video. That is the whole idea.

   > **VS Code + Copilot reads this.** Copilot discovers skills from `.claude/skills/`,
   > `.agents/skills/` and `.github/skills/`, so `--loop=claude` works as-is. `--loop=agents`
   > writes the same three skills to the vendor-neutral `.agents/skills/` instead — use that one
   > if you are on VS Code older than 1.110. Reload the window, then type `/` in Chat to see them.

2. Drive it by hand, so nobody thinks it is magic:

   ```bash
   npx playwright cli -s=lab open https://foodora.lovable.app/
   npx playwright cli -s=lab find "Cart"
   npx playwright cli -s=lab click <the ref find printed>
   npx playwright cli -s=lab snapshot --filename=cart.yaml
   ```

   Look at what each command returns: a **file path**, not a page. `find` gives you refs like
   `[ref=e17]` — that is what you pass to `click`. `cat cart.yaml` to see the accessibility tree
   that was on disk the whole time, never in the model's context.

3. Now ask your agent to order the meal, taking its expected results from
   [the spec](../../../spec/foodora-spec.md). It was never told the commands — the skill told it.

   > **If the agent starts running a bare `playwright-cli` command and it fails:** that binary is
   > not installed here, and `playwright-cli` on npm is an unrelated project. Tell it to use
   > `npx playwright cli` instead. The repository's [`AGENTS.md`](../../../AGENTS.md) says so already, but not every
   > agent reads it.

## Done when

The skill is on disk, and snapshots are landing in `.playwright-cli/` — not in the context.

```bash
ls .playwright-cli/*.yml | wc -l      # 3 or more
```

## Bonus

Write your own skill — this is the thing you take home.

Write it yourself first, from what you just learned driving the CLI by hand. Then compare with
[`skills/foodora-order/SKILL.md`](./skills/foodora-order/SKILL.md) in this folder, which is a
worked version. Install yours by copying the folder in:

```bash
cp -r skills/foodora-order .claude/skills/
```

The folder name must match the `name` in the frontmatter, or it will not load.

Then break it: change the `description` to something vague like `helper`, start a fresh chat and
ask for the same thing. Watch the agent fail to find the skill.

**The description is the only part always in context. It is the skill's API.**

## Housekeeping

Close your own session when you leave, and only yours:

```bash
npx playwright cli -s=lab close
```

## If you get stuck

1. **Ask your neighbour.** Or your team, after lunch.
2. **Check the troubleshooting table** in the [root README](../../../README.md#when-something-breaks).
3. **Raise your hand.** Do not spend 10 of your 20 minutes on setup.

**Shortcut:** the worked skill is at
[`skills/foodora-order/SKILL.md`](./skills/foodora-order/SKILL.md). Write your own first, then
compare.

Repo map: [all four exhibits](../) · [what your agent must know](../../../AGENTS.md) · [setup checklist](../../../README.md#get-ready-for-the-workshop)
