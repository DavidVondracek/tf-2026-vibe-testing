import { defineShortcutsSetup } from '@slidev/types'

// Countdown controls for the current slide: + / − adjust by a minute, R restarts at full length,
// T asks for a clock time to count down to.
function timer(action: 'plus' | 'minus' | 'reset' | 'until') {
  return () => window.dispatchEvent(new CustomEvent('wp-timer', { detail: action }))
}

export default defineShortcutsSetup((nav, base) => [
  ...base,
  // Home / End jump to the first and last slide.
  { name: 'go_first', key: 'home', fn: () => nav.goFirst() },
  { name: 'go_last', key: 'end', fn: () => nav.goLast() },
  // Key codes, not characters: the key parser treats "+" and "-" as combination separators.
  { name: 'timer_plus', key: 'equal', fn: timer('plus'), autoRepeat: true },
  { name: 'timer_plus_numpad', key: 'numpadadd', fn: timer('plus'), autoRepeat: true },
  { name: 'timer_minus', key: 'minus', fn: timer('minus'), autoRepeat: true },
  { name: 'timer_minus_numpad', key: 'numpadsubtract', fn: timer('minus'), autoRepeat: true },
  { name: 'timer_reset', key: 'r', fn: timer('reset') },
  { name: 'timer_until', key: 't', fn: timer('until') },
])
