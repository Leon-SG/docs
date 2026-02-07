# MedStrato 文档站 SEO 优化建议

## 一、已具备的基础（保持即可）

- 各页均有 `title` 和 `description` 的 frontmatter
- URL 结构清晰（use-cases、guides、best-practices 等），且已有 redirects 防死链
- 有 Use Cases / Roles / Best Practices / Glossary 等入口，利于长尾词覆盖
- 描述中已包含 MedStrato、KOL、medical device、regulatory 等关键词

---

## 二、可立即优化的技术项

### 1. 站点名称与品牌统一

- **docs.json** 中 `name` 建议与产品名一致，便于浏览器标签、分享标题、搜索引擎标题展示。
- **建议**：已改为 `MedStrato`（若希望保留简短名可设为 `MedStrato Docs`）。

### 2. Title / Description 长度与关键词

- **Title**：建议 50–60 字符（英文），含主关键词（如 MedStrato、KOL、Events、API）。
- **Description**：建议 150–160 字符（英文），首句包含主关键词，可带 CTA（如 “Get started”, “Learn how”）。
- **做法**：逐页检查；过短的补一句场景/收益，过长的压缩到 160 字符内。

示例（首页）：

- Title: `MedStrato Documentation | KOL & Medical Affairs Platform`（约 50 字符）
- Description: 保持现有一句，可微调为 155 字符内，例如：  
  `MedStrato is the AI-powered public affairs platform for medical device companies. Manage KOLs, events, regulatory signals, and intelligence reports. Get started in 5 minutes.`

### 3. 图片 Alt 文本

- 所有 `![...](...)` 图片建议加上具描述性的 `alt`，包含页面主题或功能关键词（如 “MedStrato AI workflow dashboard”, “KOL list with filters”）。
- 有利于图片搜索与无障碍，也利于页面主题信号。

### 4. 内链与锚文本

- Use Cases、Best Practices、Glossary 之间用**描述性锚文本**互相链接（如 “See KOL tiering methodology” 而非 “Click here”）。
- 产品指南（Guides）在文末加 “Related” / “Next” 链到相关 Use Case 或 Best Practice，形成主题簇。

### 5. 结构化标题层级

- 每页一个 H1（由 frontmatter `title` 生成即可）。
- 用 H2 → H3 顺序，不跳级；标题尽量包含用户搜索意图（如 “How to import KOLs from CSV” 而非 “Import”）。

---

## 三、内容与关键词策略（中期）

### 1. 目标关键词（与现有规划一致）

| 类型     | 示例（英文）                                      | 示例（中文）           |
|----------|---------------------------------------------------|------------------------|
| 产品+场景 | KOL management software, medical affairs platform | 医疗器械 KOL 管理       |
| 场景     | advisory board management, regulatory intelligence | 学术会议管理、法规监控 |
| 功能     | AI research report, event invitation best practices | AI 行业研究报告         |

### 2. 页面级关键词

- **Use Cases**：在首段或 “How MedStrato Helps” 中自然出现 1–2 次目标关键词。
- **Best Practices**：标题或首段包含方法论关键词（如 KOL tiering, event invitation）。
- **Glossary**：术语本身即关键词，保持当前结构即可；可在相关 Guide 中链回 Glossary 词条。

### 3. 中文 / 多语言（若未来做 i18n）

- 可单独建中文版路径（如 `/zh/...`）或子域名，每页对应中英文 title/description。
- 用 `hreflang` 关联中英文 URL，避免重复内容问题。

---

## 四、平台与部署相关（Mintlify）

- **Sitemap**：若使用 Mintlify 托管，确认是否自动生成 sitemap；若有自定义域名，在 Google Search Console 提交 sitemap。
- **Robots.txt**：确认未误拦文档路径；若有 `/api-reference` 等希望被索引，不要 `Disallow`。
- **Canonical**：若文档有多个域名访问，在 Mintlify 中配置 canonical 指向主域名，避免分散权重。
- **Open Graph / Twitter Card**：若 Mintlify 支持全局或单页 og:title / og:description，可设为与 meta title/description 一致，便于社交分享时展示 “MedStrato Documentation”。

---

## 五、执行优先级建议

| 优先级 | 项目                         | 说明 |
|--------|------------------------------|------|
| P0     | 站点 name 统一为 MedStrato   | 已做 |
| P0     | 每页 description 控制在 150–160 字符 | 逐页检查 |
| P1     | 所有图片加 alt               | 随内容更新做 |
| P1     | Use Cases / BP 首段含目标关键词 | 小改即可 |
| P2     | 增加 “Related” 内链          | 提升停留与爬取 |
| P2     | 确认 sitemap / canonical（Mintlify） | 部署侧配置 |

如需，我可以按上述优先级帮你改具体页面的 title/description 或补 alt 示例。
