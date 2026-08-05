'use client'

import { useMemo, useRef, useEffect } from 'react'
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

// Instanced trees: one InstancedMesh for trunk + one for canopy per type
export function InstancedTrees({ trees, treeScale }: { trees: TreeData[]; treeScale: number }) {
  // Group by type
  const grouped = useMemo(() => {
    const groups: Record<string, TreeData[]> = { pine: [], palm: [], bush: [], oak: [], birch: [] }
    for (const t of trees) {
      groups[t.type].push(t)
    }
    return groups
  }, [trees])

  return (
    <>
      {grouped.pine.length > 0 && <PineInstanced data={grouped.pine} treeScale={treeScale} />}
      {grouped.palm.length > 0 && <PalmInstanced data={grouped.palm} treeScale={treeScale} />}
      {grouped.bush.length > 0 && <BushInstanced data={grouped.bush} treeScale={treeScale} />}
      {grouped.oak.length > 0 && <OakInstanced data={grouped.oak} treeScale={treeScale} />}
      {grouped.birch.length > 0 && <BirchInstanced data={grouped.birch} treeScale={treeScale} />}
    </>
  )
}

function PineInstanced({ data, treeScale }: { data: TreeData[]; treeScale: number }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const cone1Ref = useRef<THREE.InstancedMesh>(null)
  const cone2Ref = useRef<THREE.InstancedMesh>(null)
  const cone3Ref = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  useEffect(() => {
    const tempMat = new THREE.Matrix4()
    const offset = new THREE.Matrix4()

    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale
      const base = buildMatrix(data[i].pos, s, data[i].rotY)

      // Trunk at y=0.3
      offset.makeTranslation(0, 0.3, 0)
      tempMat.copy(base).multiply(offset)
      trunkRef.current?.setMatrixAt(i, tempMat)

      // Cone1 at y=0.9
      offset.makeTranslation(0, 0.9, 0)
      tempMat.copy(base).multiply(offset)
      cone1Ref.current?.setMatrixAt(i, tempMat)

      // Cone2 at y=1.4
      offset.makeTranslation(0, 1.4, 0)
      tempMat.copy(base).multiply(offset)
      cone2Ref.current?.setMatrixAt(i, tempMat)

      // Cone3 at y=1.8
      offset.makeTranslation(0, 1.8, 0)
      tempMat.copy(base).multiply(offset)
      cone3Ref.current?.setMatrixAt(i, tempMat)
    }

    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true
    if (cone1Ref.current) cone1Ref.current.instanceMatrix.needsUpdate = true
    if (cone2Ref.current) cone2Ref.current.instanceMatrix.needsUpdate = true
    if (cone3Ref.current) cone3Ref.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count])

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.1, 0.15, 0.6, 4]} />
        <meshLambertMaterial color="#5C3317" flatShading />
      </instancedMesh>
      <instancedMesh ref={cone1Ref} args={[undefined, undefined, count]} frustumCulled={false}>
        <coneGeometry args={[0.6, 0.9, 5]} />
        <meshLambertMaterial color="#1B5E20" flatShading />
      </instancedMesh>
      <instancedMesh ref={cone2Ref} args={[undefined, undefined, count]} frustumCulled={false}>
        <coneGeometry args={[0.45, 0.7, 5]} />
        <meshLambertMaterial color="#2E7D32" flatShading />
      </instancedMesh>
      <instancedMesh ref={cone3Ref} args={[undefined, undefined, count]} frustumCulled={false}>
        <coneGeometry args={[0.3, 0.5, 4]} />
        <meshLambertMaterial color="#388E3C" flatShading />
      </instancedMesh>
    </>
  )
}

function PalmInstanced({ data, treeScale }: { data: TreeData[]; treeScale: number }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const topRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  useEffect(() => {
    const tempMat = new THREE.Matrix4()
    const offset = new THREE.Matrix4()

    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale
      const base = buildMatrix(data[i].pos, s, data[i].rotY)

      offset.makeTranslation(0, 0.6, 0)
      tempMat.copy(base).multiply(offset)
      trunkRef.current?.setMatrixAt(i, tempMat)

      offset.makeTranslation(0, 1.4, 0)
      tempMat.copy(base).multiply(offset)
      topRef.current?.setMatrixAt(i, tempMat)
    }

    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true
    if (topRef.current) topRef.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count])

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.08, 0.12, 1.2, 5]} />
        <meshLambertMaterial color="#8B6914" flatShading />
      </instancedMesh>
      <instancedMesh ref={topRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[0.5, 5, 4]} />
        <meshLambertMaterial color="#228B22" flatShading />
      </instancedMesh>
    </>
  )
}

