import { t } from '@/i18n'
import { LABEL, LABEL_LIGHT, SHELL } from './ledger-style'

/**
 * The site is installed rather than laid out. Rooms are full-bleed panels that
 * alternate between paper and ink; each opens with a wall label — the small
 * typed card an institution hangs beside a work — and, where a room needs it,
 * wall text at the size a museum paints an introduction.
 *
 * Every part below takes its rules and borders from `currentColor`, so the same
 * component is correct on paper and on a black panel without a second variant.
 */

/** A room. `tone` decides whether it is hung on paper or on ink. */
export function Room({
  tone = 'paper',
  id,
  children,
  className = '',
}: {
  tone?: 'paper' | 'ink'
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`${tone === 'ink' ? 'bg-ink text-paper' : 'bg-paper text-ink'} ${className}`}
    >
      <div className={SHELL}>{children}</div>
    </section>
  )
}

/** The label that opens a room: a name, a rule, and an optional status. */
export function RoomLabel({ label, status }: { label: string; status?: string }) {
  return (
    <div className="flex items-center gap-[2ch] border-b border-current pb-[10px]">
      <h2 className={LABEL}>{label}</h2>
      <span className="h-px flex-1 bg-current" aria-hidden="true" />
      {status ? <span className={LABEL_LIGHT}>{status}</span> : null}
    </div>
  )
}

/**
 * The wall label. Maker, work and year, medium, dimensions, credit line —
 * the five lines an institution types for every object it hangs, filled in
 * with what is actually true about this one.
 */
export function WallLabel() {
  return (
    <div className="wall-label">
      <p>{t('label.maker')}</p>
      <p>{t('label.work')}</p>
      <p>{t('label.medium')}</p>
      <p>{t('label.dimensions')}</p>
      <p>{t('label.credit')}</p>
    </div>
  )
}

/** A claim and the figure that settles it — the budget's grammar, page-sized. */
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
    <div className="flex items-baseline justify-between gap-[3ch] border-b border-current py-[16px]">
      <p className="min-w-0">{body}</p>
      <span className={`figure shrink-0 ${strong ? '' : 'font-normal'}`}>{figure}</span>
    </div>
  )
}

/**
 * A step in a real sequence. The order is carried by the verbs — start, change,
 * download — so it needs no 01/02/03 to announce that it is a sequence.
 */
export function Step({ label, body }: { label: string; body: string }) {
  return (
    <li className="border-t border-current pt-[16px]">
      <h3 className={LABEL}>{label}</h3>
      <p className="mt-[12px]">{body}</p>
    </li>
  )
}

export function Question({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-current py-[18px] md:grid md:grid-cols-[minmax(0,34ch)_minmax(0,1fr)] md:gap-[4ch]">
      <h3 className="font-bold">{question}</h3>
      <p className="mt-[6px] md:mt-0">{answer}</p>
    </div>
  )
}
