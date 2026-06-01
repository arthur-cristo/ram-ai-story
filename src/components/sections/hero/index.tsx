import {
  Box,
  Flex,
  Heading,
  Separator,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HeroScene } from "./three/HeroScene";

export function HeroSection() {
  return (
    <Flex
      h={{ base: "150dvh", lg: "100dvh" }}
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="center"
      px="12"
      gap={{ base: "0", lg: "8" }}
      position="relative"
    >
      <VStack
        h={{ base: "100dvh", lg: "100%" }}
        align="stretch"
        justify="center"
        gap="4"
        zIndex={2}
      >
        <Heading
          fontSize={{
            base: "6xl",
            lg: "8xl",
          }}
          lineHeight="0.9"
          fontWeight="900"
          letterSpacing="-0.04em"
        >
          A Crise de <Span color="primary.light">RAM</Span>
          <br />
          na Era da IA
        </Heading>
        <Text
          fontSize={{
            base: "md",
            md: "xl",
          }}
          lineHeight="1.8"
          fontWeight="400"
          letterSpacing="-0.01em"
        >
          Uma análise do <Span color="primary.light">aumento no preço</Span> das
          memorias RAM entre 2025 e 2026
        </Text>
        <Separator borderColor="primary.light" w="50%" borderWidth="1px" />
      </VStack>

      <Flex
        h={{ base: "100%", lg: "100%" }}
        w="100%"
        flex="1"
        position={{ base: "absolute", lg: "relative" }}
        zIndex={1}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          mt={{ base: 32, lg: 0 }}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          aspectRatio={1}
          h="100%"
          opacity={0.5}
          bgImage={`
            url('/images/particles/1.png')
          `}
          bgBlendMode="multiply"
          bgSize="contain"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          zIndex={0}
        />

        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          aspectRatio={1}
          h="100%"
        >
          <HeroScene />
        </Box>

        <Text
          position="absolute"
          bottom="4"
          right={{ base: "50%", lg: "0" }}
          transform={{ base: "translateX(50%)", lg: "none" }}
          fontSize={{ base: "xs", md: "sm" }}
          zIndex={2}
          letterSpacing="0.08em"
          fontStyle="italic"
        >
          Developed by <Span fontWeight="bold">Arthur Cristo</Span>
        </Text>
      </Flex>
    </Flex>
  );
}
