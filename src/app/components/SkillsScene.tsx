'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function NetworkNode({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  )
}

function NetworkLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const lineObject = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: '#00d4ff', transparent: true, opacity: 0.3 })
    return new THREE.Line(geometry, material)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start[0], start[1], start[2], end[0], end[1], end[2]])

  return <primitive object={lineObject} />
}

export function NetworkScene() {
  const nodes: [number, number, number][] = [
    [0, 0, 0], [1.5, 0.8, 0], [-1.5, 0.8, 0], [0, -1.5, 0],
    [1.2, -0.8, 0.5], [-1.2, -0.8, 0.5], [0, 1.5, 0]
  ]

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
      <Float speed={1.5} floatIntensity={0.3}>
        <group>
          {nodes.map((pos, i) => (
            <NetworkNode key={i} position={pos} color={i === 0 ? '#00ff88' : '#00d4ff'} />
          ))}
          {nodes.slice(1).map((pos, i) => (
            <NetworkLine key={i} start={nodes[0]} end={pos} />
          ))}
          <NetworkLine start={nodes[1]} end={nodes[6]} />
          <NetworkLine start={nodes[2]} end={nodes[6]} />
          <NetworkLine start={nodes[3]} end={nodes[4]} />
          <NetworkLine start={nodes[3]} end={nodes[5]} />
        </group>
      </Float>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  )
}

function OrbitingLogo({ radius, speed, offset, color }: { radius: number; speed: number; offset: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius
      meshRef.current.position.y = Math.sin(t) * radius * 0.4
      meshRef.current.position.z = Math.sin(t) * radius * 0.2
    }
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.8} />
    </mesh>
  )
}

function RotatingCloud() {
  const cloudRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  return (
    <group ref={cloudRef}>
      {/* Cloud shape */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#1a3a6e" metalness={0.3} roughness={0.7} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.5, 0.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#1a3a6e" metalness={0.3} roughness={0.7} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.5, 0.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#1a3a6e" metalness={0.3} roughness={0.7} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

export function CloudScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#4488ff" intensity={2} />
      <Float speed={1} floatIntensity={0.5}>
        <RotatingCloud />
      </Float>

      {/* Orbiting logos */}
      <OrbitingLogo radius={1.8} speed={1} offset={0} color="#0078d4" />
      <OrbitingLogo radius={1.8} speed={1} offset={2.1} color="#ff9900" />
      <OrbitingLogo radius={1.8} speed={1} offset={4.2} color="#4285f4" />

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 8, 60]} />
        <meshStandardMaterial color="#00d4ff" transparent opacity={0.2} />
      </mesh>

      <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
    </Canvas>
  )
}

export function HardwareScene() {
  const laptopRef = useRef<THREE.Group>(null)

  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 60 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
      <pointLight position={[-5, 0, 3]} color="#00ff88" intensity={1} />

      <Float speed={1.5} floatIntensity={0.5}>
        <group ref={laptopRef}>
          {/* Laptop base */}
          <mesh position={[0, -0.3, 0.3]}>
            <boxGeometry args={[2.4, 0.12, 1.6]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Laptop screen */}
          <mesh position={[0, 0.8, -0.5]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[2.4, 1.5, 0.08]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Screen display */}
          <mesh position={[0, 0.8, -0.46]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[2.2, 1.3, 0.01]} />
            <meshStandardMaterial color="#0d1117" emissive="#00d4ff" emissiveIntensity={0.1} />
          </mesh>

          {/* Keyboard area with circuit traces */}
          {([-0.6, -0.2, 0.2, 0.6] as number[]).map((x, i) => (
            <mesh key={i} position={[x, -0.23, 0.3]}>
              <boxGeometry args={[0.3, 0.01, 1.2]} />
              <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.2} transparent opacity={0.4} />
            </mesh>
          ))}
        </group>
      </Float>

      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  )
}
