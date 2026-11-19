#!/usr/bin/env node
// Screenshot slots for the Orbid help center.
//   node scripts/screenshots.mjs guide  -> regenerate docs/screenshots/GUIDE.md from the slots in the pages
//   node scripts/screenshots.mjs apply  -> insert a <Frame> under each slot whose image exists (slot stays as a comment)
//
// Slot format (one line, invisible on the site):
//   {/* screenshot: <id> | <what to show> | role=<client|lawyer|admin> | url=<app path> */}
// Image path: images/screenshots/<lang>/<id>.png   (lang = en | de | zh-TW | zh-CN)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const LANGS = { en: "", de: "de/", "zh-TW": "zh-TW/", "zh-CN": "zh-CN/" };
const SECTIONS = ["index.mdx", "getting-started", "clients", "law-firms", "admin", "help"];
const SLOT = /^\{\/\* screenshot: ([a-z0-9-]+) \| (.+?) \| role=(\w+)(?: \| url=(\S+))? \*\/\}$/;

export function pages(prefix) {
  const out = [];
  for (const s of SECTIONS) {
    const p = path.join(ROOT, prefix, s);
    if (!fs.existsSync(p)) continue;
    if (p.endsWith(".mdx")) out.push(p);
    else for (const f of fs.readdirSync(p).sort()) if (f.endsWith(".mdx")) out.push(path.join(p, f));
  }
  return out;
}

function slots(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const res = [];
  lines.forEach((l, i) => {
    const m = l.trim().match(SLOT);
    if (m) {
      const heading = lines.slice(0, i).reverse().find((x) => /^#{2,3} /.test(x)) || "";
      res.push({ id: m[1], what: m[2], role: m[3], url: m[4] || "", section: heading.replace(/^#+ /, "") });
    }
  });
  return res;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname;
const mode = isMain ? process.argv[2] || "guide" : null;
const have = (lang, id) => fs.existsSync(path.join(ROOT, "images/screenshots", lang, id + ".png"));

if (mode === "guide") {
  const en = pages("").flatMap((f) => slots(f).map((s) => ({ ...s, page: path.relative(ROOT, f) })));
  const dup = en.map((s) => s.id).filter((id, i, a) => a.indexOf(id) !== i);
  if (dup.length) {
    console.error("Duplicate slot ids:", [...new Set(dup)].join(", "));
    process.exit(1);
  }
  let md = `# Screenshot guide (generated — do not edit by hand)

Regenerate with \`node scripts/screenshots.mjs guide\`. ${en.length} slots.

## How to shoot

1. Use the mock-data accounts (one client, one lawyer, one firm admin). Use only fictional names (for example *Muster GmbH*, *Lena Weber*). No real people, emails or documents.
2. Browser window 1440×900, zoom 100%, light mode. Crop to the panel that matters.
3. Shoot every slot four times with the app language set to English, Deutsch, 繁體中文 and 简体中文. Save as \`images/screenshots/<lang>/<id>.png\` (lang = en, de, zh-TW, zh-CN).
4. Blur anything that looks like a real email, ID number or address.
5. Run \`node scripts/screenshots.mjs apply\`, then \`npx mint dev\` and look at every changed page.

## Mock data needed

- Client company *Muster GmbH* with matters in each status: pending review, accepted, quoted, paid, in progress, delivered, declined (with a reason, reopenable).
- One matter with an open document request (an identity item asked for again).
- One delivered matter with two files, one with a translation copy.
- Firm *Kanzlei Beispiel* with three members (admin, lawyer, assistant), five library documents in different processing states, and some audit-log entries.

## Slots

| # | id | page — section | role | app URL | what to show | en | de | zh-TW | zh-CN |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
`;
  en.forEach((s, i) => {
    const c = (l) => (have(l, s.id) ? "✅" : "⬜");
    md += `| ${i + 1} | \`${s.id}\` | ${s.page} — ${s.section} | ${s.role} | \`${s.url}\` | ${s.what.replace(/\|/g, "/")} | ${c("en")} | ${c("de")} | ${c("zh-TW")} | ${c("zh-CN")} |\n`;
  });
  const miss = [];
  for (const [lang, pre] of Object.entries(LANGS)) {
    if (!pre) continue;
    for (const s of en) {
      const f = path.join(ROOT, pre, s.page);
      if (!fs.existsSync(f) || !fs.readFileSync(f, "utf8").includes(`screenshot: ${s.id} `)) miss.push(`${lang}: ${s.id}`);
    }
  }
  if (miss.length) md += `\n## Slots missing in translations\n\n${miss.map((m) => "- " + m).join("\n")}\n`;
  fs.mkdirSync(path.join(ROOT, "docs/screenshots"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "docs/screenshots/GUIDE.md"), md);
  console.log(`GUIDE.md: ${en.length} slots, ${miss.length} missing in translations`);
}

if (mode === "apply") {
  let n = 0;
  for (const [lang, pre] of Object.entries(LANGS)) {
    for (const f of pages(pre)) {
      const lines = fs.readFileSync(f, "utf8").split("\n");
      let changed = false;
      for (let i = lines.length - 1; i >= 0; i--) {
        const m = lines[i].trim().match(SLOT);
        if (!m) continue;
        const img = `/images/screenshots/${lang}/${m[1]}.png`;
        if (!have(lang, m[1]) || (lines[i + 2] || "").includes(img)) continue;
        lines.splice(i + 1, 0, `<Frame>\n  <img src="${img}" alt="${m[2].replace(/"/g, "'")}" />\n</Frame>`);
        changed = true;
        n++;
      }
      if (changed) fs.writeFileSync(f, lines.join("\n"));
    }
  }
  console.log(`inserted ${n} screenshots`);
}
