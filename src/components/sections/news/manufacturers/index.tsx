import { Box, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import LogoSection from './LogoSection'
import FontLink from '@/components/graphs/FontLink'
import particle3 from '@/assets/images/particles/3.png'

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
      p={{ base: 4, lg: 8 }}
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

      <Text color="whiteAlpha.700" fontSize="sm" w="100%" textAlign="right" zIndex={1} pr={12}>
        Fonte:{' '}
        <FontLink
          name="Yahoo Finance"
          url="https://finance.yahoo.com/markets/stocks/articles/dram-etf-holds-73-just-184509547.html"
        />
        {' • '}
        <FontLink
          name="Micron"
          url="https://investors.micron.com/news-releases/news-release-details/micron-announces-exit-crucial-consumer-business"
        />
        {' • '}
        <FontLink
          name="Tom's Hardware"
          url="https://www.tomshardware.com/tech-industry/artificial-intelligence/samsung-and-sk-hynix-warn-ai-driven-memory-shortages-could-last-until-2027-and-beyond-as-hbm-demand-explodes-customers-already-reserving-supply-years-ahead-while-the-wider-dram-market-begins-to-tighten"
        />
      </Text>
      <Box position="absolute" bottom="0" right="0" overflow="hidden" opacity={0.3}>
        <Image src={particle3} />
      </Box>
    </Flex>
  )
}

export default Manufacturers
