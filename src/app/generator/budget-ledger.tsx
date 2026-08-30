'use client'

import { useState } from 'react'
import {
  budgetCategoryLabelKeys,
  type BudgetCategoryId,
} from '@/data/templates/exhibition-budget'
import { t } from '@/i18n'
import {
  createEmptyRow,
  createRowsFromTemplate,
  formatAmount,
  formatQuantity,
  isDeviating,
  orderedCategories,
  parseNumber,
  rowAmount,
  rowsInCategory,
  sumRows,
  type BudgetRow,
} from '@/lib/budget'
import { downloadBudgetXlsx } from '@/lib/export-xlsx'

/* De-emphasis is scale and weight, not a lighter ink. Three rungs sit at 11px —
   bold uppercase for structure, regular uppercase for the document label,
   regular sentence case for hints — under 13/14px 500 body and 14px 700 figures. */
const LABEL = 'text-[11px] font-bold uppercase tracking-[0.16em]'
const LABEL_LIGHT = 'text-[11px] font-normal uppercase tracking-[0.16em]'
const HINT = 'text-[11px] font-normal'
const GUTTER = 'px-[2ch] sm:px-[3ch]'

/** Narrow screens stack the line over its figures; the character grid takes over at sm. */
const ROW =
  'flex flex-col gap-[2px] py-[8px] sm:grid sm:h-10 sm:grid-cols-[1fr_6ch_12ch_14ch] sm:items-center sm:gap-x-[2ch] sm:gap-y-0 sm:py-0'
const FIGURES = 'flex items-baseline gap-[1ch] sm:contents'
const CATEGORY_GRID =
  'grid h-10 items-center grid-cols-[auto_1fr_10ch] gap-x-[1ch] sm:grid-cols-[auto_1fr_14ch] sm:gap-x-[2ch]'

function FigureCell({
  value,
  onChange,
  display,
  ariaLabel,
  className = '',
}: {
  value: number
  onChange: (next: number) => void
  display: (value: number) => string
  ariaLabel: string
  className?: string
}) {
  const [draft, setDraft] = useState<string | null>(null)

  return (
    <input
      className={`cell figure ${className}`}
      inputMode="decimal"
      autoComplete="off"
      aria-label={ariaLabel}
      value={draft ?? display(value)}
      onFocus={() => setDraft(formatQuantity(value))}
      onChange={(event) => {
        setDraft(event.target.value)
        onChange(parseNumber(event.target.value) ?? 0)
      }}
      onBlur={() => setDraft(null)}
    />
  )
}

