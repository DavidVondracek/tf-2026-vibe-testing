#!/usr/bin/env node
// Runs after `npm install`: creates `.env` from `.env.example` the first time, never overwrites it.

import { copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const env = join(root, '.env')

if (!existsSync(env)) {
  copyFileSync(join(root, '.env.example'), env)
  console.log('Created .env from .env.example — fill in the Wopee.io values at Exhibit 4.')
}
