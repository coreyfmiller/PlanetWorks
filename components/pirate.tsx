'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PirateProps {
  boatPosition: THREE.Vector3 | null
  boatMaxSpeed: number
  isAtPort: boolean
  onCaught: () => void
}

/**
 * Pirate ship that spawns at random locations on the water,
 * chases the player's boat at half speed.
 * If it reaches you, you lose your fish.
 * Despawns after 25s or if you reach a port.
 * Spawns every 40-70 seconds.
 */
export function PirateShip({ boatPosition, boatMaxSpeed, isAtPort, onCaught }: PirateProps) {
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
      s.spawnTimer = 40 + Math.random() * 30 // next spawn 40-70s
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

    // Rotate toward boat on the sphere surface
    const chaseSpeed = boatMaxSpeed * 0.5 * dt * 0.12
    if (toBoatFlat.length() > 0.001) {
      const rotAxis = new THREE.Vector3().crossVectors(pirateUp, toBoatFlat).normalize()
      const chaseQ = new THREE.Quaternion().setFromAxisAngle(rotAxis, chaseSpeed)
      s.quat.premultiply(chaseQ)
      s.quat.normalize()
    }

    // Update position
    const finalUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize()
    const finalPos = finalUp.clone().multiplyScalar(3.04)

    if (groupRef.current) {
      groupRef.current.position.copy(finalPos)

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
      onCaught()
    }
  })

  return (
    <group ref={groupRef} visible={false}>
      {/* Dark hull */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.07, 0.022, 0.18]} />
        <meshLambertMaterial color="#1a1a1a" flatShading />
      </mesh>

      {/* Hull trim */}
      <mesh position={[0, 0.018, 0]}>
        <boxGeometry args={[0.055, 0.004, 0.16]} />
        <meshLambertMaterial color="#330000" flatShading />
      </mesh>

      {/* Bow */}
      <mesh position={[0, 0.01, 0.1]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.03, 0.06, 4]} />
        <meshLambertMaterial color="#1a1a1a" flatShading />
      </mesh>

      {/* Mast */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.004, 0.005, 0.14, 5]} />
        <meshLambertMaterial color="#2a1a0a" flatShading />
      </mesh>

      {/* Black sail */}
      <mesh position={[0.015, 0.09, 0]} rotation={[0, 0.1, 0]}>
        <planeGeometry args={[0.06, 0.08]} />
        <meshBasicMaterial color="#111111" side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>

      {/* Skull emblem (white dot on sail) */}
      <mesh position={[0.016, 0.09, 0.001]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Crossbones (two thin white bars) */}
      <mesh position={[0.016, 0.075, 0.001]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.02, 0.003, 0.002]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.016, 0.075, 0.001]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.02, 0.003, 0.002]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Red flag */}
      <mesh position={[0.01, 0.15, 0]}>
        <planeGeometry args={[0.02, 0.01]} />
        <meshBasicMaterial color="#cc0000" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
