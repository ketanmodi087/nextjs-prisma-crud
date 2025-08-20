import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Default metadata for the app
export const metadata: Metadata = {
  title: 'Mini Projects CRUD',
  description: 'A simple projects management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global layout wrapper */}
        {children}
      </body>
    </html>
  )
}
