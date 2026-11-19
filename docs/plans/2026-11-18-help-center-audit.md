# Orbid 說明中心審計報告（2026/11/18）

範圍：線上 Mintlify 站（`docs.json` + `product/`、`de/product/`、`zh-TW/product/`、`zh-CN/product/`，共 14 頁 × 4 語言 = 56 頁）。
已對照前端 `carbon-phase0-frontend@3db32989cb` 的實際 UI 文案（如 `intake-v2-copy.ts`）。
另外也看了一下未追蹤的 Astro 草稿 `docs-site/`，見文末。

## 0. 結論

目前內容的寫法是**內部程式碼稽核報告**，不是給客戶看的說明中心。格式上的問題（腳註、對齊）只是表面症狀。
根本原因：這份手冊照「每句話都要能追溯到原始碼」的規則寫成，所以才會出現 `[Sxx]` 腳註、「本次檢查的程式碼」、
「v2」、commit hash、檔案路徑、「待確認」這類句子。只刪掉腳註無法修好，需要依任務導向重寫。

量化（每個語言數字幾乎相同）：

| 指標 | 每語言數量 |
| --- | --- |
| `[S01]`–`[S56]` / `[Q02]`–`[Q17]` 內文腳註 | 82 |
| `v1` / `v2` 版本字樣 | 31 |
| 行內 code（路徑、狀態碼、檔名） | 214 |
| 「inspected / source inspection / reviewed commit」類稽核用語（EN） | 64 |

## 1. P0：不能給客戶看的內容（直接傷害信任或洩漏內部資訊）

1. **內部腳註 `[S02, S12]`、`[Q13](/product/open-questions)`**：遍布全站（就是截圖 2 的問題）。客戶看不懂，AI 引用時也會變成雜訊。→ 全部移除。
2. **`sources.mdx`（來源指南）整頁**：公開了 50 多個內部原始碼路徑（`src/lib/orbid/...`、`supabase/migrations/...`）、完整 commit hash，還寫了「worktree 有未提交變更」。這是**資安與競業風險**。→ 移出公開站（加進 `.mintignore`），移到內部 repo。
3. **`open-questions.mdx`（未決問題）整頁**：等於公開告訴客戶「付款金額可能與實際扣款不一致（Q16）」、「最後一位管理員保護有並行漏洞（Q17）」。→ 移出公開站，改成內部的 issue tracker。
4. **版本代號**：「委託資料收集 v2」、「legacy v1」、「drafting v2」、「v2 counsel workbench」。客戶只會看到一種流程，版本是內部的功能開關（feature flag）。→ 一律刪除；若真有差異，就改用「新版／舊版案件」或直接用 UI 名稱描述。
5. **稽核口吻**：「本次檢查的程式碼中」、「In the inspected code it is enforced only when enabled; shadow mode records…」、「In the reviewed commit `91290bb97`…」、「Implemented means code evidence, not verified production rollout」。→ 改成客戶語氣的陳述句，例如「您的事務所可以啟用…」。
6. **把內部缺陷寫成客戶指引**：例如 settings 頁寫「設定頁提示文字說『之後版本才會自動加入』」（其實 DB 觸發器已經會自動加入，見 `docs-site/ORBID-PRODUCT-FACTS.md` §0.3-6）、「偏好查詢失敗時仍會寄信」、「稽核寫入為 best effort」。這些內容不是錯了，就是屬於內部風險，不應公開。→ 交給產品/工程修 bug，文件只寫正確的使用者行為。
7. **「規劃中與尚不可用的範圍」、「知識與記憶」整頁**都在講「佔位頁、尚未實作」。→ 刪除 `knowledge` 頁；總覽頁不列未上線功能（業界做法：未上線的功能放 changelog/roadmap，不放進說明文件）。
8. **內部測試用語**：「本地 mock 付款不是正式扣款」、「模擬付款路徑」。→ 刪除。

## 2. P1：格式與版面

