import { budgetCategoryOrder, type BudgetCategoryId } from '@/data/templates/exhibition-budget'
import { t } from '@/i18n'
import { slugify, type BudgetRow } from './budget'

/**
 * The save file. A budget lives in React state only — no localStorage, no URL —
 * so this file is the one way work leaves the page and comes back.
 *
 * Shape (version 1):
 * {
 *   "format": "vitrine.tools/exhibition-budget",
 *   "version": 1,
 *   "title": string,
 *   "venue": string,
 *   "rows": [
 *     { "categoryId": "fees", "description": string, "unit": string,
 *       "quantity": number, "unitPrice": number,
 *       "seed": { "description": string, "quantity": number, "unitPrice": number } | null }
 *   ]
 * }
 *
 * `seed` travels with the row so the red deviation marks survive a round trip.
 * Row ids are deliberately NOT written: they are React keys, not user data, and
 * are reissued on load so a hand-edited file cannot produce duplicate keys.
 * `version` is an integer; a future format bumps it and migrates on the way in.
 */
export const BUDGET_FILE_FORMAT = 'vitrine.tools/exhibition-budget'
export const BUDGET_FILE_VERSION = 1

/** Anything past these is not a budget, it is an attack or a mistake. */
const LIMITS = {
  /** Bytes. A 500-row budget serialises well under 100 KB. */
  fileSize: 1_000_000,
  rows: 500,
  text: 500,
  unit: 80,
  quantity: 1_000_000,
  unitPrice: 1_000_000_000,
} as const

/** Keys that must never reach an object we build. Rejected outright, not stripped. */
const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype']

export interface BudgetDocumentData {
  title: string
  venue: string
  rows: BudgetRow[]
}

export type BudgetFileErrorCode =
  | 'tooLarge'
  | 'unreadable'
  | 'notJson'
  | 'notBudget'
  | 'newerVersion'

export type BudgetFileResult =
  | { ok: true; data: BudgetDocumentData }
  | { ok: false; code: BudgetFileErrorCode }

function fail(code: BudgetFileErrorCode): BudgetFileResult {
  return { ok: false, code }
}

/* ---------------------------------------------------------------- writing */

export function serialiseBudget(doc: BudgetDocumentData): string {
  return `${JSON.stringify(
    {
      format: BUDGET_FILE_FORMAT,
      version: BUDGET_FILE_VERSION,
      title: doc.title,
      venue: doc.venue,
      rows: doc.rows.map((row) => ({
        categoryId: row.categoryId,
        description: row.description,
        unit: row.unit,
        quantity: row.quantity,
        unitPrice: row.unitPrice,
        seed: row.seed
          ? {
              description: row.seed.description,
              quantity: row.seed.quantity,
              unitPrice: row.seed.unitPrice,
            }
          : null,
      })),
    },
    null,
    2,
  )}\n`
}

export function budgetFileName(title: string): string {
  return `${slugify(title) || t('json.fileName')}.json`
}

/** Serialises in the browser and hands the file to the user. */
export function downloadBudgetJson(doc: BudgetDocumentData): void {
  const blob = new Blob([serialiseBudget(doc)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = budgetFileName(doc.title)
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

/* ---------------------------------------------------------------- reading */

/**
 * Every field is checked before anything is built. `JSON.parse` returns `any`;
 * nothing below trusts it. No spread, no merge, no dynamic key access, no `eval`:
 * the returned rows are constructed field by field from validated primitives.
 */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  for (const key of FORBIDDEN_KEYS) {
    if (Object.hasOwn(value, key)) return false
  }
  return true
}

function readString(source: Record<string, unknown>, key: string, maxLength: number): string | null {
  const value = source[key]
  if (typeof value !== 'string') return null
  if (value.length > maxLength) return null
  return value
}

/** Rejects NaN, Infinity, and figures no exhibition budget could hold. */
function readNumber(source: Record<string, unknown>, key: string, limit: number): number | null {
  const value = source[key]
  if (typeof value !== 'number' || !Number.isFinite(value)) return null
  if (Math.abs(value) > limit) return null
  return value
}

function isCategoryId(value: unknown): value is BudgetCategoryId {
  return (
    typeof value === 'string' &&
    (budgetCategoryOrder as readonly string[]).includes(value)
  )
}

function readSeed(value: unknown): BudgetRow['seed'] | undefined {
  if (value === null) return null
  if (!isPlainObject(value)) return undefined
  const description = readString(value, 'description', LIMITS.text)
  const quantity = readNumber(value, 'quantity', LIMITS.quantity)
  const unitPrice = readNumber(value, 'unitPrice', LIMITS.unitPrice)
  if (description === null || quantity === null || unitPrice === null) return undefined
  return { description, quantity, unitPrice }
}

/** Fresh ids for loaded rows: the file's own ids are never trusted as React keys. */
let loadedRowCount = 0

function readRow(value: unknown): BudgetRow | null {
  if (!isPlainObject(value)) return null
  const categoryId = value.categoryId
  if (!isCategoryId(categoryId)) return null

  const description = readString(value, 'description', LIMITS.text)
  const unit = readString(value, 'unit', LIMITS.unit)
  const quantity = readNumber(value, 'quantity', LIMITS.quantity)
  const unitPrice = readNumber(value, 'unitPrice', LIMITS.unitPrice)
  const seed = readSeed(value.seed)
  if (description === null || unit === null || quantity === null || unitPrice === null) return null
  if (seed === undefined) return null

  loadedRowCount += 1
  return {
    id: `loaded-${loadedRowCount}`,
    categoryId,
    description,
    unit,
    quantity,
    unitPrice,
    seed,
  }
}

/** Validates untrusted file text. Never throws; the caller reads `ok`. */
export function parseBudgetFile(text: string): BudgetFileResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return fail('notJson')
  }

  if (!isPlainObject(parsed)) return fail('notBudget')
  if (parsed.format !== BUDGET_FILE_FORMAT) return fail('notBudget')

  const version = parsed.version
  if (typeof version !== 'number' || !Number.isInteger(version) || version < 1) {
    return fail('notBudget')
  }
  if (version > BUDGET_FILE_VERSION) return fail('newerVersion')

  const title = readString(parsed, 'title', LIMITS.text)
  const venue = readString(parsed, 'venue', LIMITS.text)
  if (title === null || venue === null) return fail('notBudget')

  const rawRows = parsed.rows
  if (!Array.isArray(rawRows) || rawRows.length > LIMITS.rows) return fail('notBudget')

  const rows: BudgetRow[] = []
  for (const rawRow of rawRows) {
    const row = readRow(rawRow)
    if (row === null) return fail('notBudget')
    rows.push(row)
  }

  return { ok: true, data: { title, venue, rows } }
}

/** Reads a picked file and validates it. Rejects oversized files before reading. */
export async function readBudgetFile(file: File): Promise<BudgetFileResult> {
  if (file.size > LIMITS.fileSize) return fail('tooLarge')
  let text: string
  try {
    text = await file.text()
  } catch {
    return fail('unreadable')
  }
  return parseBudgetFile(text)
}
