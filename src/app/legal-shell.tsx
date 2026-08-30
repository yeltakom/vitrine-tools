import Link from 'next/link'
import { t } from '@/i18n'
import { GUTTER, HINT, LABEL, LABEL_LIGHT, WORDMARK } from './ledger-style'
import SiteFooter from './site-footer'

export interface LegalEntry {
  label: string
  body: string
}

/**
 * Impressum and Privacy are the same document with different entries: a masthead,
 * a standing draft mark, then label/body pairs separated by the same hairline the
 * ledger uses between a category and its subtotal.
 *
 * The draft notice is deliberately visible rather than a code comment. These pages
 * carry bracketed placeholders that would be a legal problem if they went live
 * unnoticed, so the page says so in the one colour reserved for a deviation.
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
    <main className="min-h-screen bg-paper text-ink text-[13px] leading-[1.6] sm:text-[14px]">
      <div className="mx-auto max-w-[78ch]">
        <header className={GUTTER}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[2px] border-b border-ink pb-[12px] pt-[16px]">
            <Link className={`ghost ${WORDMARK} underline-offset-[3px] hover:underline`} href="/">
              {t('app.wordmark')}
            </Link>
            <span className={LABEL_LIGHT}>{t('legal.documentLabel')}</span>
          </div>
        </header>

        <div className={GUTTER}>
          <p
            className={`flex items-baseline gap-[1ch] border-b border-ink py-[10px] font-bold ${HINT}`}
          >
            <span className="block h-[5px] w-[5px] shrink-0 bg-mark" aria-hidden="true" />
            {t('legal.draftNotice')}
          </p>
        </div>

        <section className={`${GUTTER} py-[20px]`}>
          <h1 className="text-[20px] font-bold leading-[1.3]">{title}</h1>
          <p className={`mt-[8px] ${HINT}`}>{intro}</p>
        </section>

        <div className={GUTTER}>
          {entries.map((entry) => (
            <div key={entry.label} className="border-t border-ink py-[16px]">
              <h2 className={LABEL}>{entry.label}</h2>
              <p className="mt-[8px]">{entry.body}</p>
            </div>
          ))}
        </div>

        <SiteFooter action={{ href: '/generator', label: t('action.openGenerator') }} />
      </div>
    </main>
  )
}
