import { exhibitionBudgetTemplate } from '@/data/templates/exhibition-budget'
import { t } from '@/i18n'
import { BUTTON, GUTTER, HINT, LABEL } from './ledger-style'

/** A section head is a category head: a name and the hairline that carries it. */
function SectionRule({ label }: { label: string }) {
  return (
    <div className={GUTTER}>
      <div className="grid h-10 grid-cols-[auto_1fr] items-center gap-x-[1ch] sm:gap-x-[2ch]">
        <h2 className={LABEL}>{label}</h2>
        <span className="h-px bg-ink" aria-hidden="true" />
      </div>
    </div>
  )
}

/** A claim and the number that settles it — the same shape as a budget line. */
function GetRow({ body, figure }: { body: string; figure: string }) {
  return (
    <div className={GUTTER}>
      <div className="flex items-baseline justify-between gap-[2ch] border-t border-ink py-[14px]">
        <p className="min-w-0">{body}</p>
        <span className="figure shrink-0">{figure}</span>
      </div>
    </div>
  )
}

function Question({ question, answer }: { question: string; answer: string }) {
  return (
    <div className={GUTTER}>
      <div className="border-t border-ink py-[14px]">
        <h3 className="font-bold">{question}</h3>
        <p className="mt-[4px]">{answer}</p>
      </div>
    </div>
  )
}

/**
 * Everything the landing page says after you have already used the product.
 * It sits below a working ledger, so none of it has to argue that the tool
 * exists — it only answers what happens next and what it costs.
 */
export default function LandingSections() {
  return (
    <>
      <section className="pt-[40px]">
        <SectionRule label={t('landing.whatYouGet')} />
        <GetRow body={t('landing.get1')} figure={String(exhibitionBudgetTemplate.length)} />
        <GetRow body={t('landing.get2')} figure={t('landing.get2Figure')} />
        <GetRow body={t('landing.get3')} figure={t('landing.get3Figure')} />
      </section>

      {/* The price is one more line in the same ledger, set in the same red as a
          total — not a card with a checkmark list beside it. */}
      <section className="pt-[24px]">
        <SectionRule label={t('landing.price')} />
        <div className={GUTTER}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[8px] border-t border-ink py-[20px]">
            <p className={`min-w-0 ${HINT}`}>{t('landing.priceNote')}</p>
            <span className="figure figure-total ml-auto text-[28px] text-mark">
              {t('landing.priceFigure')}
            </span>
          </div>
          <button type="button" className={`ghost ${BUTTON} cursor-not-allowed`} disabled>
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
    </>
  )
}
