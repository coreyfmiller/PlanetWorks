'use client'

import { useRef, useEffect } from 'react'
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

function parseGeoJSON(json: any): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry()
  const data = json.data || json

  if (data.attributes) {
    for (const [name, attr] of Object.entries(data.attributes as Record<string, any>)) {
      const typedArray = new Float32Array(attr.array)
      geo.setAttribute(name, new THREE.BufferAttribute(typedArray, attr.itemSize, attr.normalized || false))
    }
  }

  if (data.index) {
    const indexArray = new Uint32Array(data.index.array)
    geo.setIndex(new THREE.BufferAttribute(indexArray, 1))
  }

  geo.computeBoundingBox()
  const box = geo.boundingBox!
  const center = new THREE.Vector3()
  box.getCenter(center)
  geo.translate(-center.x, -box.min.y, -center.z)
  geo.computeVertexNormals()

  return geo
}

export function InstancedTrees({ trees, treeScale }: { trees: TreeData[]; treeScale: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const loadedRef = useRef(false)

  console.log('[Trees] Component rendered, trees:', trees.length, 'groupRef:', !!groupRef.current)

  useEffect(() => {
    console.log('[Trees] useEffect fired, loadedRef:', loadedRef.current, 'groupRef:', !!groupRef.current)
    if (loadedRef.current || !groupRef.current) return
    loadedRef.current = true

    const group = groupRef.current
    const files = [...new Set(Object.values(TREE_CONFIG).map(c => c.geoFile))]
    console.log('[Trees] Loading files:', files)

    // Group trees by type
    const groups: Record<string, TreeData[]> = {}
    for (const t of trees) {
      if (!groups[t.type]) groups[t.type] = []
      groups[t.type].push(t)
    }

    // Load geometries then create instanced meshes imperatively
    Promise.all(files.map(async (file) => {
      console.log('[Trees] Fetching:', file)
      const res = await fetch(file)
      console.log('[Trees] Fetch result:', file, res.status)
      const json = await res.json()
      console.log('[Trees] Parsed JSON:', file, 'keys:', Object.keys(json))
      return { file, geo: parseGeoJSON(json) }
    })).then((results) => {
      console.log('[Trees] All loaded, creating meshes')
      const geoMap = new Map<string, THREE.BufferGeometry>()
      for (const r of results) geoMap.set(r.file, r.geo)

      // Create InstancedMesh for each tree type
      for (const [type, data] of Object.entries(groups)) {
        if (data.length === 0) continue
        const config = TREE_CONFIG[type]
        const geo = geoMap.get(config.geoFile)
        if (!geo) continue

        const material = new THREE.MeshLambertMaterial({ color: config.color, flatShading: true })
        const mesh = new THREE.InstancedMesh(geo, material, data.length)
        mesh.frustumCulled = false

        for (let i = 0; i < data.length; i++) {
          const s = data[i].scale * treeScale * config.scale
          mesh.setMatrixAt(i, buildMatrix(data[i].pos, s, data[i].rotY))
        }
        mesh.instanceMatrix.needsUpdate = true

        group.add(mesh)
        console.log('[Trees] Added', type, 'mesh with', data.length, 'instances')
      }
      console.log('[Trees] Done!')
    }).catch((err) => {
      console.error('[Trees] Error:', err)
    })
  }, [trees, treeScale])

  return <group ref={groupRef} />
}

export function InstancedHouses({ houses }: { houses: any[] }) {
  return null
}
