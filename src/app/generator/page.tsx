import type { Metadata } from 'next'
import { t } from '@/i18n'
import GeneratorApp from './generator-app'
import PageShell from '../page-shell'

export const metadata: Metadata = {
  title: `${t('generator.pageTitle')} — ${t('app.wordmark')}`,
  description: t('generator.pageDescription'),
}

export default function GeneratorPage() {
  return (
    <PageShell
      heading={t('generator.pageTitle')}
      documentLabel={t('generator.documentLabel')}
      footerAction={{ href: '/', label: t('app.wordmark') }}
    >
      <GeneratorApp />
    </PageShell>
  )
}
