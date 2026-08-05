'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

interface TreeData {
  pos: [number, number, number]
  scale: number
  type: 'pine' | 'palm' | 'bush' | 'oak' | 'birch'
  rotY: number
}

interface HouseData {
  pos: [number, number, number]
  rotY: number
  color: string
  roofColor: string
  scale: number
}

function buildMatrix(pos: [number, number, number], scale: number, rotY: number): THREE.Matrix4 {
  const up = new THREE.Vector3(...pos).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
  const rotQ = new THREE.Quaternion().setFromAxisAngle(up, rotY)
  q.premultiply(rotQ)
  const mat = new THREE.Matrix4()
  mat.compose(new THREE.Vector3(...pos), q, new THREE.Vector3(scale, scale, scale))
  return mat
}

// Extract the first geometry found in a GLTF scene (merges all meshes into one)
function extractGeometry(gltf: THREE.Group): THREE.BufferGeometry | null {
  const geometries: THREE.BufferGeometry[] = []

  gltf.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      const geo = mesh.geometry.clone()
      // Apply the mesh's world transform so the geometry is in the correct local space
      mesh.updateWorldMatrix(true, false)
      geo.applyMatrix4(mesh.matrixWorld)
      geometries.push(geo)
    }
  })

  if (geometries.length === 0) return null
  if (geometries.length === 1) return geometries[0]

  // Merge multiple geometries into one using BufferGeometryUtils-style merge
  return mergeGeometries(geometries)
}

function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  // Simple merge: combine position, normal, and index buffers
  let totalVertices = 0
  let totalIndices = 0
  const hasIndex = geometries.every((g) => g.index !== null)

  for (const geo of geometries) {
    totalVertices += geo.attributes.position.count
    if (hasIndex && geo.index) {
      totalIndices += geo.index.count
    }
  }

  const mergedPositions = new Float32Array(totalVertices * 3)
  const mergedNormals = new Float32Array(totalVertices * 3)
  let mergedIndices: Uint32Array | null = hasIndex ? new Uint32Array(totalIndices) : null

  let vertexOffset = 0
  let indexOffset = 0

  for (const geo of geometries) {
    const positions = geo.attributes.position
    const normals = geo.attributes.normal

    for (let i = 0; i < positions.count; i++) {
      mergedPositions[(vertexOffset + i) * 3] = positions.getX(i)
      mergedPositions[(vertexOffset + i) * 3 + 1] = positions.getY(i)
      mergedPositions[(vertexOffset + i) * 3 + 2] = positions.getZ(i)

      if (normals) {
        mergedNormals[(vertexOffset + i) * 3] = normals.getX(i)
        mergedNormals[(vertexOffset + i) * 3 + 1] = normals.getY(i)
        mergedNormals[(vertexOffset + i) * 3 + 2] = normals.getZ(i)
      }
    }

    if (hasIndex && geo.index && mergedIndices) {
      for (let i = 0; i < geo.index.count; i++) {
        mergedIndices[indexOffset + i] = geo.index.array[i] + vertexOffset
      }
      indexOffset += geo.index.count
    }

    vertexOffset += positions.count
  }

  const merged = new THREE.BufferGeometry()
  merged.setAttribute('position', new THREE.BufferAttribute(mergedPositions, 3))
  merged.setAttribute('normal', new THREE.BufferAttribute(mergedNormals, 3))
  if (mergedIndices) {
    merged.setIndex(new THREE.BufferAttribute(mergedIndices, 1))
  }

  return merged
}

// Tree type -> GLB file mapping and colors
const TREE_CONFIG: Record<string, { glb: string; color: string }> = {
  pine: { glb: '/models/tree-conifer.glb', color: '#1B5E20' },    // dark green
  bush: { glb: '/models/tree-conifer.glb', color: '#4CAF50' },    // medium green
  oak: { glb: '/models/tree-broadleaf.glb', color: '#2E7D32' },   // rich green
  birch: { glb: '/models/tree-broadleaf.glb', color: '#8BC34A' }, // yellow-green
  palm: { glb: '/models/tree-palm.glb', color: '#228B22' },       // tropical green
}

// Cache loaded geometries so we don't re-fetch across re-renders
const geometryCache = new Map<string, THREE.BufferGeometry>()

