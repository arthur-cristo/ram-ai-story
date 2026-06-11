import { Box, Text } from '@chakra-ui/react'
import { Tooltip } from 'recharts'
import toBrl from '@/utils/toBrl'

type Props = {
  normalize?: boolean
}

const CustomHover = ({ normalize = false }: Props) => (
  <Tooltip
    wrapperStyle={{ zIndex: 9999, pointerEvents: 'none' }}
    cursor={{
      stroke: '#34D170',
      opacity: 0.4,
      strokeWidth: 1,
    }}
    content={({ active, payload }) => {
      if (!active || !payload?.length) return null

      const { date, priceUSA, priceBR, usaNormalized, brNormalized } = payload[0].payload

      const [year, month, day] = date.split('-').map(Number)
      const localDate = new Date(year, month - 1, day)

      const items = [
        {
          label: 'Brasil (Fury Beast)',
          color: 'primary.light',
          value: normalize ? brNormalized : priceBR,
          display: normalize
            ? `${brNormalized?.toFixed(0) ?? 'N/A'}`
            : priceBR
              ? toBrl(priceBR)
              : 'N/A',
        },
        {
          label: 'USA (Corsair LPX)',
          color: 'secondary.light',
          value: normalize ? usaNormalized : priceUSA,
          display: normalize
            ? `${usaNormalized?.toFixed(0) ?? 'N/A'}`
            : priceUSA
              ? `$${priceUSA.toFixed(2)}`
              : 'N/A',
        },
      ].sort((a, b) => (b.value ?? 0) - (a.value ?? 0))

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
        >
          <Text
            fontSize="xs"
            color="whiteAlpha.700"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            {localDate.toLocaleDateString('pt-BR')}
          </Text>

          {items.map((item) => (
            <Text key={item.label} color={item.color} fontSize="xl" fontWeight="800">
              {item.label}: {item.display}
            </Text>
          ))}
        </Box>
      )
    }}
  />
)

export default CustomHover
