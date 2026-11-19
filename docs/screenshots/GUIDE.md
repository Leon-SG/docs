# Screenshot guide (generated — do not edit by hand)

Regenerate with `node scripts/screenshots.mjs guide`. 18 slots.

## How to shoot

1. Use the mock-data accounts (one client, one lawyer, one firm admin). Use only fictional names (for example *Muster GmbH*, *Lena Weber*). No real people, emails or documents.
2. Browser window 1440×900, zoom 100%, light mode. Crop to the panel that matters.
3. Shoot every slot four times with the app language set to English, Deutsch, 繁體中文 and 简体中文. Save as `images/screenshots/<lang>/<id>.png` (lang = en, de, zh-TW, zh-CN).
4. Blur anything that looks like a real email, ID number or address.
5. Run `node scripts/screenshots.mjs apply`, then `npx mint dev` and look at every changed page.

## Mock data needed

- Client company *Muster GmbH* with matters in each status: pending review, accepted, quoted, paid, in progress, delivered, declined (with a reason, reopenable).
- One matter with an open document request (an identity item asked for again).
- One delivered matter with two files, one with a translation copy.
- Firm *Kanzlei Beispiel* with three members (admin, lawyer, assistant), five library documents in different processing states, and some audit-log entries.

## Slots

| # | id | page — section | role | app URL | what to show | en | de | zh-TW | zh-CN |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `client-home-progress` | getting-started/for-clients.mdx — The five steps | client | `/orbid/client` | Client home with one matter open and the progress bar on "Lawyer review"; demo client "Demo GmbH", matter "Set up a company in Germany" | ⬜ | ⬜ | ⬜ | ⬜ |
| 2 | `counsel-engagements-list` | getting-started/for-law-firms.mdx — The four steps | lawyer | `/orbid/counsel/engagements` | Engagement review list with three matters in "Pending review", one open on the right showing the client's summary; demo firm "Muster Rechtsanwälte" | ⬜ | ⬜ | ⬜ | ⬜ |
| 3 | `intake-verify-upload` | clients/identity-documents.mdx — How do I upload them? | client | `/orbid/intake/new` | Verify step with a checklist of three required items; the first shows an uploaded file "passport.pdf", the others show "Upload file"; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 4 | `client-quote-confirm` | clients/quotes-and-payment.mdx — What should I check? | client | `/orbid/client` | Matter open on a quote: fixed price EUR 1,200, valid until a date 10 days away, and the "Confirm & pay" button; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 5 | `client-delivery-files` | clients/receive-documents.mdx — Before you start | client | `/orbid/client` | Matter with a delivery of two files, each with "Download document", and the receipt box below it; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 6 | `client-declined-edit` | clients/resubmit-a-declined-matter.mdx — Before you start | client | `/orbid/client` | Declined matter showing the lawyer's reason and the "Edit and resubmit" button; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 7 | `intake-select-service` | clients/submit-a-matter.mdx — Before you start | client | `/orbid/intake/new` | Matter step "Select a service" with the search box filled with "NDA", one result selected and the "What this usually involves" panel open; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 8 | `client-matter-list-needs-you` | clients/track-your-matter.mdx — How do I read the progress bar? | client | `/orbid/client` | Client home list with a group "Needs you" holding one matter marked "Scope to confirm", and a group "In progress" holding one more; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 9 | `counsel-delivery-comments` | law-firms/deliver-documents.mdx — Before you start | lawyer | `/orbid/counsel` | Export menu with "Keep comments (4)" and "Remove all comments" and the two versions, Lawyer version and Client version; demo matter with 4 comments | ⬜ | ⬜ | ⬜ | ⬜ |
| 10 | `library-document-list` | law-firms/firm-library.mdx — How do I upload? | lawyer | `/orbid/counsel/library` | Contract library list with five documents showing the statuses Queued, Parsing, Needs review, Ready and Failed; demo firm "Muster Rechtsanwälte" | ⬜ | ⬜ | ⬜ | ⬜ |
| 11 | `counsel-matter-workbench` | law-firms/matter-workspace.mdx — Before you start | lawyer | `/orbid/counsel` | Matter workbench of a paid NDA matter with the file list on the left, a document open in the middle and the review findings on the right; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 12 | `counsel-kyc-check` | law-firms/review-engagements.mdx — Before you start | lawyer | `/orbid/counsel/engagements` | Engagement review with the identity checklist: one item set to Pass, one to Fail with a reason typed in, and the "Save result" button; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 13 | `counsel-quote-editor` | law-firms/send-a-quote.mdx — What can I set? | lawyer | `/orbid/counsel/engagements` | Quote editor with two line items, currency EUR, 14 valid days, total shown and the "Save draft" and "Send quote" buttons; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 14 | `settings-audit-log` | admin/audit-log.mdx — Before you start | admin | `/orbid/settings/audit` | Audit log filtered to "Member invited" for the last 30 days, with several rows and the "Export CSV" button; demo firm "Muster Rechtsanwälte" | ⬜ | ⬜ | ⬜ | ⬜ |
| 15 | `settings-matter-access-client` | admin/matter-access.mdx — Client companies | admin | `/orbid/client/settings/matter-access` | Client settings, Matter access page with "Only people added to the matter" selected; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 16 | `settings-notifications` | admin/notifications.mdx —  | lawyer | `/orbid/settings/notifications` | Notifications settings with the events list and Email and In Orbid switches; one event switched off; demo lawyer account | ⬜ | ⬜ | ⬜ | ⬜ |
| 17 | `settings-client-sections` | admin/settings-overview.mdx — Where are invoices? | admin | `/orbid/client/settings/company` | Client settings with the left menu listing all sections and the Company profile page open; demo client "Demo GmbH" | ⬜ | ⬜ | ⬜ | ⬜ |
| 18 | `settings-team-invite` | admin/team-and-roles.mdx — Before you start | admin | `/orbid/settings/team` | Team & members page with the "Invite several people" box holding three addresses and the "Send invitations" button; demo firm "Muster Rechtsanwälte" | ⬜ | ⬜ | ⬜ | ⬜ |
