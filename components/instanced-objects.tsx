'use client'

import { useMemo, useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

interface TreeData {
  pos: [number, number, number]
  scale: number
  type: 'pine' | 'palm' | 'bush' | 'oak' | 'birch'
  rotY: number
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

const TREE_TYPES = {
  pine: { color: '#1B5E20', scale: 0.012 },
  bush: { color: '#388E3C', scale: 0.008 },
  oak: { color: '#2E7D32', scale: 0.015 },
  birch: { color: '#66BB6A', scale: 0.012 },
  palm: { color: '#228B22', scale: 0.012 },
}

// Map types to GLB paths
function getGLBPath(type: string): string {
  if (type === 'palm') return '/models/tree-palm.glb'
  if (type === 'oak' || type === 'birch') return '/models/tree-broadleaf.glb'
  return '/models/tree-conifer.glb'
}

export function InstancedTrees({ trees, treeScale }: { trees: TreeData[]; treeScale: number }) {
  // Load all 3 GLBs using useLoader (suspends until ready)
  const [coniferGltf, broadleafGltf, palmGltf] = useLoader(GLTFLoader, [
    '/models/tree-conifer.glb',
    '/models/tree-broadleaf.glb',
    '/models/tree-palm.glb',
  ])

  // Extract first geometry from each
  const geometries = useMemo(() => {
    const extract = (gltf: any): THREE.BufferGeometry => {
      let geo: THREE.BufferGeometry | null = null
      gltf.scene.traverse((child: any) => {
        if (child.isMesh && !geo) {
          geo = child.geometry
        }
      })
      return geo || new THREE.ConeGeometry(0.5, 1.5, 5)
    }
    return {
      conifer: extract(coniferGltf),
      broadleaf: extract(broadleafGltf),
      palm: extract(palmGltf),
    }
  }, [coniferGltf, broadleafGltf, palmGltf])

  // Group trees by geometry type
  const grouped = useMemo(() => {
    const groups: { conifer: TreeData[]; broadleaf: TreeData[]; palm: TreeData[] } = {
      conifer: [],
      broadleaf: [],
      palm: [],
    }
    for (const t of trees) {
      if (t.type === 'palm') groups.palm.push(t)
      else if (t.type === 'oak' || t.type === 'birch') groups.broadleaf.push(t)
      else groups.conifer.push(t)
    }
    return groups
  }, [trees])

  return (
    <>
      {grouped.conifer.length > 0 && (
        <TreeInstanceGroup
          geometry={geometries.conifer}
          trees={grouped.conifer}
          treeScale={treeScale}
        />
      )}
      {grouped.broadleaf.length > 0 && (
        <TreeInstanceGroup
          geometry={geometries.broadleaf}
          trees={grouped.broadleaf}
          treeScale={treeScale}
        />
      )}
      {grouped.palm.length > 0 && (
        <TreeInstanceGroup
          geometry={geometries.palm}
          trees={grouped.palm}
          treeScale={treeScale}
        />
      )}
    </>
  )
}

function TreeInstanceGroup({ geometry, trees, treeScale }: {
  geometry: THREE.BufferGeometry
  trees: TreeData[]
  treeScale: number
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = trees.length

  // Create per-instance colors
  const material = useMemo(() => {
    return new THREE.MeshLambertMaterial({ vertexColors: false, flatShading: true })
  }, [])

  useEffect(() => {
    if (!meshRef.current) return

    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const tree = trees[i]
      const config = TREE_TYPES[tree.type]
      const s = tree.scale * treeScale * config.scale
      const mat = buildMatrix(tree.pos, s, tree.rotY)
      meshRef.current.setMatrixAt(i, mat)

      // Set per-instance color
      color.set(config.color)
      meshRef.current.setColorAt(i, color)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [trees, treeScale, count])

  // Need to enable instance color on the material
  const coloredMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({ flatShading: true })
  }, [])

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, coloredMaterial, count]}
      frustumCulled={false}
    />
  )
}

// Keep for compatibility
export function InstancedHouses({ houses }: { houses: any[] }) {
  return null
}
