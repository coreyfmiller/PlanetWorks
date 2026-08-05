'use client'

import { useMemo, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

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

// Map 5 tree types to 3 GLB models
function getModelPath(type: string): string {
  switch (type) {
    case 'pine':
    case 'bush':
      return '/models/tree-conifer.glb'
    case 'oak':
    case 'birch':
      return '/models/tree-broadleaf.glb'
    case 'palm':
      return '/models/tree-palm.glb'
    default:
      return '/models/tree-conifer.glb'
  }
}

export function InstancedTrees({ trees, treeScale }: { trees: TreeData[]; treeScale: number }) {
  // Group by GLB model path
  const grouped = useMemo(() => {
    const groups: Record<string, TreeData[]> = {}
    for (const t of trees) {
      const path = getModelPath(t.type)
      if (!groups[path]) groups[path] = []
      groups[path].push(t)
    }
    return groups
  }, [trees])

  return (
    <>
      {Object.entries(grouped).map(([path, data]) => (
        <TreeGLBInstanced key={path} path={path} data={data} treeScale={treeScale} />
      ))}
    </>
  )
}

function TreeGLBInstanced({ path, data, treeScale }: { path: string; data: TreeData[]; treeScale: number }) {
  const { scene } = useGLTF(path)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  // Extract geometry and material from the GLB
  const { geometry, material } = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null
    let mat: THREE.Material | THREE.Material[] = new THREE.MeshLambertMaterial({ color: '#44aa44' })

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && !geo) {
        geo = child.geometry.clone()
        mat = child.material
      }
    })

    return { geometry: geo || new THREE.BoxGeometry(1, 1, 1), material: mat }
  }, [scene])

  useEffect(() => {
    if (!meshRef.current) return

    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale * 0.03 // scale down GLB to match planet
      const mat = buildMatrix(data[i].pos, s, data[i].rotY)
      meshRef.current.setMatrixAt(i, mat)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count])

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, Array.isArray(material) ? material[0] : material, count]}
      frustumCulled={false}
    />
  )
}

// Keep houses export for compatibility (not currently used but don't break imports)
export function InstancedHouses({ houses }: { houses: HouseData[] }) {
  return null
}
