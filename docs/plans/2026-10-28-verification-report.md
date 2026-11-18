# Product documentation scope correction

The public manual now covers client intake, engagement review, quotes and payment, client and counsel workspaces, files, settings, and the availability of counsel knowledge and memory. English is the baseline, with German, Traditional Chinese, and Simplified Chinese counterparts. Each language has 14 corresponding pages.

The prior documentation scope was incorrect: it treated an unrelated historical product surface in the source repository as part of the current product. Its standalone pages, navigation entries, terminology, source claims, indexes, and redirects have been removed from the published manual. Obsolete tracked documentation and evidence for that surface were removed. Remaining historical material is excluded by `.mintignore`; retired product-specific routes are no longer redirected to unrelated legal pages.

The current product checkout was rechecked. In `src/lib/orbid/counsel/engagement-actions.ts`, issuing a quote checks required KYC items and file availability; the inspected acceptance action no longer enforces that gate. The intake and engagement pages in all four languages were corrected accordingly. Code inspection does not establish production deployment or substitute for live workflow testing.

Validation results are recorded below after checks complete. Eleven open questions remain in each language, covering placeholders, file handling, public APIs, knowledge and memory, intake, payments, access, delivery, settings, invoice reconciliation, and concurrent administrator changes.

## Historical validation

These results predate the later follow-ups below and do not establish that the current revision passes the native build.

- `npm run test:docs`: passed; 56 pages, matching page structures and identifiers across four languages, localized links, and two root redirects.
- `npm run validate:docs`: passed; native Mintlify output contains 14 pages in each language.
- `npm run check:links -- --check-anchors`: passed with no broken links.
- Independent MDX compilation: 56 pages passed.
- `git diff --check`: passed.
- Removed 115 obsolete tracked files, including documentation, old audit materials, and screenshots; pre-existing modified files were not removed.

## Follow-up source check — 2026-11-02

The product worktree at `/Users/lui831/orca/workspaces/stratosphere/Leon-SG-intake-v2-local-qa` was at commit `91290bb972d8e92a381217cefaf61b1b92226785` and had unrelated uncommitted changes. This follow-up inspected only the paths listed below; it is not a verification of every statement in the manual or of any deployment.

- `src/lib/orbid/counsel/engagement-actions.ts`: acceptance and quotation remain separate; the quote action checks required KYC status and file availability, while the inspected acceptance action does not apply that gate.
- `src/lib/orbid/counsel/delivery-checklist.ts`: checklist rows are reminders, and the format-check row remains reserved without a format checker. Server-side delivery authorization is separate.
- `src/app/(orbid)/orbid/(workspace)/counsel/{knowledge,memory,gaps,quality}/page.tsx`: these dedicated pages still render unavailable or placeholder views.

These inspected paths had no uncommitted changes in that worktree. The other documented workflows, the nine open questions, and actual deployment behavior still require their own verification.

The subsequent client status and KYC upload review inspected `src/lib/orbid/client/client-status.ts`, `src/lib/orbid/client/{access,paid-gate}.ts`, `src/lib/orbid/kyc/{upload-rules,upload-checklist}.ts`, the intake upload routes, and `src/components/orbid/upload/upload-runner.ts`. Client actions precede the completed status; stale responsibility metadata is considered later. The four client pages were clarified. The four intake pages now distinguish KYC format and per-file limits from the smaller multipart fallback limit, with source ID S20. These findings describe the inspected code, not deployment configuration or an end-to-end upload test.

The counsel library upload review inspected `src/components/orbid/counsel-library/{library-api.ts,upload-dialog.tsx}`, `src/lib/orbid/counsel/library/{upload,ingest-send}.ts`, and the document upload and registration routes. The four file pages now document the upload dialog's accepted extensions, 50 MiB limit, skipped filenames, server verification, duplicate handling, and distinction between registration and completed extraction (S21). Other upload paths and retention remain open questions. The payment review also confirmed the quote-derived amount, quote-version check, and separate acceptance/payment behavior documented on the engagement page; no payment was executed.

The delivery review compared the committed `91290bb97` versions of the legacy delivery route and drafting task delivery implementation with the drafting task route. The source worktree also has uncommitted changes to the legacy route and drafting implementation; those changes were not treated as deployed behavior. The four counsel pages now distinguish path-specific server checks from the nonblocking reminder list and document the reviewed drafting-v2 prerequisites, file selection, and comment choice (S22). Other delivery paths and live behavior still require verification.

