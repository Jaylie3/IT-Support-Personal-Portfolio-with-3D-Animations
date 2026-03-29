'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const IDENTITY = {
  name: 'Lindokuhle Nkosinathi Jali',
  handle: 'Lindo',
  location: 'Bergville, KZN, South Africa',
  education: 'IIE Rosebank College — GPA 78.60%',
  github: 'https://github.com/Jaylie3',
  githubHandle: 'Jaylie3',
  currentRole: 'ICT Intern @ Okhahlamba DTDC',
}

const ROLES = [
  'ICT Support Specialist',
  'Web Developer',
  'System Administrator',
  'IT Infrastructure Engineer',
]

const stats = [
  { label: 'Tickets Resolved', value: '500+' },
  { label: 'Systems Managed', value: '50+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Years Experience', value: '3+' },
]

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 70%), #09090b',
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-24">
          {/* ── Text Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#34d399',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </motion.div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="gradient-text">{IDENTITY.handle}</span>
              </h1>

              {/* Animated role */}
              <div className="mt-4 h-9 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roleIndex}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-xl lg:text-2xl font-medium text-white/40"
                  >
                    {ROLES[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-base text-white/40 leading-relaxed max-w-md">
              Solving complex IT infrastructure challenges with precision and reliability.
              Currently <span className="text-white/60 font-medium">{IDENTITY.currentRole}</span>{' '}
              in {IDENTITY.location}.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View My Work →
              </motion.a>
              <motion.a
                href={IDENTITY.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-secondary"
              >
                GitHub Profile
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/35 mt-1 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 3D Scene Column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[480px] lg:h-[580px] relative"
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(99,102,241,0.04)',
                border: '1px solid rgba(99,102,241,0.14)',
              }}
            >
              <HeroScene />
            </div>

            {/* Info labels */}
            <div className="absolute top-4 right-4 text-right space-y-1">
              <div className="text-[11px] text-white/20 font-mono">{IDENTITY.education}</div>
              <div className="text-[11px] text-white/20 font-mono">3D Interactive</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-xs"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20 rounded-full" />
        Scroll
      </motion.div>
    </section>
  )
}
