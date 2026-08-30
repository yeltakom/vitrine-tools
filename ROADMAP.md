# ROADMAP — shortest path to first euro

Work top to bottom. Tick boxes as you go. One task = one commit.

## Milestone 1 — Paid loop live (target: first paying user)

### Generator hardening
- [x] Move generator into `/generator` route as a proper page (not a component demo)
- [x] Persist current budget in URL/localStorage-free state (React state + optional JSON import/export so users don't lose work)
- [x] Add "Import JSON / Export JSON" so users can save and reload budgets without accounts
- [ ] Add PDF export alongside .xlsx (client-side, same data model)
- [ ] Add 3 more template categories from `src/data/templates/`: Production, Communication/Press, Public Programme
- [ ] Add a currency/format switch (EUR default; GBP, USD, TRY formatting only, no conversion)

### Free vs paid gate
- [ ] Free tier: unlimited editing, .xlsx export watermarked "Made with vitrine.tools", max 25 line items
- [ ] Paid tier (one-time license, EUR 29): no watermark, unlimited items, PDF export, all templates
- [ ] License key input field in generator header; validate against Lemon Squeezy License API (client-side call to our own `/api/license/validate` route)
- [ ] Create `/api/license/validate` route handler (server) that calls Lemon Squeezy, returns {valid, instance}
- [ ] Store validated key in memory + `localStorage`-free cookie (httpOnly) so it survives reload

### Lemon Squeezy
- [ ] Create product "VITRINE.TOOLS License" in Lemon Squeezy dashboard (HUMAN TASK — Claude drafts copy, human clicks)
- [ ] Add checkout overlay button ("Buy license — €29") using Lemon.js
- [ ] Webhook route `/api/webhooks/lemonsqueezy` for `order_created` (log only for now; no DB)

### Landing page (minimal, after paid loop works)
- [ ] Finish React migration of landing page — hero = live embedded generator preview (read-only sample budget)
- [ ] Sections: what you get (3 rows, not cards), pricing (one number), FAQ (5 questions), footer
- [ ] Impressum + Privacy policy pages (required before launch, Germany). Claude drafts; human reviews.
- [ ] OG image, favicon, meta titles

### Launch checklist
- [ ] `npm run build` clean, Lighthouse > 90 on mobile
- [ ] Test full loop in production with a real €29 purchase, then refund yourself
- [ ] Post to r/MuseumPros, Product Hunt draft, 3 newsletter sponsorship enquiries (HUMAN TASK)

## Milestone 2 — Retention
- [ ] German + Turkish UI localization
- [ ] Template marketplace: fee-standard presets (W.A.G.E., CARFAC, BKNL, Arts Council) as one-click baselines
- [ ] Timeline/Gantt generator (second document type)
- [ ] Optional accounts (only if support load demands it)

## Milestone 3 — Scale
- [ ] Institutional tier (multi-seat license)
- [ ] SEO content: "exhibition budget template" cluster, 10 pages
- [ ] Affiliate/referral for curators
