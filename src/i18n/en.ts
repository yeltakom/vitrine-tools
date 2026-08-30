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
  // The line that turns a table into an invitation. Both pages carry it.
  'ledger.instruction': 'Type over any figure, add or remove lines, then download the spreadsheet.',
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
  // ——— Landing page. The site has to explain the business, not only run the
  // tool: what the file is, why it is broken, what this replaces it with.
  'landing.pageTitle': 'Exhibition budgets you can hand to a funder',
  'landing.pageDescription':
    'Exhibition planning documents for freelance curators and small institutions. Start from a priced budget template, change what differs, download an .xlsx. No account.',
  'landing.documentLabel': 'exhibition planning tools',

  'landing.sampleTitle': 'Soft interiors',
  'landing.sampleVenue': 'Kunstverein Leipzig',

  'hero.headline': 'Exhibition budgets without the inherited spreadsheet.',
  'hero.lede':
    'Start from a template that is already priced, change what differs, and download an .xlsx a funder can open. Built for freelance curators and small institutions that plan shows without a finance department.',
  'hero.timeLabel': 'Time to your first spreadsheet',
  'hero.timeFigure': '10 min',
  'hero.costLabel': 'What that costs',
  'hero.costFigure': '0,00',

  'section.why': 'Why this exists',
  'why.body1':
    'Every exhibition budget starts as a file someone else built. It arrives from a colleague or a previous show, gets passed between institutions, and by the time it reaches you nobody remembers which cells are formulas and which were typed over. It breaks quietly: a subtotal that stopped covering the last three rows, an artist fee renamed but never re-linked, Aufbau and Abbau counted once between them.',
  'why.body2':
    'The categories barely change from show to show — fees, transport and insurance, installation, production, communication, public programme — and the same numbers have to survive twice: once in the application, and again in the Verwendungsnachweis a year later. What changes every time is the file. So the file is the thing worth replacing.',

  'section.how': 'How it works',
  'how.startLabel': 'Start',
  'how.startBody':
    'Open the generator. Curatorial and artist fees, nail-to-nail insurance, freight, courier per diems, Aufbau and Abbau crews — the categories arrive already priced at mid-size group-show rates, so the first thing you do is edit a budget rather than invent one.',
  'how.changeLabel': 'Change',
  'how.changeBody':
    'Type over any figure. Add lines, remove what you do not need, rename anything. Changed lines carry a mark, so you can see what is yours and what is still boilerplate.',
  'how.downloadLabel': 'Download',
  'how.downloadBody':
    'Take the .xlsx. Subtotals per category and a total are calculated inside the file, so it can go straight into an application and still make sense to a Verwaltung reading it a year later.',

  'section.try': 'Try it',
  'try.note': 'This is the working generator, not a picture of one. Anything you change here is in the file you download.',

  'landing.whatYouGet': 'What you get',
  'landing.get1': 'Line items priced for a mid-size group show, all of them editable',
  'landing.get2': 'A spreadsheet you can attach to a funding application',
  'landing.get2Figure': '.xlsx',
  'landing.get3': 'Accounts to create, sign-ups to complete, data we keep',
  'landing.get3Figure': '0',

  'section.documents': 'Documents',
  'documents.note': 'One document type works today. The rest are being built in this order.',
  'documents.budget': 'Exhibition budget',
  'documents.production': 'Production budget',
  'documents.press': 'Communication and press budget',
  'documents.programme': 'Public programme budget',
  'documents.timeline': 'Timeline and install schedule',
  'status.ready': 'ready',
  'status.next': 'next',
  'status.later': 'later',

  'section.who': 'Who it is for',
  'who.1': 'Freelance curators writing an application with no institution behind them',
  'who.2': 'Kunstvereine, project spaces and artist-run initiatives with no finance office',
  'who.3': 'Producers and exhibition designers costing a show before the funding is confirmed',

  'section.pricing': 'What it costs',
  'pricing.freeLabel': 'Free',
  'pricing.freeBody': 'Edit everything, download the spreadsheet, up to 25 lines.',
  'pricing.freeFigure': '0,00',
  'pricing.licenceLabel': 'License',
  'pricing.licenceBody':
    'No line limit, no watermark, PDF export, every document type as it lands. One payment, not a subscription.',
  'landing.priceFigure': '29,00',
  'landing.priceNote':
    'Prices in EUR. Checkout adds the VAT of your country and shows you the total before you pay.',

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

  'action.buildBudget': 'Build a budget',
  'action.seePricing': 'See what it costs',
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
