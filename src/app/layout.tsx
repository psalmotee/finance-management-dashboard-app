import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Finance Management Dashboard',
  description: ' A modern finance management dashboard built with Next.js and TypeScript.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='' >
        {children}
      </body>
    </html>
  )
}
