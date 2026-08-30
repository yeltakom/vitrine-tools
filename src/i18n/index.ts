import { en } from './en'

export type Locale = 'en'
export const defaultLocale: Locale = 'en'

const dictionaries = { en } as const

export type TranslationKey = keyof typeof en

/**
 * Minimal translation accessor. `{name}` placeholders are replaced from `params`.
 * No dependency: the dictionary is a plain object and keys are checked at compile time.
 */
export function t(
  key: TranslationKey,
  params?: Record<string, string | number>,
  locale: Locale = defaultLocale,
): string {
  const value: string = dictionaries[locale][key]
  if (!params) return value
  return value.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  )
}
