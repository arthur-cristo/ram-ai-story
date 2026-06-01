import { Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import Graph from "./graph";

export function MemoryPriceChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  return (
    <Flex
      ref={chartRef}
      w="100%"
      h="100dvh"
      px="10"
      py='5'
      gap={8}
      direction="column"
      align="center"
      justify="center"
    >
      <VStack align="start" gap={0} w="100%">
        <Heading color="primary.light" fontSize="2xl">
          DDR4 16GB 3200MHz - BRASIL
        </Heading>
        <Text fontSize="lg">Preço médio ao longo do tempo</Text>
      </VStack>
      <Graph chartRef={chartRef} />
      <HStack justify="space-between" w="100%">
        <Text opacity={0.4} fontSize="sm">
          Periodo analisado: 20/11/2025 - 19/05/2026
        </Text>

        <Text opacity={0.4} fontSize="sm">
          Fonte:{" "}
          <Link
            color="white"
            href="https://meupc.net/build"
            target="_blank"
            textDecoration="underline"
          >
            MEUPC.NET
          </Link>
        </Text>
      </HStack>
    </Flex>
  );
}
