// Usage: node mcp-measure.mjs <label> <command> [args...]
// Speaks MCP JSON-RPC over stdio, records tools/list and each step's tool result.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [label, cmd, ...args] = process.argv.slice(2);
const OUT = path.resolve('out', label);
fs.mkdirSync(OUT, { recursive: true });
const WS = path.resolve('ws', label); // cwd of the server = workspace root
fs.mkdirSync(WS, { recursive: true });

const child = spawn(cmd, args, { cwd: WS, stdio: ['pipe', 'pipe', 'inherit'] });
let buf = '';
const pending = new Map();
let nextId = 1;
child.stdout.on('data', d => {
  buf += d.toString('utf8');
  let i;
  while ((i = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, i); buf = buf.slice(i + 1);
    if (!line.trim()) continue;
    const msg = JSON.parse(line);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)({ msg, raw: line }); pending.delete(msg.id); }
  }
});
const send = o => child.stdin.write(JSON.stringify(o) + '\n');
const req = (method, params) => new Promise(res => { const id = nextId++; pending.set(id, res); send({ jsonrpc: '2.0', id, method, params }); });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const steps = [];
async function call(step, name, a) {
  const { msg, raw } = await req('tools/call', { name, arguments: a });
  const text = (msg.result?.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');
  fs.writeFileSync(path.join(OUT, `${String(steps.length + 1).padStart(2, '0')}-${step}.txt`), text);
  const lm = text.match(/\[Snapshot\]\(([^)]+)\)/);
  steps.push({ step, tool: name, args: a, linkedSnapshotFile: lm ? lm[1] : null, linkedSnapshotBytes: lm ? fs.statSync(path.resolve(WS, lm[1])).size : 0, rawJsonRpcBytes: Buffer.byteLength(raw), textBytes: Buffer.byteLength(text), isError: !!msg.result?.isError });
  return text;
}
const refFor = (text, re) => { const m = text.match(re); if (!m) throw new Error('ref not found for ' + re + '\n' + text.slice(0, 3000)); return m[1]; };

await req('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'measure', version: '1' } });
send({ jsonrpc: '2.0', method: 'notifications/initialized' });
const tl = await req('tools/list', {});
fs.writeFileSync(path.join(OUT, 'tools-list.json'), tl.raw);
fs.writeFileSync(path.join(OUT, 'tools-array.json'), JSON.stringify(tl.msg.result.tools));

const clickSchema = tl.msg.result.tools.find(x => x.name === 'browser_click').inputSchema.properties;
const refKey = clickSchema.target ? 'target' : 'ref';
const click = (step, element, ref) => call(step, 'browser_click', { element, [refKey]: ref });
// the snapshot the agent could see: inline yaml, or the linked file (agent pays for it only if it reads it)
const snap = text => { const m = text.match(/\[Snapshot\]\(([^)]+)\)/); return m ? fs.readFileSync(path.resolve(WS, m[1]), 'utf8') : text; };

let t = await call('navigate-landing', 'browser_navigate', { url: 'https://foodora.lovable.app/' });
await sleep(3000); // let the SPA load the restaurant list (not counted)
t = await call('snapshot-landing', 'browser_snapshot', {});
t = await click('open-restaurant-1', 'Burger Palace restaurant link', refFor(snap(t), /link "Burger Palace" \[ref=(e\d+)\]/));
let s = snap(t);
s = s.slice(s.indexOf('link "Classic Beef Burger'));
t = await click('add-classic-beef-burger', 'Add Classic Beef Burger button', refFor(s, /button \[ref=(e\d+)\]/));
t = await click('open-cart', 'Cart button', refFor(snap(t), /button "Cart[^"]*" \[ref=(e\d+)\]/));
t = await click('proceed-to-checkout', 'Proceed to Checkout button', refFor(snap(t), /button "Proceed to Checkout" \[ref=(e\d+)\]/));
if (!/\/checkout/.test(t)) console.error('WARN: checkout URL not seen in last result');

await call('close', 'browser_close', {});
fs.writeFileSync(path.join(OUT, 'steps.json'), JSON.stringify({ toolsListBytes: Buffer.byteLength(tl.raw), toolsArrayBytes: Buffer.byteLength(JSON.stringify(tl.msg.result.tools)), toolCount: tl.msg.result.tools.length, toolNames: tl.msg.result.tools.map(x => x.name), steps }, null, 2));
// list any files the server wrote into its workspace
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
console.log('files written by server:', walk(WS).map(f => `${path.relative(WS, f)} ${fs.statSync(f).size}`));
child.kill();
process.exit(0);
