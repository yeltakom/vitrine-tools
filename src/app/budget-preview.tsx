import { budgetCategoryLabelKeys } from '@/data/templates/exhibition-budget'
import { t } from '@/i18n'
import {
  createRowsFromTemplate,
  formatAmount,
  formatQuantity,
  orderedCategories,
  rowAmount,
  rowsInCategory,
  summaryLabel,
  sumRows,
} from '@/lib/budget'
import { CATEGORY_GRID, FIGURES, GUTTER, HINT, LABEL, ROW } from './ledger-style'

/**
 * The landing page's hero: a finished exhibition budget, printed rather than edited.
 *
 * Deliberately a server component and deliberately not `BudgetLedger` with a
 * `readOnly` flag. The two are different objects — one is a form, one is a
 * document — and this one ships no JavaScript, which is the whole point of
 * opening the site on it. The column grammar is shared through `ledger-style`
 * so the figures cannot drift out of alignment with the real thing.
 */
export default function BudgetPreview() {
  const rows = createRowsFromTemplate()
  const total = sumRows(rows)

  return (
    <>
      <section className={`${GUTTER} py-[20px]`}>
        <h2 className="cell-title">{t('landing.sampleTitle')}</h2>
        <div className="mt-[8px] flex items-baseline justify-between gap-[2ch]">
          <p className={HINT}>{t('landing.sampleVenue')}</p>
          <p className={`${HINT} shrink-0`}>{t('field.currencyNote')}</p>
        </div>
      </section>

      {orderedCategories().map((categoryId) => {
        const categoryRows = rowsInCategory(rows, categoryId)
        return (
          <section key={categoryId} className="pt-[16px]">
            <div className={GUTTER}>
              <div className={CATEGORY_GRID}>
                <h3 className={LABEL}>{t(budgetCategoryLabelKeys[categoryId])}</h3>
                <span className="h-px bg-ink" aria-hidden="true" />
                <span className="figure">{formatAmount(sumRows(categoryRows))}</span>
              </div>
            </div>

            {categoryRows.map((row) => (
              <div key={row.id} className={GUTTER}>
                <div className={ROW}>
                  <span className="flex min-w-0 items-baseline gap-[1ch]">
                    <span className="min-w-0 flex-1 truncate font-medium">{row.description}</span>
                    <span className={`shrink-0 ${HINT}`}>{row.unit}</span>
                  </span>
                  <span className={FIGURES}>
                    <span className="relative w-[5ch] shrink-0 sm:w-auto">
                      <span className="figure cell-qty block">{formatQuantity(row.quantity)}</span>
                      <span
                        className={`pointer-events-none absolute right-0 top-0 ${HINT}`}
                        aria-hidden="true"
                      >
                        {t('ledger.times')}
                      </span>
                    </span>
                    <span className="figure w-[10ch] shrink-0 sm:w-auto">
                      {formatAmount(row.unitPrice)}
                    </span>
                    <span className="figure flex-1 sm:flex-none">{formatAmount(rowAmount(row))}</span>
                  </span>
                </div>
              </div>
            ))}
          </section>
        )
      })}

      <div className={`${GUTTER} pt-[16px]`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[8px] border-t border-ink py-[20px]">
          <span className={HINT}>{summaryLabel(rows.length)}</span>
          <span className="ml-auto flex items-baseline gap-[2ch]">
            <span className={LABEL}>{t('ledger.total')}</span>
            <span className="figure figure-total text-[28px] text-mark">{formatAmount(total)}</span>
          </span>
        </div>
      </div>
    </>
  )
}
