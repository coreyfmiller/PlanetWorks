'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'
import { simplex3 } from '@/lib/simplex'
import type { FishCatch } from '@/components/boat'

export interface LandResource {
  name: string
  emoji: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  value: number
  rodLevel: number // reuse field, always 1 for land resources
  biome: 'beach' | 'forest' | 'bush' | 'highland'
  color: string
}

export const LAND_RESOURCES: LandResource[] = [
  // Beach
  { name: 'Driftwood', emoji: '🪵', rarity: 'common', value: 5, rodLevel: 1, biome: 'beach', color: '#8B6914' },
  // Forest (pine/birch)
  { name: 'Mushroom', emoji: '🍄', rarity: 'uncommon', value: 8, rodLevel: 1, biome: 'forest', color: '#cc3333' },
  { name: 'Resin', emoji: '🟡', rarity: 'rare', value: 15, rodLevel: 1, biome: 'forest', color: '#d4920a' },
  // Bush/grassland
  { name: 'Wild Berries', emoji: '🫐', rarity: 'common', value: 4, rodLevel: 1, biome: 'bush', color: '#6a1b9a' },
  // Highland
  { name: 'Herbs', emoji: '🌿', rarity: 'uncommon', value: 9, rodLevel: 1, biome: 'highland', color: '#2e7d32' },
  { name: 'Flint', emoji: '🪨', rarity: 'rare', value: 12, rodLevel: 1, biome: 'highland', color: '#555555' },
]

interface SpawnPoint {
  position: THREE.Vector3
  normal: THREE.Vector3
  resource: LandResource
  collected: boolean
  respawnAt: number
}

interface LandResourcesProps {
  walkerPosition: THREE.Vector3 | null
  onCollect: (resource: FishCatch) => void
  cargoFull: boolean
}

export function LandResources({ walkerPosition, onCollect, cargoFull }: LandResourcesProps) {
  const spawnPoints = useRef<SpawnPoint[]>([])
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const keyRef = useRef(false)

  // Generate spawn points once (deterministic from noise)
  const points = useMemo(() => {
    const spawns: SpawnPoint[] = []
    const goldenAngle = Math.PI * (1 + Math.sqrt(5))

    for (let i = 0; i < 800; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 800)
      const theta = goldenAngle * (i + 0.5)
      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.cos(phi)
      const nz = Math.sin(phi) * Math.sin(theta)

      const { influence, nearCoast } = islandInfluence(nx, ny, nz, true)
      if (influence < 0.05) continue // water

      // Use noise to thin out - only ~30% of valid land gets a resource
      const density = simplex3(nx * 15, ny * 15, nz * 15) * 0.5 + 0.5
      if (density < 0.7) continue

      // Determine biome
      let biome: 'beach' | 'forest' | 'bush' | 'highland'
      if (nearCoast && influence < 0.2) {
        biome = 'beach'
      } else if (influence > 0.5) {
        biome = 'highland'
      } else {
        const treeNoise = simplex3(nx * 8, ny * 8, nz * 8) * 0.5 + 0.5
        biome = treeNoise > 0.5 ? 'forest' : 'bush'
      }

      // Pick a resource from this biome
      const available = LAND_RESOURCES.filter(r => r.biome === biome)
      if (available.length === 0) continue

      // Weighted random based on rarity
      const roll = simplex3(nx * 77, ny * 77, nz * 77) * 0.5 + 0.5
      let resource: LandResource
      if (roll > 0.85) {
        // Rare pick
        const rares = available.filter(r => r.rarity === 'rare' || r.rarity === 'uncommon')
        resource = rares.length > 0 ? rares[Math.floor(roll * rares.length) % rares.length] : available[0]
      } else {
        resource = available[Math.floor(roll * available.length) % available.length]
      }

      const normal = new THREE.Vector3(nx, ny, nz).normalize()
      // Calculate height (same as walker)
      const detail = (simplex3(nx * 12, ny * 12, nz * 12) + 1) * 0.25
      const cliff = Math.pow(influence, 0.65)
      let height = 3.0 + cliff * 0.16 + detail * influence * 0.07

      const mountain1Dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.7) ** 2 + (nz - 0.3) ** 2)
      const mountain2Dist = Math.sqrt((nx + 0.6) ** 2 + (ny - 0.2) ** 2 + (nz + 0.5) ** 2)
      if (mountain1Dist < 0.3 && influence > 0.3) {
        const peak = (1 - mountain1Dist / 0.3) * 0.2
        height += peak * peak * 1.5
      }
      if (mountain2Dist < 0.25 && influence > 0.3) {
        const peak = (1 - mountain2Dist / 0.25) * 0.18
        height += peak * peak * 1.2
      }

      const pos = normal.clone().multiplyScalar(height - 0.005)

      spawns.push({
        position: pos,
        normal,
        resource,
        collected: false,
        respawnAt: 0,
      })
    }

    spawnPoints.current = spawns
    return spawns
  }, [])

  // Handle E key collection + respawn logic + visibility
  const groupRefs = useRef<(THREE.Group | null)[]>([])

  useFrame(() => {
    if (!walkerPosition) return
    const now = Date.now()

    // Listen for E key
    const ePressed = keyRef.current

    for (let i = 0; i < spawnPoints.current.length; i++) {
      const sp = spawnPoints.current[i]
      const group = groupRefs.current[i]

      // Respawn check
      if (sp.collected && now > sp.respawnAt) {
        sp.collected = false
      }

      // Update visibility
      if (group) {
        group.visible = !sp.collected
      }

      // Collection check
      if (!sp.collected && ePressed && !cargoFull) {
        const dist = walkerPosition.distanceTo(sp.position)
        if (dist < 0.25) {
          sp.collected = true
          sp.respawnAt = now + 60000 + Math.random() * 30000 // 60-90s respawn
          onCollect({
            name: sp.resource.name,
            emoji: sp.resource.emoji,
            rarity: sp.resource.rarity,
            value: sp.resource.value,
            rodLevel: 1,
          })
          keyRef.current = false
        }
      }
    }

    if (ePressed) keyRef.current = false
  })

  // Key listener for E to collect
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'KeyE') keyRef.current = true
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {points.map((sp, i) => (
        <ResourceMarker key={i} index={i} groupRefs={groupRefs} spawn={sp} walkerPosition={walkerPosition} />
      ))}
    </>
  )
}

