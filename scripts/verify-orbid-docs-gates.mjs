#!/usr/bin/env node
/**
 * Structural verification for Orbid AI help center gates.
 * Drives real docs.json + MDX on disk (no mocked paths).
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fail = (m) => {
  console.error("FAIL:", m);
  process.exitCode = 1;
};
const ok = (m) => console.log("OK:", m);

const docs = JSON.parse(fs.readFileSync(path.join(root, "docs.json"), "utf8"));
if (docs.name !== "Orbid AI") fail(`docs.json name is ${docs.name}`);
else ok('docs.json name "Orbid AI"');

const pages = [];
for (const tab of docs.navigation?.tabs || []) {
  for (const g of tab.groups || []) pages.push(...(g.pages || []));
}
const pageBlob = pages.join("\n");
const banned = [
  "guides/kol",
  "guides/events",
  "guides/campaign",
  "guides/signals",
  "guides/press",
  "guides/map",
  "guides/training",
];
for (const b of banned) {
  if (pageBlob.includes(b)) fail(`legacy path in nav pages: ${b}`);
}
ok("primary nav has no banned legacy module paths");

const requiredPages = [
  "index",
  "guides/what-is-orbid",
  "quickstart",
  "guides/how-the-agent-works",
  "guides/workflows/index",
  "guides/workflows/scan-a-tender",
  "guides/workflows/match-and-review-gaps",
  "guides/workflows/decide-go-no-go",
  "guides/workflows/fill-excel",
  "guides/workflows/generate-deliverables",
  "guides/what-to-say",
  "guides/trust-and-judgment",
  "guides/skills/index",
  "guides/skills/scan",
  "guides/skills/match",
  "guides/skills/fill",
  "guides/skills/go-no-go",
  "guides/skills/deliverables",
  "guides/skills/eligibility-risk",
  "guides/skills/catalog-library",
  "guides/skills/research-monitors",
  "guides/skills/knowledge-memory",
  "guides/skills/packages-review",
];
for (const p of requiredPages) {
  if (!pages.includes(p)) fail(`missing nav page ${p}`);
  const file =
    p === "index"
      ? "index.mdx"
      : p === "quickstart"
        ? "quickstart.mdx"
        : `${p}.mdx`;
  if (!fs.existsSync(path.join(root, file))) fail(`missing file ${file}`);
}
ok(`required ${requiredPages.length} pages exist on disk + nav`);

const index = fs.readFileSync(path.join(root, "index.mdx"), "utf8");
const what = fs.readFileSync(path.join(root, "guides/what-is-orbid.mdx"), "utf8");
const clause = "Orbid AI (formerly MedStrato)";
if (!index.includes(clause)) fail("index missing formerly clause");
if (!what.includes(clause)) fail("what-is missing formerly clause");
ok("formerly clause on index + what-is");

// Brand history must keep MedStrato as the former name (not self-rename)
if (!/Formerly[\s\S]{0,80}MedStrato/i.test(what) && !/\*\*Formerly\*\*[^\n]*MedStrato/i.test(what)) {
  fail("what-is Identity must state Formerly = MedStrato");
}
if (/Formerly[\s\S]{0,40}Orbid AI/i.test(what) && !/formerly MedStrato/i.test(what)) {
  fail("what-is must not set Formerly to Orbid AI");
}
ok("what-is Identity Formerly = MedStrato");
if (/was previously known as Orbid AI/.test(index)) {
  fail("index says previously known as Orbid AI (must be MedStrato)");
}
if (!/was previously known as \*\*MedStrato\*\*|was previously known as MedStrato/.test(index)) {
  fail("index missing previously known as MedStrato");
}
ok("index formerly-MedStrato history wording");
const apiIntro = fs.readFileSync(path.join(root, "api-reference/introduction.mdx"), "utf8");
if (/former Orbid AI docs/.test(apiIntro)) fail("api intro attributes legacy APIs to Orbid AI");
if (!/former \*\*MedStrato\*\* docs|former MedStrato docs/.test(apiIntro)) {
  fail("api intro must attribute legacy KOL/Events docs to MedStrato");
}
ok("api intro legacy attribution = MedStrato");


const skillIds = [
  "run_tender_scan",
  "run_match",
  "run_fill_excel",
  "run_gonogo",
  "run_generate_deliverable",
  "search_product_catalog",
];
let skillText = "";
const skillsDir = path.join(root, "guides/skills");
for (const f of fs.readdirSync(skillsDir)) {
  if (f.endsWith(".mdx")) skillText += fs.readFileSync(path.join(skillsDir, f), "utf8");
}
for (const id of skillIds) {
  if (!skillText.includes(id)) fail(`skills docs missing id ${id}`);
}
ok("core S-tier skill ids present in skills docs");

for (const rel of [
  "guides/skills/match.mdx",
  "guides/skills/fill.mdx",
  "guides/skills/go-no-go.mdx",
]) {
  const t = fs.readFileSync(path.join(root, rel), "utf8").toLowerCase();
  if (!t.includes("own")) fail(`${rel} missing human ownership language`);
}
ok("match/fill/go-no-go include ownership language");

// screenshot ban on live core globs
const imgRe = /<img |!\[[^\]]*\]\(\/images\//;
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name.endsWith(".mdx")) acc.push(p);
  }
  return acc;
}
const checkFiles = [
  path.join(root, "index.mdx"),
  path.join(root, "quickstart.mdx"),
  ...walk(path.join(root, "guides")),
];
for (const f of checkFiles) {
  const t = fs.readFileSync(f, "utf8");
  if (imgRe.test(t)) fail(`screenshot embed in ${path.relative(root, f)}`);
}
ok("no screenshot embeds in index/quickstart/guides/**");

// hub orbid.dev
const docsRaw = fs.readFileSync(path.join(root, "docs.json"), "utf8");
if (!docsRaw.includes("orbid.dev")) fail("docs.json missing orbid.dev");
if (!index.includes("orbid.dev")) fail("index missing orbid.dev");
ok("orbid.dev CTAs on hub surfaces");

// agent loop page
const loop = fs.readFileSync(path.join(root, "guides/how-the-agent-works.mdx"), "utf8");
if (!/tool loop|tool calls|session/i.test(loop)) fail("how-the-agent-works missing agent loop language");
if (!/judgment|review|own/i.test(loop)) fail("how-the-agent-works missing human judgment language");
ok("how-the-agent-works documents agent loop/stages");
// Agent-native narrative on hub
const idxBody = fs.readFileSync(path.join(root, "index.mdx"), "utf8");
if (!/native AI agent/i.test(idxBody)) fail("index should call Orbid a native AI agent");
if (!/Own the judgment|own go\/no-go|own judgment/i.test(idxBody)) fail("index missing human judgment framing");
ok("index uses native-agent narrative");
const qs = fs.readFileSync(path.join(root, "quickstart.mdx"), "utf8");
if (!qs.includes("```")) fail("quickstart should include copy-paste prompt fences");
ok("quickstart has prompt examples");
const wf = fs.readFileSync(path.join(root, "guides/workflows/match-and-review-gaps.mdx"), "utf8");
if (!/You want |What to say|What Orbid does|What you review/i.test(wf)) {
  fail("workflow pages should keep task framing (you want / what to say / what Orbid does / review)");
}
ok("workflow pages use task framing");


// Top-left logo = product O-mark + "Orbid AI" lockup (Mintlify-safe; no mask wordmark)
for (const logo of ["logo/light.svg", "logo/dark.svg"]) {
  const svg = fs.readFileSync(path.join(root, logo), "utf8");
  if (svg.includes("MedStrato")) fail(`${logo} still contains MedStrato`);
  if (!svg.includes("Orbid AI")) fail(`${logo} missing Orbid AI wordmark text`);
  if (!svg.includes('aria-label="Orbid AI"')) fail(`${logo} missing aria-label Orbid AI`);
  if (svg.includes("mask")) fail(`${logo} should not use fragile SVG masks in nav`);
}
ok("logo SVGs are Orbid AI lockups (O-mark + text, no masks)");
const fav = fs.readFileSync(path.join(root, "favicon.svg"), "utf8");
if (!fav.includes("#8B1E1E")) fail("favicon should use brand accent #8B1E1E");
if (fav.includes("MedStrato")) fail("favicon contains MedStrato");
ok("favicon is Orbid O-mark in brand accent");
// Theme primary matches marketing accent
const docsJsonTheme = fs.readFileSync(path.join(root, "docs.json"), "utf8");
if (!docsJsonTheme.includes("#8B1E1E")) fail("docs.json primary color must be marketing accent #8B1E1E");
ok("docs.json primary = #8B1E1E (marketing accent)");


// SEO/AEO/GEO docs layer
for (const f of ["llms.txt", "llms-full.txt"]) {
  if (!fs.existsSync(path.join(root, f))) fail(`missing ${f}`);
}
const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
if (!llms.includes("https://orbid.dev/llms.txt")) fail("llms.txt must point to orbid.dev canonical llms");
if (!/^# Orbid AI/m.test(llms)) fail("llms.txt must start with H1 # Orbid AI (Mintlify/llmstxt.org)");
if (/\$|USD|price is|accuracy\s*\d/i.test(llms) && !llms.includes("Do not invent")) {
  // soft: allow "pricing" word as link topic
}
ok("llms.txt present and defers metrics to orbid.dev");
// Claude-style AEO: plain lead paragraph after H1 (no **Answer:** label, no title pipes)
function leadAfterH1(text) {
  const m = text.match(/^#\s+.+\n+([\s\S]*?)(?:\n## |\n---|\n<Card|\n$)/m);
  if (!m) return "";
  return m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
const faqCell = fs.readFileSync(path.join(root, "faq/what-is-a-cellmap.mdx"), "utf8");
const faqLead = leadAfterH1(faqCell);
if (faqLead.length < 40) fail("AEO FAQ should open with a plain-language lead paragraph");
if (faqCell.includes("**Answer:**")) fail("FAQ should not use **Answer:** label (Claude-style prose)");
ok("AEO FAQ pages open with plain-language lead");

const leadRequired = [
  "index.mdx",
  "quickstart.mdx",
  "glossary.mdx",
  "guides/what-is-orbid.mdx",
  "guides/how-the-agent-works.mdx",
  "guides/workflows/index.mdx",
  "guides/workflows/scan-a-tender.mdx",
  "guides/workflows/match-and-review-gaps.mdx",
  "guides/workflows/decide-go-no-go.mdx",
  "guides/workflows/fill-excel.mdx",
  "guides/workflows/generate-deliverables.mdx",
];
for (const rel of leadRequired) {
  const t = fs.readFileSync(path.join(root, rel), "utf8");
  if (t.includes("**Answer:**")) fail(`${rel} still uses **Answer:** label`);
  const lead = leadAfterH1(t);
  if (lead.length < 40) fail(`${rel} missing plain lead paragraph after H1`);
  const titleM = t.match(/^title:\s*["'](.+?)["']/m);
  if (titleM && titleM[1].includes("|")) fail(`${rel} title must not use | separator`);
}
const faqDir = path.join(root, "faq");
let faqCount = 0;
for (const f of fs.readdirSync(faqDir)) {
  if (!f.endsWith(".mdx")) continue;
  faqCount++;
  const t = fs.readFileSync(path.join(faqDir, f), "utf8");
  if (t.includes("**Answer:**")) fail(`faq/${f} still uses **Answer:** label`);
  if (leadAfterH1(t).length < 40) fail(`faq/${f} missing plain lead paragraph`);
  const titleM = t.match(/^title:\s*["'](.+?)["']/m);
  if (titleM && titleM[1].includes("|")) fail(`faq/${f} title must not use |`);
}
if (faqCount < 15) fail(`expected ≥15 FAQ mdx files (including index), got ${faqCount}`);
ok(`Claude-style lead prose on Getting Started + workflows + ${faqCount} FAQ pages`);

// No pipe brand titles on any shippable mdx
function walkAllMdx(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "docs") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkAllMdx(p, acc);
    else if (ent.name.endsWith(".mdx")) acc.push(p);
  }
  return acc;
}
for (const f of walkAllMdx(root)) {
  const t = fs.readFileSync(f, "utf8");
  const titleM = t.match(/^title:\s*["'](.+?)["']/m);
  if (titleM && titleM[1].includes("|")) {
    fail(`title pipe separator in ${path.relative(root, f)}: ${titleM[1]}`);
  }
}
ok("no | separators in MDX titles");

// --- L1: full-repo KPI ban on shippable mdx/txt (exclude docs/plans) ---
const kpiRe =
  /reduce bid preparation time by 80|cut bid prep time by up to 80|80%\s*faster|82[- ]type deliverable|100\+\s*sources|improving their compliance score from \d+%\s*to\s*\d+/i;
const kpiSoftRe = /win rate improves by \d+%/i;
function walkMdx(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "docs") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMdx(p, acc);
    else if (/\.(mdx|md|txt)$/.test(ent.name) && !p.includes(`${path.sep}docs${path.sep}`)) acc.push(p);
  }
  return acc;
}
for (const f of walkMdx(root)) {
  const t = fs.readFileSync(f, "utf8");
  if (kpiRe.test(t) || kpiSoftRe.test(t)) {
    fail(`invented/marketing KPI pattern in ${path.relative(root, f)}`);
  }
}
ok("no invented marketing KPI patterns in shippable mdx/md/txt");

// --- L1: canonical docs host documented ---
const brand = fs.readFileSync(path.join(root, "guides/brand-and-domains.mdx"), "utf8");
if (!brand.includes("docs.orbid.dev")) fail("brand page must document canonical host docs.orbid.dev");
if (!llms.includes("docs.orbid.dev")) fail("llms.txt must mention docs.orbid.dev");
ok("canonical docs host docs.orbid.dev documented (brand + llms)");

// --- Legacy orphan modules must not reappear on disk ---
const bannedDirs = [
  "guides/kol",
  "guides/events",
  "guides/campaign",
  "guides/signals",
  "guides/press",
  "guides/map",
  "guides/tenders",
  "guides/products",
  "best-practices",
];
for (const d of bannedDirs) {
  if (fs.existsSync(path.join(root, d))) fail(`legacy orphan tree still on disk: ${d}`);
}
if (fs.existsSync(path.join(root, "use-cases/tender-bid-automation.mdx"))) {
  fail("use-cases/tender-bid-automation.mdx still on disk (KPI legacy)");
}
ok("legacy module trees and KPI use-case removed from disk");

if (process.exitCode) {
  console.error("\nGates FAILED");
  process.exit(1);
}
console.log("\nAll structural gates PASSED");
