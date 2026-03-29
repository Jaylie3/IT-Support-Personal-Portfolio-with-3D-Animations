'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const systemStats = [
  { label: 'UPTIME', value: '99.9%', color: '#00ff88' },
  { label: 'TICKETS_RESOLVED', value: '500+', color: '#00d4ff' },
  { label: 'SYSTEMS_MANAGED', value: '50+', color: '#00d4ff' },
  { label: 'RESPONSE_TIME', value: '<2min', color: '#00ff88' },
  { label: 'SATISFACTION', value: '98%', color: '#00ff88' },
  { label: 'YEARS_EXP', value: '3+', color: '#7700ff' },
]

export default function HeroSection() {
  const [showStats, setShowStats] = useState(false)
  const [typedText, setTypedText] = useState('')
  const fullText = 'Solving complex problems through stable systems.'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#1a1a2e] opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2">
              <span className="text-[#00ff88] font-mono text-sm animate-pulse">●</span>
              <span className="text-[#00ff88] font-mono text-sm tracking-widest">SYSTEM_ONLINE</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold font-mono leading-tight">
              <span className="text-white">IT</span>
              <br />
              <span className="text-[#00d4ff] cyber-glow">SUPPORT</span>
              <br />
              <span className="text-white">SPECIALIST</span>
            </h1>

            <div className="font-mono text-gray-400 text-lg min-h-[2rem]">
              <span className="text-[#00d4ff]">&gt;</span> {typedText}
              <span className="terminal-cursor" />
            </div>

            <p className="text-gray-500 font-mono text-sm leading-relaxed max-w-md">
              Specialized in IT Infrastructure & User Experience.<br />
              Building resilient networks, automating workflows,<br />
              and keeping systems running at peak performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowStats(!showStats)}
                className="cyber-button scan-line"
              >
                {showStats ? 'CLOSE_STATS' : 'SYSTEM_CHECK'}
              </motion.button>

              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button text-center"
                style={{ borderColor: '#00ff88', color: '#00ff88' }}
              >
                VIEW_WORK
              </motion.a>
            </div>

            {/* Stats Panel */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="cyber-border rounded bg-[#0d1117]/80 p-4"
                >
                  <div className="font-mono text-[#00d4ff] text-xs mb-3 tracking-widest">
                    SYSTEM_DIAGNOSTICS :: RUNNING...
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {systemStats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0a0a0f]/60 p-2 rounded border border-[#00d4ff]/10"
                      >
                        <div className="text-gray-500 font-mono text-xs">{stat.label}</div>
                        <div
                          className="font-mono text-lg font-bold"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[500px] lg:h-[600px] relative"
          >
            <HeroScene />

            {/* Overlay labels */}
            <div className="absolute top-4 right-4 font-mono text-xs text-[#00d4ff]/60 space-y-1">
              <div>SYS_TEMP: 42°C</div>
              <div>CPU: 12%</div>
              <div>RAM: 64GB</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-[#00d4ff]/40 text-xs text-center"
      >
        <div>▼ SCROLL ▼</div>
      </motion.div>
    </section>
  )
}
