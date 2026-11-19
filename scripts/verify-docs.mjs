#!/usr/bin/env node
// Quality gates for the Orbid help center. Exit 1 on any failure.
//   node scripts/verify-docs.mjs
import fs from "node:fs";
import path from "node:path";
import { pages } from "./screenshots.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const LANGS = { en: "", de: "de/", "zh-TW": "zh-TW/", "zh-CN": "zh-CN/" };
const errors = [];
const err = (f, msg) => errors.push(`${path.relative(ROOT, f)}: ${msg}`);

// Words a non-technical client or lawyer should not meet (outside screenshot comments).
const JARGON = {
  en: /\b(MiB|v[12]|inspected|implementation|deploy(ed|ment)?|feature (flag|switch)|server|backend|frontend|endpoint|API|token|pipeline|resumable|fallback|checksum|integrity|cache|sync(hroni[sz]e)?|status code|best effort|placeholder)\b/i,
  de: /\b(MiB|v[12]|Server|Backend|Frontend|Endpunkt|API|Token|Pipeline|Fallback|Prüfsumme|Feature-Flag|Deployment|Platzhalter)\b/i,
  "zh-TW": /MiB|\bv[12]\b|伺服器|後端|前端|端點|API|權杖|Token|管線|備援|雜湊|功能旗標|佈署|布署|佔位/,
  "zh-CN": /MiB|\bv[12]\b|服务器|后端|前端|端点|API|令牌|Token|管线|兜底|哈希|功能开关|部署|占位/,
};
const MAINLAND_IN_TW = /信息|默认|登录|账号|帐号|软件|视频|质量|文件夹|链接|设置|支持|网络|数据库|服务器|程序/;
const TRAD_IN_CN = /[這個們時與為發說還麼後裡應會將點]/;

const docs = JSON.parse(fs.readFileSync(path.join(ROOT, "docs.json"), "utf8"));
const exists = (p) => fs.existsSync(path.join(ROOT, p + ".mdx")) || fs.existsSync(path.join(ROOT, p, "index.mdx"));

// 1. navigation ↔ files
const navPages = new Set();
for (const l of docs.navigation.languages) for (const g of l.groups) for (const p of g.pages) {
  navPages.add(p);
  if (!exists(p)) errors.push(`docs.json: nav page missing file: ${p}`);
}

const enPages = pages("").map((f) => path.relative(ROOT, f));
for (const [lang, pre] of Object.entries(LANGS)) {
  for (const rel of enPages) {
    const f = path.join(ROOT, pre, rel);
    if (!fs.existsSync(f)) { err(f, "missing translation"); continue; }
    if (!navPages.has((pre + rel).replace(/\.mdx$/, ""))) err(f, "not in navigation");
    const raw = fs.readFileSync(f, "utf8");
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) { err(f, "no frontmatter"); continue; }
    const get = (k) => (fm[1].match(new RegExp(`^${k}: "(.*)"`, "m")) || [])[1];
    const title = get("title"), desc = get("description");
    if (!title) err(f, "no title");
    if (!desc) err(f, "no description");
    if (!/^icon: /m.test(fm[1])) err(f, "no icon");
    const cjk = lang.startsWith("zh");
    if (desc && (cjk ? desc.length > 90 || desc.length < 40 : desc.length > 165 || desc.length < 90)) err(f, `description length ${desc.length}`);
    if (title && title.length > (cjk ? 26 : 60)) err(f, `title too long (${title.length})`);

    const body = raw.slice(fm[0].length).split("\n").filter((l) => !l.trim().startsWith("{/* screenshot:")).join("\n");
    const m = body.match(JARGON[lang]);
    if (m) err(f, `technical term "${m[0]}"`);
    if (lang === "zh-TW") { const x = body.match(MAINLAND_IN_TW); if (x) err(f, `Mainland term "${x[0]}"`); }
    if (lang === "zh-CN") { const x = body.match(TRAD_IN_CN); if (x) err(f, `Traditional char "${x[0]}"`); }
    if (lang !== "en") {
      // untranslated English prose: a line with 4+ common English function words outside bold labels/code
      for (const line of body.split("\n")) {
        const clean = line.replace(/\*\*[^*]+\*\*|`[^`]+`|\([^)]*\)|<[^>]+>|https?:\S+/g, " ");
        const en = (clean.match(/\b(the|and|you|your|to|of|is|are|for|with|this|that|can|when|if|it)\b/g) || []).length;
        if (en >= 4) { err(f, `untranslated? "${line.trim().slice(0, 70)}"`); break; }
      }
    }
    // internal links
    for (const [, href] of raw.matchAll(/(?:\]\(|href=")(\/[^)"#\s]*)/g)) {
      const p = href.replace(/^\//, "").replace(/\/$/, "");
      if (p.startsWith("images/")) { if (!fs.existsSync(path.join(ROOT, p))) err(f, `missing image ${href}`); continue; }
      if (p && !exists(p)) err(f, `broken link ${href}`);
      if (pre && p && !p.startsWith(pre.replace(/\/$/, ""))) err(f, `link leaves language: ${href}`);
    }
    // balanced common components
    for (const c of ["Steps", "Step", "CardGroup", "Columns", "AccordionGroup", "Accordion", "Tabs", "Tab", "Frame", "Note", "Tip", "Warning", "Info"]) {
      const open = (raw.match(new RegExp(`<${c}[\\s>]`, "g")) || []).length;
      const close = (raw.match(new RegExp(`</${c}>`, "g")) || []).length;
      if (open !== close) err(f, `<${c}> open ${open} / close ${close}`);
    }
  }
}

if (errors.length) {
  console.log(errors.join("\n"));
  console.log(`\n✗ ${errors.length} problem(s)`);
  process.exit(1);
}
console.log(`✓ docs gates passed (${enPages.length} pages × ${Object.keys(LANGS).length} languages)`);
