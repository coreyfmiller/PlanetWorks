'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'
import { fbmSimplex } from '@/lib/simplex'

/**
 * Walk mode with animation blending (idle + walk).
 * Chop/pickup parked for later.
 */
export function Walker({ spawnPosition, onPositionUpdate }: {
  spawnPosition?: THREE.Vector3 | null
  onPositionUpdate?: (pos: THREE.Vector3) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  const walkGLB = useGLTF('/models/character-cartoon-walking.glb')
  const idleGLB = useGLTF('/models/character-cartoon-idle.glb')

  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const actionsRef = useRef<{ idle?: THREE.AnimationAction; walk?: THREE.AnimationAction }>({})
  const currentAnim = useRef<'idle' | 'walk'>('idle')

  useEffect(() => {
    if (!groupRef.current) return
    const scene = walkGLB.scene

    while (groupRef.current.children.length > 0) {
      groupRef.current.remove(groupRef.current.children[0])
    }

    scene.scale.set(0.05, 0.05, 0.05)
    scene.rotation.set(0, 0, 0)

    scene.traverse((child) => {
      if ((child as THREE.SkinnedMesh).isSkinnedMesh || (child as THREE.Mesh).isMesh) {
        ;(child as THREE.Mesh).frustumCulled = false
      }
    })

    groupRef.current.add(scene)

    const mixer = new THREE.AnimationMixer(scene)
    mixerRef.current = mixer

    if (walkGLB.animations.length > 0) {
      const walkAction = mixer.clipAction(walkGLB.animations[0])
      walkAction.setLoop(THREE.LoopRepeat, Infinity)
      actionsRef.current.walk = walkAction
    }

    if (idleGLB.animations.length > 0) {
      const idleAction = mixer.clipAction(idleGLB.animations[0])
      idleAction.setLoop(THREE.LoopRepeat, Infinity)
      idleAction.play()
      actionsRef.current.idle = idleAction
    }

    currentAnim.current = 'idle'

    return () => {
      mixer.stopAllAction()
      if (groupRef.current && scene.parent === groupRef.current) {
        groupRef.current.remove(scene)
      }
    }
  }, [walkGLB.scene, walkGLB.animations, idleGLB.animations])

  const state = useRef({
    quat: (() => {
      if (spawnPosition) {
        const up = spawnPosition.clone().normalize()
        return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
      }
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
    keys: {} as Record<string, boolean>,
    camPos: new THREE.Vector3(0, 4, 6),
    camTarget: new THREE.Vector3(0, 0, 0),
    camDist: 1.0,
  })

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => { state.current.keys[e.code] = true }
    const onUp = (e: KeyboardEvent) => { state.current.keys[e.code] = false }
    const onWheel = (e: WheelEvent) => {
      state.current.camDist = Math.max(0.3, Math.min(3.0, state.current.camDist + e.deltaY * 0.001))
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('wheel', onWheel)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  function transitionTo(target: 'idle' | 'walk') {
    if (currentAnim.current === target) return
    const actions = actionsRef.current
    const fadeTime = 0.25
    const current = actions[currentAnim.current]
    if (current) current.fadeOut(fadeTime)
    const next = actions[target]
    if (next) { next.reset(); next.fadeIn(fadeTime); next.play() }
    currentAnim.current = target
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const s = state.current
    const keys = s.keys
    const dt = Math.min(delta, 0.05)

    if (mixerRef.current) mixerRef.current.update(dt)

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
    const sprinting = keys['ShiftLeft'] || keys['ShiftRight']
    const maxSpeed = sprinting ? 1.0 : 0.4
    const accel = sprinting ? 1.6 : 0.8
    if (keys['KeyW'] || keys['ArrowUp']) {
      s.speed = Math.min(s.speed + dt * accel, maxSpeed)
    } else if (keys['KeyS'] || keys['ArrowDown']) {
      s.speed = Math.max(s.speed - dt * 0.8, -0.15)
    } else {
      s.speed *= 0.9
      if (Math.abs(s.speed) < 0.01) s.speed = 0
    }

    // Animation
    if (s.speed > 0.05) {
      transitionTo('walk')
      if (mixerRef.current) mixerRef.current.timeScale = sprinting ? 1.8 : 1.0
    } else {
      transitionTo('idle')
      if (mixerRef.current) mixerRef.current.timeScale = 1.0
    }

    // Water check
    const checkQ = s.quat.clone()
    const checkMove = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.03)
    checkQ.multiply(checkMove)
    const checkUp = new THREE.Vector3(0, 1, 0).applyQuaternion(checkQ).normalize()
    const { influence: aheadInfluence } = islandInfluence(checkUp.x, checkUp.y, checkUp.z, true)
    if (aheadInfluence < 0.05 && s.speed > 0) s.speed = 0

    // Move
    const moveAmount = s.speed * dt * 0.12
    const moveQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), moveAmount)
    s.quat.multiply(moveQ)
    s.quat.normalize()

    // Vectors
    const finalUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize()
    const finalForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.quat)
    const finalRight = new THREE.Vector3(1, 0, 0).applyQuaternion(s.quat)

    // Terrain height - smooth blend at shoreline
    const nx = finalUp.x, ny = finalUp.y, nz = finalUp.z
    const { influence } = islandInfluence(nx, ny, nz, true)

    let height = 3.0
    if (influence > 0.02) {
      const detail = fbmSimplex(nx * 12, ny * 12, nz * 12, 5) * 0.5 + 0.5
      const cliff = Math.pow(influence, 0.65)
      const terrainHeight = 3.0 + cliff * 0.16 + detail * influence * 0.07

      let mountainAdd = 0
      const mountain1Dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.7) ** 2 + (nz - 0.3) ** 2)
      const mountain2Dist = Math.sqrt((nx + 0.6) ** 2 + (ny - 0.2) ** 2 + (nz + 0.5) ** 2)
      if (mountain1Dist < 0.3 && influence > 0.3) {
        const peak = (1 - mountain1Dist / 0.3) * 0.2
        mountainAdd += peak * peak * 1.5
      }
      if (mountain2Dist < 0.25 && influence > 0.3) {
        const peak = (1 - mountain2Dist / 0.25) * 0.18
        mountainAdd += peak * peak * 1.2
      }

      const blend = Math.min(1, influence / 0.15)
      height = 3.0 + blend * (terrainHeight - 3.0 + mountainAdd)
    }

    const position = finalUp.clone().multiplyScalar(height)
    groupRef.current.position.copy(position)
    if (onPositionUpdate) onPositionUpdate(position)

    // Orientation
    const rotMatrix = new THREE.Matrix4().makeBasis(finalRight, finalUp, finalForward)
    groupRef.current.quaternion.setFromRotationMatrix(rotMatrix)

    // Camera
    const behindDir = finalForward.clone().negate()
    const camPos = position.clone()
      .add(behindDir.multiplyScalar(s.camDist))
      .add(finalUp.clone().multiplyScalar(0.3 * s.camDist))
    const lookAhead = position.clone()
      .add(finalForward.clone().multiplyScalar(1.5))
      .add(finalUp.clone().multiplyScalar(0.1))

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

  return <group ref={groupRef} />
}
