import { Float, useGLTF } from '@react-three/drei'

type Props = {
  scale: number
  position: [number, number, number]
  rotation: [number, number, number]
}

export function RamModel({ scale, position, rotation }: Props) {
  const gltf = useGLTF('/models/random_access_memory_ram_ddr3_black_2.glb')

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive object={gltf.scene} scale={scale} position={position} rotation={rotation} />
    </Float>
  )
}

useGLTF.preload('/models/random_access_memory_ram_ddr3_black_2.glb')
