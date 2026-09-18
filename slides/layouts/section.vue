<script setup lang="ts">
import Agenda from '../components/Agenda.vue'
</script>

<!-- Chapter opener: yellow title panel, optional photo on the right, "you are here" agenda. -->
<template>
  <div class="slidev-layout wp-section" :class="{ 'has-image': $frontmatter.image }">
    <div class="wp-section-panel">
      <div class="wp-section-emoji" v-if="$frontmatter.emoji">{{ $frontmatter.emoji }}</div>
      <slot />
      <Agenda v-if="$frontmatter.block && $frontmatter.agenda !== false" :current="$frontmatter.block" class="wp-section-agenda" />
    </div>
    <div v-if="$frontmatter.image" class="wp-section-image" :style="{ backgroundImage: `url(${$frontmatter.image})` }" />
    <img v-else-if="$frontmatter.monkey !== false" class="wp-section-monkey" src="/img/wopee-monkey.svg" alt="" />
  </div>
</template>

<style scoped>
.wp-section {
  padding: 0;
  display: flex;
  background: linear-gradient(135deg, var(--wp-yellow) 0%, var(--wp-yellow) 55%, var(--wp-orange) 100%);
}

.wp-section-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.6rem 3rem calc(var(--wp-footer) + 1rem);
}

.wp-section.has-image .wp-section-panel {
  flex: 0 0 50%;
}

.wp-section-image {
  flex: 1;
  background-size: cover;
  background-position: center;
  margin-bottom: var(--wp-footer);
  border-left: 8px solid var(--wp-black);
}

.wp-section-monkey {
  position: absolute;
  right: 3rem;
  bottom: var(--wp-footer);
  height: 62%;
  transform: rotate(-6deg);
  transform-origin: bottom center;
}

.wp-section-emoji {
  font-size: 2.4rem;
  line-height: 1;
  margin-bottom: 0.4rem;
}

.wp-section :deep(h1) {
  font-family: 'Bungee', sans-serif;
  font-weight: 400;
  font-size: 3rem;
  line-height: 1.05;
  margin: 0;
}

.wp-section :deep(p) {
  font-family: 'Rubik', sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.3;
  margin-top: 0.9rem;
  font-style: normal;
  color: var(--wp-black);
}

.wp-section-agenda {
  margin-top: 1rem;
  max-width: 24rem;
  font-size: 0.72rem;
}
</style>
