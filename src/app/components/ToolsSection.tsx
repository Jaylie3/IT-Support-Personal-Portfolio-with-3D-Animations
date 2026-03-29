'use client'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

// ─────────────────────────── Shared types ───────────────────────────

type HoverRef = { current: number }

// ─────────────────────────── Ventoy Scene ───────────────────────────

function OrbitingNode({
  index,
  total,
  hoverT,
  color,
}: {
  index: number
  total: number
  hoverT: HoverRef
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const baseAngle = (index / total) * Math.PI * 2

  useFrame((state) => {
    if (!meshRef.current) return
    const t = hoverT.current
    const radius = 0.25 + t * 1.15
    const angle = baseAngle + state.clock.elapsedTime * 1.5
    meshRef.current.position.x = Math.cos(angle) * radius
    meshRef.current.position.z = Math.sin(angle) * radius
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.2 * t
    ;(meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + t * 1.5
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.14, 10, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  )
}

function VentoyScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const hoverT = useRef(0)

  useFrame(() => {
    hoverT.current += ((hovered ? 1 : 0) - hoverT.current) * 0.08
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008 + hoverT.current * 0.015
    }
  })

  return (
    <group ref={groupRef}>
      {/* USB body */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.55, 1.1, 0.22]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {/* USB connector */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.38, 0.28, 0.18]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* LED */}
      <mesh position={[0, 0.1, 0.13]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <OrbitingNode
          key={i}
          index={i}
          total={3}
          hoverT={hoverT}
          color={(['#00d4ff', '#ff8800', '#7700ff'] as const)[i]}
        />
      ))}
    </group>
  )
}

// ─────────────────────────── Intune Scene ───────────────────────────

function HubNode({ hoverT }: { hoverT: HoverRef }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.3 + hoverT.current * 0.5
    ref.current.rotation.y += 0.012
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#0078d4" emissive="#0078d4" emissiveIntensity={1} />
    </mesh>
  )
}

function DeviceNode({
  index,
  total,
  hoverT,
}: {
  index: number
  total: number
  hoverT: HoverRef
}) {
  const ref = useRef<THREE.Mesh>(null)
  const baseAngle = (index / total) * Math.PI * 2

  useFrame((state) => {
    if (!ref.current) return
    const t = hoverT.current
    const radius = 1.15 + t * 0.25
    const speed = 0.35 + t * 0.35
    const angle = baseAngle + state.clock.elapsedTime * speed
    ref.current.position.x = Math.cos(angle) * radius
    ref.current.position.z = Math.sin(angle) * radius
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.15
    ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + t * 1.2
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.18, 0.12, 0.04]} />
      <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
    </mesh>
  )
}

function PulseRing({ hoverT, delay }: { hoverT: HoverRef; delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const phase = useRef(delay)

  useFrame((state) => {
    if (!ref.current) return
    phase.current += 0.012 * (1 + hoverT.current * 2)
    const scale = (phase.current % 1) * 2.5 + 0.3
    ref.current.scale.setScalar(scale)
    ;(ref.current.material as THREE.MeshStandardMaterial).opacity =
      (1 - (phase.current % 1)) * 0.4 * hoverT.current
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.45, 0.5, 32]} />
      <meshStandardMaterial
        color="#00ff88"
        emissive="#00ff88"
        emissiveIntensity={1}
        transparent
        opacity={0}
      />
    </mesh>
  )
}

function IntuneScene({ hovered }: { hovered: boolean }) {
  const hoverT = useRef(0)
  useFrame(() => {
    hoverT.current += ((hovered ? 1 : 0) - hoverT.current) * 0.06
  })
  return (
    <group>
      <HubNode hoverT={hoverT} />
      {Array.from({ length: 8 }, (_, i) => (
        <DeviceNode key={i} index={i} total={8} hoverT={hoverT} />
      ))}
      <PulseRing hoverT={hoverT} delay={0} />
      <PulseRing hoverT={hoverT} delay={0.4} />
      <PulseRing hoverT={hoverT} delay={0.7} />
    </group>
  )
}

