# Orbid AI Help Center Rebuild — Plan, Spec & Audit

> **For implementers:** execute task-by-task after brand/IA freeze. Product SSOT: monorepo  
> `/Users/lui831/orca/workspaces/stratosphere/feat-demo-match-ssot-b` (`orbid-knowledge/`,  
> `src/lib/orbid/routing/catalog/*.yaml`). Doc host: this Mintlify repo (`stratosphere_docs`).

**Goal:** Replace the MedStrato multi-module help center with an **Orbid AI** help center that teaches the real bid agent (Scan → Match → Fill → Deliver), is usable by both newcomers and bid specialists, ranks for SEO/AEO, and never relies on screenshots.

**Architecture:** Mintlify site restructured around Orbid product IA (Agents / Library / Knowledge + skills catalog). Content is **description-first** (no screenshots). Branding is **Orbid AI (formerly MedStrato)**. Canonical product semantics import from monorepo `orbid-knowledge/`; marketing metrics/pricing only link to `https://orbid.dev`.

**Tech stack:** Mintlify (`docs.json` + MDX), optional `llms.txt` for AI crawlers, structured FAQ for AEO, redirects from legacy paths.

**Last updated:** 2026-08-01

---

## 0. Non-goals & hard constraints

| Constraint | Rule |
|------------|------|
| **No screenshots** | Zero `<img>` product UI captures. No “see the blue button” copy. Prefer steps, tables, example utterances, outcome descriptions. |
| **Brand** | Primary name: **Orbid AI**. First mention on major pages: **Orbid AI (formerly MedStrato)**. After first mention, **Orbid AI** or **Orbid**. Never brand as MedStrato-only. |
| **No invented capabilities** | Skills list must map to routing catalog / GTM manuals / orbid-knowledge. If YAML is `stub: true`, mark as “available / evolving” — do not over-claim. |
| **No invented metrics/pricing** | Link `https://orbid.dev/pricing` and `https://orbid.dev/llms.txt` only. |
| **No legacy module encyclopedia** | KOL / Events / Campaigns / Signals / Press / Map / Training are **not** primary nav. Optional one “Legacy platform modules” archive page max, or 301 away. |
| **Human ownership** | Always state: bidder org owns final content, strategy, and submission. |
| **Language** | EN primary for public SEO; ZH (and other locales) optional second wave. Keep EN terminology stable for ranking. |

---

## 1. Brand & messaging spec

### 1.1 Naming

| Context | Form |
|---------|------|
| Site name (`docs.json`) | `Orbid AI` |
| First H1 / hero / meta brand clause | **Orbid AI (formerly MedStrato)** |
| Subsequent copy | Orbid AI · Orbid |
| Page title template | `{Page} · Orbid AI` |
| Meta description pattern | `Orbid AI (formerly MedStrato): …` when brand is not already clear from title |
| Legal / company when needed | MedStrato as *company/platform context* only if product truth still uses it; product surface is Orbid AI |

### 1.2 Positioning (one paragraph, reuse)

> **Orbid AI (formerly MedStrato)** is an AI-assisted bid operations product for medical-device tenders. Teams scan tender packages, match catalog products to requirements, fill structured response forms with evidence, and prepare deliverables—while humans keep go/no-go strategy and final submission ownership.

### 1.3 Domains & CTAs

| Role | URL |
|------|-----|
| Primary marketing | https://orbid.dev |
| Docs (this site) | docs host TBD (keep current Mintlify deploy; rebrand UI) |
| App / product | Prefer Orbid host / `/orbid` paths; avoid teaching `app.medstrato.com` as primary |
| Auxiliary / legacy SEO | https://medstrato.com — mention only as formerly / redirect equity |
| Public KB | https://github.com/Leon-SG/medtech-procurement-kb |
| Pricing / metrics | https://orbid.dev/pricing · https://orbid.dev/llms.txt |

### 1.4 Voice

