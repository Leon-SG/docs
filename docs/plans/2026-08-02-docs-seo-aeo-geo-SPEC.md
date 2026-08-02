# Spec: Orbid AI Help Center — SEO · AEO · GEO

**Status:** Enforced (v1.1) — repo L0/L1 PASS after P0/P1  
**Date:** 2026-08-02  
**Scope:** Mintlify repo `stratosphere_docs` only  
**Non-scope:** Marketing site ranking targets, GSC commercial CTR, demo pipeline (owned by `medstarto-website` / orbid.dev)

**Related research inputs**

| Source | Takeaway used |
|--------|----------------|
| Mintlify SEO + GEO guides | Auto sitemap/robots/JSON-LD; only **nav pages** indexed by default; custom `llms.txt` needs **H1 title**; page title/description = primary AI signal |
| llmstxt.org + Mintlify llms examples | Catalog pattern: H1 + blockquote summary + prioritized link lists; metrics stay on primary product llms |
| AEO industry practice | Answer-first 40–80 words; question H1/H2; tables/lists; FAQPage when platform supports; no KPI invention |
| Google AI optimization guidance | Prefer solid SEO fundamentals over “AEO hacks”; structured data optional for generative AI, still useful for classic rich results |
| orbid-knowledge `SEO-GEO-AEO.md` | Docs/ops folder supplies definitions; **orbid.dev llms is canonical for metrics** |
| Website triad plan 2026-08-01 | Commercial SEO/AEO/GEO on marketing site; docs must not fork KPIs or dual-brand facts |
| Agent-native docs research (Claude Code, Harvey, Glean) | Task/workflow IA + prompt examples; tools as secondary reference |

---

## 1. Definitions (normative)

| Term | Definition (this repo) |
|------|-------------------------|
| **SEO** | Organic search: crawlable, intent-matched titles/H1, internal links, index hygiene, stable slugs, redirects |
| **AEO** | Answer engines / AI Overviews / snippets: **extractable** direct answers, tables, FAQs, anti-patterns |
| **GEO** | Generative engines (ChatGPT, Perplexity, Gemini, copilots): entity consistency, `llms.txt`, citable facts, no conflicting metrics |
| **Docs layer** | Help center content optimized for **usage + definition** queries, not commercial head terms |
| **Marketing layer** | orbid.dev / medstrato.com — conversion, pricing, compare, brand entity, primary llms |

**Ordering of battle (docs):**  
AEO structure on every live page → SEO intent titles + internal links → GEO llms + entity consistency.  
Not: “finish all SEO then touch AEO.”

---

## 2. Goals and non-goals

### 2.1 Goals

1. Rank and satisfy **how-to / definition** intents for Orbid AI bid agent usage.  
2. Be **safely citable** by LLMs without inventing awards, prices, or accuracy %.  
3. Stay **aligned** with product (`orbid-knowledge`, routing catalog) and brand (Orbid AI formerly MedStrato).  
4. Keep **agent-native narrative** (delegate → tools → deliverable → human judgment).  

### 2.2 Non-goals

1. Winning head commercial queries (“best tender software”) on the docs host.  
2. Hosting pricing tables or marketing accuracy claims.  
3. Guaranteeing Google AI Overview inclusion (Google: no special markup required).  
4. Ranking private monorepo paths or GitHub stars.  

### 2.3 Success metrics (docs-operable)

| Metric | Target (v1) | How to measure |
|--------|-------------|----------------|
| Live nav pages with frontmatter title+description | **100%** | Script / CI |
| Live FAQ + Getting Started + Workflows with `**Answer:**` | **100%** | Script / CI |
| `llms.txt` H1 + defer to orbid.dev llms | **Pass** | File gate |
| Zero invented KPI on **nav** pages | **0 hits** | Grep gate |
| Primary nav free of legacy KOL/Events modules | **Pass** | docs.json gate |
| Dual brand history correct (Formerly = MedStrato) | **Pass** | Content gate |
| orbid-knowledge FAQ promote coverage (core cluster) | **≥8** published FAQ URLs | Inventory |

