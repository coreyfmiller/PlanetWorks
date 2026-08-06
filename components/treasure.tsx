'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'
import { fbmSimplex } from '@/lib/simplex'

export interface TreasureLoot {
  name: string
  emoji: string
  value: number
}

// Loot table: 100 coin map, ~160 avg return
const LOOT_TABLE: { name: string; emoji: string; value: number; weight: number }[] = [
  { name: 'Dusty Bones', emoji: '🦴', value: 0, weight: 30 },
  { name: 'Copper Coins', emoji: '🪙', value: 50, weight: 20 },
  { name: 'Silver Coins', emoji: '💰', value: 150, weight: 20 },
  { name: 'Gold Coins', emoji: '👑', value: 300, weight: 15 },
  { name: 'Jewels', emoji: '💎', value: 500, weight: 10 },
  { name: 'Ancient Relic', emoji: '🏺', value: 500, weight: 5 },
]

function rollLoot(): TreasureLoot {
  const totalWeight = LOOT_TABLE.reduce((sum, l) => sum + l.weight, 0)
  let roll = Math.random() * totalWeight
  for (const loot of LOOT_TABLE) {
    roll -= loot.weight
    if (roll <= 0) return { name: loot.name, emoji: loot.emoji, value: loot.value }
  }
  return LOOT_TABLE[0]
}

export const TREASURE_MAP_COST = 100

interface TreasureProps {
  active: boolean // whether player has bought a map
  boatPosition: THREE.Vector3 | null
  boatForward: THREE.Vector3 | null
  onCollect: (loot: TreasureLoot) => void
  onCompassUpdate: (angle: number, distance: number) => void
}

/**
 * Single treasure chest that spawns when player buys a map.
 * Shows compass direction. Collect by sailing close.
 */
export function TreasureChest({ active, boatPosition, boatForward, onCollect, onCompassUpdate }: TreasureProps) {
  const chestRef = useRef<THREE.Group>(null)
  const state = useRef({
    position: null as [number, number, number] | null,
    glintPhase: 0,
  })

  // Generate position when activated
  useFrame((_, delta) => {
    if (!active) {
      if (chestRef.current) chestRef.current.visible = false
      state.current.position = null
      return
    }

    // Spawn chest if we don't have a position yet
    if (!state.current.position) {
      state.current.position = generateChestPosition()
    }

    const s = state.current
    const dt = Math.min(delta, 0.05)
    s.glintPhase += dt * 2.5

    if (chestRef.current) {
      chestRef.current.visible = true
      // Update glint
      const glint = chestRef.current.children[1] as THREE.Mesh
      if (glint && glint.material) {
        const mat = glint.material as THREE.MeshBasicMaterial
        mat.opacity = 0.3 + Math.sin(s.glintPhase) * 0.5
      }

      // Update position
      if (s.position) {
        chestRef.current.position.set(...s.position)
        const up = new THREE.Vector3(...s.position).normalize()
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
        chestRef.current.quaternion.copy(q)
      }
    }

    // Compass update
    if (boatPosition && boatForward && s.position) {
      const chestPos = new THREE.Vector3(...s.position)
      const dist = boatPosition.distanceTo(chestPos)

      const localUp = boatPosition.clone().normalize()
      const toChest = chestPos.clone().sub(boatPosition).normalize()
      const toChestFlat = toChest.clone().sub(localUp.clone().multiplyScalar(toChest.dot(localUp)))
      const forwardFlat = boatForward.clone().sub(localUp.clone().multiplyScalar(boatForward.dot(localUp)))

      if (toChestFlat.length() > 0.001 && forwardFlat.length() > 0.001) {
        toChestFlat.normalize()
        forwardFlat.normalize()
        const cross = new THREE.Vector3().crossVectors(forwardFlat, toChestFlat)
        const sin = cross.dot(localUp)
        const cos = forwardFlat.dot(toChestFlat)
        const angle = Math.atan2(sin, cos) + Math.PI
        onCompassUpdate(angle, dist)
      }

      // Collection check
      if (dist < 0.3) {
        const loot = rollLoot()
        onCollect(loot)
        state.current.position = null
      }
    }
  })

  return (
    <group ref={chestRef} visible={false}>
      <ChestModel />
      {/* Glint sparkle */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.01, 6, 6]} />
        <meshBasicMaterial color="#ffee88" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function ChestModel() {
  const { scene } = useGLTF('/models/treasure-chest.glb')
  const model = useMemo(() => scene.clone(), [scene])
  return <primitive object={model} scale={0.05} />
}

function generateChestPosition(): [number, number, number] {
  for (let attempts = 0; attempts < 500; attempts++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const nx = Math.sin(phi) * Math.cos(theta)
    const ny = Math.cos(phi)
    const nz = Math.sin(phi) * Math.sin(theta)

    const { influence } = islandInfluence(nx, ny, nz, true)

    // Place on beaches (near coast but on land)
    if (influence > 0.08 && influence < 0.2) {
      const detail = fbmSimplex(nx * 12, ny * 12, nz * 12, 5) * 0.5 + 0.5
      const cliff = Math.pow(influence, 0.65)
      const height = 3.0 + cliff * 0.16 + detail * influence * 0.07
      return [nx * height, ny * height, nz * height]
    }
  }
  return [3.05, 0, 0]
}
