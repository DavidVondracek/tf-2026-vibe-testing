<script setup lang="ts">
import Countdown from '../components/Countdown.vue'
</script>

<!-- Stays on screen during long work blocks: checklist left, countdown + checkpoints right. -->
<template>
  <div class="slidev-layout wp-work">
    <div class="wp-work-main">
      <slot />
    </div>
    <aside class="wp-work-side">
      <Countdown :until="$frontmatter.until" :minutes="$frontmatter.minutes" />
      <ol class="wp-work-checkpoints" v-if="$frontmatter.checkpoints">
        <li v-for="c in $frontmatter.checkpoints" :key="c.t"><b>{{ c.t }}</b> {{ c.v }}</li>
      </ol>
      <div class="wp-work-help">Stuck? Neighbour → README → raise your hand.</div>
    </aside>
  </div>
</template>

<style scoped>
.wp-work {
  display: grid;
  grid-template-columns: 1fr 19rem;
  gap: 2rem;
}

.wp-work-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.wp-work-side {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  justify-content: center;
}

.wp-work-checkpoints {
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: 5px solid var(--wp-yellow);
}

.wp-work-checkpoints li {
  font-size: 1.05rem;
  padding: 0.35rem 0.8rem;
  border-bottom: 1px solid #ddd;
}

.wp-work-checkpoints b {
  display: inline-block;
  width: 3.4rem;
}

.wp-work-help {
  font-size: 0.95rem;
  color: var(--wp-purple);
  font-weight: 500;
}
</style>
