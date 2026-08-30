'use client'

import { useState } from 'react'
import { t } from '@/i18n'
import { emptyBrief, type ExhibitionBrief } from '@/lib/brief'
import { generateBudget } from '@/lib/generate-budget'
import type { BudgetRow } from '@/lib/budget'
import BudgetLedger from '../budget-ledger'
import BriefForm from './brief-form'
import { DOC } from '../ledger-style'

/**
 * Two states, one page: describe the show, then correct the budget it produced.
 *
 * The brief is kept after generating so "Change the brief" returns to a filled
 * form rather than an empty one, and re-generating from a corrected brief is a
 * second guess rather than a restart.
 */
export default function GeneratorApp() {
  const [brief, setBrief] = useState<ExhibitionBrief>(() => emptyBrief())
  const [result, setResult] = useState<{ brief: ExhibitionBrief; rows: BudgetRow[] } | null>(null)

  if (!result) {
    return (
      <BriefForm
        initial={brief}
        onGenerate={(next) => {
          setBrief(next)
          setResult({ brief: next, rows: generateBudget(next) })
        }}
      />
    )
  }

  // The brief needs the full measure for its columns; the budget it produced is
  // a document and keeps the narrower one.
  return (
    <div className={DOC}>
      <BudgetLedger
        /* Remounts on every generation so a fresh budget replaces the old one
           instead of merging into edits made against a different brief. */
        key={JSON.stringify(result.brief)}
        initialTitle={result.brief.title || t('field.titlePlaceholder')}
        initialVenue={[result.brief.venue, result.brief.city].filter(Boolean).join(', ')}
        initialRows={result.rows}
        targetBudget={result.brief.targetBudget}
        onEditBrief={() => setResult(null)}
      />
    </div>
  )
}
