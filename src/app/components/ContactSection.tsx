'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const terminalLines = [
  '> Initializing contact protocol...',
  '> Connection established.',
  '> Ready to receive input.',
  '> Type your message below:',
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      terminalLines.forEach((line, i) => {
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, line])
        }, i * 400)
      })
    }
  }, [inView])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTerminalOutput(prev => [
      ...prev,
      `> SENDING :: ${formData.subject || 'New Message'}`,
      '> Encrypting payload...',
    ])

    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setTerminalOutput(prev => [
        ...prev,
        '> ✓ MESSAGE_DELIVERED',
        '> Response time: <24 hours',
        '> Connection closed.',
      ])
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-24 relative grid-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-[#0d1117] opacity-95" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-[#00d4ff] text-sm tracking-widest mb-2">SECTION_05</div>
          <h2 className="font-mono text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-[#00d4ff] cyber-glow">TERMINAL</span>
            <br />
            CONTACT
          </h2>
          <div className="w-24 h-px bg-[#00d4ff] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terminal Output */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Terminal window */}
            <div className="cyber-border rounded-lg overflow-hidden bg-[#0a0a0f]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a2e] border-b border-[#00d4ff]/20">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-gray-500 ml-2">terminal — contact@it-specialist</span>
              </div>

              <div className="p-4 min-h-[200px] font-mono text-sm">
                {terminalOutput.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`mb-1 ${
                      line.includes('✓') ? 'text-[#00ff88]' :
                      line.includes('ERROR') ? 'text-red-400' :
                      line.startsWith('>') ? 'text-[#00d4ff]' : 'text-gray-400'
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
                {!submitted && (
                  <div className="text-[#00d4ff] mt-2">
                    <span className="terminal-cursor" />
                  </div>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              {[
                { label: 'GITHUB', value: 'github.com/Jaylie3', icon: '⌥' },
                { label: 'LOCATION', value: 'Bergville, KZN, South Africa', icon: '◉' },
                { label: 'RESPONSE', value: 'Within 24 hours', icon: '⏱' },
                { label: 'STATUS', value: 'Open to Opportunities', icon: '●' },
                { label: 'EDUCATION', value: 'IIE Rosebank College — GPA 78.60%', icon: '◈' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 font-mono text-sm cyber-border rounded p-3 bg-[#0d1117]/40"
                >
                  <span className="text-[#00d4ff]">{item.icon}</span>
                  <span className="text-gray-500 text-xs">{item.label}:</span>
                  <span className="text-gray-300 text-xs">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="cyber-border rounded-lg overflow-hidden bg-[#0a0a0f]">
              {/* Form title bar */}
              <div className="px-4 py-3 bg-[#1a1a2e] border-b border-[#00d4ff]/20">
                <span className="font-mono text-xs text-[#00d4ff] tracking-widest">
                  COMPOSE_MESSAGE.sh
                </span>
              </div>

              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="text-6xl">✓</div>
                    <div className="font-mono text-[#00ff88] text-xl">MESSAGE_SENT</div>
                    <div className="font-mono text-gray-400 text-sm">
                      Thank you! I'll get back to you within 24 hours.
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: '', email: '', subject: '', message: '' })
                        setTerminalOutput([])
                      }}
                      className="cyber-button mt-4"
                    >
                      NEW_MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="font-mono text-xs text-gray-500 block mb-1">
                        <span className="text-[#00d4ff]">$</span> NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#0d1117] border border-[#00d4ff]/20 rounded px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#00d4ff] transition-colors placeholder-gray-600"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-mono text-xs text-gray-500 block mb-1">
                        <span className="text-[#00d4ff]">$</span> EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-[#0d1117] border border-[#00d4ff]/20 rounded px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#00d4ff] transition-colors placeholder-gray-600"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="font-mono text-xs text-gray-500 block mb-1">
                        <span className="text-[#00d4ff]">$</span> SUBJECT
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-[#0d1117] border border-[#00d4ff]/20 rounded px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      >
                        <option value="">Select type...</option>
                        <option value="JOB_OPPORTUNITY">JOB_OPPORTUNITY</option>
                        <option value="FREELANCE_PROJECT">FREELANCE_PROJECT</option>
                        <option value="CONSULTATION">CONSULTATION</option>
                        <option value="GENERAL_INQUIRY">GENERAL_INQUIRY</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-mono text-xs text-gray-500 block mb-1">
                        <span className="text-[#00d4ff]">$</span> MESSAGE
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Describe your inquiry..."
                        className="w-full bg-[#0d1117] border border-[#00d4ff]/20 rounded px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none placeholder-gray-600"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full cyber-button"
                    >
                      {sending ? 'TRANSMITTING...' : 'SEND_MESSAGE →'}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center font-mono text-xs text-gray-600 space-y-2"
        >
          <div className="w-full h-px bg-[#00d4ff]/10 mb-6" />
          <div>LINDOKUHLE JALI // ICT SUPPORT SPECIALIST // BUILT WITH NEXT.JS + THREE.JS</div>
          <div className="text-[#00d4ff]/40">© 2025 LINDO.DEV — ALL SYSTEMS OPERATIONAL</div>
        </motion.div>
      </div>
    </section>
  )
}
