import type { Borders, Row, Workbook } from 'exceljs'
import { budgetCategoryLabelKeys } from '@/data/templates/exhibition-budget'
import { t } from '@/i18n'
import { orderedCategories, rowsInCategory, slugify, type BudgetRow } from './budget'

const MONEY_FORMAT = '#,##0.00'
const HAIRLINE = { style: 'thin' as const, color: { argb: 'FF000000' } }
/** Description, quantity, unit, unit price, amount. */
const COLUMN_COUNT = 5

/**
 * Draws a rule across the whole table width.
 * `Row.eachCell` skips empty cells by default, so a category or subtotal row —
 * which only carries values in some columns — would otherwise get a rule with
 * gaps in it. Address the five columns directly instead.
 */
function ruleAcross(row: Row, border: Partial<Borders>): void {
  for (let column = 1; column <= COLUMN_COUNT; column += 1) {
    row.getCell(column).border = border
  }
}

export interface BudgetDocument {
  title: string
  venue: string
  rows: BudgetRow[]
}

/**
 * Builds the workbook. Amounts, subtotals and the total are written as formulas
 * so the file stays a working budget once it is opened in Excel or LibreOffice.
 * Kept separate from the download so the output can be read back and checked.
 */
export async function buildBudgetWorkbook(doc: BudgetDocument): Promise<Workbook> {
  const ExcelJS = await import('exceljs')
  const workbook = new ExcelJS.Workbook()
  workbook.creator = t('app.wordmark')
  workbook.created = new Date()

  const sheet = workbook.addWorksheet(t('xlsx.sheetName'))
  sheet.columns = [
    { key: 'description', width: 44 },
    { key: 'quantity', width: 10 },
    { key: 'unit', width: 12 },
    { key: 'unitPrice', width: 20 },
    { key: 'amount', width: 20 },
  ]

  const title = doc.title.trim() || t('field.titlePlaceholder')

  const titleRow = sheet.addRow([title])
  titleRow.font = { bold: true, size: 14 }

  if (doc.venue.trim()) {
    sheet.addRow([`${t('xlsx.venueLabel')}: ${doc.venue.trim()}`])
  }
  sheet.addRow([t('field.currencyNote')])
  sheet.addRow([])

  const headerRow = sheet.addRow([
    t('xlsx.colDescription'),
    t('xlsx.colQuantity'),
    t('xlsx.colUnit'),
    t('xlsx.colUnitPrice'),
    t('xlsx.colAmount'),
  ])
  headerRow.font = { bold: true }
  headerRow.eachCell((cell) => {
    cell.border = { bottom: HAIRLINE }
  })

  const subtotalCellRefs: string[] = []

  for (const categoryId of orderedCategories()) {
    const rows = rowsInCategory(doc.rows, categoryId)
    if (rows.length === 0) continue

    sheet.addRow([])
    const categoryRow = sheet.addRow([t(budgetCategoryLabelKeys[categoryId])])
    categoryRow.font = { bold: true }
    ruleAcross(categoryRow, { bottom: HAIRLINE })

    const firstItemRowNumber = categoryRow.number + 1
    let lastItemRowNumber = categoryRow.number

    for (const row of rows) {
      const itemRow = sheet.addRow([
        row.description,
        row.quantity,
        row.unit,
        row.unitPrice,
      ])
      itemRow.getCell(4).numFmt = MONEY_FORMAT
      const amountCell = itemRow.getCell(5)
      amountCell.value = {
        formula: `B${itemRow.number}*D${itemRow.number}`,
        result: row.quantity * row.unitPrice,
      }
      amountCell.numFmt = MONEY_FORMAT
      lastItemRowNumber = itemRow.number
    }

    const subtotalRow = sheet.addRow([t('xlsx.subtotal')])
    subtotalRow.font = { bold: true }
    const subtotalCell = subtotalRow.getCell(5)
    subtotalCell.value = {
      formula: `SUM(E${firstItemRowNumber}:E${lastItemRowNumber})`,
      result: rows.reduce((sum, row) => sum + row.quantity * row.unitPrice, 0),
    }
    subtotalCell.numFmt = MONEY_FORMAT
    ruleAcross(subtotalRow, { top: HAIRLINE })
    subtotalCellRefs.push(`E${subtotalRow.number}`)
  }

  sheet.addRow([])
  const totalRow = sheet.addRow([t('xlsx.total')])
  totalRow.font = { bold: true, size: 12 }
  const totalCell = totalRow.getCell(5)
  totalCell.value = subtotalCellRefs.length
    ? {
        formula: subtotalCellRefs.join('+'),
        result: doc.rows.reduce((sum, row) => sum + row.quantity * row.unitPrice, 0),
      }
    : 0
  totalCell.numFmt = MONEY_FORMAT
  ruleAcross(totalRow, { top: HAIRLINE, bottom: HAIRLINE })

  return workbook
}

/** Builds the workbook in the browser and hands it to the user. */
export async function downloadBudgetXlsx(doc: BudgetDocument): Promise<void> {
  const workbook = await buildBudgetWorkbook(doc)
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${slugify(doc.title) || t('xlsx.fileName')}.xlsx`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
