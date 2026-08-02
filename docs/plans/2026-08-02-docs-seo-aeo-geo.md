# Docs site: SEO · AEO · GEO 做法（与官网分工）

**Date:** 2026-08-02  
**Status:** Superseded for enforcement by **SPEC** — see `2026-08-02-docs-seo-aeo-geo-SPEC.md` (v1.1 enforced; repo L0/L1 PASS)

**Status (this file):** Working notes / summary  
**Authority:** orbid-knowledge `SEO-GEO-AEO.md` + website triad plan  
**Docs host (canonical):** https://docs.orbid.dev  

---

## 0. 分工（不要抢官网戏）

| 轴 | 官网 orbid.dev / medstrato.com | **本 Help Center (docs)** |
|----|-------------------------------|---------------------------|
| **SEO** | 商业词、对比、定价、GSC、转化 | **How-to / 定义 / workflow** 长尾；承接「怎么用 Orbid」 |
| **AEO** | 战略页 answer + FAQ schema | **Answer-first FAQ + 表/清单**；可被 AIO 抽取 |
| **GEO** | 主 llms.txt 指标与实体 | **次 llms.txt** 只描述 docs 地图 + 链到 orbid.dev；**禁止 KPI 分叉** |

**成功信号（docs）：**  
- 信息查询落在正确 how-to（session、match、fill、cellmap）  
- LLM 引用 docs 时事实与 orbid-knowledge / 产品一致  
- 不制造第二套定价/准确率数字  

---

## 1. Docs 三轴战术

### SEO
1. H1 / title = 意图词（question 或 task）  
2. Unique meta description 含 Orbid AI + 意图动词  
3. 稳定英文 slug；legacy 301  
4. 内链：workflow ↔ FAQ ↔ concept  
5. 旧模块页不进主导航；必要时 noindex（部署侧）  

### AEO
1. 每页 **Answer（40–80 词）** 置顶  
2. Details = **表 / 步骤 / 反模式**（非空话）  
3. FAQ 页 H2 = 用户问题句  
4. 固定 ownership 句，防模型过度承诺  

### GEO
1. 根目录 `llms.txt` / `llms-full.txt` 指向 orbid.dev 主事实  
2. 实体一致：Orbid AI · formerly MedStrato · medical-device bid agent  
3. 可引用事实：scan/match/fill/deliver；cellmap；rank≠formal；human ownership  
4. 工具 id 放 Tools reference，不与营销 KPI 混写  

---

## 2. 关键词簇（docs 主扛）

| 簇 | 主着陆 |
|----|--------|
| Orbid AI / formerly MedStrato | what-is-orbid, index |
| AI bid agent medical device | what-is, quickstart |
| scan vs match vs fill | faq + how-the-agent-works |
| tender matching / product match | workflow match + faq |
| go no-go medical tender | workflow + faq |
| cellmap / fill excel tender | faq + workflow fill |
| residual / evidence bid | trust + concepts |
| how to use Orbid | quickstart + what-to-say |

商业对比 / 定价 / 国家覆盖 → **只链 orbid.dev**。

---

## 3. 页面模板（强制）

```markdown
---
title: "<Intent> | Orbid AI"
description: "<Orbid AI + intent + benefit, ~150 chars>"
---

# <H1 = intent>

**Answer:** <40–80 words>

## Details | steps | table

## Anti-patterns (optional)

## Related
```

Workflow 页额外：**You want / You provide / What to say / What Orbid does / What you review**.

---

## 4. 交付物（本 repo）

| 文件 | 作用 |
|------|------|
| `llms.txt` | 机器入口；链主站 llms |
| `llms-full.txt` | docs 地图 + 事实边界 |
| `faq/*` | AEO 答案库 |
| `guides/workflows/*` | SEO how-to |
| 本计划 | 编辑军规 |

---

## 5. 不做

- 在 docs 写定价表 / 准确率 KPI  
- 与 orbid.dev 抢「best tender software」头词主着陆  
- 无 Details 的薄 FAQ 堆量  
