/**
 * Shared class tokens. The type roles themselves live in `globals.css` as
 * `.display`, `.label`, `.figure` and friends — these are only the layout
 * decisions the ledger and the pages have to agree on.
 */

export const LABEL = 'label muted'
export const SHELL = 'mx-auto w-full max-w-[1080px] px-[24px] sm:px-[40px]'
/** The budget keeps a narrower measure than the site: it is a document. */
export const DOC = 'mx-auto w-full max-w-[720px]'
export const GUTTER = ''

/** Narrow screens stack the line over its figures; the grid takes over at sm. */
export const ROW =
  'flex flex-col gap-[2px] py-[10px] sm:grid sm:h-11 sm:grid-cols-[1fr_5ch_11ch_12ch] sm:items-center sm:gap-x-[16px] sm:gap-y-0 sm:py-0'
export const FIGURES = 'flex items-baseline gap-[10px] sm:contents'
export const CATEGORY_GRID =
  'grid h-11 items-center grid-cols-[auto_1fr_10ch] gap-x-[12px] sm:grid-cols-[auto_1fr_12ch] sm:gap-x-[16px]'
