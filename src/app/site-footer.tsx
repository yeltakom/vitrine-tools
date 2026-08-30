import Link from 'next/link'
import { t } from '@/i18n'

/** The colophon. Legal links have to be reachable from every page (Germany). */
export default function SiteFooter({ action }: { action?: { href: string; label: string } }) {
  return (
    <footer className="mt-[80px] flex flex-wrap items-baseline justify-between gap-x-[20px] gap-y-[8px] border-t border-rule py-[24px] note">
      <span className="flex flex-wrap items-baseline gap-x-[20px] gap-y-[4px]">
        <Link className="link" href="/impressum">
          {t('footer.impressum')}
        </Link>
        <Link className="link" href="/privacy">
          {t('footer.privacy')}
        </Link>
      </span>
      {action ? (
        <Link className="link ml-auto" href={action.href}>
          {action.label}
        </Link>
      ) : null}
    </footer>
  )
}
