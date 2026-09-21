// Usage: node cli-measure.mjs <path-to-playwright-bin>
// Runs the same Foodora task through `playwright cli`, recording stdout per command,
// the snapshot file each command links, and `find` output (targeted alternative to reading the file).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PW = process.argv[2];
const label = 'cli';
const OUT = path.resolve('out', label);
const WS = path.resolve('ws', label);
fs.rmSync(OUT, { recursive: true, force: true }); fs.rmSync(WS, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(WS, { recursive: true });
const SESSION = `measure-${Date.now()}`;
const sleep = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

const steps = [];
function run(step, args, { record = true } = {}) {
  let out;
  try { out = execFileSync(PW, ['cli', `-s=${SESSION}`, ...args], { cwd: WS, encoding: 'utf8' }); }
  catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
  if (!record) return out;
  fs.writeFileSync(path.join(OUT, `${String(steps.length + 1).padStart(2, '0')}-${step}.txt`), out);
  const lm = out.match(/\[Snapshot\]\(([^)]+)\)/);
  const file = lm ? path.resolve(WS, lm[1]) : null;
  steps.push({ step, cmd: `playwright cli -s=<session> ${args.join(' ')}`, stdoutBytes: Buffer.byteLength(out), linkedSnapshotFile: lm ? lm[1] : null, linkedSnapshotBytes: file ? fs.statSync(file).size : 0 });
  return out;
}
const snap = out => { const m = out.match(/\[Snapshot\]\(([^)]+)\)/); return m ? fs.readFileSync(path.resolve(WS, m[1]), 'utf8') : out; };
const refFor = (text, re) => { const m = text.match(re); if (!m) throw new Error('ref not found ' + re + '\n' + text.slice(0, 2000)); return m[1]; };
const finds = [];
function find(step, q) {
  const out = run(step, ['find', q], { record: false });
  fs.writeFileSync(path.join(OUT, `find-${step}.txt`), out);
  finds.push({ step, cmd: `playwright cli -s=<session> find "${q}"`, stdoutBytes: Buffer.byteLength(out) });
}

let o = run('open-landing', ['open', 'https://foodora.lovable.app/']);
sleep(3000); // let the SPA load the restaurant list (not counted)
o = run('snapshot-landing', ['snapshot']);
find('before-open-restaurant-1', 'Burger Palace');
o = run('open-restaurant-1', ['click', refFor(snap(o), /link "Burger Palace" \[ref=(e\d+)\]/)]);
find('before-add-burger', 'Classic Beef Burger');
let s = snap(o); s = s.slice(s.indexOf('link "Classic Beef Burger'));
o = run('add-classic-beef-burger', ['click', refFor(s, /button \[ref=(e\d+)\]/)]);
find('before-open-cart', 'Cart');
o = run('open-cart', ['click', refFor(snap(o), /button "Cart[^"]*" \[ref=(e\d+)\]/)]);
find('before-checkout', 'Proceed to Checkout');
o = run('proceed-to-checkout', ['click', refFor(snap(o), /button "Proceed to Checkout" \[ref=(e\d+)\]/)]);
if (!/\/checkout/.test(o)) console.error('WARN: checkout URL not seen');
run('close', ['close']);

const help = execFileSync(PW, ['cli', '--help'], { encoding: 'utf8' });
fs.writeFileSync(path.join(OUT, 'cli-help.txt'), help);
fs.writeFileSync(path.join(OUT, 'steps.json'), JSON.stringify({ session: SESSION, helpBytes: Buffer.byteLength(help), steps, finds }, null, 2));
console.table(steps.map(({ cmd, linkedSnapshotFile, ...r }) => r));
console.table(finds.map(({ cmd, ...r }) => r));
