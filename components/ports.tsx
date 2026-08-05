'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'

export interface PortDef {
  position: [number, number, number]
  id: string
}

// Find positions on the coastline (influence ~0.08-0.12) by sampling the planet surface
function findCoastlinePositions(): [number, number, number][] {
  const results: [number, number, number][] = []
  const count = 2000

  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
    const nx = Math.sin(phi) * Math.cos(theta)
    const ny = Math.cos(phi)
    const nz = Math.sin(phi) * Math.sin(theta)

    const { influence } = islandInfluence(nx, ny, nz, true)

    // Right at the coastline boundary
    if (influence > 0.06 && influence < 0.12) {
      const r = 3.03
      results.push([nx * r, ny * r, nz * r])
    }
  }
  return results
}

// Pick two coastline positions that are far apart from each other
function computePortPositions(): [number, number, number][] {
  const candidates = findCoastlinePositions()
  if (candidates.length < 2) return [[3.03, 0, 0], [0, 3.03, 0]]

  const first = candidates[Math.floor(candidates.length * 0.2)]

  let best = candidates[0]
  let bestDist = 0
  const firstVec = new THREE.Vector3(...first)
  for (const c of candidates) {
    const d = firstVec.distanceTo(new THREE.Vector3(...c))
    if (d > bestDist) {
      bestDist = d
      best = c
    }
  }

  return [first, best]
}

// Lazy-computed port positions (computed once on first access)
let _portPositions: [number, number, number][] | null = null
function getPortPositions(): [number, number, number][] {
  if (!_portPositions) {
    _portPositions = computePortPositions()
  }
  return _portPositions
}

export function getPorts(): PortDef[] {
  const positions = getPortPositions()
  return [
    { id: 'port-north', position: positions[0] },
    { id: 'port-south', position: positions[1] },
  ]
}

// Static reference for proximity checks (will be populated on first render)
export let PORTS: PortDef[] = []

export function PortDocks() {
  const ports = useMemo(() => {
    const p = getPorts()
    PORTS = p // populate for proximity checks
    return p
  }, [])

  return (
    <>
      {ports.map(port => (
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
      {/* Main pier platform - much bigger */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.12, 0.008, 0.2]} />
        <meshLambertMaterial color="#a0784c" flatShading />
      </mesh>

      {/* Pier planks */}
      {[-0.08, -0.04, 0, 0.04, 0.08].map((z, i) => (
        <mesh key={i} position={[0, 0.015, z]}>
          <boxGeometry args={[0.13, 0.003, 0.025]} />
          <meshLambertMaterial color="#c4a06a" flatShading />
        </mesh>
      ))}

      {/* Support posts */}
      <mesh position={[-0.05, -0.015, -0.08]}>
        <cylinderGeometry args={[0.005, 0.007, 0.06, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>
      <mesh position={[0.05, -0.015, -0.08]}>
        <cylinderGeometry args={[0.005, 0.007, 0.06, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>
      <mesh position={[-0.05, -0.015, 0.08]}>
        <cylinderGeometry args={[0.005, 0.007, 0.06, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>
      <mesh position={[0.05, -0.015, 0.08]}>
        <cylinderGeometry args={[0.005, 0.007, 0.06, 4]} />
        <meshLambertMaterial color="#5c3a20" flatShading />
      </mesh>

      {/* TALL BEACON POLE - visible from far away */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.005, 0.008, 0.22, 5]} />
        <meshLambertMaterial color="#4a3520" flatShading />
      </mesh>

      {/* Beacon light - big bright sphere */}
      <mesh ref={lanternRef} position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.9} />
      </mesh>

      {/* Beacon glow ring (outer glow) */}
      <mesh position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#ffcc44" transparent opacity={0.3} />
      </mesh>

      {/* Mooring posts */}
      <mesh position={[-0.04, 0.022, -0.07]}>
        <cylinderGeometry args={[0.005, 0.006, 0.02, 5]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>
      <mesh position={[0.04, 0.022, -0.07]}>
        <cylinderGeometry args={[0.005, 0.006, 0.02, 5]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>

      {/* Small shack/hut on dock */}
      <mesh position={[0, 0.035, 0.06]}>
        <boxGeometry args={[0.05, 0.04, 0.04]} />
        <meshLambertMaterial color="#deb887" flatShading />
      </mesh>
      <mesh position={[0, 0.06, 0.06]}>
        <coneGeometry args={[0.04, 0.025, 4]} />
        <meshLambertMaterial color="#8B4513" flatShading />
      </mesh>
    </group>
  )
}

// Utility: check if a world position is near any port
export function getNearestPort(worldPos: THREE.Vector3, threshold = 0.4): PortDef | null {
  const ports = PORTS.length > 0 ? PORTS : getPorts()
  for (const port of ports) {
    const portVec = new THREE.Vector3(...port.position)
    const dist = worldPos.distanceTo(portVec)
    if (dist < threshold) return port
  }
  return null
}
