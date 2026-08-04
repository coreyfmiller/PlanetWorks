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

function islandInfluence(nx: number, ny: number, nz: number, wideBeach: boolean): { influence: number; nearCoast: boolean } {
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

      const coastNoise = fbmSimplex(nx * 6 + i * 13, ny * 6 + i * 27, nz * 6 + i * 41, 4) * 0.4
      influence += coastNoise * t * t

      if (island.type === 'continent' && influence > 0.3) {
        const ridge = ridgedNoise(nx * 8 + i * 5, ny * 8 + i * 9, nz * 8 + i * 3, 3)
        influence += ridge * 0.15
      }

      if (influence > maxInfluence) maxInfluence = influence
    }
  }

  // Feature 5: wider beach band when toggled
  const nearCoast = wideBeach
    ? maxInfluence > 0.05 && maxInfluence < 0.18
    : maxInfluence > 0.08 && maxInfluence < 0.13

  return { influence: maxInfluence, nearCoast }
}

export interface PlanetProps {
  waves?: boolean
  atmosphere?: boolean
  moon?: boolean
  stars?: boolean
  dramaticLighting?: boolean
  wideBeach?: boolean
  cloudPuffs?: boolean
  dayNight?: boolean
  boat?: boolean
  birds?: boolean
  snowCap?: boolean
  pollen?: boolean
  biggerTrees?: boolean
}

export function Planet({
  waves = true,
  atmosphere = true,
  moon = true,
  stars = true,
  dramaticLighting = false,
  wideBeach = true,
  cloudPuffs = true,
  dayNight = false,
  boat = true,
  birds = true,
  snowCap = true,
  pollen = true,
  biggerTrees = true,
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)

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

      const { influence, nearCoast } = islandInfluence(nx, ny, nz, wideBeach)
      const isLand = influence > 0.1

      let height: number
      if (isLand) {
        const detail = fbmSimplex(nx * 12, ny * 12, nz * 12, 5) * 0.5 + 0.5
        const cliff = Math.pow(influence, 0.65)
        height = 3.0 + cliff * 0.16 + detail * influence * 0.07

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
          const heightAboveSea = height - 3.0
          const snow = simplex3(nx * 15, ny * 15, nz * 15) * 0.5 + 0.5
          // Feature 10: Snow cap toggle
          if (heightAboveSea > 0.28 && snow > 0.4) {
            if (snowCap) {
              colors[i * 3] = 0.95; colors[i * 3 + 1] = 0.97; colors[i * 3 + 2] = 1.0
            } else {
              // Rock color when snow is off
              colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.45; colors[i * 3 + 2] = 0.4
            }
          } else if (heightAboveSea > 0.22) {
            colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.45; colors[i * 3 + 2] = 0.4
          } else {
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
        colors[i * 3] = 0.04 + shallowFactor * 0.2
        colors[i * 3 + 1] = 0.15 + shallowFactor * 0.5
        colors[i * 3 + 2] = 0.35 + shallowFactor * 0.35
      }
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wideBeach, snowCap])

  // Trees: 5 types by biome
  const treeData = useMemo(() => {
    const trees: { pos: [number, number, number]; scale: number; type: 'pine' | 'palm' | 'bush' | 'oak' | 'birch' }[] = []
    const count = 400
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
      const nx = Math.sin(phi) * Math.cos(theta)
      const ny = Math.cos(phi)
      const nz = Math.sin(phi) * Math.sin(theta)

      const { influence, nearCoast } = islandInfluence(nx, ny, nz, wideBeach)
      if (influence < 0.15 || influence > 0.75) continue

      const detail = fbmSimplex(nx * 12, ny * 12, nz * 12, 5) * 0.5 + 0.5
      const cliff = Math.pow(influence, 0.65)
      const height = 3.0 + cliff * 0.16 + detail * influence * 0.07

      // Distribute 5 types based on biome + variation
      const variation = simplex3(nx * 50, ny * 50, nz * 50) * 0.5 + 0.5
      let type: 'pine' | 'palm' | 'bush' | 'oak' | 'birch'
      if (nearCoast) {
        type = 'palm'
      } else if (influence > 0.5) {
        type = variation > 0.6 ? 'birch' : 'pine'
      } else {
        type = variation > 0.65 ? 'oak' : variation > 0.3 ? 'bush' : 'birch'
      }

      trees.push({
        pos: [nx * height, ny * height, nz * height],
        scale: 0.04 + simplex3(nx * 50, ny * 50, nz * 50) * 0.5 * 0.025,
        type,
      })
    }
    return trees
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wideBeach])

  const treeScale = biggerTrees ? 2 : 1

  return (
    <group>
      {/* Planet terrain */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshLambertMaterial vertexColors flatShading />
      </mesh>

      {/* Water */}
      {waves ? <AnimatedWater /> : <SimpleWater />}

      {/* Trees by biome - 5 types */}
      {treeData.map((tree, i) => {
        const s = tree.scale * treeScale
        if (tree.type === 'palm') return <PalmTree key={i} position={tree.pos} scale={s} />
        if (tree.type === 'pine') return <PineTree key={i} position={tree.pos} scale={s} />
        if (tree.type === 'oak') return <OakTree key={i} position={tree.pos} scale={s} />
        if (tree.type === 'birch') return <BirchTree key={i} position={tree.pos} scale={s} />
        return <BushTree key={i} position={tree.pos} scale={s} />
      })}

      {/* Atmosphere glow */}
      {atmosphere && <AtmosphereGlow />}

      {/* Cloud puffs */}
      {cloudPuffs && <CloudPuffs />}

      {/* Moon */}
      {moon && <Moon />}

      {/* Stars */}
      {stars && <Stars />}

      {/* Birds */}
      {birds && <Birds />}

      {/* Boat */}
      {boat && <Boat />}

      {/* Pollen/dust */}
      {pollen && <Pollen />}

      {/* Day/night rotating light */}
      {dayNight && <DayNightLight />}

      {/* Dramatic lighting overrides (handled in page.tsx via light props) */}
    </group>
  )
}

