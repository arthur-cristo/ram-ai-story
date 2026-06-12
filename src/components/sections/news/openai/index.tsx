import FontLink from '@/components/graphs/FontLink'
import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import ReservedCapacityCard from './ReservedCapacityCard'
import NewsCard from './NewsCard'
import datacenterImage from '@/assets/images/datacenter.jpg'

const OpenAI = () => {
  return (
    <Flex
      h="100dvh"
      w="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      py={{ base: 4, lg: 8 }}
      pr={{ base: 12, lg: 16 }}
      gap={4}
    >
      <HStack h="100%" w="100%" overflow="hidden" gap={8} justifyContent="center">
        <VStack gap={8} p={{ base: 4, lg: 8 }}>
          <NewsCard />
          <Box
            w="100%"
            maxW="650px"
            p={{ base: 6, lg: 8 }}
            borderRadius="32px"
            bg="rgba(255,255,255,0.05)"
            border="1px solid rgba(255,255,255,0.12)"
            backdropFilter="blur(24px)"
            boxShadow="0 8px 32px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)"
            position="relative"
            overflow="hidden"
            display={{ base: 'none', lg: 'block' }}
          >
            <ReservedCapacityCard />
          </Box>
        </VStack>
        <VStack
          w={{ base: '35%', lg: '50%' }}
          h="100%"
          alignItems="center"
          justifyContent="space-between"
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
              src={datacenterImage}
              alt="OpenAI"
              w="100%"
              h="100%"
              objectFit="cover"
              filter="grayscale(50%) brightness(0.35)"
              opacity={1}
            />

            <Box
              position="absolute"
              inset={0}
              bg="radial-gradient(circle,rgba(255, 255, 255, 0) 0%, rgba(1, 1, 2, 1) 95%);"
            />
          </Box>
        </VStack>
      </HStack>
      <Text color="whiteAlpha.700" fontSize="sm" w="100%" textAlign="right">
        Fonte:{' '}
        <FontLink
          name="Global CIO"
          url="http://web.archive.org/web/20260327203734/https://globalcio.com/news/16062/"
        />
      </Text>
    </Flex>
  )
}

export default OpenAI
