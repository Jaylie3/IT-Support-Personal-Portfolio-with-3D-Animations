'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function LineSegment({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const lineObject = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color: '#00d4ff', transparent: true, opacity: 0.4 })
    return new THREE.Line(geo, mat)
  // start/end come from a static constant array so deps won't change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <primitive object={lineObject} />
}

function NetworkViz() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  const nodes = [
    [0, 0, 0], [1.2, 0.5, 0.3], [-1.2, 0.5, 0.3],
    [0.8, -0.8, 0.5], [-0.8, -0.8, 0.5], [0, 1.2, 0.2]
  ] as [number, number, number][]

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.18 : 0.1, 16, 16]} />
          <meshStandardMaterial
            color={i === 0 ? '#00ff88' : '#00d4ff'}
            emissive={i === 0 ? '#00ff88' : '#00d4ff'}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
      {nodes.slice(1).map((pos, i) => (
        <LineSegment key={i} start={nodes[0]} end={pos} />
      ))}
    </group>
  )
}

export default function TicketScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 60 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} color="#00d4ff" intensity={2} />
      <pointLight position={[-3, -3, 3]} color="#00ff88" intensity={1} />
      <Float speed={2} floatIntensity={0.5}>
        <NetworkViz />
      </Float>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={3} />
    </Canvas>
  )
}
