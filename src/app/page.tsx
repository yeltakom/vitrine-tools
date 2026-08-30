import { exhibitionBudgetTemplate } from '@/data/templates/exhibition-budget'
import { t } from '@/i18n'
import BudgetLedger from './budget-ledger'
import { HeroLine, LedgerRow, Prose, Question, SectionRule, Step } from './landing-parts'
import { BUTTON, GUTTER, HINT, LABEL } from './ledger-style'
import PageShell from './page-shell'

/**
 * The site, not the tool. It has to say what the file is, why the one people
 * inherit is broken, and what replaces it — and then let a visitor prove it by
 * editing a real budget halfway down the page rather than reading a claim
 * about one.
 *
 * The brief asks the page to open on a working table rather than a headline;
 * that was overruled by the owner, who needs the business explained. What is
 * kept from the brief is the grammar: every section head, status and price is
 * a name, a hairline and the figure that settles it.
 */
export default function Home() {
  return (
    <PageShell
      documentLabel={t('landing.documentLabel')}
      wordmarkAsLink={false}
      footerAction={{ href: '/generator', label: t('action.openGenerator') }}
    >
      <section className={`${GUTTER} pb-[28px] pt-[36px]`}>
        <h1 className="display">{t('hero.headline')}</h1>
        <p className="lede mt-[20px]">{t('hero.lede')}</p>
        <div className="mt-[24px] flex flex-wrap items-center gap-x-[3ch] gap-y-[12px]">
          <a className={`ghost ${BUTTON} hover:bg-ink hover:text-paper`} href="#try">
            {t('action.buildBudget')}
          </a>
          <a className={`link ${HINT}`} href="#pricing">
            {t('action.seePricing')}
          </a>
        </div>
      </section>

      {/* The hero's evidence is a two-line budget of the reader's next ten
          minutes, priced in the same red the tool prices a total in. */}
      <div className={`${GUTTER} pb-[8px]`}>
        <HeroLine label={t('hero.timeLabel')} figure={t('hero.timeFigure')} />
        <HeroLine label={t('hero.costLabel')} figure={t('hero.costFigure')} mark />
      </div>

      <section className="pt-[32px]">
        <SectionRule label={t('section.why')} />
        <Prose>
          <p>{t('why.body1')}</p>
          <p className="mt-[12px]">{t('why.body2')}</p>
        </Prose>
      </section>

      <section className="pt-[32px]">
        <SectionRule label={t('section.how')} />
        <ol>
          <Step label={t('how.startLabel')} body={t('how.startBody')} />
          <Step label={t('how.changeLabel')} body={t('how.changeBody')} />
          <Step label={t('how.downloadLabel')} body={t('how.downloadBody')} />
        </ol>
      </section>

      {/* The proof. Not a screenshot of the generator — the generator. */}
      <section className="pt-[32px]">
        <SectionRule label={t('section.try')} id="try" />
        <div className={`${GUTTER} border-t border-ink pt-[14px]`}>
          <p className={HINT}>{t('try.note')}</p>
        </div>
        <BudgetLedger
          masthead={false}
          initialTitle={t('landing.sampleTitle')}
          initialVenue={t('landing.sampleVenue')}
        />
      </section>

      <section className="pt-[32px]">
        <SectionRule label={t('landing.whatYouGet')} />
        <LedgerRow body={t('landing.get1')} figure={String(exhibitionBudgetTemplate.length)} strong />
        <LedgerRow body={t('landing.get2')} figure={t('landing.get2Figure')} strong />
        <LedgerRow body={t('landing.get3')} figure={t('landing.get3Figure')} strong />
      </section>

      <section className="pt-[32px]">
        <SectionRule label={t('section.documents')} />
        <div className={`${GUTTER} border-t border-ink pt-[14px]`}>
          <p className={HINT}>{t('documents.note')}</p>
        </div>
        <LedgerRow body={t('documents.budget')} figure={t('status.ready')} strong />
        <LedgerRow body={t('documents.production')} figure={t('status.next')} />
        <LedgerRow body={t('documents.press')} figure={t('status.next')} />
        <LedgerRow body={t('documents.programme')} figure={t('status.next')} />
        <LedgerRow body={t('documents.timeline')} figure={t('status.later')} />
      </section>

      <section className="pt-[32px]">
        <SectionRule label={t('section.who')} />
        <ul>
          {[t('who.1'), t('who.2'), t('who.3')].map((line) => (
            <li key={line} className={GUTTER}>
              <p className="border-t border-ink py-[14px]">{line}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Two rows in the same ledger: what you pay today, what the license costs.
          No cards, no checkmark columns — the figures do the comparing. */}
      <section className="pt-[32px]">
        <SectionRule label={t('section.pricing')} id="pricing" />
        <div className={GUTTER}>
          <div className="border-t border-ink py-[16px] sm:grid sm:grid-cols-[14ch_1fr_14ch] sm:gap-x-[2ch]">
            <h3 className={`${LABEL} pt-[4px]`}>{t('pricing.freeLabel')}</h3>
            <p className="mt-[6px] min-w-0 sm:mt-0">{t('pricing.freeBody')}</p>
            <span className="figure mt-[6px] block sm:mt-0">{t('pricing.freeFigure')}</span>
          </div>
          <div className="border-t border-ink py-[16px] sm:grid sm:grid-cols-[14ch_1fr_14ch] sm:gap-x-[2ch]">
            <h3 className={`${LABEL} pt-[4px]`}>{t('pricing.licenceLabel')}</h3>
            <p className="mt-[6px] min-w-0 sm:mt-0">{t('pricing.licenceBody')}</p>
            <span className="figure figure-total mt-[6px] block text-[28px] leading-[1.1] text-mark sm:mt-0">
              {t('landing.priceFigure')}
            </span>
          </div>
          <p className={`mt-[14px] ${HINT}`}>{t('landing.priceNote')}</p>
          <button type="button" className={`ghost mt-[16px] ${BUTTON} cursor-not-allowed`} disabled>
            {t('action.buyLicense')}
          </button>
        </div>
      </section>

      <section className="pt-[32px]">
        <SectionRule label={t('landing.questions')} />
        <Question question={t('faq.q1')} answer={t('faq.a1')} />
        <Question question={t('faq.q2')} answer={t('faq.a2')} />
        <Question question={t('faq.q3')} answer={t('faq.a3')} />
        <Question question={t('faq.q4')} answer={t('faq.a4')} />
        <Question question={t('faq.q5')} answer={t('faq.a5')} />
      </section>
    </PageShell>
  )
}
