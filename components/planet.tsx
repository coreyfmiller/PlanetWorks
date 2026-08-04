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

export function Planet({ waves = true, atmosphere = true, clouds = true, foam = false }: { waves?: boolean; atmosphere?: boolean; clouds?: boolean; foam?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.elapsedTime * 0.025
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
        // Deep = medium ocean blue, Shallow = bright turquoise
        colors[i * 3] = 0.04 + shallowFactor * 0.2
        colors[i * 3 + 1] = 0.15 + shallowFactor * 0.5
        colors[i * 3 + 2] = 0.35 + shallowFactor * 0.35
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
      {waves ? <AnimatedWater /> : <SimpleWater />}

      {/* Trees by biome */}
      {treeData.map((tree, i) => {
        if (tree.type === 'palm') return <PalmTree key={i} position={tree.pos} scale={tree.scale} />
        if (tree.type === 'pine') return <PineTree key={i} position={tree.pos} scale={tree.scale} />
        return <BushTree key={i} position={tree.pos} scale={tree.scale} />
      })}

      {/* Shore foam */}
      {foam && <ShoreFoam />}

      {/* Clouds */}
      {clouds && (
        <mesh ref={cloudsRef} geometry={cloudGeo}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}

      {/* Atmosphere rim light */}
      {atmosphere && (
        <>
          <mesh>
            <sphereGeometry args={[3.15, 64, 64]} />
            <meshBasicMaterial color="#66ccff" transparent opacity={0.03} side={THREE.BackSide} />
          </mesh>
          <mesh>
            <sphereGeometry args={[3.6, 32, 32]} />
            <meshBasicMaterial color="#88ddff" transparent opacity={0.015} side={THREE.BackSide} />
          </mesh>
        </>
      )}
    </group>
  )
}

function ShoreFoam() {
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(3.03, 7)
    const positions = g.attributes.position
    const colors = new Float32Array(positions.count * 3)
    const alphas = new Float32Array(positions.count)

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      const len = Math.sqrt(x * x + y * y + z * z)
      const nx = x / len
      const ny = y / len
      const nz = z / len

      const { influence } = islandInfluence(nx, ny, nz)
      // Only show foam right at the shoreline
      const isFoam = influence > 0.02 && influence < 0.18
      const foamStrength = isFoam ? 1 - Math.abs(influence - 0.1) / 0.1 : 0

      positions.setXYZ(i, nx * 3.03, ny * 3.03, nz * 3.03)
      colors[i * 3] = 0.9
      colors[i * 3 + 1] = 0.97
      colors[i * 3 + 2] = 1.0
      alphas[i] = foamStrength * 0.6
    }

    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geo}>
      <meshBasicMaterial vertexColors transparent opacity={0.5} depthWrite={false} />
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

        // Simple hash noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        // Smooth noise
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

        // Fractal brownian motion
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
          // Use world position for wave calculation (no UV seams)
          vec2 waveCoord = vWorldPos.xz * 1.2;

          // Multiple animated wave layers
          float wave1 = fbm(waveCoord * 1.5 + uTime * 0.3);
          float wave2 = fbm(waveCoord * 2.8 - uTime * 0.2 + vec2(5.0, 3.0));
          float wave3 = fbm(waveCoord * 5.0 + uTime * 0.15 + vec2(10.0, 8.0));

          float waves = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;

          // Depth-based coloring (center of sphere = deeper)
          float depth = dot(vWorldNormal, normalize(vWorldPos)) * 0.5 + 0.5;

          // Mix colors based on waves and depth
          vec3 color = mix(uColor1, uColor2, waves);
          color = mix(color, uColor3, pow(waves, 2.0) * 0.4);

          // Compute wave normal for lighting
          float dx = fbm(waveCoord * 2.0 + vec2(0.01, 0.0) + uTime * 0.3) - fbm(waveCoord * 2.0 - vec2(0.01, 0.0) + uTime * 0.3);
          float dy = fbm(waveCoord * 2.0 + vec2(0.0, 0.01) + uTime * 0.3) - fbm(waveCoord * 2.0 - vec2(0.0, 0.01) + uTime * 0.3);
          vec3 waveNormal = normalize(vWorldNormal + vec3(dx, dy, 0.0) * 2.0);

          // Diffuse lighting
          float diff = max(dot(waveNormal, uLightDir), 0.0) * 0.4 + 0.6;
          color *= diff;

          // Specular highlight
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          vec3 halfDir = normalize(uLightDir + viewDir);
          float spec = pow(max(dot(waveNormal, halfDir), 0.0), 60.0);
          color += vec3(1.0, 0.98, 0.95) * spec * 0.5;

          // Foam on wave peaks
          float foam = smoothstep(0.58, 0.65, waves);
          color = mix(color, vec3(0.9, 0.95, 1.0), foam * 0.3);

          // More transparent overall so terrain turquoise shows near shores
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


