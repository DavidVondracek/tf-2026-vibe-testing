<script setup lang="ts">
// Zoo scorecard; `active` highlights the exhibit being debriefed.
defineProps<{ active?: 'agent' | 'mcp' | 'cli' | 'wopee' }>()

const rows = [
  { id: 'agent', icon: '🤖', name: 'AI Coding Agent' },
  { id: 'mcp', icon: '🐍', name: 'Playwright MCP' },
  { id: 'cli', icon: '🦁', name: 'Playwright CLI' },
  { id: 'wopee', icon: '', name: 'Wopee.io' },
]
const cols = ['Setup', 'Tokens / cost', 'Reliability', 'Upkeep', 'Verdict']
</script>

<template>
  <table class="wp-score">
    <thead>
      <tr>
        <th />
        <th>Exhibit</th>
        <th v-for="c in cols" :key="c">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in rows" :key="r.id" :class="{ active: r.id === active, dim: active && r.id !== active }">
        <td class="icon">
          <img v-if="r.id === 'wopee'" src="/img/wopee-monkey.svg" alt="" />
          <template v-else>{{ r.icon }}</template>
        </td>
        <td class="name">{{ r.name }}</td>
        <td v-for="c in cols" :key="c" />
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.wp-score {
  table-layout: fixed;
  width: 100%;
}

.wp-score th:first-child {
  width: 3.4rem;
}

.wp-score th:nth-child(2) {
  width: 24%;
}

.wp-score td {
  height: 3.8rem;
  border-bottom: 2px solid #b3b3b3;
}

.wp-score td:nth-child(n + 3) {
  border-left: 1px solid #ddd;
}

.wp-score .icon {
  font-size: 1.8rem;
  text-align: center;
}

.wp-score .icon img {
  height: 2.2rem;
  margin: 0 auto;
}

.wp-score .name {
  font-weight: 700;
}

.wp-score tr.active td {
  background: var(--wp-yellow-light);
  border-bottom-color: var(--wp-black);
}

.wp-score tr.dim td {
  opacity: 0.45;
}
</style>
