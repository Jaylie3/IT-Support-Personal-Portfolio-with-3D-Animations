import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lindokuhle Jali | ICT Support Specialist & Web Developer',
  description: 'Portfolio of Lindokuhle Nkosinathi Jali (Lindo) — ICT Support Specialist and Web Developer based in Bergville, KZN, South Africa. Specialized in IT Infrastructure, Active Directory, Cloud Administration, and Web Development.',
  keywords: 'Lindokuhle Jali IT Portfolio, Lindo Jali, ICT Support Specialist South Africa, IT Support KZN, Bergville IT, Web Developer South Africa, Jaylie3 GitHub, IIE Rosebank College',
  openGraph: {
    title: 'Lindokuhle Jali | ICT Support Specialist & Web Developer',
    description: 'Futuristic IT Command Center Portfolio — Lindokuhle Nkosinathi Jali, ICT Support Specialist in Bergville, KZN, South Africa.',
    type: 'website',
  },
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
