<script setup lang="ts">
import { computed, ref } from 'vue'

// Artificial Analysis, read 23 Sep 2026 (Intelligence Index v4.3.2). One dot per reasoning effort,
// low → max. Cost = USD per Intelligence Index task; speed = output tokens per second.
type Point = { effort: string; index: number; cost: number; speed: number | null }
type Model = { name: string; lab: 'Anthropic' | 'OpenAI'; color: string; price: string; points: Point[] }

const efforts = ['low', 'medium', 'high', 'xhigh', 'max']
const pts = (index: number[], cost: number[], speed: (number | null)[]) =>
  index.map((v, i) => ({ effort: index.length === 1 ? 'reasoning' : efforts[i], index: v, cost: cost[i], speed: speed[i] }))

const models: Model[] = [
  { name: 'Claude Opus 5.5', lab: 'Anthropic', color: '#c92a2a', price: '$4 / $20',
    points: pts([42.3, 51.2, 53.6, 56.0, 57.6], [0.55, 1.34, 1.82, 3.46, 5.98], [79, 75, 91, 93, null]) },
  { name: 'Claude Fable 5.1', lab: 'Anthropic', color: '#c99700', price: '$10 / $50',
    points: pts([46.8, 48.9, 51.1, 53.2, 53.4], [2.37, 2.98, 3.91, 5.98, 7.63], [56, 55, 56, 62, 66]) },
  { name: 'Claude Sonnet 5', lab: 'Anthropic', color: '#f08c00', price: '$2 / $10',
    points: pts([24, 28, 32, 34, 38], [0.51, 1.0, 1.79, 2.87, 5.09], [63, 66, 68, 67, 80]) },
  { name: 'Claude Haiku 4.5', lab: 'Anthropic', color: '#a0522d', price: '$1 / $5',
    points: pts([17], [0.21], [113]) },
  { name: 'GPT-6 Astra', lab: 'OpenAI', color: '#0ca678', price: '$10 / $50',
    points: pts([45.8, 49.6, 50.9, 52.4, 52.7], [0.82, 1.54, 1.73, 2.31, 3.26], [46, 47, 50, 53, 54]) },
  { name: 'GPT-6 Sol', lab: 'OpenAI', color: '#1c7ed6', price: '$2 / $10',
    points: pts([33.9, 39.8, 42.8, 44.1, 47.5], [0.13, 0.25, 0.37, 0.53, 1.06], [111, 114, 116, 104, 125]) },
  { name: 'GPT-6 Luna', lab: 'OpenAI', color: '#7030a0', price: '$0.10 / $0.50',
    points: pts([20.9, 29.5, 32.1, 33.9, 37.3], [0.0045, 0.017, 0.029, 0.042, 0.068], [136, 143, 134, 149, 151]) },
]

const axis = ref<'cost' | 'speed'>('cost')
const log = ref(true)
const hidden = ref(new Set<string>())
const hover = ref<{ m: Model; p: Point; x: number; y: number } | null>(null)

const W = 860, H = 330, L = 48, R = 118, T = 14, B = 40
const yMin = 15, yMax = 60
const y = (v: number) => T + (1 - (v - yMin) / (yMax - yMin)) * (H - T - B)

const xDomain = computed(() => (axis.value === 'speed' ? [40, 160] : log.value ? [0.003, 10] : [0, 8]))
const x = (v: number) => {
  const [a, b] = xDomain.value
  const f = axis.value === 'cost' && log.value ? (Math.log10(v) - Math.log10(a)) / (Math.log10(b) - Math.log10(a)) : (v - a) / (b - a)
  return L + f * (W - L - R)
}
const xTicks = computed(() =>
  axis.value === 'speed' ? [40, 60, 80, 100, 120, 140, 160] : log.value ? [0.01, 0.1, 1, 10] : [0, 1, 2, 3, 4, 5, 6, 7, 8],
)
const xLabel = (v: number) => (axis.value === 'speed' ? String(v) : '$' + v)
const val = (p: Point) => (axis.value === 'cost' ? p.cost : p.speed)

const series = computed(() =>
  models
    .filter((m) => !hidden.value.has(m.name))
    .map((m) => {
      const shown = m.points.filter((p) => val(p) != null)
      return { m, shown, path: shown.map((p, i) => `${i ? 'L' : 'M'}${x(val(p)!).toFixed(1)},${y(p.index).toFixed(1)}`).join(' ') }
    }),
)

const toggle = (name: string) => {
  const s = new Set(hidden.value)
  s.has(name) ? s.delete(name) : s.add(name)
  hidden.value = s
}
const money = (v: number) => (v < 0.1 ? '$' + v.toFixed(3) : '$' + v.toFixed(2))
const isPick = (m: Model, p: Point) => m.name === 'GPT-6 Luna' && p.effort === 'medium'
</script>

