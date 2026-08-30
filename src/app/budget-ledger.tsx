'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  budgetCategoryLabelKeys,
  type BudgetCategoryId,
} from '@/data/templates/exhibition-budget'
import { t, type TranslationKey } from '@/i18n'
import {
  createEmptyRow,
  formatAmount,
  formatQuantity,
  hasUnsavedWork,
  isDeviating,
  orderedCategories,
  parseNumber,
  rowAmount,
  rowsInCategory,
  summaryLabel,
  sumRows,
  type BudgetRow,
} from '@/lib/budget'
import {
  downloadBudgetJson,
  readBudgetFile,
  type BudgetFileErrorCode,
} from '@/lib/budget-file'
import { downloadBudgetXlsx } from '@/lib/export-xlsx'
import {
  BUTTON,
  CATEGORY_GRID,
  FIGURES,
  GUTTER,
  HINT,
  LABEL,
  LABEL_LIGHT,
  ROW,
  WORDMARK,
} from './ledger-style'

/** A rejected file names its own problem. One key per validator verdict. */
const FILE_ERROR_KEYS: Record<BudgetFileErrorCode, TranslationKey> = {
  tooLarge: 'json.errorTooLarge',
  unreadable: 'json.errorUnreadable',
  notJson: 'json.errorNotJson',
  notBudget: 'json.errorNotBudget',
  newerVersion: 'json.errorNewerVersion',
}

/** Keeps a hostile or merely absurd filename from stretching the notice line. */
function shortFileName(name: string): string {
  return name.length > 48 ? `${name.slice(0, 47)}…` : name
}

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

/**
 * The one ledger. The landing page and /generator render the same live component
 * — there is no printed copy of it anywhere, because a budget you cannot type
 * into is a screenshot, and a screenshot is not what this site sells.
 *
 * `children` is whatever the page puts between the ledger and the site footer:
 * nothing on /generator, the sections that explain the product on the landing page.
 */
