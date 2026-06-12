import TiltCard from '@/components/motion/TiltCard'
import { Box, Separator, Heading, Text } from '@chakra-ui/react'

const NewsCard = () => (
  <TiltCard>
    <Box
      maxW="650px"
      m={8}
      mb={0}
      p={8}
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
    >
      <Text
        color="whiteAlpha.700"
        fontSize="xs"
        fontWeight="700"
        letterSpacing="0.15em"
        textTransform="uppercase"
        mb={4}
      >
        OpenAI • Dezembro de 2025
      </Text>

      <Separator my={6} borderColor="whiteAlpha.200" />

      <Heading size="2xl" lineHeight="1.1" mb={3}>
        IA está consumindo a memória do mercado
      </Heading>

      <Text color="whiteAlpha.800" fontSize="md" lineHeight="1.8" textAlign="justify" mb={2}>
        A OpenAI garantiu uma parcela expressiva da produção mundial de DRAM para o projeto
        Stargate. Como consequência, fabricantes passaram a priorizar contratos de IA e data
        centers, reduzindo a oferta para o mercado consumidor.
      </Text>

      <Text color="whiteAlpha.800" fontSize="md">
        Resultado: menor disponibilidade de DDR5 e aumento dos preços.
      </Text>
    </Box>
  </TiltCard>
)

export default NewsCard
