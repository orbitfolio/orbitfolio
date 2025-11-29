import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Orbit Folio – Global Portfolio Tracker',
  description: 'Track stocks, crypto, gold, MFs, real estate, NFTs – all in USD with live analytics.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 text-white">
        {children}
      </body>
    </html>
  )
}
