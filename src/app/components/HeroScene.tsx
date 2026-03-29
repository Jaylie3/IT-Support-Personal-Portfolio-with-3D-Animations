'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function ServerRack() {
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

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#00ff88" intensity={1} />
      <pointLight position={[0, 0, 3]} color="#ffffff" intensity={0.5} />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <ServerRack />
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
  )
}
