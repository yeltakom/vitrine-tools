# VITRINE.TOOLS — Project Constitution

Read this fully before touching code. Then read ROADMAP.md and pick the first unchecked task.

## What this is
Web app that generates professional exhibition-planning documents (Excel/PDF) for freelance curators
and small cultural institutions. First template: exhibition budget (Sergi/Kuratorial).
Anonymous brand — no personal names anywhere in code, copy, or metadata.

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
- Brutalist. Black #000000, white #FFFFFF, red #E30613 as the single accent. No gradients, no shadows, no border-radius.
- Type: JetBrains Mono everywhere (display + body + data). Personality comes from scale and weight, not from font mixing.
- Hairline 1px black rules as the only structural device. Grid is visible and honest.
- Signature element: the generator's live preview IS the hero. The landing page opens on a working budget table, not a headline.
- Copy: sentence case, plain verbs, no marketing filler. Buttons name the result: "Download .xlsx", not "Submit".
- Quality floor: responsive to 360px, visible focus rings, prefers-reduced-motion respected. No animation unless it explains something.
- Anti-patterns to reject: numbered 01/02/03 markers, hero stat cards, "Trusted by" bars, testimonial carousels, cream/terracotta palettes.

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
