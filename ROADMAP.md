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

### Free vs paid gate (4 tiers)
- [ ] Free: unlimited editing, .xlsx export watermarked "Made with vitrine.tools", max 25 line items
- [ ] SINGLE (€9): budget generator fully unlocked — no watermark, unlimited items, all template categories, .xlsx only (no PDF)
- [ ] FULL (€29): everything in Single + PDF export + all current and future document types + updates
- [ ] TEAM (€79): identical to Full, higher activation limit (team seats); no separate feature set
- [ ] License key input in generator header; /api/license/validate returns {valid, tier, activationsUsed}; gate features by tier
- [ ] Tier is derived from the Lemon Squeezy variant returned in the license validation response (variant_name/variant_id) — no database
- [ ] Store validated key + tier in httpOnly cookie so it survives reload

### Lemon Squeezy
- [ ] Create ONE product "VITRINE.TOOLS License" with three variants: Single €9 (activation_limit 2), Full €29 (activation_limit 2), Team €79 (activation_limit 6) — HUMAN TASK: Claude drafts all copy, human clicks in dashboard
- [ ] Checkout overlay via Lemon.js, one button per paid tier
- [x] Pricing shown as one 4-column row (Free / 9 / 29 / 79), Full visually anchored as the default choice
- [ ] Webhook /api/webhooks/lemonsqueezy for order_created (log only; no DB)

### Landing page (minimal, after paid loop works)
- [x] Finish React migration of landing page — headline, the case for the tool, and the live
      generator embedded mid-page under "Try it" (seeded, editable, downloads what you type)
- [x] Sections: why this exists, how it works, try it, what you get (3 rows, not cards),
      documents roadmap, who it is for, pricing (free vs €29), FAQ (5 questions), footer
- [ ] Impressum + Privacy policy pages (required before launch, Germany). Claude drafts; human reviews.
      Drafted at `/impressum` and `/privacy`. Both carry a visible draft notice and `[TBD]` placeholders
      (legal name, address, email, last-updated date). HUMAN TASK: fill those in and review, then tick.
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
