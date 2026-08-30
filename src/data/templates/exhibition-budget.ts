import type { TranslationKey } from '@/i18n'

/**
 * Default line items for an exhibition budget.
 * All figures are EUR, netto. Only the categories a real exhibition budget opens with —
 * production, communication/press and public programme are separate templates.
 */

export type BudgetCategoryId = 'fees' | 'transportInsurance' | 'installation'

export interface BudgetTemplateItem {
  /** Stable id — survives reordering and is the row key. */
  id: string
  categoryId: BudgetCategoryId
  labelKey: TranslationKey
  unitKey: TranslationKey
  quantity: number
  /** EUR, netto. */
  unitPrice: number
}

export const budgetCategoryOrder: readonly BudgetCategoryId[] = [
  'fees',
  'transportInsurance',
  'installation',
]

export const budgetCategoryLabelKeys: Record<BudgetCategoryId, TranslationKey> = {
  fees: 'category.fees',
  transportInsurance: 'category.transportInsurance',
  installation: 'category.installation',
}

export const exhibitionBudgetTemplate: readonly BudgetTemplateItem[] = [
  {
    id: 'fees-curatorial',
    categoryId: 'fees',
    labelKey: 'item.curatorialFee',
    unitKey: 'unit.flat',
    quantity: 1,
    unitPrice: 4500,
  },
  {
    id: 'fees-artist',
    categoryId: 'fees',
    labelKey: 'item.artistFee',
    unitKey: 'unit.artist',
    quantity: 6,
    unitPrice: 800,
  },
  {
    id: 'fees-exhibition-design',
    categoryId: 'fees',
    labelKey: 'item.exhibitionDesignFee',
    unitKey: 'unit.flat',
    quantity: 1,
    unitPrice: 2200,
  },
  {
    id: 'fees-technical-planning',
    categoryId: 'fees',
    labelKey: 'item.technicalPlanningFee',
    unitKey: 'unit.flat',
    quantity: 1,
    unitPrice: 1200,
  },
  {
    id: 'transport-art-handling',
    categoryId: 'transportInsurance',
    labelKey: 'item.artHandling',
    unitKey: 'unit.day',
    quantity: 4,
    unitPrice: 480,
  },
  {
    id: 'transport-freight',
    categoryId: 'transportInsurance',
    labelKey: 'item.freight',
    unitKey: 'unit.shipment',
    quantity: 2,
    unitPrice: 1650,
  },
  {
    id: 'transport-insurance',
    categoryId: 'transportInsurance',
    labelKey: 'item.insurance',
    unitKey: 'unit.policy',
    quantity: 1,
    unitPrice: 1450,
  },
  {
    id: 'transport-courier',
    categoryId: 'transportInsurance',
    labelKey: 'item.courier',
    unitKey: 'unit.courier',
    quantity: 2,
    unitPrice: 620,
  },
  {
    id: 'installation-aufbau',
    categoryId: 'installation',
    labelKey: 'item.installationCrew',
    unitKey: 'unit.day',
    quantity: 5,
    unitPrice: 520,
  },
  {
    id: 'installation-abbau',
    categoryId: 'installation',
    labelKey: 'item.deinstallationCrew',
    unitKey: 'unit.day',
    quantity: 2,
    unitPrice: 520,
  },
  {
    id: 'installation-walls',
    categoryId: 'installation',
    labelKey: 'item.wallConstruction',
    unitKey: 'unit.flat',
    quantity: 1,
    unitPrice: 3200,
  },
  {
    id: 'installation-av',
    categoryId: 'installation',
    labelKey: 'item.avRental',
    unitKey: 'unit.month',
    quantity: 1,
    unitPrice: 1850,
  },
  {
    id: 'installation-lighting',
    categoryId: 'installation',
    labelKey: 'item.lighting',
    unitKey: 'unit.day',
    quantity: 2,
    unitPrice: 420,
  },
]
