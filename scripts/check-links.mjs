#!/usr/bin/env node
// Checks every relative Markdown link in the repository: the file exists, and where the link
// carries an #anchor, a heading in the target actually produces that slug.
//
// Cross-references only help if they work, and a renamed file breaks them silently.
// Run with `npm run links`.

import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const files = execFileSync('git', ['ls-files', '*.md'], { cwd: root, encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && !f.startsWith('slides/dist'))

const LINK = /\[([^\]]*)\]\(([^)\s]+)\)/g

// Mirrors GitHub's heading-slug rules closely enough for our own headings.
function slugsOf(file) {
  const out = new Set()
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = /^(#{1,6})\s+(.*)$/.exec(line)
    if (!m) continue
    out.add(
      m[2]
        .trim()
        .toLowerCase()
        .replace(/[`*_]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s/g, '-')
        .replace(/^-+|-+$/g, ''),
    )
  }
  return out
}

const broken = []
let checked = 0
let withAnchor = 0

for (const file of files) {
  const abs = join(root, file)
  const base = dirname(abs)
  const body = readFileSync(abs, 'utf8')
  for (const [, text, url] of body.matchAll(LINK)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue
    const [path, anchor] = url.split('#')
    const target = path === '' ? abs : resolve(base, path)
    if (!existsSync(target)) {
      broken.push(`${file}  [${text}](${url})  → no such file: ${relative(root, target)}`)
      continue
    }
    if (anchor && target.endsWith('.md')) {
      withAnchor++
      if (!slugsOf(target).has(anchor)) {
        broken.push(`${file}  [${text}](${url})  → no heading "#${anchor}" in ${relative(root, target)}`)
        continue
      }
    }
    checked++
  }
}

console.log(`\n  ${files.length} markdown files scanned`)
console.log(`  ${checked} relative links resolve (${withAnchor} anchors verified)`)

if (broken.length) {
  console.log(`\n\x1b[31m  ${broken.length} broken:\x1b[0m`)
  for (const b of broken) console.log(`    ${b}`)
  console.log('')
  process.exit(1)
}

console.log('\n\x1b[32m  All links good.\x1b[0m\n')
