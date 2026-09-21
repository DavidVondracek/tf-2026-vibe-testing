<script setup lang="ts">
import { wifi } from '../agenda'

// `compact` is the one-line strip for the cover and the break slides; the default is the
// card used on the setup slide. `dark` inverts it for use over a photo.
defineProps<{ compact?: boolean; dark?: boolean }>()
</script>

<template>
  <div class="wp-wifi" :class="{ compact, dark }">
    <span class="wp-wifi-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
        <path d="M2.5 8.5a16 16 0 0 1 19 0" />
        <path d="M5.5 12.2a11 11 0 0 1 13 0" />
        <path d="M8.5 15.9a6 6 0 0 1 7 0" />
        <circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    </span>
    <div class="wp-wifi-fields">
      <div class="wp-wifi-field">
        <span class="k">Wi-Fi</span>
        <span class="v">{{ wifi.ssid }}</span>
      </div>
      <div class="wp-wifi-field">
        <span class="k">Password</span>
        <span class="v mono">{{ wifi.password }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wp-wifi {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  background: var(--wp-card);
  border-left: 6px solid var(--wp-yellow);
  padding: 0.9rem 1.3rem;
}

.wp-wifi-icon svg {
  width: 2.1rem;
  height: 2.1rem;
  color: var(--wp-black);
  display: block;
}

.wp-wifi-fields {
  display: flex;
  gap: 2.2rem;
}

.wp-wifi-field {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.wp-wifi-field .k {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wp-muted);
}

.wp-wifi-field .v {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--wp-black);
}

/* The password gets read off the screen and typed, so it is monospaced: no ambiguity
   between I and l, or between 0 and O. */
.wp-wifi-field .v.mono {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.02em;
}

/* One-line strip: cover slide and break slides. */
.wp-wifi.compact {
  gap: 0.8rem;
  padding: 0.5rem 0.9rem;
  background: rgba(255, 255, 255, 0.92);
  border-left-width: 5px;
}

.wp-wifi.compact .wp-wifi-icon svg {
  width: 1.4rem;
  height: 1.4rem;
}

.wp-wifi.compact .wp-wifi-fields {
  gap: 1.4rem;
}

.wp-wifi.compact .wp-wifi-field {
  flex-direction: row;
  align-items: baseline;
  gap: 0.45rem;
}

.wp-wifi.compact .wp-wifi-field .v {
  font-size: 1.05rem;
}

/* Over a photo. */
.wp-wifi.dark {
  background: rgba(0, 0, 0, 0.62);
  border-left-color: var(--wp-yellow);
}

.wp-wifi.dark .wp-wifi-icon svg,
.wp-wifi.dark .wp-wifi-field .v {
  color: #fff;
}

.wp-wifi.dark .wp-wifi-field .k {
  color: var(--wp-yellow);
}
</style>
