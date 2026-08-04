'use client'

import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Pole-free globe controller.
 * Instead of orbiting the camera, we ROTATE THE SCENE.
 * Camera stays fixed looking at center. Globe spins freely.
 * No gimbal lock possible because we use quaternion rotation on the scene.
 */
export function FreeOrbit({ minDistance = 4.5, maxDistance = 15 }: { minDistance?: number; maxDistance?: number }) {
  const { camera, gl, scene } = useThree()

  const state = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    velocityX: 0,
    velocityY: 0,
    distance: 8,
    // The globe's rotation as a quaternion
    rotation: new THREE.Quaternion(),
  })

  // Set camera at fixed position looking at center
  useEffect(() => {
    camera.position.set(0, 0, state.current.distance)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useEffect(() => {
    const canvas = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      state.current.isDragging = true
      state.current.prevX = e.clientX
      state.current.prevY = e.clientY
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!state.current.isDragging) return
      const dx = e.clientX - state.current.prevX
      const dy = e.clientY - state.current.prevY
      state.current.prevX = e.clientX
      state.current.prevY = e.clientY

      const sensitivity = 0.005
      state.current.velocityX = dx * sensitivity
      state.current.velocityY = dy * sensitivity

      applyRotation(state.current.velocityX, state.current.velocityY)
    }

    const onPointerUp = () => {
      state.current.isDragging = false
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      state.current.distance += e.deltaY * 0.005
      state.current.distance = Math.max(minDistance, Math.min(maxDistance, state.current.distance))
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerUp)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [gl, minDistance, maxDistance])

  function applyRotation(dx: number, dy: number) {
    const s = state.current

    // Rotate the globe around SCREEN axes
    // Horizontal drag = rotate around world Y (screen up)
    // Vertical drag = rotate around world X (screen right)
    // Because the camera is fixed, these never change. No poles.
    const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx)
    const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy)

    s.rotation.premultiply(qX)
    s.rotation.premultiply(qY)
    s.rotation.normalize()
  }

  useFrame((_, delta) => {
    const s = state.current
    const dt = Math.min(delta, 0.05)

    // Momentum when not dragging
    if (!s.isDragging) {
      if (Math.abs(s.velocityX) > 0.0001 || Math.abs(s.velocityY) > 0.0001) {
        applyRotation(s.velocityX, s.velocityY)
      }
      s.velocityX *= 0.95
      s.velocityY *= 0.95

      // Auto rotate when idle
      if (Math.abs(s.velocityX) < 0.0002 && Math.abs(s.velocityY) < 0.0002) {
        applyRotation(dt * 0.15, 0)
      }
    }

    // Apply rotation to the scene's first child group (the planet)
    // We find the planet group and rotate it
    scene.quaternion.copy(s.rotation)

    // Update camera distance
    camera.position.set(0, 0, s.distance)
    camera.lookAt(0, 0, 0)
  })

  return null
}
