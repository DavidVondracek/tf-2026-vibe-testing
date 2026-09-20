<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onSlideEnter, useNav, useSlideContext } from '@slidev/client'
import { eventDate } from '../agenda'

// On the workshop day the timer ends at the wall-clock time `until`; on any other day (rehearsal)
// it starts with `minutes` when the slide first opens. Either way it keeps running while you are on
// other slides, can be adjusted (+ / − / R, or the hover buttons), and is shared between the
// presenter and audience windows through localStorage.
const props = defineProps<{ until: string; minutes?: number; label?: string }>()

const { $page, $nav } = useSlideContext()
const { isPrintMode } = useNav()
const storageKey = `wp-timer:${eventDate}:${props.until}:${props.minutes ?? ''}`

const now = ref(Date.now())
const endsAt = ref<number | undefined>(load())

function load(): number | undefined {
  try {
    const v = Number(localStorage.getItem(storageKey))
    return Number.isFinite(v) && v > 0 ? v : undefined
  } catch {
    return undefined
  }
}

function save(v: number) {
  now.value = Date.now()
  endsAt.value = v
  try {
    localStorage.setItem(storageKey, String(v))
  } catch {}
}

function todayString(t: number) {
  const d = new Date(t)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const isEventDay = computed(() => todayString(now.value) === eventDate || !props.minutes)

function wallClockEnd() {
  const [h, m] = props.until.split(':').map(Number)
  const d = new Date(now.value)
  d.setHours(h, m, 0, 0)
  return d.getTime()
}

function fullLength() {
  return Date.now() + (props.minutes ?? 0) * 60_000
}

// A saved timer that ended more than 30 min ago is stale: start fresh.
function ensureStarted() {
  const saved = load()
  if (saved && saved > Date.now() - 30 * 60_000) {
    endsAt.value = saved
    return
  }
  save(isEventDay.value ? wallClockEnd() : fullLength())
}

function onAction(e: Event) {
  if ($page.value !== $nav.value.currentSlideNo) return
  const action = (e as CustomEvent).detail
  if (!endsAt.value) ensureStarted()
  if (action === 'plus') save(endsAt.value! + 60_000)
  if (action === 'minus') save(Math.max(Date.now(), endsAt.value! - 60_000))
  if (action === 'reset') save(fullLength())
}

function onStorage(e: StorageEvent) {
  if (e.key === storageKey) endsAt.value = load()
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => (now.value = Date.now()), 1000)
  window.addEventListener('wp-timer', onAction)
  window.addEventListener('storage', onStorage)
})
onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('wp-timer', onAction)
  window.removeEventListener('storage', onStorage)
})
onSlideEnter(() => {
  if (!isPrintMode.value) ensureStarted()
})

const remaining = computed(() => {
  if (isPrintMode.value) return (props.minutes ?? 0) * 60
  const end = endsAt.value ?? (isEventDay.value ? wallClockEnd() : now.value + (props.minutes ?? 0) * 60_000)
  return Math.max(0, Math.round((end - now.value) / 1000))
})

const display = computed(() => {
  const s = remaining.value
  if (s === 0) return "Time's up"
  const hh = Math.floor(s / 3600)
  const mm = Math.floor((s % 3600) / 60)
  const ss = s % 60
  return hh ? `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${mm}:${String(ss).padStart(2, '0')}`
})

const fire = (action: string) => window.dispatchEvent(new CustomEvent('wp-timer', { detail: action }))
</script>

<template>
  <div class="wp-countdown" :class="{ over: remaining === 0, soon: remaining > 0 && remaining <= 300 }">
    <div class="wp-countdown-label">{{ label ?? `Time left · ends ${until}` }}</div>
    <div class="wp-countdown-value">{{ display }}</div>
    <div class="wp-countdown-controls">
      <button title="One minute less (−)" @click.stop="fire('minus')">−1</button>
      <button title="Restart at full length (R)" @click.stop="fire('reset')">↺</button>
      <button title="One minute more (+)" @click.stop="fire('plus')">+1</button>
    </div>
  </div>
</template>

<style scoped>
.wp-countdown {
  position: relative;
  background: var(--wp-black);
  color: var(--wp-yellow);
  padding: 0.8rem 1.2rem 1rem;
  text-align: center;
}

.wp-countdown-label {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
}

.wp-countdown-value {
  font-family: 'Bungee', sans-serif;
  font-size: 3.2rem;
  line-height: 1.1;
}

.wp-countdown.over .wp-countdown-value {
  color: #fff;
  font-size: 2rem;
}

.wp-countdown-controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1.6rem;
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.wp-countdown:hover .wp-countdown-controls {
  opacity: 1;
}

.wp-countdown-controls button {
  background: var(--wp-black);
  color: var(--wp-yellow);
  border: 1px solid var(--wp-yellow);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.05rem 0.5rem;
  cursor: pointer;
}
</style>
