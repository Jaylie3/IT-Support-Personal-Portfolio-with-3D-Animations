'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'

const TicketScene = dynamic(() => import('./TicketScene'), { ssr: false })

const tickets = [
  {
    id: '#001',
    category: 'AUTOMATION',
    title: 'System Audit Automator',
    status: 'RESOLVED',
    priority: 'HIGH',
    tech: ['Python', 'PowerShell', 'WMI', 'CSV Export'],
    problem: 'Manual system audits taking 4+ hours per machine. No standardized reporting format. IT team spending excessive time on inventory and compliance checks.',
    resolution: 'Developed a Python/PowerShell automation suite that scans all network machines, collects hardware specs, software inventory, and security compliance data. Generates standardized CSV/HTML reports. Reduced audit time from 4 hours to 8 minutes.',
    metrics: ['95% time reduction', '200+ machines audited', 'Zero manual errors', 'Weekly automation'],
    color: '#00d4ff',
  },
  {
    id: '#002',
    category: 'WEB / SUPPORT',
    title: 'ICT Knowledge Base',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    tech: ['React', 'Tailwind CSS', 'Next.js', 'Markdown'],
    problem: 'Support team repeatedly answering the same questions. No centralized documentation. New staff onboarding taking 3+ weeks due to scattered knowledge.',
    resolution: 'Built a full-stack ICT knowledge base with React and Tailwind CSS. Features include searchable articles, category filtering, step-by-step guides with screenshots, and an admin panel for content management. Integrated with existing ticketing system.',
    metrics: ['60% fewer repeat tickets', '2-week onboarding time', '150+ articles', '4.8/5 staff rating'],
    color: '#00ff88',
  },
  {
    id: '#003',
    category: 'NETWORKING',
    title: 'Virtual AD Lab Setup',
    status: 'RESOLVED',
    priority: 'HIGH',
    tech: ['Windows Server 2022', 'AWS EC2', 'Active Directory', 'Group Policy'],
    problem: 'No safe environment to test Group Policy changes, AD configurations, and security policies before deploying to production. Risk of outages from untested changes.',
    resolution: 'Designed and deployed a virtual Active Directory lab on AWS EC2 using Windows Server 2022. Configured domain controllers, DNS, DHCP, and implemented comprehensive Group Policy objects. Enables safe testing of all AD changes before production deployment.',
    metrics: ['Zero production incidents', 'Full AD replication', '15+ GPOs tested', '100% uptime SLA'],
    color: '#7700ff',
  },
  {
    id: '#004',
    category: 'MONITORING',
    title: 'Office Hardware Monitor',
    status: 'ACTIVE',
    priority: 'LOW',
    tech: ['Node.js', 'Ping API', 'WebSockets', 'Express'],
    problem: 'IT team unaware of device failures until users reported issues. No proactive monitoring of printers, switches, and workstations. Average 45-min delay in incident response.',
    resolution: 'Built a real-time Node.js monitoring dashboard that pings all office devices every 60 seconds. Features color-coded status indicators, incident history, email/SMS alerts, and auto-ticket creation in the helpdesk system when devices go offline.',
    metrics: ['45min → 2min response', '99.9% detection rate', '80 devices monitored', 'Auto-alerting'],
    color: '#ff8800',
  },
]