// Feature 6: Cloud puffs - 3D puffy clouds from clustered spheres
function CloudPuffs() {
  const groupRef = useRef<THREE.Group>(null)
  const clouds = useMemo(() => {
    const result: { pos: [number, number, number]; scale: number }[] = []
    const count = 14
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)
      const theta = (Math.PI * 2 * i) / count + i * 1.2
      const r = 3.3 + Math.random() * 0.1
      result.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        ],
        scale: 0.15 + Math.random() * 0.1,
      })
    }
    return result
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.015
    }
  })

  return (
    <group ref={groupRef}>
      {clouds.map((c, i) => {
        const up = new THREE.Vector3(...c.pos).normalize()
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
        return (
          <group key={i} position={c.pos} quaternion={q} scale={c.scale}>
            {/* Cluster of spheres to make a puffy cloud */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1, 7, 5]} />
              <meshLambertMaterial color="#ffffff" transparent opacity={0.85} />
            </mesh>
            <mesh position={[0.7, -0.1, 0.2]}>
              <sphereGeometry args={[0.75, 6, 4]} />
              <meshLambertMaterial color="#ffffff" transparent opacity={0.85} />
            </mesh>
            <mesh position={[-0.6, -0.1, -0.1]}>
              <sphereGeometry args={[0.7, 6, 4]} />
              <meshLambertMaterial color="#ffffff" transparent opacity={0.85} />
            </mesh>
            <mesh position={[0.2, 0.3, -0.3]}>
              <sphereGeometry args={[0.6, 6, 4]} />
              <meshLambertMaterial color="#ffffff" transparent opacity={0.85} />
            </mesh>
            <mesh position={[-0.3, 0.2, 0.4]}>
              <sphereGeometry args={[0.55, 5, 4]} />
              <meshLambertMaterial color="#ffffff" transparent opacity={0.85} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// Feature 2: Moon - small gray sphere orbiting the planet
function Moon() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime * 0.15
      ref.current.position.x = Math.cos(t) * 5
      ref.current.position.y = Math.sin(t * 0.3) * 1.5
      ref.current.position.z = Math.sin(t) * 5
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshLambertMaterial color="#aaaaaa" flatShading />
    </mesh>
  )
}

// Feature 3: Stars - 500 white point sprites in large sphere
function Stars() {
  const geo = useMemo(() => {
    const count = 500
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [])

  return (
    <points geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.15} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// Feature 7: Day/night - rotating directional light
function DayNightLight() {
  const ref = useRef<THREE.DirectionalLight>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime * 0.1
      ref.current.position.x = Math.cos(t) * 10
      ref.current.position.y = 5
      ref.current.position.z = Math.sin(t) * 10
    }
  })

  return <directionalLight ref={ref} intensity={2.0} color="#ffe8cc" />
}

// Feature 8: Boat - small triangle sail + flat rectangle hull on water
function Boat() {
  // Place it at a fixed water position
  const pos = useMemo(() => {
    const nx = 0.8
    const ny = 0.1
    const nz = 0.5
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
    const r = 3.04
    return [nx / len * r, ny / len * r, nz / len * r] as [number, number, number]
  }, [])

  const up = new THREE.Vector3(...pos).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)

  return (
    <group position={pos} quaternion={q} scale={0.08}>
      {/* Hull */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.6]} />
        <meshLambertMaterial color="#8B4513" flatShading />
      </mesh>
      {/* Mast */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4, 4]} />
        <meshLambertMaterial color="#5C3317" flatShading />
      </mesh>
      {/* Sail */}
      <mesh position={[0.2, 0.9, 0]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[0.7, 1.0]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Feature 9: Birds - 8 V-shaped meshes circling above the planet
function Birds() {
  const groupRef = useRef<THREE.Group>(null)
  const birdData = useMemo(() => {
    const result: { offset: number; height: number; speed: number }[] = []
    for (let i = 0; i < 8; i++) {
      result.push({
        offset: (Math.PI * 2 * i) / 8,
        height: -0.5 + Math.random() * 1.0,
        speed: 0.3 + Math.random() * 0.2,
      })
    }
    return result
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const children = groupRef.current.children
    for (let i = 0; i < children.length; i++) {
      const bird = children[i]
      const data = birdData[i]
      const t = clock.elapsedTime * data.speed + data.offset
      const r = 3.5
      bird.position.x = Math.cos(t) * r
      bird.position.y = data.height + Math.sin(t * 2) * 0.1
      bird.position.z = Math.sin(t) * r
      bird.rotation.y = -t + Math.PI / 2
    }
  })

  return (
    <group ref={groupRef}>
      {birdData.map((_, i) => (
        <group key={i} scale={0.04}>
          {/* Left wing */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0.3]}>
            <planeGeometry args={[1, 0.3]} />
            <meshBasicMaterial color="#222222" side={THREE.DoubleSide} />
          </mesh>
          {/* Right wing */}
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, -0.3]}>
            <planeGeometry args={[1, 0.3]} />
            <meshBasicMaterial color="#222222" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Feature 11: Pollen/dust - 100 tiny gold point sprites drifting around the planet
function Pollen() {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.3 + Math.random() * 0.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.03
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#daa520" size={0.03} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// Atmosphere glow sphere
function AtmosphereGlow() {
  const cloudsRef = useRef<THREE.Mesh>(null)

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

  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.elapsedTime * 0.025
    }
  })

  return (
    <mesh ref={cloudsRef} geometry={cloudGeo}>
      <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
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

// Feature 1: OakTree - round sphere canopy on a trunk
function OakTree({ position, scale }: { position: [number, number, number]; scale: number }) {
  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
  return (
    <group position={position} quaternion={q} scale={scale}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.8, 5]} />
        <meshLambertMaterial color="#6B4226" flatShading />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.7, 6, 5]} />
        <meshLambertMaterial color="#2E7D32" flatShading />
      </mesh>
    </group>
  )
}