The NDA task authorization and client receipt review inspected the task authorization route, `src/lib/orbid/counsel/review/unified/nda-deliveries.ts`, and the intake acknowledgment and deliverable routes, all without local changes at this check. The four counsel pages now explain the separate authorization and recorded export states and invalidation on review-selection changes (S23). The client pages distinguish legacy acknowledgment/invoice handling from NDA task records (S24). No actual authorization, export, receipt, or invoice was performed.

The intake follow-up inspected `intake-step.ts`, the v2 verify route, KYC upload rules, resumable upload routes, and `intake-file-ingest.ts`, with no local changes in those paths. The four intake pages now distinguish facts submission from the later verification submission and lock, and describe the resumable upload's 300 MiB session-file quota. The encrypted-PDF wording reflects detection by the inspected implementation rather than claiming that detection is exhaustive. No intake or upload was run end to end.

The settings and access follow-up inspected `src/lib/orbid/access/{flags,gates}.ts`, the client settings route map and pages, and the matter-access form. The client manual now makes the extra matter-member layer conditional: the code's off mode skips it, shadow mode does not block, and on mode enforces it. The settings page identifies that client settings pages depend on a feature switch (S25). Deployed flag values and actual permissions remain unverified; no settings were changed.

The notification follow-up inspected the settings form and API, event/channel preferences, event mapping, and the notification email sender (S26), with no local changes in those paths. The four settings pages describe separate firm/client preferences and the limited scope of the inspected sender's preference checks, including its allow-on-lookup-failure behavior. No preference was changed and no message was sent; actual delivery and other notification paths remain unverified.

The declined-intake follow-up inspected `src/lib/orbid/client/engagement-client.ts`, `src/lib/orbid/matter/engagement.ts`, and the client engagement panel (S27). The engagement pages now describe reopening, required KYC files, signing, relocking, and the two-resubmission limit. This is a code-level review; no real resubmission was performed.

The quote follow-up checked the quote schema, versioning, expiration, client action planner, and issue action in `src/lib/orbid/matter/engagement.ts` and `src/lib/orbid/counsel/engagement-actions.ts` (S16). The four engagement pages now state the 1–60 day input range and distinguish the fixed-price quote action from counsel's engagement decision. No quote or payment was executed.

The supplement-request follow-up inspected `src/lib/orbid/counsel/document-requests.ts` and the client and counsel request components (S28). The four client and counsel pages distinguish current KYC-item requests from older free-text document requests, and provided files from KYC verification. This is a source review; no request or upload was performed.

The invitation follow-up inspected the firm invitation decision and binding, intake ownership and token gates (S29). The intake pages now advise choosing the intended company before accepting a pending invitation and describe recipient-email matching and unusable revoked or expired links. No invitation was created, accepted, revoked, or tested against a deployed environment.

The source-path audit expanded brace notation in the English source table and found all 60 referenced local paths in the product worktree. The three translated source tables contain the same code paths as English. This checks path existence and parity only, not the correctness or completeness of the claims. The source pages now identify the follow-up review commit and distinguish it from deployment.

The library processing follow-up inspected the ingestion status definitions, pipeline, review route, detail view, and requeue eligibility (S30). The four file pages now distinguish registration, review, ready status, and conditional reprocessing. This is source inspection; no library document was uploaded or reprocessed during this check.

The subsequent library check reviewed the original-retention option, ingestion removal handling, and the clause-search migration. It narrowed the `ready` claim to the inspected clause and drafting-source paths and documented that removal is attempted, can fail, and is distinct from returning an existing duplicate. No deletion or search was performed in a live environment.

The clause-search follow-up inspected the hybrid search implementation, route, and search interface (S31). The four file pages now explain keyword-only fallback, optional reranking, and the limited degradation notices visible in that interface. The keyword search itself can still fail; no live search was performed.

The route follow-up inspected the product hub, navigation path mapper, and middleware (S01). The counsel entry step now directs readers through their organization's entry and labels shared-host and configured dedicated-host paths separately. Host configuration and live redirects were not tested.

