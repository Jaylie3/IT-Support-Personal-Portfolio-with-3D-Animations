'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contactInfo = [
  { label: 'GitHub', value: 'github.com/Jaylie3', href: 'https://github.com/Jaylie3', icon: '⌥' },
  { label: 'Location', value: 'Bergville, KZN, South Africa', icon: '◉' },
  { label: 'Response time', value: 'Within 24 hours', icon: '⏱' },
  { label: 'Status', value: 'Open to Opportunities', icon: '●' },
  { label: 'Education', value: 'IIE Rosebank College — GPA 78.60%', icon: '◈' },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 1800)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%), #09090b',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Open to job opportunities, freelance projects, and consultations.
            I typically respond within 24 hours.
          </p>
          <div className="divider mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Lindokuhle Nkosinathi Jali</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                ICT Support Specialist &amp; Web Developer currently interning at Okhahlamba DTDC.
                Available for full-time roles, freelance work, and consultations.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="glass-card rounded-xl p-4 flex items-center gap-3"
                >
                  <span className="text-accent-light text-base w-5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-xs text-white/30 font-medium">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm text-white/70">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
          >
            <div
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-14 space-y-4"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
                  >
                    ✓
                  </div>
                  <div className="text-xl font-bold text-white">Message sent!</div>
                  <div className="text-white/40 text-sm">
                    Thank you! I&apos;ll get back to you within 24 hours.
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="btn-secondary mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/40">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:ring-1 focus:ring-accent"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/40">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:ring-1 focus:ring-accent"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/40">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors focus:ring-1 focus:ring-accent"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <option value="" className="bg-[#18181b]">Select a topic…</option>
                      <option value="job" className="bg-[#18181b]">Job Opportunity</option>
                      <option value="freelance" className="bg-[#18181b]">Freelance Project</option>
                      <option value="consultation" className="bg-[#18181b]">Consultation</option>
                      <option value="general" className="bg-[#18181b]">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/40">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or inquiry…"
                      className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors resize-none focus:ring-1 focus:ring-accent"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary justify-center py-3"
                    style={{ opacity: sending ? 0.7 : 1 }}
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-20 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="text-sm text-white/20 mb-1">Lindokuhle Jali · ICT Support Specialist & Web Developer</div>
          <div className="text-xs text-white/12">Built with Next.js, Three.js & Framer Motion · © 2025</div>
        </motion.div>
      </div>
    </section>
  )
}
