# Design plan — vitrine.tools

Binding constraints come from CLAUDE.md. This file records the decisions those
constraints leave open, so later passes do not re-litigate them.

## Tokens
Three inks, no fourth. `--color-ink #000000`, `--color-paper #FFFFFF`, `--color-mark #E30613`.

They are used as **areas**, not only as lines. A black panel is still two colours and no
gradient; inversion is where the drama comes from in a palette this small. Red is spent
exactly twice on the landing page: the total the generator calculates, and the one pricing
tier the wall is hung around. Nowhere else — not on links, not on hovers, not on errors.

## Type scale
One family (JetBrains Mono). Rank is carried by scale and weight alone, so the jumps have
to be large enough to read as decisions.

| rung | size / weight | job |
| --- | --- | --- |
| `.hero-type` | clamp(36–100px) / 800, −0.055em, 0.94 uppercase | the title wall. One per site. |
| `.figure-price` | clamp(38–62px) / 800, −0.04em | a price. The only figure allowed to outgrow a total |
| `.display` | clamp(26–38px) / 800 | a legal page's title |
| `.wall-text` | 17→21px / 400 | the paragraph painted at the entrance of a room |
| `.lede` | 15→18px / 400 | the opening paragraph under the title wall |
| body | 13–14px / 400–500 | prose and ledger lines |
| `LABEL` | 11px / 700 uppercase 0.16em | room labels, tier names, categories |
| `.wall-label` | 11px / 400, 1.8 | the typed card beside a work |

De-emphasis is never a lighter ink. A hint is small, not grey.

## Layout
Two measures, and the difference between them means something.

- **Rooms** (`SHELL`, max 1120px) — the site. Full-bleed panels that alternate paper and ink.
- **The document** (`DOC`, 78ch) — the budget. It keeps the narrow measure because it is a
  document, and it is framed inside its room so you can see that it is an object on display.

Structure is one device: a 1px rule in `currentColor` between a name and the figure it
settles. It is the same device for a category and its subtotal, a room and its status, a
document type and whether it is built yet.

## Signature
**The site is installed, not laid out.** It is hung the way the audience hangs a show.

- A **title wall** in ink opens it: the headline set as a wall, uppercase, leading under 1.
- Beside it hangs the **wall label** — the five-line typed card an institution puts next to
  every object: maker, work and year, medium, dimensions, credit line. Filled in with what is
  true here, including the dimensions: `Fourteen questions in, six categories out`, which is
  the actual shape of the thing.
- Each room after it opens with its own label, and where a room needs an introduction it gets
  **wall text**, set larger than the catalogue prose beneath it.
- The generator is the **object on display**: framed, labelled `THE GENERATOR / LIVE`. What is
  shown is a budget the real engine generated from a real brief, still editable — never a
  hand-typed sample, because the claim of the page is that nothing here is typed by hand.
- Pricing is **four works on one wall**, divided by hairlines, with Full filled in red because
  it is the only tier carrying PDF and every document type still to come.

Because the displayed ledger is live, every editable cell carries its 1px rule **at rest**
rather than on hover. A budget whose fields appear only under the pointer reads as a
print-out, which is the one thing this page must not be.

## Critique — would a generic AI produce this?
A generic pass produces: a centred hero with a gradient, three feature cards with icons, a
pricing table with checkmark columns and a "most popular" ribbon, an FAQ accordion. Every one
of those is refused here — the ribbon becomes a red fill, the cards become panels divided by
rules, the accordion becomes flat rows.

Two earlier passes were thrown away for being generic in the other direction: a page that was
nothing but 78ch of hairline-ruled small type, which is the broadsheet default, and a hero
that was a read-only screenshot of the product. The brief's "open on a working table, not a
headline" was overruled by the owner — the site has to state the business — but the ledger
grammar it protects survives in every room.

## Motion
One animation exists: `mark-in`, 120ms linear opacity, when a deviation mark appears.
`prefers-reduced-motion` reduces it to nothing. There is no other motion on the site.
