import { t } from '@/i18n'
import BudgetLedger from './budget-ledger'
import LandingSections from './landing-sections'

/**
 * The homepage is the product with the explanation appended, not a page about
 * the product. The budget below is live: a visitor types over the seeded show
 * and downloads their own spreadsheet without going anywhere else.
 *
 * The structural heading is read out rather than set, because the brief calls
 * for the page to open on a working budget rather than on a headline.
 */
export default function Home() {
  return (
    <BudgetLedger
      heading={t('landing.pageTitle')}
      initialTitle={t('landing.sampleTitle')}
      initialVenue={t('landing.sampleVenue')}
      footerAction={{ href: '/generator', label: t('action.openGenerator') }}
    >
      <LandingSections />
    </BudgetLedger>
  )
}
