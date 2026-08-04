'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

// Same noise as planet for consistency
function noise3D(x: number, y: number, z: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453
  return n - Math.floor(n)
}

function fbm(x: number, y: number, z: number, octaves: number): number {
  let value = 0
  let amplitude = 1
  let frequency = 1
  let totalAmplitude = 0
  for (let i = 0; i < octaves; i++) {
    value += amplitude * (noise3D(x * frequency, y * frequency, z * frequency) * 2 - 1)
    totalAmplitude += amplitude
    amplitude *= 0.5
    frequency *= 2
  }
  return value / totalAmplitude
}

interface TreeData {
  position: [number, number, number]
  scale: number
  rotation: number
}

export function Trees() {
  const trees = useMemo(() => {
    const result: TreeData[] = []
    const count = 80

    for (let i = 0; i < count; i++) {
      // Distribute points on sphere using fibonacci spiral
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)

      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.cos(phi)
      const nz = Math.sin(phi) * Math.sin(theta)

      // Check if this point is on land (same logic as planet)
      const continentNoise = fbm(nx * 1.5, ny * 1.5, nz * 1.5, 4)
      if (continentNoise < 0.05 || continentNoise > 0.4) continue // Skip ocean, beach, mountains

      // Place on planet surface
      const height = 1.5 + Math.max(0, continentNoise) * 0.12
      const pos: [number, number, number] = [nx * height, ny * height, nz * height]

      // Random scale and rotation
      const scale = 0.03 + noise3D(nx * 50, ny * 50, nz * 50) * 0.04
      const rotation = noise3D(nx * 100, ny * 100, nz * 100) * Math.PI * 2

      result.push({ position: pos, scale, rotation })
    }

    return result
  }, [])

  return (
    <group>
      {trees.map((tree, i) => (
        <Tree key={i} position={tree.position} scale={tree.scale} rotation={tree.rotation} />
      ))}
    </group>
  )
}

function Tree({ position, scale, rotation }: { position: [number, number, number]; scale: number; rotation: number }) {
  // Orient tree to point away from planet center
  const up = new THREE.Vector3(...position).normalize()
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    up
  )

  return (
    <group position={position} quaternion={quaternion} scale={scale}>
      <group rotation={[0, rotation, 0]}>
        {/* Trunk */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 0.8, 5]} />
          <meshLambertMaterial color="#8B5E3C" flatShading />
        </mesh>
        {/* Foliage layers */}
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.8, 1.2, 6]} />
          <meshLambertMaterial color="#2D8B4E" flatShading />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <coneGeometry args={[0.6, 1.0, 6]} />
          <meshLambertMaterial color="#3BA55D" flatShading />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <coneGeometry args={[0.35, 0.7, 5]} />
          <meshLambertMaterial color="#4CC76E" flatShading />
        </mesh>
      </group>
    </group>
  )
}
