import { METODOLOGY } from '@/constants'
import { Box, Flex, Heading, Text, VStack, Image } from '@chakra-ui/react'
import codingImage from '@/assets/images/coding.jpg'
import TiltCard from '@/components/motion/TiltCard'

const Metodology = () => {
  return (
    <Flex h="100%" p={8} pr={16} justify={{ base: "center", '2xl': "space-between" }} gap={8} align="center" overflow="hidden">
      <Flex w={{ base: "100%", "2xl": "fit-content" }} flexDir="column" gap={{ base: 4, '2xl': 8 }} px={4}>
        <Heading
          fontSize={{ base: '3rem', md: '4rem', lg: '4rem' }}
          textAlign={{ base: 'center', '2xl': 'left' }}
          textTransform="uppercase"
          color="primary.light"
          lineHeight="1"
          letterSpacing="0.1em"
        >
          Metodologia
        </Heading>
        {METODOLOGY.map((item, index) => (
          <TiltCard key={index} lightHeight="150px" lightWidth="200px" glowPosition="center-left">
            <Flex
              flexDir="column"
              gap={0}
              w="100%"
              p={{ base: 4, lg: 6, '2xl': 8 }}
              borderRadius="32px"
              bg="rgba(255,255,255,0.05)"
              border="1px solid rgba(255,255,255,0.12)"
              backdropFilter="blur(24px)"
              boxShadow="
            0 8px 32px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.08)
            "
            >
              <Heading>{item.title}</Heading>
              {item.description.map((paragraph, idx) => (
                <Text
                  key={idx}
                  color="whiteAlpha.800"
                  fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }}
                  mt={2}
                >
                  • {paragraph}
                </Text>
              ))}
            </Flex>
          </TiltCard>
        ))}
      </Flex>
      <VStack
        w={{ base: '35%', lg: '50%' }}
        h="100%"
        alignItems="center"
        justifyContent="space-between"
        display={{ base: 'none', '2xl': 'flex' }}
      >
        <Box
          w="100%"
          h="100%"
          aspectRatio={1}
          position="relative"
          borderRadius="xl"
          overflow="hidden"
        >
          <Image
            src={codingImage}
            alt="OpenAI"
            w="100%"
            h="100%"
            objectFit="cover"
            filter="grayscale(25%) brightness(0.5)"
            opacity={1}
          />

          <Box
            position="absolute"
            inset={0}
            bg="radial-gradient(circle,rgba(255, 255, 255, 0) 0%, rgba(1, 1, 2, 1) 70%);"
          />
        </Box>
      </VStack>
    </Flex>
  )
}

export default Metodology