- **Ordinary user:** short steps, “what to say in chat”, plain language.  
- **Professional user:** prerequisites, phase gates, residual/cellmap/formal-match semantics, anti-patterns.  
- **SEO:** answer-first; target queries in H1/H2; FAQ schema-ready; internal links by concept.

---

## 2. Audience model (three lanes, one IA)

| Lane | Who | Needs | Doc pattern |
|------|-----|-------|-------------|
| **A · Everyday user** | Bid coordinator, first-time trial | First session success in 15 min | Quickstart, “What to type”, phase pills, plain outcomes |
| **B · Professional user** | Bid / product / RA specialists | Accuracy, residuals, deviations, multi-product branches, go/no-go discipline | Guides with tables, checklists, anti-patterns, skill prerequisites |
| **C · SEO / AEO / GEO** | Search & AI answer engines | Definitional pages, FAQ, comparisons, device use-cases | Answer-first FAQs, glossary, use-cases, `llms.txt`, stable slugs |

**Rule:** Every major skill page has:

1. **Plain answer** (40–80 words) — Lane A + C  
2. **How to use** (utterances + steps, no UI chrome) — Lane A  
3. **Professional notes** (prereqs, failures, evidence) — Lane B  
4. **Related** internal links — SEO

---

## 3. Information architecture (target `docs.json`)

### 3.1 Tabs / groups

```text
Guides
├── Getting Started
│   ├── index (home)
│   ├── quickstart
│   ├── what-is-orbid
│   ├── core-loop (scan-match-fill-deliver)
│   └── glossary
├── Workspace
│   ├── agents-sessions
│   ├── library
│   ├── knowledge
│   ├── memory
│   ├── templates
│   ├── review
│   └── setup-settings-billing
├── Skills (agent capabilities)
│   ├── skills/index (catalog overview)
│   ├── skills/scan
│   ├── skills/match
│   ├── skills/fill
│   ├── skills/go-no-go
│   ├── skills/deliverables
│   ├── skills/eligibility-risk
│   ├── skills/catalog-library
│   ├── skills/research-monitors
│   ├── skills/knowledge-memory
│   └── skills/packages-review
├── Workflows
│   ├── medical-device-bid-workflow
│   ├── go-no-go-checklist
│   └── fill-residual-review
├── Concepts (ops glossary deep dives)
│   ├── cellmap
│   ├── formal-vs-rank-match
│   ├── residual
│   ├── product-lock-branches
│   ├── compliance-matrix
│   ├── deviation
│   └── evidence-and-ownership
├── Use Cases
│   ├── ultrasound-tender
│   ├── defibrillator-tender
│   └── evaluating-bid-ai-tools
├── FAQ
│   └── (pages or single FAQ hub + anchors from orbid-knowledge)
└── For Roles (rewrite)
    ├── for-bid-teams
    ├── for-product-managers
    └── for-regulatory-specialists

API Reference (phase 2)
├── introduction (Orbid session/library model)
└── (public subset only — not full 140 routes day one)

Operations
└── brand-and-domains (formerly MedStrato note)
```

### 3.2 Delete / archive from primary nav

| Old group | Action |
|-----------|--------|
| KOL, Events, Campaigns, Signals, Investigations, Press, Map, Training, Trends, Registration | **Remove** from primary nav; 301 to home or `/guides/what-is-orbid` unless a path has significant SEO traffic (then soft-landing “retired from Orbid AI docs”) |
| Roles: Medical Affairs / Marketing | **Replace** with bid/product/RA roles |
| Best practices KOL/event/prompt tips | **Delete** or rewrite only if content maps to bid prompts |
| User Manual + screenshot trees | **Delete** from nav (no screenshots policy) |
| Old Tenders chapter (Autopilot UI) | **Replace** with Skills + Workflows |
| API kols/events/campaigns/signals | **Remove** until Orbid public API docs exist |

### 3.3 Redirect policy

