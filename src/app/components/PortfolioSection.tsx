'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'

const TicketScene = dynamic(() => import('./TicketScene'), { ssr: false })

const tickets = [
  {
    id: '#001',
    category: 'IDENTITY',
    title: 'Nexus Directory',
    pitch: 'Architected a secure domain environment with GPO-enforced security protocols.',
    status: 'RESOLVED',
    priority: 'HIGH',
    tech: ['Windows Server 2022', 'Active Directory', 'Group Policy', 'DNS/DHCP', 'AWS EC2'],
    problem: 'No safe environment to test Group Policy changes, AD configurations, and security policies before deploying to production. User accounts scattered across departments with inconsistent access controls.',
    resolution: 'Architected a full Active Directory domain on AWS EC2 with Windows Server 2022. Configured organizational units, GPO-enforced security protocols (password policies, USB lockdown, screensaver timeout), DNS, DHCP, and roaming profiles. Zero production incidents from untested changes.',
    metrics: ['15+ GPOs Deployed', 'Zero Production Incidents', 'AD Replication 100%', 'Full Domain Trust'],
    color: '#00d4ff',
  },
  {
    id: '#002',
    category: 'OPERATIONS',
    title: 'ServiceHub ICT',
    pitch: 'Deployed an end-to-end ITIL-aligned ticketing system for streamlined support.',
    status: 'RESOLVED',
    priority: 'HIGH',
    tech: ['osTicket', 'PHP', 'MySQL', 'ITIL v4', 'Email Integration'],
    problem: 'Support requests arriving via WhatsApp, email, and phone with no centralized tracking. No SLA enforcement, no escalation paths, and no historical data for recurring issues.',
    resolution: 'Deployed and customized osTicket as a full ITIL-aligned helpdesk. Configured departments, ticket priorities, SLA plans, canned responses, and automated email routing. Integrated with staff AD accounts for single sign-on. Reduced average resolution time by 40%.',
    metrics: ['40% Faster Resolution', '500+ Tickets Managed', 'SLA Compliance 94%', 'ITIL-Aligned Workflow'],
    color: '#00ff88',
  },
  {
    id: '#003',
    category: 'AUTOMATION',
    title: 'SysPulse Automator',
    pitch: 'Optimized system audits and user onboarding using custom automation scripts.',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    tech: ['PowerShell', 'Python', 'WMI', 'Active Directory', 'HTML Reports'],
    problem: 'Manual system audits taking 4+ hours per machine. New user onboarding requiring 2 hours of manual steps. No standardized reporting format for compliance checks.',
    resolution: 'Developed a PowerShell/Python automation suite handling hardware audits, software inventory, and new user provisioning. Scripts collect CPU, RAM, disk health, serial numbers, and installed apps, then generate HTML reports. Onboarding time cut from 2 hours to 8 minutes.',
    metrics: ['95% Time Reduction', '200+ Machines Audited', '8-Min Onboarding', 'Zero Manual Errors'],
    color: '#7700ff',
  },
  {
    id: '#004',
    category: 'CLOUD',
    title: 'CloudOrbit Admin',
    pitch: 'Provisioned and secured SaaS environments with MFA and conditional access.',
    status: 'RESOLVED',
    priority: 'HIGH',
    tech: ['Microsoft 365', 'Azure AD', 'Intune MDM', 'Conditional Access', 'MFA Enforcement'],
    problem: 'Remote staff accessing company data from unmanaged personal devices. No MFA enforcement, no device compliance policies, and Shadow IT causing security gaps across the department.',
    resolution: 'Provisioned and hardened a Microsoft 365 tenant with Azure AD. Implemented Conditional Access policies, enforced MFA for all users, enrolled 100+ devices into Intune MDM, and created compliance baselines. Reduced unauthorized access attempts by 90%.',
    metrics: ['MFA: 100% Enforced', '100+ Devices Enrolled', '90% Less Unauthorized Access', 'Zero Shadow IT Incidents'],
    color: '#ff8800',
  },
  {
    id: '#005',
    category: 'DOCUMENTATION',
    title: 'WikiFix Pro',
    pitch: 'Developed a centralized technical repository to reduce recurring ticket volume.',
    status: 'ACTIVE',
    priority: 'LOW',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Markdown', 'Search Indexing'],
    problem: 'Support team repeatedly answering the same questions. New staff onboarding taking 3+ weeks due to scattered tribal knowledge. No searchable knowledge base for common fixes.',
    resolution: 'Built a full-stack ICT knowledge base with React and Next.js. Features searchable articles, category filtering, step-by-step guides with screenshots, and an admin panel for content management. Reduced recurring tickets by 60%.',
    metrics: ['60% Fewer Repeat Tickets', '2-Week Onboarding', '150+ Articles', '4.8/5 Staff Rating'],
    color: '#ff4488',
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

      <h3 className="font-mono text-lg font-bold text-white mb-1">{ticket.title}</h3>
      <p className="font-mono text-xs text-gray-500 mb-3 leading-relaxed">{ticket.pitch}</p>

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
          <div className="font-mono text-[#00d4ff] text-sm tracking-widest mb-2">SECTION_04</div>
          <h2 className="font-mono text-4xl lg:text-5xl font-bold text-white mb-4">
            PROJECT
            <br />
            <span className="text-[#00d4ff] cyber-glow">ARCHIVE</span>
          </h2>
          <p className="font-mono text-gray-500 text-sm max-w-md mx-auto">
            Real-world IT projects — click a ticket to explore the problem, solution, and key metrics
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
