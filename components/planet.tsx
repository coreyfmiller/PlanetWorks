'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { fbmSimplex, ridgedNoise, simplex3 } from '@/lib/simplex'

// 5 large continents + 10 medium islands for ~50/50 coverage
interface IslandDef {
  center: [number, number, number]
  size: number
  stretch: [number, number, number]
  type: 'continent' | 'atoll'
}

const ISLANDS: IslandDef[] = (() => {
  const islands: IslandDef[] = []

  const continentSeeds = [
    { phi: 0.5, theta: 0.2, size: 0.82, stretch: [1.4, 1.0, 0.7] as [number, number, number] },
    { phi: 1.8, theta: 2.8, size: 0.76, stretch: [0.7, 1.0, 1.4] as [number, number, number] },
    { phi: 0.9, theta: 5.2, size: 0.71, stretch: [1.5, 1.0, 0.8] as [number, number, number] },
    { phi: 2.5, theta: 0.8, size: 0.67, stretch: [1.0, 1.0, 1.5] as [number, number, number] },
    { phi: 2.1, theta: 4.2, size: 0.76, stretch: [1.3, 1.0, 1.0] as [number, number, number] },
  ]

  for (const s of continentSeeds) {
    islands.push({
      center: [Math.sin(s.phi) * Math.cos(s.theta), Math.cos(s.phi), Math.sin(s.phi) * Math.sin(s.theta)],
      size: s.size,
      stretch: s.stretch,
      type: 'continent',
    })
  }

  const mediumSeeds = [
    { phi: 0.3, theta: 2.2, size: 0.35 },
    { phi: 1.4, theta: 1.4, size: 0.31 },
    { phi: 2.8, theta: 2.5, size: 0.35 },
    { phi: 1.7, theta: 5.8, size: 0.29 },
    { phi: 0.8, theta: 3.8, size: 0.31 },
    { phi: 2.3, theta: 5.2, size: 0.3 },
    { phi: 1.4, theta: 0.5, size: 0.25 },
    { phi: 0.4, theta: 5.4, size: 0.29 },
    { phi: 2.7, theta: 4.5, size: 0.26 },
    { phi: 1.2, theta: 6.0, size: 0.31 },
  ]

  for (const s of mediumSeeds) {
    islands.push({
      center: [Math.sin(s.phi) * Math.cos(s.theta), Math.cos(s.phi), Math.sin(s.phi) * Math.sin(s.theta)],
      size: s.size,
      stretch: [1, 1, 1],
      type: 'atoll',
    })
  }

  return islands
})()

function islandInfluence(nx: number, ny: number, nz: number): { influence: number; nearCoast: boolean } {
  let maxInfluence = -1

  for (let i = 0; i < ISLANDS.length; i++) {
    const island = ISLANDS[i]
    const [cx, cy, cz] = island.center
    const dx = (nx - cx) * island.stretch[0]
    const dy = (ny - cy) * island.stretch[1]
    const dz = (nz - cz) * island.stretch[2]
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

    const radius = island.size
    if (dist < radius) {
      const t = 1 - dist / radius
      let influence = t * t * (3 - 2 * t)

      // Simplex noise for jagged coastlines
      const coastNoise = fbmSimplex(nx * 6 + i * 13, ny * 6 + i * 27, nz * 6 + i * 41, 4) * 0.4
      influence += coastNoise * t * t

      // Ridges on continents
      if (island.type === 'continent' && influence > 0.3) {
        const ridge = ridgedNoise(nx * 8 + i * 5, ny * 8 + i * 9, nz * 8 + i * 3, 3)
        influence += ridge * 0.15
      }

      if (influence > maxInfluence) maxInfluence = influence
    }
  }

  const nearCoast = maxInfluence > 0.08 && maxInfluence < 0.13
  return { influence: maxInfluence, nearCoast }
}

