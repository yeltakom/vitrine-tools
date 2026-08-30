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
  // ——— Landing page. The hero is the product's own output, so most of the copy
  // here labels a document rather than selling one.
  'landing.pageTitle': 'Exhibition budgets you can hand to a funder',
  'landing.pageDescription':
    'Build an exhibition budget line by line in the browser and download it as a spreadsheet. No account, nothing stored.',
  'landing.documentLabel': 'sample budget',
  'landing.sampleTitle': 'Soft interiors',
  'landing.sampleVenue': 'Kunstverein Leipzig — March to June 2026',
  'landing.heroNote':
    'That is the product. Every figure above is editable, the categories are yours to change, and the result downloads as a spreadsheet.',

  'landing.whatYouGet': 'What you get',
  'landing.get1': 'Line items priced for a mid-size group show, all of them editable',
  'landing.get2': 'A spreadsheet you can attach to a funding application',
  'landing.get2Figure': '.xlsx',
  'landing.get3': 'Accounts to create, sign-ups to complete, data we keep',
  'landing.get3Figure': '0',

  'landing.price': 'Price',
  'landing.priceFigure': '29,00',
  'landing.priceNote':
    'One payment in EUR, no subscription and no seat count. The total including VAT for your country is shown at checkout.',

  'landing.questions': 'Questions',
  'faq.q1': 'What do I actually download?',
  'faq.a1':
    'An .xlsx file: your line items, a subtotal for each category and a total. It opens in Excel, Numbers and LibreOffice.',
  'faq.q2': 'Is the free version usable on real projects?',
  'faq.a2':
    'Yes. Today the generator is free in full: unlimited lines and a clean spreadsheet. Once the license goes on sale the free export will be capped at 25 lines and will carry a small “Made with vitrine.tools” note.',
  'faq.q3': 'Where is my budget stored?',
  'faq.a3':
    'Nowhere. It lives in the browser tab. Save a .json file to keep it, and open that file again to carry on.',
  'faq.q4': 'Can I change the categories and the figures?',
  'faq.a4':
    'Every line is editable and you can add or remove lines in any category. The defaults are a starting point, not a rule.',
  'faq.q5': 'How is VAT handled?',
  'faq.a5':
    'Checkout runs through Lemon Squeezy as merchant of record. They add the VAT of your country to the price above, show you the total before you pay, and issue the invoice.',

  'action.openGenerator': 'Open the generator',
  'action.buyLicense': 'Buy a license — coming soon',

  'footer.impressum': 'Impressum',
  'footer.privacy': 'Privacy',

  // ——— Legal pages. Bracketed entries are placeholders a human must fill in.
  'legal.draftNotice': 'Draft. This page is incomplete and must be reviewed before launch.',
  'legal.documentLabel': 'legal',

  'impressum.pageTitle': 'Impressum',
  'impressum.intro': 'Information required under § 5 DDG.',
  'impressum.providerLabel': 'Provider',
  'impressum.provider': '[TBD — legal name and postal address]',
  'impressum.contactLabel': 'Contact',
  'impressum.contact': '[TBD — email address]',
  'impressum.responsibleLabel': 'Responsible for content',
  'impressum.responsible': '[TBD — name and address, § 18 Abs. 2 MStV]',
  'impressum.vatLabel': 'VAT',
  'impressum.vat':
    'Small business under § 19 UStG: invoices issued directly show no VAT, and none can be deducted from them. Sales through this site run through Lemon Squeezy as merchant of record, who sell to you in their own name and charge and remit VAT themselves.',
  'impressum.disputeLabel': 'Dispute resolution',
  'impressum.dispute':
    'We are neither obliged nor willing to take part in dispute resolution proceedings before a consumer arbitration board (§ 36 VSBG).',

  'privacy.pageTitle': 'Privacy',
  'privacy.intro': 'What this site does and does not do with your data.',
  'privacy.controllerLabel': 'Controller',
  'privacy.controller': '[TBD — see Impressum]',
  'privacy.dataLabel': 'What this site collects',
  'privacy.data':
    'Nothing you type. The generator runs entirely in your browser: titles, line items and figures are never sent to a server and are gone when you close the tab. Saving a .json or .xlsx file writes it straight to your device.',
  'privacy.cookiesLabel': 'Cookies and tracking',
  'privacy.cookies':
    'None. There is no analytics, no tracking pixel and no advertising network on this site.',
  'privacy.fontsLabel': 'Fonts',
  'privacy.fonts':
    'JetBrains Mono is served from this domain. Your browser makes no request to Google Fonts or any other third party.',
  'privacy.hostingLabel': 'Hosting',
  'privacy.hosting':
    'The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, as a processor under a data processing agreement. Vercel processes server log data, including your IP address, in order to deliver the pages and defend against attacks. Legal basis: Art. 6(1)(f) GDPR. This involves a transfer to the United States, covered by the EU standard contractual clauses.',
  'privacy.paymentsLabel': 'Payments',
  'privacy.payments':
    'Checkout is not live yet. When it is, it will run through Lemon Squeezy as merchant of record, and the details you enter at checkout will be processed by them under their own privacy policy.',
  'privacy.rightsLabel': 'Your rights',
  'privacy.rights':
    'You can request access to, correction of, deletion of, restriction of and portability of any personal data held about you, and you can object at any time to processing based on Art. 6(1)(f) GDPR (Art. 21). You can also complain to a supervisory authority. Because the generator stores nothing, there is usually nothing to request.',
  'privacy.updatedLabel': 'Last updated',
  'privacy.updated': '[TBD]',

} as const
