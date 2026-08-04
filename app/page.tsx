'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Planet } from '@/components/planet'
import { Sky } from '@/components/sky'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 45 }}>
        <Sky />
        <ambientLight intensity={0.5} />
        <directionalLight position={[8, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-4, -2, -6]} intensity={0.3} color="#4488cc" />
        <Planet />
        <OrbitControls
          enablePan={false}
          minDistance={4.5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.2}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
