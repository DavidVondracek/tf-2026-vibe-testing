<template>
  <div class="slidev-layout wp-demo" :class="{ 'with-image': $frontmatter.image }" :style="$frontmatter.image ? { backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.75) 100%), url(${$frontmatter.image})` } : {}">
    <div class="wp-demo-labels">
      <span class="wp-demo-big">Demo</span>
      <span v-for="line in [].concat($frontmatter.lines || [])" :key="line" class="wp-demo-line">{{ line }}</span>
    </div>
    <div class="wp-demo-by" v-if="$frontmatter.by">{{ $frontmatter.by }}</div>
  </div>
</template>

<style scoped>
.wp-demo {
  align-items: center !important;
  background-size: cover !important;
  background-position: center !important;
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 204, 0, 0.35) 0%, rgba(112, 48, 160, 0.25) 28%, transparent 55%),
    #111;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem 3.5rem;
}

.wp-demo-labels {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.wp-demo-labels span {
  background: #fff;
  color: #000;
  font-weight: 700;
  padding: 0.05em 0.25em;
  line-height: 1.2;
}

.wp-demo-big {
  font-family: 'Bungee', sans-serif;
  font-weight: 400 !important;
  font-size: 4rem;
}

.wp-demo-line {
  font-size: 1.8rem;
}

.wp-demo-by {
  margin-top: 1.2rem;
  font-family: 'Gruppo', sans-serif;
  font-weight: 700;
  color: var(--wp-yellow);
  font-size: 1.1rem;
}
.wp-demo.with-image {
  align-items: flex-end !important;
  padding-right: 4rem;
}

.wp-demo.with-image .wp-demo-labels {
  align-items: flex-end;
}
</style>
