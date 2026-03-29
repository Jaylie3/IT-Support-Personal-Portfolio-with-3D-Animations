'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { Float, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

type HotspotId = 'cpu' | 'ram' | 'network' | null

const HOTSPOT_DATA: Record<NonNullable<HotspotId>, { title: string; subtitle: string; items: string[]; color: string }> = {
  cpu: {
    title: 'CPU :: SKILLS',
    subtitle: 'System Specifications',
    color: '#00d4ff',
    items: ['React & Next.js', 'JavaScript / TypeScript', 'Python Scripting', 'PowerShell Automation', 'Node.js'],
  },
  ram: {
    title: 'RAM :: ACTIVE TASKS',
    subtitle: 'Current Runtime',
    color: '#00ff88',
    items: ['ICT Intern @ Okhahlamba DTDC', 'AD & GPO Administration', 'Microsoft 365 Tenant Mgmt', 'Helpdesk (osTicket/ITIL)', 'Device Lifecycle Management'],
  },
  network: {
    title: 'NIC :: CONNECTIVITY',
    subtitle: 'External Links',
    color: '#7700ff',
    items: ['GitHub: github.com/Jaylie3', 'Location: Bergville, KZN, ZA', 'Education: IIE Rosebank College', 'GPA: 78.60%', 'Available: Remote & On-site'],
  },
}

function Hotspot({
  position,
  id,
  color,
  label,
  active,
  onActivate,
}: {
  position: [number, number, number]
  id: HotspotId
  color: string
  label: string
  active: boolean
  onActivate: (id: HotspotId) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + position[0]) * 0.15
      meshRef.current.scale.setScalar(active ? scale * 1.4 : scale)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.03
      const mat = ringRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = active ? 0.8 : 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onActivate(active ? null : id)
  }

  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh ref={ringRef} onClick={handleClick}>
        <torusGeometry args={[0.18, 0.02, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.5} />
      </mesh>
      {/* Core orb */}
      <mesh ref={meshRef} onClick={handleClick}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 3 : 1.5} />
      </mesh>
      {/* HTML label */}
      <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            color: color,
            whiteSpace: 'nowrap',
            transform: 'translateY(20px)',
            opacity: 0.8,
            textShadow: `0 0 8px ${color}`,
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

function ServerRack({ activeHotspot, onHotspot }: { activeHotspot: HotspotId; onHotspot: (id: HotspotId) => void }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Server rack body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 3, 0.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Server units */}
      {([-1.1, -0.6, -0.1, 0.4, 0.9] as number[]).map((y, i) => (
        <group key={i} position={[0, y, 0.41]}>
          <mesh>
            <boxGeometry args={[1.3, 0.35, 0.05]} />
            <meshStandardMaterial color="#0d1117" metalness={0.9} roughness={0.1} />
          </mesh>
          {([-0.4, -0.2, 0, 0.2, 0.4] as number[]).map((x, j) => (
            <mesh key={j} position={[x, 0, 0.03]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial
                color={j === 2 ? '#00ff88' : j % 2 === 0 ? '#00d4ff' : '#ff4444'}
                emissive={j === 2 ? '#00ff88' : j % 2 === 0 ? '#00d4ff' : '#ff4444'}
                emissiveIntensity={1.5}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cables */}
      <mesh position={[0.6, -1.2, 0.5]} rotation={[0.3, 0, 0.5]}>
        <torusGeometry args={[0.3, 0.02, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.5, -1.0, 0.5]} rotation={[0.2, 0, -0.4]}>
        <torusGeometry args={[0.25, 0.02, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
      </mesh>

      {/* Hotspot: CPU (top server unit) */}
      <Hotspot
        position={[0.9, 0.9, 0.55]}
        id="cpu"
        color="#00d4ff"
        label="CPU"
        active={activeHotspot === 'cpu'}
        onActivate={onHotspot}
      />
      {/* Hotspot: RAM (middle server unit) */}
      <Hotspot
        position={[-0.9, -0.1, 0.55]}
        id="ram"
        color="#00ff88"
        label="RAM"
        active={activeHotspot === 'ram'}
        onActivate={onHotspot}
      />
      {/* Hotspot: Network Card (cable area) */}
      <Hotspot
        position={[0.8, -1.4, 0.55]}
        id="network"
        color="#7700ff"
        label="NIC"
        active={activeHotspot === 'network'}
        onActivate={onHotspot}
      />
    </group>
  )
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)
  const orb3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.5) * 2.5
      orb1Ref.current.position.y = Math.cos(t * 0.4) * 1.5
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.sin(t * 0.3 + 2) * 2
      orb2Ref.current.position.y = Math.cos(t * 0.5 + 1) * 2
    }
    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.cos(t * 0.4 + 1) * 3
      orb3Ref.current.position.y = Math.sin(t * 0.3) * 1
    }
  })

  return (
    <>
      <mesh ref={orb1Ref} position={[2, 1, -1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
      </mesh>
      <mesh ref={orb2Ref} position={[-2, -1, -1]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
      </mesh>
      <mesh ref={orb3Ref} position={[0, 2, -2]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#7700ff" emissive="#7700ff" emissiveIntensity={2} />
      </mesh>
    </>
  )
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

function HotspotPopup({ id, onClose }: { id: NonNullable<HotspotId>; onClose: () => void }) {
  const data = HOTSPOT_DATA[id]
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-4 left-4 z-20 w-64 pointer-events-auto"
      style={{
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${data.color}60`,
        boxShadow: `0 0 20px ${data.color}30`,
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-3 font-mono text-gray-500 hover:text-white text-xs"
      >
        [X]
      </button>
      <div className="font-mono text-xs tracking-widest mb-1" style={{ color: data.color }}>
        {data.subtitle}
      </div>
      <div className="font-mono font-bold text-white text-sm mb-3">{data.title}</div>
      <ul className="space-y-1">
        {data.items.map((item) => (
          <li key={item} className="font-mono text-xs text-gray-300 flex items-center gap-2">
            <span style={{ color: data.color }}>▸</span> {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function HeroScene() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotId>(null)

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => setActiveHotspot(null)}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
        <pointLight position={[-5, -5, 5]} color="#00ff88" intensity={1} />
        <pointLight position={[0, 0, 3]} color="#ffffff" intensity={0.5} />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <ServerRack activeHotspot={activeHotspot} onHotspot={setActiveHotspot} />
        </Float>

        <FloatingOrbs />
        <GridPlane />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Hotspot popup overlay */}
      <AnimatePresence>
        {activeHotspot && (
          <HotspotPopup id={activeHotspot} onClose={() => setActiveHotspot(null)} />
        )}
      </AnimatePresence>

      {/* Hint label */}
      {!activeHotspot && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-[#00d4ff]/40 text-center pointer-events-none">
          Click nodes: CPU · RAM · NIC
        </div>
      )}
    </div>
  )
}

