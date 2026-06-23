import { useMemo, useRef } from 'react'
import { Billboard, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type FloatingProductModulesProps = {
  items: string[]
  reducedMotion: boolean
}

export function FloatingProductModules({ items, reducedMotion }: FloatingProductModulesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const modules = useMemo(
    () =>
      items.map((label, index) => {
        const angle = (index / items.length) * Math.PI * 2
        const radius = 2.25 + (index % 2) * 0.4

        return {
          label,
          position: [Math.cos(angle) * radius, Math.sin(angle * 1.4) * 0.9, Math.sin(angle) * 0.9] as [
            number,
            number,
            number,
          ],
          angle,
        }
      }),
    [items],
  )

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) {
      return
    }

    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.22, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.16, 0.04)
    groupRef.current.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.5) * 0.08
  })

  return (
    <group ref={groupRef}>
      {modules.map((module) => (
        <Billboard key={module.label} position={module.position}>
          <mesh>
            <planeGeometry args={[1.32, 0.44]} />
            <meshPhysicalMaterial
              color="#09111D"
              emissive="#2D7FF9"
              emissiveIntensity={0.2}
              roughness={0.18}
              metalness={0.32}
              transparent
              opacity={0.82}
            />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.12}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            maxWidth={1}
          >
            {module.label}
          </Text>
        </Billboard>
      ))}
    </group>
  )
}
