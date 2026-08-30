'use client'

import { useEffect, useRef, useState } from 'react'
import { budgetCategoryLabelKeys, type BudgetCategoryId } from '@/data/templates/exhibition-budget'
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
import { downloadBudgetJson, readBudgetFile, type BudgetFileErrorCode } from '@/lib/budget-file'
import { downloadBudgetXlsx } from '@/lib/export-xlsx'
import { CATEGORY_GRID, FIGURES, LABEL, ROW } from './ledger-style'

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
      className={`cell cell-figure ${className}`}
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
 * The budget the generator produced, opened for correction.
 *
 * It never invents rows: `initialRows` arrives from `generateBudget`, and the
 * only lines a curator adds by hand are the ones the brief could not know about.
 * Figures are set in mono because they are columns of numbers that have to line
 * up; everything else on the page is not.
 */
export default function BudgetLedger({
  initialTitle = '',
  initialVenue = '',
  initialRows,
  targetBudget = null,
  onEditBrief,
}: {
  initialTitle?: string
  initialVenue?: string
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
   * Warn only once there is something to lose — an untouched result is not work.
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
    <div>
      <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[12px] border-b border-rule pb-[16px]">
        <button type="button" className="ghost btn" onClick={() => void handleDownload()} disabled={exporting} aria-busy={exporting}>
          {t('action.downloadXlsx')}
        </button>
        {onEditBrief ? (
          <button type="button" className="ghost link note" onClick={onEditBrief}>
            {t('action.editBrief')}
          </button>
        ) : null}
        <button type="button" className="ghost link note" onClick={() => fileInput.current?.click()}>
          {t('action.openJson')}
        </button>
        <button
          type="button"
          className="ghost link note"
          onClick={() => downloadBudgetJson({ title, venue, rows })}
        >
          {t('action.saveJson')}
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

      {notice ? (
        <div
          className="flex items-baseline gap-[10px] border-b border-rule py-[12px]"
          role={notice.tone === 'error' ? 'alert' : 'status'}
        >
          {notice.tone === 'error' ? (
            <span className="mark-in mt-[6px] block h-[6px] w-[6px] shrink-0 bg-mark" aria-hidden="true" />
          ) : null}
          <p className="note">{notice.text}</p>
          <button
            type="button"
            className="ghost link note ml-auto shrink-0"
            aria-label={t('action.dismissNotice')}
            onClick={() => setNotice(null)}
          >
            {t('notice.dismiss')}
          </button>
        </div>
      ) : null}

      <div className="py-[28px]">
        <input
          className="cell cell-title"
          value={title}
          autoComplete="off"
          aria-label={t('a11y.exhibitionTitle')}
          placeholder={t('field.titlePlaceholder')}
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className="mt-[14px] flex items-baseline justify-between gap-[16px]">
          <label className="flex min-w-0 flex-1 items-baseline gap-[10px]">
            <span className={`shrink-0 ${LABEL}`}>{t('field.venueLabel')}</span>
            <input
              className="cell note"
              value={venue}
              autoComplete="off"
              aria-label={t('a11y.venue')}
              placeholder={t('field.venuePlaceholder')}
              onChange={(event) => setVenue(event.target.value)}
            />
          </label>
          <span className={`shrink-0 ${LABEL}`}>{t('field.currencyNote')}</span>
        </div>
      </div>

      {orderedCategories().map((categoryId) => {
        const categoryRows = rowsInCategory(rows, categoryId)
        return (
          <section key={categoryId} className="pt-[18px]">
            <div className={`${CATEGORY_GRID} border-b border-ink`}>
              <h3 className={LABEL}>{t(budgetCategoryLabelKeys[categoryId])}</h3>
              <span aria-hidden="true" />
              <span className="figure font-medium">{formatAmount(sumRows(categoryRows))}</span>
            </div>

            {categoryRows.length === 0 ? (
              <p className="flex h-11 items-center note">{t('ledger.empty')}</p>
            ) : (
              categoryRows.map((row) => {
                const name = row.description || t('field.descriptionPlaceholder')
                return (
                  <div key={row.id} className="group relative">
                    <div className={ROW}>
                      <span className="flex min-w-0 items-baseline gap-[10px]">
                        <input
                          className="cell"
                          value={row.description}
                          autoComplete="off"
                          aria-label={t('a11y.description', { item: name })}
                          placeholder={t('field.descriptionPlaceholder')}
                          onChange={(event) => updateRow(row.id, { description: event.target.value })}
                        />
                        {row.unit ? <span className="shrink-0 note">{row.unit}</span> : null}
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
                          <span className="pointer-events-none absolute right-0 top-0 note" aria-hidden="true">
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

                        <span className="figure flex-1 sm:flex-none">{formatAmount(rowAmount(row))}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      className="ghost absolute inset-y-0 left-[-22px] hidden w-[20px] items-center justify-center note hover:text-ink sm:flex sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 sm:focus-visible:opacity-100"
                      aria-label={t('action.removeLine', { item: name })}
                      onClick={() => removeRow(row.id)}
                    >
                      {t('ledger.remove')}
                    </button>

                    {isDeviating(row) ? (
                      <span
                        className="absolute inset-y-0 right-[-18px] hidden items-center sm:flex"
                        title={t('ledger.deviationLegend')}
                      >
                        <span className="mark-in block h-[6px] w-[6px] bg-mark" />
                        <span className="sr-only">{t('a11y.deviation', { item: name })}</span>
                      </span>
                    ) : null}
                  </div>
                )
              })
            )}

            <div className="flex h-11 items-center">
              <button type="button" className="ghost link note" onClick={() => addRow(categoryId)}>
                {t('action.addLine')}
              </button>
            </div>
          </section>
        )
      })}

      <div className="mt-[24px] border-t border-ink pt-[24px]">
        <div className="flex flex-wrap items-end justify-between gap-[16px]">
          <span className="note">{summaryLabel(rows.length)}</span>
          <span className="ml-auto flex items-baseline gap-[16px]">
            <span className={LABEL}>{t('ledger.total')}</span>
            <span className="figure-total">{formatAmount(total)}</span>
          </span>
        </div>

        {targetBudget && targetBudget > 0 ? (
          <div className="mt-[16px] flex flex-wrap justify-end gap-x-[16px] gap-y-[4px] border-t border-rule pt-[12px] text-right">
            <span className="note">
              {t('ledger.targetLabel')} {formatAmount(targetBudget)}
            </span>
            <span className={`note ${total > targetBudget ? 'text-mark' : ''}`}>
              {total > targetBudget ? t('ledger.overBy') : t('ledger.underBy')}{' '}
              {formatAmount(Math.abs(total - targetBudget))}
            </span>
          </div>
        ) : null}

        <p className="mt-[16px] flex items-center gap-[8px] note">
          <span className="block h-[6px] w-[6px] shrink-0 bg-mark" aria-hidden="true" />
          {t('ledger.deviationLegend')}
        </p>
      </div>
    </div>
  )
}
