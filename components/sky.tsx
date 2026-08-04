'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function Sky() {
  const { scene } = useThree()
  const starsRef = useRef<THREE.Points>(null)

  // Set background gradient
  useMemo(() => {
    // Simple solid color background - consistent from all angles
    scene.background = new THREE.Color('#6ab8d8')
  }, [scene])

  // Stars
  const starGeo = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere around the scene
      const r = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      sizes[i] = 0.3 + Math.random() * 0.7
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [])

  // Slow star twinkle
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.elapsedTime * 0.005
    }
  })

  return (
    <points ref={starsRef} geometry={starGeo}>
      <pointsMaterial
        color="#ffffff"
        size={0.15}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}
