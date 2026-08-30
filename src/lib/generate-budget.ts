import {
  rateCard,
  type BudgetCategoryId,
  type BudgetLineSpec,
} from '@/data/templates/exhibition-budget'
import { t, type TranslationKey } from '@/i18n'
import type { AvNeed, ExhibitionBrief, VenueType } from './brief'
import type { BudgetRow } from './budget'

/**
 * The product. A brief goes in, a costed exhibition budget comes out.
 *
 * Every figure is a baseline rate from the card moved by two factors and a
 * quantity derived from the brief. Nothing is random and nothing is invented at
 * runtime, so the same brief always produces the same budget and a curator can
 * argue with any single line by pointing at the input that produced it.
 *
 * The result is a starting point priced at mid-market, not a quote. Every row
 * stays editable, and each carries its generated values as `seed` so the red
 * deviation marks show what the curator changed after the fact.
 */

/** What the venue does to a rate. A project space is not a museum. */
const VENUE_FACTOR: Record<VenueType, number> = {
  museum: 1.3,
  kunsthalle: 1,
  gallery: 0.85,
  biennale: 1.45,
  projectSpace: 0.55,
  publicSpace: 1.1,
  university: 0.7,
}

/**
 * What the city does to a rate, against the Berlin baseline the card is written
 * at. Matched on a substring of whatever the curator typed, so "Zürich",
 * "Zurich, CH" and "zurich" all land. An unlisted city stays at the baseline
 * rather than guessing.
 */
const CITY_FACTOR: ReadonlyArray<[string, number]> = [
  ['zurich', 1.6],
  ['zürich', 1.6],
  ['geneva', 1.55],
  ['genf', 1.55],
  ['basel', 1.45],
  ['oslo', 1.4],
  ['copenhagen', 1.35],
  ['københavn', 1.35],
  ['london', 1.35],
  ['new york', 1.45],
  ['san francisco', 1.5],
  ['tokyo', 1.2],
  ['paris', 1.25],
  ['amsterdam', 1.2],
  ['stockholm', 1.2],
  ['munich', 1.15],
  ['münchen', 1.15],
  ['vienna', 1.1],
  ['wien', 1.1],
  ['hamburg', 1.05],
  ['frankfurt', 1.1],
  ['brussels', 1.05],
  ['milan', 1.05],
  ['milano', 1.05],
  ['berlin', 1],
  ['leipzig', 0.9],
  ['madrid', 0.9],
  ['barcelona', 0.95],
  ['lisbon', 0.8],
  ['lisboa', 0.8],
  ['prague', 0.75],
  ['praha', 0.75],
  ['warsaw', 0.7],
  ['warszawa', 0.7],
  ['budapest', 0.65],
  ['athens', 0.7],
  ['istanbul', 0.55],
  ['ankara', 0.5],
  ['izmir', 0.5],
]

export function cityFactor(city: string): number {
  const needle = city.trim().toLowerCase()
  if (needle === '') return 1
  for (const [name, factor] of CITY_FACTOR) {
    if (needle.includes(name)) return factor
  }
  return 1
}

/** Rates land on tens. A budget line that reads 1 447,33 was not estimated. */
function rate(base: number, factor: number): number {
  return Math.max(10, Math.round((base * factor) / 10) * 10)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** Whole days between two ISO dates, or a default run when either is missing. */
export function runDays(brief: ExhibitionBrief): number {
  const from = Date.parse(brief.opening)
  const to = Date.parse(brief.closing)
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) return 90
  return clamp(Math.round((to - from) / 86_400_000), 1, 730)
}

const AV_RATE_KEYS: Record<AvNeed, keyof typeof rateCard.av> = {
  projector: 'projector',
  screen: 'screen',
  audio: 'audio',
  lighting: 'lighting',
  interactive: 'interactive',
}

const AV_LABEL_KEYS: Record<AvNeed, TranslationKey> = {
  projector: 'item.avProjector',
  screen: 'item.avScreen',
  audio: 'item.avAudio',
  lighting: 'item.avLighting',
  interactive: 'item.avInteractive',
}

/** The quantities a brief implies, exposed so the UI can explain a line. */
export interface BudgetDrivers {
  days: number
  months: number
  installDays: number
  deinstallDays: number
  handlingDays: number
  shipments: number
  couriers: number
  commissioned: number
  tours: number
  talks: number
  venueFactor: number
  cityFactor: number
}

export function driversFor(brief: ExhibitionBrief): BudgetDrivers {
  const days = runDays(brief)
  const works = clamp(Math.round(brief.works), 0, 2000)
  const loaned = clamp(Math.round(brief.loanedWorks), 0, works)
  const crew = clamp(Math.round(brief.crew), 1, 40)

  const installDays = clamp(Math.ceil(works / 6), 2, 20)

  return {
    days,
    months: clamp(Math.ceil(days / 30), 1, 24),
    installDays,
    deinstallDays: clamp(Math.round(installDays * 0.45), 1, 10),
    handlingDays: clamp(Math.ceil(works / 8), 1, 25),
    shipments: loaned > 0 ? clamp(Math.ceil(loaned / 12), 1, 10) : works > 0 ? 1 : 0,
    couriers: loaned > 0 ? clamp(Math.ceil(loaned / 8), 1, 8) : 0,
    commissioned: Math.max(0, works - loaned),
    tours: clamp(Math.round(days / 14), 0, 26),
    talks: clamp(Math.round(days / 45), 1, 8),
    venueFactor: VENUE_FACTOR[brief.venueType] ?? 1,
    cityFactor: cityFactor(brief.city),
    ...{ crew },
  } as BudgetDrivers & { crew: number }
}

