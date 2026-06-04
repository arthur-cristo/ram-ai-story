import { Flex, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import Graph from './graph'
import GrowthIndicatorMobile from './graph/GrowthIndicatorMobile'
import { useInView } from 'framer-motion'

export function MemoryPriceChart() {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.5 })

  return (
    <Flex
      ref={chartRef}
      w="100%"
      h="100dvh"
      px="10"
      py="5"
      gap={8}
      direction="column"
      align="center"
      justify="center"
    >
      <HStack justify="space-between" w="100%">
        <VStack align="start" gap={0} w="100%">
          <Heading color="primary.light" fontSize="2xl">
            DDR4 16GB 3200MHz - BRASIL
          </Heading>
          <Text fontSize="lg">Preço médio ao longo do tempo</Text>
        </VStack>
        <GrowthIndicatorMobile isInView={isInView} />
      </HStack>
      <Graph isInView={isInView} />
      <HStack justify="space-between" w="100%" zIndex={1}>
        <Text color="whiteAlpha.700" fontSize="sm">
          Periodo analisado: 20/11/2025 - 19/05/2026
        </Text>

        <Text color="whiteAlpha.700" fontSize="sm">
          Fonte:{' '}
          <Link
            color="whiteAlpha.700"
            href="https://meupc.net/build"
            target="_blank"
            textDecoration="underline"
          >
            MEUPC.NET
          </Link>
        </Text>
      </HStack>
    </Flex>
  )
}
