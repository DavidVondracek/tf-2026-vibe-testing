<!-- Closing slide mirrors the cover: yellow, monkey on the right. -->
<template>
  <div class="slidev-layout wp-closing">
    <div class="wp-closing-text">
      <slot />
    </div>
    <img class="wp-closing-monkey" src="/img/wopee-monkey.svg" alt="" />
  </div>
</template>

<style scoped>
.wp-closing {
  background: linear-gradient(135deg, var(--wp-yellow) 0%, var(--wp-yellow) 55%, var(--wp-orange) 100%);
  display: flex;
  align-items: center;
  padding: 2rem 3rem calc(var(--wp-footer) + 1rem);
}

.wp-closing-text {
  flex: 1;
}

.wp-closing-monkey {
  height: 82%;
  margin-left: 1rem;
}

.wp-closing :deep(h1) {
  font-family: 'Bungee', sans-serif;
  font-weight: 400;
  font-size: 4rem;
  line-height: 1;
  margin-bottom: 1.2rem;
}
</style>
