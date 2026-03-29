'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'STATUS', icon: '◉', href: '#home' },
  { id: 'skills', label: 'SKILLS', icon: '⬡', href: '#skills' },
  { id: 'arsenal', label: 'TOOLS', icon: '⚙', href: '#arsenal' },
  { id: 'portfolio', label: 'TICKETS', icon: '▦', href: '#portfolio' },
  { id: 'contact', label: 'CONTACT', icon: '✉', href: '#contact' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.4 }
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* ── Desktop Glassmorphism Sidebar ── */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden md:flex fixed left-0 top-0 h-full z-50 flex-col items-center justify-between py-8"
        style={{
          width: '72px',
          background: 'rgba(10,10,15,0.7)',
          backdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(0,212,255,0.12)',
          boxShadow: '4px 0 24px rgba(0,212,255,0.05)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-9 h-9 rounded flex items-center justify-center font-mono font-bold text-sm"
            style={{
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff',
            }}
          >
            L
          </div>
          <span className="font-mono text-[8px] text-[#00ff88] tracking-widest">ONLINE</span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col items-center gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNav(item.href)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
                className="relative flex flex-col items-center gap-1 w-12 py-2 rounded transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(0,212,255,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent',
                }}
              >
                <span
                  className="text-base"
                  style={{ color: isActive ? '#00d4ff' : 'rgba(156,163,175,0.7)' }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-mono text-[8px] tracking-widest"
                  style={{ color: isActive ? '#00d4ff' : 'rgba(156,163,175,0.5)' }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-l"
                    style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }}
                  />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Status indicator */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[#00ff88] text-xs animate-pulse">●</span>
          <span className="font-mono text-[7px] text-gray-600 tracking-widest rotate-90 origin-center mt-4">SYS_OK</span>
        </div>
      </motion.aside>

      {/* ── Mobile top bar ── */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,212,255,0.15)',
        }}
      >
        <div className="flex items-center justify-between px-4 h-14">
          <span className="font-mono text-[#00d4ff] text-sm font-bold tracking-widest">
            <span className="text-[#00ff88]">&gt;</span> LINDO.DEV
          </span>
          <button
            className="font-mono text-[#00d4ff] text-sm"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? '[X]' : '[≡]'}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}
            >
              <div className="px-4 py-3 grid grid-cols-5 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.href)}
                    className="flex flex-col items-center gap-1 py-2 rounded"
                    style={{
                      background: activeSection === item.id ? 'rgba(0,212,255,0.1)' : 'transparent',
                      border: `1px solid ${activeSection === item.id ? 'rgba(0,212,255,0.3)' : 'rgba(0,212,255,0.08)'}`,
                    }}
                  >
                    <span className="text-base" style={{ color: activeSection === item.id ? '#00d4ff' : '#6b7280' }}>
                      {item.icon}
                    </span>
                    <span className="font-mono text-[8px] tracking-widest" style={{ color: activeSection === item.id ? '#00d4ff' : '#4b5563' }}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

