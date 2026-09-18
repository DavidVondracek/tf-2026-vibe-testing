<script setup lang="ts">
import { agenda } from '../agenda'

// Compact "you are here" agenda: past blocks faded, current block highlighted.
const props = defineProps<{ current: string }>()
const currentIndex = agenda.findIndex((b) => b.id === props.current)
</script>

<template>
  <ol class="wp-agenda">
    <li
      v-for="(b, i) in agenda"
      :key="b.id"
      :class="{ past: i < currentIndex, now: i === currentIndex, pause: b.pause }"
    >
      <span class="t">{{ b.time }}</span>
      <span class="n">{{ b.title }}</span>
    </li>
  </ol>
</template>

<style scoped>
.wp-agenda {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.95rem;
  line-height: 1.25;
}

.wp-agenda li {
  display: flex;
  gap: 0.8rem;
  padding: 0.08rem 0.6rem;
  font-size: inherit;
}

.wp-agenda .t {
  font-weight: 700;
  width: 3.2rem;
  flex-shrink: 0;
}

.wp-agenda li.pause {
  font-style: italic;
}

.wp-agenda li.past {
  opacity: 0.4;
}

.wp-agenda li.now {
  background: var(--wp-black);
  color: var(--wp-yellow);
  font-weight: 700;
}
</style>