// ─────────────────────────── Ninite Visual (CSS only) ───────────────

const appNames = ['Chrome', 'VLC', '7-Zip', 'Zoom', 'Notepad++', 'Firefox', 'Teams', 'WinRAR']

function NiniteVisual({ hovered }: { hovered: boolean }) {
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const nameInterval = setInterval(() => {
      setIdx((p) => (p + 1) % appNames.length)
    }, 700)
    return () => clearInterval(nameInterval)
  }, [])

  useEffect(() => {
    let frame: number
    let val = 0
    const animate = () => {
      val = hovered ? Math.min(val + 3, 100) : (val + 1.2) % 102
      setProgress(val)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [hovered])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-4">
      <div className="font-mono text-[#00ff88] text-xs tracking-widest animate-pulse">
        INSTALLING PACKAGES...
      </div>
      <div className="font-mono text-white text-sm font-bold min-h-[1.25rem]">
        {appNames[idx]}
      </div>
      <div className="w-full space-y-1">
        <div className="flex justify-between font-mono text-xs text-gray-500">
          <span>PROGRESS</span>
          <span style={{ color: '#00ff88' }}>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-[#001a0a] rounded-full border border-[#00ff88]/30 overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
              boxShadow: '0 0 8px #00ff88',
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 w-full mt-1">
        {appNames.slice(0, 8).map((app, i) => (
          <div
            key={app}
            className="font-mono text-[9px] text-center py-0.5 rounded border"
            style={{
              borderColor: '#00ff8830',
              color: i <= idx ? '#00ff88' : '#333',
              backgroundColor: i <= idx ? '#00ff8810' : 'transparent',
            }}
          >
            {app.slice(0, 4)}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────── AnyDesk Scene ──────────────────────────

function AnyDeskScene({ hovered }: { hovered: boolean }) {
  const hoverT = useRef(0)
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 60

  const particleGeo = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((state) => {
    hoverT.current += ((hovered ? 1 : 0) - hoverT.current) * 0.07
    if (!particlesRef.current) return
    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array
    const t = hoverT.current
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.005 * t
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
    ;(particlesRef.current.material as THREE.PointsMaterial).opacity = 0.15 + t * 0.75
    ;(particlesRef.current.material as THREE.PointsMaterial).size = 0.03 + t * 0.03
  })

  return (
    <group>
      {/* Left monitor */}
      <group position={[-1.05, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[0.78, 0.52, 0.06]} />
          <meshStandardMaterial
            color="#ef3a45"
            emissive="#ef3a45"
            emissiveIntensity={0.3}
            metalness={0.5}
          />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.67, 0.42, 0.01]} />
          <meshStandardMaterial color="#060610" emissive="#ef3a45" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, -0.36, 0]}>
          <boxGeometry args={[0.1, 0.18, 0.1]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </group>
      {/* Right monitor */}
      <group position={[1.05, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[0.78, 0.52, 0.06]} />
          <meshStandardMaterial
            color="#ef3a45"
            emissive="#ef3a45"
            emissiveIntensity={0.3}
            metalness={0.5}
          />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.67, 0.42, 0.01]} />
          <meshStandardMaterial color="#060610" emissive="#ef3a45" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, -0.36, 0]}>
          <boxGeometry args={[0.1, 0.18, 0.1]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </group>
      {/* Connection beam particles */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial color="#ef3a45" size={0.03} transparent opacity={0.15} />
      </points>
    </group>
  )
}

// ─────────────────────────── AIDA64 Scene ───────────────────────────

function ComponentBox({
  pos,
  size,
  color,
  hoverT,
  delay,
}: {
  pos: [number, number, number]
  size: [number, number, number]
  color: string
  hoverT: HoverRef
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.15 + (0.6 + Math.sin(state.clock.elapsedTime * 2.5 + delay) * 0.3) * hoverT.current
  })
  return (
    <mesh ref={ref} position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} metalness={0.5} />
    </mesh>
  )
}

function Aida64Scene({ hovered }: { hovered: boolean }) {
  const hoverT = useRef(0)
  const groupRef = useRef<THREE.Group>(null)

  const components = useMemo<
    Array<{
      pos: [number, number, number]
      size: [number, number, number]
      color: string
      delay: number
    }>
  >(
    () => [
      { pos: [0, 0.05, 0.04], size: [0.48, 0.48, 0.06], color: '#ff8800', delay: 0 },
      { pos: [0.68, 0.3, 0.04], size: [0.34, 0.18, 0.04], color: '#00d4ff', delay: 0.4 },
      { pos: [-0.68, 0.3, 0.04], size: [0.34, 0.18, 0.04], color: '#00d4ff', delay: 0.8 },
      { pos: [0.68, -0.38, 0.04], size: [0.38, 0.28, 0.07], color: '#7700ff', delay: 1.2 },
      { pos: [-0.38, -0.42, 0.04], size: [0.22, 0.22, 0.05], color: '#00ff88', delay: 0.6 },
    ],
    []
  )

  useFrame((state) => {
    hoverT.current += ((hovered ? 1 : 0) - hoverT.current) * 0.06
    if (groupRef.current) {
      groupRef.current.rotation.x =
        -0.35 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.15 + hoverT.current * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* PCB base */}
      <mesh>
        <boxGeometry args={[2.1, 1.5, 0.04]} />
        <meshStandardMaterial color="#152815" roughness={0.85} />
      </mesh>
      {/* Horizontal traces */}
      {[-0.38, 0, 0.38].map((y, i) => (
        <mesh key={i} position={[0, y, 0.03]}>
          <boxGeometry args={[1.7, 0.018, 0.01]} />
          <meshStandardMaterial
            color="#ff8800"
            emissive="#ff8800"
            emissiveIntensity={0.4 + hoverT.current * 0.5}
          />
        </mesh>
      ))}
      {/* Vertical traces */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.03]}>
          <boxGeometry args={[0.018, 1.2, 0.01]} />
          <meshStandardMaterial
            color="#ff8800"
            emissive="#ff8800"
            emissiveIntensity={0.3 + hoverT.current * 0.4}
          />
        </mesh>
      ))}
      {components.map((comp, i) => (
        <ComponentBox key={i} {...comp} hoverT={hoverT} />
      ))}
    </group>
  )
}

