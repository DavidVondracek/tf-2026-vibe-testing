#!/usr/bin/env node
// `npm run agents [-- <folder>]` — sets up Playwright's Test Agents for Copilot in VS Code.
// Runs `init-agents` for the folder's config (default: Exhibit 2), then fixes the two things it
// gets wrong for this workshop: it drops `--config` from the MCP server in `.vscode/mcp.json`, and it
// pins every agent to one model, which would override the model picked in Copilot Chat.

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const folder = relative(root, join(root, process.argv[2] ?? 'experiments/1_Zoo/2-PlaywrightAgents')).replaceAll('\\', '/')
const config = `${folder}/playwright.config.ts`

if (!existsSync(join(root, config))) {
  console.error(`No ${config}. Pass the folder that holds your playwright.config.ts, e.g. npm run agents -- teams/team-3`)
  process.exit(1)
}

execFileSync('npx', ['playwright', 'init-agents', '--loop=vscode', '--prompts', '--config', config], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

const mcpPath = join(root, '.vscode', 'mcp.json')
const mcp = JSON.parse(readFileSync(mcpPath, 'utf8'))
mcp.servers['playwright-test'] = {
  type: 'stdio',
  command: 'npx',
  args: ['playwright', 'run-test-mcp-server', '--config', `\${workspaceFolder}/${folder}`],
}
writeFileSync(mcpPath, JSON.stringify(mcp, null, 2) + '\n')

const agentsDir = join(root, '.github', 'agents')
for (const file of readdirSync(agentsDir).filter((f) => f.endsWith('.agent.md'))) {
  const path = join(agentsDir, file)
  writeFileSync(path, readFileSync(path, 'utf8').replace(/^model:.*\r?\n/m, ''))
}

console.log(`\n  Agents ready for ${folder}. Reload VS Code: Ctrl/Cmd+Shift+P → Developer: Reload Window.\n`)
