'use client'

import { useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Flight model: the plane's state is ONE quaternion.
 * - Local Y axis = "up" (away from planet)
 * - Local Z axis = "forward" (direction of flight)
 * - Local X axis = "right" (wing direction)
 * 
 * Turning = rotating around local Y
 * Moving = rotating around local X (tilts the "up" forward, moving us along sphere)
 * 
 * Position = local Y * altitude
 * No heading variable. No poles. No flipping.
 */

export function Airplane({ trail = true }: { trail?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const propellerRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Points>(null)
  const { camera } = useThree()

  const state = useRef({
    // Single quaternion = entire flight state
    quat: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI * 0.4),
    altitude: 3.4,
    speed: 0.35,
    bank: 0,
    pitch: 0,
    keys: {} as Record<string, boolean>,
    camPos: new THREE.Vector3(0, 5, 8),
    camTarget: new THREE.Vector3(0, 0, 0),
    // Trail particles: ring buffer of past positions (2 trails, one per wingtip)
    trailPositions: new Float32Array(240 * 3), // 120 per wing x 2
    trailAlphas: new Float32Array(240),
    trailIndex: 0,
    trailTimer: 0,
  })

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
    let targetBank = 0
    let targetPitch = 0

    // Turn: rotate around LOCAL Y axis
    const turnRate = 1.2 * dt
    if (keys['KeyA'] || keys['ArrowLeft']) {
      const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), turnRate)
      s.quat.multiply(turnQ)
      targetBank = 0.4
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -turnRate)
      s.quat.multiply(turnQ)
      targetBank = -0.4
    }

    // Speed
    if (keys['KeyW'] || keys['ArrowUp']) {
      s.speed = Math.min(s.speed + dt * 0.4, 1.5)
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      s.speed = Math.max(s.speed - dt * 0.4, 0.15)
    }

    // Altitude — disabled for now
    // if (keys['Space']) {
    //   s.altitude = Math.min(s.altitude + dt * 0.6, 5.5)
    //   targetPitch = -0.2
    // }
    // if (keys['ShiftLeft'] || keys['ShiftRight']) {
    //   s.altitude = Math.max(s.altitude - dt * 0.6, 3.15)
    //   targetPitch = 0.2
    // }

    // Move forward: rotate around LOCAL X axis
    // This moves our "up" vector forward along the sphere
    const moveAmount = s.speed * dt * 0.12
    const moveQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), moveAmount)
    s.quat.multiply(moveQ)
    s.quat.normalize()

    // Smooth visuals
    s.bank += (targetBank - s.bank) * dt * 5
    s.pitch += (targetPitch - s.pitch) * dt * 4

    // --- DERIVE WORLD VECTORS FROM QUATERNION ---
    const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat)
    const localForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.quat)
    const localRight = new THREE.Vector3(1, 0, 0).applyQuaternion(s.quat)

    // --- POSITION ---
    const position = localUp.clone().multiplyScalar(s.altitude)
    groupRef.current.position.copy(position)

    // --- PLANE ORIENTATION ---
    // Plane model: nose points +Z, wings along X, top is +Y
    // We want: nose = localForward, wings = localRight, top = localUp
    const rotMatrix = new THREE.Matrix4().makeBasis(localRight, localUp, localForward)
    groupRef.current.quaternion.setFromRotationMatrix(rotMatrix)

    // Apply visual bank (roll around forward)
    const bankQ = new THREE.Quaternion().setFromAxisAngle(localForward, s.bank)
    groupRef.current.quaternion.premultiply(bankQ)

    // Apply visual pitch (tilt around right)
    const pitchQ = new THREE.Quaternion().setFromAxisAngle(localRight, s.pitch)
    groupRef.current.quaternion.premultiply(pitchQ)

    // --- PROPELLER ---
    if (propellerRef.current) {
      propellerRef.current.rotation.z += dt * s.speed * 35
    }

    // --- TRAIL PARTICLES ---
    // Always emit, update geometry if ref is ready
    s.trailTimer += dt

    // Emit from both wingtips every frame (constant stream)
    // Left wingtip (top of wing, outer edge)
    const leftIdx = (s.trailIndex * 2) % 240
    const leftWing = position.clone()
      .add(localRight.clone().multiplyScalar(-0.16))
      .add(localUp.clone().multiplyScalar(0.025))
    s.trailPositions[leftIdx * 3] = leftWing.x
    s.trailPositions[leftIdx * 3 + 1] = leftWing.y
    s.trailPositions[leftIdx * 3 + 2] = leftWing.z
    s.trailAlphas[leftIdx] = 1.0

    // Right wingtip (top of wing, outer edge)
    const rightIdx = (s.trailIndex * 2 + 1) % 240
    const rightWing = position.clone()
      .add(localRight.clone().multiplyScalar(0.16))
      .add(localUp.clone().multiplyScalar(0.025))
    s.trailPositions[rightIdx * 3] = rightWing.x
    s.trailPositions[rightIdx * 3 + 1] = rightWing.y
    s.trailPositions[rightIdx * 3 + 2] = rightWing.z
    s.trailAlphas[rightIdx] = 1.0

    s.trailIndex++

    // Fade all particles (slow fade for solid trails)
    for (let i = 0; i < 240; i++) {
      s.trailAlphas[i] = Math.max(0, s.trailAlphas[i] - dt * 0.5)
    }

    if (trailRef.current && trailRef.current.geometry.attributes.position) {
      trailRef.current.geometry.attributes.position.needsUpdate = true
      trailRef.current.geometry.attributes.alpha.needsUpdate = true
    }

    // --- CAMERA ---
    // Camera directly behind the tail, angled down slightly to show more ground
    const behindDir = localForward.clone().negate()
    const camPos = position.clone()
      .add(behindDir.multiplyScalar(2.8))
      .add(localUp.clone().multiplyScalar(1.1))

    const lookAhead = position.clone().add(localForward.clone().multiplyScalar(3.0)).add(localUp.clone().multiplyScalar(-0.4))

    s.camPos.lerp(camPos, dt * 3)
    s.camTarget.lerp(lookAhead, dt * 4)

    camera.position.copy(s.camPos)

    // Set camera orientation WITHOUT lookAt to avoid gimbal flips
    // Build a rotation matrix from the plane's axes (camera shares the plane's frame)
    const camForward = s.camTarget.clone().sub(s.camPos).normalize()
    const camRight = new THREE.Vector3().crossVectors(camForward, localUp).normalize()
    const camUp = new THREE.Vector3().crossVectors(camRight, camForward).normalize()

    const camMatrix = new THREE.Matrix4()
    camMatrix.makeBasis(camRight, camUp, camForward.negate())
    camera.quaternion.setFromRotationMatrix(camMatrix)
  })

  return (
    <>
    <group ref={groupRef}>
      {/* Fuselage - horizontal (along Z axis) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
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

      {/* Wing struts */}
      <mesh position={[0.07, 0.01, 0.02]}>
        <boxGeometry args={[0.006, 0.065, 0.006]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>
      <mesh position={[-0.07, 0.01, 0.02]}>
        <boxGeometry args={[0.006, 0.065, 0.006]} />
        <meshLambertMaterial color="#5c4030" flatShading />
      </mesh>

      {/* Tail vertical */}
      <mesh position={[0, 0.03, -0.12]}>
        <boxGeometry args={[0.006, 0.05, 0.04]} />
        <meshLambertMaterial color="#cc3333" flatShading />
      </mesh>

      {/* Tail horizontal */}
      <mesh position={[0, 0.008, -0.13]}>
        <boxGeometry args={[0.1, 0.006, 0.025]} />
        <meshLambertMaterial color="#f5f0dc" flatShading />
      </mesh>

      {/* Propeller */}
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

    {/* Trail particles - always rendered */}
    <TrailPoints ref={trailRef} positions={state.current.trailPositions} alphas={state.current.trailAlphas} />
    </>
  )
}

const TrailPoints = forwardRef<THREE.Points, { positions: Float32Array; alphas: Float32Array }>(
  function TrailPoints({ positions, alphas }, ref) {
    const innerRef = useRef<THREE.Points>(null)

    useImperativeHandle(ref, () => innerRef.current!, [])

    const geometry = useMemo(() => {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      g.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))
      return g
    }, [positions, alphas])

    return (
      <points ref={innerRef} geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexShader={`
            attribute float alpha;
            varying float vAlpha;
            void main() {
              vAlpha = alpha;
              vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = 12.0 * (1.0 / -mvPos.z);
              gl_Position = projectionMatrix * mvPos;
            }
          `}
          fragmentShader={`
            varying float vAlpha;
            void main() {
              if (vAlpha < 0.01) discard;
              float d = length(gl_PointCoord - vec2(0.5));
              if (d > 0.5) discard;
              float soft = 1.0 - d * 2.0;
              gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * soft * 0.7);
            }
          `}
        />
      </points>
    )
  }
)
