'use client'

import { useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'

export interface FishCatch {
  name: string
  emoji: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
}

const FISH_TABLE: FishCatch[] = [
  { name: 'Mackerel', emoji: '🐟', rarity: 'common' },
  { name: 'Herring', emoji: '🐟', rarity: 'common' },
  { name: 'Cod', emoji: '🐟', rarity: 'common' },
  { name: 'Salmon', emoji: '🐠', rarity: 'uncommon' },
  { name: 'Tuna', emoji: '🐠', rarity: 'uncommon' },
  { name: 'Swordfish', emoji: '🗡️', rarity: 'rare' },
  { name: 'Giant Squid', emoji: '🦑', rarity: 'rare' },
  { name: 'Golden Marlin', emoji: '✨', rarity: 'legendary' },
]

function rollFish(): FishCatch {
  const roll = Math.random()
  if (roll < 0.5) {
    const commons = FISH_TABLE.filter(f => f.rarity === 'common')
    return commons[Math.floor(Math.random() * commons.length)]
  } else if (roll < 0.8) {
    const uncommons = FISH_TABLE.filter(f => f.rarity === 'uncommon')
    return uncommons[Math.floor(Math.random() * uncommons.length)]
  } else if (roll < 0.95) {
    const rares = FISH_TABLE.filter(f => f.rarity === 'rare')
    return rares[Math.floor(Math.random() * rares.length)]
  } else {
    return FISH_TABLE.find(f => f.rarity === 'legendary')!
  }
}

type FishingState = 'idle' | 'cast' | 'waiting' | 'bite' | 'caught' | 'missed'

interface BoatProps {
  wake?: boolean
  onCatch?: (fish: FishCatch) => void
  onFishingState?: (state: FishingState) => void
  onPositionUpdate?: (pos: THREE.Vector3) => void
}

export function Boat({ wake = true, onCatch, onFishingState, onPositionUpdate }: BoatProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bobberRef = useRef<THREE.Group>(null)
  const wakeRef = useRef<THREE.Points>(null)
  const { camera } = useThree()

  const state = useRef({
    quat: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI * 0.4),
    altitude: 3.04,
    speed: 0.15,
    bank: 0,
    keys: {} as Record<string, boolean>,
    camPos: new THREE.Vector3(0, 4, 6),
    camTarget: new THREE.Vector3(0, 0, 0),
    // Wake particles
    wakePositions: new Float32Array(180 * 3),
    wakeAlphas: new Float32Array(180),
    wakeIndex: 0,
    // Fishing
    fishing: 'idle' as FishingState,
    fishTimer: 0,
    biteTime: 0,
    waitTime: 0,
    bobberBob: 0,
    justPressed: false,
  })

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      state.current.keys[e.code] = true
      if (e.code === 'Space') e.preventDefault()
      if (e.code === 'KeyF') {
        state.current.justPressed = true
      }
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

    // --- FISHING STATE MACHINE ---
    if (s.justPressed) {
      s.justPressed = false

      if (s.fishing === 'idle') {
        s.fishing = 'cast'
        s.fishTimer = 0
        s.waitTime = 2 + Math.random() * 4
        s.biteTime = 1.2 + Math.random() * 0.8
        onFishingState?.('cast')
      } else if (s.fishing === 'bite') {
        s.fishing = 'caught'
        s.fishTimer = 0
        const fish = rollFish()
        onCatch?.(fish)
        onFishingState?.('caught')
      } else if (s.fishing === 'waiting') {
        s.fishing = 'missed'
        s.fishTimer = 0
        onFishingState?.('missed')
      } else if (s.fishing === 'caught' || s.fishing === 'missed') {
        s.fishing = 'idle'
        s.fishTimer = 0
        onFishingState?.('idle')
      }
    }

    if (s.fishing === 'cast') {
      s.fishTimer += dt
      if (s.fishTimer > 0.5) {
        s.fishing = 'waiting'
        s.fishTimer = 0
        onFishingState?.('waiting')
      }
    } else if (s.fishing === 'waiting') {
      s.fishTimer += dt
      if (s.fishTimer > s.waitTime) {
        s.fishing = 'bite'
        s.fishTimer = 0
        onFishingState?.('bite')
      }
    } else if (s.fishing === 'bite') {
      s.fishTimer += dt
      if (s.fishTimer > s.biteTime) {
        s.fishing = 'missed'
        s.fishTimer = 0
        onFishingState?.('missed')
      }
    } else if (s.fishing === 'caught' || s.fishing === 'missed') {
      s.fishTimer += dt
      if (s.fishTimer > 2.0) {
        s.fishing = 'idle'
        s.fishTimer = 0
        onFishingState?.('idle')
      }
    }

    s.bobberBob += dt * 3

    // --- INPUT ---
    let targetBank = 0
    const canMove = s.fishing === 'idle'
    const turnRate = 1.6 * dt

    if (canMove) {
      if (keys['KeyA'] || keys['ArrowLeft']) {
        const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), turnRate)
        s.quat.multiply(turnQ)
        targetBank = 0.15
      }
      if (keys['KeyD'] || keys['ArrowRight']) {
        const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -turnRate)
        s.quat.multiply(turnQ)
        targetBank = -0.15
      }
      if (keys['KeyW'] || keys['ArrowUp']) {
        s.speed = Math.min(s.speed + dt * 0.2, 0.6)
      }
      if (keys['KeyS'] || keys['ArrowDown']) {
        s.speed = Math.max(s.speed - dt * 0.2, 0.05)
      }
    } else {
      s.speed = Math.max(s.speed - dt * 0.3, 0.02)
    }

    // --- LAND COLLISION CHECK ---
    // Check the position ahead of the boat for land
    const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat)
    const localForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.quat)
    const localRight = new THREE.Vector3(1, 0, 0).applyQuaternion(s.quat)

    // Check forward position for land
    const checkDist = 0.05
    const tempQ = s.quat.clone()
    const checkMoveQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), checkDist)
    tempQ.multiply(checkMoveQ)
    const checkUp = new THREE.Vector3(0, 1, 0).applyQuaternion(tempQ).normalize()

    const { influence: aheadInfluence } = islandInfluence(checkUp.x, checkUp.y, checkUp.z, true)

    // If land ahead, stop the boat
    if (aheadInfluence > 0.08) {
      s.speed = Math.max(s.speed - dt * 2.0, 0)
      // Also check current position
      const currentUp = localUp.clone().normalize()
      const { influence: currentInfluence } = islandInfluence(currentUp.x, currentUp.y, currentUp.z, true)
      if (currentInfluence > 0.1) {
        // Push back slightly
        const backQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -dt * 0.1)
        s.quat.multiply(backQ)
        s.quat.normalize()
        s.speed = 0
      }
    }

    // Move forward
    const moveAmount = s.speed * dt * 0.12
    const moveQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), moveAmount)
    s.quat.multiply(moveQ)
    s.quat.normalize()

    // Smooth bank
    s.bank += (targetBank - s.bank) * dt * 4

    // --- Recalculate vectors after movement ---
    const finalUp = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat)
    const finalForward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.quat)
    const finalRight = new THREE.Vector3(1, 0, 0).applyQuaternion(s.quat)

    // --- POSITION ---
    const position = finalUp.clone().multiplyScalar(s.altitude)
    groupRef.current.position.copy(position)
    onPositionUpdate?.(position)

    // --- BOAT ORIENTATION ---
    const rotMatrix = new THREE.Matrix4().makeBasis(finalRight, finalUp, finalForward)
    groupRef.current.quaternion.setFromRotationMatrix(rotMatrix)

    const bankQ = new THREE.Quaternion().setFromAxisAngle(finalForward, s.bank)
    groupRef.current.quaternion.premultiply(bankQ)

    // --- BOBBER ---
    if (bobberRef.current) {
      const showBobber = s.fishing !== 'idle'
      bobberRef.current.visible = showBobber

      if (showBobber) {
        const bobberPos = position.clone()
          .add(finalForward.clone().multiplyScalar(0.2))
          .add(finalRight.clone().multiplyScalar(0.08))

        const bobAmount = s.fishing === 'bite'
          ? Math.sin(s.bobberBob * 8) * 0.008
          : Math.sin(s.bobberBob) * 0.003

        bobberRef.current.position.copy(bobberPos.add(finalUp.clone().multiplyScalar(bobAmount)))

        const bobberUp = bobberPos.clone().normalize()
        const bobberQ = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), bobberUp)
        bobberRef.current.quaternion.copy(bobberQ)
      }
    }

    // --- WAKE PARTICLES ---
    // Only emit if actually moving
    if (s.speed > 0.03) {
      const leftIdx = (s.wakeIndex * 2) % 180
      const leftStern = position.clone()
        .add(finalRight.clone().multiplyScalar(-0.04))
        .add(finalForward.clone().multiplyScalar(-0.08))
      s.wakePositions[leftIdx * 3] = leftStern.x
      s.wakePositions[leftIdx * 3 + 1] = leftStern.y
      s.wakePositions[leftIdx * 3 + 2] = leftStern.z
      s.wakeAlphas[leftIdx] = 1.0

      const rightIdx = (s.wakeIndex * 2 + 1) % 180
      const rightStern = position.clone()
        .add(finalRight.clone().multiplyScalar(0.04))
        .add(finalForward.clone().multiplyScalar(-0.08))
      s.wakePositions[rightIdx * 3] = rightStern.x
      s.wakePositions[rightIdx * 3 + 1] = rightStern.y
      s.wakePositions[rightIdx * 3 + 2] = rightStern.z
      s.wakeAlphas[rightIdx] = 1.0

      s.wakeIndex++
    }

    for (let i = 0; i < 180; i++) {
      s.wakeAlphas[i] = Math.max(0, s.wakeAlphas[i] - dt * 0.6)
    }

    if (wakeRef.current && wakeRef.current.geometry.attributes.position) {
      wakeRef.current.geometry.attributes.position.needsUpdate = true
      wakeRef.current.geometry.attributes.alpha.needsUpdate = true
    }

    // --- CAMERA ---
    const behindDir = finalForward.clone().negate()
    const camPos = position.clone()
      .add(behindDir.multiplyScalar(1.8))
      .add(finalUp.clone().multiplyScalar(0.5))

    const lookAhead = position.clone()
      .add(finalForward.clone().multiplyScalar(2.0))
      .add(finalUp.clone().multiplyScalar(-0.1))

    s.camPos.lerp(camPos, dt * 3)
    s.camTarget.lerp(lookAhead, dt * 4)

    camera.position.copy(s.camPos)

    const camForward = s.camTarget.clone().sub(s.camPos).normalize()
    const camRight = new THREE.Vector3().crossVectors(camForward, finalUp).normalize()
    const camUp = new THREE.Vector3().crossVectors(camRight, camForward).normalize()

    const camMatrix = new THREE.Matrix4()
    camMatrix.makeBasis(camRight, camUp, camForward.negate())
    camera.quaternion.setFromRotationMatrix(camMatrix)
  })

  return (
    <>
    <group ref={groupRef}>
      {/* Hull - tapered shape */}
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[0.055, 0.018, 0.16]} />
        <meshLambertMaterial color="#5c3317" flatShading />
      </mesh>

      {/* Hull sides (darker trim) */}
      <mesh position={[0.028, 0.012, 0]}>
        <boxGeometry args={[0.004, 0.012, 0.15]} />
        <meshLambertMaterial color="#3e2210" flatShading />
      </mesh>
      <mesh position={[-0.028, 0.012, 0]}>
        <boxGeometry args={[0.004, 0.012, 0.15]} />
        <meshLambertMaterial color="#3e2210" flatShading />
      </mesh>

      {/* Bow (pointed front) */}
      <mesh position={[0, 0.008, 0.09]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.025, 0.05, 4]} />
        <meshLambertMaterial color="#6b3a20" flatShading />
      </mesh>

      {/* Stern (flat back) */}
      <mesh position={[0, 0.01, -0.08]}>
        <boxGeometry args={[0.055, 0.02, 0.01]} />
        <meshLambertMaterial color="#4a2815" flatShading />
      </mesh>

      {/* Deck */}
      <mesh position={[0, 0.018, 0]}>
        <boxGeometry args={[0.048, 0.003, 0.13]} />
        <meshLambertMaterial color="#deb887" flatShading />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.035, -0.02]}>
        <boxGeometry args={[0.03, 0.02, 0.04]} />
        <meshLambertMaterial color="#f5e6d0" flatShading />
      </mesh>

      {/* Cabin roof */}
      <mesh position={[0, 0.048, -0.02]}>
        <boxGeometry args={[0.034, 0.004, 0.044]} />
        <meshLambertMaterial color="#8B4513" flatShading />
      </mesh>

      {/* Cabin window */}
      <mesh position={[0, 0.036, 0.001]}>
        <boxGeometry args={[0.02, 0.01, 0.001]} />
        <meshBasicMaterial color="#88ccff" transparent opacity={0.7} />
      </mesh>

      {/* Mast */}
      <mesh position={[0, 0.07, 0.02]}>
        <cylinderGeometry args={[0.002, 0.003, 0.08, 5]} />
        <meshLambertMaterial color="#4a3520" flatShading />
      </mesh>

      {/* Boom (horizontal spar) */}
      <mesh position={[0, 0.055, 0.02]} rotation={[0, 0.3, 0.1]}>
        <cylinderGeometry args={[0.001, 0.002, 0.05, 4]} />
        <meshLambertMaterial color="#4a3520" flatShading />
      </mesh>

      {/* Sail */}
      <mesh position={[0.01, 0.075, 0.02]} rotation={[0, 0.15, 0.05]}>
        <planeGeometry args={[0.04, 0.06]} />
        <meshBasicMaterial color="#fff8f0" side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>

      {/* Flag at top of mast */}
      <mesh position={[0.006, 0.108, 0.02]} rotation={[0, 0, -0.2]}>
        <planeGeometry args={[0.012, 0.006]} />
        <meshBasicMaterial color="#cc3333" side={THREE.DoubleSide} />
      </mesh>

      {/* Rudder */}
      <mesh position={[0, -0.005, -0.085]}>
        <boxGeometry args={[0.003, 0.015, 0.015]} />
        <meshLambertMaterial color="#3e2210" flatShading />
      </mesh>

      {/* Fishing rod (right side, angled out) */}
      <mesh position={[0.025, 0.035, 0.04]} rotation={[0.5, 0.3, 0.4]}>
        <cylinderGeometry args={[0.001, 0.0015, 0.1, 4]} />
        <meshLambertMaterial color="#2a1a0a" flatShading />
      </mesh>

      {/* Reel on rod */}
      <mesh position={[0.028, 0.032, 0.035]}>
        <cylinderGeometry args={[0.003, 0.003, 0.004, 6]} />
        <meshLambertMaterial color="#666666" flatShading />
      </mesh>
    </group>

    {/* Bobber */}
    <group ref={bobberRef} visible={false}>
      <mesh position={[0, 0.008, 0]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.001, 0.001, 0.012, 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>

    {/* Wake trail */}
    {wake && <WakePoints ref={wakeRef} positions={state.current.wakePositions} alphas={state.current.wakeAlphas} />}
    </>
  )
}

const WakePoints = forwardRef<THREE.Points, { positions: Float32Array; alphas: Float32Array }>(
  function WakePoints({ positions, alphas }, ref) {
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
              gl_PointSize = 8.0 * (1.0 / -mvPos.z);
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
              gl_FragColor = vec4(0.9, 0.95, 1.0, vAlpha * soft * 0.5);
            }
          `}
        />
      </points>
    )
  }
)
