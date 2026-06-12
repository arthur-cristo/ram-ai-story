import FontLink from '@/components/graphs/FontLink'
import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import ReservedCapacityCard from './ReservedCapacityCard'
import NewsCard from './NewsCard'

const OpenAI = () => {
  return (
    <Flex
      h="100dvh"
      w="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      py={8}
      pr={16}
      gap={4}
    >
      <HStack h="100%" overflow="hidden" w="100%" gap={8} justifyContent="center">
        <VStack gap={8}>
          <NewsCard />
          <ReservedCapacityCard />
        </VStack>
        <VStack w="50%" h="100%" alignItems="center" justifyContent="space-between">
          <Box
            w="100%"
            h="100%"
            aspectRatio={1}
            position="relative"
            borderRadius="xl"
            overflow="hidden"
          >
            <Image
              src="/images/datacenter.jpg"
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
              bg='radial-gradient(circle,rgba(255, 255, 255, 0) 0%, rgba(1, 1, 2, 1) 95%);'
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
