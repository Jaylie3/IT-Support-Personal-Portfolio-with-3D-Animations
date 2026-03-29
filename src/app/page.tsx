'use client'
import dynamic from 'next/dynamic'
import Navigation from './components/Navigation'
import ContactSection from './components/ContactSection'

const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false })
const SkillsSection = dynamic(() => import('./components/SkillsSection'), { ssr: false })
const PortfolioSection = dynamic(() => import('./components/PortfolioSection'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  )
}
