'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function Airplane() {
  const groupRef = useRef<THREE.Group>(null)
  const propellerRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // Flight state using quaternion-based movement
  const state = useRef({
    // Position as a quaternion rotation from "north pole"
    orientation: new THREE.Quaternion(),
    // Heading: rotation around the local up axis
    heading: 0,
    // Altitude above planet surface
    altitude: 3.5,
    // Speed (radians per second around the sphere)
    speed: 0.35,
    // Visual banking angle
    bank: 0,
    // Visual pitch
    pitch: 0,
    // Input
    keys: {} as Record<string, boolean>,
    // Camera position for smoothing
    camPos: new THREE.Vector3(0, 4, 9),
    camTarget: new THREE.Vector3(0, 0, 0),
  })

  // Initialize starting position
  useEffect(() => {
    // Start at a point on the equator facing "east"
    state.current.orientation.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
  }, [])

  // Keyboard listeners
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      state.current.keys[e.code] = true
      if (e.code === 'Space') e.preventDefault()
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

    // --- INPUT ---
    const turnRate = 1.5
    let targetBank = 0
    let targetPitch = 0

    if (keys['KeyA'] || keys['ArrowLeft']) {
      s.heading += turnRate * dt
      targetBank = 0.4
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      s.heading -= turnRate * dt
      targetBank = -0.4
    }
    if (keys['KeyW'] || keys['ArrowUp']) {
      s.speed = Math.min(s.speed + dt * 0.4, 1.5)
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      s.speed = Math.max(s.speed - dt * 0.4, 0.15)
    }
    if (keys['Space']) {
      s.altitude = Math.min(s.altitude + dt * 0.6, 5.5)
      targetPitch = -0.15
    }
    if (keys['ShiftLeft'] || keys['ShiftRight']) {
      s.altitude = Math.max(s.altitude - dt * 0.6, 3.15)
      targetPitch = 0.15
    }

    // Smooth banking and pitch
    s.bank += (targetBank - s.bank) * dt * 4
    s.pitch += (targetPitch - s.pitch) * dt * 3

    // --- MOVEMENT (pole-free) ---
    // The orientation quaternion represents WHERE we are on the sphere
    // and WHICH DIRECTION we face. We move by rotating it.

    // Move forward: rotate around the LOCAL right axis (perpendicular to heading)
    const moveAmount = s.speed * dt * 0.15

    // Get local axes from current orientation
    const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.orientation)
    const localForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.orientation)
    const localRight = new THREE.Vector3(1, 0, 0).applyQuaternion(s.orientation)

    // Apply heading rotation to get actual forward direction
    const headingQuat = new THREE.Quaternion().setFromAxisAngle(localUp, s.heading)
    const actualForward = localForward.clone().applyQuaternion(headingQuat)
    const actualRight = localRight.clone().applyQuaternion(headingQuat)

    // Move: rotate the position around the axis perpendicular to movement direction
    // Moving "forward" = rotating around the "right" axis
    const moveRotation = new THREE.Quaternion().setFromAxisAngle(actualRight, moveAmount)
    s.orientation.premultiply(moveRotation)
    s.orientation.normalize()

    // --- POSITION ---
    const position = new THREE.Vector3(0, 1, 0).applyQuaternion(s.orientation).multiplyScalar(s.altitude)
    groupRef.current.position.copy(position)

    // --- PLANE ORIENTATION ---
    const planeUp = position.clone().normalize()

    // Recompute forward after movement
    const newLocalForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.orientation)
    const newLocalRight = new THREE.Vector3(1, 0, 0).applyQuaternion(s.orientation)
    const newHeadingQuat = new THREE.Quaternion().setFromAxisAngle(planeUp, s.heading)
    const planeForward = newLocalForward.clone().applyQuaternion(newHeadingQuat)

    // Ensure forward is tangent to sphere
    planeForward.sub(planeUp.clone().multiplyScalar(planeForward.dot(planeUp))).normalize()
    const planeRight = new THREE.Vector3().crossVectors(planeForward, planeUp).normalize()

    // Build rotation matrix
    const rotMatrix = new THREE.Matrix4()
    rotMatrix.makeBasis(planeRight, planeUp, planeForward)
    groupRef.current.quaternion.setFromRotationMatrix(rotMatrix)

    // Apply visual banking
    const bankQuat = new THREE.Quaternion().setFromAxisAngle(planeForward, s.bank)
    groupRef.current.quaternion.premultiply(bankQuat)

    // Apply visual pitch
    const pitchQuat = new THREE.Quaternion().setFromAxisAngle(planeRight, s.pitch)
    groupRef.current.quaternion.premultiply(pitchQuat)

    // --- PROPELLER ---
    if (propellerRef.current) {
      propellerRef.current.rotation.z += dt * s.speed * 35
    }

    // --- CAMERA ---
    const camBehind = planeForward.clone().multiplyScalar(3.0)
    const camAbove = planeUp.clone().multiplyScalar(1.2)
    const camSide = planeRight.clone().multiplyScalar(s.bank * 2.0)

    const targetCamPos = position.clone().add(camBehind).add(camAbove).add(camSide)
    const targetLookAt = position.clone().add(planeForward.clone().multiplyScalar(-2.0))

    s.camPos.lerp(targetCamPos, dt * 2.5)
    s.camTarget.lerp(targetLookAt, dt * 3)

    camera.position.copy(s.camPos)
    camera.lookAt(s.camTarget)
  })

  return (
    <group ref={groupRef}>
      {/* Fuselage */}
      <mesh rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.03, 0.18, 4, 8]} />
        <meshLambertMaterial color="#cc3333" flatShading />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.03, 0.06, 6]} />
        <meshLambertMaterial color="#aa2222" flatShading />
      </mesh>

      {/* Top wing */}
      <mesh position={[0, 0.045, 0.02]}>
        <boxGeometry args={[0.32, 0.008, 0.07]} />
        <meshLambertMaterial color="#f5f0dc" flatShading />
      </mesh>

      {/* Bottom wing */}
      <mesh position={[0, -0.025, 0.02]}>
        <boxGeometry args={[0.28, 0.008, 0.065]} />
        <meshLambertMaterial color="#f5f0dc" flatShading />
      </mesh>

      {/* Wing struts left */}
      <mesh position={[0.07, 0.01, 0.02]}>
        <boxGeometry args={[0.006, 0.065, 0.006]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>
      <mesh position={[-0.07, 0.01, 0.02]}>
        <boxGeometry args={[0.006, 0.065, 0.006]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>

      {/* Tail vertical stabilizer */}
      <mesh position={[0, 0.03, -0.12]}>
        <boxGeometry args={[0.006, 0.05, 0.04]} />
        <meshLambertMaterial color="#cc3333" flatShading />
      </mesh>

      {/* Tail horizontal stabilizer */}
      <mesh position={[0, 0.008, -0.13]}>
        <boxGeometry args={[0.1, 0.006, 0.025]} />
        <meshLambertMaterial color="#f5f0dc" flatShading />
      </mesh>

      {/* Propeller - two blades */}
      <group ref={propellerRef} position={[0, 0, 0.15]}>
        <mesh>
          <boxGeometry args={[0.14, 0.012, 0.004]} />
          <meshLambertMaterial color="#222222" flatShading />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.14, 0.012, 0.004]} />
          <meshLambertMaterial color="#222222" flatShading />
        </mesh>
      </group>

      {/* Propeller hub */}
      <mesh position={[0, 0, 0.148]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshLambertMaterial color="#444444" flatShading />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.025, 0.05]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.03, 0.025, 0.001]} />
        <meshBasicMaterial color="#88ccff" transparent opacity={0.6} />
      </mesh>

      {/* Wheel struts */}
      <mesh position={[0.03, -0.05, 0.02]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.005, 0.04, 0.005]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>
      <mesh position={[-0.03, -0.05, 0.02]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.005, 0.04, 0.005]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>

      {/* Wheels */}
      <mesh position={[0.03, -0.07, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.008, 8]} />
        <meshLambertMaterial color="#222222" flatShading />
      </mesh>
      <mesh position={[-0.03, -0.07, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.008, 8]} />
        <meshLambertMaterial color="#222222" flatShading />
      </mesh>
    </group>
  )
}
