# Guides SEO & IA Rewrite Plan (Proposed)

目标：把 `guides/` 变成更像一线 SaaS 帮助中心的「任务导向」文档，并做 URL/标题/描述的 SEO 友好改造。

## 全局规则（执行时会统一套用）

- **URL/信息架构**：每个模块用 `index.mdx` 做模块首页（避免 `/overview`），其余页面用动词+对象的 slug（例如 `create-product`）。
- **SEO 元信息**：每页补齐 `description`（1 句、含关键词），`title` 避免纯 `Overview/Dashboard`。
- **内容模板**：每页默认结构：`What you can do` → `Where to find it`（界面路径）→ `Steps` → `Tips & troubleshooting`。
- **图片**：可加更多截图，但要有明确目的（“这一步你应该看到什么”）并补充 `alt`（含关键词）。
- **迁移策略**：在 `docs.json` 增加 `redirects`（把旧 URL 301/重定向到新 URL），避免 SEO 丢失与外链失效。

## 页面级改造映射（BEFORE → AFTER）

| BEFORE | AFTER | 效果提升点 |
|---|---|---|
| `guides/ai-native-workflow/guide.mdx` — `Dashboard` | `guides/ai-native-workflow/index.mdx` — `AI Native Workflow Overview` | 更短可读 URL；模块关键词进标题；便于做“工作流示例”内链聚合 |
| `guides/billings/untitled-page.mdx` — `Subscription and Usage Management` | `guides/billings/index.mdx` — `Billing & Usage` | 去掉 `untitled`；更常见检索词（billing/usage）；可加入用量指标表格提升可扫描性 |
| `guides/campaign/untitled-page.mdx` — `Overview` | `guides/campaign/index.mdx` — `Campaigns Overview` | 解决泛标题；模块首页更 SEO；清晰承接模板/变量/预览子页 |
| `guides/campaign/untitled-page-1.mdx` — `Email Template Selection and Customization` | `guides/campaign/email-templates.mdx` — `Email Templates` | slug 更短更可记；覆盖“email templates”高频词；适合加“模板类型/适用场景/必填变量” |
| `guides/campaign/untitled-page-2.mdx` — `Dynamic Variable Configuration for Email Personalization` | `guides/campaign/personalization-variables.mdx` — `Personalization Variables` | 关键词聚焦（personalization variables）；更易做 FAQ（变量未填/预览不一致） |
| `guides/campaign/untitled-page-3.mdx` — `Campaign Preview and Recipient Verification` | `guides/campaign/preview-and-testing.mdx` — `Preview & Test Emails` | 用用户任务表达；覆盖“preview/test emails”；可加入检查清单与通过标准 |
| `guides/events/guide.mdx` — `Dashboard` | `guides/events/index.mdx` — `Events Dashboard` | 模块首页化；标题更具检索意图；后续可把“详情页”拆分内链 |
| `guides/events/untitled-page.mdx` — `Event Administration and Editing` | `guides/events/event-details.mdx` — `Event Details (Team, Agenda, Attendees)` | slug 语义清晰；减少抽象词；按 Tab 写法更贴近 SaaS 帮助中心 |
| `guides/events/untitled-page-1.mdx` — `Attendee Public Portal Edit` | `guides/events/public-event-page-settings.mdx` — `Public Event Page Settings` | 命名统一（public page）；更 SEO；可加入“关闭链接影响/恢复方式”避免误操作 |
| `guides/events/untitled-page-2.mdx` — `Attendee Public Portal Guide and Event Registration Process` | `guides/events/public-page-and-registration.mdx` — `Public Page & Registration` | 关键词更聚焦；建议后续拆成两页（Portal / Registration flow）提升可读性 |
| `guides/investigations/overview.mdx` — `Overview` | `guides/investigations/index.mdx` — `Investigations Overview` | 模块首页化；标题含关键词；更适合沉淀“从模板到输出物”的主路径 |
| `guides/investigations/new-investigation.mdx` — `New Investigation` | `guides/investigations/create-investigation.mdx` — `Create an Investigation` | 动词型 slug 更符合搜索；更像 Help Center；可补“输入项/耗时/失败重试” |
| `guides/kol/overview.mdx` — `Overview` | `guides/kol/index.mdx` — `KOL Management Overview` | 解决泛标题；模块关键词更强；承接创建/导入/洞察/名片等子页 |
| `guides/kol/untitled-page.mdx` — `Manual KOL Entry Guide` | `guides/kol/create-kol.mdx` — `Create a KOL (Manual Entry)` | slug 直达用户任务；更 SEO；可用“必填/选填/建议”字段分组提升转化 |
| `guides/kol/untitled-page-1.mdx` — `Bulk Import KOLs via CSV` | `guides/kol/import-kols-csv.mdx` — `Import KOLs (CSV)` | 覆盖“import csv”搜索；适合加模板下载/字段映射/常见失败原因 |
| `guides/kol/untitled-page-2.mdx` — `KOL Profile and Intelligence Insights` | `guides/kol/kol-profile-and-insights.mdx` — `KOL Profile & Insights` | slug 更短；关键词更自然；按 Tabs 写清“你会看到什么/能做什么” |
| `guides/kol/untitled-page-3.mdx` — `KOL Public Profile Portal` | `guides/kol/public-profile-page.mdx` — `Public KOL Profile Page` | 统一 public profile 命名；可加“Claim”步骤/权限变化，减少理解成本 |
| `guides/kol/untitled-page-4.mdx` — `Digital Business Card and QR Code Connectivity` | `guides/kol/digital-business-card-qr.mdx` — `Digital Business Card (QR)` | slug 更直观；更利于分享；可加入“下载/分享/失效/权限”信息 |
| `guides/kol/activity-monitoring.mdx` — `Activity Monitoring` | `guides/kol/activity-monitoring.mdx` — `KOL Activity Monitoring` | 标题补关键词（KOL）；可补数据源/刷新频率/缺失原因，提升信任度 |
| `guides/map/overview.mdx` — `Overview` | `guides/map/index.mdx` — `Network Map Overview` | 模块首页化；关键词更聚焦（network map）；便于内链到交互分析页 |
| `guides/map/interactive-network-analysis.mdx` — `Interactive Network Analysis` | `guides/map/interactive-network-analysis.mdx` — `Interactive Network Analysis` | URL 已可用；建议改内容为“控件说明表 + 典型用法”，提升可操作性与停留时长 |
| `guides/press/overview.mdx` — `Overview` | `guides/press/index.mdx` — `Press & Articles Overview` | 模块首页化；覆盖“press/articles”；更适合加入“创建→润色→管理”主流程 |
| `guides/press/new-article.mdx` — `New Article` | `guides/press/create-article.mdx` — `Create an Article` | 动词型 SEO；更统一；可加输入项清单与示例 prompt |
| `guides/press/refine-article.mdx` — `Refine Article` | `guides/press/improve-article.mdx` — `Improve an Article` | 更常见检索词（improve/edit）；更适合做“常见修改诉求”模板 |
| `guides/products/overview.mdx` — `Overview` | `guides/products/index.mdx` — `Products Overview` | 模块首页化；关键词进标题；可增加“哪些功能依赖产品数据”强化价值 |
| `guides/products/new-products.mdx` — `New Products` | `guides/products/create-product.mdx` — `Create a Product` | 更标准的 help 文档命名；更 SEO；建议按“手动/导入/产品线”拆段 |
| `guides/registration/untitled-page.mdx` — `Overview` | `guides/registration/index.mdx` — `Registrations Overview` | 去掉 `untitled`；模块首页化；可把 Active/Pending/Expiring 做成对照表 |
| `guides/registration/untitled-page-1.mdx` — `Registration Detail and Lifecycle Management` | `guides/registration/registration-details.mdx` — `Registration Details` | slug 更短；更好做内链；建议移除“Future capability”以免误导 |
| `guides/settings/company-profile.mdx` — `Company Profile` | `guides/settings/company-profile.mdx` — `Company Profile (AI Context)` | 标题加语义（AI context）；适合加“字段→影响范围”表，提高可理解性 |
| `guides/signals/overview.mdx` — `Overview` | `guides/signals/index.mdx` — `Signals Overview` | 模块首页化；关键词进标题；可增加“3 步筛出高优先级 signals” |
| `guides/signals/untitled-page.mdx` — `Signal Details and Product Correlation` | `guides/signals/signal-details.mdx` — `Signal Details` | 去掉 `untitled`；更短更 SEO；可补关联逻辑/可否手动调整 |
| `guides/trends/overview.mdx` — `Overview` | `guides/trends/index.mdx` — `Trends Overview` | 模块首页化；关键词进标题；用“用户目标→图表解释”结构更像 SaaS 文档 |
| `guides/trends/untitled-page.mdx` — `Trend Detail Analysis` | `guides/trends/trend-details.mdx` — `Trend Details` | 去掉 `untitled`；更短更 SEO；可补数据口径（时间/来源/币种） |

