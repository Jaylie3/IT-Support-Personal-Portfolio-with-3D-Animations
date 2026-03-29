'use client'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TerminalLine = {
  text: string
  type: 'input' | 'output' | 'error' | 'success' | 'system'
}

const COMMANDS: Record<string, TerminalLine[]> = {
  '/about': [
    { text: '━━ IDENTITY RECORD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
    { text: 'Name    : Lindokuhle Nkosinathi Jali (Lindo)', type: 'output' },
    { text: 'Role    : ICT Support Specialist & Web Developer', type: 'output' },
    { text: 'Location: Bergville, KZN, South Africa', type: 'output' },
    { text: 'Edu     : IIE Rosebank College — GPA 78.60%', type: 'output' },
    { text: 'Current : ICT Intern @ Okhahlamba DTDC', type: 'success' },
    { text: 'GitHub  : github.com/Jaylie3', type: 'output' },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
  ],
  '/projects': [
    { text: '━━ PROJECT MANIFEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
    { text: '[#001] Nexus Directory    — AD/GPO/AWS [RESOLVED]', type: 'success' },
    { text: '[#002] ServiceHub ICT     — osTicket/ITIL [RESOLVED]', type: 'success' },
    { text: '[#003] SysPulse Automator — PowerShell/Python [RESOLVED]', type: 'success' },
    { text: '[#004] CloudOrbit Admin   — M365/Intune/Azure [RESOLVED]', type: 'success' },
    { text: '[#005] WikiFix Pro        — React/Next.js [ACTIVE]', type: 'output' },
    { text: '=> Type /open <id> to view ticket detail', type: 'system' },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
  ],
  '/ping': [
    { text: 'PING lindo.dev (127.0.0.1) 56 bytes of data.', type: 'output' },
    { text: '64 bytes from lindo.dev: icmp_seq=1 ttl=64 time=0.42 ms', type: 'success' },
    { text: '64 bytes from lindo.dev: icmp_seq=2 ttl=64 time=0.38 ms', type: 'success' },
    { text: '64 bytes from lindo.dev: icmp_seq=3 ttl=64 time=0.41 ms', type: 'success' },
    { text: '--- lindo.dev ping statistics ---', type: 'output' },
    { text: '3 packets transmitted, 3 received, 0% packet loss', type: 'success' },
  ],
  '/skills': [
    { text: '━━ SKILLSET ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
    { text: 'NETWORKING : TCP/IP, DNS, DHCP, VPN, Firewall, Cisco', type: 'output' },
    { text: 'CLOUD      : Azure AD, AWS, Microsoft 365, Intune', type: 'output' },
    { text: 'SCRIPTING  : PowerShell, Python, Bash, JavaScript', type: 'output' },
    { text: 'WEB        : React, Next.js, Tailwind CSS, Node.js', type: 'output' },
    { text: 'HARDWARE   : Diagnostics, Imaging, BIOS, RAID, Assets', type: 'output' },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
  ],
  '/contact': [
    { text: '━━ CONTACT CHANNELS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
    { text: 'GitHub  : github.com/Jaylie3', type: 'success' },
    { text: 'Location: Bergville, KZN, South Africa', type: 'output' },
    { text: 'Response: Within 24 hours', type: 'output' },
    { text: 'Status  : Open to Opportunities', type: 'success' },
    { text: '=> Scroll to TERMINAL CONTACT section to send a message', type: 'system' },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
  ],
  '/help': [
    { text: '━━ AVAILABLE COMMANDS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
    { text: '/about     — Identity & background', type: 'output' },
    { text: '/projects  — List of resolved support tickets', type: 'output' },
    { text: '/skills    — Technical skillset overview', type: 'output' },
    { text: '/contact   — Contact channels', type: 'output' },
    { text: '/ping      — Check system connectivity', type: 'output' },
    { text: '/clear     — Clear terminal output', type: 'output' },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'system' },
  ],
}

const NAV_COMMANDS: Record<string, string> = {
  '/home': '#home',
  '/skills': '#skills',
  '/tools': '#arsenal',
  '/portfolio': '#portfolio',
  '/contact': '#contact',
}

const BOOT_LINES: TerminalLine[] = [
  { text: 'LINDO-OS v3.0 — IT Command Center', type: 'system' },
  { text: 'System booted. All modules online.', type: 'success' },
  { text: 'Type /help to list available commands.', type: 'output' },
]

export default function PersistentTerminal() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<TerminalLine[]>(BOOT_LINES)
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    const newLines: TerminalLine[] = [{ text: `> ${raw}`, type: 'input' }]

    if (cmd === '/clear') {
      setLines(BOOT_LINES)
      return
    }

    if (COMMANDS[cmd]) {
      newLines.push(...COMMANDS[cmd])
    } else if (cmd.startsWith('/open ')) {
      const id = cmd.split(' ')[1]
      newLines.push({ text: `Opening ticket ${id}... scroll to Portfolio section.`, type: 'success' })
      // Navigate to portfolio section
      setTimeout(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    } else if (NAV_COMMANDS[cmd]) {
      newLines.push({ text: `Navigating to ${cmd.slice(1)}...`, type: 'success' })
      setTimeout(() => {
        document.querySelector(NAV_COMMANDS[cmd])?.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    } else {
      newLines.push({
        text: `Command not found: "${raw}". Type /help for available commands.`,
        type: 'error',
      })
    }

    setLines((prev) => [...prev, ...newLines])
    setHistory((prev) => [raw, ...prev.slice(0, 49)])
    setHistIdx(-1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIdx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(nextIdx)
      setInput(history[nextIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = Math.max(histIdx - 1, -1)
      setHistIdx(nextIdx)
      setInput(nextIdx === -1 ? '' : history[nextIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50 font-mono text-xs tracking-widest px-4 py-2 rounded"
        style={{
          background: 'rgba(10,10,15,0.9)',
          border: '1px solid rgba(0,212,255,0.5)',
          color: '#00d4ff',
          boxShadow: '0 0 15px rgba(0,212,255,0.2)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {open ? '[_] TERMINAL' : '[>] TERMINAL'}
      </motion.button>

      {/* Terminal panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40"
            style={{
              height: '280px',
              background: 'rgba(8,8,12,0.96)',
              borderTop: '1px solid rgba(0,212,255,0.3)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 -8px 40px rgba(0,212,255,0.1)',
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderBottom: '1px solid rgba(0,212,255,0.15)' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
                </div>
                <span className="font-mono text-xs text-[#00d4ff]/60 tracking-widest">
                  lindo@it-command-center:~
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-gray-600 hover:text-gray-300 text-xs transition-colors"
              >
                [X]
              </button>
            </div>

            {/* Output area */}
            <div
              className="overflow-y-auto px-4 pt-2 pb-1"
              style={{ height: 'calc(100% - 72px)' }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className="font-mono text-xs leading-5"
                  style={{
                    color:
                      line.type === 'input' ? '#00d4ff'
                      : line.type === 'success' ? '#00ff88'
                      : line.type === 'error' ? '#ff4444'
                      : line.type === 'system' ? 'rgba(0,212,255,0.5)'
                      : '#9ca3af',
                  }}
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              className="flex items-center px-4 py-2"
              style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}
            >
              <span className="font-mono text-xs text-[#00d4ff] mr-2">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type /help for commands..."
                className="flex-1 bg-transparent font-mono text-xs text-gray-200 outline-none placeholder-gray-700 caret-[#00d4ff]"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
