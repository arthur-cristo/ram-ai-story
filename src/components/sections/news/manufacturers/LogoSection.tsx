import MotionBox from '@/components/motion/MotionBox'
import { MANUFAFACTURERS_LOGOS } from '@/constants'
import { HStack, Image, VStack } from '@chakra-ui/react'
import { motion, useScroll, useTransform, useTime } from 'framer-motion'

const MotionImage = motion.create(Image)

const LogoSection = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const time = useTime()
  const baseFloat = useTransform(time, (t) => Math.sin((t / 5000) * Math.PI * 2) * -5 - 5)

  return (
    <HStack
      w="100%"
      h="100%"
      justify="center"
      alignItems="center"
      gap={{ base: 12, lg: 20 }}
      zIndex={1}
    >
      {MANUFAFACTURERS_LOGOS.map((logo) => {
        const isMicron = logo.alt.toLowerCase().includes('micron')
        const micronProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1])

        const y = isMicron
          ? useTransform(
              [baseFloat, micronProgress],
              ([f, p]) => (f as number) * (1 - (p as number)),
            )
          : baseFloat

        const getMicronColor = (p: number, originalColor: string) => {
          if (!isMicron) return originalColor

          const [r, g, b] = originalColor.split(',').map(Number)
          const targetR = 128,
            targetG = 128,
            targetB = 128

          const currentR = Math.round(r + (targetR - r) * p)
          const currentG = Math.round(g + (targetG - g) * p)
          const currentB = Math.round(b + (targetB - b) * p)

          return `${currentR}, ${currentG}, ${currentB}`
        }

        const filter = useTransform(micronProgress, (p) => {
          if (!isMicron) {
            return `
              drop-shadow(0 0 8px rgba(${logo.color},${logo.shadowIntensity?.[0] ?? 0.8}))
              drop-shadow(0 0 20px rgba(${logo.color},${logo.shadowIntensity?.[1] ?? 0.6}))
              drop-shadow(0 0 40px rgba(${logo.color},${logo.shadowIntensity?.[2] ?? 0.4}))
            `
          }

          const alpha = 1 - p
          const currentColor = getMicronColor(p, logo.color)

          return `
            brightness(${alpha + 0.3})
            drop-shadow(0 0 8px rgba(${currentColor},${(logo.shadowIntensity?.[0] ?? 0.8) * alpha}))
            drop-shadow(0 0 20px rgba(${currentColor},${(logo.shadowIntensity?.[1] ?? 0.6) * alpha}))
            drop-shadow(0 0 40px rgba(${currentColor},${(logo.shadowIntensity?.[2] ?? 0.4) * alpha}))
          `
        })

        const separatorBg = useTransform(micronProgress, (p) => {
          const currentColor = getMicronColor(p, logo.color)
          const opacity = isMicron ? Math.max(0, 1 - p) : 1

          return `linear-gradient(90deg, rgba(${currentColor},0) 0%, rgba(${currentColor},${opacity}) 50%, rgba(${currentColor},0) 100%)`
        })

        return (
          <VStack key={logo.alt} position="relative">
            <MotionBox style={{ y, willChange: 'transform' }}>
              <MotionImage
                src={logo.src}
                alt={logo.alt}
                w={{ base: '150px', md: '200px', lg: '350px', '2xl': '500px' }}
                objectFit="contain"
                zIndex={1}
                draggable={false}
                style={{ filter }}
              />
            </MotionBox>
            <MotionBox
              w="100%"
              h="2px"
              position="relative"
              style={{
                background: separatorBg,
              }}
              borderRadius="full"
              zIndex={1}
            />
          </VStack>
        )
      })}
    </HStack>
  )
}

export default LogoSection
