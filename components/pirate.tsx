'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'

interface PirateProps {
  boatPosition: THREE.Vector3 | null
  boatMaxSpeed: number
  isAtPort: boolean
  onCaught: () => void
  onActiveChange?: (active: boolean, position?: THREE.Vector3) => void
}

/**
 * Pirate ship that spawns at random locations on the water,
 * chases the player's boat at half speed.
 * If it reaches you, you lose your fish.
 * Despawns after 25s or if you reach a port.
 * Spawns every 40-70 seconds.
 */
export function PirateShip({ boatPosition, boatMaxSpeed, isAtPort, onCaught, onActiveChange }: PirateProps) {
  const groupRef = useRef<THREE.Group>(null)

  const state = useRef({
    active: false,
    quat: new THREE.Quaternion(),
    spawnTimer: 15 + Math.random() * 20, // first spawn 15-35s in
    lifeTimer: 0,
    maxLife: 25,
    caught: false,
  })

  useFrame((_, delta) => {
    const s = state.current
    const dt = Math.min(delta, 0.05)

    if (!s.active) {
      // Countdown to spawn
      s.spawnTimer -= dt
      if (s.spawnTimer <= 0 && boatPosition) {
        // Spawn at random location on the water sphere
        const phi = Math.acos(2 * Math.random() - 1)
        const theta = Math.random() * Math.PI * 2
        const nx = Math.sin(phi) * Math.cos(theta)
        const ny = Math.cos(phi)
        const nz = Math.sin(phi) * Math.sin(theta)

        s.quat.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(nx, ny, nz).normalize()
        )
        s.active = true
        s.lifeTimer = 0
        s.caught = false
        onActiveChange?.(true, new THREE.Vector3(nx, ny, nz).normalize().multiplyScalar(3.04))
      }

      if (groupRef.current) groupRef.current.visible = false
      return
    }

    // Active pirate
    if (groupRef.current) groupRef.current.visible = true
    s.lifeTimer += dt

    // Despawn conditions
    if (s.lifeTimer > s.maxLife || isAtPort) {
      s.active = false
      s.spawnTimer = 40 + Math.random() * 30
      onActiveChange?.(false)
      if (groupRef.current) groupRef.current.visible = false
      return
    }

    if (!boatPosition || s.caught) return

    // Chase the player: rotate toward the boat position
    const pirateUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize()
    const piratePos = pirateUp.clone().multiplyScalar(3.04)
    const toBoat = boatPosition.clone().sub(piratePos).normalize()

    // Project toBoat onto tangent plane
    const toBoatFlat = toBoat.clone().sub(pirateUp.clone().multiplyScalar(toBoat.dot(pirateUp))).normalize()

    // Check if land is ahead before moving
    const { influence: aheadInfluence } = islandInfluence(
      toBoatFlat.x * 0.05 + pirateUp.x,
      toBoatFlat.y * 0.05 + pirateUp.y,
      toBoatFlat.z * 0.05 + pirateUp.z,
      true
    )

    // Only move if water ahead, otherwise try to go perpendicular
    const chaseSpeed = boatMaxSpeed * 0.5 * dt * 0.12
    if (aheadInfluence > 0.08) {
      // Land ahead, steer perpendicular to avoid
      const perpendicular = new THREE.Vector3().crossVectors(pirateUp, toBoatFlat).normalize()
      const avoidQ = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3().crossVectors(pirateUp, perpendicular).normalize(),
        chaseSpeed
      )
      s.quat.premultiply(avoidQ)
      s.quat.normalize()
    } else if (toBoatFlat.length() > 0.001) {
      const rotAxis = new THREE.Vector3().crossVectors(pirateUp, toBoatFlat).normalize()
      const chaseQ = new THREE.Quaternion().setFromAxisAngle(rotAxis, chaseSpeed)
      s.quat.premultiply(chaseQ)
      s.quat.normalize()
    }

    // Also check current position and push back if on land
    const { influence: currentInfluence } = islandInfluence(pirateUp.x, pirateUp.y, pirateUp.z, true)
    if (currentInfluence > 0.1) {
      // On land, push away from land center
      const backQ = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3().crossVectors(pirateUp, toBoatFlat).normalize(),
        -chaseSpeed * 2
      )
      s.quat.premultiply(backQ)
      s.quat.normalize()
    }

    // Update position
    const finalUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize()
    const finalPos = finalUp.clone().multiplyScalar(3.04)

    if (groupRef.current) {
      groupRef.current.position.copy(finalPos)
      onActiveChange?.(true, finalPos)

      // Orient to face movement direction
      const forward = toBoatFlat.clone()
      const right = new THREE.Vector3().crossVectors(finalUp, forward).normalize()
      const rotMatrix = new THREE.Matrix4().makeBasis(right, finalUp, forward)
      groupRef.current.quaternion.setFromRotationMatrix(rotMatrix)
    }

    // Check if caught player
    const dist = finalPos.distanceTo(boatPosition)
    if (dist < 0.15) {
      s.caught = true
      s.active = false
      s.spawnTimer = 40 + Math.random() * 30
      if (groupRef.current) groupRef.current.visible = false
      onActiveChange?.(false)
      onCaught()
    }
  })

  return (
    <group ref={groupRef} visible={false}>
      <PirateModel />
    </group>
  )
}

function PirateModel() {
  const { scene } = useGLTF('/models/pirate-ship.glb')
  const cloned = useMemo(() => scene.clone(), [scene])
  return <primitive object={cloned} scale={0.16} rotation={[0, Math.PI / 2, 0]} />
}
