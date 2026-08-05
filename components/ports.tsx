'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface PortDef {
  position: [number, number, number]
  id: string
}

// Two ports placed at coastline edges of continent 1 and continent 3
// These are manually chosen positions near the shore of major continents
export const PORTS: PortDef[] = [
  {
    // Continent 1 coast (phi=0.5, theta=0.2, pushed outward toward water)
    id: 'port-north',
    position: (() => {
      const phi = 0.5
      const theta = 0.2 + 0.45 // offset toward water edge
      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.cos(phi)
      const nz = Math.sin(phi) * Math.sin(theta)
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
      const r = 3.03
      return [nx / len * r, ny / len * r, nz / len * r] as [number, number, number]
    })(),
  },
  {
    // Continent 3 coast (phi=0.9, theta=5.2, pushed outward)
    id: 'port-south',
    position: (() => {
      const phi = 0.9
      const theta = 5.2 - 0.4 // offset toward water edge
      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.cos(phi)
      const nz = Math.sin(phi) * Math.sin(theta)
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
      const r = 3.03
      return [nx / len * r, ny / len * r, nz / len * r] as [number, number, number]
    })(),
  },
]

export function PortDocks() {
  return (
    <>
      {PORTS.map(port => (
        <Dock key={port.id} position={port.position} />
      ))}
    </>
  )
}

function Dock({ position }: { position: [number, number, number] }) {
  const lanternRef = useRef<THREE.Mesh>(null)

  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)

  // Lantern flicker
  useFrame(({ clock }) => {
    if (lanternRef.current) {
      const mat = lanternRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.7 + Math.sin(clock.elapsedTime * 3) * 0.2
    }
  })

  return (
    <group position={position} quaternion={q}>
      {/* Main pier platform */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.06, 0.005, 0.12]} />
        <meshLambertMaterial color="#a0784c" flatShading />
      </mesh>

      {/* Pier planks (cross boards) */}
      {[-0.04, -0.02, 0, 0.02, 0.04].map((z, i) => (
        <mesh key={i} position={[0, 0.013, z]}>
          <boxGeometry args={[0.065, 0.002, 0.015]} />
          <meshLambertMaterial color="#c4a06a" flatShading />
        </mesh>
      ))}

      {/* Support posts */}
      <mesh position={[-0.025, -0.01, -0.05]}>
        <cylinderGeometry args={[0.003, 0.004, 0.04, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>
      <mesh position={[0.025, -0.01, -0.05]}>
        <cylinderGeometry args={[0.003, 0.004, 0.04, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>
      <mesh position={[-0.025, -0.01, 0.05]}>
        <cylinderGeometry args={[0.003, 0.004, 0.04, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>
      <mesh position={[0.025, -0.01, 0.05]}>
        <cylinderGeometry args={[0.003, 0.004, 0.04, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>

      {/* Lantern post */}
      <mesh position={[0.028, 0.04, 0.05]}>
        <cylinderGeometry args={[0.002, 0.003, 0.06, 4]} />
        <meshLambertMaterial color="#4a3520" flatShading />
      </mesh>

      {/* Lantern glow */}
      <mesh ref={lanternRef} position={[0.028, 0.072, 0.05]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#ffcc44" transparent opacity={0.8} />
      </mesh>

      {/* Sign post */}
      <mesh position={[-0.025, 0.03, 0.055]}>
        <cylinderGeometry args={[0.002, 0.002, 0.04, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>

      {/* Sign board */}
      <mesh position={[-0.025, 0.05, 0.055]}>
        <boxGeometry args={[0.025, 0.012, 0.003]} />
        <meshLambertMaterial color="#deb887" flatShading />
      </mesh>

      {/* Mooring posts (bollards) */}
      <mesh position={[-0.02, 0.015, -0.04]}>
        <cylinderGeometry args={[0.003, 0.004, 0.012, 5]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>
      <mesh position={[0.02, 0.015, -0.04]}>
        <cylinderGeometry args={[0.003, 0.004, 0.012, 5]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>
    </group>
  )
}

// Utility: check if a world position is near any port
export function getNearestPort(worldPos: THREE.Vector3, threshold = 0.25): PortDef | null {
  for (const port of PORTS) {
    const portVec = new THREE.Vector3(...port.position)
    const dist = worldPos.distanceTo(portVec)
    if (dist < threshold) return port
  }
  return null
}