// Feature 1: BirchTree - tall thin cylinder with small leaves
function BirchTree({ position, scale }: { position: [number, number, number]; scale: number }) {
  const up = new THREE.Vector3(...position).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
  return (
    <group position={position} quaternion={q} scale={scale}>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.4, 5]} />
        <meshLambertMaterial color="#e8e0d0" flatShading />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.35, 5, 4]} />
        <meshLambertMaterial color="#66BB6A" flatShading />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.25, 5, 4]} />
        <meshLambertMaterial color="#81C784" flatShading />
      </mesh>
    </group>
  )
}

function SimpleWater() {
  return (
    <mesh>
      <sphereGeometry args={[3.02, 64, 64]} />
      <meshPhongMaterial
        color="#1a7fc4"
        transparent
        opacity={0.5}
        shininess={40}
        specular={new THREE.Color('#446688')}
      />
    </mesh>
  )
}

function AnimatedWater() {
  const ref = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#0a4a7a') },
        uColor2: { value: new THREE.Color('#1a88c8') },
        uColor3: { value: new THREE.Color('#44c8e8') },
        uLightDir: { value: new THREE.Vector3(0.6, 0.8, 0.4).normalize() },
      },
      vertexShader: `
        varying vec3 vWorldNormal;
        varying vec3 vWorldPos;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uLightDir;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPos;
        varying vec2 vUv;
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p *= 2.1;
            a *= 0.5;
          }
          return v;
        }
        void main() {
          vec2 waveCoord = vWorldPos.xz * 1.2;
          float wave1 = fbm(waveCoord * 1.5 + uTime * 0.3);
          float wave2 = fbm(waveCoord * 2.8 - uTime * 0.2 + vec2(5.0, 3.0));
          float wave3 = fbm(waveCoord * 5.0 + uTime * 0.15 + vec2(10.0, 8.0));
          float waves = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;
          float depth = dot(vWorldNormal, normalize(vWorldPos)) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, waves);
          color = mix(color, uColor3, pow(waves, 2.0) * 0.4);
          float dx = fbm(waveCoord * 2.0 + vec2(0.01, 0.0) + uTime * 0.3) - fbm(waveCoord * 2.0 - vec2(0.01, 0.0) + uTime * 0.3);
          float dy = fbm(waveCoord * 2.0 + vec2(0.0, 0.01) + uTime * 0.3) - fbm(waveCoord * 2.0 - vec2(0.0, 0.01) + uTime * 0.3);
          vec3 waveNormal = normalize(vWorldNormal + vec3(dx, dy, 0.0) * 2.0);
          float diff = max(dot(waveNormal, uLightDir), 0.0) * 0.4 + 0.6;
          color *= diff;
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          vec3 halfDir = normalize(uLightDir + viewDir);
          float spec = pow(max(dot(waveNormal, halfDir), 0.0), 60.0);
          color += vec3(1.0, 0.98, 0.95) * spec * 0.5;
          float foam = smoothstep(0.58, 0.65, waves);
          color = mix(color, vec3(0.9, 0.95, 1.0), foam * 0.3);
          float alpha = 0.45;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    })
  }, [])

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={ref} material={material}>
      <sphereGeometry args={[3.02, 64, 64]} />
    </mesh>
  )
}
