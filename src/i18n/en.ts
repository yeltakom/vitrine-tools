// English is the source dictionary. Add `de.ts` / `tr.ts` with the same keys.
// Flat keys only — the shape is the contract for every other locale.
export const en = {
  'app.wordmark': 'VITRINE.TOOLS',

  'generator.documentLabel': 'exhibition budget',
  'generator.pageTitle': 'Exhibition budget generator',
  'generator.pageDescription':
    'Describe your exhibition and get a costed budget back across six categories. Download it as a spreadsheet. EUR, netto.',

  'field.titlePlaceholder': 'Untitled exhibition',
  'field.venueLabel': 'Venue',
  'field.venuePlaceholder': 'Venue, city',
  'field.currencyNote': 'EUR, netto',
  'field.descriptionPlaceholder': 'Line item',

  'category.fees': 'Fees',
  'category.transportInsurance': 'Transport & insurance',
  'category.installation': 'Installation & technical',
  'category.production': 'Production',
  'category.communication': 'Communication & press',
  'category.publicProgramme': 'Public programme',

  'item.curatorialFee': 'Curatorial fee',
  'item.artistFee': 'Artist fee',
  'item.exhibitionDesignFee': 'Exhibition design fee',
  'item.technicalPlanningFee': 'Technical planning fee',
  'item.registrarFee': 'Registrar and loan administration',
  'item.artHandling': 'Art handling and packing',
  'item.freight': 'Freight (round trip)',
  'item.insurance': 'Nail-to-nail insurance',
  'item.courier': 'Courier travel and per diem',
  'item.installationCrew': 'Installation crew (Aufbau)',
  'item.deinstallationCrew': 'De-installation crew (Abbau)',
  'item.wallConstruction': 'Wall construction and paint',
  'item.lighting': 'Lighting adjustment',
  'item.avProjector': 'Projector rental',
  'item.avScreen': 'Screen and monitor rental',
  'item.avAudio': 'Audio system rental',
  'item.avLighting': 'Special lighting rental',
  'item.avInteractive': 'Interactive station rental',
  'item.productionSupport': 'Production support for new work',
  'item.performanceFee': 'Performance fee and rehearsal',
  'item.graphicDesign': 'Graphic design and identity',
  'item.printRun': 'Print: invitations, wall texts, vinyl',
  'item.photoDocumentation': 'Photographic documentation',
  'item.pressAndMailing': 'Press office and mailing',
  'item.openingReception': 'Opening reception',
  'item.artistTalk': 'Artist talk fee',
  'item.guidedTour': 'Guided tour',

  'unit.flat': 'flat',
  'unit.day': 'day',
  'unit.crewDay': 'crew-day',
  'unit.month': 'month',
  'unit.artist': 'artist',
  'unit.work': 'work',
  'unit.shipment': 'shipment',
  'unit.courier': 'courier',
  'unit.performance': 'performance',
  'unit.talk': 'talk',
  'unit.tour': 'tour',

  // ——— The brief form. Every field either scales the result or switches a
  // category on, and the hint under it says which.
  'brief.intro':
    'Describe the show once. The generator prices it at mid-market rates for the city and venue type you name, and every line it produces stays editable.',
  'brief.sectionShow': 'The show',
  'brief.title': 'Exhibition title',
  'brief.venue': 'Venue',
  'brief.city': 'City',
  'brief.cityPlaceholder': 'Berlin',
  'brief.cityHint': 'Moves every rate. Berlin is the baseline; unlisted cities stay at it.',
  'brief.venueType': 'Venue type',
  'brief.venueTypeHint': 'A project space is not a museum. This scales fees and crew.',
  'brief.opening': 'Opening',
  'brief.closing': 'Closing',
  'brief.datesHint': 'Sets AV rental months, talks and tours. Blank means a 90-day run.',

  'brief.sectionWorks': 'Artists and works',
  'brief.artists': 'Artists',
  'brief.artistsHint': 'One artist fee each.',
  'brief.works': 'Works',
  'brief.worksHint': 'Drives handling days, install days and wall build.',
  'brief.loanedWorks': 'Of those, on loan',
  'brief.loanedWorksHint': 'Loans add insurance, courier and registrar. The rest are produced.',
  'brief.artworkTypes': 'What is in the show',
  'brief.artworkTypesHint': 'Performance adds a fee line. Installation adds technical planning.',

  'brief.sectionInstall': 'Install and money',
  'brief.crew': 'Install crew (people)',
  'brief.crewHint': 'Multiplied by the install days the work count implies.',
  'brief.targetBudget': 'Budget you have (optional)',
  'brief.targetBudgetPlaceholder': '45000',
  'brief.targetBudgetHint': 'Not used to scale anything — the result is compared against it.',
  'brief.avNeeds': 'Technical equipment',
  'brief.avNeedsHint': 'Rented per month of the run.',
  'brief.generateHint': 'Nothing is sent anywhere. The budget is built in this tab.',

  'action.generateBudget': 'Generate the budget',
  'action.editBrief': 'Change the brief',

  'ledger.targetLabel': 'Budget you said you have',
  'ledger.overBy': 'Over by',
  'ledger.underBy': 'Left over',

  // ——— The brief. What a curator tells us before anything is priced.
  'venueType.museum': 'Museum (collecting)',
  'venueType.kunsthalle': 'Kunsthalle / non-collecting',
  'venueType.gallery': 'Commercial gallery',
  'venueType.biennale': 'Biennale / festival',
  'venueType.projectSpace': 'Project space / artist-run',
  'venueType.publicSpace': 'Public space / outdoor',
  'venueType.university': 'University / academic',

  'artwork.painting': 'Painting',
  'artwork.sculpture': 'Sculpture',
  'artwork.photography': 'Photography',
  'artwork.video': 'Video / film',
  'artwork.installation': 'Installation',
  'artwork.print': 'Print / drawing',
  'artwork.digital': 'Digital / new media',
  'artwork.performance': 'Performance',
  'artwork.sound': 'Sound',
  'artwork.textile': 'Textile',

  'av.projector': 'Projectors',
  'av.screen': 'Screens and monitors',
  'av.audio': 'Audio',
  'av.lighting': 'Special lighting',
  'av.interactive': 'Interactive stations',

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
  'ledger.instruction':
    'Generated from your brief. Type over anything you disagree with, then download the spreadsheet.',
  'ledger.total': 'Total',
  'ledger.empty': 'The brief produced nothing here. Add a line, or change the brief.',
  'ledger.deviationLegend': 'Changed from what the generator produced',
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
  'a11y.deviation': '{item} was changed from the generated figure',

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
  // ——— Landing page. The site is installed like an exhibition: a title wall,
  // a wall label beside it, wall text at the entrance of each room. The
  // vocabulary is the audience's own, so it does the work marketing copy
  // usually has to do.
  'landing.pageTitle': 'Exhibition budgets you can hand to a funder',
  'landing.pageDescription':
    'Exhibition planning documents for freelance curators and small institutions. Start from a priced budget template, change what differs, download an .xlsx. No account.',
  'landing.documentLabel': 'exhibition planning tools',

  // The hero spread: what the curator said, and what it cost.
  'spread.briefLabel': 'The brief',
  'spread.brief':
    'Six artists. Twenty-four works, eleven of them on loan. Ninety-six days at a non-collecting venue, with projection and sound.',
  'spread.budgetLabel': 'The budget it produced',
  'action.seeExample': 'See the whole thing',

  'hero.headline': 'Describe the show. Get the budget.',
  'hero.lede':
    'Fourteen questions about your exhibition, and the generator costs the whole thing out across six categories at mid-market rates for your city and your kind of venue. For curators who plan shows without a finance department.',

  // The wall label: the typed card beside a work. Artist, title and year,
  // medium, dimensions, credit line — filled in with what is actually true.
  'label.maker': 'VITRINE.TOOLS',
  'label.work': 'Exhibition budget generator, 2026',
  'label.medium': 'Web application, client-side .xlsx',
  'label.dimensions': 'Fourteen questions in, six categories out',
  'label.credit': 'Free edition. EUR, netto.',

  'section.why': 'Why this exists',
  'why.body1':
    'Every exhibition budget starts as a file someone else built, passed between institutions until nobody remembers which cells are formulas and which were typed over.',
  'why.body2':
    'It breaks quietly: a subtotal that stopped covering the last three rows, an artist fee renamed but never re-linked, Aufbau and Abbau counted once between them. Meanwhile the categories barely change from show to show — fees, transport and insurance, installation, production, communication, public programme — and the same numbers have to survive twice, once in the application and again in the Verwendungsnachweis a year later.',
  'why.body3':
    'So the tool does not hand you a better empty file. You describe the show once and it costs the whole thing out, because the arithmetic was never the interesting part of your job.',

  'section.how': 'How it works',
  'how.startLabel': 'Describe',
  'how.startBody':
    'Fourteen questions: venue type and city, dates, how many artists and works, how many of those are loans, what is in the show, crew size, technical needs. No line items — that is what you came here not to write.',
  'how.changeLabel': 'Generate',
  'how.changeBody':
    'Six categories come back costed. Loans switch on insurance, courier and registrar; performance adds a fee line; the run length sets AV rental months and how many talks and tours you can hold. Anything you disagree with, type over — changed lines carry a mark.',
  'how.downloadLabel': 'Download',
  'how.downloadBody':
    'Take the .xlsx. Subtotals per category and a total are calculated inside the file, so it goes straight into an application and still makes sense to a Verwaltung reading it a year later.',

  'section.try': 'The generator',
  'try.status': 'live',
  'try.note':
    'Generated from the brief above by the same engine the site runs — not typed by hand and not a screenshot. Correct any line you disagree with; it is your budget, not ours.',

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

  // ——— Four tiers. Full is the anchor: it is the one that carries PDF and
  // every document type still to come, which is the whole reason it exists.
  'landing.whatYouGet': 'What you get',
  'landing.get1': 'Priced line items generated from the sample brief, all editable',
  'landing.get2': 'A spreadsheet you can attach to a funding application',
  'landing.get2Figure': '.xlsx',
  'landing.get3': 'Accounts to create, sign-ups to complete, data we keep',
  'landing.get3Figure': '0',

  'section.pricing': 'What it costs',
  'pricing.note':
    'One payment, not a subscription. Prices in EUR; checkout adds the VAT of your country and shows the total before you pay.',
  'pricing.currency': 'EUR',

  'tier.free': 'Free',
  'tier.freeFigure': '0',
  'tier.freeSummary': 'Enough to finish a real budget.',
  'tier.free1': 'Unlimited editing',
  'tier.free2': 'Up to 25 line items',
  'tier.free3': '.xlsx marked “Made with vitrine.tools”',

  'tier.single': 'Single',
  'tier.singleFigure': '9',
  'tier.singleSummary': 'The budget generator, unlocked.',
  'tier.single1': 'No watermark, no line limit',
  'tier.single2': 'Every budget template category',
  'tier.single3': '.xlsx export',

  'tier.full': 'Full',
  'tier.fullFigure': '29',
  'tier.fullSummary': 'Everything, including what is not built yet.',
  'tier.full1': 'Everything in Single',
  'tier.full2': 'PDF export',
  'tier.full3': 'Every document type, now and later',
  'tier.fullAnchor': 'most complete',

  'tier.team': 'Team',
  'tier.teamFigure': '79',
  'tier.teamSummary': 'Full, for a whole office.',
  'tier.team1': 'Everything in Full',
  'tier.team2': 'Six activations instead of two',
  'tier.team3': 'One invoice for the institution',

  'landing.questions': 'Questions',
  'faq.q1': 'What do I actually download?',
  'faq.a1':
    'An .xlsx file: your line items, a subtotal for each category and a total. It opens in Excel, Numbers and LibreOffice.',
  'faq.q2': 'Is the free version usable on real projects?',
  'faq.a2':
    'Yes. Today the generator is free in full: unlimited lines and a clean spreadsheet. Once licenses go on sale the free export will be capped at 25 lines and will carry a small “Made with vitrine.tools” note.',
  'faq.q3': 'Where is my budget stored?',
  'faq.a3':
    'Nowhere. It lives in the browser tab. Save a .json file to keep it, and open that file again to carry on.',
  'faq.q4': 'What if I disagree with a figure?',
  'faq.a4':
    'Yes. The generated budget is a starting point, not a verdict: every line is editable, you can add or remove lines in any category, and you can change the brief and generate again.',
  'faq.q5': 'What is the difference between Single and Full?',
  'faq.a5':
    'Single unlocks the budget generator and its spreadsheet. Full adds PDF export and every other document type — production, press, public programme, timelines — including the ones not built yet.',

  'action.buildBudget': 'Build a budget',
  'action.describeShow': 'Describe your exhibition',
  'action.seePricing': 'See what it costs',
  'action.openGenerator': 'Open the generator',
  'action.buyLicense': 'Coming soon',
  'action.startFree': 'Start for free',

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
