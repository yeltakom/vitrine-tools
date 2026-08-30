import type { Metadata } from 'next'
import { t } from '@/i18n'
import BudgetLedger from '../budget-ledger'

export const metadata: Metadata = {
  title: `${t('generator.pageTitle')} — ${t('app.wordmark')}`,
  description: t('generator.pageDescription'),
}

export default function GeneratorPage() {
  return <BudgetLedger />
}
