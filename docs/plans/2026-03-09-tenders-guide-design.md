# Tenders Guide — Design Document

## Goal

Create 9 dedicated guide pages for Tenders as MedStrato's flagship feature. Position it as the first feature module in navigation (after Getting Started, before Use Cases).

## Requirements

- **Language**: English
- **SEO**: Title tags, descriptions, keyword-rich headings
- **Style**: Index page = marketing + tutorial hybrid; sub-pages = concise tutorial
- **GEO**: Include user stories / scenario snippets for generative engine optimization
- **Concise**: Short paragraphs, bullet-driven, no filler

## Pages

### 1. `guides/tenders/index.mdx`
- Value proposition: AI-powered end-to-end bid management
- Lifecycle visual: Create → Parse → Technical → Commercial → Package → Debrief
- Key differentiators: Bid Autopilot, Tender Intel, AI compliance
- User story snippet: "A medical device distributor cuts bid prep from 2 weeks to 2 days"
- Links to all sub-pages
- Screenshot: 01-list

### 2. `guides/tenders/create-tender.mdx`
- New Tender form walkthrough (all fields)
- User story: "Sarah creates a tender in 3 minutes with pre-filled metadata"
- Screenshot: 02-new-tender

### 3. `guides/tenders/document-parse.mdx`
- Upload + AI parse flow
- Supported formats, parse results (categories, parameters)
- User story: "A 200-page RFP parsed into 47 structured requirements in seconds"
- Screenshots: 03-upload-docs, 04-parse-ai, 05-after-parse

### 4. `guides/tenders/technical-editor.mdx`
- Product matching, compliance checking, proposal generation
- WIN assessment, custom columns
- User story: "Auto-matching products against requirements saves hours of manual mapping"
- Screenshots: 03-technical-editor, 06a, 06b, 07, 08, 10, 11, 12, 13, 14

### 5. `guides/tenders/commercial-editor.mdx`
- Quotation table, price suggestions, margin tools
- Add rows/columns, fees
- User story: "Real-time margin tools help optimize pricing before submission"
- Screenshots: 03b, 15, 16, 17, 18, 19, 20

### 6. `guides/tenders/tender-package.mdx`
- Section selection, AI generate all, AI edit panel
- Export DOCX/PDF, finalize
- User story: "Generate a professional 30-page proposal document in minutes"
- Screenshots: 04, 21, 22, 23, 24

### 7. `guides/tenders/bid-autopilot.mdx`
- One-click automation: parse → match → quote → compliance → package
- When to use vs manual flow
- User story: "Run Autopilot on a straightforward tender and review the complete bid in 30 minutes"
- Reuses relevant screenshots

### 8. `guides/tenders/tender-intel.mdx`
- AI Q&A assistant for tender documents
- Example questions and use cases
- User story: "Ask 'What are the penalty clauses?' and get an instant answer with source references"
- Screenshot: 09-tender-intel

### 9. `guides/tenders/post-bid-evaluation.mdx`
- Stage management (Move to)
- Won/Lost Bid Debrief forms
- Learning loop back to future bids
- User story: "Capturing win/loss reasons improves AI scoring on future opportunities"
- Screenshots from User Manual Chapter 5

## Navigation (`docs.json`)

Insert after "Getting Started" group, before "Use Cases":

```json
{
  "group": "Tenders",
  "icon": "file-contract",
  "pages": [
    "guides/tenders/index",
    "guides/tenders/create-tender",
    "guides/tenders/document-parse",
    "guides/tenders/technical-editor",
    "guides/tenders/commercial-editor",
    "guides/tenders/tender-package",
    "guides/tenders/bid-autopilot",
    "guides/tenders/tender-intel",
    "guides/tenders/post-bid-evaluation"
  ]
}
```

## Screenshot Mapping

All screenshots from `images/user-manual/5-1-tenders/`. Post-bid screenshots from `images/user-manual/5-2-tenders/` (if exists) or Chapter 5 content.

## SEO Keywords

Primary: tender management, bid automation, AI bid, tender package, bid autopilot
Secondary: RFP parsing, technical compliance, commercial quotation, proposal generation, bid debrief