export default function BudgetLedger({
  masthead = true,
  initialTitle = '',
  initialVenue = '',
  initialRows,
  targetBudget = null,
  onEditBrief,
}: {
  /** The wordmark line. Off when a page already carries one above the ledger. */
  masthead?: boolean
  initialTitle?: string
  initialVenue?: string
  /** The generated budget. The ledger refines it; it never invents it. */
  initialRows: BudgetRow[]
  /** What the curator said they had. Shown as a variance against the result. */
  targetBudget?: number | null
  onEditBrief?: () => void
}) {
  const [title, setTitle] = useState(initialTitle)
  const [venue, setVenue] = useState(initialVenue)
  const [rows, setRows] = useState<BudgetRow[]>(initialRows)
  const [exporting, setExporting] = useState(false)
  const [notice, setNotice] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const total = sumRows(rows)

  /**
   * The budget lives in this component and nowhere else, so a reload loses it.
   * Warn only once there is something to lose — an untouched template is not work.
   */
  const unsaved = hasUnsavedWork(
    { title, venue, rows },
    { title: initialTitle, venue: initialVenue, rowCount: initialRows.length },
  )
  useEffect(() => {
    if (!unsaved) return
    function warn(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [unsaved])

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

  function handleSaveJson() {
    downloadBudgetJson({ title, venue, rows })
  }

  /** Nothing on screen changes until the file has passed every check. */
  async function handleOpenJson(file: File) {
    const result = await readBudgetFile(file)
    if (!result.ok) {
      setNotice({ tone: 'error', text: t(FILE_ERROR_KEYS[result.code]) })
      return
    }
    setTitle(result.data.title)
    setVenue(result.data.venue)
    setRows(result.data.rows)
    const name = shortFileName(file.name)
    setNotice({
      tone: 'ok',
      text:
        result.data.rows.length === 1
          ? t('json.loadedOne', { file: name })
          : t('json.loadedMany', { count: result.data.rows.length, file: name }),
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
    <>
      <div>
        {/* A rule-spanned action bar: the working file on the left, the document
            you hand over on the right. Same hairline device as a category and its
            subtotal, doing the same job — separating a name from the figure it
            settles. */}
        <header className={GUTTER}>
          <div className="border-b border-ink pb-[12px] pt-[16px]">
            {masthead ? (
              <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[2px]">
                <Link
                  className={`ghost ${WORDMARK} underline-offset-[3px] hover:underline`}
                  href="/"
                >
                  {t('app.wordmark')}
                </Link>
                <span className={LABEL_LIGHT}>{t('generator.documentLabel')}</span>
              </div>
            ) : null}

            <p className={masthead ? `mt-[10px] ${HINT}` : HINT}>{t('ledger.instruction')}</p>

            <div className="mt-[12px] flex flex-wrap items-center gap-x-[2ch] gap-y-[8px]">
              {onEditBrief ? (
                <button
                  type="button"
                  className={`ghost ${HINT} hover:font-bold`}
                  onClick={onEditBrief}
                >
                  {t('action.editBrief')}
                </button>
              ) : null}
              <button
                type="button"
                className={`ghost ${HINT} hover:font-bold`}
                onClick={() => fileInput.current?.click()}
              >
                {t('action.openJson')}
              </button>
              <button
                type="button"
                className={`ghost ${HINT} hover:font-bold`}
                onClick={handleSaveJson}
              >
                {t('action.saveJson')}
              </button>
              <span className="hidden h-px flex-1 bg-ink sm:block" aria-hidden="true" />
              <button
                type="button"
                className={`ghost ml-auto ${BUTTON} enabled:hover:bg-ink enabled:hover:text-paper disabled:cursor-not-allowed disabled:border-transparent disabled:font-normal`}
                onClick={() => {
                  void handleDownload()
                }}
                disabled={exporting}
                aria-busy={exporting}
              >
                {t('action.downloadXlsx')}
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  if (file) void handleOpenJson(file)
                }}
              />
            </div>
          </div>
        </header>

        {notice ? (
          <div className={GUTTER}>
            <div
              className="flex items-baseline gap-[1ch] border-b border-ink py-[10px]"
              role={notice.tone === 'error' ? 'alert' : 'status'}
            >
              {notice.tone === 'error' ? (
                <span
                  className="mark-in block h-[5px] w-[5px] shrink-0 bg-mark"
                  aria-hidden="true"
                />
              ) : null}
              <p className={`${HINT} ${notice.tone === 'error' ? 'font-bold' : ''}`}>
                {notice.text}
              </p>
              <button
                type="button"
                className={`ghost ml-auto shrink-0 ${HINT} hover:font-bold`}
                aria-label={t('action.dismissNotice')}
                onClick={() => setNotice(null)}
              >
                {t('notice.dismiss')}
              </button>
            </div>
          </div>
        ) : null}

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

        <section className={`${GUTTER} pt-[16px]`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-[2ch] gap-y-[8px] border-t border-ink py-[20px]">
            <span className={HINT}>{summaryLabel(rows.length)}</span>
            <span className="ml-auto flex items-baseline gap-[2ch]">
              <span className={LABEL}>{t('ledger.total')}</span>
              <span className="figure figure-total text-[28px] text-mark">
                {formatAmount(total)}
              </span>
            </span>
          </div>
          {targetBudget && targetBudget > 0 ? (
            <div className="mb-[16px] border-b border-ink pb-[16px]">
              <div className="flex items-baseline justify-between gap-[2ch]">
                <span className={HINT}>{t('ledger.targetLabel')}</span>
                <span className="figure">{formatAmount(targetBudget)}</span>
              </div>
              <div className="mt-[6px] flex items-baseline justify-between gap-[2ch]">
                <span className={`${HINT} font-bold`}>
                  {total > targetBudget ? t('ledger.overBy') : t('ledger.underBy')}
                </span>
                <span
                  className={`figure ${total > targetBudget ? 'text-mark' : ''}`}
                >
                  {formatAmount(Math.abs(total - targetBudget))}
                </span>
              </div>
            </div>
          ) : null}
          <p className={`flex items-center gap-[1ch] ${HINT}`}>
            <span className="block h-[5px] w-[5px] shrink-0 bg-mark" aria-hidden="true" />
            {t('ledger.deviationLegend')}
          </p>
        </section>

      </div>
    </>
  )
}