The paid-work follow-up inspected `engagement-payments.ts` and `nda-tasks/engagement-start.ts` (S32). The engagement pages now distinguish a recorded successful payment from successful background dispatch and advise against paying again merely because work is not visible. No real payment or task dispatch was performed.

The client-message follow-up inspected the shared composer, recipient payload, and intake client-turn route (S33). The four client pages no longer imply that selecting the assistant creates a private destination hidden from counsel: the route stores the client line in the matter thread and uses the assistant mention to request a response. No message was sent during this review.

The source-reference audit found no undefined or unused source IDs in any of the four manuals. `verify-product-docs.mjs` now parses individual IDs in comma-separated references with spaces, checks translated reference parity at the ID level, and flags undefined or duplicate source IDs. This check establishes reference coverage, not whether a cited source proves its associated claim.

The payment-method follow-up inspected the provider registry, client method projection, and payment interface (S34). The engagement pages now explain what to do when no online method is available and avoid treating a provider label as evidence of a real charge. Provider configuration and payment execution were not tested.

The library review follow-up inspected the review scan, completion route, and detail view (S35). It found that review completion can be allowed when named-entity recognition is unconfigured or unsupported; the four file pages now make clear that `ready` is not proof that the recognition ran or that all sensitive information was removed. No live review or scan was performed.

The client progress follow-up inspected `client-stage-v2.ts` and the progress details component (S36). The four client pages now state that the stage is a current-state projection rather than a complete event log and that paid status alone does not prove work dispatch. No live client matter was tested.

The drafting delivery comment follow-up compared the committed drafting delivery implementation with the unchanged comment-audience helpers (S22). The counsel pages now spell out `keep`, `strip`, and `client`, including that retaining all can include internal comments. No document was delivered or inspected in a live workflow.

The requested-material upload follow-up inspected the legacy document-item component, intake upload hook, and chat-attachment validation (S37). The client pages now distinguish its accepted extensions and 50 MiB per-file limit from the KYC identity-material path. No live upload was performed.

The intake upload consent follow-up inspected the upload hook, runner, multipart route, and notice checks (S38). The intake pages now describe the possible consent and notice prerequisites and advise contacting the firm if the user does not agree or cannot continue. The applicable notice text and deployment configuration remain unverified, and no consent was submitted.

The library visibility follow-up inspected `permissions.ts` and `review-store.ts` (S39). The four file pages distinguish firm-visible from restricted documents and clarify the inspected client-only role boundary. The deployed role configuration was not tested.

The settings-route follow-up checked the counsel and client route maps and the client section page, with no local changes in those paths. The four settings pages now identify the shared-host counsel prefix and list the nine client settings sections (S19, S25). Paths and section names do not establish deployed availability or authorization; no settings were changed.

The workflow overview now repeats the payment/dispatch distinction already documented under S32, so its numbered sequence does not imply that successful payment guarantees work dispatch. The S32 paths were rechecked for uncommitted changes. Separately, on this follow-up the product worktree contained new uncommitted changes to the intake token route and `commit-intake-pack.ts`; these were not treated as part of the reviewed commit or evidence of deployment.

The v2 verification recovery follow-up inspected the verify route, KYC component, and intake fetch wrapper, all without local changes. The intake pages now describe processing-incomplete submission, the distinction between parsing and KYC approval, and the limited retry of a failed initial lock (S40). No live file processing, submission, or retry was performed.

The NDA client-download follow-up inspected the task delivery route, copy lookup and deliverable component, with no local changes in those paths. The client pages now distinguish the formal output from conditionally available reference translation and tracked-changes copy (S41). This describes product labels and source gates, not a legal determination or a live delivery test.

The drafting client-download follow-up inspected the drafting delivery projection, intake deliverable route, and deliverable component, with no local changes. The client pages now describe the lawyer-delivered file list, individual downloads, and integrity refusal (S42). No client download or delivery was executed.

The quote-draft follow-up inspected the engagement model, counsel actions and engagement component. The engagement pages now distinguish saving a draft from issuing or replacing a quote (S16), including the separate acceptance, KYC and file checks. The inspected model and action files had no local changes; no quote was saved or issued.

The payment-status follow-up inspected the engagement payment service, provider types, and client payment component without local changes in those paths. The engagement pages distinguish a pending or expired payment request from the quote and advise checking status before another attempt (S34). No provider or live payment was exercised.

