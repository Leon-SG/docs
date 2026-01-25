# Help Center Redesign Plan

**Date**: 2025-01-25
**Goal**: 综合优化帮助中心 - 自助服务 + Onboarding + SEO 获客

## Target Users

- Medical Affairs / MSL 团队
- 市场营销 / 商务拓展人员

## Design Approach: 混合架构

在现有按功能模块分类的文档基础上，新增三个内容层：

| 层级 | 内容类型 | SEO 价值 |
|------|---------|---------|
| 入口层 | Use Cases (场景页) | 高（长尾词）|
| 入口层 | Roles (角色页) | 中 |
| 指南层 | Product Guides (现有) | 中 |
| 深度层 | Best Practices | 高（专业词）|
| 深度层 | Glossary (术语表) | 高 |

---

## New Information Architecture

```
stratosphere_docs/
├── Getting Started
│   ├── index.mdx (改写：新首页)
│   ├── quickstart.mdx (改写：产品 Quickstart)
│   └── glossary.mdx (🆕)
│
├── Use Cases (🆕 场景入口 - SEO 重点)
│   ├── index.mdx
│   ├── kol-engagement-workflow.mdx
│   ├── event-management-lifecycle.mdx
│   ├── regulatory-signal-monitoring.mdx
│   └── ai-powered-research.mdx
│
├── For Your Role (🆕 角色入口)
│   ├── for-medical-affairs.mdx
│   └── for-marketing.mdx
│
├── Product Guides (✅ 保留现有)
│   ├── AI Native Workflow
│   ├── Events
│   ├── KOL
│   ├── Campaigns
│   ├── Signals
│   ├── Investigations
│   ├── Products
│   ├── Press
│   ├── Trends
│   ├── Map
│   ├── Registration
│   ├── Settings
│   └── Billings
│
├── Best Practices (🆕 深度内容)
│   ├── index.mdx
│   ├── kol-tiering-methodology.mdx
│   ├── event-invitation-best-practices.mdx
│   └── ai-prompt-tips.mdx
│
└── API Reference (保留)
```

---

## Use Cases Design

### 4 Core Use Case Pages

| Page | SEO Keywords | Content Structure |
|------|-------------|-------------------|
| `kol-engagement-workflow` | "KOL management software", "医疗器械 KOL 管理" | Challenge → Solution → 5-Step Workflow → Screenshots → CTA |
| `event-management-lifecycle` | "medical conference management", "学术会议管理系统" | Pre/During/Post Event Phases → Features per Phase → Case Data |
| `regulatory-signal-monitoring` | "regulatory intelligence platform", "医疗器械法规监控" | Why → Signal Sources → AI Analysis → Action Items |
| `ai-powered-research` | "AI research report generator", "AI 行业研究报告" | Traditional vs AI → Investigations Demo → Templates |

### Use Case Page Template

```markdown
---
title: "[Topic]: [Outcome-focused subtitle]"
description: "[1-2 sentences with primary keyword]"
---

## The Challenge
[Pain points that resonate with target users]

## How Stratosphere Helps
[Value proposition, key differentiators]

## Step-by-Step Workflow
[5-7 steps with links to Product Guides]

## Real Results (optional)
[Customer data/case study]

## Get Started
[CTA → sign up / demo]
```

---

## Roles Pages Design

### for-medical-affairs.mdx

Target: Medical Affairs Leads, MSLs

Key workflows:
- KOL Relationship Management
- Scientific Event Execution
- Intelligence & Research

### for-marketing.mdx

Target: Marketing, Business Development

Key workflows:
- Campaign Management
- Content Creation (Press)
- Opportunity Tracking
- Trend Analysis

---

## Best Practices Design

### 3 Core Deep Content Pages

| Page | SEO Keywords | Content Value |
|------|-------------|---------------|
| `kol-tiering-methodology` | "KOL tiering framework", "KOL 分层模型" | Industry methodology + Stratosphere support |
| `event-invitation-best-practices` | "医学会议邀请", "conference invitation email" | Timing/frequency/templates/A-B testing |
| `ai-prompt-tips` | "AI prompt engineering", "AI 提示词技巧" | Effective prompts for Stratosphere AI |

### Best Practice Page Template

```markdown
---
title: "[Topic]: A Practical Guide for [Audience]"
description: "[1-2 sentences with keyword]"
---

## Why This Matters
[Industry context]

## The Framework/Methodology
[Core content with tables/diagrams]

## How to Apply This in Stratosphere
[Product integration]

## Common Mistakes to Avoid
[Pitfall guide]

## Further Reading
[Internal links]
```

---

## Glossary Design

- 20-30 core terms
- Each term with definition + internal links
- Categories: KOL Management, Events, Regulatory, AI/Research

Sample terms:
- KOL (Key Opinion Leader)
- KOL Tiering
- MSL (Medical Science Liaison)
- Advisory Board
- RSVP Rate
- Signal
- Investigation

---

## SEO Optimization Rules

| Element | Rule | Example |
|---------|------|---------|
| Title | Action + Object + Brand (optional) | "Create a KOL Profile \| Stratosphere" |
| Description | 1-2 sentences, primary keyword, under 150 chars | "Learn how to manually add a KOL to your database..." |
| URL Slug | verb-noun, lowercase, hyphens | `/guides/kol/create-kol` |
| H1 | Match or expand Title | |
| Image Alt | Describe content + keyword | "KOL profile page showing tier, specialty, and event history" |

---

## Best Practices Checklist

- [x] Task-oriented titles (verbs)
- [x] 3-click principle (Home → Module → Page)
- [x] Search-friendly (Mintlify search + Glossary)
- [x] Progressive disclosure (Use Cases → Guides → Best Practices)
- [x] Multi-entry navigation (Module / Role / Scenario)
- [x] Visual aids (screenshots per core page)
- [x] Internal link network (Related guides + Glossary cross-links)
- [x] Mobile-friendly (Mintlify responsive)
- [x] Update markers (version/date notes)

---

## Implementation Phases

### Phase 1: New Content Structure
1. Create `use-cases/` directory and 5 files
2. Create `roles/` directory and 2 files
3. Create `best-practices/` directory and 4 files
4. Create `glossary.mdx`
5. Update `docs.json` navigation

### Phase 2: Content Writing
1. Read SaaS app code to extract feature details
2. Write Use Case pages with workflow steps
3. Write Role pages with workflow links
4. Write Best Practice pages with methodology
5. Write Glossary terms

### Phase 3: Existing Docs Optimization
1. Execute `GUIDES_SEO_REWRITE_PLAN.md` URL/title/description updates
2. Add Related guides links to each page
3. Add/update screenshots with proper Alt text

### Phase 4: Final Review
1. Test all internal links
2. Verify SEO meta info
3. Test search functionality
4. Mobile responsiveness check

---

## Material Sources

| Source | Usage |
|--------|-------|
| SaaS App Code (`/Users/lui831/Cursor/stratosphere/src/`) | Feature descriptions, field names, UI logic |
| Existing Docs (`stratosphere_docs/guides/`) | Reuse existing content |
| Screenshots (`stratosphere_docs/images/`) | Visual assets |
| Database Schema | Data structure, field definitions |
