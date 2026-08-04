'use client'

import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Custom orbit controller with NO gimbal lock.
 * Rotates camera around (0,0,0) using quaternions.
 * Smooth damping on release.
 */
export function FreeOrbit({ minDistance = 4.5, maxDistance = 15, autoRotateSpeed = 0.2 }) {
  const { camera, gl } = useThree()

  const state = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    // Velocity for momentum/damping
    velocityX: 0,
    velocityY: 0,
    // Zoom velocity
    zoomVelocity: 0,
    distance: 8,
    // Camera orientation as quaternion (no poles!)
    orientation: new THREE.Quaternion(),
  })

  // Initialize orientation from current camera position
  useEffect(() => {
    const dir = camera.position.clone().normalize()
    const up = new THREE.Vector3(0, 1, 0)
    const m = new THREE.Matrix4().lookAt(new THREE.Vector3(), dir.negate(), up)
    state.current.orientation.setFromRotationMatrix(m)
    state.current.distance = camera.position.length()
  }, [camera])

  // Mouse/touch handlers
  useEffect(() => {
    const canvas = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      state.current.isDragging = true
      state.current.prevX = e.clientX
      state.current.prevY = e.clientY
      state.current.velocityX = 0
      state.current.velocityY = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!state.current.isDragging) return
      const dx = e.clientX - state.current.prevX
      const dy = e.clientY - state.current.prevY
      state.current.prevX = e.clientX
      state.current.prevY = e.clientY

      // Convert pixel movement to rotation speed
      const sensitivity = 0.004
      state.current.velocityX = -dx * sensitivity
      state.current.velocityY = -dy * sensitivity

      // Apply rotation immediately while dragging
      applyRotation(state.current.velocityX, state.current.velocityY)
    }

    const onPointerUp = () => {
      state.current.isDragging = false
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      state.current.zoomVelocity += e.deltaY * 0.003
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
  }, [gl])

  function applyRotation(rx: number, ry: number) {
    const s = state.current

    // The key to no-pole rotation:
    // Use the SCREEN axes (camera's actual current right and up) as rotation axes.
    // This means dragging always does what you expect visually.
    
    const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
    const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion)

    const qX = new THREE.Quaternion().setFromAxisAngle(cameraUp, rx)
    const qY = new THREE.Quaternion().setFromAxisAngle(cameraRight, ry)

    s.orientation.premultiply(qY)
    s.orientation.premultiply(qX)
    s.orientation.normalize()
  }

  useFrame((_, delta) => {
    const s = state.current
    const dt = Math.min(delta, 0.05)

    // Apply momentum when not dragging
    if (!s.isDragging) {
      if (Math.abs(s.velocityX) > 0.0001 || Math.abs(s.velocityY) > 0.0001) {
        applyRotation(s.velocityX * 0.3, s.velocityY * 0.3)
      }
      // Damping
      s.velocityX *= 0.92
      s.velocityY *= 0.92

      // Auto rotate when idle
      if (Math.abs(s.velocityX) < 0.0001 && Math.abs(s.velocityY) < 0.0001) {
        applyRotation(autoRotateSpeed * dt * 0.05, 0)
      }
    }

    // Zoom
    s.distance += s.zoomVelocity
    s.distance = Math.max(minDistance, Math.min(maxDistance, s.distance))
    s.zoomVelocity *= 0.85

    // Apply orientation to camera position
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(s.orientation)
    camera.position.copy(forward.multiplyScalar(s.distance))
    
    // Set camera rotation directly from quaternion - NO lookAt (which causes flips)
    camera.quaternion.copy(s.orientation)
    // Flip to look inward (camera looks -Z by default, we want it looking at center)
    const flipQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
    camera.quaternion.multiply(flipQ)
  })

  return null
}