The matter-access settings follow-up inspected the settings form, API, copy, and member gates, all without local changes; a source search found default-member storage but no automatic assignment consumer in `src`. The four settings pages now distinguish conditional client visibility enforcement from the firm form’s saved defaults, whose UI describes automatic assignment as a later release (S43). No organization setting or matter membership was changed.

The client company settings follow-up inspected the API, validation, and client form, all without local changes. The settings pages now describe the three KYC key-field review flags and possible display-name synchronization failure (S44). The code check does not establish that a review was completed or that name synchronization succeeded in a deployment; no company profile was changed.

The bulk-invitation follow-up inspected the administrator API and firm/client panels, with no local changes in those paths. The settings pages now document the 50-address limit and partial results (S45). No invitation was sent; successful invitation creation is not evidence of acceptance.

The knowledge-source follow-up inspected the research generation path, connector reader and counsel store, with no local changes. The knowledge pages now distinguish the workspace-scoped internal reader from the placeholder standalone pages (S46). No connector or deployed research workflow was tested.

The source-path audit was repeated after S40–S46 were added: all 36 source records contain 122 expanded path references that exist in the product worktree, and the three translations match the English source paths. This is a path-existence and parity check only; it does not validate claims, deployment, or the content of locally modified source files.

## Local preview follow-up

A subsequent read-only check of the existing local preview on port 3005 returned HTTP 500 for `/`, `/product/index`, and `/zh-TW/product/settings`; the listener was still running. The response exposed only a server error digest, not a root cause. A separately started diagnostic preview on port 3015 remained in preparation, and the earlier `mint validate` process remained running. These observations do not establish a content defect or a successful current build; further diagnosis and a fresh current-version validation are required.

Follow-up diagnosis: the installed Mintlify preview client uses a shared `~/.mintlify` cache. Its update code moves that directory to `~/.mintlify-last` before downloading and later removes the backup. The existing port-3005 server was running from the latter directory, whose client files were incomplete when checked. This is a plausible cause of its HTTP 500 responses, not a confirmed stack-trace diagnosis. The additional diagnostic preview was stopped because it and the ongoing validation could write the same archive concurrently; the original validation remained live. The overlap means the current archive/build result must be treated cautiously, and current-version validation must be repeated after the process ends and the cache is stable.

The fine-grained role follow-up inspected its flag, permissions model, role API and settings panel, all without local changes. The settings pages now document the conditional panel and administrator-role boundary (S47). No role was changed, and the deployed flag and role assignments remain unverified.

The drafting-comment version follow-up compared the committed implementation with the current uncommitted diff. The committed path permits `keep`, while the uncommitted change rejects `keep` when comments are detected; the four counsel pages now identify the reviewed commit and direct readers to verify deployed options. The pending change was not described as released or deployed. No delivery was performed.

The legacy receipt follow-up inspected invoice creation, intake pricing and the acknowledgment route, without local changes. A newly generated legacy invoice uses intake module pricing in USD, not the engagement quote; the client pages now advise comparing it with the agreed quote and actual payment (S24). No invoice or payment was created or verified in a live environment.

The client billing projection follow-up inspected the billing API, panel, and legacy delivery parser, all without local changes. The settings pages now identify its 500-matter query limit, invoice-derived payment amount, and historical payment-method list (S48). This is a code-level finding, not proof of a deployed discrepancy; no billing records were accessed.

The firm connector preference follow-up inspected the settings component, parser, API, and source reader, without local changes. The settings pages describe the `knowledge` default fallback and distinguish saved preferences from source availability or access control (S49). No connector configuration or source query was exercised in a deployment.

The audit-view follow-up inspected audit writes, sampling, ledger reads, export limits, and the settings panel without local changes. The settings pages now qualify audit completeness and the CSV limit (S50). No audit records or deployed settings were accessed.

The notification preference scope follow-up checked the preference API and store: the settings are keyed by user, with firm and client surfaces stored separately (S26). The settings pages now say so explicitly. No preference was changed.

The invoice and billing projection discrepancy is now tracked as Q16 in all four open-question pages, with affected pages and required finance/product confirmation. It remains a source-level risk, not a verified production incident.

