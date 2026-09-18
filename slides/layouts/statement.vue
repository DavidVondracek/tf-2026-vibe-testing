<template>
  <div class="slidev-layout wp-statement">
    <slot />
  </div>
</template>

<style scoped>
.wp-statement {
  background: var(--wp-black);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 4rem calc(var(--wp-footer) + 1rem);
}

.wp-statement :deep(h1) {
  font-size: 2.8rem;
  line-height: 1.15;
  color: #fff;
}

.wp-statement :deep(h1 + p) {
  color: #bdbdbd;
}

.wp-statement :deep(h2) {
  font-family: 'Bungee', sans-serif;
  font-weight: 400;
  color: var(--wp-yellow);
  font-size: 2.8rem;
  line-height: 1.2;
  margin-top: 1.4rem;
}

.wp-statement :deep(hr) {
  width: 6rem;
  border: 0;
  border-top: 3px solid var(--wp-yellow);
  margin: 1.2rem 0;
}
</style>
