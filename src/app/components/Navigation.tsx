'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'Skills', 'Portfolio', 'Contact']

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-[#00d4ff]/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-mono text-[#00d4ff] text-lg font-bold tracking-widest"
          >
            <span className="text-[#00ff88]">&gt;</span> IT_SPECIALIST
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ color: '#00d4ff', scale: 1.05 }}
                className="text-gray-400 font-mono text-sm tracking-widest uppercase transition-colors hover:text-[#00d4ff]"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#00d4ff] font-mono"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '[X]' : '[=]'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 border-t border-[#00d4ff]/20 mt-2"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-400 font-mono text-sm tracking-widest uppercase hover:text-[#00d4ff]"
                onClick={() => setMenuOpen(false)}
              >
                &gt; {item}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
