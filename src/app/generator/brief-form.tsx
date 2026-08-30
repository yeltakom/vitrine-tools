'use client'

import { useState } from 'react'
import { t, type TranslationKey } from '@/i18n'
import {
  artworkTypeLabelKeys,
  artworkTypes,
  avNeedLabelKeys,
  avNeeds,
  emptyBrief,
  venueTypeLabelKeys,
  venueTypes,
  type ArtworkType,
  type AvNeed,
  type ExhibitionBrief,
  type VenueType,
} from '@/lib/brief'
import { LABEL } from '../ledger-style'

/**
 * The brief. This is the product's front door: a curator describes a show once
 * and the generator prices it. Nothing here asks for a line item, because a tool
 * that makes you type the lines is a spreadsheet with extra steps.
 *
 * Every field either scales the result or switches a category on, and the form
 * says which — a number nobody can trace back to an input is a number nobody
 * will defend to a funder.
 */

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block border-t border-rule pt-[10px]">
      <span className={`block ${LABEL}`}>{label}</span>
      {children}
      {hint ? <span className={`mt-[4px] block note`}>{hint}</span> : null}
    </label>
  )
}

/** A multi-select that reads as a set of switches, not a list of checkboxes. */
function Chips<T extends string>({
  options,
  labels,
  selected,
  onToggle,
}: {
  options: readonly T[]
  labels: Record<T, TranslationKey>
  selected: T[]
  onToggle: (value: T) => void
}) {
  return (
    <div className="mt-[10px] flex flex-wrap gap-[6px]">
      {options.map((option) => (
        <label key={option} className="cursor-pointer">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
          <span
            className="block border border-rule px-[10px] py-[6px] text-[13px] peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-current" 
          >
            {t(labels[option])}
          </span>
        </label>
      ))}
    </div>
  )
}

function NumberField({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  hint?: string
  value: number
  min: number
  max: number
  onChange: (next: number) => void
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        className="cell mt-[6px]"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={Number.isFinite(value) ? value : ''}
        onChange={(event) => {
          const next = Number(event.target.value)
          onChange(Number.isFinite(next) ? Math.min(max, Math.max(min, next)) : min)
        }}
      />
    </Field>
  )
}

