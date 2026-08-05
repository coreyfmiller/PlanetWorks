'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'

interface TreasureProps {
  boatPosition: THREE.Vector3 | null
  onCollect: (value: number) => void
}

/**
 * Treasure chests that spawn on shorelines.
 * Boat can sail close to collect them for bonus coins.
 * 3 chests at a time, respawn elsewhere when collected.
 */
export function TreasureChests({ boatPosition, onCollect }: TreasureProps) {
  const chestsRef = useRef<THREE.Group>(null)

  const state = useRef({
    chests: generateChestPositions(),
    collected: [false, false, false] as boolean[],
    glintPhase: [0, Math.PI * 0.6, Math.PI * 1.3],
  })

  useFrame((_, delta) => {
    const s = state.current
    const dt = Math.min(delta, 0.05)

    // Glint animation
    for (let i = 0; i < 3; i++) {
      s.glintPhase[i] += dt * 2
    }

    // Check proximity for collection
    if (boatPosition) {
      for (let i = 0; i < 3; i++) {
        if (s.collected[i]) continue
        const chestPos = new THREE.Vector3(...s.chests[i])
        const dist = boatPosition.distanceTo(chestPos)
        if (dist < 0.2) {
          s.collected[i] = true
          const value = 10 + Math.floor(Math.random() * 20) // 10-30 coins
          onCollect(value)

          // Respawn after 30s at a new location
          setTimeout(() => {
            const newPositions = generateChestPositions()
            s.chests[i] = newPositions[0]
            s.collected[i] = false
          }, 30000)
        }
      }
    }

    // Update glint visibility
    if (chestsRef.current) {
      const children = chestsRef.current.children
      for (let i = 0; i < children.length; i++) {
        const chest = children[i] as THREE.Group
        chest.visible = !s.collected[i]
        // Glint (last child is the glint sphere)
        const glint = chest.children[chest.children.length - 1] as THREE.Mesh
        if (glint && glint.material) {
          const mat = glint.material as THREE.MeshBasicMaterial
          mat.opacity = 0.4 + Math.sin(s.glintPhase[i]) * 0.4
        }
      }
    }
  })

  return (
    <group ref={chestsRef}>
      {state.current.chests.map((pos, i) => (
        <Chest key={i} position={pos} />
      ))}
    </group>
  )
}

function Chest({ position }: { position: [number, number, number] }) {
  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)

  return (
    <group position={position} quaternion={q}>
      {/* Chest body */}
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[0.025, 0.015, 0.018]} />
        <meshLambertMaterial color="#8B4513" flatShading />
      </mesh>
      {/* Chest lid (slightly open) */}
      <mesh position={[0, 0.022, -0.003]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.026, 0.005, 0.019]} />
        <meshLambertMaterial color="#a0522d" flatShading />
      </mesh>
      {/* Gold trim */}
      <mesh position={[0, 0.015, 0.01]}>
        <boxGeometry args={[0.012, 0.008, 0.002]} />
        <meshLambertMaterial color="#ffd700" flatShading />
      </mesh>
      {/* Glint sparkle */}
      <mesh position={[0, 0.035, 0]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshBasicMaterial color="#ffee88" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function generateChestPositions(): [number, number, number][] {
  const positions: [number, number, number][] = []
  let attempts = 0

  while (positions.length < 3 && attempts < 500) {
    attempts++
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const nx = Math.sin(phi) * Math.cos(theta)
    const ny = Math.cos(phi)
    const nz = Math.sin(phi) * Math.sin(theta)

    const { influence } = islandInfluence(nx, ny, nz, true)

    // Place on the very edge of coastline (shallow water, barely accessible)
    if (influence > 0.03 && influence < 0.1) {
      const r = 3.04
      positions.push([nx * r, ny * r, nz * r])
    }
  }

  // Fallback if not enough found
  while (positions.length < 3) {
    positions.push([3.04, 0, 0])
  }

  return positions
}
