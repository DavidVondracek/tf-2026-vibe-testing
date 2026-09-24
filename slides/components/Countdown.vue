<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onSlideEnter, useNav, useSlideContext } from '@slidev/client'
import { eventDate } from '../agenda'

// Every time you open the slide the timer starts fresh: on the workshop day it counts down to the
// wall-clock time `until`, on any other day (rehearsal) it starts with `minutes`. A custom end time
// typed into the hover field ("until 10:00") wins over both until you press ↺. + / − / R and the hover
// buttons adjust it; the presenter and audience windows share it through localStorage.
const props = defineProps<{ until: string; minutes?: number; label?: string }>()

const { $page, $nav } = useSlideContext()
const { isPrintMode } = useNav()
const storageKey = `wp-timer:${eventDate}:${props.until}:${props.minutes ?? ''}`
const customKey = `${storageKey}:custom`
const customTime = ref('')

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

function wallClockEnd(at = props.until) {
  const [h, m] = at.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d.getTime()
}

function fullLength() {
  return Date.now() + (props.minutes ?? 0) * 60_000
}

function loadCustom(): string {
  try {
    const [time, day] = (localStorage.getItem(customKey) ?? '').split('@')
    return time && day === todayString(Date.now()) ? time : ''
  } catch {
    return ''
  }
}

// Opening the slide always restarts the countdown: at a custom end time if one is set and still
// ahead, otherwise at the default for today.
function restart() {
  customTime.value = loadCustom()
  if (customTime.value) {
    // A time that has already passed today means tomorrow (rehearsing the night before).
    let custom = wallClockEnd(customTime.value)
    if (custom <= Date.now()) custom += 24 * 60 * 60_000
    return save(custom)
  }
  save(isEventDay.value ? wallClockEnd() : fullLength())
}

// The slide swallows keystrokes, so an inline field cannot be typed into; a prompt can.
function askUntil() {
  const answer = window.prompt('Count down until (HH:MM, 24h). Empty = back to the default.', customTime.value || props.until)
  if (answer === null) return
  const t = answer.trim().replace('.', ':')
  if (t === '') return setCustom('')
  const m = t.match(/^(\d{1,2}):?(\d{2})$/)
  if (!m || +m[1] > 23 || +m[2] > 59) return
  setCustom(`${m[1].padStart(2, '0')}:${m[2]}`)
}

function setCustom(value: string) {
  customTime.value = value
  try {
    value ? localStorage.setItem(customKey, `${value}@${todayString(Date.now())}`) : localStorage.removeItem(customKey)
  } catch {}
  restart()
}

function onAction(e: Event) {
  if ($page.value !== $nav.value.currentSlideNo) return
  const action = (e as CustomEvent).detail
  if (!endsAt.value) restart()
  if (action === 'plus') save(endsAt.value! + 60_000)
  if (action === 'minus') save(Math.max(Date.now(), endsAt.value! - 60_000))
  if (action === 'reset') setCustom('')
  if (action === 'until') askUntil()
}

function onStorage(e: StorageEvent) {
  if (e.key === storageKey) endsAt.value = load()
  if (e.key === customKey) customTime.value = loadCustom()
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
  if (!isPrintMode.value) restart()
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
    <div class="wp-countdown-label">{{ label ?? 'Time left' }} · ends {{ customTime || until }}<span v-if="customTime" class="custom"> (moved)</span></div>
    <div class="wp-countdown-value">{{ display }}</div>
    <div class="wp-countdown-controls">
      <button title="One minute less (−)" @click.stop="($event.currentTarget as HTMLElement).blur(); fire('minus')">−1</button>
      <button :title="`Back to the schedule (R)`" @click.stop="($event.currentTarget as HTMLElement).blur(); fire('reset')">↺ {{ isEventDay ? until : minutes + ' min' }}</button>
      <button title="One minute more (+)" @click.stop="($event.currentTarget as HTMLElement).blur(); fire('plus')">+1</button>
      <button class="until" title="Count down to a clock time (T)" @click.stop="($event.currentTarget as HTMLElement).blur(); askUntil()">until {{ customTime || '…' }}</button>
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


.wp-countdown-label .custom {
  color: var(--wp-yellow);
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
