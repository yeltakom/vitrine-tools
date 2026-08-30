import { budgetCategoryLabelKeys } from '@/data/templates/exhibition-budget'
import { sampleBrief } from '@/data/templates/sample-brief'
import { t } from '@/i18n'
import { formatAmount, orderedCategories, rowsInCategory, sumRows } from '@/lib/budget'
import { generateBudget } from '@/lib/generate-budget'
import BudgetLedger from './budget-ledger'
import { Question, Section, Step } from './landing-parts'
import { DOC } from './ledger-style'
import PageShell from './page-shell'
import PricingWall from './pricing-wall'

/**
 * The site, set as printed matter.
 *
 * The hero is a catalogue spread: the brief in plain sentences on the verso, the
 * budget it produced on the recto. That is the whole product in one glance and
 * it needs no marketing sentence to explain it — the two halves are literally
 * the input and the output of the engine, computed on this page.
 *
 * Everything after it is carried by space rather than by rules. The accent is
 * spent twice on the entire page: the grand total in the spread, and the hairline
 * over the anchor pricing tier.
 */
export default function Home() {
  const rows = generateBudget(sampleBrief)
  const total = sumRows(rows)

  return (
    <PageShell
      documentLabel={t('landing.documentLabel')}
      wordmarkAsLink={false}
      footerAction={{ href: '/generator', label: t('action.openGenerator') }}
    >
      <section className="pt-[72px] sm:pt-[112px]">
        <div className="grid gap-[36px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[72px]">
          <div>
            <h1 className="display max-w-[16ch]">{t('hero.headline')}</h1>
            <p className="lede mt-[24px] max-w-[46ch]">{t('hero.lede')}</p>
            <div className="mt-[36px] flex flex-wrap items-center gap-[16px]">
              <a className="ghost btn" href="/generator">
                {t('action.describeShow')}
              </a>
              <a className="ghost link note" href="#try">
                {t('action.seeExample')}
              </a>
            </div>
          </div>

          {/* The spread: what was said on the left, what it cost on the right. */}
          <div className="lg:pt-[8px]">
            <h2 className="label muted border-b border-rule pb-[10px]">{t('spread.briefLabel')}</h2>
            <p className="display-sm mt-[16px]">{t('spread.brief')}</p>

            <h2 className="label muted mt-[40px] border-b border-rule pb-[10px]">
              {t('spread.budgetLabel')}
            </h2>
            <dl className="mt-[4px]">
              {orderedCategories().map((categoryId) => (
                <div
                  key={categoryId}
                  className="flex items-baseline justify-between gap-[16px] border-b border-rule py-[9px]"
                >
                  <dt className="note">{t(budgetCategoryLabelKeys[categoryId])}</dt>
                  <dd className="figure">{formatAmount(sumRows(rowsInCategory(rows, categoryId)))}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-[20px] flex items-end justify-between gap-[16px]">
              <span className="label muted">{t('ledger.total')}</span>
              <span className="figure-total text-mark">{formatAmount(total)}</span>
            </div>
          </div>
        </div>
      </section>

      <Section label={t('section.why')}>
        <div className="grid gap-[28px] pt-[28px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[72px]">
          <p className="display-sm">{t('why.body1')}</p>
          <div className="muted">
            <p>{t('why.body2')}</p>
            <p className="mt-[16px] text-ink">{t('why.body3')}</p>
          </div>
        </div>
      </Section>

      <Section label={t('section.how')}>
        <ol className="grid gap-[36px] pt-[32px] md:grid-cols-3 md:gap-[40px]">
          <Step label={t('how.startLabel')} body={t('how.startBody')} />
          <Step label={t('how.changeLabel')} body={t('how.changeBody')} />
          <Step label={t('how.downloadLabel')} body={t('how.downloadBody')} />
        </ol>
      </Section>

      <Section label={t('section.try')} id="try">
        <p className="mt-[20px] max-w-[62ch] muted">{t('try.note')}</p>
        <div className={`${DOC} mt-[40px]`}>
          <BudgetLedger
            initialTitle={sampleBrief.title}
            initialVenue={`${sampleBrief.venue}, ${sampleBrief.city}`}
            initialRows={rows}
          />
        </div>
      </Section>

      <Section label={t('section.documents')}>
        <p className="mt-[20px] max-w-[62ch] muted">{t('documents.note')}</p>
        <dl className="mt-[24px] max-w-[62ch]">
          {(
            [
              ['documents.budget', 'status.ready'],
              ['documents.production', 'status.next'],
              ['documents.press', 'status.next'],
              ['documents.programme', 'status.next'],
              ['documents.timeline', 'status.later'],
            ] as const
          ).map(([doc, status]) => (
            <div
              key={doc}
              className="flex items-baseline justify-between gap-[16px] border-b border-rule py-[12px]"
            >
              <dt>{t(doc)}</dt>
              <dd className="label muted">{t(status)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label={t('section.pricing')} id="pricing">
        <PricingWall />
        <p className="mt-[32px] max-w-[62ch] note">{t('pricing.note')}</p>
      </Section>

      <Section label={t('landing.questions')}>
        <div className="pt-[12px]">
          <Question question={t('faq.q1')} answer={t('faq.a1')} />
          <Question question={t('faq.q2')} answer={t('faq.a2')} />
          <Question question={t('faq.q3')} answer={t('faq.a3')} />
          <Question question={t('faq.q4')} answer={t('faq.a4')} />
          <Question question={t('faq.q5')} answer={t('faq.a5')} />
        </div>
      </Section>
    </PageShell>
  )
}
