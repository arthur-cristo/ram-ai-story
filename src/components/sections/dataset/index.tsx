import MotionBox from '@/components/motion/MotionBox'
import { DATASET_STATS } from '@/constants'
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'

const DatasetSection = () => {
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
          <VStack align="center" gap="0">
            <Heading
              fontSize={{ base: '12rem', lg: '20rem' }}
              fontWeight="bold"
              letterSpacing="-0.06em"
              lineHeight="1"
              pr="0.06em"
              ml="-0.04em"
            >
              12.784
            </Heading>

            <Text
              mt={{ base: '0', lg: '-10' }}
              fontSize={{ base: 'lg', lg: '2rem' }}
              fontWeight="600"
              color="primary.light"
              letterSpacing="0.12em"
            >
              PREÇOS COLETADOS
            </Text>
          </VStack>
        </MotionBox>

        <HStack
          w="100%"
          justify="center"
          gap={{ base: '4', lg: '10' }}
          px={{ base: '4', lg: '16' }}
        >
          {DATASET_STATS.map((item, index) => (
            <HStack key={item.label} gap={{ base: '4', lg: '10' }}>
              <VStack gap="1">
                <Heading fontSize={{ base: '2xl', lg: '4xl' }} lineHeight="1">
                  {item.value}
                </Heading>

                <Text
                  opacity={0.7}
                  fontSize={{ base: 'xs', lg: 'sm' }}
                  letterSpacing="0.08em"
                  w="150px"
                  textAlign="center"
                >
                  {item.label}
                </Text>
              </VStack>

              {index !== DATASET_STATS.length - 1 && (
                <Box h={{ base: '40px', lg: '60px' }} w="1px" bg="whiteAlpha.300" />
              )}
            </HStack>
          ))}
        </HStack>
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
        bgImage={`url('/images/particles/2.png')`}
        bgSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        zIndex={0}
      />
    </Flex>
  )
}

export default DatasetSection
