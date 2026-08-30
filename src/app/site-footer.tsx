import Link from 'next/link'
import { t } from '@/i18n'
import { GUTTER, HINT } from './ledger-style'

/**
 * The legal links have to be reachable from every page (Germany), so the footer
 * is shared rather than owned by the landing page. It keeps the ledger grammar:
 * names on the left, the thing that settles the page on the right.
 */
export default function SiteFooter({
  action,
}: {
  action?: { href: string; label: string }
}) {
  return (
    <footer className={`${GUTTER} pb-[40px] pt-[32px]`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[8px] border-t border-ink pt-[16px]">
        <span className={`flex flex-wrap items-baseline gap-x-[2ch] gap-y-[4px] ${HINT}`}>
          <Link className="link" href="/impressum">
            {t('footer.impressum')}
          </Link>
          <Link className="link" href="/privacy">
            {t('footer.privacy')}
          </Link>
        </span>
        {action ? (
          <Link className={`link ml-auto ${HINT}`} href={action.href}>
            {action.label}
          </Link>
        ) : null}
      </div>
    </footer>
  )
}