export default function BudgetLedger() {
  const [title, setTitle] = useState('')
  const [venue, setVenue] = useState('')
  const [rows, setRows] = useState<BudgetRow[]>(() => createRowsFromTemplate())
  const [exporting, setExporting] = useState(false)

  const total = sumRows(rows)

  function updateRow(id: string, patch: Partial<BudgetRow>) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }

  function removeRow(id: string) {
    setRows((current) => current.filter((row) => row.id !== id))
  }

  function addRow(categoryId: BudgetCategoryId) {
    setRows((current) => {
      const next = [...current]
      const lastIndex = next.map((row) => row.categoryId).lastIndexOf(categoryId)
      next.splice(lastIndex + 1, 0, createEmptyRow(categoryId))
      return next
    })
  }

  async function handleDownload() {
    setExporting(true)
    try {
      await downloadBudgetXlsx({ title, venue, rows })
    } finally {
      setExporting(false)
    }
  }

  return (
    <main className="min-h-screen bg-paper text-ink text-[13px] leading-[1.6] sm:text-[14px]">
      <div className="mx-auto max-w-[78ch]">
        <header className={GUTTER}>
          <div className="flex flex-wrap items-center justify-between gap-x-[2ch] gap-y-[4px] border-b border-ink py-[16px]">
            <span className="order-1 text-[14px] font-extrabold uppercase tracking-[0.18em]">
              {t('app.wordmark')}
            </span>
            <span className={`order-3 basis-full sm:order-2 sm:basis-auto ${LABEL_LIGHT}`}>
              {t('generator.documentLabel')}
            </span>
            <button
              type="button"
              className={`ghost order-2 border border-ink px-[1.5ch] py-[6px] sm:order-3 ${LABEL} enabled:hover:bg-ink enabled:hover:text-paper disabled:cursor-not-allowed disabled:border-transparent disabled:font-normal`}
              onClick={() => {
                void handleDownload()
              }}
              disabled={exporting}
              aria-busy={exporting}
            >
              {t('action.downloadXlsx')}
            </button>
          </div>
        </header>

        <section className={`${GUTTER} py-[20px]`}>
          <input
            className="cell cell-title"
            value={title}
            autoComplete="off"
            aria-label={t('a11y.exhibitionTitle')}
            placeholder={t('field.titlePlaceholder')}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div className="mt-[12px] flex items-baseline justify-between gap-[2ch]">
            <label className="flex min-w-0 flex-1 items-baseline gap-[1ch]">
              <span className={`${HINT} shrink-0`}>{t('field.venueLabel')}</span>
              <input
                className="cell"
                value={venue}
                autoComplete="off"
                aria-label={t('a11y.venue')}
                placeholder={t('field.venuePlaceholder')}
                onChange={(event) => setVenue(event.target.value)}
              />
            </label>
            <span className={`${HINT} shrink-0`}>{t('field.currencyNote')}</span>
          </div>
        </section>

        {orderedCategories().map((categoryId) => {
          const categoryRows = rowsInCategory(rows, categoryId)
          return (
            <section key={categoryId} className="pt-[16px]">
              <div className={GUTTER}>
                <div className={CATEGORY_GRID}>
                  <h2 className={LABEL}>{t(budgetCategoryLabelKeys[categoryId])}</h2>
                  <span className="h-px bg-ink" aria-hidden="true" />
                  <span className="figure">{formatAmount(sumRows(categoryRows))}</span>
                </div>
              </div>

              {categoryRows.length === 0 ? (
                <div className={GUTTER}>
                  <p className={`flex h-10 items-center ${HINT}`}>{t('ledger.empty')}</p>
                </div>
              ) : (
                categoryRows.map((row) => {
                  const name = row.description || t('field.descriptionPlaceholder')
                  return (
                    <div key={row.id} className={`group relative ${GUTTER}`}>
                      <div className={ROW}>
                        <span className="flex min-w-0 items-baseline gap-[1ch]">
                          <input
                            className="cell"
                            value={row.description}
                            autoComplete="off"
                            aria-label={t('a11y.description', { item: name })}
                            placeholder={t('field.descriptionPlaceholder')}
                            onChange={(event) =>
                              updateRow(row.id, { description: event.target.value })
                            }
                          />
                          {row.unit ? (
                            <span className={`shrink-0 ${HINT}`}>{row.unit}</span>
                          ) : null}
                        </span>

                        <span className={FIGURES}>
                          <span className="relative w-[5ch] shrink-0 sm:w-auto">
                            <FigureCell
                              value={row.quantity}
                              display={formatQuantity}
                              className="cell-qty"
                              ariaLabel={t('a11y.quantity', { item: name })}
                              onChange={(quantity) => updateRow(row.id, { quantity })}
                            />
                            <span
                              className={`pointer-events-none absolute right-0 top-0 ${HINT}`}
                              aria-hidden="true"
                            >
                              {t('ledger.times')}
                            </span>
                          </span>

                          <span className="w-[10ch] shrink-0 sm:w-auto">
                            <FigureCell
                              value={row.unitPrice}
                              display={formatAmount}
                              ariaLabel={t('a11y.unitPrice', { item: name })}
                              onChange={(unitPrice) => updateRow(row.id, { unitPrice })}
                            />
                          </span>

                          <span className="figure flex-1 sm:flex-none">
                            {formatAmount(rowAmount(row))}
                          </span>
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`ghost absolute inset-y-0 left-0 flex w-[2ch] items-start justify-center pt-[8px] ${HINT} hover:font-bold sm:w-[3ch] sm:items-center sm:pt-0 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 sm:focus-visible:opacity-100`}
                        aria-label={t('action.removeLine', { item: name })}
                        onClick={() => removeRow(row.id)}
                      >
                        {t('ledger.remove')}
                      </button>

                      {isDeviating(row) ? (
                        <span
                          className="absolute inset-y-0 right-0 flex w-[2ch] items-start justify-center pt-[14px] sm:w-[3ch] sm:items-center sm:pt-0"
                          title={t('ledger.deviationLegend')}
                        >
                          <span className="mark-in block h-[5px] w-[5px] bg-mark" />
                          <span className="sr-only">{t('a11y.deviation', { item: name })}</span>
                        </span>
                      ) : null}
                    </div>
                  )
                })
              )}

              <div className={GUTTER}>
                <div className="flex h-10 items-center">
                  <button
                    type="button"
                    className={`ghost ${HINT} hover:font-bold`}
                    onClick={() => addRow(categoryId)}
                  >
                    {t('action.addLine')}
                  </button>
                </div>
              </div>
            </section>
          )
        })}

        <footer className={`${GUTTER} pb-[48px] pt-[16px]`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[8px] border-t border-ink py-[20px]">
            <span className={HINT}>
              {rows.length === 1
                ? t('ledger.summaryOne')
                : t('ledger.summaryMany', { count: rows.length })}
            </span>
            <span className="ml-auto flex items-baseline gap-[2ch]">
              <span className={LABEL}>{t('ledger.total')}</span>
              <span className="figure figure-total text-[28px] text-mark">
                {formatAmount(total)}
              </span>
            </span>
          </div>
          <p className={`flex items-center gap-[1ch] ${HINT}`}>
            <span className="block h-[5px] w-[5px] shrink-0 bg-mark" aria-hidden="true" />
            {t('ledger.deviationLegend')}
          </p>
        </footer>
      </div>
    </main>
  )
}
