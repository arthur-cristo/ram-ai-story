import MotionBox from '@/components/motion/MotionBox'
import { Box, Heading, HStack } from '@chakra-ui/react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

const MotionHeading = motion.create(Heading)

type Props = {
  percentage?: number
}

const ReservedCapacityCard = ({ percentage = 40 }: Props) => {
  const progress = useMotionValue(0)

  useEffect(() => {
    animate(progress, percentage, {
      duration: 1.8,
      ease: 'easeOut',
    })
  }, [percentage, progress])

  const width = useTransform(progress, (v) => `${v}%`)
  const text = useTransform(progress, (v) => `${Math.round(v)}%`)

  return (
    <>
      <Box
        position="absolute"
        top="-80px"
        right="-80px"
        w="220px"
        h="220px"
        borderRadius="full"
        bg="primary"
        opacity={0.12}
        filter="blur(80px)"
      />

      <Heading
        size={{ base: 'md', md: 'lg', lg: '2xl' }}
        mb={{ base: 1, md: '3', lg: 5 }}
        color="primary.light"
      >
        Capacidade Futura Reservada
      </Heading>

      <HStack gap={{ base: 4, lg: 6 }}>
        <Box
          flex={1}
          h={{ base: '20px', lg: '42px' }}
          bg="whiteAlpha.100"
          borderRadius="xl"
          overflow="hidden"
          position="relative"
          border="1px solid"
          borderColor="whiteAlpha.100"
        >
          <MotionBox
            h="100%"
            borderRadius="xl"
            bg="primary.light"
            style={{ width }}
            position="relative"
            animate={{
              boxShadow: [
                '0 0 12px rgba(52,209,112,.3)',
                '0 0 24px rgba(52,209,112,.9)',
                '0 0 12px rgba(52,209,112,.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          ></MotionBox>
        </Box>
        <MotionHeading
          size={{ base: 'md', md: 'lg', lg: '2xl' }}
          color="primary.light"
          style={{
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {text}
        </MotionHeading>
      </HStack>
    </>
  )
}

export default ReservedCapacityCard
