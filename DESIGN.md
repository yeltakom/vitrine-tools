# Design plan — vitrine.tools

Binding constraints come from CLAUDE.md. This file records the decisions those
constraints leave open, so later passes do not re-litigate them.

## Tokens
Three inks, no fourth. `--color-ink #000000`, `--color-paper #FFFFFF`, `--color-mark #E30613`.
Red is spent on exactly two things: the total figure and the deviation mark. Nothing else
turns red — not links, not hovers, not errors' text.

## Type scale
One family (JetBrains Mono). Rank is carried by scale and weight alone.

| rung | size / weight | job |
| --- | --- | --- |
| 11 / 700 uppercase 0.16em | structural label — category, section head |
| 11 / 400 uppercase 0.16em | document label — what this page is |
| 11 / 400 | hint, caption, unit |
| 13–14 / 500 | body and ledger lines |
| 20 / 700 | the document's own name (outranks its lines) |
| 28 / 800 | the one figure that settles the page |

De-emphasis is never a lighter ink. A hint is small, not grey.

## Layout
A single 78ch column on every page, gutter `2ch` (`3ch` at sm). The character grid is the
measure: columns are `1fr 6ch 12ch 14ch`, so figures land under figures without a table.
Below `sm` the line stacks over its figures rather than shrinking the grid.

Structure is one device: a 1px black hairline between a name and the figure it settles.
It is the same device for a category and its subtotal, for the masthead and its actions,
and for a section head and its number.

## Signature
**Every section is a budget line.** A section head, a document's build status, a price and
the hero's own promise are all the same object: a name on the left, a hairline, and the figure
that settles it. The marketing reads as part of the ledger rather than as writing about it.

The hero states the business — this is a startup site, not a bare calculator — and is
answered immediately by two ledger lines pricing the reader's next step: `10 min` and `0,00`,
the second set in the same red the tool sets a total in.

Halfway down, under "Try it", the **real generator** is embedded. Not a screenshot, not a
read-only copy: the same component `/generator` runs, seeded with a sample show. Whatever a
visitor types there is in the file they download. Because that ledger is live, every editable
cell carries its 1px rule **at rest** rather than on hover — a budget whose fields appear only
under the pointer reads as a print-out, which is the one thing this page must not be.

The brief asked the page to open on a working table rather than a headline. The owner
overruled that: the site has to explain the business first. What the brief keeps is the
grammar above, which is why the page still could not be mistaken for a generic SaaS landing.

## Critique — would a generic AI produce this?
A generic pass produces: headline hero + subhead + CTA, three feature cards with icons, a
pricing card with a checkmark list, an FAQ accordion. Every one of those is refused here.
The broadsheet-with-hairlines look is itself a common AI default, but the brief mandates it
explicitly, so it stands.

Two things were revised after the first pass:
- "What you get" was label-left / prose-right, which reads as feature copy. It is now
  prose-left / **figure**-right, so the rows carry information and join the ledger.
- The FAQ was an accordion. It is now flat rows: no motion that does not explain something.

## Motion
One animation exists: `mark-in`, 120ms linear opacity, when a deviation mark appears.
`prefers-reduced-motion` reduces it to nothing. There is no other motion on the site.
