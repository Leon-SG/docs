# W0 Gap inventory — 2026-08-01

## Defaults applied
| Decision | Default |
|----------|---------|
| Docs host | Current Mintlify; CTA → orbid.dev |
| API v1 | Coming soon stub only |
| KPI | Link orbid.dev only |
| Locale | EN primary |
| Legacy MDX | Out of primary nav + redirects |

## Current docs.json groups vs target IA

| Target group | Present in old nav? | Action |
|--------------|---------------------|--------|
| Getting Started (index, quickstart, what-is, core-loop, glossary) | Partial (wrong brand) | Rewrite |
| Workspace (agents, library, knowledge, memory, templates, review, setup) | No | Create |
| Skills S1–S8 | No | Create |
| Workflows | Partial old tenders | Replace |
| Concepts | No (old glossary only) | Create |
| Use Cases (bid-ops) | Wrong (KOL/events) | Replace |
| Roles bid/product/RA | Wrong (MA/marketing) | Replace |
| FAQ | No | Create |
| API coming soon | Wrong kols/events API | Replace |
| KOL/Events/Campaigns/Signals/Press/Map/Training/Trends | Heavy primary | Remove from nav |

## Catalog basenames
See `logs/catalog-basenames.txt` (54 tools from monorepo routing/catalog).

## Skill matrix target
Plan §5 S1–S8 groups; core S-tier: run_tender_scan, run_match, run_fill_excel, run_gonogo, run_generate_deliverable, search_product_catalog.
