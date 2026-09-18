<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { blockTitle } from './agenda'

const { $frontmatter } = useSlideContext()
const label = computed(() => $frontmatter.label ?? blockTitle($frontmatter.block))
const hidden = computed(() => ['cover', 'demo', 'pause', 'closing', 'exhibit', 'statement'].includes($frontmatter.layout))
</script>

<template>
  <div v-if="!hidden" class="wp-top">
    <span v-if="label && $frontmatter.layout !== 'section'" class="wp-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.wp-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--wp-yellow);
  z-index: 5;
}

.wp-label {
  position: absolute;
  top: 14px;
  right: 28px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wp-muted);
}
</style>
