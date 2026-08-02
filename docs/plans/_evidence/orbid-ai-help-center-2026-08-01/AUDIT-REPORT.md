# AUDIT-REPORT.md — Orbid AI help center rebuild

**Date:** 2026-08-01  
**Authority:** goal `2026-08-01-orbid-ai-help-center-rebuild-goal.md` + plan SSOT  
**Docs root:** `/Users/lui831/Cursor/stratosphere_docs`

## A. Brand audit

**Re-checked after skeptic fix (2026-08-01):** Identity/history must say former name = **MedStrato**, not self-rename to Orbid AI.

| Check | Status | Proof |
|-------|--------|-------|
| Site name Orbid AI | PASS | `docs.json` name |
| First hub/what-is clause: Orbid AI (formerly MedStrato) | PASS | index + what-is frontmatter/body |
| Identity table Formerly = MedStrato | PASS | `guides/what-is-orbid.mdx` row |
| Hub "Formerly MedStrato" section | PASS | index: previously known as **MedStrato** |
| Legacy API attributed to MedStrato docs | PASS | `api-reference/introduction.mdx` |
| Primary CTAs orbid.dev | PASS | navbar, logo, index, quickstart |
| No MedStrato-only product branding | PASS | MedStrato only in formerly/history footnotes |


## B. IA audit (plan §3 vs docs.json)

| Planned group | Present |
|---------------|---------|
| Getting Started | Y |
| Workspace (7) | Y |
| Skills hub + S1–S8 pages | Y (10 skill pages + index) |
| Workflows | Y |
| Concepts | Y |
| FAQ | Y |
| Use Cases (bid-ops) | Y |
| Roles bid/product/RA | Y |
| Operations | Y |
| API coming soon | Y |
| KOL/Events/Campaigns/Signals/Press/Map/Training primary | **Removed** |

## C. Skills coverage

See `SKILLS-MATRIX.md`. Core S-tier documented:

- `run_tender_scan`, `run_match`, `run_fill_excel`, `run_gonogo`, `run_generate_deliverable`, `search_product_catalog`

Monitors labeled evolving where appropriate. Catalog basenames from monorepo: `logs/catalog-basenames.txt` (54 tools).

## D. Audience audit (sample)

| Page | Answer | How-to/utterances | Professional | Related |
|------|--------|-------------------|--------------|---------|
| index | Y | Y (cards) | Y | Y |
| quickstart | Y | Y | Y | Y |
| skills/match | Y | Y | Y | Y |
| concepts/cellmap | Y | Y | Y | Y |
| faq/scan-match-fill | Y | Y | Y | Y |

## E. SEO audit

| Item | Status |
|------|--------|
| Titles + descriptions on core pages | Y |
| Answer-first FAQ | Y |
| Stable English slugs | Y |
| Internal links hub→skills→concepts | Y |
| KPI only via orbid.dev links | Y |
| No screenshot SEO debt on live guides | Y |

## F. Screenshot debt

- Live `guides/**/*.mdx` + index + quickstart: **0** product UI embeds (G3).  
- Legacy unlinked MDX may remain on disk; stripped images where found.  
- Nav no longer includes user-manual.

## G. Product fidelity

| Check | Status |
|-------|--------|
| Core loop Scan→Match→Fill→Deliver | PASS |
| Skills use real catalog ids | PASS |
| Human ownership on match/fill/go-no-go | PASS |
| Not Autopilot-UI-primary narrative | PASS (Agents/skills) |
| Pricing not invented | PASS |

## H. Scorecard (0–10)

| Dimension | Score | Notes |
|-----------|-------|-------|
| Brand alignment | 9 | Formerly clause + history Identity=MedStrato + orbid.dev CTAs (re-audited post-skeptic) |
| Product model alignment | 9 | Agent SMFD + workspace |
| Skills accuracy | 9 | Catalog-backed S1–S8 |
| Ordinary user UX of docs | 9 | Quickstart utterances |
| Professional depth | 8 | Concepts + residual/cellmap |
| SEO potential | 8 | FAQ/glossary/slugs; deeper GEO later |
| Screenshot policy | 10 | Zero on live guides |
| SSOT link | 9 | orbid-knowledge + catalog aligned |

**All dimensions ≥ 8 → scorecard PASS.**

## I. Residual backlog

- Full public Orbid API reference (deferred by design)  
- ZH locale  
- Hard-delete of every legacy MDX file (nav+redirects done; disk purge optional)  
- Mintlify live deploy verification outside this workspace  
- Optional deeper FAQ 01–30 1:1 port (condensed into 4 FAQ hubs)

## Verdict

**PASS** — Close gate evidence present; G1–G8 pass; structural test green; scorecard all ≥ 8.
