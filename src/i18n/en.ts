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
  // The glyph on the notice-band dismiss control. Separate from
  // `ledger.remove` for the same reason: dismissing a message is not
  // removing a budget line, and locales may diverge.
  'notice.dismiss': '×',
  'ledger.total': 'Total',
  'ledger.empty': 'Add your first line item.',
  'ledger.deviationLegend': 'Changed from the template default',
  'ledger.summaryOne': '1 line · EUR netto',
  'ledger.summaryMany': '{count} lines · EUR netto',

  'action.addLine': '+ Add line',
  'action.removeLine': 'Remove {item}',
  'action.downloadXlsx': 'Download .xlsx',
  'action.saveJson': 'Save .json',
  'action.openJson': 'Open .json',
  'action.dismissNotice': 'Dismiss this message',

  'a11y.description': 'Description of {item}',
  'a11y.quantity': 'Quantity of {item}',
  'a11y.unitPrice': 'Unit price of {item}',
  'a11y.exhibitionTitle': 'Exhibition title',
  'a11y.venue': 'Venue',
  'a11y.newLine': 'New line item',
  'a11y.deviation': '{item} was changed from the template default',

  // The .json working file: what leaves the page and comes back.
  'json.fileName': 'exhibition-budget',
  'json.loadedOne': '1 line loaded from {file}.',
  'json.loadedMany': '{count} lines loaded from {file}.',
  'json.errorNotJson': 'That file is not JSON. Open a .json file saved from this page.',
  'json.errorNotBudget':
    'That JSON is not a budget file. Open a .json file saved from this page.',
  'json.errorNewerVersion':
    'That budget was saved by a newer version of this page. Reload the page, then open the file again.',
  'json.errorTooLarge':
    'That file is too large to be a budget. Open a .json file saved from this page.',
  'json.errorUnreadable': 'That file could not be read. Check it is still there, then open it again.',

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
