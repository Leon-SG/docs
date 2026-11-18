#!/usr/bin/env node
/** Verify the shipped multilingual manual, real navigation, and migration redirects. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const config = JSON.parse(fs.readFileSync('docs.json', 'utf8'));
const locales = ['en', 'de', 'zh-TW', 'zh-CN'];
// The pinned Mintlify CLI uses script codes; URLs keep the requested regional codes.
const navCode = (locale) => ({ 'zh-TW': 'zh-Hant', 'zh-CN': 'zh-Hans' }[locale] || locale);
const slugs = JSON.parse(fs.readFileSync('docs/plans/2026-10-28-manual-pages.json', 'utf8'));
const prefix = (locale) => locale === 'en' ? '' : `${locale}/`;
const route = (locale, slug) => `${prefix(locale)}product/${slug}`;
const read = (locale, slug) => fs.readFileSync(`${route(locale, slug)}.mdx`, 'utf8');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
function pages(node) {
  if (!node || typeof node !== 'object') return [];
  return Object.entries(node).flatMap(([key, val]) => key === 'pages'
    ? val.flatMap((entry) => typeof entry === 'string' ? [entry] : pages(entry))
    : Array.isArray(val) ? val.flatMap(pages) : []);
}
const languages = config.navigation.languages || [];
check(JSON.stringify(languages.map((l) => l.language)) === JSON.stringify(locales.map(navCode)), 'Expected native en/de/zh-Hant/zh-Hans language order');
check(languages.filter((l) => l.default).length === 1 && languages[0]?.default, 'English must be the sole default language');
check(!config.navigation.tabs && !config.navigation.global, 'Use one native root language navigation without mixed-language global links');
const ignoreRules = fs.readFileSync('.mintignore', 'utf8').split(/\r?\n/);
for (const historical of ['guides/**', 'concepts/**', 'faq/**', 'roles/**', 'use-cases/**', 'api-reference/**', 'docs/**', '.baoyu-skills/**', '/index.mdx']) {
  check(ignoreRules.includes(historical), `Historical material must be excluded from publication: ${historical}`);
}
const allPages = pages(config.navigation);
check(new Set(allPages).size === allPages.length, 'Duplicate page in navigation');
for (const page of allPages) {
  const file = `${page}.mdx`;
  for (const raw of ignoreRules) {
    if (!raw || raw.startsWith('#')) continue;
    const rule = raw.replace(/^\//, '');
    const ignored = raw.startsWith('/') ? file === rule
      : rule.endsWith('/**') ? file.startsWith(rule.slice(0, -2))
      : !rule.includes('/') ? file.split('/').includes(rule) : file === rule;
    check(!ignored, `Navigable page is excluded by .mintignore: ${file} (${raw})`);
  }
}


function profile(text) {
  // Compare structural coverage, exact machine identifiers, numeric facts, and references.
  const content = text.replace(/^---\n[\s\S]*?\n---\n/, '').split('{/* equivalents:start */}')[0];
  const lines = content.split('\n');
  return {
    headingLevels: lines.filter((l) => /^#{1,6} /.test(l)).map((l) => l.match(/^#+/)[0].length),
    numberedSteps: lines.filter((l) => /^\d+\. /.test(l)).map((l) => l.match(/^\d+/)[0]),
    bullets: lines.filter((l) => /^- /.test(l)).length,
    tableColumns: lines.filter((l) => /^\|/.test(l)).map((l) => l.split('|').length),
    fences: lines.filter((l) => /^```/.test(l)),
    identifiers: [...content.matchAll(/`([^`\n]+)`/g)].map((m) => m[1]).sort(),
    references: [...content.matchAll(/\[(S\d{2}(?:\s*,\s*S\d{2})*)\]/g)]
      .flatMap((m) => m[1].match(/S\d{2}/g)).sort(),
    explicitAnchors: [...content.matchAll(/<a id="([^"]+)"/g)].map((m) => m[1]),
    numericFacts: [...content.replace(/https?:\/\/[^\s)]+/g, '').replace(/\[[^\]]*\]\([^)]*\)/g, '').replace(/`[^`]+`/g, '').matchAll(/\b\d+(?:[.-]\d+)*\b/g)].map((m) => m[0]).sort(),
    links: [...content.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1].replace(/^\/(de|zh-TW|zh-CN)\//, '/')).sort(),
  };
}
const redirects = new Map((config.redirects || []).map((r) => [r.source, r.destination]));
check(redirects.size === config.redirects.length, 'Duplicate redirect source');
for (const [source, destination] of redirects) {
  check(source !== destination, `Self redirect ${source}`);
  check(!redirects.has(destination), `Redirect chain ${source} -> ${destination}`);
  check(allPages.includes(destination.slice(1)), `Redirect destination not navigable: ${destination}`);
}
function anchors(text) {
  const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  for (const m of text.matchAll(/^#{1,6}\s+(.+)$/gm)) ids.push(m[1].toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-'));
  return ids;
}
for (const locale of locales) {
  const nav = pages(languages.find((l) => l.language === navCode(locale)));
  const sourceIds = [...read(locale, 'sources').matchAll(/^\| (S\d{2}) \|/gm)].map((m) => m[1]);
  check(new Set(sourceIds).size === sourceIds.length, `${locale}: duplicate source ID`);
  const knownSourceIds = new Set(sourceIds);
  check(JSON.stringify(nav.map((p) => p.slice(prefix(locale).length)).sort()) === JSON.stringify(slugs.map((s) => `product/${s}`).sort()), `${locale}: navigation coverage/order differs`);
  check(languages.find((l) => l.language === navCode(locale))?.navbar?.primary?.label, `${locale}: missing localized navbar`);
  for (const slug of slugs) {
    const file = `${route(locale, slug)}.mdx`;
    if (!fs.existsSync(file)) { errors.push(`Missing ${file}`); continue; }
    const text = read(locale, slug);
    if (slug !== 'sources') {
      for (const id of profile(text).references) check(knownSourceIds.has(id), `${file}: undefined source ${id}`);
    }
    check(/^---\ntitle: "[^\n]+"\ndescription: "[^\n]+"\n---/u.test(text), `${file}: incomplete frontmatter`);
    check(!text.includes('**Answer:**'), `${file}: boilerplate answer label`);
    check(!/<img |!\[[^\]]*\]\(\/images\//.test(text), `${file}: unlocalized screenshot`);
    if (locale !== 'en') {
      const english = read('en', slug);
      check(text !== english, `${file}: untranslated page`);
      check(text.match(/^title: (.+)$/m)?.[1] !== english.match(/^title: (.+)$/m)?.[1], `${file}: untranslated title`);
      const a = profile(english), b = profile(text);
      for (const key of Object.keys(a)) {
        try { assert.deepEqual(b[key], a[key]); } catch { errors.push(`${file}: ${key} differs from English`); }
      }
      // Catch untouched source paragraphs without flagging source tables, identifiers, or the multilingual glossary.
      const paragraphs = english.split(/\n\s*\n/).filter((p) => p.length > 100 && /^[A-Za-z]/.test(p) && !p.startsWith('English |'));
      for (const para of paragraphs) check(!text.includes(para), `${file}: untranslated English paragraph`);
    }
    const eq = text.match(/\{\/\* equivalents:start \*\/\}([\s\S]*?)\{\/\* equivalents:end \*\/\}/);
    check(Boolean(eq), `${file}: missing equivalent-page links`);
    if (eq) for (const target of locales) check(eq[1].includes(`(/${route(target, slug)})`), `${file}: missing ${target} equivalent`);
    for (const m of text.matchAll(/(?:\]\(|href=")([^\s)"<>]+)[)"]/g)) {
      const href = m[1];
      if (!href.startsWith('/')) continue;
      const [pathname, fragment] = href.split('#');
      const target = pathname.replace(/^\//, '').replace(/\/$/, '') || 'index';
      const targetFile = `${target}.mdx`;
      check(fs.existsSync(targetFile), `${file}: broken link ${href}`);
      if (!eq?.[1].includes(`(${href})`)) check(target.startsWith(`${prefix(locale)}product/`) && (locale !== 'en' || !/^(de|zh-TW|zh-CN)\//.test(target)), `${file}: cross-language internal link ${href}`);
      if (fragment && fs.existsSync(targetFile)) check(anchors(fs.readFileSync(targetFile, 'utf8')).includes(fragment), `${file}: broken fragment ${href}`);
    }
  }
}
const legacyMap = JSON.parse(fs.readFileSync('docs/plans/2026-10-28-legacy-page-map.json', 'utf8'));
for (const [old, slug] of Object.entries(legacyMap)) check(redirects.get(old === 'index' ? '/' : `/${old}`) === `/product/${slug}`, `Missing canonical migration for ${old}`);
if (errors.length) {
  console.error(errors.map((e) => `FAIL: ${e}`).join('\n'));
  process.exit(1);
}
console.log(`PASS: ${locales.length} locales × ${slugs.length} pages (${allPages.length} navigable pages); structural/fact parity, local links, fragments, page equivalents, and ${redirects.size} redirects.`);
