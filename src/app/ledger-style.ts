/**
 * The class ladder both ledgers are built from — the editable one in /generator
 * and the read-only one on the landing page. They must not drift: a figure on the
 * landing page has to land in the same column as the figure a user is editing.
 *
 * De-emphasis is scale and weight, not a lighter ink. Three rungs sit at 11px —
 * bold uppercase for structure, regular uppercase for the document label,
 * regular sentence case for hints — under 13/14px 500 body and 14px 700 figures.
 */

export const LABEL = 'text-[11px] font-bold uppercase tracking-[0.16em]'
export const LABEL_LIGHT = 'text-[11px] font-normal uppercase tracking-[0.16em]'
export const HINT = 'text-[11px] font-normal'
export const GUTTER = 'px-[2ch] sm:px-[3ch]'

/** The wordmark, and the one place 14px is set in extrabold. */
export const WORDMARK = 'text-[14px] font-extrabold uppercase tracking-[0.18em]'

/** Narrow screens stack the line over its figures; the character grid takes over at sm. */
export const ROW =
  'flex flex-col gap-[2px] py-[8px] sm:grid sm:h-10 sm:grid-cols-[1fr_6ch_12ch_14ch] sm:items-center sm:gap-x-[2ch] sm:gap-y-0 sm:py-0'
export const FIGURES = 'flex items-baseline gap-[1ch] sm:contents'

/** A name, a hairline, and the figure that settles it. The only structural device. */
export const CATEGORY_GRID =
  'grid h-10 items-center grid-cols-[auto_1fr_10ch] gap-x-[1ch] sm:grid-cols-[auto_1fr_14ch] sm:gap-x-[2ch]'

/** The bordered control that names its own result. Takes its border from the
 *  ink it is sitting in, so the same token works on paper and on a black panel. */
export const BUTTON = `border border-current px-[1.5ch] py-[8px] ${LABEL}`

/** Full-bleed sections share one measure; the budget document keeps its own. */
export const SHELL = 'mx-auto w-full max-w-[1120px] px-[20px] sm:px-[40px]'
export const DOC = 'mx-auto w-full max-w-[78ch]'
