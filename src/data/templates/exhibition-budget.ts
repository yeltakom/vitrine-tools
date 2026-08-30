import type { TranslationKey } from '@/i18n'

/**
 * The six categories a funded exhibition budget is read in, and the rate card
 * the generator prices them from.
 *
 * Rates are EUR netto at the baseline the card is calibrated to: a non-collecting
 * Kunsthalle in Berlin. Everything else is that number moved by a venue factor
 * and a city factor — see `src/lib/generate-budget.ts`. Nothing here is a line
 * item; lines are produced from a brief, because a budget nobody can generate is
 * just a spreadsheet with our name on it.
 */

export type BudgetCategoryId =
  | 'fees'
  | 'transportInsurance'
  | 'installation'
  | 'production'
  | 'communication'
  | 'publicProgramme'

export const budgetCategoryOrder: readonly BudgetCategoryId[] = [
  'fees',
  'transportInsurance',
  'installation',
  'production',
  'communication',
  'publicProgramme',
]

export const budgetCategoryLabelKeys: Record<BudgetCategoryId, TranslationKey> = {
  fees: 'category.fees',
  transportInsurance: 'category.transportInsurance',
  installation: 'category.installation',
  production: 'category.production',
  communication: 'category.communication',
  publicProgramme: 'category.publicProgramme',
}

/** EUR netto, Berlin / Kunsthalle baseline. Quantities come from the brief. */
export const rateCard = {
  curatorialFee: 4500,
  /** Per artist. Sits inside the BBK / W.A.G.E. range for a mid-size group show. */
  artistFee: 900,
  exhibitionDesignFee: 2200,
  technicalPlanningFee: 1200,
  registrarFee: 1800,

  artHandlingDay: 480,
  freightShipment: 1650,
  /** Per loaned work, nail-to-nail, for the length of a normal run. */
  insurancePerWork: 145,
  courier: 620,

  /** Per person per day. */
  crewDay: 320,
  wallConstruction: 3200,
  lightingDay: 420,
  /** Per device, per month of the run. */
  av: {
    projector: 650,
    screen: 480,
    audio: 420,
    lighting: 380,
    interactive: 900,
  },

  /** Per work made for the show rather than borrowed. */
  productionPerWork: 1200,
  performanceFee: 1400,

  graphicDesign: 1800,
  printRun: 950,
  photoDocumentation: 780,
  pressAndMailing: 1400,

  openingReception: 1600,
  artistTalk: 350,
  guidedTour: 120,
} as const

export interface BudgetLineSpec {
  id: string
  categoryId: BudgetCategoryId
  labelKey: TranslationKey
  unitKey: TranslationKey
  quantity: number
  /** EUR, netto. */
  unitPrice: number
}
