import { t } from '@/i18n'

import PageShell from './page-shell'

export interface LegalEntry {
  label: string
  body: string
}

/**
 * Impressum and Privacy are the same document with different entries: label and
 * body pairs separated by the same hairline the ledger uses between a category
 * and its subtotal.
 *
 * The draft notice is deliberately visible rather than a code comment. These
 * pages carry bracketed placeholders that would be a legal problem if they went
 * live unnoticed, so the page says so in the one colour reserved for a deviation.
 */
export default function LegalShell({
  title,
  intro,
  entries,
}: {
  title: string
  intro: string
  entries: LegalEntry[]
}) {
  return (
    <PageShell
      documentLabel={t('legal.documentLabel')}
      footerAction={{ href: '/generator', label: t('action.openGenerator') }}
    >
      <div className="">
        <p
          className={`flex items-baseline gap-[1ch] border-b border-ink py-[10px] font-bold note`}
        >
          <span className="block h-[5px] w-[5px] shrink-0 bg-mark" aria-hidden="true" />
          {t('legal.draftNotice')}
        </p>
      </div>

      <section className={`py-[24px]`}>
        <h1 className="cell-title">{title}</h1>
        <p className={`mt-[8px] note`}>{intro}</p>
      </section>

      <div className="">
        {entries.map((entry) => (
          <div key={entry.label} className="border-t border-ink py-[16px]">
            <h2 className="label muted">{entry.label}</h2>
            <p className="mt-[8px]">{entry.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