The library-search interface follow-up checked the component and request validation without local changes. The file pages now explain the required search text or clause type (S31); no live search was performed.

The NDA authorization follow-up checked the unchanged authorization route and delivery implementation. The counsel pages now state that this path imposes no candidate-completeness or citation-verification threshold and does not mark citations verified (S23). This is not a claim about other delivery paths; no authorization was performed.

The organization membership follow-up inspected the membership helper and administrator API, without local changes. The settings pages explain the last-administrator check and that multi-step identity changes can fail partway (S51). No member or role was changed.

The library-visibility recheck corrected an overbroad sentence: the restricted-document rule applies to firm documents, while the inspected helper permits eligible readers to read the official shared workspace before that rule (S39). Actual route and deployment availability remain unverified.

The original-download follow-up inspected the original route and ownership helper without local changes. The file pages now distinguish document visibility from original download authority and note that the original is not desensitized (S52). No original file was accessed.

The firm library deletion follow-up inspected the unchanged route, governance helper, and retention migration. The file pages now describe record/related-clause deletion, template unlinking, refusal conditions, and separately attempted storage removal (S53). Migration presence does not establish deployment; no document or storage object was deleted.

The library retention follow-up inspected the retention helper, route, management UI, scheduled job, and migration. The file pages now describe configurable expiry, preview/confirmation, drafting-source last use, and conditional scheduled deletion (S54). These sources do not establish active deployment or a general preservation guarantee; no setting or file was changed.

The retention last-use follow-up inspected the drafting-source caller and touch helper. The file pages now clarify that the timestamp update is best effort and may fail without stopping drafting (S54). No retention job or live drafting operation was run.

The matter-to-library archival follow-up inspected the archive helper, route, and matter-file component without local changes. The file pages now cover eligible delivered files, copying and duplicate handling, subsequent processing, and the 20-file bulk limit (S55). No matter file was archived.

The archive-processing follow-up corrected the previous wording: the inspected ingestion pipeline may reach `ready` automatically when no review reasons remain, while other documents enter `needs_review`. The four file pages now say a new archive may require review (S30, S55), rather than claiming every record does. No ingestion was performed.

The KYC file-binding follow-up inspected review and file-readiness logic without local changes. Counsel pages now describe current-file matching, unavailable files, and compatibility with older pass records lacking file identities (S56). No KYC review was performed.

The last-administrator follow-up narrowed S51: the helper checks a separately read member list before identity-service mutations, so that code alone does not establish an atomic concurrent-change invariant. The settings pages now advise sequential changes and verification. This is an inference from the inspected control flow, not a reproduced race or a deployment claim.

The KYC supplement follow-up inspected the unchanged command implementation: selected required items are reset to pending and their prior file IDs are recorded as superseded (S56). The counsel pages distinguish that state transition from physical deletion. No supplement request was created.

The inferred last-administrator concurrency risk is now tracked as Q17 in all four open-question pages and linked from settings. It has not been reproduced or established as a production incident.

The drafting-delivery gate follow-up checked the unchanged route, KYC gate, policy flag, and business-permission gate. It corrected the four counsel pages: the fine-role check is flag-dependent, and the inspected KYC gate applies when enabled and the client is not explicitly an individual (S22). Deployed flag values and actual delivery were not tested.

The quote-versus-delivery KYC follow-up compared the unchanged quote action with the conditional delivery case gate. The counsel pages now distinguish these checks and warn that passing the quote check alone does not prove delivery eligibility (S16, S22). No quote or delivery was performed.

The library-search scope follow-up checked the unchanged interface, request defaults, and read-scope helper. The file pages now mention the interface’s default 20-result limit and reader scope (S31). No live query or deployment permission test was performed.

The supplement-request failure and cancellation follow-up inspected the unchanged request, message, and KYC review helpers. The KYC update precedes message creation and request-record insertion; cancelling a request updates its record without reversing the KYC update. The four counsel pages now recommend checking state before retrying and after withdrawal (S28, S56). These are code-level observations; no live request or failure was exercised.

## Latest validation status — 2026-11-02

