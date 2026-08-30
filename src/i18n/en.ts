// English is the source dictionary. Add `de.ts` / `tr.ts` with the same keys.
// Flat keys only — the shape is the contract for every other locale.
export const en = {
  'app.wordmark': 'VITRINE.TOOLS',

  'generator.documentLabel': 'exhibition budget',
  'generator.pageTitle': 'Exhibition budget generator',
  'generator.pageDescription':
    'Build an exhibition budget line by line and download it as a spreadsheet. EUR, netto.',

  'field.titlePlaceholder': 'Untitled exhibition',
  'field.venueLabel': 'Venue',
  'field.venuePlaceholder': 'Venue, city',
  'field.currencyNote': 'EUR, netto',
  'field.descriptionPlaceholder': 'Line item',

  'category.fees': 'Fees',
  'category.transportInsurance': 'Transport & insurance',
  'category.installation': 'Installation & technical',

  'item.curatorialFee': 'Curatorial fee',
  'item.artistFee': 'Artist fee',
  'item.exhibitionDesignFee': 'Exhibition design fee',
  'item.technicalPlanningFee': 'Technical planning fee',
  'item.artHandling': 'Art handling and packing',
  'item.freight': 'Freight (round trip)',
  'item.insurance': 'Nail-to-nail insurance',
  'item.courier': 'Courier travel and per diem',
  'item.installationCrew': 'Installation crew (Aufbau)',
  'item.deinstallationCrew': 'De-installation crew (Abbau)',
  'item.wallConstruction': 'Wall construction and paint',
  'item.avRental': 'AV equipment rental',
  'item.lighting': 'Lighting adjustment',

  'unit.flat': 'flat',
  'unit.day': 'day',
  'unit.month': 'month',
  'unit.artist': 'artist',
  'unit.shipment': 'shipment',
  'unit.policy': 'policy',
  'unit.courier': 'courier',

  // The multiplication sign between quantity and unit price.
  'ledger.times': '×',
  // The glyph on the remove-line control. Separate from `ledger.times`:
  // same character today, different meaning, and locales may diverge.
  'ledger.remove': '×',
  'ledger.total': 'Total',
  'ledger.empty': 'Add your first line item.',
  'ledger.deviationLegend': 'Changed from the template default',
  'ledger.summaryOne': '1 line · EUR netto',
  'ledger.summaryMany': '{count} lines · EUR netto',

  'action.addLine': '+ Add line',
  'action.removeLine': 'Remove {item}',
  'action.downloadXlsx': 'Download .xlsx',

  'a11y.description': 'Description of {item}',
  'a11y.quantity': 'Quantity of {item}',
  'a11y.unitPrice': 'Unit price of {item}',
  'a11y.exhibitionTitle': 'Exhibition title',
  'a11y.venue': 'Venue',
  'a11y.newLine': 'New line item',
  'a11y.deviation': '{item} was changed from the template default',

  'xlsx.sheetName': 'Budget',
  'xlsx.colDescription': 'Description',
  'xlsx.colQuantity': 'Quantity',
  'xlsx.colUnit': 'Unit',
  'xlsx.colUnitPrice': 'Unit price (EUR, netto)',
  'xlsx.colAmount': 'Amount (EUR, netto)',
  'xlsx.venueLabel': 'Venue',
  'xlsx.subtotal': 'Subtotal',
  'xlsx.total': 'Total (EUR, netto)',
  'xlsx.fileName': 'exhibition-budget',
} as const