**Not measured in this repo alone:** GSC clicks, AIO citation rate (require deployed host + Search Console / prompt panel).

---

## 3. Architecture and ownership

```text
┌─────────────────────────────────────────────┐
│  orbid.dev  (PRIMARY SEO/AEO/GEO + product) │
│  medstrato.com (aux / equity)               │
│  llms.txt = metrics, pricing pointers       │
└──────────────────▲──────────────────────────┘
                   │ cite only
┌──────────────────┴──────────────────────────┐
│  Help Center (this Mintlify site)           │
│  SEO: how-to + definitions                  │
│  AEO: Answer-first FAQ + workflow recipes   │
│  GEO: docs llms map → product llms          │
└──────────────────▲──────────────────────────┘
                   │ facts
┌──────────────────┴──────────────────────────┐
│  orbid-knowledge + product catalog          │
│  cellmap / residual / formal match SSOT     │
└─────────────────────────────────────────────┘
```

| Fact class | Canonical owner |
|------------|-----------------|
| Pricing, seats, accuracy marketing, country coverage | **orbid.dev** |
| Brand name / formerly MedStrato | Shared; docs must match brand.ts policy |
| Cellmap, residual, rank vs formal, fill rules | orbid-knowledge → docs FAQ/concepts |
| Tool ids (`run_match`, …) | Product catalog → docs Tools reference |
| How to talk to the agent | Docs workflows + what-to-say |

---

## 4. Information architecture (normative)

### 4.1 Live navigation groups (required)

1. **Getting Started** — home, what-is, quickstart, how-the-agent-works  
2. **Common workflows** — task recipes (primary SEO how-to)  
3. **Working with the agent** — sessions, library, knowledge, memory, review, what-to-say, trust  
4. **Tools reference** — skill/tool ids (secondary)  
5. **Concepts** + **FAQ** — AEO definition surface  
6. **Use cases / Roles / Operations** — thin, agent-framed  

### 4.2 Index hygiene

| Rule | Requirement |
|------|-------------|
| Index | Only pages in `docs.json` navigation (Mintlify default) |
| Legacy modules | Not in primary nav; redirects present |
| Disk orphans | Prefer delete or explicit noindex path; until then **must not** be linked from live pages with KPI claims |
| Redirects | Permanent for known old MedStrato module URLs |

### 4.3 Host / canonical (decision required)

| Option | Spec stance |
|--------|-------------|
| `docs.orbid.dev` | **Preferred** long-term (matches product brand) |
| `docs.medstrato.com` | Allowed during migration if 301/brand consistent |

**MUST:** Single public canonical host documented in brand page; marketing `BRAND.docsSite` and Mintlify custom domain **must match**.  
**MUST NOT:** Two live docs hosts without canonical tags.

---

## 5. Content requirements

### 5.1 Frontmatter (every live MDX page)

| Field | Rule |
|-------|------|
| `title` | Intent-first; include brand when not redundant; prefer ≤70 chars |
| `description` | Unique; Orbid AI + intent verb; ~120–160 chars preferred |

### 5.2 AEO body structure (Claude-style prose)

Prefer Anthropic/Claude Code docs voice: short intent titles (no `| Brand`), plain lead paragraphs, steps and lists over wide tables.

| Page type | Required blocks |
|-----------|-----------------|
| FAQ | Plain lead (40–80 words, **no** `**Answer:**` label) → Details (steps / anti-patterns / short lists) → Related |
| Workflow | Lead prose · optional “You want / You provide” sentences · **What to say** (fenced prompts) · **What Orbid does** · **What you review** |
| Getting Started (except pure hubs) | Plain lead + next steps |
| Tools reference | Lead optional; tool id lists OK; banner pointing to Workflows |
| Hub index | Clear entity sentence + cards; plain lead required |
| Titles | No `|` brand separators (e.g. not `Topic \| Orbid AI`) |

### 5.3 Agent-native voice (normative)

| MUST | MUST NOT |
|------|----------|
| Subject = agent session / delegated task | Subject = “module encyclopedia” as primary |
| Prompt examples in fences | Require users to type internal tool ids |
| Human ownership on match/fill/go-no-go | Award guarantees |
| “Formerly MedStrato” only as history | “Formerly Orbid AI” or self-rename |

