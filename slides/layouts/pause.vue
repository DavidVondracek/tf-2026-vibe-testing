<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import Countdown from '../components/Countdown.vue'
import Wifi from '../components/Wifi.vue'
import { blockStart, minutesBetween } from '../agenda'

const { $frontmatter } = useSlideContext()
const minutes = computed(() => {
  const start = blockStart($frontmatter.block)
  return start && $frontmatter.until ? minutesBetween(start, $frontmatter.until) : undefined
})
</script>

<!-- Break / lunch: full-bleed photo, the return time is the hero. -->
<template>
  <div class="slidev-layout wp-pause">
    <div v-if="$frontmatter.image" class="wp-photo" :style="{ backgroundImage: `url(${$frontmatter.image})` }" />
    <div class="wp-pause-shade" />
    <div class="wp-pause-what">{{ $frontmatter.emoji }} {{ $frontmatter.what }}</div>
    <div class="wp-pause-back">Back at {{ $frontmatter.until }}</div>
    <Countdown v-if="$frontmatter.until" :until="$frontmatter.until" :minutes="minutes" label="Starts again in" class="wp-pause-count" />
    <div class="wp-pause-note"><slot /></div>
    <!-- Laptops drop off the wifi over a break; this is exactly when people need it again. -->
    <Wifi compact dark class="wp-pause-wifi" />
  </div>
</template>

<style scoped>
.wp-pause {
  background: #000;
  position: relative;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3.5rem calc(var(--wp-footer) + 1.5rem);
}

.wp-pause-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.7) 45%, rgba(0, 0, 0, 0.15) 100%);
}

.wp-pause > :not(.wp-photo, .wp-pause-shade) {
  position: relative;
}

.wp-pause-what {
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.wp-pause-back {
  font-family: 'Bungee', sans-serif;
  font-size: 5rem;
  line-height: 1.05;
  color: var(--wp-yellow);
  margin: 0.4rem 0 1.2rem;
}

.wp-pause-count {
  align-self: flex-start;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid var(--wp-yellow);
}

.wp-pause-note {
  margin-top: 1.4rem;
  max-width: 28rem;
}

.wp-pause-note :deep(p) {
  color: #fff;
  font-size: 1.2rem;
}

/* In flow, not absolute: the layout sets `position: relative` on every child, and with
   Vue's scope attribute that rule outranks a plain class here. */
.wp-pause-wifi {
  align-self: flex-start;
  margin-top: 1.3rem;
}
</style>
