'use client'
import dynamic from 'next/dynamic'
import Navigation from './components/Navigation'
import ContactSection from './components/ContactSection'
import PersistentTerminal from './components/PersistentTerminal'

const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false })
const SkillsSection = dynamic(() => import('./components/SkillsSection'), { ssr: false })
const ToolsSection = dynamic(() => import('./components/ToolsSection'), { ssr: false })
const PortfolioSection = dynamic(() => import('./components/PortfolioSection'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <ToolsSection />
      <PortfolioSection />
      <ContactSection />
      <PersistentTerminal />
    </main>
  )
}
