#!/usr/bin/env node
/** Check publication scope and preserve the brand without requiring retired content. */
import fs from 'node:fs';
import path from 'node:path';

const config = JSON.parse(fs.readFileSync('docs.json', 'utf8'));
const slugs = JSON.parse(fs.readFileSync('docs/plans/2026-10-28-manual-pages.json', 'utf8'));
const roots = ['product', 'de/product', 'zh-TW/product', 'zh-CN/product'];
const disallowed = /\bbid\b|\btenders?\b|ausschreib|投標|招標|投标|招标|go\/no-go|cellmap/i;
const failures = [];
if (config.name !== 'Orbid AI') failures.push('Product name is not Orbid AI');
for (const root of roots) {
  for (const slug of slugs) {
    const file = path.join(root, `${slug}.mdx`);
    if (!fs.existsSync(file)) { failures.push(`Missing page: ${file}`); continue; }
    if (disallowed.test(fs.readFileSync(file, 'utf8'))) failures.push(`Retired product content: ${file}`);
  }
}
for (const file of ['docs.json', 'README.md', 'llms.txt', 'llms-full.txt']) {
  if (disallowed.test(fs.readFileSync(file, 'utf8'))) failures.push(`Retired product content: ${file}`);
}
if (failures.length) { console.error(failures.map((x) => `FAIL: ${x}`).join('\n')); process.exit(1); }
console.log(`PASS: ${roots.length * slugs.length} published pages, navigation, README, and indexes contain no retired product content.`);
