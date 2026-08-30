import { t, type TranslationKey } from '@/i18n'
import { BUTTON, LABEL, LABEL_LIGHT } from './ledger-style'

interface Tier {
  name: TranslationKey
  figure: TranslationKey
  summary: TranslationKey
  includes: TranslationKey[]
  /** The one tier the wall is hung around. Filled in the accent, once. */
  anchor?: boolean
  action: { label: TranslationKey; href?: string }
}

const TIERS: Tier[] = [
  {
    name: 'tier.free',
    figure: 'tier.freeFigure',
    summary: 'tier.freeSummary',
    includes: ['tier.free1', 'tier.free2', 'tier.free3'],
    action: { label: 'action.startFree', href: '#try' },
  },
  {
    name: 'tier.single',
    figure: 'tier.singleFigure',
    summary: 'tier.singleSummary',
    includes: ['tier.single1', 'tier.single2', 'tier.single3'],
    action: { label: 'action.buyLicense' },
  },
  {
    name: 'tier.full',
    figure: 'tier.fullFigure',
    summary: 'tier.fullSummary',
    includes: ['tier.full1', 'tier.full2', 'tier.full3'],
    anchor: true,
    action: { label: 'action.buyLicense' },
  },
  {
    name: 'tier.team',
    figure: 'tier.teamFigure',
    summary: 'tier.teamSummary',
    includes: ['tier.team1', 'tier.team2', 'tier.team3'],
    action: { label: 'action.buyLicense' },
  },
]

/**
 * Four works on one wall, and the accent spent in a single place: Full is the
 * only panel filled in red, because it is the only tier that carries PDF and
 * every document type still to come. The others sit on the black ground,
 * divided by the same hairline the budget uses between a category and its
 * subtotal — no cards, no checkmark columns, no shadow to fake a hierarchy the
 * colour already states.
 */
export default function PricingWall() {
  return (
    <div className="border-t border-current sm:grid sm:grid-cols-2 lg:grid-cols-4">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`flex flex-col border-b border-current px-[20px] py-[24px] sm:border-r sm:last:border-r-0 lg:border-b-0 ${
            tier.anchor ? 'bg-mark text-paper' : ''
          }`}
        >
          <div className="flex items-baseline justify-between gap-[1ch]">
            <h3 className={LABEL}>{t(tier.name)}</h3>
            {tier.anchor ? <span className={LABEL_LIGHT}>{t('tier.fullAnchor')}</span> : null}
          </div>

          <p className="mt-[16px] flex items-baseline gap-[1ch]">
            <span className="figure-price">{t(tier.figure)}</span>
            <span className={LABEL_LIGHT}>{t('pricing.currency')}</span>
          </p>

          <p className="mt-[12px] font-bold">{t(tier.summary)}</p>

          <ul className="mt-[16px] flex-1">
            {tier.includes.map((line) => (
              <li key={line} className="border-t border-current py-[8px] text-[12px] leading-[1.55]">
                {t(line)}
              </li>
            ))}
          </ul>

          {tier.action.href ? (
            <a
              className={`ghost mt-[20px] block text-center ${BUTTON} hover:bg-paper hover:text-ink`}
              href={tier.action.href}
            >
              {t(tier.action.label)}
            </a>
          ) : (
            <button
              type="button"
              className={`ghost mt-[20px] w-full ${BUTTON} cursor-not-allowed`}
              disabled
            >
              {t(tier.action.label)}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
