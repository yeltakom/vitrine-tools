import type { Metadata } from 'next'
import { t } from '@/i18n'
import LegalShell from '../legal-shell'

export const metadata: Metadata = {
  title: `${t('impressum.pageTitle')} — ${t('app.wordmark')}`,
  description: t('impressum.intro'),
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  return (
    <LegalShell
      title={t('impressum.pageTitle')}
      intro={t('impressum.intro')}
      entries={[
        { label: t('impressum.providerLabel'), body: t('impressum.provider') },
        { label: t('impressum.contactLabel'), body: t('impressum.contact') },
        { label: t('impressum.responsibleLabel'), body: t('impressum.responsible') },
        { label: t('impressum.vatLabel'), body: t('impressum.vat') },
        { label: t('impressum.disputeLabel'), body: t('impressum.dispute') },
      ]}
    />
  )
}
