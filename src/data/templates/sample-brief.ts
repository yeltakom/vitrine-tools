import type { ExhibitionBrief } from '@/lib/brief'

/**
 * The show the landing page prices. A real-shaped mid-size group exhibition:
 * six artists, half the works borrowed, three months at a non-collecting
 * Kunstverein in Leipzig. Every figure on the homepage is generated from this
 * and nothing else, so what a visitor sees is the actual output of the tool.
 */
export const sampleBrief: ExhibitionBrief = {
  title: 'Soft interiors',
  venue: 'Kunstverein Leipzig',
  city: 'Leipzig',
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
