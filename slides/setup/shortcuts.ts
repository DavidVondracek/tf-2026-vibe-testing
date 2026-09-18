import { defineShortcutsSetup } from '@slidev/types'

// Countdown controls for the current slide: + / − adjust by a minute, R restarts at full length.
function timer(action: 'plus' | 'minus' | 'reset') {
  return () => window.dispatchEvent(new CustomEvent('wp-timer', { detail: action }))
}

export default defineShortcutsSetup((_nav, base) => [
  ...base,
  // Key codes, not characters: the key parser treats "+" and "-" as combination separators.
  { name: 'timer_plus', key: 'equal', fn: timer('plus'), autoRepeat: true },
  { name: 'timer_plus_numpad', key: 'numpadadd', fn: timer('plus'), autoRepeat: true },
  { name: 'timer_minus', key: 'minus', fn: timer('minus'), autoRepeat: true },
  { name: 'timer_minus_numpad', key: 'numpadsubtract', fn: timer('minus'), autoRepeat: true },
  { name: 'timer_reset', key: 'r', fn: timer('reset') },
])