export function Planet() {
  const meshRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.elapsedTime * 0.025
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.elapsedTime * 0.015
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3.0, 8)
    const positions = geo.attributes.position
    const colors = new Float32Array(positions.count * 3)

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)

      const len = Math.sqrt(x * x + y * y + z * z)
      const nx = x / len
      const ny = y / len
      const nz = z / len

      const { influence, nearCoast } = islandInfluence(nx, ny, nz)
      const isLand = influence > 0.1

      let height: number
      if (isLand) {
        // Gentler terrain with some rolling hills
        const detail = fbmSimplex(nx * 12, ny * 12, nz * 12, 5) * 0.5 + 0.5
        const cliff = Math.pow(influence, 0.65)
        height = 3.0 + cliff * 0.16 + detail * influence * 0.07

        // Only 2 mountain peaks on the whole planet
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
      } else {
        const oceanDetail = fbmSimplex(nx * 4, ny * 4, nz * 4, 2) * 0.01
        height = 3.0 - 0.04 + oceanDetail
      }

      positions.setXYZ(i, nx * height, ny * height, nz * height)

      // Biome colors
      if (isLand) {
        if (nearCoast) {
          colors[i * 3] = 0.96; colors[i * 3 + 1] = 0.88; colors[i * 3 + 2] = 0.5
        } else if (influence > 0.75) {
          // Only show snow on the tallest peaks of large continents (not small islands)
          const heightAboveSea = height - 3.0
          const snow = simplex3(nx * 15, ny * 15, nz * 15) * 0.5 + 0.5
          if (heightAboveSea > 0.28 && snow > 0.4) {
            colors[i * 3] = 0.95; colors[i * 3 + 1] = 0.97; colors[i * 3 + 2] = 1.0
          } else if (heightAboveSea > 0.22) {
            // Exposed rock on high areas without snow
            colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.45; colors[i * 3 + 2] = 0.4
          } else {
            // High elevation but not tall enough for snow - dark forest
            const v = simplex3(nx * 20, ny * 20, nz * 20) * 0.5 + 0.5
            colors[i * 3] = 0.08 + v * 0.08; colors[i * 3 + 1] = 0.32 + v * 0.15; colors[i * 3 + 2] = 0.06 + v * 0.04
          }
        } else if (influence > 0.5) {
          const v = simplex3(nx * 20, ny * 20, nz * 20) * 0.5 + 0.5
          colors[i * 3] = 0.08 + v * 0.08; colors[i * 3 + 1] = 0.32 + v * 0.15; colors[i * 3 + 2] = 0.06 + v * 0.04
        } else {
          const v = simplex3(nx * 18, ny * 18, nz * 18) * 0.5 + 0.5
          colors[i * 3] = 0.15 + v * 0.12; colors[i * 3 + 1] = 0.5 + v * 0.28; colors[i * 3 + 2] = 0.08 + v * 0.07
        }
      } else {
        const shallowFactor = Math.max(0, (influence + 0.1)) * 4
        colors[i * 3] = 0.02 + shallowFactor * 0.15
        colors[i * 3 + 1] = 0.1 + shallowFactor * 0.35
        colors[i * 3 + 2] = 0.35 + shallowFactor * 0.25
      }
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  // Trees: 3 types by biome
  const treeData = useMemo(() => {
    const trees: { pos: [number, number, number]; scale: number; type: 'pine' | 'palm' | 'bush' }[] = []
    const count = 400
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.cos(phi)
      const nz = Math.sin(phi) * Math.sin(theta)

      const { influence, nearCoast } = islandInfluence(nx, ny, nz)
      if (influence < 0.15 || influence > 0.75) continue

      const detail = fbmSimplex(nx * 12, ny * 12, nz * 12, 5) * 0.5 + 0.5
      const cliff = Math.pow(influence, 0.65)
      const height = 3.0 + cliff * 0.16 + detail * influence * 0.07

      const type = nearCoast ? 'palm' : influence > 0.5 ? 'pine' : 'bush'
      trees.push({
        pos: [nx * height, ny * height, nz * height],
        scale: 0.04 + simplex3(nx * 50, ny * 50, nz * 50) * 0.5 * 0.025,
        type,
      })
    }
    return trees
  }, [])

  // Ocean particles (sea foam/mist)
  const particleGeo = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * Math.random())
      const theta = Math.random() * Math.PI * 2
      const r = 3.05 + Math.random() * 0.08
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  // Cloud geometry
  const cloudGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3.45, 5)
    const positions = geo.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      const len = Math.sqrt(x * x + y * y + z * z)
      positions.setXYZ(i, (x / len) * 3.45, (y / len) * 3.45, (z / len) * 3.45)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <group>
      {/* Planet terrain */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshLambertMaterial vertexColors flatShading />
      </mesh>

      {/* Water */}
      <AnimatedWater />

      {/* Trees by biome */}
      {treeData.map((tree, i) => {
        if (tree.type === 'palm') return <PalmTree key={i} position={tree.pos} scale={tree.scale} />
        if (tree.type === 'pine') return <PineTree key={i} position={tree.pos} scale={tree.scale} />
        return <BushTree key={i} position={tree.pos} scale={tree.scale} />
      })}

      {/* Ocean foam particles */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.4} sizeAttenuation />
      </points>

      {/* Clouds */}
      <mesh ref={cloudsRef} geometry={cloudGeo}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Atmosphere rim light */}
      <mesh>
        <sphereGeometry args={[3.15, 64, 64]} />
        <meshBasicMaterial color="#66ccff" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[3.6, 32, 32]} />
        <meshBasicMaterial color="#88ddff" transparent opacity={0.015} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

// Palm tree - near coasts
function PalmTree({ position, scale }: { position: [number, number, number]; scale: number }) {
  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
  return (
    <group position={position} quaternion={q} scale={scale}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1.2, 5]} />
        <meshLambertMaterial color="#8B6914" flatShading />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.5, 5, 4]} />
        <meshLambertMaterial color="#228B22" flatShading />
      </mesh>
    </group>
  )
}

// Pine tree - highlands
function PineTree({ position, scale }: { position: [number, number, number]; scale: number }) {
  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
  return (
    <group position={position} quaternion={q} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.6, 4]} />
        <meshLambertMaterial color="#5C3317" flatShading />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[0.6, 0.9, 5]} />
        <meshLambertMaterial color="#1B5E20" flatShading />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[0.45, 0.7, 5]} />
        <meshLambertMaterial color="#2E7D32" flatShading />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.3, 0.5, 4]} />
        <meshLambertMaterial color="#388E3C" flatShading />
      </mesh>
    </group>
  )
}

// Bush tree - grasslands
function BushTree({ position, scale }: { position: [number, number, number]; scale: number }) {
  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
  return (
    <group position={position} quaternion={q} scale={scale}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 4]} />
        <meshLambertMaterial color="#6B4226" flatShading />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshLambertMaterial color="#4CAF50" flatShading />
      </mesh>
    </group>
  )
}

function AnimatedWater() {
  return (
    <mesh>
      <sphereGeometry args={[3.02, 64, 64]} />
      <meshPhongMaterial
        color="#1a85c4"
        transparent
        opacity={0.55}
        shininess={100}
        specular={new THREE.Color('#88ccff')}
      />
    </mesh>
  )
}
