import { useMotionValue, useSpring } from 'framer-motion'
import MotionBox from './MotionBox'
import { isMobile } from 'react-device-detect'

type GlowPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

type Props = {
  children: React.ReactNode
  color?: string
  lightHeight?: string
  lightWidth?: string
  glowPosition?: GlowPosition
}

export default function TiltCard({
  children,
  color = '#34D170',
  lightHeight = '250px',
  lightWidth = '250px',
  glowPosition = 'center',
}: Props) {
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

  const MOBILE_GLOW_POSITION: Record<
    GlowPosition,
    {
      left: string
      top: string
      transform: string
    }
  > = {
    'top-left': {
      left: '0%',
      top: '0%',
      transform: 'translate(-30%, -30%)',
    },

    'top-center': {
      left: '50%',
      top: '0%',
      transform: 'translate(-50%, -30%)',
    },

    'top-right': {
      left: '100%',
      top: '0%',
      transform: 'translate(-70%, -30%)',
    },

    'center-left': {
      left: '0%',
      top: '50%',
      transform: 'translate(-30%, -50%)',
    },

    center: {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },

    'center-right': {
      left: '100%',
      top: '50%',
      transform: 'translate(-70%, -50%)',
    },

    'bottom-left': {
      left: '0%',
      top: '100%',
      transform: 'translate(-30%, -70%)',
    },

    'bottom-center': {
      left: '50%',
      top: '100%',
      transform: 'translate(-50%, -70%)',
    },

    'bottom-right': {
      left: '100%',
      top: '100%',
      transform: 'translate(-70%, -70%)',
    },
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return

    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateY.set(((x - centerX) / centerX) * 6)
    rotateX.set(-((y - centerY) / centerY) * 6)

    glowX.set((x / rect.width) * 100)
    glowY.set((y / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const mobileGlow = MOBILE_GLOW_POSITION[glowPosition]
  console.log(mobileGlow)

  return (
    <MotionBox
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        isMobile
          ? undefined
          : {
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 1200,
            }
      }
      transformStyle="preserve-3d"
      overflow="hidden"
    >
      <MotionBox
        position="absolute"
        w={lightWidth}
        h={lightHeight}
        borderRadius="full"
        bg={color}
        opacity={0.28}
        filter="blur(90px)"
        pointerEvents="none"
        left={isMobile ? mobileGlow.left : undefined}
        top={isMobile ? mobileGlow.top : undefined}
        style={
          !isMobile
            ? {
                left: glowXSpring,
                top: glowYSpring,
              }
            : undefined
        }
      />

      {children}
    </MotionBox>
  )
}
