'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function Airplane() {
  const groupRef = useRef<THREE.Group>(null)
  const propellerRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // Flight state
  const state = useRef({
    // Position on unit sphere (theta, phi)
    theta: 0,
    phi: Math.PI / 2,
    // Heading direction (angle on the surface)
    heading: 0,
    // Altitude above planet
    altitude: 3.4,
    // Speed
    speed: 0.4,
    // Banking
    bank: 0,
    // Input
    keys: {} as Record<string, boolean>,
  })

  // Keyboard listeners
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => { state.current.keys[e.code] = true }
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

    // Clamp delta to avoid jumps
    const dt = Math.min(delta, 0.05)

    // Turn
    const turnRate = 1.2
    let targetBank = 0
    if (keys['KeyA'] || keys['ArrowLeft']) {
      s.heading -= turnRate * dt
      targetBank = 0.5
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      s.heading += turnRate * dt
      targetBank = -0.5
    }

    // Speed
    if (keys['KeyW'] || keys['ArrowUp']) {
      s.speed = Math.min(s.speed + dt * 0.3, 1.2)
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      s.speed = Math.max(s.speed - dt * 0.3, 0.15)
    }

    // Altitude
    if (keys['Space']) {
      s.altitude = Math.min(s.altitude + dt * 0.5, 5.0)
    }
    if (keys['ShiftLeft'] || keys['ShiftRight']) {
      s.altitude = Math.max(s.altitude - dt * 0.5, 3.15)
    }

    // Smooth banking
    s.bank += (targetBank - s.bank) * dt * 5

    // Move along the sphere surface
    const moveSpeed = s.speed * dt * 0.3
    s.theta += Math.sin(s.heading) * moveSpeed
    s.phi += Math.cos(s.heading) * moveSpeed

    // Clamp phi
    s.phi = Math.max(0.1, Math.min(Math.PI - 0.1, s.phi))

    // Compute world position from spherical coords
    const px = s.altitude * Math.sin(s.phi) * Math.cos(s.theta)
    const py = s.altitude * Math.cos(s.phi)
    const pz = s.altitude * Math.sin(s.phi) * Math.sin(s.theta)

    groupRef.current.position.set(px, py, pz)

    // Orient the plane: "up" is away from planet center
    const up = new THREE.Vector3(px, py, pz).normalize()

    // Forward direction on the sphere surface
    const forward = new THREE.Vector3(
      Math.sin(s.phi) * Math.cos(s.theta + 0.01) - Math.sin(s.phi) * Math.cos(s.theta),
      Math.cos(s.phi + 0.01 * Math.cos(s.heading)) - Math.cos(s.phi),
      Math.sin(s.phi) * Math.sin(s.theta + 0.01) - Math.sin(s.phi) * Math.sin(s.theta),
    ).normalize()

    // Build orientation matrix
    const right = new THREE.Vector3().crossVectors(forward, up).normalize()
    const correctedForward = new THREE.Vector3().crossVectors(up, right).normalize()

    const matrix = new THREE.Matrix4()
    matrix.makeBasis(right, up, correctedForward)

    // Apply heading rotation around up axis
    const headingQuat = new THREE.Quaternion().setFromAxisAngle(up, -s.heading)
    groupRef.current.quaternion.setFromRotationMatrix(matrix)
    groupRef.current.quaternion.premultiply(headingQuat)

    // Apply banking
    const bankQuat = new THREE.Quaternion().setFromAxisAngle(
      correctedForward.applyQuaternion(headingQuat),
      s.bank
    )
    groupRef.current.quaternion.multiply(bankQuat)

    // Spin propeller
    if (propellerRef.current) {
      propellerRef.current.rotation.z += dt * s.speed * 30
    }

    // Camera follow - behind and above the plane
    const camOffset = up.clone().multiplyScalar(0.8)
      .add(correctedForward.clone().applyQuaternion(headingQuat).multiplyScalar(-2))

    const targetCamPos = new THREE.Vector3(px, py, pz).add(camOffset)
    camera.position.lerp(targetCamPos, dt * 3)
    camera.lookAt(px, py, pz)
  })

  return (
    <group ref={groupRef}>
      {/* Fuselage */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.04, 0.2, 4, 8]} />
        <meshLambertMaterial color="#e84040" flatShading />
      </mesh>

      {/* Top wing */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.35, 0.01, 0.08]} />
        <meshLambertMaterial color="#f5f0e0" flatShading />
      </mesh>

      {/* Bottom wing */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[0.3, 0.01, 0.07]} />
        <meshLambertMaterial color="#f5f0e0" flatShading />
      </mesh>

      {/* Wing struts */}
      <mesh position={[0.08, 0.01, 0]}>
        <boxGeometry args={[0.008, 0.08, 0.008]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>
      <mesh position={[-0.08, 0.01, 0]}>
        <boxGeometry args={[0.008, 0.08, 0.008]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>

      {/* Tail vertical */}
      <mesh position={[0, 0.03, -0.12]}>
        <boxGeometry args={[0.008, 0.06, 0.04]} />
        <meshLambertMaterial color="#e84040" flatShading />
      </mesh>

      {/* Tail horizontal */}
      <mesh position={[0, 0.01, -0.13]}>
        <boxGeometry args={[0.12, 0.008, 0.03]} />
        <meshLambertMaterial color="#f5f0e0" flatShading />
      </mesh>

      {/* Propeller */}
      <mesh ref={propellerRef} position={[0, 0, 0.13]}>
        <boxGeometry args={[0.18, 0.015, 0.005]} />
        <meshLambertMaterial color="#333333" flatShading />
      </mesh>

      {/* Engine cowl */}
      <mesh position={[0, 0, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.04, 0.04, 6]} />
        <meshLambertMaterial color="#cc3030" flatShading />
      </mesh>
    </group>
  )
}
