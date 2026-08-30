import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'VITRINE.TOOLS — Exhibition Planning Toolkit',
  description: 'Professional exhibition documents in seconds. Proposals, budgets, timelines, checklists — customized to your project.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  )
}
