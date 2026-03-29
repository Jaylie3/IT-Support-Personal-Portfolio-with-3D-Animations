'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'

const TicketScene = dynamic(() => import('./TicketScene'), { ssr: false })

const projects = [
  {
    id: '#001',
    category: 'Identity & Access',
    title: 'Nexus Directory',
    pitch: 'Architected a secure domain environment with GPO-enforced security protocols.',
    status: 'Completed',
    priority: 'High',
    tech: ['Windows Server 2022', 'Active Directory', 'Group Policy', 'DNS/DHCP', 'AWS EC2'],
    problem: 'No safe environment to test Group Policy changes, AD configurations, and security policies before deploying to production. User accounts scattered across departments with inconsistent access controls.',
    resolution: 'Architected a full Active Directory domain on AWS EC2 with Windows Server 2022. Configured organizational units, GPO-enforced security protocols (password policies, USB lockdown, screensaver timeout), DNS, DHCP, and roaming profiles. Zero production incidents from untested changes.',
    metrics: ['15+ GPOs Deployed', 'Zero Production Incidents', 'AD Replication 100%', 'Full Domain Trust'],
    accent: '#6366f1',
  },
  {
    id: '#002',
    category: 'IT Operations',
    title: 'ServiceHub ICT',
    pitch: 'Deployed an end-to-end ITIL-aligned ticketing system for streamlined support.',
    status: 'Completed',
    priority: 'High',
    tech: ['osTicket', 'PHP', 'MySQL', 'ITIL v4', 'Email Integration'],
    problem: 'Support requests arriving via WhatsApp, email, and phone with no centralized tracking. No SLA enforcement, no escalation paths, and no historical data for recurring issues.',
    resolution: 'Deployed and customized osTicket as a full ITIL-aligned helpdesk. Configured departments, ticket priorities, SLA plans, canned responses, and automated email routing. Integrated with staff AD accounts for single sign-on. Reduced average resolution time by 40%.',
    metrics: ['40% Faster Resolution', '500+ Tickets Managed', 'SLA Compliance 94%', 'ITIL-Aligned Workflow'],
    accent: '#10b981',
  },
  {
    id: '#003',
    category: 'Automation',
    title: 'SysPulse Automator',
    pitch: 'Optimized system audits and user onboarding using custom automation scripts.',
    status: 'Completed',
    priority: 'Medium',
    tech: ['PowerShell', 'Python', 'WMI', 'Active Directory', 'HTML Reports'],
    problem: 'Manual system audits taking 4+ hours per machine. New user onboarding requiring 2 hours of manual steps. No standardized reporting format for compliance checks.',
    resolution: 'Developed a PowerShell/Python automation suite handling hardware audits, software inventory, and new user provisioning. Scripts collect CPU, RAM, disk health, serial numbers, and installed apps, then generate HTML reports. Onboarding time cut from 2 hours to 8 minutes.',
    metrics: ['95% Time Reduction', '200+ Machines Audited', '8-Min Onboarding', 'Zero Manual Errors'],
    accent: '#8b5cf6',
  },
  {
    id: '#004',
    category: 'Cloud Security',
    title: 'CloudOrbit Admin',
    pitch: 'Provisioned and secured SaaS environments with MFA and conditional access.',
    status: 'Completed',
    priority: 'High',
    tech: ['Microsoft 365', 'Azure AD', 'Intune MDM', 'Conditional Access', 'MFA Enforcement'],
    problem: 'Remote staff accessing company data from unmanaged personal devices. No MFA enforcement, no device compliance policies, and Shadow IT causing security gaps across the department.',
    resolution: 'Provisioned and hardened a Microsoft 365 tenant with Azure AD. Implemented Conditional Access policies, enforced MFA for all users, enrolled 100+ devices into Intune MDM, and created compliance baselines. Reduced unauthorized access attempts by 90%.',
    metrics: ['MFA: 100% Enforced', '100+ Devices Enrolled', '90% Less Unauthorized Access', 'Zero Shadow IT Incidents'],
    accent: '#f59e0b',
  },
  {
    id: '#005',
    category: 'Web Development',
    title: 'WikiFix Pro',
    pitch: 'Built a centralized technical knowledge base to cut recurring ticket volume.',
    status: 'In Progress',
    priority: 'Low',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Markdown', 'Search Indexing'],
    problem: 'Support team repeatedly answering the same questions. New staff onboarding taking 3+ weeks due to scattered tribal knowledge. No searchable knowledge base for common fixes.',
    resolution: 'Built a full-stack ICT knowledge base with React and Next.js. Features searchable articles, category filtering, step-by-step guides with screenshots, and an admin panel for content management. Reduced recurring tickets by 60%.',
    metrics: ['60% Fewer Repeat Tickets', '2-Week Onboarding', '150+ Articles', '4.8/5 Staff Rating'],
    accent: '#ec4899',
  },
]

