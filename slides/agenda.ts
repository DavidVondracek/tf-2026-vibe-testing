export interface Block {
  id: string
  time: string
  title: string
  pause?: boolean
}

export const agenda: Block[] = [
  { id: 'kickoff', time: '09:00', title: 'Kick-off: Speed Gap Diagnostic' },
  { id: 'stack', time: '09:15', title: 'Concepts: The New Stack' },
  { id: 'break1', time: '09:55', title: 'Break', pause: true },
  { id: 'zoo', time: '10:10', title: 'The Zoo' },
  { id: 'teams', time: '11:50', title: 'Teams & Mission' },
  { id: 'lunch', time: '12:00', title: 'Lunch', pause: true },
  { id: 'build', time: '13:00', title: 'Build One Thing' },
  { id: 'swap', time: '14:30', title: 'SKILL.md Swap' },
  { id: 'break2', time: '15:00', title: 'Break', pause: true },
  { id: 'battle', time: '15:15', title: 'Speed Gap Battle' },
  { id: 'wrap', time: '16:15', title: 'Wrap-up & Q&A' },
]

export const repoUrl = 'https://github.com/Wopee-io/tf-2026-vibe-testing-web-apps'
export const appUrl = 'https://foodora.lovable.app/'

export function blockTitle(id?: string) {
  return agenda.find((b) => b.id === id)?.title
}

export function nextBlock(id?: string) {
  const i = agenda.findIndex((b) => b.id === id)
  return i >= 0 ? agenda[i + 1] : undefined
}