// ─────────────────────────── Hiren's Scene ──────────────────────────

function FloatingTool({
  basePos,
  color,
  hoverT,
  index,
}: {
  basePos: [number, number, number]
  color: string
  hoverT: HoverRef
  index: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = hoverT.current
    ref.current.position.x = basePos[0] * t
    ref.current.position.y =
      0.25 + t * (0.45 + index * 0.12) +
      Math.sin(state.clock.elapsedTime * 2 + index) * 0.05 * t
    ref.current.position.z = basePos[2] * t
    ref.current.scale.setScalar(Math.max(0.001, t * 0.75))
    ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = t * 1.8
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.16, 0.1, 0.08]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0} />
    </mesh>
  )
}

function HirensScene({ hovered }: { hovered: boolean }) {
  const hoverT = useRef(0)
  const lidRef = useRef<THREE.Group>(null)

  const toolItems = useMemo<Array<{ pos: [number, number, number]; color: string }>>(
    () => [
      { pos: [-0.58, 0, 0], color: '#00d4ff' },
      { pos: [0, 0, 0.58], color: '#00ff88' },
      { pos: [0.58, 0, 0], color: '#ff8800' },
      { pos: [-0.28, 0, -0.48], color: '#ff4488' },
      { pos: [0.28, 0, -0.48], color: '#7700ff' },
    ],
    []
  )

  useFrame(() => {
    hoverT.current += ((hovered ? 1 : 0) - hoverT.current) * 0.06
    if (lidRef.current) {
      lidRef.current.rotation.x = -hoverT.current * Math.PI * 0.55
    }
  })

  return (
    <group rotation={[0.1, 0.3, 0]}>
      {/* Box base */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1.15, 0.58, 0.88]} />
        <meshStandardMaterial
          color="#7700ff"
          emissive="#7700ff"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Lid pivot group (pivot from back-top edge) */}
      <group ref={lidRef} position={[0, 0.15, -0.44]}>
        <mesh position={[0, 0, 0.44]}>
          <boxGeometry args={[1.15, 0.08, 0.88]} />
          <meshStandardMaterial
            color="#8811ff"
            emissive="#7700ff"
            emissiveIntensity={0.45}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>
      {toolItems.map((tool, i) => (
        <FloatingTool
          key={i}
          basePos={tool.pos}
          color={tool.color}
          hoverT={hoverT}
          index={i}
        />
      ))}
    </group>
  )
}

