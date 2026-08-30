import {
  budgetCategoryOrder,
  exhibitionBudgetTemplate,
  type BudgetCategoryId,
} from '@/data/templates/exhibition-budget'
import { t } from '@/i18n'

/** A line as it exists on screen. What is on screen is what lands in the .xlsx. */
export interface BudgetRow {
  id: string
  categoryId: BudgetCategoryId
  description: string
  unit: string
  quantity: number
  /** EUR, netto. */
  unitPrice: number
  /**
   * The template default this row was seeded from, or null for a row the user added.
   * Used to decide whether the row still shows boilerplate or has been reviewed.
   */
  seed: { description: string; quantity: number; unitPrice: number } | null
}

let addedRowCount = 0

export function createRowsFromTemplate(): BudgetRow[] {
  return exhibitionBudgetTemplate.map((item) => {
    const description = t(item.labelKey)
    return {
      id: item.id,
      categoryId: item.categoryId,
      description,
      unit: t(item.unitKey),
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      seed: {
        description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      },
    }
  })
}

export function createEmptyRow(categoryId: BudgetCategoryId): BudgetRow {
  addedRowCount += 1
  return {
    id: `added-${categoryId}-${addedRowCount}`,
    categoryId,
    description: '',
    unit: '',
    quantity: 1,
    unitPrice: 0,
    seed: null,
  }
}

export function rowAmount(row: BudgetRow): number {
  return row.quantity * row.unitPrice
}

/** True when the row no longer matches the template it was seeded from. */
export function isDeviating(row: BudgetRow): boolean {
  if (!row.seed) return true
  return (
    row.description !== row.seed.description ||
    row.quantity !== row.seed.quantity ||
    row.unitPrice !== row.seed.unitPrice
  )
}

/**
 * True when the page holds work a reload would destroy: a named document, or a
 * ledger that is no longer the seeded template. Drives the leave warning — the
 * budget lives in React state only, so a refresh is a shredder.
 */
export function hasUnsavedWork(doc: {
  title: string
  venue: string
  rows: BudgetRow[]
}): boolean {
  if (doc.title.trim() !== '' || doc.venue.trim() !== '') return true
  if (doc.rows.length !== exhibitionBudgetTemplate.length) return true
  return doc.rows.some(isDeviating)
}

export function rowsInCategory(rows: BudgetRow[], categoryId: BudgetCategoryId): BudgetRow[] {
  return rows.filter((row) => row.categoryId === categoryId)
}

export function sumRows(rows: BudgetRow[]): number {
  return rows.reduce((total, row) => total + rowAmount(row), 0)
}

export function orderedCategories(): readonly BudgetCategoryId[] {
  return budgetCategoryOrder
}

/**
 * 4500 -> "4 500,00". A plain space groups thousands so the digits keep the
 * fixed advance of the mono face and decimals line up column by column.
 */
export function formatAmount(value: number): string {
  const safe = Number.isFinite(value) ? value : 0
  const [whole, fraction] = Math.abs(safe).toFixed(2).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${safe < 0 ? '-' : ''}${grouped},${fraction}`
}

/** Quantities carry no forced decimals: 6, not 6,00. */
export function formatQuantity(value: number): string {
  const safe = Number.isFinite(value) ? value : 0
  return String(safe).replace('.', ',')
}

/** Accepts "4 500,00", "4500.5", "4.500,00". Returns null when nothing numeric is left. */
export function parseNumber(input: string): number | null {
  const trimmed = input.replace(/\s/g, '')
  if (trimmed === '') return null
  const normalised = trimmed.includes(',')
    ? trimmed.replace(/\./g, '').replace(',', '.')
    : trimmed
  const parsed = Number(normalised)
  return Number.isFinite(parsed) ? parsed : null
}

export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
