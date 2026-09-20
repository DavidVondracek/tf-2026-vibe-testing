<!-- Zoo exhibit sign: photo "enclosure" on the left, black plaque with the facts on the right. -->
<template>
  <div class="slidev-layout wp-exhibit">
    <div class="wp-exhibit-photo">
      <div class="wp-exhibit-clip">
        <div class="wp-photo" :style="{ backgroundImage: `url(${$frontmatter.image})` }" />
      </div>
      <div class="wp-exhibit-badge">
        <img v-if="$frontmatter.icon === 'monkey'" src="/img/wopee-monkey.svg" alt="" />
        <span v-else>{{ $frontmatter.icon }}</span>
      </div>
    </div>
    <div class="wp-exhibit-plaque">
      <div class="wp-exhibit-no">EXHIBIT {{ $frontmatter.no }}</div>
      <div class="wp-exhibit-name">{{ $frontmatter.name }}</div>
      <div class="wp-exhibit-tag">{{ $frontmatter.tagline }}</div>
      <dl class="wp-exhibit-facts">
        <template v-for="f in $frontmatter.facts" :key="f.k">
          <dt>{{ f.k }}</dt>
          <dd>{{ f.v }}</dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.wp-exhibit {
  padding: 0;
  display: flex;
  background: var(--wp-yellow);
}

.wp-exhibit-photo {
  flex: 0 0 48%;
  position: relative;
  margin-bottom: var(--wp-footer);
}

.wp-exhibit-clip {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.wp-exhibit-badge {
  position: absolute;
  right: -3.2rem;
  top: 2.2rem;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background: var(--wp-yellow);
  border: 5px solid var(--wp-black);
  display: grid;
  place-items: center;
  font-size: 3rem;
  z-index: 2;
}

.wp-exhibit-badge img {
  height: 4.6rem;
}

.wp-exhibit-plaque {
  flex: 1;
  margin: 2.2rem 2.4rem calc(var(--wp-footer) + 2rem) 4.2rem;
  background: var(--wp-black);
  color: #fff;
  border: 6px solid var(--wp-black);
  outline: 3px solid var(--wp-black);
  outline-offset: 6px;
  border-radius: 1.2rem;
  padding: 1.6rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wp-exhibit-no {
  font-family: 'Gruppo', sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 0.3em;
  color: var(--wp-yellow);
}

.wp-exhibit-name {
  font-family: 'Bungee', sans-serif;
  font-size: 2.6rem;
  line-height: 1.05;
  margin: 0.4rem 0 0.6rem;
}

.wp-exhibit-tag {
  font-size: 1.15rem;
  color: #e0e0e0;
  margin-bottom: 1.2rem;
}

.wp-exhibit-facts {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
  border-top: 1px solid #444;
  padding-top: 1rem;
}

.wp-exhibit-facts dt {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wp-yellow);
  padding-top: 0.2rem;
}

.wp-exhibit-facts dd {
  margin: 0;
  font-size: 1.05rem;
}
</style>
