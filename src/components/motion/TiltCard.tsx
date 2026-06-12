import { useMotionValue, useSpring } from 'framer-motion'
import MotionBox from './MotionBox'

export default function TiltCard({
  children,
  color = '#34D170',
}: {
  children: React.ReactNode
  color?: string
}) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(rotateX, {
    stiffness: 150,
    damping: 20,
  })

  const springY = useSpring(rotateY, {
    stiffness: 150,
    damping: 20,
  })

  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const glowXSpring = useSpring(glowX, {
    stiffness: 150,
    damping: 20,
  })

  const glowYSpring = useSpring(glowY, {
    stiffness: 150,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateY.set(((x - centerX) / centerX) * 8)
    rotateX.set(-((y - centerY) / centerY) * 8)

    glowX.set((x / rect.width) * 100)
    glowY.set((y / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <MotionBox
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1200,
      }}
      transformStyle="preserve-3d"
    >
      <MotionBox
        position="absolute"
        w="250px"
        h="250px"
        borderRadius="full"
        bg={color}
        opacity={0.28}
        filter="blur(90px)"
        style={{
          left: glowXSpring,
          top: glowYSpring,
        }}
      />
      {children}
    </MotionBox>
  )
}
