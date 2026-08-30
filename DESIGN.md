# Design plan — vitrine.tools

Direction chosen by the owner: **quiet editorial**. The reference is printed matter from a
European Kunsthalle, not a SaaS landing page. CLAUDE.md's earlier "JetBrains Mono everywhere,
no font mixing" clause was deleted on the owner's instruction — type is now chosen for the
job rather than mandated.

## Tokens
| token | value | job |
| --- | --- | --- |
| `--color-paper` | `#FFFFFF` | the sheet |
| `--color-ink` | `#000000` | headings, figures, the one filled control |
| `--color-muted` | `#6B6B6B` | the second voice: captions, supporting columns |
| `--color-rule` | `#DEDEDE` | furniture. A rule separates, it does not announce |
| `--color-mark` | `#E30613` | signal only. Twice on the landing page: the grand total in the hero spread, and the hairline over the anchor pricing tier |

Admitting a grey was the change that let the page get quiet. Forcing every caption to full
black is what made the earlier passes shout.

## Type — three roles, three faces
| face | role |
| --- | --- |
| **Newsreader** 400/500 | `.display`, `.display-sm`, the document title. Editorial serif, never uppercase |
| **Archivo** 400/500/600 | body, `.lede`, `.label`, `.note`, every control |
| **JetBrains Mono** 400/500 | `.figure`, `.figure-total`, `.figure-price`, ledger cells — tabular numerals only |

Mono is kept exactly where columns of numbers must line up digit under digit. Setting it as
display type is what made the previous pass read as a developer tool.

Scale: `.display` clamp(34–58px) serif · `.display-sm` clamp(24–32px) serif · `.lede` 17→19px
muted · body 15→16px · `.note` 13px muted · `.label` 11px 0.13em uppercase · `.figure-total`
clamp(30–46px) mono.

## Layout
`SHELL` 1080px for the site, `DOC` 720px for the budget, because a document has a narrower
measure than the page describing it. Sections are separated by 72–104px of space and a single
hairline under their caption — not by a rule per row.

## Signature
**The hero is a catalogue spread.** Verso: the brief in plain sentences. Recto: the six
category subtotals the engine produced from exactly that brief, and the total. Both halves are
computed on the page by `generateBudget`, so the hero is not an illustration of the product —
it is the product, run once, in public. No marketing sentence has to explain what the tool
does because the spread already showed it.

## Critique — would a generic AI produce this?
Three earlier passes were thrown away for being exactly the defaults this skill names:
a broadsheet of hairline-ruled columns; a full-bleed black hero with one bright accent and
100px uppercase mono; and a read-only screenshot presented as a live demo. The current page
avoids all three — white ground, serif display, mono demoted to data, and the accent spent
twice. The remaining risk is blandness, which is answered by the spread and by the amount of
white the page is willing to hold.

## Motion
One animation: `mark-in`, 120ms opacity, when a deviation mark appears.
`prefers-reduced-motion` removes it. Nothing else moves.
