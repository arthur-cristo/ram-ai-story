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
    <Box
      w="650px"
      p={8}
      borderRadius="32px"
      bg="rgba(255,255,255,0.05)"
      border="1px solid rgba(255,255,255,0.12)"
      backdropFilter="blur(24px)"
      boxShadow="0 8px 32px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)"
      position="relative"
      overflow="hidden"
    >
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

      <Heading size="2xl" mb={5} color="primary.light">
        Capacidade Futura Reservada
      </Heading>

      <HStack gap={6}>
        <Box
          flex={1}
          h="42px"
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
          size="2xl"
          color="primary.light"
          style={{
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {text}
        </MotionHeading>
      </HStack>
    </Box>
  )
}

export default ReservedCapacityCard