/**
 * Builds the line specs a brief implies. Lines with a zero quantity are dropped,
 * which is how categories switch themselves off: no loans means no insurance and
 * no courier, no AV selected means no rental block, no performance in the
 * artwork types means no performance fee.
 */
function specsFor(brief: ExhibitionBrief): BudgetLineSpec[] {
  const d = driversFor(brief)
  const crew = clamp(Math.round(brief.crew), 1, 40)
  const artists = clamp(Math.round(brief.artists), 0, 500)
  const f = d.venueFactor * d.cityFactor
  const has = (type: string) => brief.artworkTypes.includes(type as never)
  const durationFactor = clamp(d.days / 90, 0.7, 2)

  const line = (
    id: string,
    categoryId: BudgetCategoryId,
    labelKey: TranslationKey,
    unitKey: TranslationKey,
    quantity: number,
    base: number,
  ): BudgetLineSpec => ({
    id,
    categoryId,
    labelKey,
    unitKey,
    quantity,
    unitPrice: rate(base, f),
  })

  const specs: BudgetLineSpec[] = [
    line('fees-curatorial', 'fees', 'item.curatorialFee', 'unit.flat', 1,
      rateCard.curatorialFee * durationFactor),
    line('fees-artist', 'fees', 'item.artistFee', 'unit.artist', artists, rateCard.artistFee),
    line('fees-exhibition-design', 'fees', 'item.exhibitionDesignFee', 'unit.flat',
      brief.works >= 12 ? 1 : 0, rateCard.exhibitionDesignFee),
    line('fees-technical-planning', 'fees', 'item.technicalPlanningFee', 'unit.flat',
      brief.avNeeds.length > 0 || has('installation') ? 1 : 0, rateCard.technicalPlanningFee),
    line('fees-registrar', 'fees', 'item.registrarFee', 'unit.flat',
      d.couriers > 0 ? 1 : 0, rateCard.registrarFee),

    line('transport-art-handling', 'transportInsurance', 'item.artHandling', 'unit.day',
      d.handlingDays, rateCard.artHandlingDay),
    line('transport-freight', 'transportInsurance', 'item.freight', 'unit.shipment',
      d.shipments, rateCard.freightShipment),
    line('transport-insurance', 'transportInsurance', 'item.insurance', 'unit.work',
      clamp(Math.round(brief.loanedWorks), 0, brief.works), rateCard.insurancePerWork),
    line('transport-courier', 'transportInsurance', 'item.courier', 'unit.courier',
      d.couriers, rateCard.courier),

    line('installation-aufbau', 'installation', 'item.installationCrew', 'unit.crewDay',
      d.installDays * crew, rateCard.crewDay),
    line('installation-abbau', 'installation', 'item.deinstallationCrew', 'unit.crewDay',
      d.deinstallDays * crew, rateCard.crewDay),
    line('installation-walls', 'installation', 'item.wallConstruction', 'unit.flat',
      brief.works > 0 ? 1 : 0, rateCard.wallConstruction * clamp(brief.works / 24, 0.5, 2.5)),
    line('installation-lighting', 'installation', 'item.lighting', 'unit.day',
      clamp(Math.ceil(brief.works / 12), 1, 12), rateCard.lightingDay),

    ...brief.avNeeds.map((need) =>
      line(`installation-av-${need}`, 'installation', AV_LABEL_KEYS[need], 'unit.month',
        d.months, rateCard.av[AV_RATE_KEYS[need]]),
    ),

    line('production-commissioned', 'production', 'item.productionSupport', 'unit.work',
      d.commissioned, rateCard.productionPerWork),
    line('production-performance', 'production', 'item.performanceFee', 'unit.performance',
      has('performance') ? clamp(Math.round(d.days / 60), 1, 6) : 0, rateCard.performanceFee),

    line('communication-design', 'communication', 'item.graphicDesign', 'unit.flat', 1,
      rateCard.graphicDesign),
    line('communication-print', 'communication', 'item.printRun', 'unit.flat', 1,
      rateCard.printRun),
    line('communication-photo', 'communication', 'item.photoDocumentation', 'unit.flat', 1,
      rateCard.photoDocumentation),
    line('communication-press', 'communication', 'item.pressAndMailing', 'unit.flat', 1,
      rateCard.pressAndMailing),

    line('programme-opening', 'publicProgramme', 'item.openingReception', 'unit.flat', 1,
      rateCard.openingReception),
    line('programme-talks', 'publicProgramme', 'item.artistTalk', 'unit.talk', d.talks,
      rateCard.artistTalk),
    line('programme-tours', 'publicProgramme', 'item.guidedTour', 'unit.tour', d.tours,
      rateCard.guidedTour),
  ]

  return specs.filter((spec) => spec.quantity > 0 && spec.unitPrice > 0)
}

/** Brief in, budget out. The rows carry their generated values as `seed`. */
export function generateBudget(brief: ExhibitionBrief): BudgetRow[] {
  return specsFor(brief).map((spec) => {
    const description = t(spec.labelKey)
    return {
      id: spec.id,
      categoryId: spec.categoryId,
      description,
      unit: t(spec.unitKey),
      quantity: spec.quantity,
      unitPrice: spec.unitPrice,
      seed: { description, quantity: spec.quantity, unitPrice: spec.unitPrice },
    }
  })
}
