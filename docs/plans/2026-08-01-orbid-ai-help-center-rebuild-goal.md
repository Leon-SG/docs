# Goal: Orbid AI Help Center — Execute · Check · Audit (full plan)

> **How to run（/goal 语法）**  
> 1. 读本文件全文 + 计划 SSOT。  
> 2. 将文末 **「★ 推荐粘贴」** 整段贴进 `/goal`（或同义 objective）。  
> 3. 中途：`/goal status` · `pause` · `resume` · 放弃 `clear`。  
> 4. **Close gate 全绿** 才可 `completed`；禁止假绿。

| Field | Value |
|-------|--------|
| **Status** | ready |
| **Created** | 2026-08-01 |
| **Type** | docs rebuild + QA + audit |
| **Plan SSOT** | `docs/plans/2026-08-01-orbid-ai-help-center-rebuild.md` |
| **Docs workspace** | `/Users/lui831/Cursor/stratosphere_docs` |
| **Product SSOT workspace** | `/Users/lui831/orca/workspaces/stratosphere/feat-demo-match-ssot-b` |
| **Evidence** | `docs/plans/_evidence/orbid-ai-help-center-2026-08-01/` |

---

## Objective

Rebuild Mintlify help center from **MedStrato multi-module OS** to **Orbid AI (formerly MedStrato)** bid-ops agent docs:

1. **Execute** the full plan (Phases 0–6 / Tasks 1–9).  
2. **Check** every Definition of Done + grep gates + audience templates.  
3. **Audit** end-to-end against product SSOT (`orbid-knowledge/`, `routing/catalog/*.yaml`) and produce evidence report.

**Done =** live IA is Orbid-only, real skills described (no screenshots), brand clause correct, SEO basics, audit report PASS — not “wrote some pages.”

---

## Authority (conflict order)

1. **This goal** Iron laws + Close gate  
2. **Plan SSOT** `docs/plans/2026-08-01-orbid-ai-help-center-rebuild.md`  
3. Product: `orbid-knowledge/CANONICAL.md` + `about/*` + `faq/*` + `glossary/*`  
4. Skills: `src/lib/orbid/routing/catalog/*.yaml` + `phases.yaml`  
5. Marketing metrics/pricing: **only** https://orbid.dev (link out; never invent)

---

## Iron laws

1. **Brand:** Primary **Orbid AI**. First mention on hub / what-is / site description: **Orbid AI (formerly MedStrato)**. Never MedStrato-only product branding.  
2. **No screenshots:** Zero product UI `<img>` / user-manual screenshot embeds in live guides/skills/workspace pages. Description + utterances + tables only.  
3. **Real skills only:** Skill pages map to catalog ids (S1–S8 in plan §5). No invented tools. Stub/evolving tools labeled honestly.  
4. **No invented metrics/pricing/KPI** (including hard “82 deliverables” / “100+ sources” unless confirmed on orbid.dev llms).  
5. **Human ownership** on match / fill / go-no-go pages.  
6. **Primary nav Orbid-only:** No KOL / Events / Campaigns / Signals / Press / Map / Training / Trends as primary groups.  
7. **Three lanes on major pages:** plain answer · how to use (utterances) · professional notes · related (SEO).  
8. **Single thread** for this goal; evidence written after each phase.  
9. **No fake green:** Do not mark completed if grep fails, legacy nav remains, or audit scorecard incomplete.  
10. **Do not** implement product app code in monorepo unless required for docs truth; this goal is **docs repo first**.

---

## Waves (钉死顺序)

| Wave | Name | Must produce |
|------|------|----------------|
| **W0** | Freeze + inventory | Evidence folder; honest gap matrix vs plan §9; confirm open decisions defaults if unset (see Defaults) |
| **W1** | Scaffold | `docs.json` Orbid AI IA; redirects skeleton; stubs for full IA; README brand |
| **W2** | Core narrative | index · what-is-orbid · quickstart · core-loop · workspace pages |
| **W3** | Skills | skills/index + S1–S8 group pages; catalog id coverage matrix |
| **W4** | Concepts · FAQ · Use cases · Roles | Port/adapt orbid-knowledge; bid/product/RA roles only |
| **W5** | Cleanup + SEO | Strip legacy primary nav; kill screenshot pages from nav; titles/descriptions; llms pointer |
| **W6** | Check gates | Full grep + manual checklist § plan 4.3 + DoD |
| **W7** | Full audit | AUDIT-REPORT.md scorecard; residual risks; PASS/FAIL |

