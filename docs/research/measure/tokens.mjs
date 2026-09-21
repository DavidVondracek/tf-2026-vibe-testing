// Usage: node tokens.mjs <workshop-repo-path>   (run after mcp-measure.mjs and cli-measure.mjs)
// Counts bytes, chars/4, o200k_base tokens (js-tiktoken, offline) and legacy Claude tokenizer (@anthropic-ai/tokenizer).
import fs from 'node:fs';
import path from 'node:path';
import { getEncoding } from 'js-tiktoken';
import { countTokens as claudeLegacy } from '@anthropic-ai/tokenizer';

const REPO = process.argv[2];
const enc = getEncoding('o200k_base');
const m = s => ({ bytes: Buffer.byteLength(s), chars4: Math.round(s.length / 4), o200k: enc.encode(s).length, claudeLegacy: claudeLegacy(s) });
const add = (a, b) => ({ bytes: a.bytes + b.bytes, chars4: a.chars4 + b.chars4, o200k: a.o200k + b.o200k, claudeLegacy: a.claudeLegacy + b.claudeLegacy });
const zero = { bytes: 0, chars4: 0, o200k: 0, claudeLegacy: 0 };
const sum = xs => xs.reduce(add, zero);
const rd = p => fs.readFileSync(p, 'utf8');
const rows = [];
const row = (group, name, v) => { rows.push({ group, name, ...v }); return v; };

// --- upfront
const skillDir = path.join(REPO, 'node_modules/playwright-core/lib/tools/skills/playwright-cli');
const skill = rd(path.join(skillDir, 'SKILL.md'));
const fm = skill.match(/^---\n[\s\S]*?\n---\n/)[0];
const refs = fs.readdirSync(path.join(skillDir, 'references')).map(f => rd(path.join(skillDir, 'references', f)));
const up = {};
up.cliFrontmatter = row('upfront', 'CLI skill frontmatter (always loaded)', m(fm));
up.cliSkill = row('upfront', 'CLI SKILL.md full (loaded when skill invoked)', m(skill));
up.cliRefs = row('upfront', `CLI references/*.md (${refs.length} files, on demand)`, sum(refs.map(m)));
up.cliHelp = row('upfront', 'CLI `--help` stdout (optional)', m(rd('out/cli/cli-help.txt')));
for (const lbl of ['mcp-bundled-1.63', 'mcp-0.0.82', 'mcp-0.0.41']) {
  const tools = JSON.parse(rd(`out/${lbl}/tools-array.json`));
  up[lbl] = row('upfront', `${lbl} tools/list tools[] JSON (${tools.length} tools)`, m(JSON.stringify(tools)));
  row('upfront', `${lbl} tools minimal {name,description,input_schema}`, m(JSON.stringify(tools.map(t => { const { $schema, ...s } = t.inputSchema; return { name: t.name, description: t.description, input_schema: s }; }))));
}

// --- per step
const TASK = ['navigate-landing', 'open-landing', 'snapshot-landing', 'open-restaurant-1', 'add-classic-beef-burger', 'open-cart', 'proceed-to-checkout'];
const totals = {};
function perStep(lbl, wsDir) {
  const j = JSON.parse(rd(`out/${lbl}/steps.json`));
  let returned = zero, files = zero;
  j.steps.forEach((s, i) => {
    if (!TASK.includes(s.step)) return;
    const txt = rd(`out/${lbl}/${String(i + 1).padStart(2, '0')}-${s.step}.txt`);
    const r = row(lbl, `${s.step} — returned to agent`, m(txt)); returned = add(returned, r);
    if (s.linkedSnapshotFile) { const f = row(lbl, `${s.step} — linked snapshot file (only if read)`, m(rd(path.join(wsDir, s.linkedSnapshotFile)))); files = add(files, f); }
  });
  let finds = zero;
  (j.finds || []).forEach(f => { finds = add(finds, row(lbl, `find ${f.step}`, m(rd(`out/${lbl}/find-${f.step}.txt`)))); });
  totals[lbl] = { returned, files, finds };
}
perStep('mcp-bundled-1.63', 'ws/mcp-bundled-1.63');
perStep('mcp-0.0.82', 'ws/mcp-0.0.82');
perStep('mcp-0.0.41', 'ws/mcp-0.0.41');
perStep('cli', 'ws/cli');

const T = {
  'MCP 0.0.41 (Oct 2025, inline snapshots)': { a: add(up['mcp-0.0.41'], totals['mcp-0.0.41'].returned) },
  'MCP bundled (playwright 1.63)': { a: add(up['mcp-bundled-1.63'], totals['mcp-bundled-1.63'].returned), b: add(add(up['mcp-bundled-1.63'], totals['mcp-bundled-1.63'].returned), totals['mcp-bundled-1.63'].files) },
  '@playwright/mcp 0.0.82': { a: add(up['mcp-0.0.82'], totals['mcp-0.0.82'].returned), b: add(add(up['mcp-0.0.82'], totals['mcp-0.0.82'].returned), totals['mcp-0.0.82'].files) },
  'CLI 1.63 (skill body loaded)': { a: add(up.cliSkill, totals.cli.returned), b: add(add(up.cliSkill, totals.cli.returned), totals.cli.files), c_find: add(add(up.cliSkill, totals.cli.returned), totals.cli.finds) },
  'CLI 1.63 (frontmatter only)': { a: add(up.cliFrontmatter, totals.cli.returned), b: add(add(up.cliFrontmatter, totals.cli.returned), totals.cli.files) },
};
fs.writeFileSync('out/tokens.json', JSON.stringify({ rows, totals, T }, null, 2));
console.table(rows);
for (const [k, v] of Object.entries(T)) for (const [s, x] of Object.entries(v)) console.log(k.padEnd(42), s.padEnd(7), JSON.stringify(x));
