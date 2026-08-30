import './globals.css'
import type { Metadata } from 'next'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}