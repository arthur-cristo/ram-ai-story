import { Box, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import LogoSection from './LogoSection'

const Manufacturers = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Flex
      ref={containerRef}
      h="100dvh"
      w="100%"
      flexDir="column"
      position="relative"
      align="center"
      justify="center"
      overflow="hidden"
      p={8}
      px={{ base: 0, lg: 16 }}
    >
      <VStack h="100%" w="fit-content" justify="center" alignItems="center" mt={{ base: 0, lg: 8 }}>
        <HStack h="fit-content" w="100%" justify="space-between" zIndex={1}>
          <VStack gap="0" justifyContent="start" alignItems="start" h="fit-content">
            <Heading
              fontSize={{ base: '7rem', lg: '15rem' }}
              fontWeight={900}
              color="primary"
              letterSpacing="-0.06em"
              lineHeight="1"
              pr="0.06em"
              ml="-0.04em"
            >
              73%
            </Heading>
            <Text
              fontSize={{ base: 'md', lg: '2rem' }}
              fontWeight="600"
              mt={{ base: '0', lg: '-4' }}
              lineHeight="1"
            >
              DA PRODUÇÃO MUNDIAL
              <br />
              DE DRAM ESTÁ NAS MÃOS DE
            </Text>
          </VStack>
          <VStack w="250px" textAlign="right" align="end" justify="end" h="100%">
            <Text
              fontSize={{ base: 'md', lg: 'xl' }}
              fontWeight="600"
              mt={{ base: '0', lg: '-4' }}
              lineHeight="1.5"
            >
              Uma "escassez significativa" em produtos de memória deverá persistir pelo menos até
              2027
            </Text>
            <Text color="whiteAlpha.700" fontSize={{ base: 'sm', lg: 'lg' }}>
              - Kim Jaejune
              <br />
              Chefe da Divisão de Memória
            </Text>
          </VStack>
        </HStack>
        <LogoSection containerRef={containerRef} />
      </VStack>
      <Box position="absolute" bottom="0" right="0" overflow="hidden" opacity={0.3}>
        <Image src="/images/particles/3.png" />
      </Box>
    </Flex>
  )
}

export default Manufacturers