// ─────────────────────────── Kibana Scene ───────────────────────────

function KibanaGridLine({ y, color }: { y: number; color: string }) {
  const lineObject = useMemo(() => {
    const points = [new THREE.Vector3(-1.75, y, -0.12), new THREE.Vector3(1.75, y, -0.12)]
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 })
    return new THREE.Line(geo, mat)
  }, [y, color])
  return <primitive object={lineObject} />
}

function KibanaScene({ hovered }: { hovered: boolean }) {
  const hoverT = useRef(0)
  const waveRef = useRef<THREE.Points>(null)
  const pointCount = 80

  const waveGeo = useMemo(() => {
    const positions = new Float32Array(pointCount * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((state) => {
    hoverT.current += ((hovered ? 1 : 0) - hoverT.current) * 0.07
    if (!waveRef.current) return
    const positions = waveRef.current.geometry.attributes.position
      .array as Float32Array
    const t = hoverT.current
    const speed = 1.2 + t * 2.2
    const amp = 0.28 + t * 0.42

    for (let i = 0; i < pointCount; i++) {
      const x = (i / (pointCount - 1)) * 3.5 - 1.75
      const y =
        Math.sin(x * 3.2 + state.clock.elapsedTime * speed) * amp +
        Math.sin(x * 5.5 - state.clock.elapsedTime * 0.7 * speed) * amp * 0.28
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = 0
    }
    waveRef.current.geometry.attributes.position.needsUpdate = true
    ;(waveRef.current.material as THREE.PointsMaterial).size = 0.04 + t * 0.05
    ;(waveRef.current.material as THREE.PointsMaterial).color.setStyle(
      t > 0.5 ? '#f04e98' : '#882255'
    )
  })

  return (
    <group>
      {/* Background panel */}
      <mesh position={[0, 0, -0.22]}>
        <boxGeometry args={[3.7, 1.95, 0.02]} />
        <meshStandardMaterial color="#06060f" />
      </mesh>
      {/* Grid lines */}
      {[-0.55, 0, 0.55].map((y, i) => (
        <KibanaGridLine key={i} y={y} color="#1a1a3a" />
      ))}
      {/* Waveform */}
      <points ref={waveRef} geometry={waveGeo}>
        <pointsMaterial color="#882255" size={0.04} />
      </points>
    </group>
  )
}

// ─────────────────────────── Tool Card ──────────────────────────────

type ToolScene = React.FC<{ hovered: boolean }>

interface ToolItem {
  name: string
  role: string
  action: string
  color: string
  Scene: ToolScene | null
}

const tools: ToolItem[] = [
  {
    name: 'Ventoy',
    role: 'The Multiboot King',
    action: "Boot 15+ OS from a single USB — Hiren's PE, Windows 11, Ubuntu",
    color: '#00d4ff',
    Scene: VentoyScene,
  },
  {
    name: 'Microsoft Intune',
    role: 'The Command Center',
    action: '100+ devices enrolled, compliance policies enforced across the fleet',
    color: '#0078d4',
    Scene: IntuneScene,
  },
  {
    name: 'Ninite',
    role: 'The Speed Installer',
    action: 'Deploy 15 essential apps silently in under 5 minutes',
    color: '#00ff88',
    Scene: null,
  },
  {
    name: 'AnyDesk',
    role: 'The Remote Savior',
    action: 'Remote resolution across 3 sites — zero physical travel required',
    color: '#ef3a45',
    Scene: AnyDeskScene,
  },
  {
    name: 'AIDA64 / HWiNFO',
    role: 'The Hardware X-Ray',
    action: 'Full hardware diagnostics — thermal, voltage, and stability analysis',
    color: '#ff8800',
    Scene: Aida64Scene,
  },
  {
    name: "Hiren's BootCD PE",
    role: 'The Swiss Army Knife',
    action: 'Password resets, disk recovery, malware removal — all offline',
    color: '#7700ff',
    Scene: HirensScene,
  },
  {
    name: 'Kibana',
    role: 'The Data Storyteller',
    action: 'Real-time log visualization and anomaly detection dashboards',
    color: '#f04e98',
    Scene: KibanaScene,
  },
]

function ToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ToolSceneComponent = tool.Scene

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.03, y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-lg overflow-hidden bg-[#0d1117]/80 cursor-pointer flex flex-col"
      style={{
        border: `1px solid ${tool.color}35`,
        boxShadow: hovered ? `0 0 24px ${tool.color}25` : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* 3D scene / visual area */}
      <div
        className="h-48 relative overflow-hidden"
        style={{ background: `${tool.color}08` }}
      >
        {ToolSceneComponent ? (
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 55 }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.45} />
            <pointLight position={[3, 3, 3]} color={tool.color} intensity={2.5} />
            <pointLight position={[-3, -2, 2]} color="#ffffff" intensity={0.6} />
            <ToolSceneComponent hovered={hovered} />
          </Canvas>
        ) : (
          <NiniteVisual hovered={hovered} />
        )}

        {/* Accent corner badge */}
        <div
          className="absolute top-2 left-2 font-mono text-[10px] px-2 py-0.5 rounded border"
          style={{
            color: tool.color,
            borderColor: `${tool.color}40`,
            background: `${tool.color}15`,
          }}
        >
          ACTIVE
        </div>
        {/* Hover indicator */}
        {hovered && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }}
          />
        )}
      </div>

      {/* Text area */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="font-mono text-xs tracking-widest mb-1"
          style={{ color: tool.color }}
        >
          {tool.role}
        </div>
        <h3 className="font-mono text-lg font-bold text-white mb-2">{tool.name}</h3>
        <p className="font-mono text-xs text-gray-400 leading-relaxed flex-1">{tool.action}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="animate-pulse text-xs" style={{ color: tool.color }}>
            ●
          </span>
          <span className="font-mono text-xs text-gray-600">FIELD_DEPLOYED</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────── Section ────────────────────────────────

export default function ToolsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="arsenal" className="py-24 relative grid-bg overflow-hidden">
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
            IT
            <br />
            <span className="text-[#00d4ff] cyber-glow">ARSENAL</span>
          </h2>
          <p className="font-mono text-gray-500 text-sm max-w-md mx-auto">
            The tools I deploy in the field — hover each card to see them in action
          </p>
          <div className="w-24 h-px bg-[#00d4ff] mx-auto mt-4" />
        </motion.div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-8 cyber-border rounded p-4 bg-[#0d1117]/40 font-mono text-xs flex flex-wrap gap-6 justify-center text-gray-500"
        >
          <span>TOOLS_DEPLOYED: {tools.length}</span>
          <span className="text-[#00ff88]">STATUS: BATTLE_TESTED</span>
          <span className="text-[#00d4ff]">ENVIRONMENT: PRODUCTION</span>
        </motion.div>
      </div>
    </section>
  )
}
