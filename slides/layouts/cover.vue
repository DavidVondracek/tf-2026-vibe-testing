<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// The cover stays up while people arrive: replay its entrance animation every 5 minutes.
const replay = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => (timer = setInterval(() => replay.value++, 5 * 60_000)))
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="slidev-layout wp-cover" :key="replay">
    <div class="wp-cover-text">
      <slot />
    </div>
    <img class="wp-cover-monkey" src="/img/wopee-monkey.svg" alt="" />
  </div>
</template>

<style scoped>
.wp-cover {
  background: linear-gradient(135deg, var(--wp-yellow) 0%, var(--wp-yellow) 55%, var(--wp-orange) 100%);
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
}

.wp-cover-text {
  flex: 1;
}

.wp-cover-monkey {
  height: 88%;
  margin-left: 1rem;
}

.wp-cover :deep(h1) {
  font-family: 'Bungee', sans-serif;
  font-weight: 400;
  font-size: 3.6rem;
  line-height: 1;
  margin: 0;
}

.wp-cover :deep(h2) {
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 1.45rem;
  line-height: 1.3;
  margin: 1rem 0 1.6rem;
}

.wp-cover :deep(p) {
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0.3rem 0;
}
</style>
