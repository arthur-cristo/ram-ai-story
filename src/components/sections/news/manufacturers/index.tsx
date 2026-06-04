import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import LogoSection from "./LogoSection";

const Manufacturers = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Flex ref={containerRef} h="100dvh" w="100%" flexDir="column">
      <HStack h="fit-content" w="100%" justify="space-between" pr="12">
        <VStack
          gap="0"
          justifyContent="start"
          alignItems="start"
          h="fit-content"
          p="8"
        >
          <Heading
            fontSize={{ base: "10rem", lg: "15rem" }}
            fontWeight={900}
            color="primary.light"
            letterSpacing="-0.06em"
            lineHeight="1"
            pr="0.06em"
            ml="-0.04em"
          >
            73%
          </Heading>
          <Text
            fontSize={{ base: "lg", lg: "2rem" }}
            fontWeight="600"
            mt={{ base: "0", lg: "-4" }}
            lineHeight="1"
          >
            DA PRODUÇÃO MUNDIAL
            <br />
            DE DRAM ESTÁ NAS MÃOS DE
          </Text>
        </VStack>
        <VStack w="250px" textAlign="right">
          <Text
            fontSize={{ base: "lg", lg: "xl" }}
            fontWeight="600"
            mt={{ base: "0", lg: "-4" }}
            lineHeight="1.5"
          >
            Uma "escassez significativa" em produtos de memória deverá persistir
            pelo menos até 2027
          </Text>
          <Text color="whiteAlpha.700" fontSize={{ base: "md", lg: "lg" }}>
            - Kim Jaejune
            <br />
            Chefe da Divisão de Memória
          </Text>
        </VStack>
      </HStack>
      <LogoSection containerRef={containerRef} />
    </Flex>
  );
};

export default Manufacturers;
