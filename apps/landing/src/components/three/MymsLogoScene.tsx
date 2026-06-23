import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Html, OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'

import { heroModules } from '@/data/landing'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

import { FloatingProductModules } from './FloatingProductModules'
import { ParticleLogo } from './ParticleLogo'

type MymsLogoSceneProps = {
  mode?: 'hero' | 'showcase'
}

export function MymsLogoScene({ mode = 'hero' }: MymsLogoSceneProps) {
  const reducedMotion = usePrefersReducedMotion()
  const isHero = mode === 'hero'
  const particleCount = useMemo(() => {
    if (reducedMotion) {
      return 90
    }

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 120
    }

    return isHero ? 180 : 220
  }, [isHero, reducedMotion])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(45,127,249,0.18),_transparent_52%)]">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={<Html center className="text-xs text-white/70">Cargando escena…</Html>}>
          <color attach="background" args={['#050A12']} />
          <fog attach="fog" args={['#050A12', 4, 12]} />
          <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={36} />
          <ambientLight intensity={0.9} />
          <pointLight position={[0, 1, 4]} intensity={18} color="#2D7FF9" />
          <pointLight position={[0, -2, 2]} intensity={5} color="#7AB8FF" />

          <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={reducedMotion ? 0 : 0.18} floatIntensity={0.8}>
            <group>
              <ParticleLogo reducedMotion={reducedMotion} particleCount={particleCount} />
              <Text
                position={[0, -0.02, 0.05]}
                fontSize={0.58}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.04}
              >
                MYMS
              </Text>
            </group>
          </Float>

          <FloatingProductModules items={heroModules.slice(0, 5)} reducedMotion={reducedMotion} />

          {!reducedMotion ? (
            <mesh position={[0, 0.12, 0.18]} rotation={[0, 0, -0.28]}>
              <planeGeometry args={[0.7, 3.4]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.06} />
            </mesh>
          ) : null}

          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
