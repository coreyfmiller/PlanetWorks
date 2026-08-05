'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'
import { simplex3 } from '@/lib/simplex'

/**
 * Schools of small fish swimming just below the water surface.
 * They appear in groups near coastlines (fishing spots).
 * Purely visual, helps players know where to fish.
 */
export function FishSchools() {
  const groupRef = useRef<THREE.Group>(null)

  // Generate school positions in open water near coasts
  const schools = useMemo(() => {
    const result: { center: [number, number, number]; fish: { offset: [number, number, number]; speed: number; phase: number; size: number }[] }[] = []
    const count = 800

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.cos(phi)
      const nz = Math.sin(phi) * Math.sin(theta)

      const { influence } = islandInfluence(nx, ny, nz, true)

      // In open water (influence < 0.05 = water, < -0.5 = deep ocean)
      if (influence < 0.05 && influence > -0.9) {
        // Only some spots (noise-based)
        const spot = simplex3(nx * 5 + 200, ny * 5 + 200, nz * 5 + 200)
        if (spot > 0.3) {
          const r = 2.99 // below water surface
          const center: [number, number, number] = [nx * r, ny * r, nz * r]

          // 3-5 fish per school with varying sizes
          const fishCount = 3 + Math.floor(Math.random() * 3)
          const fish: { offset: [number, number, number]; speed: number; phase: number; size: number }[] = []
          for (let f = 0; f < fishCount; f++) {
            fish.push({
              offset: [
                (Math.random() - 0.5) * 0.04,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.04,
              ],
              speed: 0.8 + Math.random() * 0.6,
              phase: Math.random() * Math.PI * 2,
              size: 0.005 + Math.random() * 0.007,
            })
          }

          result.push({ center, fish })
        }
      }

      if (result.length >= 15) break // cap at 15 schools
    }

    return result
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    let childIdx = 0
    for (const school of schools) {
      for (const fish of school.fish) {
        const child = groupRef.current.children[childIdx] as THREE.Mesh
        if (child) {
          // Swim in a small circle around the school center
          const angle = t * fish.speed + fish.phase
          const cx = school.center[0] + fish.offset[0] + Math.cos(angle) * 0.015
          const cy = school.center[1] + fish.offset[1]
          const cz = school.center[2] + fish.offset[2] + Math.sin(angle) * 0.015
          child.position.set(cx, cy, cz)

          // Face swimming direction
          const nextAngle = angle + 0.1
          const dx = Math.cos(nextAngle) * 0.015 - Math.cos(angle) * 0.015
          const dz = Math.sin(nextAngle) * 0.015 - Math.sin(angle) * 0.015
          child.rotation.y = Math.atan2(dx, dz)
        }
        childIdx++
      }
    }
  })

  // Flatten all fish into one group
  const allFish = useMemo(() => {
    const result: { pos: [number, number, number]; size: number }[] = []
    for (const school of schools) {
      for (const fish of school.fish) {
        result.push({
          pos: [
            school.center[0] + fish.offset[0],
            school.center[1] + fish.offset[1],
            school.center[2] + fish.offset[2],
          ],
          size: fish.size,
        })
      }
    }
    return result
  }, [schools])

  return (
    <group ref={groupRef}>
      {allFish.map((f, i) => (
        <FishMesh key={i} position={f.pos} size={f.size} colorIndex={i % 3} />
      ))}
    </group>
  )
}

function FishMesh({ position, size, colorIndex }: { position: [number, number, number]; size: number; colorIndex: number }) {
  const bodyColors = ['#4488aa', '#5599bb', '#3377aa']
  const finColors = ['#336688', '#447799', '#225577']
  const bodyColor = bodyColors[colorIndex]
  const finColor = finColors[colorIndex]

  return (
    <group position={position} scale={size}>
      {/* Body - tapered oval (wide in middle, thin at ends) */}
      <mesh scale={[1.6, 0.7, 0.5]}>
        <sphereGeometry args={[1, 6, 5]} />
        <meshLambertMaterial color={bodyColor} flatShading />
      </mesh>

      {/* Tail fin - forked V shape */}
      <mesh position={[-1.6, 0.3, 0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.6, 0.15, 0.05]} />
        <meshLambertMaterial color={finColor} flatShading />
      </mesh>
      <mesh position={[-1.6, -0.3, 0]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.6, 0.15, 0.05]} />
        <meshLambertMaterial color={finColor} flatShading />
      </mesh>

      {/* Dorsal fin (top) */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.3, 0.6, 3]} />
        <meshLambertMaterial color={finColor} flatShading />
      </mesh>

      {/* Pectoral fins (sides) */}
      <mesh position={[0.3, -0.2, 0.4]} rotation={[0.4, 0.3, 0]}>
        <coneGeometry args={[0.15, 0.5, 3]} />
        <meshLambertMaterial color={finColor} flatShading />
      </mesh>
      <mesh position={[0.3, -0.2, -0.4]} rotation={[-0.4, -0.3, 0]}>
        <coneGeometry args={[0.15, 0.5, 3]} />
        <meshLambertMaterial color={finColor} flatShading />
      </mesh>

      {/* Eyes */}
      <mesh position={[1.1, 0.15, 0.35]}>
        <sphereGeometry args={[0.12, 4, 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.1, 0.15, -0.35]}>
        <sphereGeometry args={[0.12, 4, 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.2, 0.15, 0.38]}>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      <mesh position={[1.2, 0.15, -0.38]}>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      {/* Silver belly */}
      <mesh position={[0, -0.25, 0]} scale={[1.4, 0.4, 0.45]}>
        <sphereGeometry args={[1, 5, 4]} />
        <meshLambertMaterial color="#c0d8e8" flatShading />
      </mesh>
    </group>
  )
}

// Utility: find nearest fish school to a position
let _schoolCenters: [number, number, number][] | null = null

function getSchoolCenters(): [number, number, number][] {
  if (_schoolCenters) return _schoolCenters

  const results: [number, number, number][] = []
  const count = 800

  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
    const nx = Math.sin(phi) * Math.cos(theta)
    const ny = Math.cos(phi)
    const nz = Math.sin(phi) * Math.sin(theta)

    const { influence } = islandInfluence(nx, ny, nz, true)

    if (influence < 0.05 && influence > -0.9) {
      const spot = simplex3(nx * 5 + 200, ny * 5 + 200, nz * 5 + 200)
      if (spot > 0.3) {
        const r = 2.99
        results.push([nx * r, ny * r, nz * r])
      }
    }

    if (results.length >= 15) break
  }

  _schoolCenters = results
  return results
}

export function getNearestFishSchool(pos: THREE.Vector3): { position: [number, number, number]; distance: number } | null {
  const centers = getSchoolCenters()
  if (centers.length === 0) return null

  let best: [number, number, number] = centers[0]
  let bestDist = Infinity

  for (const c of centers) {
    const d = pos.distanceTo(new THREE.Vector3(...c))
    if (d < bestDist) {
      bestDist = d
      best = c
    }
  }

  return { position: best, distance: bestDist }
}
