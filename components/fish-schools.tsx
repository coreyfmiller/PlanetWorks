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

      // Near coast but in water (good fishing area)
      if (influence > -0.05 && influence < 0.06) {
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
        <mesh key={i} position={f.pos} scale={f.size}>
          <coneGeometry args={[0.5, 2, 3]} />
          <meshBasicMaterial color="#ff8844" transparent opacity={0.7} />
        </mesh>
      ))}
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

    if (influence > -0.05 && influence < 0.06) {
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
