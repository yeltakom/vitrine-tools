import { GUTTER, HINT, LABEL } from './ledger-style'

/**
 * The page below the hero is built from one shape, borrowed from the budget it
 * is describing: a name on the left, a hairline, and the figure that settles it.
 * A section head, a document's status and a price are all the same object here,
 * which is why the marketing reads as part of the tool rather than about it.
 */
export function SectionRule({ label, id }: { label: string; id?: string }) {
  return (
    <div className={GUTTER} id={id}>
      <div className="grid h-10 grid-cols-[auto_1fr] items-center gap-x-[1ch] sm:gap-x-[2ch]">
        <h2 className={LABEL}>{label}</h2>
        <span className="h-px bg-ink" aria-hidden="true" />
      </div>
    </div>
  )
}

/** A claim and the number that settles it. */
export function LedgerRow({
  body,
  figure,
  strong = false,
}: {
  body: string
  figure: string
  strong?: boolean
}) {
  return (
    <div className={GUTTER}>
      <div className="flex items-baseline justify-between gap-[2ch] border-t border-ink py-[14px]">
        <p className="min-w-0">{body}</p>
        <span className={`figure shrink-0 ${strong ? '' : 'font-normal'}`}>{figure}</span>
      </div>
    </div>
  )
}

/** A hero line: label, rule, figure — the budget grammar at page scale. */
export function HeroLine({ label, figure, mark }: { label: string; figure: string; mark?: boolean }) {
  // Below sm the label wraps and would crush the connecting rule, so the rule
  // only appears once there is room for it to mean something.
  return (
    <div className="flex items-baseline justify-between gap-[2ch] border-t border-ink py-[10px] sm:grid sm:h-10 sm:grid-cols-[auto_1fr_14ch] sm:items-center sm:gap-x-[2ch] sm:py-0">
      <span className={LABEL}>{label}</span>
      <span className="hidden h-px bg-ink sm:block" aria-hidden="true" />
      <span className={`figure shrink-0 ${mark ? 'figure-total text-mark' : ''}`}>{figure}</span>
    </div>
  )
}

/**
 * A step in a real sequence. The order is carried by the verbs — start, change,
 * download — so it needs no 01/02/03 to announce that it is a sequence.
 */
export function Step({ label, body }: { label: string; body: string }) {
  return (
    <li className={GUTTER}>
      <div className="border-t border-ink py-[14px] sm:grid sm:grid-cols-[14ch_1fr] sm:gap-x-[2ch]">
        <h3 className={`${LABEL} pt-[4px]`}>{label}</h3>
        <p className="mt-[6px] min-w-0 sm:mt-0">{body}</p>
      </div>
    </li>
  )
}

export function Question({ question, answer }: { question: string; answer: string }) {
  return (
    <div className={GUTTER}>
      <div className="border-t border-ink py-[14px]">
        <h3 className="font-bold">{question}</h3>
        <p className="mt-[4px]">{answer}</p>
      </div>
    </div>
  )
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className={`${GUTTER} border-t border-ink py-[16px]`}>{children}</div>
}

export { GUTTER, HINT }
