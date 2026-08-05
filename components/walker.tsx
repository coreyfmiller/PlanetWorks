'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'
import { fbmSimplex } from '@/lib/simplex'

/**
 * Walk mode: same quaternion model as boat/airplane.
 * - Locked to land surface
 * - Stops at water
 * - Camera low behind shoulder
 * - Fisherman GLB model
 */
export function Walker() {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const { scene } = useGLTF('/models/character-fisherman.glb')
  const model = useMemo(() => scene.clone(), [scene])

  const state = useRef({
    // Find a land position to spawn on
    quat: (() => {
      // Sample points until we find solid land
      for (let i = 0; i < 500; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / 500)
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
        const nx = Math.sin(phi) * Math.cos(theta)
        const ny = Math.cos(phi)
        const nz = Math.sin(phi) * Math.sin(theta)
        const { influence } = islandInfluence(nx, ny, nz, true)
        if (influence > 0.3) {
          const up = new THREE.Vector3(nx, ny, nz).normalize()
          return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
        }
      }
      return new THREE.Quaternion()
    })(),
    speed: 0,
    bank: 0,
    keys: {} as Record<string, boolean>,
    camPos: new THREE.Vector3(0, 4, 6),
    camTarget: new THREE.Vector3(0, 0, 0),
  })

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      state.current.keys[e.code] = true
    }
    const onUp = (e: KeyboardEvent) => { state.current.keys[e.code] = false }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const s = state.current
    const keys = s.keys
    const dt = Math.min(delta, 0.05)

    // Turn
    const turnRate = 2.0 * dt
    if (keys['KeyA'] || keys['ArrowLeft']) {
      const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), turnRate)
      s.quat.multiply(turnQ)
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -turnRate)
      s.quat.multiply(turnQ)
    }

    // Speed
    if (keys['KeyW'] || keys['ArrowUp']) {
      s.speed = Math.min(s.speed + dt * 0.8, 0.4)
    } else if (keys['KeyS'] || keys['ArrowDown']) {
      s.speed = Math.max(s.speed - dt * 0.8, -0.15)
    } else {
      // Decelerate
      s.speed *= 0.9
      if (Math.abs(s.speed) < 0.01) s.speed = 0
    }

    // Check ahead for water before moving
    const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize()
    const localForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.quat)

    // Look ahead
    const checkQ = s.quat.clone()
    const checkMove = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.03)
    checkQ.multiply(checkMove)
    const checkUp = new THREE.Vector3(0, 1, 0).applyQuaternion(checkQ).normalize()
    const { influence: aheadInfluence } = islandInfluence(checkUp.x, checkUp.y, checkUp.z, true)

    // Stop at water (only block if clearly water)
    if (aheadInfluence < 0.05 && s.speed > 0) {
      s.speed = 0
    }

    // Move forward
    const moveAmount = s.speed * dt * 0.12
    const moveQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), moveAmount)
    s.quat.multiply(moveQ)
    s.quat.normalize()

    // Recalculate vectors
    const finalUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize()
    const finalForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.quat)
    const finalRight = new THREE.Vector3(1, 0, 0).applyQuaternion(s.quat)

    // Calculate terrain height at current position
    const nx = finalUp.x
    const ny = finalUp.y
    const nz = finalUp.z
    const { influence } = islandInfluence(nx, ny, nz, true)

    let height = 3.0
    if (influence > 0.1) {
      const detail = fbmSimplex(nx * 12, ny * 12, nz * 12, 5) * 0.5 + 0.5
      const cliff = Math.pow(influence, 0.65)
      height = 3.0 + cliff * 0.16 + detail * influence * 0.07

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
    }

    // Position on terrain
    const position = finalUp.clone().multiplyScalar(height)
    groupRef.current.position.copy(position)

    // Orientation
    const rotMatrix = new THREE.Matrix4().makeBasis(finalRight, finalUp, finalForward)
    groupRef.current.quaternion.setFromRotationMatrix(rotMatrix)

    // Camera: low behind shoulder
    const behindDir = finalForward.clone().negate()
    const camPos = position.clone()
      .add(behindDir.multiplyScalar(0.8))
      .add(finalUp.clone().multiplyScalar(0.3))

    const lookAhead = position.clone()
      .add(finalForward.clone().multiplyScalar(1.5))
      .add(finalUp.clone().multiplyScalar(0.05))

    s.camPos.lerp(camPos, dt * 4)
    s.camTarget.lerp(lookAhead, dt * 5)

    camera.position.copy(s.camPos)

    const camForward = s.camTarget.clone().sub(s.camPos).normalize()
    const camRight = new THREE.Vector3().crossVectors(camForward, finalUp).normalize()
    const camUp = new THREE.Vector3().crossVectors(camRight, camForward).normalize()

    const camMatrix = new THREE.Matrix4()
    camMatrix.makeBasis(camRight, camUp, camForward.negate())
    camera.quaternion.setFromRotationMatrix(camMatrix)
  })

  return (
    <group ref={groupRef}>
      <primitive object={model} scale={0.06} rotation={[0, Math.PI, 0]} position={[0, -0.01, 0]} />
    </group>
  )
}
