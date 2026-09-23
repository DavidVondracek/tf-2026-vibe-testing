# 09:00 · Kick-off: Speed Gap Diagnostic

**Time:** 09:00–09:15 · 15 min

**Goal:** get your laptop ready, and measure how fast your team is today.

## Steps

1. Say hello to your neighbour. They are your first help today.
2. Open the repository in VS Code and run `npm run verify` in the terminal. All seven lines must be
   green. Red? It tells you what to fix.
3. Check your model. Start a new chat in **Agent** and send "hi". With a GitHub account, the picker
   shows **Auto** (Copilot Free) — that is all you need. No Copilot, or out of requests? Take the
   key handed out in the room: `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication** →
   paste it, then pick **Claude Haiku 4.5** in the model picker.
4. Learn how to get unstuck (the order matters):
   1. Ask your neighbour. After lunch, ask your team.
   2. Check [when something breaks](../docs/setup-troubleshooting.md#on-the-workshop-day) and
      [setup troubleshooting](../docs/setup-troubleshooting.md).
   3. Raise your hand, or put your laptop lid half down.
   4. Take the shortcut: open the exhibit's `solutions/` folder and keep going.
5. Write two numbers on two sticky notes and put them on the board. No judgment.
   - **DEV:** how long does your team need to ship a feature? From ticket to merged code.
   - **QA:** how long does your team need to verify it? From merged code to "we trust it in
     production".

The distance between the two numbers is the **speed gap**. Today is about closing it. We look at
the board again at the [wrap-up](07-wrap.md).

## Where files go

Nowhere yet.

## Done when

`npm run verify` is green, and your two numbers are on the board.

## If stuck

Setup still red? Pair with your neighbour and fix it during the next block — or at the 09:55
break. [Setup troubleshooting](../docs/setup-troubleshooting.md) is organised by setup step.

Next: [09:15 · Concepts](01-concepts.md)
