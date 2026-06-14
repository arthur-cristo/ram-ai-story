import TiltCard from '@/components/motion/TiltCard'
import { Box, Separator, Heading, Text } from '@chakra-ui/react'
import ReservedCapacityCard from './ReservedCapacityCard'

type Props = {
  isInView: boolean
}

const NewsCard = ({ isInView }: Props) => (
  <TiltCard>
    <Box
      maxW="650px"
      w="100%"
      m={{ base: 0, lg: 0 }}
      mb={0}
      p={{ base: 6, lg: 8 }}
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
        fontSize={{ base: '2xs', lg: 'xs' }}
        fontWeight="700"
        letterSpacing="0.15em"
        textTransform="uppercase"
        mb={{ base: 2, lg: 4 }}
      >
        OpenAI • Dezembro de 2025
      </Text>

      <Separator my={{ base: 3, lg: 6 }} borderColor="whiteAlpha.200" />

      <Heading size={{ base: 'md', md: 'lg', lg: '2xl' }} lineHeight="1.1" mb={{ base: 1, lg: 3 }}>
        IA está consumindo a memória do mercado
      </Heading>

      <Text
        color="whiteAlpha.800"
        fontSize={{ base: '2xs', md: 'xs', lg: 'md' }}
        lineHeight="1.8"
        textAlign="justify"
        mb={{ base: 1, lg: 2 }}
      >
        A OpenAI garantiu uma parcela expressiva da produção mundial de DRAM para o projeto
        Stargate. Como consequência, fabricantes passaram a priorizar contratos de IA e data
        centers, reduzindo a oferta para o mercado consumidor.
      </Text>

      <Text color="whiteAlpha.800" fontSize={{ base: '2xs', md: 'xs', lg: 'md' }}>
        Resultado: menor disponibilidade de DDR5 e aumento dos preços.
      </Text>

      <Box mt={4} display={{ base: 'block', lg: 'none' }}>
        <ReservedCapacityCard isInView={isInView} />
      </Box>
    </Box>
  </TiltCard>
)

export default NewsCard
