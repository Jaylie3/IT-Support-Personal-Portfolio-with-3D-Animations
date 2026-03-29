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
    title: 'NETWORKING',
    subtitle: '3D Pulsing Node Map',
    tags: ['TCP/IP', 'DNS', 'DHCP', 'VPN', 'Firewall', 'Cisco', 'VLANs'],
    description: 'Designed and maintained enterprise networks. Configured routers, switches, and firewalls. Implemented VPN solutions and monitored network performance.',
    Scene: NetworkScene,
    color: '#00d4ff',
  },
  {
    id: 'cloud',
    title: 'CLOUD / SaaS',
    subtitle: 'Orbiting Cloud Platforms',
    tags: ['Azure', 'AWS', 'Google Workspace', 'Microsoft 365', 'Active Directory'],
    description: 'Managed cloud infrastructure on Azure and AWS. Administered Microsoft 365 and Google Workspace. Implemented SSO and identity management solutions.',
    Scene: CloudScene,
    color: '#4488ff',
  },
  {
    id: 'hardware',
    title: 'HARDWARE',
    subtitle: 'Interactive 3D Workstation',
    tags: ['Diagnostics', 'Upgrades', 'BIOS', 'RAID', 'Imaging', 'Asset Mgmt'],
    description: 'Performed hardware diagnostics, upgrades, and repairs. Deployed and imaged workstations at scale. Maintained hardware inventory and lifecycle management.',
    Scene: HardwareScene,
    color: '#00ff88',
  },
]

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="cyber-border rounded-lg overflow-hidden bg-[#0d1117]/60 hover:bg-[#0d1117]/80 transition-all duration-300 group"
      style={{ borderColor: `${skill.color}40` }}
    >
      {/* 3D Scene */}
      <div className="h-56 relative bg-[#0a0a0f]/50">
        <skill.Scene />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 50%, #0a0a0f 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <div className="font-mono text-xs tracking-widest mb-1" style={{ color: skill.color }}>
            MODULE :: {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="font-mono text-xl font-bold text-white">{skill.title}</h3>
          <p className="font-mono text-xs text-gray-500 mt-1">{skill.subtitle}</p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed font-mono">
          {skill.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono rounded border"
              style={{
                borderColor: `${skill.color}40`,
                color: skill.color,
                backgroundColor: `${skill.color}10`,
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

const additionalSkills = [
  { category: 'OS', items: ['Windows Server 2019/2022', 'Windows 10/11', 'Ubuntu Linux', 'macOS'] },
  { category: 'SCRIPTING', items: ['PowerShell', 'Python', 'Bash', 'Batch Scripts'] },
  { category: 'TOOLS', items: ['SCCM/Intune', 'Jira', 'ServiceNow', 'Wireshark', 'SolarWinds'] },
  { category: 'SECURITY', items: ['MFA/2FA', 'Endpoint Protection', 'Patch Management', 'RBAC'] },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="skills" className="py-24 relative grid-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] opacity-95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-[#00d4ff] text-sm tracking-widest mb-2">SECTION_02</div>
          <h2 className="font-mono text-4xl lg:text-5xl font-bold text-white mb-4">
            THE <span className="text-[#00d4ff] cyber-glow">HARDWARE</span>
            <br />
            OF MY SKILLS
          </h2>
          <div className="w-24 h-px bg-[#00d4ff] mx-auto" />
        </motion.div>

        {/* 3D Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>

        {/* Additional skills grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {additionalSkills.map((group) => (
            <div key={group.category} className="cyber-border rounded p-4 bg-[#0d1117]/40">
              <div className="font-mono text-[#00d4ff] text-xs tracking-widest mb-3">{group.category}</div>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-xs text-gray-400 flex items-center gap-2">
                    <span className="text-[#00ff88]">▸</span> {item}
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