- Keep existing redirects map; add permanent redirects for deleted popular slugs.  
- Prefer `/guides/*` and `/skills/*` stable English slugs.  
- Never 404 high-intent “tender matching”, “compliance matrix”, “go no go” queries—map to new concept pages.

---

## 4. Content types (spec)

### 4.1 Page templates

#### T1 · Landing / hub

- H1 brand + value prop  
- Card grid to Quickstart / Skills / FAQ  
- “Formerly MedStrato” once  
- No screenshots

#### T2 · Quickstart (Lane A)

Sections:

1. What you need (account, product files optional)  
2. Open Agents and create a session  
3. Upload tender package  
4. Say scan / use phase guidance  
5. Browse or lock a product → match  
6. Review deviations / residuals  
7. Fill Excel or generate deliverable  
8. Human review before submit  

Include **example utterances** (EN + optional ZH), not UI coordinates.

#### T3 · Skill page (core)

Frontmatter:

```yaml
title: "Match products to tender requirements | Orbid AI"
description: "How Orbid AI (formerly MedStrato) runs formal product–tender matching…"
```

Body skeleton:

1. **Answer** (what the skill does)  
2. **When to use**  
3. **Prerequisites** (e.g. files uploaded, scan done, product selected)  
4. **What to say** (example user utterances from catalog)  
5. **What you get** (outcomes: matrix, deviations, download)  
6. **Professional notes** (gates, vs sibling skills, anti-patterns)  
7. **Related**  

**Forbidden:** “Click the green Match button in the top-right.”  
**Allowed:** “In an Agents session after scan, ask Orbid to match a locked product (examples: …).”

#### T4 · Concept page (SEO + pros)

- Definition answer-first  
- Table (term vs related term)  
- Anti-patterns  
- Links to skill pages  

#### T5 · FAQ page

From `orbid-knowledge/faq/*`:

- 40–80 word direct answer  
- Details with tables/steps  
- Sibling links  
- Product note short, non-hype  

#### T6 · Use case

- Scenario (device + tender shape)  
- Stage path Scan→Match→Fill→Deliver  
- Skills used  
- Human checkpoints  

### 4.2 No-screenshot media policy

| Allowed | Forbidden |
|---------|-----------|
| Text examples of tender rows / filled cells (anonymized) | Product UI screenshots / GIFs |
| ASCII flow diagrams | Annotated UI callouts |
| Tables of skill vs phase | “As shown in figure 3” |
| Copy-paste utterance lists | Image-based manuals |

### 4.3 SEO / AEO / GEO checklist (every public page)

- [ ] Unique title ≤ ~60–70 chars with primary intent  
- [ ] Meta description with Orbid AI + intent verb  
- [ ] H1 = primary query form  
- [ ] Answer in first 80 words  
- [ ] One primary intent; secondary H2s for related  
- [ ] Internal links to glossary + 2 skill pages  
- [ ] FAQ pages: question-as-H2, concise answers (JSON-LD later if Mintlify allows)  
- [ ] `llms.txt` / docs mirror of machine facts (no metric fork vs orbid.dev)  
- [ ] Canonical brand: Orbid AI (formerly MedStrato) on hub pages only once  

Target query clusters (non-exhaustive):

