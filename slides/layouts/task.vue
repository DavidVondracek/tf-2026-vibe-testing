<script setup lang="ts">
import Countdown from '../components/Countdown.vue'
import Qr from '../components/Qr.vue'
import { repoUrl } from '../agenda'
</script>

<!-- Hands-on task that stays up while people work: steps left, timebox / done / stuck / QR right. -->
<template>
  <div class="slidev-layout wp-task">
    <div class="wp-task-main">
      <div class="wp-task-kicker">{{ $frontmatter.kicker }}</div>
      <h1>{{ $frontmatter.goal }}</h1>
      <code class="wp-task-path" v-if="$frontmatter.path">{{ $frontmatter.path }}</code>
      <div class="wp-task-steps"><slot /></div>
    </div>
    <aside class="wp-task-side">
      <Countdown v-if="$frontmatter.until" :until="$frontmatter.until" :minutes="$frontmatter.minutes" />
      <div class="wp-task-box" v-if="$frontmatter.done">
        <div class="k">Done when</div>
        <div>{{ $frontmatter.done }}</div>
      </div>
      <div class="wp-task-box stuck">
        <div class="k">Stuck?</div>
        <div>{{ $frontmatter.stuck ?? 'Ask your neighbour → README troubleshooting → raise your hand.' }}</div>
      </div>
      <Qr v-if="$frontmatter.path" :url="`${repoUrl}/tree/main/${$frontmatter.path}`" size="5.5rem" caption="Open the folder" />
    </aside>
  </div>
</template>

<style scoped>
.wp-task {
  display: grid;
  grid-template-columns: 1fr 17rem;
  gap: 2rem;
}

.wp-task-main {
  display: flex;
  flex-direction: column;
}

/* The goal reads as a task statement, not a slide title. Title size costs ~40px of a
   layout that has to hold steps, a bonus, and a sidebar with a countdown and a QR. */
.wp-task-main h1 {
  font-size: 1.65rem;
  line-height: 1.2;
}

.wp-task-kicker {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wp-muted);
}

.wp-task-path {
  align-self: flex-start;
  margin-top: 0.4rem;
  font-size: 1.1rem;
  background: var(--wp-card);
  border-left: 5px solid var(--wp-yellow);
  padding: 0.3rem 0.7rem;
}

.wp-task-steps {
  margin-top: 0.8rem;
}

.wp-task-steps :deep(ol) {
  padding-left: 1.4rem;
}

.wp-task-steps :deep(li) {
  font-size: 1.1rem;
  margin: 0.35rem 0;
}

.wp-task-side {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: stretch;
}

.wp-task-box {
  background: var(--wp-card);
  border-top: 5px solid var(--wp-yellow);
  padding: 0.6rem 0.9rem;
  font-size: 1rem;
  line-height: 1.35;
}

.wp-task-box .k {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.wp-task-box.stuck {
  border-top-color: var(--wp-purple);
}

.wp-task-side .wp-qr {
  align-self: center;
}
</style>