<template>
  <div class="wp-mm">
    <div class="wp-mm-bar">
      <div class="seg">
        <button :class="{ on: axis === 'cost' }" @click="axis = 'cost'">Cost per task</button>
        <button :class="{ on: axis === 'speed' }" @click="axis = 'speed'">Speed</button>
      </div>
      <div class="seg" v-if="axis === 'cost'">
        <button :class="{ on: log }" @click="log = true">Log</button>
        <button :class="{ on: !log }" @click="log = false">Linear</button>
      </div>
      <div class="legend">
        <button v-for="m in models" :key="m.name" :class="{ off: hidden.has(m.name) }" @click="toggle(m.name)">
          <i :style="{ background: m.color }" />{{ m.name }}
        </button>
      </div>
    </div>

    <svg :viewBox="`0 0 ${W} ${H}`" role="img"
      aria-label="Intelligence Index against cost per task or speed for the latest Anthropic and OpenAI models. GPT-6 Luna is by far the cheapest and fastest; Claude Opus 5.5 is the most intelligent and among the most expensive.">
      <g class="grid">
        <line v-for="v in [20, 30, 40, 50, 60]" :key="'y' + v" :x1="L" :x2="W - R" :y1="y(v)" :y2="y(v)" />
        <text v-for="v in [20, 30, 40, 50, 60]" :key="'yt' + v" :x="L - 8" :y="y(v) + 4" text-anchor="end">{{ v }}</text>
        <line v-for="v in xTicks" :key="'x' + v" :x1="x(v)" :x2="x(v)" :y1="T" :y2="H - B" />
        <text v-for="v in xTicks" :key="'xt' + v" :x="x(v)" :y="H - B + 18" text-anchor="middle">{{ xLabel(v) }}</text>
      </g>
      <text class="axis" :x="(W + L) / 2" :y="H - 4" text-anchor="middle">
        {{ axis === 'cost' ? 'Cost per task (USD' + (log ? ', log scale' : '') + ') — left is cheaper' : 'Output speed (tokens/s) — right is faster' }}
      </text>
      <text class="axis" :x="14" :y="(H - B) / 2" :transform="`rotate(-90 14 ${(H - B) / 2})`" text-anchor="middle">Intelligence Index</text>

      <g v-for="s in series" :key="s.m.name">
        <path v-if="axis === 'cost'" :d="s.path" :stroke="s.m.color" fill="none" stroke-width="2.5" />
        <circle v-for="p in s.shown" :key="p.effort" :cx="x(val(p)!)" :cy="y(p.index)" :r="isPick(s.m, p) ? 7 : 4.5"
          :fill="s.m.color" :class="{ pick: isPick(s.m, p) }"
          @mouseenter="hover = { m: s.m, p, x: x(val(p)!), y: y(p.index) }" @mouseleave="hover = null" />
        <text v-if="s.shown.length" class="name" :fill="s.m.color"
          :x="x(val(s.shown[s.shown.length - 1])!) + 8" :y="y(s.shown[s.shown.length - 1].index) + ({ 'GPT-6 Sol': 22, 'Claude Fable 5.1': 12 }[s.m.name] ?? -6)">{{ s.m.name }}</text>
      </g>
      <g v-if="!hidden.has('GPT-6 Luna')" class="pick-label">
        <text :x="x(axis === 'cost' ? 0.017 : 143) + 12" :y="y(29.5) + 18">← today's default (medium)</text>
      </g>
    </svg>

    <div v-if="hover" class="tip" :style="{ left: (hover.x / W) * 100 + '%', top: (hover.y / H) * 100 + '%' }">
      <b :style="{ color: hover.m.color }">{{ hover.m.name }}</b> · {{ hover.p.effort }}<br />
      Index {{ hover.p.index }} · {{ money(hover.p.cost) }} per task<br />
      {{ hover.p.speed ?? '—' }} tokens/s · {{ hover.m.price }} per 1M in / out
    </div>
  </div>
</template>

<style scoped>
.wp-mm {
  position: relative;
  margin-top: 0.3rem;
}

.wp-mm-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1rem;
  margin-bottom: 0.3rem;
}

.seg {
  display: inline-flex;
  border: 1px solid #000;
  border-radius: 999px;
  overflow: hidden;
}

.seg button {
  padding: 0.15rem 0.7rem;
  font-size: 0.85rem;
  background: #fff;
}

.seg button.on {
  background: #000;
  color: var(--wp-yellow);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 0.8rem;
}

.legend button {
  font-size: 0.85rem;
  background: none;
}

.legend button.off {
  opacity: 0.3;
  text-decoration: line-through;
}

.legend i {
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  margin-right: 0.3rem;
  vertical-align: -0.05rem;
}

svg {
  width: 100%;
  height: auto;
  font-family: 'Rubik', sans-serif;
}

.grid line {
  stroke: #e5e5e5;
}

.grid text,
.axis {
  font-size: 12px;
  fill: var(--wp-grey);
}

.name {
  font-size: 12.5px;
  font-weight: 700;
}

circle {
  cursor: pointer;
  stroke: #fff;
  stroke-width: 1.5;
}

circle.pick {
  stroke: #000;
  stroke-width: 2.5;
}

.pick-label text {
  font-size: 12.5px;
  font-weight: 700;
  fill: #000;
}

.tip {
  position: absolute;
  transform: translate(-50%, calc(-100% - 14px));
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  line-height: 1.35;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 5;
}
</style>
