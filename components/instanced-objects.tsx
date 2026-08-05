'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
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

const TREE_CONFIG: Record<string, { geoFile: string; color: string; scale: number }> = {
  pine: { geoFile: '/models/tree-conifer.geo.json', color: '#1B5E20', scale: 0.012 },
  bush: { geoFile: '/models/tree-conifer.geo.json', color: '#4CAF50', scale: 0.008 },
  oak: { geoFile: '/models/tree-broadleaf.geo.json', color: '#2E7D32', scale: 0.015 },
  birch: { geoFile: '/models/tree-broadleaf.geo.json', color: '#8BC34A', scale: 0.012 },
  palm: { geoFile: '/models/tree-palm.geo.json', color: '#228B22', scale: 0.008 },
}

const geoCache = new Map<string, THREE.BufferGeometry>()

export function InstancedTrees({ trees, treeScale }: { trees: TreeData[]; treeScale: number }) {
  const [geometries, setGeometries] = useState<Map<string, THREE.BufferGeometry>>(new Map())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const loader = new THREE.BufferGeometryLoader()
    const files = new Set(Object.values(TREE_CONFIG).map(c => c.geoFile))

    const loadAll = async () => {
      const loaded = new Map<string, THREE.BufferGeometry>()

      for (const file of files) {
        if (geoCache.has(file)) {
          loaded.set(file, geoCache.get(file)!)
          continue
        }

        try {
          const res = await fetch(file)
          const json = await res.json()
          const geo = loader.parse(json)

          // Center on X/Z, sit on Y=0
          geo.computeBoundingBox()
          const box = geo.boundingBox!
          const center = new THREE.Vector3()
          box.getCenter(center)
          geo.translate(-center.x, -box.min.y, -center.z)

          geoCache.set(file, geo)
          loaded.set(file, geo)
          console.log(`[Trees] Loaded ${file}: ${geo.attributes.position.count} verts`)
        } catch (err) {
          console.error(`[Trees] Failed to load ${file}:`, err)
        }
      }

      if (!cancelled) {
        setGeometries(loaded)
        setReady(true)
        console.log(`[Trees] All geometries ready, ${loaded.size} files loaded`)
      }
    }

    loadAll()
    return () => { cancelled = true }
  }, [])

  // Group by type
  const grouped = useMemo(() => {
    const groups: Record<string, TreeData[]> = {}
    for (const t of trees) {
      if (!groups[t.type]) groups[t.type] = []
      groups[t.type].push(t)
    }
    return groups
  }, [trees])

  if (!ready) return null

  return (
    <>
      {Object.entries(grouped).map(([type, data]) => {
        if (data.length === 0) return null
        const config = TREE_CONFIG[type]
        const geo = geometries.get(config.geoFile)
        if (!geo) return null
        return (
          <TreeInstanceGroup
            key={type}
            data={data}
            treeScale={treeScale}
            geometry={geo}
            color={config.color}
            modelScale={config.scale}
          />
        )
      })}
    </>
  )
}

function TreeInstanceGroup({ data, treeScale, geometry, color, modelScale }: {
  data: TreeData[]
  treeScale: number
  geometry: THREE.BufferGeometry
  color: string
  modelScale: number
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  useEffect(() => {
    if (!meshRef.current) return
    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale * modelScale
      const mat = buildMatrix(data[i].pos, s, data[i].rotY)
      meshRef.current.setMatrixAt(i, mat)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count, modelScale])

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshLambertMaterial color={color} flatShading />
    </instancedMesh>
  )
}

// Keep export for compatibility
export function InstancedHouses({ houses }: { houses: any[] }) {
  return null
}
