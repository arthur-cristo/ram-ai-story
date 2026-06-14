import MotionBox from '@/components/motion/MotionBox'
import { Box, Flex, Heading, VStack } from '@chakra-ui/react'
import particle2 from '@/assets/images/particles/2.png'

const EndSection = () => {
  return (
    <Flex h="100dvh" position="relative" align="center" justify="center">
      <VStack
        zIndex={1}
        align="center"
        justify="center"
        gap={{ base: '8', lg: '32' }}
        h="100%"
        w="100%"
        py="16"
      >
        <MotionBox
          animate={{
            y: [0, -15, 0],
            z: 0,
            rotate: 0.01,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            willChange: 'transform',
          }}
        >
          <Heading
            fontSize={{ base: '5rem', md: '8rem', lg: '12rem', '2xl': '15rem' }}
            fontWeight="bold"
            textTransform="uppercase"
            lineHeight="1"
            pr="0.06em"
            ml="-0.04em"
          >
            Obrigado!
          </Heading>
        </MotionBox>
      </VStack>

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        aspectRatio={1}
        h="100%"
        w="100%"
        opacity={0.3}
        bgImage={`url('${particle2}')`}
        bgSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        zIndex={0}
      />
    </Flex>
  )
}

export default EndSection
