import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type ParticleLogoProps = {
  reducedMotion: boolean
  particleCount?: number
}

export function ParticleLogo({ reducedMotion, particleCount = 180 }: ParticleLogoProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const seededRandom = (seed: number) => {
    const value = Math.sin(seed * 9999.91) * 43758.5453
    return value - Math.floor(value)
  }

  const positions = useMemo(() => {
    const samples: number[] = []
    const textShapes = [
      { x: -1.9, width: 0.35 },
      { x: -1.2, width: 0.35 },
      { x: -0.15, width: 0.25 },
      { x: 0.45, width: 0.25 },
      { x: 1.25, width: 0.35 },
    ]

    for (let index = 0; index < particleCount; index += 1) {
      const cluster = textShapes[index % textShapes.length]
      const px = cluster.x + (seededRandom(index + 1) - 0.5) * cluster.width
      const py = (seededRandom(index + 11) - 0.5) * 0.7
      const pz = (seededRandom(index + 21) - 0.5) * 0.18

      samples.push(px, py, pz)
    }

    return new Float32Array(samples)
  }, [particleCount])

  const randomOffsets = useMemo(
    () => Float32Array.from({ length: particleCount }, (_, index) => seededRandom(index + 31) * Math.PI * 2),
    [particleCount],
  )

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) {
      return
    }

    const elapsed = clock.getElapsedTime()
    const array = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let index = 0; index < particleCount; index += 1) {
      const i = index * 3
      const offset = randomOffsets[index]
      array[i + 1] += Math.sin(elapsed * 0.8 + offset) * (reducedMotion ? 0.0004 : 0.0012)
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, pointer.x * 0.08, 0.06)
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, pointer.y * 0.05, 0.06)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7AB8FF"
        size={reducedMotion ? 0.038 : 0.048}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </points>
  )
}
