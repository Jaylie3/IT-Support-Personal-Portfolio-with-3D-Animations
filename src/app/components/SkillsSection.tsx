'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'

const NetworkScene = dynamic(() => import('./SkillsScene').then(m => ({ default: m.NetworkScene })), { ssr: false })
const CloudScene = dynamic(() => import('./SkillsScene').then(m => ({ default: m.CloudScene })), { ssr: false })
const HardwareScene = dynamic(() => import('./SkillsScene').then(m => ({ default: m.HardwareScene })), { ssr: false })

const skills = [
  {
    id: 'networking',
    title: 'Networking',
    subtitle: 'Infrastructure & Protocols',
    tags: ['TCP/IP', 'DNS', 'DHCP', 'VPN', 'Firewall', 'Cisco', 'VLANs'],
    description: 'Designed and maintained enterprise networks. Configured routers, switches, and firewalls. Implemented VPN solutions and monitored network performance.',
    Scene: NetworkScene,
    accent: '#6366f1',
  },
  {
    id: 'cloud',
    title: 'Cloud & SaaS',
    subtitle: 'Azure · AWS · Microsoft 365',
    tags: ['Azure', 'AWS', 'Google Workspace', 'Microsoft 365', 'Active Directory'],
    description: 'Managed cloud infrastructure on Azure and AWS. Administered Microsoft 365 and Google Workspace. Implemented SSO and identity management solutions.',
    Scene: CloudScene,
    accent: '#8b5cf6',
  },
  {
    id: 'hardware',
    title: 'Hardware',
    subtitle: 'Diagnostics & Deployment',
    tags: ['Diagnostics', 'Upgrades', 'BIOS', 'RAID', 'Imaging', 'Asset Mgmt'],
    description: 'Performed hardware diagnostics, upgrades, and repairs. Deployed and imaged workstations at scale. Maintained hardware inventory and lifecycle management.',
    Scene: HardwareScene,
    accent: '#10b981',
  },
]

const additionalSkills = [
  { category: 'Operating Systems', items: ['Windows Server 2019/2022', 'Windows 10/11', 'Ubuntu Linux', 'macOS'] },
  { category: 'Scripting', items: ['PowerShell', 'Python', 'Bash', 'Batch Scripts'] },
  { category: 'Tools', items: ['SCCM/Intune', 'Jira', 'ServiceNow', 'Wireshark', 'SolarWinds'] },
  { category: 'Security', items: ['MFA/2FA', 'Endpoint Protection', 'Patch Management', 'RBAC'] },
]

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      className="glass-card overflow-hidden flex flex-col group"
      style={{ borderColor: `${skill.accent}20` }}
    >
      {/* 3D Scene */}
      <div
        className="h-52 relative overflow-hidden"
        style={{ background: `${skill.accent}08` }}
      >
        <skill.Scene />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 50%, #09090b 100%)`,
          }}
        />
        {/* Accent line on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${skill.accent}, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div>
          <p className="section-label" style={{ color: skill.accent }}>
            {skill.subtitle}
          </p>
          <h3 className="text-xl font-bold text-white mt-1">{skill.title}</h3>
        </div>

        <p className="text-sm text-white/45 leading-relaxed flex-1">{skill.description}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full"
              style={{
                border: `1px solid ${skill.accent}30`,
                color: skill.accent,
                backgroundColor: `${skill.accent}0d`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 70%), #09090b',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Technical Skills</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
            What I <span className="gradient-text">Specialise In</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            From hardware diagnostics to cloud administration — hands-on expertise across the full IT stack.
          </p>
          <div className="divider mx-auto mt-6" />
        </motion.div>

        {/* Skill cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>

        {/* Additional skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {additionalSkills.map((group) => (
            <div
              key={group.category}
              className="glass-card rounded-xl p-5"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">
                {group.category}
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-xs text-white/40 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent-light flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
