import { Box, Text } from '@chakra-ui/react'
import { Tooltip } from 'recharts'
import toBrl from '@/utils/toBrl'

const CustomHover = () => (
  <Tooltip
    wrapperStyle={{ zIndex: 9999, pointerEvents: 'none' }}
    cursor={{
      stroke: '#34D170',
      opacity: 0.4,
      strokeWidth: 1,
    }}
    content={({ active, payload }) => {
      if (!active || !payload?.length) return null

      const { date, avgPriceDDR4, avgPriceDDR5 } = payload[0].payload
      const [year, month, day] = date.split('-').map(Number)
      const localDate = new Date(year, month - 1, day)

      return (
        <Box
          bg="rgba(0,0,0,.45)"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="primary"
          borderRadius="16px"
          px="5"
          py="4"
          minW="260px"
          boxShadow="
            0 0 12px rgba(15,161,53,.12),
            inset 0 0 12px rgba(15,161,53,.12)
          "
          zIndex={999}
        >
          <Text
            fontSize="xs"
            color="whiteAlpha.700"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            {localDate.toLocaleDateString('pt-BR')}
          </Text>

          {avgPriceDDR4 !== undefined && (
            <Text color="primary.light" fontSize="xl" fontWeight="800">
              DDR4: {toBrl(avgPriceDDR4)}
            </Text>
          )}
          {avgPriceDDR5 !== undefined && (
            <Text color="white" fontSize="xl" fontWeight="800" mb={event ? 1 : 0}>
              DDR5: {toBrl(avgPriceDDR5)}
            </Text>
          )}
        </Box>
      )
    }}
  />
)

export default CustomHover
