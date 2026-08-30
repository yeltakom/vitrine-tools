import type { ExhibitionBrief } from '@/lib/brief'

/**
 * The show the landing page prices: a mid-size group exhibition, half the works
 * borrowed, roughly three months at a non-collecting venue. Every figure on the
 * homepage is generated from this and nothing else, so what a visitor sees is
 * the actual output of the tool.
 *
 * Deliberately names no institution. Inventing one puts a plausible-looking
 * venue on a public page that has nothing to do with us, and the generator
 * reads the city and the venue type, never the name.
 */
export const sampleBrief: ExhibitionBrief = {
  title: 'Group exhibition, six artists',
  venue: 'Non-collecting venue',
  city: 'Berlin',
  venueType: 'kunsthalle',
  opening: '2026-03-14',
  closing: '2026-06-21',
  artists: 6,
  works: 24,
  loanedWorks: 11,
  artworkTypes: ['painting', 'sculpture', 'video', 'installation'],
  avNeeds: ['projector', 'audio'],
  crew: 4,
  targetBudget: null,
}
