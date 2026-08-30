import { sampleBrief } from '@/data/templates/sample-brief'
import { t } from '@/i18n'
import { generateBudget } from '@/lib/generate-budget'
import BudgetLedger from './budget-ledger'
import { LedgerRow, Question, Room, RoomLabel, Step, WallLabel } from './landing-parts'
import { BUTTON, DOC, HINT, LABEL_LIGHT, WORDMARK } from './ledger-style'
import PricingWall from './pricing-wall'
import SiteFooter from './site-footer'

/**
 * The site, installed.
 *
 * The brief asks the page to open on a working budget rather than a headline;
 * the owner overruled that, because a visitor met a spreadsheet and had to
 * infer a company from it. What replaces it is not a generic SaaS hero: the
 * page is hung like a show. A title wall in ink, a wall label beside it giving
 * the work's medium and dimensions, then rooms that alternate paper and ink.
 * The generator is the object on display, framed and live, halfway through.
 *
 * The accent is spent exactly twice: the total the generator calculates, and
 * the one pricing tier the wall is hung around.
 */
export default function Home() {
  // The homepage prices a real brief with the real engine — nothing on it is
  // typed by hand, which is the whole claim the page is making.
  const sampleRows = generateBudget(sampleBrief)

  return (
    <main>
      {/* Title wall. */}
      <Room tone="ink">
        <header className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[4px] border-b border-current py-[16px]">
          <span className={WORDMARK}>{t('app.wordmark')}</span>
          <span className={LABEL_LIGHT}>{t('landing.documentLabel')}</span>
        </header>

        <h1 className="hero-type mt-[44px] sm:mt-[72px]">{t('hero.headline')}</h1>

        <div className="mt-[40px] grid gap-[28px] pb-[56px] md:grid-cols-[minmax(0,32ch)_minmax(0,1fr)] md:gap-[48px] md:pb-[80px]">
          <WallLabel />
          <div>
            <p className="lede">{t('hero.lede')}</p>
            <div className="mt-[28px] flex flex-wrap items-center gap-x-[3ch] gap-y-[14px]">
              <a className={`ghost ${BUTTON} hover:bg-paper hover:text-ink`} href="/generator">
                {t('action.describeShow')}
              </a>
              <a className="link" href="#pricing">
                {t('action.seePricing')}
              </a>
            </div>
          </div>
        </div>
      </Room>

      {/* Wall text at the entrance: what the file is and why it fails. */}
      <Room className="pt-[48px] sm:pt-[72px]">
        <RoomLabel label={t('section.why')} />
        <div className="grid gap-[20px] py-[28px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[48px]">
          <p className="wall-text">{t('why.body1')}</p>
          <div>
            <p>{t('why.body2')}</p>
            <p className="mt-[14px] font-bold">{t('why.body3')}</p>
          </div>
        </div>
      </Room>

      <Room className="pt-[32px]">
        <RoomLabel label={t('section.how')} />
        <ol className="grid gap-[24px] py-[28px] md:grid-cols-3 md:gap-[32px]">
          <Step label={t('how.startLabel')} body={t('how.startBody')} />
          <Step label={t('how.changeLabel')} body={t('how.changeBody')} />
          <Step label={t('how.downloadLabel')} body={t('how.downloadBody')} />
        </ol>
      </Room>

      {/* The object on display. Framed, labelled, and live. */}
      <Room id="try" className="pt-[32px] pb-[56px] sm:pb-[80px]">
        <RoomLabel label={t('section.try')} status={t('try.status')} />
        <p className="max-w-[68ch] py-[18px]">{t('try.note')}</p>
        <div className="border border-ink">
          <div className={DOC}>
            <BudgetLedger
              masthead={false}
              initialTitle={sampleBrief.title}
              initialVenue={`${sampleBrief.venue}, ${sampleBrief.city}`}
              initialRows={sampleRows}
            />
          </div>
        </div>
      </Room>

      {/* The catalogue: what exists, what is being built, who it is for. */}
      <Room tone="ink" className="py-[48px] sm:py-[72px]">
        <RoomLabel label={t('section.documents')} />
        <p className="py-[16px]">{t('documents.note')}</p>
        <LedgerRow body={t('documents.budget')} figure={t('status.ready')} strong />
        <LedgerRow body={t('documents.production')} figure={t('status.next')} />
        <LedgerRow body={t('documents.press')} figure={t('status.next')} />
        <LedgerRow body={t('documents.programme')} figure={t('status.next')} />
        <LedgerRow body={t('documents.timeline')} figure={t('status.later')} />

        <div className="mt-[48px]">
          <RoomLabel label={t('section.who')} />
          <ul className="pt-[4px]">
            {[t('who.1'), t('who.2'), t('who.3')].map((line) => (
              <li key={line} className="border-b border-current py-[16px]">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[48px]">
          <RoomLabel label={t('landing.whatYouGet')} />
          <LedgerRow body={t('landing.get1')} figure={String(sampleRows.length)} strong />
          <LedgerRow body={t('landing.get2')} figure={t('landing.get2Figure')} strong />
          <LedgerRow body={t('landing.get3')} figure={t('landing.get3Figure')} strong />
        </div>
      </Room>

      {/* Four works on one wall. */}
      <Room tone="ink" id="pricing" className="pb-[56px] sm:pb-[80px]">
        <RoomLabel label={t('section.pricing')} />
        <div className="pt-[24px]">
          <PricingWall />
        </div>
        <p className={`max-w-[76ch] pt-[20px] ${HINT}`}>{t('pricing.note')}</p>
      </Room>

      <Room className="py-[48px] sm:py-[72px]">
        <RoomLabel label={t('landing.questions')} />
        <div className="pt-[4px]">
          <Question question={t('faq.q1')} answer={t('faq.a1')} />
          <Question question={t('faq.q2')} answer={t('faq.a2')} />
          <Question question={t('faq.q3')} answer={t('faq.a3')} />
          <Question question={t('faq.q4')} answer={t('faq.a4')} />
          <Question question={t('faq.q5')} answer={t('faq.a5')} />
        </div>
      </Room>

      <Room tone="ink">
        <SiteFooter action={{ href: '/generator', label: t('action.openGenerator') }} />
      </Room>
    </main>
  )
}