| 問題 | 原因 | 修正 |
| --- | --- | --- |
| 導覽列 `ProductBook DemoPricing` 黏在一起（截圖 1） | 3 個連結加 CTA，中等寬度時 Mintlify 會把間距擠掉；而且「Product」和 logo 都連到 orbid.dev，重複了 | 刪掉 `Product`（logo 已經連過去），只保留 `Pricing` + `Book Demo`，CTA 用 `Open Orbid AI` 指向 app 網址（目前 `https://orbid.dev` 是行銷站，不是 app） |
| 頁尾「本頁語言版本：English · Deutsch…」（截圖 2） | 手寫的 `equivalents` 區塊，與 Mintlify 內建的語言切換重複，在上下頁導覽上方顯得突兀 | 全部刪除；hreflang 交給 Mintlify 處理 |
| 手機版標題、表格沒有左對齊或被裁切（截圖 3） | 每頁 frontmatter 後都有兩個空行，接著直接是一段無標題的長段落；總覽表格第三欄「佐證狀態」字很長，在窄螢幕會溢出；`title` 與 Copy page 按鈕在窄螢幕會擠在一起 | 表格精簡為 2 欄（模組｜能做什麼）；導言段落用 `<Info>`/一句話摘要；標題縮短（≤ 12 個中文字） |
| 沒有用 Mintlify 元件 | 全站都是純 Markdown | 步驟用 `<Steps>`，注意事項用 `<Warning>`/`<Note>`，首頁用 `<CardGroup>`，FAQ 用 `<AccordionGroup>` |
| 沒有截圖或圖示 | — | 每個任務頁至少放 1 張 UI 截圖（加上 alt 文字），並由 `docs-site/` 的 CarbonUiFigure 匯出 |
| 長段落 | 一段落常有 5–8 句條件子句 | 一段 ≤ 3 句；條件改用表格或清單 |

## 3. P1：資訊架構（IA）

目前的 IA 是「依模組 + 依證據」分類。業界標竿（Stripe、Linear、Notion、Clio、Intercom Help）的做法是**依角色 → 依任務**分類，標題用動詞。建議：

```
開始使用
  - Orbid 是什麼（index）
  - 客戶快速入門：從提交案件到收到文件
  - 律師快速入門：從審核委任到交付
客戶
  - 提交新案件（原 intake）
  - 上傳身分驗證文件（KYC）—— 支援格式、大小限制
  - 查看報價並付款
  - 追蹤案件進度與接收交付文件
  - 委任被婉拒後如何修改並重新提交
律師與事務所
  - 審核委任並發送報價
  - 在案件工作區處理文件
  - 交付文件給客戶
  - 事務所文件庫
設定與管理
  - 成員與邀請
  - 案件存取權限
  - 通知
  - 稽核紀錄
說明
  - 常見問題（FAQ）
  - 術語表
```

刪除：`overview`（併入 index）、`rules`（有用的部分分散到各任務頁）、`knowledge`、`sources`、`open-questions`。

## 4. P1：用語（以 UI 實際文案為準）

| 現況 | 建議（繁中） | 理由 |
| --- | --- | --- |
| 委託資料收集 v2 | **提交新案件**／案件申請 | UI 按鈕是 *New matter*；步驟是 *Matter → Verify* |
| 委任審查 | 委任審核 | 對齊 UI 的 *Engagement review* |
| Counsel | 律師 | 「法律顧問」只用在正式文件 |
| KYC 補件請求 | 補件要求 | — |
| 佔位頁、規格意圖、實作待確認 | （刪除） | 內部用語 |
| `pending_review → accepted → quoted → paid` | 待審核 → 已接受 → 已報價 → 已付款 | 客戶看狀態**標籤**，不看狀態碼 |
| 工作階段（Session） | 刪除這一列 | 現在的 UI 已經沒有這個概念 |

`zh-CN` 頁面同樣要依中國大陸的用語重新校稿；`de` 頁面則要請母語者審稿（目前是逐句直譯）。

## 5. SEO / GEO（AI 引用）

業界做法：每頁回答一個具體問題，第一段就直接給答案（40–60 字，方便 AI Overview 或 Perplexity 擷取），H2 寫成使用者會問的問題，數字寫明確。

