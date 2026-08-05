'use client'

import { useMemo, useRef, useEffect, Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
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

// Map tree types to GLB + color
const TREE_CONFIG: Record<string, { path: string; color: string; scale: number }> = {
  pine: { path: '/models/tree-conifer.glb', color: '#1B5E20', scale: 0.012 },
  bush: { path: '/models/tree-conifer.glb', color: '#388E3C', scale: 0.008 },
  oak: { path: '/models/tree-broadleaf.glb', color: '#2E7D32', scale: 0.015 },
  birch: { path: '/models/tree-broadleaf.glb', color: '#66BB6A', scale: 0.012 },
  palm: { path: '/models/tree-palm.glb', color: '#228B22', scale: 0.012 },
}

export function InstancedTrees({ trees, treeScale }: { trees: TreeData[]; treeScale: number }) {
  const grouped = useMemo(() => {
    const groups: Record<string, TreeData[]> = {}
    for (const t of trees) {
      if (!groups[t.type]) groups[t.type] = []
      groups[t.type].push(t)
    }
    return groups
  }, [trees])

  return (
    <Suspense fallback={null}>
      {Object.entries(grouped).map(([type, data]) => (
        <GLBTreeGroup key={type} type={type} data={data} treeScale={treeScale} />
      ))}
    </Suspense>
  )
}

function GLBTreeGroup({ type, data, treeScale }: { type: string; data: TreeData[]; treeScale: number }) {
  const config = TREE_CONFIG[type] || TREE_CONFIG.pine
  const { scene } = useGLTF(config.path)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  // Get geometry from the loaded GLB
  const geometry = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && !geo) {
        geo = child.geometry
      }
    })
    return geo || new THREE.ConeGeometry(0.5, 1.5, 5)
  }, [scene])

  // Create colored material
  const material = useMemo(() => {
    return new THREE.MeshLambertMaterial({ color: config.color, flatShading: true })
  }, [config.color])

  useEffect(() => {
    if (!meshRef.current) return
    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale * config.scale
      const mat = buildMatrix(data[i].pos, s, data[i].rotY)
      meshRef.current.setMatrixAt(i, mat)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count, config.scale])

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  )
}

// Keep for compatibility
export function InstancedHouses({ houses }: { houses: any[] }) {
  return null
}
