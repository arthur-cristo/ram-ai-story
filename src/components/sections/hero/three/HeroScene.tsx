import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import * as THREE from 'three'

import { isMobile } from 'react-device-detect'

import { RamModel } from './RamModel'
import { MotionValue, useScroll, useTransform } from 'framer-motion'

type HeroSceneProps = {
  sectionRef: React.RefObject<HTMLElement | null>
}

const DEVICE = isMobile ? 'mobile' : 'desktop'

function Scene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const MODEL_CONFIG = {
    desktop: {
      position: [0, 0, 0],
      rotation: [0, -0.4, 0],
      scale: 0.009,
    },

    mobile: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: 0.009,
    },
  } as const
  const modelRef = useRef<THREE.Group>(null)

  const model = MODEL_CONFIG[DEVICE]

  const rotationX = useTransform(scrollProgress, [0.5, 0.75, 1], [0, Math.PI / 2, Math.PI])

  useFrame(() => {
    if (!modelRef.current) return
    if (DEVICE === 'desktop') {
      modelRef.current.rotation.x = rotationX.get()
    } else if (DEVICE === 'mobile') {
      modelRef.current.rotation.z = rotationX.get()
    }
  })

  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={20}
        color="#e4ffeb"
        target={modelRef.current ?? undefined}
      />

      <directionalLight
        position={[-5, -2, 2]}
        intensity={20}
        color="#0FA135"
        target={modelRef.current ?? undefined}
      />

      <group ref={modelRef}>
        <RamModel
          scale={model.scale}
          position={[...model.position]}
          rotation={[...model.rotation]}
        />
      </group>
    </>
  )
}

export function HeroScene({ sectionRef }: HeroSceneProps) {
  const CAMERA_CONFIG = {
    desktop: {
      position: [-8, 10, 5],
      rotation: [-1.08, -0.54, -1.5],
      fov: 45,
    },

    mobile: {
      position: [-1, 15, 3.5],
      rotation: [-1.16, -0.1, -0.1],
      fov: 45,
    },
  } as const
  const camera = CAMERA_CONFIG[DEVICE]
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <Canvas camera={camera}>
      <Scene scrollProgress={scrollYProgress} />
    </Canvas>
  )
}
