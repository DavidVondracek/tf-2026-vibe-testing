<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

// Counts down to a wall-clock time ("15:00"), so it stays right whichever slide is shown.
const props = defineProps<{ until: string; label?: string }>()

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => (timer = setInterval(() => (now.value = new Date()), 1000)))
onUnmounted(() => clearInterval(timer))

const remaining = computed(() => {
  const [h, m] = props.until.split(':').map(Number)
  const target = new Date(now.value)
  target.setHours(h, m, 0, 0)
  return Math.max(0, Math.floor((target.getTime() - now.value.getTime()) / 1000))
})

// Before the day starts (or in exports) show the full block length instead of hours.
const display = computed(() => {
  const s = remaining.value
  if (s === 0) return "Time's up"
  if (s >= 3 * 3600) return `until ${props.until}`
  const hh = Math.floor(s / 3600)
  const mm = Math.floor((s % 3600) / 60)
  const ss = s % 60
  return hh ? `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${mm}:${String(ss).padStart(2, '0')}`
})
</script>

<template>
  <div class="wp-countdown" :class="{ over: remaining === 0 }">
    <div class="wp-countdown-label">{{ label ?? `Time left · ends ${until}` }}</div>
    <div class="wp-countdown-value">{{ display }}</div>
  </div>
</template>

<style scoped>
.wp-countdown {
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
</style>
