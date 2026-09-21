<script setup lang="ts">
// Foodora, landing page → checkout, measured 21 Sep 2026 (o200k tokenizer, ≈ Claude ±10%).
// "upfront" = tool definitions or skill loaded before the task; "steps" = what the six steps return.
const rows = [
  { label: 'Playwright MCP · Oct 2025', upfront: 2762, steps: 8128 },
  { label: 'Playwright MCP · today', upfront: 4095, steps: 2219 },
  { label: 'Playwright CLI · skill loaded', upfront: 3047, steps: 2233 },
  { label: 'Playwright CLI · skill name only', upfront: 43, steps: 2233 },
]
const max = 11000
const W = 600
const x = (v: number) => (v / max) * W
const k = (v: number) => (v >= 1000 ? (v / 1000).toFixed(1) + 'K' : String(v))
</script>

<template>
  <div class="wp-bars">
    <div class="wp-bars-legend">
      <span><i class="up" />Loaded before the task</span>
      <span><i class="st" />Returned by the six steps</span>
    </div>
    <svg viewBox="0 0 880 200" role="img" aria-label="Tokens per interface: MCP Oct 2025 10.9K, MCP today 6.3K, CLI with skill loaded 5.3K, CLI with skill name only 2.3K. Steps cost about 2.2K on every modern interface; the difference is what loads before the task.">
      <g v-for="(r, i) in rows" :key="r.label" :transform="`translate(0, ${i * 48})`">
        <text x="0" y="26" class="lbl">{{ r.label }}</text>
        <g transform="translate(230, 6)">
          <rect x="0" y="0" :width="Math.max(x(r.upfront) - 1, 2)" height="30" rx="4" class="up" />
          <rect :x="x(r.upfront) + 1" y="0" :width="x(r.steps) - 1" height="30" rx="4" class="st" />
          <text v-if="x(r.upfront) > 46" :x="x(r.upfront) / 2" y="20" class="in w">{{ k(r.upfront) }}</text>
          <text v-if="x(r.steps) > 46" :x="x(r.upfront) + x(r.steps) / 2" y="20" class="in">{{ k(r.steps) }}</text>
          <text :x="x(r.upfront + r.steps) + 10" y="20" class="tot">{{ k(r.upfront + r.steps) }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.wp-bars {
  margin-top: 0.4rem;
}

.wp-bars-legend {
  display: flex;
  gap: 1.4rem;
  font-size: 0.9rem;
  color: var(--wp-grey);
  margin-bottom: 0.4rem;
}

.wp-bars-legend i {
  display: inline-block;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 3px;
  margin-right: 0.4rem;
  vertical-align: -0.1rem;
}

svg {
  width: 100%;
  height: auto;
  font-family: 'Rubik', sans-serif;
}

.up {
  fill: #7030a0;
  background: #7030a0;
}

.st {
  fill: #e0a800;
  background: #e0a800;
}

.lbl {
  font-size: 15px;
  font-weight: 500;
  fill: #000;
}

.in {
  font-size: 14px;
  font-weight: 700;
  text-anchor: middle;
  fill: #000;
}

.in.w {
  fill: #fff;
}

.tot {
  font-size: 16px;
  font-weight: 700;
  fill: #000;
}
</style>