| Cluster | Landing page |
|---------|----------------|
| medical device tender matching / AI bid software | what-is-orbid, skills/match |
| scan vs match vs fill | core-loop, FAQ |
| compliance matrix medical tender | concepts/compliance-matrix |
| go/no-go tender decision | skills/go-no-go |
| fill Excel tender form AI | skills/fill |
| cellmap bid automation | concepts/cellmap |
| Orbid AI MedStrato | what-is-orbid (formerly clause) |
| ultrasound / defibrillator tender response | use-cases/* |

---

## 5. Real Orbid skills inventory (docs catalog)

Source of truth for implementers:

- Tool catalog: `src/lib/orbid/routing/catalog/*.yaml` (≈54 tools)  
- Phase pills: `src/lib/orbid/routing/phases.yaml`  
- Semantics: `orbid-knowledge/`  
- GTM modules: `docs/gtm/en-feature-manual.html`

### 5.1 Documentation skill groups (user-facing)

Publish **grouped skill pages**, not 54 one-liners. Each bullet is a real catalog id.

#### Group S1 — Tender Scan & Understanding

| Skill id | User-facing name | One-line (docs) |
|----------|------------------|-----------------|
| `run_tender_scan` | Scan / analyze tender | Parse uploaded tender: parameters, categories, deadlines, metadata |
| `answer_from_context` | Ask about this tender | Q&A against uploaded/scanned package |
| `search_tender_text` | Search tender text | Locate clauses in the package |
| `extract_administrative_requirements` | Extract admin requirements | Admin/eligibility-oriented extraction |
| `import_bid_document` | Import bid document | Bring documents into the session workflow |
| `tender_dna` | Tender DNA / profile | Structured tender profile signals |
| `lookup_source_context` | Lookup source context | Retrieve grounded context for claims |

#### Group S2 — Product Catalog & Selection

| Skill id | User-facing name | One-line |
|----------|------------------|----------|
| `search_product_catalog` | Browse / search catalog | Keyword + semantic product candidates |
| `compare_products` | Compare products | Side-by-side vs requirements or peers |
| `query_structured_specs` | Query structured specs | Pull structured product parameters |
| `query_product_intelligence` | Product intelligence | Product intel queries |
| `update_product_spec` / `revert_product_spec` | Update / revert product specs | Catalog write paths (human-governed) |
| `update_product_features` / `update_product_intelligence` | Update features / intel | Catalog enrichment |
| `apply_user_correction` | Apply corrections | User corrections into session/product state |

#### Group S3 — Match

| Skill id | User-facing name | One-line |
|----------|------------------|----------|
| `run_match` | Match product to tender | Parameter-level match; deviations; optional fill path |
| `get_deviation_summary` | Deviation summary | Summarize gaps/deviations after match |
| `check_benchmark_status` | Benchmark / match status | Progress/status of analysis-match pipeline |

Docs must teach **quick rank vs formal match** and **product lock / branches** (concepts), even when UI labels evolve.

#### Group S4 — Fill & Excel

| Skill id | User-facing name | One-line |
|----------|------------------|----------|
| `run_fill_excel` | Fill Excel tender form | Write matched values into buyer template via cellmap |
| (concept) cellmap / residual | — | Explain mapping + residual review without UI shots |

#### Group S5 — Go/No-Go, Eligibility, Risk, Score

| Skill id | User-facing name | One-line |
|----------|------------------|----------|
| `run_gonogo` | Go/No-Go assessment | Red-line style decision support + report (not auto-award) |
| `check_eligibility` | Eligibility pre-check | Lightweight qualify check (not full Go/No-Go) |
| `flag_tender_risks` | Flag tender risks | Risk flags on clauses |
| `simulate_tech_score` | Simulate technical score | Scoring simulation support |
| `analyze_bid_strategy` | Bid strategy analysis | Strategy-oriented analysis |
| `suggest_pricing` | Pricing suggestions | Pricing assistance (human owns final price) |
| `track_deadline` | Track deadline | Deadline tracking |

#### Group S6 — Deliverables & Packages

| Skill id | User-facing name | One-line |
|----------|------------------|----------|
| `list_deliverables` | List deliverable types | Discover available artifact types |
| `run_generate_deliverable` | Generate a deliverable | Single-type artifact (e.g. deviation letter, compliance matrix, technical proposal) |
| `run_bid_package` | Bid package (bundle) | Multi-artifact package path |
| `run_submission_package` | Submission package | Submission-oriented packaging |
| `produce_artifact` | Produce artifact | General artifact production (e.g. research export) |
| `list_document_formats` / `learn_document_format` | Document formats | Format templates learning/list |
| `review_bid` | Review bid | Post-export / review pass |

Docs language for deliverables: describe **types and purpose**, not “82” as a hard public KPI unless confirmed on orbid.dev llms. Prefer “many deliverable types including …”.

#### Group S7 — Research, Monitors, Opportunities

| Skill id | User-facing name | One-line |
|----------|------------------|----------|
| `web_research` | Market / web research | External research on market, regs, competitors |
| `search_opportunities` | Search tender opportunities | Opportunity search |
| `analyze_opportunity` | Analyze opportunity | Opportunity-level analysis |
| `create_monitor` / `list_monitors` / `update_monitor` / `stop_monitor` | Tender monitors | Standing monitors (describe carefully if stub/evolving) |
| `bid_intelligence` / related query tools | Bid intelligence | Intelligence queries over bid context |

#### Group S8 — Knowledge, Memory, Outcomes, Intel writeback

| Skill id | User-facing name | One-line |
|----------|------------------|----------|
| `query_knowledge` / `propose_knowledge` | Knowledge base | Query / propose org knowledge |
| `search_bid_history` / `query_win_loss` / `record_bid_outcome` | Bid history & outcomes | Learn from past bids |
| `record_competitor_intel` / `query_competitor_baseline` / `record_market_intel` | Competitor / market intel | Capture and query intel |
| `ask_human` | Ask human | Human-in-the-loop prompts |
| `suggest` | Suggestions | In-session suggestions |
| `resolve_skill` | Resolve skill | Meta routing helper (usually **omit from end-user docs**) |

### 5.2 Phase model (teach users)

Document the **session phases** as user guidance (from `phases.yaml`), not as code:

| Phase | User meaning | Typical next skills |
|-------|--------------|---------------------|
| Empty | No files yet | Search opportunities, browse catalog, research, prepare to match |
| Has file | Uploaded, not scanned | Scan tender, ask what the tender says |
| Scanned | Requirements structured | Match, eligibility, compare products, flag risks, deadline |
| Matched (green/yellow/red) | Match done with risk signal | Deviations, deliverables, Go/No-Go, corrections, switch product |
| Exported | Deliverables/export happened | Review bid, record outcome |

### 5.3 Workspace surfaces (not “old SaaS modules”)

| Surface | Route family | Doc focus |
|---------|--------------|-----------|
| Agents | `/bid` sessions | Chat + skills + cards (describe behavior) |
| Library | `/library` | Product/tender files, parse, attach to session |
| Knowledge | `/knowledge` | Org memory, certifications, lessons |
| Memory | `/memory` | What is remembered across work |
| Templates | `/templates` | Document/format templates |
| Review | `/review` | Residual / human review queues |
| Setup / Settings / Billing | setup, settings, billing | Account & workspace |

Legacy monorepo `(protected)` modules (KOL, Events, …) are **out of Orbid AI docs scope** unless product explicitly re-launches them under Orbid.

---

## 6. Canonical content sources (import map)

| Docs page cluster | Import from | Status |
|-------------------|-------------|--------|
| Brand / loop / capabilities | `orbid-knowledge/about/*` | Adapt; add “formerly MedStrato” |
| FAQ 01–30 | `orbid-knowledge/faq/*` | Promote almost 1:1 |
| Glossary ops terms | `orbid-knowledge/glossary/*` | Promote |
| Workflow guides | `orbid-knowledge/guides/*` | Promote |
| Use cases | `orbid-knowledge/use-cases/*` | Promote |
| Skill how-tos | `routing/catalog/*.yaml` + GTM feature manual (text only) | Rewrite into T3 |
| Metrics/pricing | orbid.dev only | Link out |
| UI pixel SSOT | **Do not import screenshots** | Reference forbidden |

`orbid-knowledge/CANONICAL.md` remains the conflict resolver for product facts.

---

## 7. Implementation plan (phased)

### Phase 0 — Freeze (0.5 day)

1. Approve this plan (brand clause, no screenshots, IA).  
2. Confirm docs deploy URL and whether `docs.orbid.dev` vs current host.  
3. Freeze skill list v1 = Groups S1–S8 above (edit only if product removes tools).

### Phase 1 — Scaffold (1–2 days)

1. Rewrite `docs.json`: name **Orbid AI**, new navigation, colors if needed.  
2. Footer/navbar: orbid.dev CTAs; “Orbid AI (formerly MedStrato)” once in site description.  
3. Create empty MDX stubs for full IA with titles + descriptions.  
4. Add redirect stubs for top legacy paths.  
5. Remove screenshot-heavy `guides/user-manual` from nav (file can stay unlinked until deleted).

### Phase 2 — Core narrative (2–3 days)

Write/publish:

1. `index.mdx` — hub  
2. `what-is-orbid.mdx` — formerly MedStrato, what Orbid is / is not  
3. `quickstart.mdx` — first session  
4. `core-loop.mdx` — Scan → Match → Fill → Deliver  
5. Workspace pages (Agents, Library, Knowledge, …) — descriptive  
6. Brand/domains note page  

### Phase 3 — Skills (3–5 days)

1. `skills/index.mdx` — catalog matrix (group, skill, when to use).  
2. One MDX per group S1–S8 using T3 template.  
3. Cross-link concepts (cellmap on Fill page, rank vs formal on Match page).  
4. For stub/evolving tools (e.g. some monitors): “capability available; behavior may expand” — no overclaim.

### Phase 4 — Concepts + FAQ + Use cases (2–4 days)

1. Port glossary + concept deep dives.  
2. Port FAQ (batch; answer-first).  
3. Port use cases (ultrasound, defibrillator).  
4. Role pages for bid / product / RA.

### Phase 5 — SEO hardening (1–2 days)

1. Title/description audit spreadsheet.  
2. Internal link graph (hub → skill → concept → FAQ).  
3. `llms.txt` for docs (pointers only; no metric fork).  
4. Redirects + GSC later (ops).  
5. Compare pages only if not duplicating orbid.dev conversion pages—prefer link out.

### Phase 6 — Cleanup (1 day)

1. Delete or `noindex` dead legacy MDX not redirected.  
2. Strip all remaining MedStrato-only product claims and `app.medstrato.com` primary CTAs.  
3. Grep gate: zero required screenshots; brand clause present on hub pages.  
4. API tab: either remove or stub “coming soon / contact” until public Orbid API subset is approved.

### Phase 7 — Optional API docs (later)

Document public-safe subset only (sessions, upload, library attach)—not internal 140 routes.

---

## 8. Task checklist (execution-ready)

### Task 1: Brand + `docs.json` IA

**Files:** `docs.json`, `index.mdx`, `README.md`  
**Done when:** site name Orbid AI; nav matches §3; footer links orbid.dev.

### Task 2: Home + What is Orbid + Quickstart + Core loop

**Files:** `index.mdx`, `guides/what-is-orbid.mdx`, `quickstart.mdx`, `guides/core-loop.mdx`  
**Done when:** formerly MedStrato on first mention; no screenshots; utterances included.

### Task 3: Workspace guides

**Files:** `guides/workspace/*.mdx`  
**Done when:** Agents/Library/Knowledge/Memory/Templates/Review/Settings described without UI shots.

### Task 4: Skills hub + 8 skill group pages

**Files:** `guides/skills/*.mdx`  
**Done when:** every S-tier skill from §5 appears; prereqs + example utterances; professional notes section.

### Task 5: Import orbid-knowledge FAQ + glossary + guides

**Files:** `faq/*`, `glossary.mdx` or `concepts/*`, `guides/*`  
**Done when:** answer-first; sibling links; no pricing invention.

### Task 6: Use cases + roles

**Files:** `use-cases/*`, `roles/*`  
**Done when:** device scenarios + bid/product/RA roles only.

### Task 7: Redirects + legacy purge

**Files:** `docs.json` redirects; delete/unpublish legacy nav pages  
**Done when:** no KOL/Events primary paths; critical old URLs redirect.

### Task 8: SEO pass + llms

**Files:** all public MDX frontmatter; optional `llms.txt`  
**Done when:** checklist §4.3 green on hub/skills/concepts/FAQ.

### Task 9: Verification grep gates

```bash
# From docs repo root
rg -n 'MedStrato' --glob '*.mdx'   # only allowed with (formerly MedStrato) or company footnote
rg -n 'app\.medstrato\.com' --glob '*.mdx'
rg -n '<img |!\[.*\]\(/images/' --glob 'guides/**/*.mdx' --glob 'skills/**/*.mdx'
rg -n 'Orbid AI \(formerly MedStrato\)' --glob 'index.mdx' --glob '**/what-is-orbid.mdx'
rg -n 'KOL|Campaigns|advisory board' --glob 'docs.json'
```

**Done when:** gates pass or documented exceptions.

---

## 9. Audit — current `stratosphere_docs` vs this plan

### 9.1 Executive audit score

| Dimension | Score (0–10) | Notes |
|-----------|--------------|-------|
| Brand alignment | 1 | MedStrato everywhere; Orbid ≈ 0 |
| Product model alignment | 2 | Old multi-module OS; not Orbid agent |
| Skills accuracy | 1 | No catalog skills; Autopilot UI narrative |
| Ordinary user UX of docs | 4 | Has quickstart but wrong product |
| Professional depth | 3 | Some tender pages, wrong lifecycle |
| SEO potential | 5 | Structure OK; wrong keywords/entities |
| Screenshot debt | 0 | User manual + dozens of UI images (forbidden under new policy) |
| Canonical SSOT link | 0 | Ignores orbid-knowledge / orbid.dev |

**Overall: rebuild, do not patch.**

### 9.2 Brand audit

| Check | Current | Target |
|-------|---------|--------|
| Site name | MedStrato | Orbid AI |
| First mention form | MedStrato | Orbid AI (formerly MedStrato) |
| Primary CTA domain | medstrato.com / app.medstrato.com | orbid.dev (+ app/orbid paths) |
| Title brand | MedStrato | Orbid AI |

### 9.3 Module coverage audit

| Target IA item | In old docs? | Action |
|----------------|--------------|--------|
| What is Orbid AI | No | Create |
| Core loop SMFD | Partial (wrong stages) | Rewrite |
| Agents / sessions | No | Create |
| Library | No (Products ≠ Library) | Create |
| Knowledge / Memory / Templates / Review | No | Create |
| Skills catalog S1–S8 | No | Create from YAML |
| Cellmap / residual / product lock | No | Import knowledge |
| Go/No-Go (real skill) | Shallow / different | Rewrite |
| Fill Excel skill | Old commercial editor | Rewrite |
| Deliverables | Old tender package UI | Rewrite |
| FAQ answer-first set | Glossary only | Import 30 FAQs |
| KOL/Events/Campaigns… | Heavy | Remove from primary |
| API Orbid | No | Phase 7 |
| Screenshots | Many | Strip |

### 9.4 Skills coverage audit (old docs vs catalog)

| Catalog skill (examples) | Documented today? |
|--------------------------|-------------------|
| `run_tender_scan` | No (old “parse” UI instead) |
| `run_match` | Partial wrong framing |
| `run_fill_excel` | No |
| `run_gonogo` | Partial |
| `run_generate_deliverable` | Partial package story |
| `search_product_catalog` | No |
| `web_research` | No |
| `create_monitor` | No |
| `query_knowledge` | No |
| Phase-aware next steps | No |

### 9.5 Audience audit

| Lane | Old docs | Gap |
|------|----------|-----|
| Ordinary user | Quickstart = import KOLs | Wrong first path; no “what to type” |
| Professional | Editors / commercial tools | Missing residual, evidence, rank vs formal |
| SEO | MedStrato + KOL queries | Need tender-matching / bid AI entities under Orbid AI |

### 9.6 Risk register

| Risk | Mitigation |
|------|------------|
| Over-claiming stub tools | Mark evolving; prefer S-tier skills in v1 |
| Duplicate SEO vs orbid.dev | Docs = how-to + ops semantics; site = conversion; cross-link |
| Legacy SEO traffic loss | Redirect map; soft landings |
| Team still says MedStrato | Brand clause + style guide in CONTRIBUTING for docs |
| UI changes make steps false | No screenshots; utterance + outcome based copy |
| Dual product in monorepo confuses writers | Scope lock: Orbid shell only |

### 9.7 Definition of Done (docs v1)

- [ ] Primary nav is Orbid-only IA (§3)  
- [ ] Hub + Quickstart + Core loop + Skills hub + 8 skill groups live  
- [ ] ≥15 FAQ or concept pages from orbid-knowledge  
- [ ] Brand: Orbid AI (formerly MedStrato) on hub/what-is; no MedStrato-only product claims  
- [ ] Zero product UI screenshots in live guides/skills  
- [ ] Grep gates (§8 Task 9) pass  
- [ ] External CTAs prefer orbid.dev  
- [ ] Explicit human ownership disclaimer on match/fill/go-no-go pages  

---

## 10. Sample copy blocks (for writers)

### 10.1 Hub blurb

> **Orbid AI (formerly MedStrato)** helps medical-device teams run bid work in one agent workspace: scan tenders, match products, fill response forms, and prepare deliverables. This help center explains what to ask Orbid, what each skill does, and how specialists keep control of go/no-go and submission.

### 10.2 Skill blurb — Match

> **Match** compares a selected product’s specifications to the scanned tender’s requirements. Orbid surfaces meet / partial / gap style outcomes and deviations for human review. It does not award contracts and should not be treated as a substitute for formal bid sign-off.

### 10.3 Formerly clause (use once per major page)

> Orbid AI was previously known as MedStrato. Product documentation, app surfaces, and primary site now use the Orbid AI brand; some legacy links may still mention MedStrato during migration.

---

## 11. Open decisions (need owner)

1. **Docs hostname:** stay on current Mintlify domain vs `docs.orbid.dev`.  
2. **API docs in v1?** Recommend no — “contact / coming soon”.  
3. **Public claim of deliverable count / monitor source count:** only if present on orbid.dev llms.  
4. **ZH locale in Mintlify v1** or EN-only first.  
5. **Hard delete vs archive** of KOL/Events MDX files (nav remove is mandatory either way).

---

## 12. Execution options (after approval)

1. **This session, phased commits** — implement Phase 1–2 scaffold + core pages, then skills.  
2. **Parallel content import** — one track ports orbid-knowledge FAQ/glossary; another writes skill pages from catalog YAML.  
3. **Spec-only freeze** — product/docs owners comment on §11, then implement.

---

## Appendix A — File ownership

| Path | Owner after rebuild |
|------|---------------------|
| `docs.json` | Docs engineering |
| `guides/skills/*` | Docs + product (catalog review) |
| `faq/*`, `concepts/*` | Product-ops (orbid-knowledge sync) |
| Pricing numbers | **Never** in this repo — orbid.dev |
| Screenshots folder | Deprecated for product guides |

## Appendix B — Key monorepo paths (writers)

```
orbid-knowledge/CANONICAL.md
orbid-knowledge/about/orbid.md
orbid-knowledge/about/product-capabilities.md
orbid-knowledge/faq/
orbid-knowledge/glossary/
orbid-knowledge/guides/
orbid-knowledge/use-cases/
src/lib/orbid/routing/catalog/*.yaml
src/lib/orbid/routing/phases.yaml
docs/gtm/en-feature-manual.html
```

## Appendix C — Related prior audit

Conversation audit (2026-08-01): old MedStrato help center is a wrong product model vs Orbid AI agent workspace; monorepo still contains legacy `(protected)` routes that must not drive primary docs IA.
