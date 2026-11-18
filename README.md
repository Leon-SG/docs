# Orbid AI product documentation

Orbid documentation for client intake, legal matters, counsel review, and delivery. English is the content baseline; the same pages are maintained in German, Traditional Chinese, and Simplified Chinese.

## Documentation

- [English](product/index.mdx)
- [Deutsch](de/product/index.mdx)
- [繁體中文](zh-TW/product/index.mdx)
- [简体中文](zh-CN/product/index.mdx)

The manual covers intake, identity materials, engagement review, quotes and payment, client and counsel workspaces, files, settings, and the availability of knowledge and memory. Source evidence and unresolved questions are recorded in each language. Code evidence does not itself establish production availability.

## Development

```bash
npm run dev
npm run test:docs
npm run validate:docs
npm run check:links -- --check-anchors
```

Update English first and synchronize the corresponding translations. Preserve machine identifiers and source references. `docs.json` uses Mintlify's native language navigation; the pinned CLI requires `zh-Hant` and `zh-Hans`, while the documentation directories use `zh-TW` and `zh-CN`. Run `node scripts/sync-product-language-links.mjs` after adding pages.

Remaining historical material is excluded from publication by `.mintignore`. Retired product-specific URLs are not redirected to unrelated legal content. Product prices are maintained at [orbid.dev](https://orbid.dev).