### 5.4 Anti-KPI rules (GEO/SEO safety)

**MUST NOT** on live nav pages:

- Invented % win-rate, “80% faster”, “82-type deliverables”, “100+ sources” unless present on **orbid.dev/llms.txt**  
- Pricing numbers  
- Unqualified “guarantees compliance / wins bids”  

**MUST:** Link orbid.dev for commercial claims.

### 5.5 Keyword clusters → canonical landing (docs)

| Cluster | Primary landing | Supporting |
|---------|-----------------|------------|
| Orbid AI / formerly MedStrato | `/guides/what-is-orbid` | `/`, brand page |
| Native bid agent / how to use | `/quickstart` | how-the-agent-works, what-to-say |
| Scan vs match vs fill | `/faq/scan-vs-match-vs-fill` | workflows |
| Tender product matching | `/guides/workflows/match-and-review-gaps` | faq rank/formal, tools match |
| Go/no-go | `/faq/what-is-go-no-go` + workflow decide | trust |
| Cellmap / Excel fill | `/faq/what-is-a-cellmap` + fill workflow | residual |
| Evidence / ownership | `/guides/trust-and-judgment` | faq ownership |
| Tools / skill ids | `/guides/skills` | individual tool pages |

---

## 6. Technical GEO / SEO requirements

### 6.1 `llms.txt` / `llms-full.txt`

| Requirement | Spec |
|-------------|------|
| Location | Repo root (Mintlify custom overrides auto) |
| Format | **H1** site title; blockquote summary; markdown lists (llmstxt.org) |
| Content | Map docs; **MUST** link orbid.dev llms as metrics authority |
| MUST NOT | Publish alternate accuracy/pricing tables |

### 6.2 Mintlify platform

| Feature | Spec |
|---------|------|
| Sitemap / robots | Rely on Mintlify auto; only nav pages indexed by default |
| JSON-LD | Rely on Mintlify defaults; FAQPage explicit only if platform supports custom injection later |
| `docs.json` `seo.indexing` | Prefer `"all"` for nav pages only (no hidden commercial junk) |
| metatags | Optional OG brand; no conflicting site_name MedStrato |

### 6.3 Internal linking

| Rule | Spec |
|------|------|
| Every workflow | ≥1 link to FAQ or concept + ≥1 to trust or what-to-say |
| Every FAQ | ≥1 link to workflow or agent how-to |
| Home | Links to quickstart, workflows, what-to-say, trust, orbid.dev |

### 6.4 Redirects

| Rule | Spec |
|------|------|
| Old MedStrato module paths | 301 to what-is, workflows, or tools—not soft 404 |
| Renamed FAQ/workflow slugs | 301 |

---

## 7. Quality gates (CI / `npm run test:docs-gates`)

**MUST pass before release:**

1. `docs.json` name = `Orbid AI`  
2. Primary nav excludes `guides/kol|events|campaign|signals|press|map|training`  
3. Required agent-native pages exist on disk + nav  
4. Hub/what-is: `Orbid AI (formerly MedStrato)`; Identity Formerly = MedStrato  
5. Core tool ids present in tools reference  
6. Ownership language on match/fill/go-no-go tool pages  
7. No product UI screenshot embeds on live guides  
8. orbid.dev on hub + docs.json  
9. Logo lockup Orbid AI (no MedStrato wordmark; no fragile masks)  
10. Primary color `#8B1E1E` (marketing accent)  
11. `llms.txt` exists, H1-compatible, defers to orbid.dev llms  
12. Sample AEO FAQ has `**Answer:**`  
13. Index states native AI agent + human judgment  
14. Quickstart has fenced prompts  
15. Workflow pages use task framing (“You want”)  

**Recommended (not yet all automated):**

- 100% Answer-first on FAQ + Getting Started + Workflows  
- Grep zero KPI on nav pages + unlinked legacy files deleted or sanitized  
- Deployed `/llms.txt` and `/sitemap.xml` 200  

---

## 8. Editorial process

