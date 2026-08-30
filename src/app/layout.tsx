import './globals.css'
import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono, Newsreader } from 'next/font/google'
import { t } from '@/i18n'

/**
 * Three roles, three faces, each doing the job it is actually good at — the way
 * an exhibition catalogue is set.
 *
 * Newsreader carries the headings and the one long read: an editorial serif with
 * optical sizing, quiet rather than showy. Archivo carries the interface —
 * labels, captions, controls — because a neo-grotesque is what wall captions and
 * colophons are set in. JetBrains Mono is kept for figures only, where tabular
 * numerals are the point; using it for prose is what made the earlier pass read
 * as a developer tool rather than a document for curators.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vitrine.tools'),
  title: `${t('app.wordmark')} — ${t('landing.pageTitle')}`,
  description: t('landing.pageDescription'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
