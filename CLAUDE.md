# VITRINE.TOOLS — Project Constitution

Read this fully before touching code. Then read ROADMAP.md and pick the first unchecked task.

## What this is
Web app that generates professional exhibition-planning documents (Excel/PDF) for freelance curators
and small cultural institutions. First document: exhibition budget (Sergi/Kuratorial).
Anonymous brand — no personal names anywhere in code, copy, or metadata.

**The product mechanic — do not break this.** The user describes their exhibition in a short brief
(venue type, city, dates, artists, works, how many are loans, what is in the show, crew, technical
needs) and the app *generates the costed budget for them*. Every quantity is derived from the brief
and every rate is a card rate moved by a venue factor and a city factor — see
`src/lib/generate-budget.ts` and `src/data/templates/exhibition-budget.ts`.

A screen that makes the user type line items is a failure of the product, not a feature of it: that
is Excel, and they already have Excel. The editable ledger exists only to *correct* a generated
budget, never to build one from nothing.

## Stack (do not change without asking)
- Next.js 15 (App Router), TypeScript, Tailwind
- ExcelJS, client-side generation (no server round-trip for documents)
- Vercel deploy, domain vitrine.tools (Porkbun DNS already configured)
- Payments: Lemon Squeezy (Merchant of Record — handles EU VAT). Kleinunternehmerregelung applies.
- No database until ROADMAP says so. No auth until ROADMAP says so.

## Business priority order
1. Something a stranger can pay for TODAY beats anything else.
2. Core product (generator) before surrounding assets (landing, blog, SEO).
3. Ship small, verify in browser, commit, move on.

## Design system (binding)
Quiet editorial. The reference is printed matter from a European Kunsthalle — Spector Books,
a good catalogue — not a SaaS landing page and not a developer tool.

- Palette: black #000000 on white #FFFFFF, red #E30613 as the only accent, plus grey #6B6B6B
  for the second voice and #DEDEDE for rules. The accent appears at most twice per page.
- Type, three roles, each doing what it is good at:
  **Newsreader** (editorial serif) for headings and the one long read;
  **Archivo** (neo-grotesque) for the interface — labels, captions, controls, body;
  **JetBrains Mono** for figures only, where tabular numerals are the point.
  Mono set as display type is what made an earlier pass read as a developer tool. Do not.
- Space does the structural work, not rules. A rule separates; it never announces. If every
  row on a page has a hairline, the page has noise instead of structure.
- Signature: the hero is a catalogue spread — the brief in plain sentences on one side, the
  budget it generated on the other, both computed by the real engine.
- Quality floor: responsive to 360px, visible focus rings, prefers-reduced-motion respected.
  No animation unless it explains something.
- Anti-patterns to reject: numbered 01/02/03 markers, hero stat cards, "Trusted by" bars,
  testimonial carousels, cream/terracotta palettes, uppercase mono headlines, a full-bleed
  black hero with one bright accent. The last two are AI-design defaults; so is a page made
  entirely of hairline-ruled columns.

## Working rules
- Every task: run `npm run build` and `npm run lint` before committing. Broken build = not done.
- Commit messages: imperative, one line, e.g. `Add line-item reorder to budget generator`.
- Never commit secrets. Lemon Squeezy keys go in .env.local and Vercel env vars only.
- Default line-item data lives in `src/data/templates/*.ts`. Numbers are EUR, netto.
- Localization keys from day one (`en` default; `de`, `tr` later). No hardcoded UI strings in components.
- Before adding a dependency, check if the platform already covers it.
- If a task in ROADMAP.md is ambiguous, write your assumption in the PR/commit body and proceed — do not stall.

## Pricing (4 tiers, one-time licenses — no subscription)
| tier | price | what it unlocks |
| --- | --- | --- |
| Free | €0 | unlimited editing, max 25 line items, .xlsx watermarked "Made with vitrine.tools" |
| Single | €9 | budget generator unlocked — no watermark, unlimited items, all budget template categories, .xlsx only |
| Full | €29 | everything in Single + PDF export + every current and future document type + updates |
| Team | €79 | identical features to Full, higher activation limit (6 instead of 2) |

Full is the anchor and must stay visibly so. **PDF export and future document types are the
Full-tier differentiator by design** — Single deliberately never gains them, because "the file
formats and the document types still to come" is the only thing worth €20 more than Single.
Team buys seats, never features.

One Lemon Squeezy product, three paid variants. Tier is read from the variant returned by the
license validation response — there is no database, so the license key is the only source of truth.

## Definition of "monetizable"
A visitor lands on vitrine.tools, builds a budget in the free generator, hits the export limit or a premium template,
pays via Lemon Squeezy checkout, receives a license key by email, unlocks the export. That loop, end to end, is Milestone 1.
Everything not on that path is Milestone 2+.

## Frontend skill (mandatory)
Before any UI task, invoke /frontend-design:frontend-design. Follow its two-pass process:
first write a design plan (tokens, type scale, layout, one signature element), critique it against
"would a generic AI produce this?", revise, then build. Never skip the plan step.