1. Product fact change → update orbid-knowledge / catalog first.  
2. Docs page → Answer-first template → internal links → no KPI.  
3. Run `npm run test:docs-gates`.  
4. If definition is marketing-owned (pricing) → **link out only**.  
5. Promote new FAQ from orbid-knowledge when `canonical-here` and Details are real tables.  

---

## 9. Phased roadmap (spec levels)

| Level | Name | Exit criteria |
|-------|------|----------------|
| **L0** | Floor | Gates 1–15 green; agent-native IA live |
| **L1** | Contender docs | 100% Answer on FAQ+GS+Workflows; legacy disk sanitized; llms H1; canonical host decided |
| **L2** | Strong docs AEO | ≥15 FAQ from knowledge; HowTo-shaped workflows; GSC property for docs host; prompt cite checklist |
| **L3** | Integrated triad | Marketing + docs cross-links in sync; no dual KPI; quarterly audit |

---

## 10. Open decisions

| ID | Decision | Status |
|----|----------|--------|
| D1 | Canonical docs host | **Decided:** `docs.orbid.dev` (documented in brand + llms); DNS/Mintlify project wiring is ops |
| D2 | Delete vs keep legacy MDX on disk | **Decided:** delete legacy module trees + KPI orphans; keep redirects |
| D3 | Custom FAQPage JSON-LD beyond Mintlify | Open — defer until platform support confirmed |
| D4 | ZH docs for AEO | Open — EN primary for v1 |

---

# Strict audit — re-run after P0/P1 execution (2026-08-02)

**Auditor method:** File inventory of live nav pages, `npm run test:docs-gates`, full-repo KPI grep, internal-link scan, comparison to Spec §5–§9.  
**Verdict scale:** PASS / PARTIAL / FAIL per requirement.

## A. Research alignment

| Research recommendation | Spec § | Repo status | Verdict |
|-------------------------|--------|-------------|---------|
| Answer-first for AEO | 5.2 | FAQ (16) + GS + workflows + index + glossary | **PASS** |
| llms.txt for GEO | 6.1 | H1 + defer + docs host | **PASS** |
| Defer metrics to product llms | 3, 5.4 | llms defers; KPI legacy deleted | **PASS** |
| Nav-only index (Mintlify) | 4.2 | Nav clean; legacy module trees removed | **PASS** |
| Agent-native IA | 4.1, 5.3 | Workflows first; tools secondary | **PASS** |
| No dual commercial SEO on docs | 2.2 | True | **PASS** |
| Schema FAQPage | 6.2 | Mintlify defaults only | PARTIAL (L2/L3) |
| Canonical host documented | 4.3 | **docs.orbid.dev** in brand + llms | **PASS** (DNS still ops) |

## B. SEO

| Requirement | Evidence | Verdict |
|-------------|----------|---------|
| Intent titles on live pages | 64/64 nav pages have title | **PASS** |
| Unique descriptions | 64/64 have description | **PASS** |
| Internal links (broken path scan) | 0 broken `/…` targets on nav pages | **PASS** |
| Redirects for legacy | 90 permanent redirects; tenders→workflows | **PASS** |
| Legacy not in nav | docs.json clean | **PASS** |
| Legacy not polluting SEO | kol/events/tenders/best-practices/KPI use-cases **deleted** | **PASS** |
| Sitemap/robots | Mintlify auto (deploy-time) | PASS (platform) / N/A offline |
| GSC / production verification | Not in repo | FAIL (ops — L2) |

**SEO score: 8.0 / 10** (content hygiene fixed; GSC/deploy still open)

## C. AEO

| Requirement | Evidence | Verdict |
|-------------|----------|---------|
| Answer block on FAQ | 16 FAQ pages, all `**Answer:**` | **PASS** |
| Tables / anti-patterns on core FAQ | yes | **PASS** |
| Workflow extractability | Answer + You want + fenced prompts | **PASS** |
| 100% Answer on core workflows | 5/5 + index | **PASS** |
| index / glossary Answer | Present | **PASS** |
| FAQ schema markup | Not custom | PARTIAL (acceptable L1) |
| Ownership sentences | Trust + match/fill/gonogo + new submit FAQ | **PASS** |