The later `mint validate` process exited with status 1 after failing to extract framework version 0.0.4044 (`ZlibError: unexpected end of file`). The earlier successful native validation above therefore does not verify the current revision. A separate existing Mintlify preview process was still running and the shared cache archive was changing; avoid concurrent cache operations until that process is resolved. The cause of the truncated archive has not been established. The latest `npm run test:docs` and `git diff --check` passed after the supplement-request changes; this does not replace a native build or rendered-page review.

The source-path audit was repeated after S47–S56: all 46 source records contain 160 expanded path references that exist in the current product checkout, and all translated source tables match the English paths. This confirms path existence and translation parity only, not that each source proves its associated claim or that the checkout matches deployment.

A subsequent isolated-cache native validation completed successfully on 2026-11-02 (`mint@4.2.417 validate`, exit 0, `success build validation passed`). The published MDX and navigation were unchanged during that run; the report itself received the source-path audit afterward. The independent MDX compiler also passed all 56 pages after the run. This build result does not establish live product behavior or resolve the open product questions.

## Isolated preview check — 2026-11-02

The isolated Mintlify preview started on port 3015. Playwright loaded the English and German home pages, Traditional Chinese counsel page, and Simplified Chinese files page at desktop width, plus the Traditional Chinese counsel page at 390 px: all five returned HTTP 200 with the expected page headings and no document-level horizontal overflow. Screenshots of the Traditional Chinese counsel page were visually inspected at desktop and mobile widths; the visible text and navigation were readable. The page title appears both in Mintlify's title area and as the first Markdown heading. This is a sampled check, not a visual review of all 56 pages or a test of deployed product behavior.

The duplicate-title follow-up removed the first Markdown heading from all 56 pages only when it exactly matched the frontmatter title; Mintlify supplies the visible page title. The current documentation parity checks, anchor-aware broken-link check, and `git diff --check` passed. The Traditional Chinese counsel page returned HTTP 200 with one H1, and its 390 px screenshot was inspected after the change. The successful native build recorded above predates this heading edit; rerun native validation for the final revision.

After removing duplicate headings, an automated Playwright pass loaded all 56 localized routes at a 390 px viewport. Each returned HTTP 200, contained one H1, and had no document-level horizontal overflow. This automated check does not substitute for a complete visual inspection or verify all interactive controls. The final-revision isolated native validation is still running.

The preview's explicit equivalent-page links on the Traditional Chinese counsel page were inspected for all four language routes. A Playwright click on its German equivalent reached `/de/product/counsel` and rendered the German heading. This checks one equivalent-page link, not the framework's language-menu behavior on every page.

The desktop Mintlify language menu on the Traditional Chinese counsel page displayed all four languages; selecting Deutsch navigated to the corresponding `/de/product/counsel` page. This is a single-page interaction check, not exhaustive coverage of the menu across every route or viewport.

On a 390 px viewport, the Traditional Chinese mobile navigation opened and its “檔案與資料庫” link navigated from the counsel page to the files page with the expected heading. This is one navigation interaction, not a full mobile accessibility audit.

The final-revision isolated `mint@4.2.417 validate` subsequently exited 0 with `success build validation passed` after the duplicate-heading edit. Published pages and navigation were unchanged during the run. The open questions and the limits on product deployment verification remain as documented.

## Current scope and remaining evidence

The four manuals each expose the same 14-page scope: product overview and rules, workflows, intake, engagement and payment, client and counsel workspaces, files, knowledge, settings, glossary, sources, and open questions. Source-level coverage and documentation/build checks are recorded above. Eleven open questions (Q02, Q04, Q09–Q17) remain explicitly listed with affected pages and confirmation needs; they require product-owner, policy, identity, finance, or deployment evidence and must not be treated as resolved by source inspection or a successful documentation build. The source product checkout also contains uncommitted intake and delivery changes, so the recorded review baseline must not be equated with the deployed release.

Following a reader question about source IDs, the four home pages now explain that markers such as `[S28]` refer to entries in the source guide. The documentation parity checks passed, and a 390 px preview check confirmed HTTP 200 and the explanation on all four home pages. The previously successful native build predates this text-only addition.

The isolated Mintlify native build was rerun after the source-marker explanation and exited 0 with `success build validation passed`; no published content changed during that run.

A preview interaction followed the Traditional Chinese home page's source-guide link to `/zh-TW/product/sources` and found the S28 table entry. This verifies the guide link and example entry, not individual inline source-marker links; the markers remain plain text.