function BushInstanced({ data, treeScale }: { data: TreeData[]; treeScale: number }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const topRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  useEffect(() => {
    const tempMat = new THREE.Matrix4()
    const offset = new THREE.Matrix4()

    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale
      const base = buildMatrix(data[i].pos, s, data[i].rotY)

      offset.makeTranslation(0, 0.2, 0)
      tempMat.copy(base).multiply(offset)
      trunkRef.current?.setMatrixAt(i, tempMat)

      offset.makeTranslation(0, 0.6, 0)
      tempMat.copy(base).multiply(offset)
      topRef.current?.setMatrixAt(i, tempMat)
    }

    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true
    if (topRef.current) topRef.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count])

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 4]} />
        <meshLambertMaterial color="#6B4226" flatShading />
      </instancedMesh>
      <instancedMesh ref={topRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshLambertMaterial color="#4CAF50" flatShading />
      </instancedMesh>
    </>
  )
}

function OakInstanced({ data, treeScale }: { data: TreeData[]; treeScale: number }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const topRef = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  useEffect(() => {
    const tempMat = new THREE.Matrix4()
    const offset = new THREE.Matrix4()

    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale
      const base = buildMatrix(data[i].pos, s, data[i].rotY)

      offset.makeTranslation(0, 0.4, 0)
      tempMat.copy(base).multiply(offset)
      trunkRef.current?.setMatrixAt(i, tempMat)

      offset.makeTranslation(0, 1.1, 0)
      tempMat.copy(base).multiply(offset)
      topRef.current?.setMatrixAt(i, tempMat)
    }

    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true
    if (topRef.current) topRef.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count])

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.12, 0.18, 0.8, 5]} />
        <meshLambertMaterial color="#6B4226" flatShading />
      </instancedMesh>
      <instancedMesh ref={topRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[0.7, 6, 5]} />
        <meshLambertMaterial color="#2E7D32" flatShading />
      </instancedMesh>
    </>
  )
}

function BirchInstanced({ data, treeScale }: { data: TreeData[]; treeScale: number }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const top1Ref = useRef<THREE.InstancedMesh>(null)
  const top2Ref = useRef<THREE.InstancedMesh>(null)
  const count = data.length

  useEffect(() => {
    const tempMat = new THREE.Matrix4()
    const offset = new THREE.Matrix4()

    for (let i = 0; i < count; i++) {
      const s = data[i].scale * treeScale
      const base = buildMatrix(data[i].pos, s, data[i].rotY)

      offset.makeTranslation(0, 0.7, 0)
      tempMat.copy(base).multiply(offset)
      trunkRef.current?.setMatrixAt(i, tempMat)

      offset.makeTranslation(0, 1.5, 0)
      tempMat.copy(base).multiply(offset)
      top1Ref.current?.setMatrixAt(i, tempMat)

      offset.makeTranslation(0, 1.8, 0)
      tempMat.copy(base).multiply(offset)
      top2Ref.current?.setMatrixAt(i, tempMat)
    }

    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true
    if (top1Ref.current) top1Ref.current.instanceMatrix.needsUpdate = true
    if (top2Ref.current) top2Ref.current.instanceMatrix.needsUpdate = true
  }, [data, treeScale, count])

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.06, 0.08, 1.4, 5]} />
        <meshLambertMaterial color="#e8e0d0" flatShading />
      </instancedMesh>
      <instancedMesh ref={top1Ref} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[0.35, 5, 4]} />
        <meshLambertMaterial color="#66BB6A" flatShading />
      </instancedMesh>
      <instancedMesh ref={top2Ref} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[0.25, 5, 4]} />
        <meshLambertMaterial color="#81C784" flatShading />
      </instancedMesh>
    </>
  )
}

// Instanced houses - grouped by color pair
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