### Defaults if owner silent

| Open decision | Default for this goal |
|---------------|------------------------|
| Docs hostname | Keep current Mintlify host; CTA → orbid.dev |
| API docs v1 | **No** — remove or “coming soon” stub only |
| KPI numbers | Link orbid.dev only |
| Locale v1 | **EN primary** |
| Legacy MDX | Remove from nav + redirects; hard-delete optional after redirect map |

---

## Check suite (must run in W6)

From **docs workspace** root:

```bash
mkdir -p docs/plans/_evidence/orbid-ai-help-center-2026-08-01/{logs,gates}

# G1 brand — MedStrato only allowed with formerly / company footnote context
rg -n 'MedStrato|medstrato' --glob '*.mdx' --glob 'docs.json' \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g1-medstrato.txt

# G2 no primary app.medstrato CTAs in new core pages
rg -n 'app\.medstrato\.com' --glob '*.mdx' \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g2-app-medstrato.txt

# G3 no screenshots in guides/skills (allow logo/favicon only outside these)
rg -n '<img |!\[[^\]]*\]\(/images/' --glob 'guides/**/*.mdx' --glob '**/skills/**/*.mdx' --glob 'quickstart.mdx' --glob 'index.mdx' \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g3-screenshots.txt

# G4 formerly clause present
rg -n 'Orbid AI \(formerly MedStrato\)' --glob 'index.mdx' --glob '**/what-is-orbid.mdx' --glob 'docs.json' \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g4-formerly.txt

# G5 legacy modules not in nav
rg -n 'guides/kol|guides/events|guides/campaign|guides/signals|guides/press|guides/map|guides/training' docs.json \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g5-legacy-nav.txt

# G6 docs.json name
rg -n '"name":\s*"Orbid AI"' docs.json \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g6-site-name.txt

# G7 skill ids mentioned (sample core S-tier)
rg -n 'run_tender_scan|run_match|run_fill_excel|run_gonogo|run_generate_deliverable|search_product_catalog' \
  --glob '**/skills/**/*.mdx' --glob '**/skills*.mdx' \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g7-skills.txt

# G8 orbid.dev CTAs preferred on hub
rg -n 'orbid\.dev' --glob 'index.mdx' --glob 'quickstart.mdx' --glob 'docs.json' \
  2>&1 | tee docs/plans/_evidence/orbid-ai-help-center-2026-08-01/logs/g8-orbid-dev.txt
```

**Gate pass rules:**

| Gate | Pass |
|------|------|
| G1 | No bare “MedStrato product” claims; remaining hits reviewed in AUDIT |
| G2 | Zero hits on quickstart/index/skills/workspace OR justified legacy archive only |
| G3 | Zero hits on listed globs |
| G4 | ≥1 hit on index + what-is |
| G5 | Zero hits in `docs.json` navigation pages arrays |
| G6 | Exactly Orbid AI name |
| G7 | All listed skill ids appear in skills docs |
| G8 | orbid.dev present on hub surfaces |

Optional: `npm run dev` / `mint dev` smoke — home + 3 skill pages 200.

---

## Audit suite (W7 — mandatory)

Produce `docs/plans/_evidence/orbid-ai-help-center-2026-08-01/AUDIT-REPORT.md` with:

### A. Brand audit

- Site name, first-mention clause, CTA domains, title template samples.

### B. IA audit

- Plan §3 groups vs actual `docs.json` (table: planned | present | missing | extra).

### C. Skills coverage audit

- For each plan §5 group S1–S8: list catalog ids → documented Y/N/partial.  
- Cross-check against monorepo catalog directory listing (refresh if product moved).

### D. Audience audit

- Sample 5 pages: has Answer / How to use / Professional / Related? Y/N.

### E. SEO audit

- Plan §4.3 checklist on: index, quickstart, core-loop, skills/index, match skill, cellmap/FAQ sample.

### F. Screenshot debt

- Count remaining `/images/user-manual` references in **live** nav pages (must be 0).

### G. Product fidelity

