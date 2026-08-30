import Link from 'next/link'
import { t } from '@/i18n'
import { SHELL } from './ledger-style'
import SiteFooter from './site-footer'

/**
 * One sheet of paper with a running head at the top and a colophon at the foot.
 * The masthead is deliberately small: on a page of printed matter the running
 * head is the quietest thing on the spread, not the loudest.
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
  const wordmark = <span className="text-[15px] font-semibold tracking-[-0.01em]">{t('app.wordmark')}</span>

  return (
    <main className="min-h-screen">
      <div className={SHELL}>
        {heading ? <h1 className="sr-only">{heading}</h1> : null}

        <header className="flex flex-wrap items-baseline justify-between gap-x-[20px] gap-y-[4px] border-b border-rule py-[20px]">
          {wordmarkAsLink ? (
            <Link className="ghost no-underline" href="/">
              {wordmark}
            </Link>
          ) : (
            wordmark
          )}
          <span className="label muted">{documentLabel}</span>
        </header>

        {children}

        <SiteFooter action={footerAction} />
      </div>
    </main>
  )
}
