# GATES.md — Orbid AI help center

| Gate | Rule | Result | Evidence |
|------|------|--------|----------|
| G1 | MedStrato only in formerly / brand footnotes | **PASS** | All hits are `Orbid AI (formerly MedStrato)` or "formerly MedStrato" glossary note — `logs/g1-medstrato.txt` |
| G2 | No `app.medstrato.com` in mdx | **PASS** | `logs/g2-app-medstrato.txt` empty |
| G3 | No screenshot embeds in guides/skills/quickstart/index | **PASS** | `logs/g3-screenshots.txt` empty; structural verifier |
| G4 | Formerly clause on index + what-is | **PASS** | `logs/g4-formerly.txt` |
| G5 | No legacy module paths in **nav pages** | **PASS** | `logs/g5-legacy-nav.txt` empty (redirects may still list sources) |
| G6 | `docs.json` name Orbid AI | **PASS** | `logs/g6-site-name.txt` |
| G7 | Core skill ids in skills docs | **PASS** | `logs/g7-skills.txt` |
| G8 | orbid.dev on hub | **PASS** | `logs/g8-orbid-dev.txt` |

Structural: `npm run test:docs-gates` → all PASSED (`logs/structural-gates.log`).

Post-skeptic: structural verifier includes Identity Formerly=MedStrato, index history, API legacy attribution.
