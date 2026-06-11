import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Graph from './Graph'
import NormalizeButton from '@/components/graphs/NormalizeButton'
import FontLink from '@/components/graphs/FontLink'

const BrXUSA = () => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.5 })
  const [normalize, setNormalize] = useState(true)

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
        <VStack align="start" gap={0} w="50%">
          <Heading color="primary.light" fontSize="2xl">
            Brasil vs USA
          </Heading>
          <Text fontSize="lg">
            Comparativo de preços: Fury Beast (BR) vs Corsair Vengeance (USA)
          </Text>
        </VStack>
        <NormalizeButton normalize={normalize} setNormalize={setNormalize} />
      </HStack>
      <Graph isInView={isInView} normalize={normalize} />
      <HStack justify="space-between" w="100%" zIndex={1}>
        <Text color="whiteAlpha.700" fontSize="sm">
          Periodo analisado: 21/09/2022 - 28/05/2026
        </Text>

        <Text color="whiteAlpha.700" fontSize="sm">
          Fonte: <FontLink name="Keepa" url="https://keepa.com/" />
          {' • '}
          <FontLink name="Amazon Brasil" url="https://www.amazon.com.br/" />
          {' • '}
          <FontLink name="Amazon US" url="https://www.amazon.com/" />
        </Text>
      </HStack>
    </Flex>
  )
}

export default BrXUSA
