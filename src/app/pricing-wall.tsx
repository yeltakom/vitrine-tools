import { t, type TranslationKey } from '@/i18n'

interface Tier {
  name: TranslationKey
  figure: TranslationKey
  summary: TranslationKey
  includes: TranslationKey[]
  /** The tier the table is built around. Marked, not shouted. */
  anchor?: boolean
  action: { label: TranslationKey; href?: string }
}

const TIERS: Tier[] = [
  {
    name: 'tier.free',
    figure: 'tier.freeFigure',
    summary: 'tier.freeSummary',
    includes: ['tier.free1', 'tier.free2', 'tier.free3'],
    action: { label: 'action.startFree', href: '/generator' },
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
 * Four columns on one grid. The anchor is marked by a single red rule above it
 * and nothing else — a filled colour block would be the loudest thing on a page
 * whose whole argument is restraint, and the tier does not need shouting to be
 * the obvious one once you have read what it carries.
 */
export default function PricingWall() {
  return (
    <div className="grid gap-x-[32px] gap-y-[40px] pt-[36px] sm:grid-cols-2 lg:grid-cols-4">
      {TIERS.map((tier) => (
        <div key={tier.name} className="flex flex-col">
          <span
            className={`block h-px ${tier.anchor ? 'bg-mark' : 'bg-rule'}`}
            aria-hidden="true"
          />
          <div className="flex items-baseline justify-between gap-[8px] pt-[12px]">
            <h3 className="label">{t(tier.name)}</h3>
            {tier.anchor ? <span className="label text-mark">{t('tier.fullAnchor')}</span> : null}
          </div>

          <p className="mt-[18px] flex items-baseline gap-[6px]">
            <span className="figure-price">{t(tier.figure)}</span>
            <span className="label muted">{t('pricing.currency')}</span>
          </p>

          <p className="mt-[14px]">{t(tier.summary)}</p>

          <ul className="mt-[14px] flex-1 note">
            {tier.includes.map((line) => (
              <li key={line} className="mt-[6px]">
                {t(line)}
              </li>
            ))}
          </ul>

          {tier.action.href ? (
            <a className="ghost btn-quiet mt-[24px] text-center" href={tier.action.href}>
              {t(tier.action.label)}
            </a>
          ) : (
            <button type="button" className="ghost btn mt-[24px] w-full" disabled>
              {t(tier.action.label)}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