**AEO score: 8.5 / 10**

## D. GEO

| Requirement | Evidence | Verdict |
|-------------|----------|---------|
| Entity Orbid AI + formerly MedStrato | Hub + what-is correct | **PASS** |
| llms.txt H1 + product deferral | Present | **PASS** |
| llms-full map | Expanded FAQ list + docs host | **PASS** |
| No metric fork on shippable mdx | CI KPI ban green | **PASS** |
| Orphan KPI files | Removed | **PASS** |
| Tool ids separated | Tools reference | **PASS** |
| Citable non-goals | what-orbid-is-not + does-orbid-submit-bids | **PASS** |

**GEO score: 8.5 / 10**

## E. Agent-native content

| Requirement | Verdict |
|-------------|---------|
| Native agent positioning on home | **PASS** |
| Quickstart prompts | **PASS** |
| Common workflows ×5 | **PASS** |
| Tools demoted | **PASS** |
| Trust page | **PASS** |

**Agent narrative score: 8.5 / 10**

## F. Technical / brand chrome

| Requirement | Verdict |
|-------------|---------|
| Name Orbid AI | **PASS** |
| Accent #8B1E1E | **PASS** |
| Logo Orbid AI lockup | **PASS** |
| Gates script | **PASS** (L0 + L1 automated) |

## G. Scorecard summary (post-remediation)

| Dimension | Score (0–10) | vs Spec L0 | vs Spec L1 |
|-----------|-------------:|:----------:|:----------:|
| SEO | 8.0 | Meets | Meets (content) |
| AEO | 8.5 | Meets | Meets |
| GEO | 8.5 | Meets | Meets |
| Agent narrative | 8.5 | Meets | Meets |
| Brand/tech chrome | 9.0 | Meets | Meets |
| Ops/measurement | 3.0 | Below | Below (deploy/GSC) |
| **Composite (SEO+AEO+GEO equal weight)** | **8.3** | **PASS** | **PASS (repo L1)** |

### Overall audit verdict

| Level | Result |
|-------|--------|
| **Spec L0 (Floor)** | **PASS** |
| **Spec L1 (Contender docs)** | **PASS (repo)** — Answer 100% on GS+workflows+FAQ; legacy sanitized; host documented; gates green. **Ops remaining:** live DNS for docs.orbid.dev, deploy `/llms.txt`+`/sitemap.xml` 200, GSC property |
| **Spec L2+** | **FAIL** (expected — GSC, ≥HowTo depth, custom JSON-LD deferred) |

## H. Backlog status

| P | Item | Status |
|---|------|--------|
| P0 | Delete/sanitize KPI legacy MDX | **DONE** |
| P0 | Canonical host `docs.orbid.dev` documented | **DONE** (content); DNS/Mintlify config = ops |
| P1 | `**Answer:**` on workflows + index + glossary | **DONE** |
| P1 | FAQ ≥15 (16 nav FAQ pages) | **DONE** |
| P1 | CI full-repo KPI + Answer gates | **DONE** |
| P2 | Deploy verify `/llms.txt` `/sitemap.xml`; GSC | **OPEN** |
| P2 | Cross-link audit in CI (optional strengthen) | OPEN (manual scan 0 broken) |
| P3 | FAQPage/HowTo custom JSON-LD | OPEN |
| P3 | EN+ZH top FAQ | OPEN |

## I. Definition of done (repo L1) — met

1. Composite **≥7.5** with **zero** invented KPI on shippable mdx.  
2. L1 checklist green in `npm run test:docs-gates`.  
3. Marketing triad can cite docs for **definitions only**; docs cite marketing for **numbers only**.  
4. Agent-native voice remains primary.

---

## 11. Document control

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-08-02 | Research synthesis + normative spec + strict audit |
| 1.1 | 2026-08-02 | P0/P1 executed; audit re-run → L0/L1 repo PASS; composite 8.3 |

**Enforcement:** Treat §5–§7 as release criteria. Re-run gates + this audit section after every major docs IA change.
