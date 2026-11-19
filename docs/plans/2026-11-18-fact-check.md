# Fact-check log (2026/11/18)

Frontend root: `carbon-phase0-frontend/src` (FE). Status: verified / corrected / removed.

| Claim | Page | Evidence | Status |
| --- | --- | --- | --- |
| Sign in with email one-time code, no password | clients/submit, faq | lib/orbid/settings/copy.ts:28; lib/orbid/matter/intake-v2-copy.ts (loginLead) | verified |
| Google/Microsoft/WeChat sign-in "Coming soon" | clients/submit | intake-v2-copy.ts (loginGoogle, loginSoon, socialSoonTag) | verified |
| "Submit and lock" | clients, getting-started | intake-v2-copy.ts `submit` | verified |
| "Upload file", "Remove", "Required" | clients/identity | intake-v2-copy.ts `upload`, `remove`, `required` | verified |
| "New matter" button | getting-started, clients | lib/orbid/client/cw-messages.ts (en) `cw_new_matter` | verified |
| "Select a service", "Something else", direction/"You are" choices | clients/submit | intake-v2-copy.ts `onboardTitle`, `onboardNoResults`, `dirFrom`, `identity` | verified |
| Step name "Verify" | clients | intake-v2-copy.ts `stepVerify` | verified |
| "Confirm & pay" | clients/quotes | components/orbid/client/workspace/engagement-panel.tsx (EN `accept`) | verified |
| Reopen button label "Reopen" | clients/resubmit | engagement-panel.tsx EN `reopen` = "Edit and resubmit" | corrected |
| "Resubmit to lawyer" | clients/resubmit | engagement-panel.tsx EN `resubmit` | verified |
| "Confirm receipt", "Download invoice PDF", "Download document" | clients/receive | i18n/locales/en.json `deliver_ack_submit`, `deliver_download_invoice`, `deliver_download_doc` | verified |
| Receipt needs name + tick box | clients/receive | en.json `deliver_your_name`, `deliver_ack_checkbox` | verified (added) |
| Client statuses Pending review/Accepted/Quoted/Paid/Declined | clients/track | Those are lawyer-side names (counsel-review.ts `cr.eng.views.*`); client sees stage bar Intake, KYC, Lawyer review, Quote, Payment, In progress, Delivered | corrected |
| Client stage bar names | clients/track | components/orbid/client/workspace/engagement-stage-bar.tsx:13 | verified |
| Lawyer statuses (Pending review, Client editing, To quote, Quoted, Paid, Declined, Cancelled) | law-firms/review | components/orbid/v2/i18n/messages/counsel-review.ts `cr.eng.views.*` | corrected (old "Accepted" -> "To quote") |
| Message recipient choice: XiaoOu or lawyer | clients/track | cw-messages.ts `cw_composer_to`, `cw_composer_xiaoou`, `cw_composer_pick` | verified |
| Only approver/finance may pay (role message) | clients/quotes | engagement-panel.tsx `role_denied` | verified |
| KYC types PDF/JPEG/PNG/WebP/HEIC | clients/identity | lib/orbid/kyc/upload-rules.ts:6-30 | verified |
| 25 MB per file | clients/identity, faq | upload-rules.ts:6; intake-v2-copy.ts `too_large` | verified |
| 10 files per item | clients/identity, faq | lib/orbid/kyc/upload-checklist.ts:274 | verified |
| 300 MB per matter | clients/identity | upload-rules.ts:7 | verified |
| 10 MB backup upload limit | clients/identity | upload-rules.ts:11 | removed (internal) |
| Empty files / encrypted PDFs rejected | clients/identity, faq | intake-v2-copy.ts `upErr.empty_file`, `pdf_encrypted` | verified |
| Upload notice before upload ("Please read before uploading", "Confirm and upload") | clients/submit | intake-v2-copy.ts `noticeGateTitle`, `noticeConfirm` | verified |
| Consent PIPL / GDPR | clients/identity | intake-v2-copy.ts `consentPipl`, `consentDsgvo` | verified |
| Quote validity 14 default, 1-60 | clients/quotes, send-a-quote, faq | lib/orbid/matter/engagement.ts:30,109 | verified |
| Currencies EUR/USD/CNY | quotes, send-a-quote, faq | engagement.ts:31 | verified |
| Tax treatments standard/reverse charge/exempt; VAT ID needed | send-a-quote | engagement.ts:82; counsel-review.ts `cr.eng.taxMode.*`, `vatIdRequired` | verified (added) |
| Quote editor fields (item, qty, unit price net, note, valid days) | send-a-quote | counsel-review.ts `cr.eng.item`, `qty`, `unitPrice`, `note`, `validDays` | corrected (old "scope, amount") |
| "Accept matter", "Decline matter", "Confirm decline", "Request documents", "Send quote", "Save draft" | review, send-a-quote | counsel-review.ts `cr.eng.accept`, `decline`, `confirmDecline`, `requestDocs`, `send`, `saveDraft` | corrected (was "Accept"/"Decline") |
| "Pass", "Fail", "Save result"; fail needs reason, not shown to client | review | counsel-review.ts `cr.kyc.outcome.*`, `outcomeSave`, `failNote` | verified (added) |
| Decline reason >= 10 chars | review, faq | engagement.ts:51; `cr.eng.reason` | verified |
| Resubmission limit 2 | resubmit, faq | engagement.ts:409; engagement-panel.tsx `limit` | verified |
| Draft quote allowed before KYC; send needs KYC passed | send-a-quote | counsel-review.ts `cr.eng.quoteLocked` | verified |
| Sent quote cannot be withdrawn | send-a-quote | counsel-review.ts `cr.eng.finalHint` | verified |
| "Open matter workbench" opens after payment | matter-workspace | counsel-review.ts `cr.eng.openWorkbench`, `payPaid` | verified |
| "Approve and deliver all files" + review tickbox + signing lawyer | deliver | i18n/overlays/en.json:582-585 | verified |
| Comment choices (3) | deliver | overlays/en.json:586-594 | corrected (labels); detail about "unmarked treated as internal" | removed |
| Delivery checklist "is not a gate" | deliver, faq | not found in UI copy (only "high-risk Review items are still open" warning) | removed |
| Tracked-changes copy for client | receive, deliver | not found in client UI | removed |
| Translation copy "not binding" | receive, faq | not found; only `cr.tr.*` translation strings | removed (now: ask your lawyer) |
| Library types DOCX/DOC/PDF/TXT/MD, 50 MB | firm-library, faq | lib/orbid/counsel/library/store.ts:56-57; extract.ts:19 | verified |
| Library name "Contract library" | firm-library | overlays/en.json:168 | corrected (was "Firm library") |
| Library statuses | firm-library | overlays/en.json:199-205: Queued, Parsing, Desensitizing, Classifying, Needs review, Ready, Failed | corrected (old "Reading", "Removing sensitive details") |
| "Keep the original file" default on; only uploader/admin open | firm-library | overlays/en.json:175-176 | verified |
| "Save to contract library"; only delivered; archive <= 20 | firm-library | overlays/en.json:407,412; lib/orbid/counsel/library/archive.ts:45 | verified |
| Retention 30 days to 10 years, permanent nightly deletion | firm-library | overlays/en.json:540,546-556 | corrected (old "last use" wording simplified) |
| Search result limit 20 | firm-library | not re-verified | removed |
| Firm settings section names | settings-overview | lib/orbid/settings/routes.ts:4-17; en.json:21299-21305 ("Firm profile", "Team & members", "Plans & billing") | corrected |
| Client settings sections | settings-overview | lib/orbid/settings/client-routes.ts:7-45; copy.ts:13-20 ("Sign-in & security", "Company profile") | corrected |
| Client settings behind a flag | settings-overview | app/(orbid)/orbid/client/settings/[section]/page.tsx (clientSettingsEnabled) | verified |
| Company detail change sends verification to review | settings-overview | lib/orbid/settings/copy.ts `kyc_notice` | verified |
| Billing view lists up to 500 matters | settings-overview, quotes | not found | removed |
| Bulk invite <= 50 | team-and-roles | lib/orbid/settings/org-admin-api.ts:288; admin-copy.ts `bulk_hint` | verified |
| "Invite several people", "Send invitations", result counts, error texts | team-and-roles | admin-copy.ts:79-117 | corrected |
| Roles list | team-and-roles | admin-copy.ts `role_*` | corrected |
| Matter access options and default members auto-added | matter-access | copy.ts `vis_*`, `default_members`; supabase/migrations/20261202020000_orbid_settings_org_p1.sql:10-34 (trigger) | verified (UI hint says "later release" but trigger exists) |
| Notification events | notifications | admin-copy.ts:10-21 | corrected (labels); role split per list is inferred from event names | verified (partial) |
| "Some important emails are always sent" | notifications | not verified | removed |
| Audit log filters Event/From/To, "Load more", "Export CSV", admins only | audit-log | admin-copy.ts:41-54 | verified |
| CSV <= 5000 rows | audit-log, faq | lib/orbid/settings/org-admin-api.ts:154 | verified |
| "Access-denied events are sampled" | audit-log | internal mechanism | removed |
| Lawyer sign-in with work email on invitation | for-law-firms | intake-v2-copy.ts `lawyerLead` | verified |
| Lawyer reply "within 1 business day" | submit | intake-v2-copy.ts `successLead` | removed (not promised in docs) |
