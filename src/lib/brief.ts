import type { TranslationKey } from '@/i18n'

/**
 * What a curator tells us about their show. Everything the generator knows
 * comes from here — the point of the product is that you describe an exhibition
 * once and get a costed budget back, not that you type a spreadsheet by hand.
 *
 * Only `artists` and `works` really drive the shape of the result; every other
 * field either scales it or switches a category on. Defaults are a plausible
 * mid-size group show, so an impatient visitor can generate first and correct after.
 */

export type VenueType =
  | 'museum'
  | 'kunsthalle'
  | 'gallery'
  | 'biennale'
  | 'projectSpace'
  | 'publicSpace'
  | 'university'

export type ArtworkType =
  | 'painting'
  | 'sculpture'
  | 'photography'
  | 'video'
  | 'installation'
  | 'print'
  | 'digital'
  | 'performance'
  | 'sound'
  | 'textile'

export type AvNeed = 'projector' | 'screen' | 'audio' | 'lighting' | 'interactive'

export interface ExhibitionBrief {
  title: string
  venue: string
  city: string
  venueType: VenueType
  /** ISO dates. The run length drives AV rental months, tours and talks. */
  opening: string
  closing: string
  artists: number
  works: number
  loanedWorks: number
  artworkTypes: ArtworkType[]
  avNeeds: AvNeed[]
  /** People on the install crew, not crew-days. Days are derived from the works. */
  crew: number
  /** Optional. When set, the result is compared against it rather than scaled to it. */
  targetBudget: number | null
}

export const venueTypes: readonly VenueType[] = [
  'museum',
  'kunsthalle',
  'gallery',
  'biennale',
  'projectSpace',
  'publicSpace',
  'university',
]

export const artworkTypes: readonly ArtworkType[] = [
  'painting',
  'sculpture',
  'photography',
  'video',
  'installation',
  'print',
  'digital',
  'performance',
  'sound',
  'textile',
]

export const avNeeds: readonly AvNeed[] = [
  'projector',
  'screen',
  'audio',
  'lighting',
  'interactive',
]

export const venueTypeLabelKeys: Record<VenueType, TranslationKey> = {
  museum: 'venueType.museum',
  kunsthalle: 'venueType.kunsthalle',
  gallery: 'venueType.gallery',
  biennale: 'venueType.biennale',
  projectSpace: 'venueType.projectSpace',
  publicSpace: 'venueType.publicSpace',
  university: 'venueType.university',
}

export const artworkTypeLabelKeys: Record<ArtworkType, TranslationKey> = {
  painting: 'artwork.painting',
  sculpture: 'artwork.sculpture',
  photography: 'artwork.photography',
  video: 'artwork.video',
  installation: 'artwork.installation',
  print: 'artwork.print',
  digital: 'artwork.digital',
  performance: 'artwork.performance',
  sound: 'artwork.sound',
  textile: 'artwork.textile',
}

export const avNeedLabelKeys: Record<AvNeed, TranslationKey> = {
  projector: 'av.projector',
  screen: 'av.screen',
  audio: 'av.audio',
  lighting: 'av.lighting',
  interactive: 'av.interactive',
}

/** A plausible mid-size group show, so the form can be generated from as-is. */
export function emptyBrief(): ExhibitionBrief {
  return {
    title: '',
    venue: '',
    city: '',
    venueType: 'kunsthalle',
    opening: '',
    closing: '',
    artists: 6,
    works: 24,
    loanedWorks: 8,
    artworkTypes: ['painting', 'sculpture', 'video'],
    avNeeds: ['projector', 'audio'],
    crew: 4,
    targetBudget: null,
  }
}
