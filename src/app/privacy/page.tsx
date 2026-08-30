import type { Metadata } from 'next'
import { t } from '@/i18n'
import LegalShell from '../legal-shell'

export const metadata: Metadata = {
  title: `${t('privacy.pageTitle')} — ${t('app.wordmark')}`,
  description: t('privacy.intro'),
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalShell
      title={t('privacy.pageTitle')}
      intro={t('privacy.intro')}
      entries={[
        { label: t('privacy.controllerLabel'), body: t('privacy.controller') },
        { label: t('privacy.dataLabel'), body: t('privacy.data') },
        { label: t('privacy.cookiesLabel'), body: t('privacy.cookies') },
        { label: t('privacy.fontsLabel'), body: t('privacy.fonts') },
        { label: t('privacy.hostingLabel'), body: t('privacy.hosting') },
        { label: t('privacy.paymentsLabel'), body: t('privacy.payments') },
        { label: t('privacy.rightsLabel'), body: t('privacy.rights') },
        { label: t('privacy.updatedLabel'), body: t('privacy.updated') },
      ]}
    />
  )
}
