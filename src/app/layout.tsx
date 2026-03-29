import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IT Support Specialist | Portfolio',
  description: 'Solving complex problems through stable systems. Specialized in IT Infrastructure & User Experience.',
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