const priorityColor: Record<string, string> = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#10b981',
}

function ProjectCard({ project, onOpen }: { project: typeof projects[0]; onOpen: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="glass-card cursor-pointer p-6 flex flex-col gap-4 group"
      style={{ borderColor: `${project.accent}18` }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-mono text-white/25">{project.id}</span>
          <div
            className="text-xs font-semibold uppercase tracking-widest mt-1"
            style={{ color: project.accent }}
          >
            {project.category}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
            style={{
              color: project.status === 'Completed' ? '#34d399' : '#fbbf24',
              background:
                project.status === 'Completed'
                  ? 'rgba(16,185,129,0.1)'
                  : 'rgba(245,158,11,0.1)',
              border: `1px solid ${project.status === 'Completed' ? 'rgba(52,211,153,0.25)' : 'rgba(251,191,36,0.25)'}`,
            }}
          >
            {project.status}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: priorityColor[project.priority] }}
          >
            {project.priority} priority
          </span>
        </div>
      </div>

      {/* Title + pitch */}
      <div>
        <h3 className="text-lg font-bold text-white mb-1.5">{project.title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">{project.pitch}</p>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              color: project.accent,
              background: `${project.accent}10`,
              border: `1px solid ${project.accent}25`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between pt-1 mt-auto">
        <span className="text-xs text-white/25">Click to expand</span>
        <motion.span
          className="text-sm"
          style={{ color: project.accent }}
          animate={{ x: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        transition={{ type: 'spring', bounce: 0.15 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#18181b]"
        style={{ border: `1px solid ${project.accent}25` }}
      >
        {/* Header */}
        <div
          className="p-6 flex items-center justify-between sticky top-0 bg-[#18181b] z-10"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
        >
          <div>
            <div className="text-xs text-white/30 mb-1 font-mono">{project.id} · {project.category}</div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-5">
            {/* Problem */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">Problem</div>
              <div
                className="rounded-xl p-4 text-sm text-white/60 leading-relaxed"
                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}
              >
                {project.problem}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: project.accent }}
              >
                Solution
              </div>
              <div
                className="rounded-xl p-4 text-sm text-white/60 leading-relaxed"
                style={{
                  background: `${project.accent}06`,
                  border: `1px solid ${project.accent}20`,
                }}
              >
                {project.resolution}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      color: project.accent,
                      border: `1px solid ${project.accent}35`,
                      background: `${project.accent}08`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {/* 3D viz */}
            <div
              className="h-48 rounded-xl overflow-hidden"
              style={{ background: `${project.accent}06`, border: `1px solid ${project.accent}18` }}
            >
              <TicketScene />
            </div>

            {/* Metrics */}
            <div>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: project.accent }}
              >
                Key Results
              </div>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={metric}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-3 rounded-xl text-center"
                    style={{
                      border: `1px solid ${project.accent}20`,
                      background: `${project.accent}06`,
                    }}
                  >
                    <div className="text-xs font-semibold text-white">{metric}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div
              className="p-3 rounded-xl flex items-center gap-2 text-sm font-medium"
              style={{
                border: `1px solid ${project.accent}20`,
                color: project.accent,
                background: `${project.accent}06`,
              }}
            >
              <span className="animate-pulse">●</span>
              {project.status} · {project.priority} Priority
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139,92,246,0.07) 0%, transparent 70%), #09090b',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Portfolio</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Real-world IT projects — click any card to explore the problem, solution, and results.
          </p>
          <div className="divider mx-auto mt-6" />
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <ProjectCard project={project} onOpen={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 glass rounded-xl p-4 flex flex-wrap gap-6 justify-center text-sm text-white/30"
        >
          <span>{projects.length} projects total</span>
          <span className="text-emerald-400/60">
            {projects.filter((p) => p.status === 'Completed').length} completed
          </span>
          <span className="text-amber-400/60">
            {projects.filter((p) => p.status === 'In Progress').length} in progress
          </span>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