export default function BriefForm({
  initial,
  onGenerate,
}: {
  initial?: ExhibitionBrief
  onGenerate: (brief: ExhibitionBrief) => void
}) {
  const [brief, setBrief] = useState<ExhibitionBrief>(initial ?? emptyBrief())

  function set<K extends keyof ExhibitionBrief>(key: K, value: ExhibitionBrief[K]) {
    setBrief((current) => ({ ...current, [key]: value }))
  }

  function toggle<K extends 'artworkTypes' | 'avNeeds'>(
    key: K,
    value: ExhibitionBrief[K][number],
  ) {
    setBrief((current) => {
      const list = current[key] as string[]
      const next = list.includes(value)
        ? list.filter((entry) => entry !== value)
        : [...list, value]
      return { ...current, [key]: next as ExhibitionBrief[K] }
    })
  }

  return (
    <form
      
      onSubmit={(event) => {
        event.preventDefault()
        onGenerate(brief)
      }}
    >
      <p className="max-w-[62ch] py-[28px] lede">{t('brief.intro')}</p>

      <fieldset className="pb-[40px]">
        <legend className={`pb-[10px] pt-[24px] ${LABEL}`}>{t('brief.sectionShow')}</legend>

        <Field label={t('brief.title')}>
          <input
            className="cell cell-title mt-[6px]"
            value={brief.title}
            autoComplete="off"
            placeholder={t('field.titlePlaceholder')}
            onChange={(event) => set('title', event.target.value)}
          />
        </Field>

        <div className="mt-[24px] grid gap-[24px] sm:grid-cols-2">
          <Field label={t('brief.venue')}>
            <input
              className="cell mt-[6px]"
              value={brief.venue}
              autoComplete="off"
              placeholder={t('field.venuePlaceholder')}
              onChange={(event) => set('venue', event.target.value)}
            />
          </Field>
          <Field label={t('brief.city')} hint={t('brief.cityHint')}>
            <input
              className="cell mt-[6px]"
              value={brief.city}
              autoComplete="off"
              placeholder={t('brief.cityPlaceholder')}
              onChange={(event) => set('city', event.target.value)}
            />
          </Field>
        </div>

        <div className="mt-[24px] grid gap-[24px] sm:grid-cols-3">
          <Field label={t('brief.venueType')} hint={t('brief.venueTypeHint')}>
            <select
              className="cell mt-[6px]"
              value={brief.venueType}
              onChange={(event) => set('venueType', event.target.value as VenueType)}
            >
              {venueTypes.map((type) => (
                <option key={type} value={type}>
                  {t(venueTypeLabelKeys[type])}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('brief.opening')}>
            <input
              className="cell mt-[6px]"
              type="date"
              value={brief.opening}
              onChange={(event) => set('opening', event.target.value)}
            />
          </Field>
          <Field label={t('brief.closing')} hint={t('brief.datesHint')}>
            <input
              className="cell mt-[6px]"
              type="date"
              value={brief.closing}
              onChange={(event) => set('closing', event.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="pb-[40px]">
        <legend className={`pb-[10px] pt-[24px] ${LABEL}`}>{t('brief.sectionWorks')}</legend>

        <div className="grid gap-[24px] sm:grid-cols-3">
          <NumberField
            label={t('brief.artists')}
            hint={t('brief.artistsHint')}
            value={brief.artists}
            min={0}
            max={500}
            onChange={(value) => set('artists', value)}
          />
          <NumberField
            label={t('brief.works')}
            hint={t('brief.worksHint')}
            value={brief.works}
            min={0}
            max={2000}
            onChange={(value) => set('works', value)}
          />
          <NumberField
            label={t('brief.loanedWorks')}
            hint={t('brief.loanedWorksHint')}
            value={brief.loanedWorks}
            min={0}
            max={2000}
            onChange={(value) => set('loanedWorks', value)}
          />
        </div>

        <div className="mt-[24px] border-t border-rule pt-[10px]">
          <span className={`block ${LABEL}`}>{t('brief.artworkTypes')}</span>
          <Chips
            options={artworkTypes}
            labels={artworkTypeLabelKeys}
            selected={brief.artworkTypes}
            onToggle={(value: ArtworkType) => toggle('artworkTypes', value)}
          />
          <span className={`mt-[8px] block note`}>{t('brief.artworkTypesHint')}</span>
        </div>
      </fieldset>

      <fieldset className="pb-[40px]">
        <legend className={`pb-[10px] pt-[24px] ${LABEL}`}>{t('brief.sectionInstall')}</legend>

        <div className="grid gap-[24px] sm:grid-cols-2">
          <NumberField
            label={t('brief.crew')}
            hint={t('brief.crewHint')}
            value={brief.crew}
            min={1}
            max={40}
            onChange={(value) => set('crew', value)}
          />
          <Field label={t('brief.targetBudget')} hint={t('brief.targetBudgetHint')}>
            <input
              className="cell mt-[6px]"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={t('brief.targetBudgetPlaceholder')}
              value={brief.targetBudget ?? ''}
              onChange={(event) => {
                const raw = event.target.value.trim()
                const next = Number(raw)
                set('targetBudget', raw === '' || !Number.isFinite(next) ? null : Math.max(0, next))
              }}
            />
          </Field>
        </div>

        <div className="mt-[24px] border-t border-rule pt-[10px]">
          <span className={`block ${LABEL}`}>{t('brief.avNeeds')}</span>
          <Chips
            options={avNeeds}
            labels={avNeedLabelKeys}
            selected={brief.avNeeds}
            onToggle={(value: AvNeed) => toggle('avNeeds', value)}
          />
          <span className={`mt-[8px] block note`}>{t('brief.avNeedsHint')}</span>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[12px] border-t border-rule py-[28px]">
        <button type="submit" className="ghost btn">
          {t('action.generateBudget')}
        </button>
        <span className={'note'}>{t('brief.generateHint')}</span>
      </div>
    </form>
  )
}