- Core loop wording = Scan → Match → Fill → Deliver.  
- No Autopilot-only old tender editor as primary path.  
- Human ownership statements present.

### H. Scorecard (0–10)

Brand · Product model · Skills accuracy · Ordinary UX · Pro depth · SEO · Screenshot policy · SSOT link  

**PASS** only if all ≥ 8 and Close gate green.

### I. Residual backlog

- Honest list of deferred (API, ZH, hard-delete files).

---

## Evidence layout

```text
docs/plans/_evidence/orbid-ai-help-center-2026-08-01/
  logs/           # gate command outputs
  gates/          # GATES.md checklist pass/fail
  AUDIT-REPORT.md
  SKILLS-MATRIX.md
  SUMMARY.md      # waves done + close self-check
  REDIRECTS.md    # old → new map
```

---

## Close gate (all required)

- [ ] W0–W7 executed in order; SUMMARY.md filled  
- [ ] Plan Tasks 1–9 effectively done (or explicit WONTFIX with reason in SUMMARY)  
- [ ] G1–G8 gates logged; failures fixed or waived in AUDIT with owner  
- [ ] AUDIT-REPORT.md scorecard all ≥ 8  
- [ ] `docs.json` name Orbid AI; primary nav Orbid-only  
- [ ] Hub + what-is contain **Orbid AI (formerly MedStrato)**  
- [ ] Skills hub + 8 groups live; core S-tier skills covered  
- [ ] Zero screenshots on live guides/skills/quickstart/index  
- [ ] Primary CTAs → orbid.dev  
- [ ] No fake “completed” without evidence paths above  

**Fail closed:** any Close gate box unchecked → status stays in progress / blocked, not completed.

---

## Fake-green ban

- Claiming done while KOL/Events still in `docs.json` nav  
- Only renaming MedStrato → Orbid without IA/skills rewrite  
- Keeping user-manual screenshots “temporarily” in live nav  
- Skills pages that describe old Bid Autopilot UI instead of catalog tools  
- Audit without monorepo catalog cross-check  
- Skipping G3 because “images look fine”

---

## 短启动 Prompt（整段复制到 /goal）

```
/goal Execute docs/plans/2026-08-01-orbid-ai-help-center-rebuild-goal.md

目标：按完整计划重建 Orbid AI Help Center；执行全波次 + Check gates + 全量审计；Close gate 全绿才 completed。

必读（冲突以 goal Iron laws / Close gate 为准）：
- docs/plans/2026-08-01-orbid-ai-help-center-rebuild-goal.md   （本 goal 全文）
- docs/plans/2026-08-01-orbid-ai-help-center-rebuild.md       （Plan+Spec+Audit SSOT）

工作区：
- Docs: /Users/lui831/Cursor/stratosphere_docs
- Product SSOT: /Users/lui831/orca/workspaces/stratosphere/feat-demo-match-ssot-b
  （orbid-knowledge/ · src/lib/orbid/routing/catalog/*.yaml · phases.yaml）

Evidence: docs/plans/_evidence/orbid-ai-help-center-2026-08-01/

执行顺序（钉死）：
0) W0 建 evidence 目录 + 诚实 gap 盘点（对照 plan §9）
1) W1 docs.json 改 Orbid AI IA + redirects 骨架 + 页面 stubs
2) W2 index / what-is-orbid / quickstart / core-loop / workspace（描述-only，无截图）
3) W3 skills/index + S1–S8；技能 id 对齐 catalog；写 SKILLS-MATRIX.md
4) W4 concepts + FAQ（port orbid-knowledge）+ use-cases + bid/product/RA roles
5) W5 清 legacy 主导航 + SEO frontmatter + orbid.dev CTA；REDIRECTS.md
6) W6 跑 G1–G8 tee 到 logs/；修到过门；GATES.md
7) W7 AUDIT-REPORT.md 全量审计 + 评分；SUMMARY.md Close gate 自检

硬约束：
- 品牌：Orbid AI (formerly MedStrato) 首次完整出现；禁止纯 MedStrato 产品叙事
- 禁止产品 UI 截图
- 真实 Orbid 技能 only；禁止编造定价/KPI
- 主导航禁止 KOL/Events/Campaigns/Signals 等 legacy 百科
- 普通用户 + 专业用户 + SEO 三车道模板
- 禁止假绿；Close gate 未齐不得 completed
```

