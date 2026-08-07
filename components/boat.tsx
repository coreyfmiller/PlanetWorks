'use client'

import { useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { islandInfluence } from '@/components/planet'
import { getNearestFishSchool, consumeFishFromSchool } from '@/components/fish-schools'
import { getGameInput } from '@/components/touch-controls'

export interface FishCatch {
  name: string
  emoji: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  value: number
  rodLevel: number // minimum rod level to catch this fish
}

// 20 fish ladder - you need better rods to catch rarer fish
export const FISH_TABLE: FishCatch[] = [
  // Rod Level 1 (Starter Rod - free)
  { name: 'Minnow', emoji: '🐟', rarity: 'common', value: 2, rodLevel: 1 },
  { name: 'Perch', emoji: '🐟', rarity: 'common', value: 3, rodLevel: 1 },
  { name: 'Herring', emoji: '🐟', rarity: 'common', value: 4, rodLevel: 1 },
  { name: 'Mackerel', emoji: '🐟', rarity: 'common', value: 5, rodLevel: 1 },

  // Rod Level 2 (Fiberglass Rod - 30 coins)
  { name: 'Trout', emoji: '🐟', rarity: 'common', value: 8, rodLevel: 2 },
  { name: 'Bass', emoji: '🐟', rarity: 'common', value: 10, rodLevel: 2 },
  { name: 'Cod', emoji: '🐠', rarity: 'uncommon', value: 15, rodLevel: 2 },
  { name: 'Flounder', emoji: '🐠', rarity: 'uncommon', value: 18, rodLevel: 2 },

  // Rod Level 3 (Carbon Rod - 80 coins)
  { name: 'Salmon', emoji: '🐠', rarity: 'uncommon', value: 25, rodLevel: 3 },
  { name: 'Red Snapper', emoji: '🐠', rarity: 'uncommon', value: 30, rodLevel: 3 },
  { name: 'Tuna', emoji: '🐠', rarity: 'rare', value: 40, rodLevel: 3 },
  { name: 'Barracuda', emoji: '🦈', rarity: 'rare', value: 50, rodLevel: 3 },

  // Rod Level 4 (Deep Sea Rod - 200 coins)
  { name: 'Swordfish', emoji: '🗡️', rarity: 'rare', value: 75, rodLevel: 4 },
  { name: 'Giant Squid', emoji: '🦑', rarity: 'rare', value: 90, rodLevel: 4 },
  { name: 'Manta Ray', emoji: '🦈', rarity: 'epic', value: 120, rodLevel: 4 },
  { name: 'Hammerhead', emoji: '🦈', rarity: 'epic', value: 150, rodLevel: 4 },

  // Rod Level 5 (Legendary Rod - 500 coins)
  { name: 'Blue Whale', emoji: '🐋', rarity: 'epic', value: 200, rodLevel: 5 },
  { name: 'Oarfish', emoji: '🐉', rarity: 'epic', value: 250, rodLevel: 5 },
  { name: 'Kraken Tentacle', emoji: '🦑', rarity: 'legendary', value: 400, rodLevel: 5 },
  { name: 'Golden Leviathan', emoji: '✨', rarity: 'legendary', value: 1000, rodLevel: 5 },
]

export interface RodDef {
  level: number
  name: string
  cost: number
  description: string
}

export const RODS: RodDef[] = [
  { level: 1, name: 'Starter Rod', cost: 0, description: 'Basic wooden rod' },
  { level: 2, name: 'Fiberglass Rod', cost: 30, description: 'Catches better fish' },
  { level: 3, name: 'Carbon Rod', cost: 80, description: 'Deep water capable' },
  { level: 4, name: 'Deep Sea Rod', cost: 200, description: 'For serious anglers' },
  { level: 5, name: 'Legendary Rod', cost: 500, description: 'Catches the uncatchable' },
]

export interface BoatSpeedDef {
  level: number
  name: string
  cost: number
  maxSpeed: number
  cargo: number
}

export const BOAT_SPEEDS: BoatSpeedDef[] = [
  { level: 1, name: 'Cloth Sail', cost: 0, maxSpeed: 0.6, cargo: 5 },
  { level: 2, name: 'Canvas Sail', cost: 40, maxSpeed: 0.85, cargo: 8 },
  { level: 3, name: 'Racing Sail', cost: 120, maxSpeed: 1.1, cargo: 12 },
]

export interface BaitDef {
  level: number
  name: string
  cost: number
  description: string
  rarityBoost: number // 0-1, shifts roll toward rarer fish
}

export const BAITS: BaitDef[] = [
  { level: 1, name: 'Worms', cost: 0, description: 'Free, basic bait', rarityBoost: 0 },
  { level: 2, name: 'Shrimp', cost: 5, description: 'Faster bites', rarityBoost: 0.1 },
  { level: 3, name: 'Squid Chunks', cost: 15, description: 'Attracts bigger fish', rarityBoost: 0.2 },
  { level: 4, name: 'Golden Lure', cost: 40, description: 'Best chance at rare catches', rarityBoost: 0.35 },
]

export function rollFish(rodLevel: number, baitLevel: number = 1): FishCatch {
  // Filter fish available at this rod level
  const available = FISH_TABLE.filter(f => f.rodLevel <= rodLevel)
  const bait = BAITS[Math.min(baitLevel, BAITS.length) - 1]
  const boost = bait.rarityBoost

  const roll = Math.random()
  const currentTier = available.filter(f => f.rodLevel === rodLevel)
  const lowerTier = available.filter(f => f.rodLevel < rodLevel)

  // Bait boost increases chance of current tier (better fish)
  const currentChance = 0.4 + boost
  const lowerChance = 0.35 - boost * 0.5

  if (roll < currentChance && currentTier.length > 0) {
    return currentTier[Math.floor(Math.random() * currentTier.length)]
  } else if (roll < currentChance + lowerChance && lowerTier.length > 0) {
    return lowerTier[Math.floor(Math.random() * lowerTier.length)]
  }
  return available[Math.floor(Math.random() * available.length)]
}

type FishingState = 'idle' | 'cast' | 'waiting' | 'bite' | 'caught' | 'missed' | 'nofish'

interface BoatProps {
  wake?: boolean
  rodLevel?: number
  speedLevel?: number
  baitLevel?: number
  cargoFull?: boolean
  spawnPosition?: THREE.Vector3 | null
  onCatch?: (fish: FishCatch) => void
  onFishingState?: (state: FishingState | 'holdfull') => void
  onPositionUpdate?: (pos: THREE.Vector3, forward?: THREE.Vector3) => void
}

export function Boat({ wake = true, rodLevel = 1, speedLevel = 1, baitLevel = 1, cargoFull = false, spawnPosition, onCatch, onFishingState, onPositionUpdate }: BoatProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bobberRef = useRef<THREE.Group>(null)
  const wakeRef = useRef<THREE.Points>(null)
  const { camera } = useThree()

  const state = useRef({
    quat: (() => {
      if (spawnPosition) {
        const up = spawnPosition.clone().normalize()
        return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up)
      }
      return new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI * 0.4)
    })(),
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
    const touch = getGameInput()

    // --- FISHING STATE MACHINE ---
    if (s.justPressed || touch.action1) {
      s.justPressed = false

      if (s.fishing === 'idle') {
        // Check cargo first
        if (cargoFull) {
          onFishingState?.('holdfull')
          s.justPressed = false
          return
        }
        // Check if near a fish school before allowing cast
        const pos = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize().multiplyScalar(s.altitude)
        const nearestSchool = getNearestFishSchool(pos)
        if (nearestSchool && nearestSchool.distance < 0.6) {
          s.fishing = 'cast'
          s.fishTimer = 0
          s.waitTime = Math.max(1, 2 + Math.random() * 4 - (rodLevel - 1) * 0.5)
          s.biteTime = 1.2 + Math.random() * 0.8
          onFishingState?.('cast')
        } else {
          // Too far from fish
          onFishingState?.('nofish')
        }
      } else if (s.fishing === 'bite') {
        s.fishing = 'caught'
        s.fishTimer = 0
        const fish = rollFish(rodLevel, baitLevel)
        // Consume from nearest school
        const pos = new THREE.Vector3(0, 1, 0).applyQuaternion(s.quat).normalize().multiplyScalar(s.altitude)
        consumeFishFromSchool(pos)
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
      const turnLeft = keys['KeyA'] || keys['ArrowLeft'] || touch.turn < -0.2
      const turnRight = keys['KeyD'] || keys['ArrowRight'] || touch.turn > 0.2
      const goForward = keys['KeyW'] || keys['ArrowUp'] || touch.forward > 0.2
      const goBack = keys['KeyS'] || keys['ArrowDown'] || touch.forward < -0.2

      if (turnLeft) {
        const amount = touch.turn < -0.2 ? turnRate * Math.abs(touch.turn) : turnRate
        const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), amount)
        s.quat.multiply(turnQ)
        targetBank = 0.15
      }
      if (turnRight) {
        const amount = touch.turn > 0.2 ? turnRate * Math.abs(touch.turn) : turnRate
        const turnQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -amount)
        s.quat.multiply(turnQ)
        targetBank = -0.15
      }
      if (goForward) {
        const maxSpeed = BOAT_SPEEDS[Math.min(speedLevel, BOAT_SPEEDS.length) - 1].maxSpeed
        const accel = touch.forward > 0.2 ? dt * 0.2 * touch.forward : dt * 0.2
        s.speed = Math.min(s.speed + accel, maxSpeed)
      }
      if (goBack) {
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
    onPositionUpdate?.(position, finalForward)

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
      // Position wake at water level (below boat)
      const wakePos = finalUp.clone().multiplyScalar(s.altitude - 0.04)
      const leftIdx = (s.wakeIndex * 2) % 180
      const leftStern = wakePos.clone()
        .add(finalRight.clone().multiplyScalar(-0.035))
        .add(finalForward.clone().multiplyScalar(-0.08))
      s.wakePositions[leftIdx * 3] = leftStern.x
      s.wakePositions[leftIdx * 3 + 1] = leftStern.y
      s.wakePositions[leftIdx * 3 + 2] = leftStern.z
      s.wakeAlphas[leftIdx] = 1.0

      const rightIdx = (s.wakeIndex * 2 + 1) % 180
      const rightStern = wakePos.clone()
        .add(finalRight.clone().multiplyScalar(0.035))
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
      <BoatModel level={speedLevel} />
      <BoatCharacter level={speedLevel} />
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

function BoatModel({ level }: { level: number }) {
  const paths = [
    '/models/boat-basic.glb',
    '/models/boat-canvas.glb',
    '/models/boat-racing.glb',
  ]
  const offsets = [0.05, 0.05, 0.05]
  const path = paths[Math.min(level, paths.length) - 1]
  const yOffset = offsets[Math.min(level, offsets.length) - 1]
  const { scene } = useGLTF(path)
  return <primitive object={scene} scale={0.16} rotation={[0, Math.PI / 2, 0]} position={[0, yOffset, 0]} />
}

function BoatCharacter({ level }: { level: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/character-cartoon-sitting.glb')
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)

  useEffect(() => {
    if (!groupRef.current) return

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

    if (animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene)
      const action = mixer.clipAction(animations[0])
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.play()
      mixerRef.current = mixer
    }

    return () => {
      mixerRef.current?.stopAllAction()
      if (groupRef.current && scene.parent === groupRef.current) {
        groupRef.current.remove(scene)
      }
    }
  }, [scene, animations])

  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(Math.min(delta, 0.05))
  })

  // Position character per boat type (racing boat sits lower and toward back)
  const charOffsets: [number, number, number][] = [[0, -0.02, 0], [0, -0.02, 0], [0, -0.05, -0.03]]
  const pos = charOffsets[Math.min(level, charOffsets.length) - 1]
  return <group ref={groupRef} position={pos} />
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
