<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { nextBlock } from './agenda'

const { $frontmatter } = useSlideContext()
const next = computed(() => nextBlock($frontmatter.block))
</script>

<template>
  <footer v-if="$frontmatter.layout !== 'cover'" class="wp-footer">
    <img src="/img/wopee-wordmark.svg" alt="Wopee.io" />
    <span v-if="next" class="wp-next">Next · {{ next.time }} {{ next.title }}</span>
    <span v-else>Vibe Testing Lab / Tesena Fest 2026</span>
  </footer>
</template>

<style scoped>
.wp-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--wp-footer);
  background: var(--wp-yellow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 5;
}

.wp-footer img {
  height: 18px;
}

.wp-footer span {
  font-family: 'Gruppo', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #000;
}

.wp-footer .wp-next {
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 500;
}
</style>