function ResourceMarker({ spawn, walkerPosition, index, groupRefs }: { spawn: SpawnPoint; walkerPosition: THREE.Vector3 | null; index: number; groupRefs: React.MutableRefObject<(THREE.Group | null)[]> }) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    groupRefs.current[index] = groupRef.current
  })

  // Orient to surface
  const quat = useMemo(() => {
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), spawn.normal)
  }, [spawn.normal])

  // Glow when player is near
  const isNear = walkerPosition ? walkerPosition.distanceTo(spawn.position) < 0.25 : false

  return (
    <group ref={groupRef} position={spawn.position} quaternion={quat}>
      <ResourceModel resource={spawn.resource} isNear={isNear} />
    </group>
  )
}

function ResourceModel({ resource, isNear }: { resource: LandResource; isNear: boolean }) {
  const emissive = isNear ? resource.color : '#000000'
  const ei = isNear ? 0.4 : 0

  switch (resource.name) {
    case 'Driftwood':
      // Weathered plank with grain texture
      return (
        <group rotation={[0, 0.4, 0]}>
          <mesh position={[0, 0.004, 0]} rotation={[0, 0, 0.05]}>
            <boxGeometry args={[0.06, 0.008, 0.015]} />
            <meshLambertMaterial color="#8B7355" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[0.015, 0.004, 0.003]}>
            <boxGeometry args={[0.02, 0.006, 0.008]} />
            <meshLambertMaterial color="#6b5530" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
        </group>
      )

    case 'Mushroom':
      // Stem + red cap with white spots
      return (
        <group>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.004, 0.006, 0.02, 5]} />
            <meshLambertMaterial color="#f0e8d0" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[0, 0.022, 0]}>
            <sphereGeometry args={[0.014, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshLambertMaterial color="#cc2222" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[0.005, 0.026, 0.003]}>
            <sphereGeometry args={[0.003, 4, 4]} />
            <meshLambertMaterial color="#ffffff" flatShading />
          </mesh>
          <mesh position={[-0.004, 0.025, -0.005]}>
            <sphereGeometry args={[0.002, 4, 4]} />
            <meshLambertMaterial color="#ffffff" flatShading />
          </mesh>
        </group>
      )

    case 'Resin':
      // Amber blob dripping down bark
      return (
        <group>
          <mesh position={[0, 0.01, 0]} scale={[1, 1.4, 1]}>
            <sphereGeometry args={[0.008, 5, 5]} />
            <meshPhongMaterial color="#e6a800" emissive={emissive} emissiveIntensity={ei} transparent opacity={0.8} shininess={90} flatShading />
          </mesh>
          <mesh position={[0, 0.003, 0]} scale={[1, 0.6, 1]}>
            <sphereGeometry args={[0.006, 4, 4]} />
            <meshPhongMaterial color="#cc8800" emissive={emissive} emissiveIntensity={ei} transparent opacity={0.7} shininess={90} flatShading />
          </mesh>
        </group>
      )

    case 'Wild Berries':
      // Bush with berries on it
      return (
        <group>
          {/* Bush body */}
          <mesh position={[0, 0.018, 0]}>
            <dodecahedronGeometry args={[0.022, 0]} />
            <meshLambertMaterial color="#2d5a1e" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          {/* Berries poking out */}
          <mesh position={[0.015, 0.025, 0.008]}>
            <sphereGeometry args={[0.005, 4, 4]} />
            <meshLambertMaterial color="#4a148c" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[-0.01, 0.028, 0.01]}>
            <sphereGeometry args={[0.004, 4, 4]} />
            <meshLambertMaterial color="#6a1b9a" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[0.005, 0.03, -0.012]}>
            <sphereGeometry args={[0.005, 4, 4]} />
            <meshLambertMaterial color="#38006b" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[-0.013, 0.022, -0.006]}>
            <sphereGeometry args={[0.004, 4, 4]} />
            <meshLambertMaterial color="#4a148c" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[0.01, 0.02, -0.005]}>
            <sphereGeometry args={[0.004, 4, 4]} />
            <meshLambertMaterial color="#6a1b9a" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
        </group>
      )

    case 'Herbs':
      // Small potted herb cluster with visible leaves
      return (
        <group>
          {/* Soil mound */}
          <mesh position={[0, 0.004, 0]}>
            <sphereGeometry args={[0.012, 5, 3, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshLambertMaterial color="#3e2723" flatShading />
          </mesh>
          {/* Leaf stems */}
          <mesh position={[0, 0.015, 0]}>
            <sphereGeometry args={[0.01, 5, 4]} />
            <meshLambertMaterial color="#1b5e20" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[0.008, 0.018, 0.004]}>
            <sphereGeometry args={[0.007, 4, 3]} />
            <meshLambertMaterial color="#2e7d32" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[-0.006, 0.016, -0.005]}>
            <sphereGeometry args={[0.006, 4, 3]} />
            <meshLambertMaterial color="#388e3c" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
        </group>
      )

    case 'Flint':
      // Jagged sharp rock shard
      return (
        <group rotation={[0.15, 0.3, 0.1]}>
          <mesh position={[0, 0.008, 0]} scale={[1.2, 0.5, 0.8]}>
            <octahedronGeometry args={[0.016, 0]} />
            <meshLambertMaterial color="#3a3a3a" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
          <mesh position={[0.008, 0.005, 0.004]} scale={[0.7, 0.4, 0.6]}>
            <tetrahedronGeometry args={[0.01, 0]} />
            <meshLambertMaterial color="#4a4a4a" emissive={emissive} emissiveIntensity={ei} flatShading />
          </mesh>
        </group>
      )

    default:
      return (
        <mesh position={[0, 0.01, 0]}>
          <sphereGeometry args={[0.012, 5, 4]} />
          <meshLambertMaterial color={resource.color} emissive={emissive} emissiveIntensity={ei} flatShading />
        </mesh>
      )
  }
}
