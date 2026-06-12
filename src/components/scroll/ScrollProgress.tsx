import { Box } from '@chakra-ui/react'
import { useScroll, useSpring } from 'framer-motion'
import MotionBox from '../motion/MotionBox'



export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  })

  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      h="100dvh"
      w="8px"
      bg="whiteAlpha.100"
      zIndex={9999}
      mr="16px"
    >
      <MotionBox
        style={{
          scaleY,
          transformOrigin: 'top',
        }}
        w="100%"
        h="100%"
        bg="primary"
        opacity={0.6}
      />
    </Box>
  )
}
