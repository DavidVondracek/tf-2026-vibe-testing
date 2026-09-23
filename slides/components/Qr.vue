<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, watchEffect } from 'vue'

// QR code rendered locally (no network), for links attendees open on their laptops. Error correction
// 'L' keeps the modules as large as possible, so the code scans from the back of the room.
const props = withDefaults(defineProps<{ url: string; size?: string; caption?: string }>(), { size: '8rem' })
const svg = ref('')
watchEffect(async () => {
  svg.value = await QRCode.toString(props.url, { type: 'svg', margin: 1, errorCorrectionLevel: 'L', color: { dark: '#000000', light: '#ffffff' } })
})
</script>

<template>
  <figure class="wp-qr">
    <div class="wp-qr-code" :style="{ width: size, height: size }" v-html="svg" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.wp-qr {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.wp-qr-code {
  background: #fff;
  border: 4px solid var(--wp-yellow);
}

.wp-qr-code :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.wp-qr figcaption {
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.3rem;
}
</style>
