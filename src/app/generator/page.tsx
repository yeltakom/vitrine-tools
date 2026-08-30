import type { Metadata } from 'next'
import { t } from '@/i18n'
import BudgetLedger from '../budget-ledger'
import PageShell from '../page-shell'

export const metadata: Metadata = {
  title: `${t('generator.pageTitle')} — ${t('app.wordmark')}`,
  description: t('generator.pageDescription'),
}

/** The tool on its own: no argument for it, because you are already using it. */
export default function GeneratorPage() {
  return (
    <PageShell
      heading={t('generator.pageTitle')}
      documentLabel={t('generator.documentLabel')}
      footerAction={{ href: '/', label: t('app.wordmark') }}
    >
      <BudgetLedger masthead={false} />
    </PageShell>
  )
}