export function InstancedTrees({ trees, treeScale }: { trees: TreeData[]; treeScale: number }) {
  const [geometries, setGeometries] = useState<Record<string, THREE.BufferGeometry>>({})
  const [loaded, setLoaded] = useState(false)

  // Load all 3 GLB files using raw GLTFLoader (no React Suspense)
  useEffect(() => {
    let cancelled = false
    const loader = new GLTFLoader()
    const glbFiles = ['/models/tree-conifer.glb', '/models/tree-broadleaf.glb', '/models/tree-palm.glb']

    const loadAll = async () => {
      const results: Record<string, THREE.BufferGeometry> = {}

      for (const file of glbFiles) {
        // Check cache first
        if (geometryCache.has(file)) {
          results[file] = geometryCache.get(file)!
          continue
        }

        try {
          const gltf = await loader.loadAsync(file)
          const geo = extractGeometry(gltf.scene)
          if (geo) {
            // Center the geometry at origin and normalize its size
            geo.computeBoundingBox()
            const box = geo.boundingBox!
            const center = new THREE.Vector3()
            box.getCenter(center)
            geo.translate(-center.x, -box.min.y, -center.z) // sit on ground (y=0)

            geometryCache.set(file, geo)
            results[file] = geo
          }
        } catch (err) {
          console.warn(`Failed to load ${file}:`, err)
        }
      }

      if (!cancelled) {
        setGeometries(results)
        setLoaded(true)
      }
    }

    loadAll()
    return () => { cancelled = true }
  }, [])

  // Group trees by type
  const grouped = useMemo(() => {
    const groups: Record<string, TreeData[]> = { pine: [], palm: [], bush: [], oak: [], birch: [] }
    for (const t of trees) {
      groups[t.type].push(t)
    }
    return groups
  }, [trees])

  if (!loaded) return null

  return (
    <>
      {Object.entries(grouped).map(([type, data]) => {
        if (data.length === 0) return null
        const config = TREE_CONFIG[type]
        const geo = geometries[config.glb]
        if (!geo) return null
        return (
          <GLBTreeInstanced
            key={type}
            data={data}
            treeScale={treeScale}
            geometry={geo}
            color={config.color}
          />
        )
      })}
    </>
  )
}

function GLBTreeInstanced({
  data,
  treeScale,
  geometry,
  color,
}: {
  data: TreeData[]
  treeScale: number
  geometry: THREE.BufferGeometry
  color: string
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  // The GLB scale factor — Meshy models are typically large, scale down
  const glbScale = 0.015

  useEffect(() => {
    if (!meshRef.current) return

    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale * glbScale
      const mat = buildMatrix(data[i].pos, s, data[i].rotY)
      meshRef.current.setMatrixAt(i, mat)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count])

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshLambertMaterial color={color} flatShading />
    </instancedMesh>
  )
}

// Instanced houses - grouped by color pair (unchanged from original)
export function InstancedHouses({ houses }: { houses: HouseData[] }) {
  // Group houses by color+roofColor combo
  const groups = useMemo(() => {
    const map = new Map<string, HouseData[]>()
    for (const h of houses) {
      const key = `${h.color}_${h.roofColor}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(h)
    }
    return Array.from(map.entries())
  }, [houses])

  return (
    <>
      {groups.map(([key, data]) => (
        <HouseGroup key={key} data={data} color={data[0].color} roofColor={data[0].roofColor} />
      ))}
    </>
  )
}

function HouseGroup({ data, color, roofColor }: { data: HouseData[]; color: string; roofColor: string }) {
  const wallRef = useRef<THREE.InstancedMesh>(null)
  const roofRef = useRef<THREE.InstancedMesh>(null)
  const doorRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  useEffect(() => {
    const tempMat = new THREE.Matrix4()
    const offset = new THREE.Matrix4()

    for (let i = 0; i < count; i++) {
      const base = buildMatrix(data[i].pos, data[i].scale, data[i].rotY)

      // Walls at y=0.35
      offset.makeTranslation(0, 0.35, 0)
      tempMat.copy(base).multiply(offset)
      wallRef.current?.setMatrixAt(i, tempMat)

      // Roof at y=0.82
      offset.makeTranslation(0, 0.82, 0)
      tempMat.copy(base).multiply(offset)
      roofRef.current?.setMatrixAt(i, tempMat)

      // Door at y=0.18, z=0.26
      offset.makeTranslation(0, 0.18, 0.26)
      tempMat.copy(base).multiply(offset)
      doorRef.current?.setMatrixAt(i, tempMat)
    }

    if (wallRef.current) wallRef.current.instanceMatrix.needsUpdate = true
    if (roofRef.current) roofRef.current.instanceMatrix.needsUpdate = true
    if (doorRef.current) doorRef.current.instanceMatrix.needsUpdate = true
  }, [data, count])

  return (
    <>
      <instancedMesh ref={wallRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[0.6, 0.7, 0.5]} />
        <meshLambertMaterial color={color} flatShading />
      </instancedMesh>
      <instancedMesh ref={roofRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <coneGeometry args={[0.5, 0.4, 4]} />
        <meshLambertMaterial color={roofColor} flatShading />
      </instancedMesh>
      <instancedMesh ref={doorRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[0.12, 0.3, 0.02]} />
        <meshLambertMaterial color="#3e2a1a" flatShading />
      </instancedMesh>
    </>
  )
}
