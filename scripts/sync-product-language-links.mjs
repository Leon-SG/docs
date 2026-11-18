#!/usr/bin/env node
import fs from 'node:fs';
const slugs = JSON.parse(fs.readFileSync('docs/plans/2026-10-28-manual-pages.json', 'utf8'));
const labels = { en: 'Page languages', de: 'Sprachversionen dieser Seite', 'zh-TW': '本頁語言版本', 'zh-CN': '本页语言版本' };
const names = { en: 'English', de: 'Deutsch', 'zh-TW': '繁體中文', 'zh-CN': '简体中文' };
const prefix = (locale) => locale === 'en' ? '' : `${locale}/`;
for (const locale of Object.keys(labels)) for (const slug of slugs) {
  const file = `${prefix(locale)}product/${slug}.mdx`;
  const source = fs.readFileSync(file, 'utf8').split('{/* equivalents:start */}')[0].trimEnd();
  const links = Object.keys(labels).map((target) => `[${names[target]}](/${prefix(target)}product/${slug})`).join(' · ');
  fs.writeFileSync(file, `${source}\n\n{/* equivalents:start */}\n${labels[locale]}: ${links}\n{/* equivalents:end */}\n`);
}
console.log(`Synchronized equivalent-page links for ${slugs.length} pages × ${Object.keys(labels).length} languages.`);