1. **title/description**：現在像「Shared rules and evidence」、「Source guide and verification scope」這種，沒有人會搜尋。→ 改成任務型標題，例如「How to upload KYC documents to Orbid」／「如何在 Orbid 上傳身分驗證文件」；description 控制在 120–155 字元，並包含 Orbid 與動作。
2. **第一段就給答案**：目前每頁的第一段都是免責聲明（「此清單依原始碼檢查…」）。→ 改成「在 Orbid 上，客戶可以…，步驟如下」。
3. **H2 問題化**：例如「KYC 文件支援哪些格式？」、「付款失敗怎麼辦？」，對 GEO 和 FAQ 擷取最有效。
4. **可引用的事實**要保留並放在顯眼處：25 MiB/檔、每項最多 10 個檔案、報價預設有效 14 天（可設 1–60 天）、最多可重新提交 2 次、支援 EUR/USD/CNY、批次邀請上限 50 人。這些就是 AI 會引用的內容，做成表格。
5. **加結構化資料**：FAQ 頁加 `FAQPage`，任務頁加 `HowTo`（Mintlify 可在 frontmatter 加 `seo`/自訂 head）；`docs.json` 的 `seo: {}` 是空的 → 設定 `metatags`（`og:image`、`og:site_name`）與 `indexing: "navigable"`。
6. **`llms.txt`/`llms-full.txt`**：根目錄的版本還是舊的 tender 內容（需確認）。→ 重新產生，或讓 Mintlify 自動產生（Mintlify 會自動提供 `/llms.txt`；根目錄的靜態檔可能會覆蓋它）。
7. **重新導向**：舊的 tender 頁 URL 被移除後，要確認 Search Console 沒有出現大量 404；舊頁應 301 導到最接近的新頁，而不是全部導到 index。
8. **內部連結**：每頁結尾放「下一步」卡片（2–3 個），取代目前「See [Q13]…」這種連結。

## 6. 關於 `docs-site/`（Astro Starlight 草稿，尚未納入 git）

它有正確的守則（`ORBID-PRODUCT-FACTS.md` §0：不准公開檔名、flag、`[Sxx]`），也有 FAQ、`.md` twin、llms 產生器，方向比 Mintlify 版好。
但它的內文自己就違反守則：標題就叫「客戶收件 v2」，內文寫了 `404 Not Found`、rate limit（每小時 10 次）、「不會發出任何網路請求」、`/login/preview`，
密度也太高（一個表格塞 4 個 UI 狀態）。需要先決定**正式採用哪個平台**，避免兩邊重複維護。

## 7. 改寫範例（zh-TW intake 開頭）

**現在：**
> 客戶委託資料收集會在律師決定是否接受委任前，收集業務脈絡、事實、文件與身分資料。本次檢查的程式碼中，v2 與舊版 v1 流程並存。本頁說明 v2…[S15]

**建議：**
```mdx
---
title: "提交新案件"
description: "在 Orbid 選擇服務、說明案件並上傳身分驗證文件，約 10 分鐘完成。提交後律師會審核並報價，提交本身不需付費。"
---

在 Orbid 提交新案件分為兩步：**說明案件**與**身分驗證**。提交時不需付款，律師接受委任後才會寄出報價。

<Steps>
  <Step title="選擇服務">登入後點選 **New matter**，選擇最接近的服務與國家/地區方向。</Step>
  <Step title="說明案件">回答引導問題並上傳相關文件，確認系統整理的事實摘要。</Step>
  <Step title="身分驗證">依清單上傳身分文件、閱讀同意事項並簽署，然後提交。</Step>
</Steps>

## 身分驗證文件支援哪些格式？
| 項目 | 限制 |
| --- | --- |
| 格式 | PDF、JPEG、PNG、WebP、HEIC |
| 單檔大小 | 最大 25 MB |
| 每個項目 | 最多 10 個檔案 |

<Warning>不接受加密（設有密碼）的 PDF。</Warning>
```

## 8. 執行順序建議

1. P0 先處理（約半天）：把 `sources`、`open-questions`、`knowledge` 移出公開站，移除所有腳註、`v1/v2` 與稽核口吻，刪除 equivalents 頁尾，並修正導覽列。
2. 以 EN 為基準，依第 3 節的 IA 重寫約 14 頁任務頁，並搭配截圖。
3. 翻譯成 zh-TW/zh-CN/de，依 `docs-site/i18n-glossary.json` 統一用語，最後由母語者審稿。
4. SEO：metatags、FAQPage schema、llms.txt、舊 URL 的 301 導向。
