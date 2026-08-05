'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
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
  const { scene } = useGLTF('/models/port.glb')
  const cloned = useMemo(() => scene.clone(), [scene])

  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)

  return (
    <group position={position} quaternion={q}>
      <primitive object={cloned} scale={0.36} position={[0, 0.12, 0]} />
      {/* Seagulls circling above */}
      <Seagulls center={[0, 0.25, 0]} />
    </group>
  )
}

// Seagulls circling above the port
function Seagulls({ center }: { center: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const birds = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      offset: (Math.PI * 2 * i) / 5,
      radius: 0.04 + Math.random() * 0.03,
      height: Math.random() * 0.03,
      speed: 0.6 + Math.random() * 0.4,
    }))
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    const children = groupRef.current.children
    for (let i = 0; i < children.length; i++) {
      const bird = children[i]
      const data = birds[i]
      const angle = t * data.speed + data.offset
      bird.position.set(
        center[0] + Math.cos(angle) * data.radius,
        center[1] + data.height + Math.sin(t * 2 + data.offset) * 0.005,
        center[2] + Math.sin(angle) * data.radius
      )
      bird.rotation.y = -angle + Math.PI / 2
    }
  })

  return (
    <group ref={groupRef}>
      {birds.map((_, i) => (
        <group key={i} scale={0.006}>
          {/* Left wing */}
          <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0.3]}>
            <planeGeometry args={[1.2, 0.3]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
          {/* Right wing */}
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, -0.3]}>
            <planeGeometry args={[1.2, 0.3]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
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