function TicketCard({ ticket, onOpen }: { ticket: typeof tickets[0]; onOpen: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="cursor-pointer cyber-border rounded-lg p-5 bg-[#0d1117]/60 hover:bg-[#0d1117]/90 transition-all duration-300"
      style={{ borderColor: `${ticket.color}40` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="font-mono text-xs text-gray-500">TICKET {ticket.id}</span>
          <div className="font-mono text-xs tracking-widest mt-1" style={{ color: ticket.color }}>
            [{ticket.category}]
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded border ${
              ticket.status === 'RESOLVED'
                ? 'border-[#00ff88]/40 text-[#00ff88] bg-[#00ff88]/10'
                : 'border-[#ff8800]/40 text-[#ff8800] bg-[#ff8800]/10'
            }`}
          >
            {ticket.status}
          </span>
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded ${
              ticket.priority === 'HIGH'
                ? 'text-red-400'
                : ticket.priority === 'MEDIUM'
                ? 'text-yellow-400'
                : 'text-green-400'
            }`}
          >
            P: {ticket.priority}
          </span>
        </div>
      </div>

      <h3 className="font-mono text-lg font-bold text-white mb-3">{ticket.title}</h3>

      <div className="flex flex-wrap gap-1 mb-4">
        {ticket.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs font-mono rounded"
            style={{ color: ticket.color, backgroundColor: `${ticket.color}15`, border: `1px solid ${ticket.color}30` }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-gray-500">CLICK TO EXPAND</span>
        <span style={{ color: ticket.color }} className="font-mono text-lg">→</span>
      </div>
    </motion.div>
  )
}

function TicketModal({ ticket, onClose }: { ticket: typeof tickets[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#0d1117] border"
        style={{ borderColor: `${ticket.color}60` }}
      >
        {/* Modal header */}
        <div
          className="p-6 border-b flex items-center justify-between sticky top-0 bg-[#0d1117] z-10"
          style={{ borderColor: `${ticket.color}30` }}
        >
          <div>
            <div className="font-mono text-xs text-gray-500 mb-1">TICKET {ticket.id} :: {ticket.category}</div>
            <h2 className="font-mono text-2xl font-bold text-white">{ticket.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-gray-400 hover:text-white text-xl w-10 h-10 flex items-center justify-center border border-gray-600 rounded hover:border-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Details */}
          <div className="space-y-6">
            {/* Problem */}
            <div>
              <div className="font-mono text-xs tracking-widest text-red-400 mb-2">■ PROBLEM_STATEMENT</div>
              <div className="cyber-border rounded p-4 bg-[#0a0a0f]/60 font-mono text-sm text-gray-300 leading-relaxed">
                {ticket.problem}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <div className="font-mono text-xs tracking-widest mb-2" style={{ color: ticket.color }}>
                ✓ RESOLUTION
              </div>
              <div
                className="rounded p-4 font-mono text-sm text-gray-300 leading-relaxed border"
                style={{ borderColor: `${ticket.color}30`, backgroundColor: `${ticket.color}08` }}
              >
                {ticket.resolution}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <div className="font-mono text-xs tracking-widest text-gray-500 mb-2">TECH_STACK</div>
              <div className="flex flex-wrap gap-2">
                {ticket.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-mono rounded-full border"
                    style={{ color: ticket.color, borderColor: `${ticket.color}50`, backgroundColor: `${ticket.color}10` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 3D viz + metrics */}
          <div className="space-y-6">
            {/* 3D Network Visualization */}
            <div className="h-48 rounded border" style={{ borderColor: `${ticket.color}30` }}>
              <TicketScene />
            </div>

            {/* Metrics */}
            <div>
              <div className="font-mono text-xs tracking-widest mb-3" style={{ color: ticket.color }}>
                KEY_METRICS
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ticket.metrics.map((metric, i) => (
                  <motion.div
                    key={metric}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded border text-center"
                    style={{ borderColor: `${ticket.color}30`, backgroundColor: `${ticket.color}08` }}
                  >
                    <div className="font-mono text-xs text-white font-bold">{metric}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div
              className="p-3 rounded border font-mono text-xs flex items-center gap-2"
              style={{ borderColor: `${ticket.color}30`, color: ticket.color }}
            >
              <span className="animate-pulse">●</span>
              STATUS: {ticket.status} | PRIORITY: {ticket.priority}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="portfolio" className="py-24 relative grid-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] opacity-95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-[#00d4ff] text-sm tracking-widest mb-2">SECTION_03</div>
          <h2 className="font-mono text-4xl lg:text-5xl font-bold text-white mb-4">
            INTERACTIVE
            <br />
            <span className="text-[#00d4ff] cyber-glow">TROUBLESHOOTING</span>
          </h2>
          <p className="font-mono text-gray-500 text-sm max-w-md mx-auto">
            Open a ticket to view the problem statement and resolution with 3D visualization
          </p>
          <div className="w-24 h-px bg-[#00d4ff] mx-auto mt-4" />
        </motion.div>

        {/* Ticket grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <TicketCard
                ticket={ticket}
                onOpen={() => setSelectedTicket(ticket)}
              />
            </motion.div>
          ))}
        </div>

        {/* Queue summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 cyber-border rounded p-4 bg-[#0d1117]/40 font-mono text-xs flex flex-wrap gap-6 justify-center text-gray-500"
        >
          <span>QUEUE_TOTAL: {tickets.length}</span>
          <span className="text-[#00ff88]">RESOLVED: {tickets.filter(t => t.status === 'RESOLVED').length}</span>
          <span className="text-[#ff8800]">ACTIVE: {tickets.filter(t => t.status === 'ACTIVE').length}</span>
          <span className="text-[#00d4ff]">SYSTEM: OPERATIONAL</span>
        </motion.div>
      </div>

      {/* Ticket Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
