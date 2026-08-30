import Link from 'next/link'
import { t } from '@/i18n'
import { GUTTER, LABEL_LIGHT, WORDMARK } from './ledger-style'
import SiteFooter from './site-footer'

/**
 * Every page is the same object: one 78ch column of paper with a masthead at the
 * top and the legal links at the bottom. The column is the identity — widening
 * it for the marketing sections would make them a different document from the
 * budget they are describing.
 */
export default function PageShell({
  heading,
  documentLabel,
  wordmarkAsLink = true,
  footerAction,
  children,
}: {
  /** Read-out page heading. Omit on a page that sets a visible h1 of its own. */
  heading?: string
  documentLabel: string
  wordmarkAsLink?: boolean
  footerAction?: { href: string; label: string }
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-paper text-ink text-[13px] leading-[1.6] sm:text-[14px]">
      <div className="mx-auto max-w-[78ch]">
        {heading ? <h1 className="sr-only">{heading}</h1> : null}

        <header className={GUTTER}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[2px] border-b border-ink pb-[12px] pt-[16px]">
            {wordmarkAsLink ? (
              <Link className={`ghost ${WORDMARK} underline-offset-[3px] hover:underline`} href="/">
                {t('app.wordmark')}
              </Link>
            ) : (
              <span className={WORDMARK}>{t('app.wordmark')}</span>
            )}
            <span className={LABEL_LIGHT}>{documentLabel}</span>
          </div>
        </header>

        {children}

        <SiteFooter action={footerAction} />
      </div>
    </main>
  )
}
