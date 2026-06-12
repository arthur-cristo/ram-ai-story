import FontLink from '@/components/graphs/FontLink'
import TiltCard from '@/components/motion/TiltCard'
import { FINANCES_CARDS } from '@/constants'
import { Flex, HStack, Text, Box, Heading, VStack } from '@chakra-ui/react'

const Finances = () => {
  return (
    <Flex
      h="100dvh"
      w="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      py={8}
      p={{ base: 8, lg: 16 }}
      gap={4}
    >
      <HStack
        h="100%"
        w="100%"
        justify={{ base: 'space-between', '2xl': 'center' }}
        gap={{ base: 0, '2xl': 16 }}
        align="center"
      >
        {FINANCES_CARDS.map((card, index) => (
          <TiltCard key={index} color={card.color}>
            <Box
              w={{ base: '190px', md: '250px', lg: '350px' }}
              h={{ base: '190px', md: '250px', lg: '350px' }}
              p={{ base: 4, lg: 8 }}
              borderRadius="32px"
              bg="rgba(255,255,255,0.05)"
              border="1px solid rgba(255,255,255,0.12)"
              backdropFilter="blur(24px)"
              boxShadow="
0 8px 32px rgba(0,0,0,.35),
inset 0 1px 0 rgba(255,255,255,.08)
"
              position="relative"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              justifyContent={{ base: 'center', md: 'start' }}
              alignItems="center"
              gap={2}
            >
              <VStack gap={0} justifyContent="start" alignItems="center" h="fit-content">
                <HStack justify="center" align="center">
                  <Heading size={{ base: 'lg', md: 'xl', lg: '2xl' }} textTransform="uppercase">
                    {card.title}
                  </Heading>
                  <Text color="whiteAlpha.700" fontSize={{ base: 'sm', lg: 'md' }}>
                    {card.subtitle}
                  </Text>
                </HStack>
                <Text
                  color="whiteAlpha.700"
                  fontSize={{ base: 'sm', lg: 'md' }}
                  display={{ base: 'none', md: 'block' }}
                  textAlign="center"
                >
                  {card.description}
                </Text>
              </VStack>
              <VStack
                h={{ base: 'fit-content', md: '100%' }}
                w="100%"
                position={{ base: 'relative', md: 'absolute' }}
                top={{ base: 0, md: '50%' }}
                left={{ base: 0, md: '50%' }}
                transform={{ base: '', md: 'translate(-50%, -50%)' }}
                justifyContent={{ base: 'start', md: 'center' }}
                alignItems="center"
                gap={0}
              >
                <Heading
                  fontSize={{ base: '3rem', md: '3rem', lg: '4rem' }}
                  lineHeight="1.1"
                  color={card.color}
                >
                  {card.value}
                </Heading>
                <Text
                  color="whiteAlpha.800"
                  fontSize="md"
                  textAlign="justify"
                  textTransform="uppercase"
                >
                  {card.valueSubtitle}
                </Text>
              </VStack>
            </Box>
          </TiltCard>
        ))}
      </HStack>
      <HStack w="100%" justify="space-between">
        <Text color="whiteAlpha.700" fontSize="sm">
          Periodo analisado: 21/11/2025 - 20/05/2026
        </Text>
        <Text color="whiteAlpha.700" fontSize="sm">
          Fonte:{' '}
          <FontLink
            name="Banco Central"
            url={[
              'https://www3.bcb.gov.br/CALCIDADAO/publico/corrigirPorIndice.do?method=corrigirPorIndice',
              'https://www.bcb.gov.br/conversao',
            ]}
          />
          {' • '}
          <FontLink
            name="Investing.com"
            url="https://br.investing.com/commodities/gold-streaming-chart"
          />
        </Text>
      </HStack>
    </Flex>
  )
}

export default Finances