---

## 极简粘贴版（token 紧时用）

```
/goal Execute docs/plans/2026-08-01-orbid-ai-help-center-rebuild-goal.md — Orbid AI help center full rebuild: W0 inventory → W1 docs.json IA → W2 core narrative → W3 skills S1–S8 from catalog → W4 FAQ/concepts/use-cases → W5 legacy purge+SEO → W6 G1–G8 gates → W7 AUDIT-REPORT. Brand Orbid AI (formerly MedStrato). No screenshots. Real skills only. Evidence docs/plans/_evidence/orbid-ai-help-center-2026-08-01/. Close gate or no completed.
```

---

## ★ 推荐粘贴：执行 + 检查 + 审计（Strict）

```
/goal Execute docs/plans/2026-08-01-orbid-ai-help-center-rebuild-goal.md — STRICT execute + check + audit

# Immutable
Docs workspace: /Users/lui831/Cursor/stratosphere_docs
Product SSOT: /Users/lui831/orca/workspaces/stratosphere/feat-demo-match-ssot-b
Plan SSOT: docs/plans/2026-08-01-orbid-ai-help-center-rebuild.md
Goal authority: docs/plans/2026-08-01-orbid-ai-help-center-rebuild-goal.md
Evidence: docs/plans/_evidence/orbid-ai-help-center-2026-08-01/
Single-thread. No product app drive-by refactors. No fake green.

# Iron laws (do not violate)
1) Brand = Orbid AI; first hub/what-is mention = "Orbid AI (formerly MedStrato)"
2) Zero product UI screenshots in live guides/skills/quickstart/index
3) Skills = real catalog ids only (plan §5 S1–S8); label stubs honestly
4) No invented pricing/KPI; link https://orbid.dev only for metrics
5) Primary nav Orbid-only (no KOL/Events/Campaigns/Signals/Press/Map/Training/Trends)
6) Every major page: Answer + How-to (utterances) + Professional notes + Related
7) Human ownership on match/fill/go-no-go
8) Close gate full green before completed

# Phase 0 — Honest inventory (no skip)
- Read goal Iron laws + Close gate + plan §3 IA §5 skills §8 tasks §9 audit
- List current docs.json groups vs target IA (gap table → evidence)
- List monorepo catalog/*.yaml basenames; diff vs plan skill matrix
- Create evidence dirs: logs gates AUDIT/SUMMARY placeholders

# Phase 1 — Execute (W1–W5)
W1 Scaffold docs.json (name Orbid AI) + full nav stubs + redirects skeleton
W2 Write index, what-is-orbid, quickstart, core-loop (Scan→Match→Fill→Deliver), workspace pages
W3 Write skills/index + 8 skill group pages; SKILLS-MATRIX.md (id → page → Y/N)
W4 Port/adapt orbid-knowledge FAQ/glossary/guides/use-cases; roles = bid/product/RA only
W5 Remove legacy from primary nav; strip screenshot manuals from live nav; SEO titles/descriptions; orbid.dev CTAs; REDIRECTS.md
Defaults if unset: EN primary; no API v1; no hard KPI claims; keep host, CTA orbid.dev

# Phase 2 — Check (W6) — hard QA
Run G1–G8 from goal Check suite; tee every log under evidence/logs/
Fix until gates pass (or document waive with evidence — default: fix)
Write gates/GATES.md pass/fail table
Optional: mint/npm dev smoke home + 3 skill routes

# Phase 3 — Audit (W7) — hard audit
Write AUDIT-REPORT.md covering goal Audit suite A–I:
  Brand · IA · Skills coverage vs catalog · Audience · SEO · Screenshots · Product fidelity · Scorecard · Residual
Scorecard dimensions 0–10; PASS only if all ≥ 8 AND Close gate green
Write SUMMARY.md with wave checklist + Close gate self-check

# Close
update completed ONLY if Close gate all boxes checked and evidence paths exist.
If blocked: status blocked + exact failing gate + next fix — do not partial-complete.
```

---

## Related

- Plan+Spec+Audit: [`2026-08-01-orbid-ai-help-center-rebuild.md`](./2026-08-01-orbid-ai-help-center-rebuild.md)
