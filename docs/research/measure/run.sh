#!/usr/bin/env bash
# Re-runs the whole measurement. Needs network, and Chromium installed (npm run browsers).
set -euo pipefail
cd "$(dirname "$0")"
W="$(cd ../../.. && pwd)"   # the repository root: its playwright provides the CLI and the built-in MCP
[ -d node_modules/js-tiktoken ] || npm install --no-audit --no-fund
[ -d old-mcp/node_modules/@playwright/mcp ] || (mkdir -p old-mcp && cd old-mcp && npm init -y >/dev/null && npm install --no-audit --no-fund @playwright/mcp@0.0.41)
rm -rf out ws
node mcp-measure.mjs mcp-bundled-1.63 "$W/node_modules/.bin/playwright" mcp --headless --isolated
node mcp-measure.mjs mcp-0.0.82 "$PWD/node_modules/.bin/playwright-mcp" --headless --isolated
node mcp-measure.mjs mcp-0.0.41 "$PWD/old-mcp/node_modules/.bin/mcp-server-playwright" --headless --isolated
node cli-measure.mjs "$W/node_modules/.bin/playwright"
node tokens.mjs "$W"    # writes out/tokens.json
