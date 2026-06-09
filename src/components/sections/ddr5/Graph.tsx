import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area } from 'recharts'
import { MONTHS } from '@/constants'
import toBrl from '@/utils/toBrl'
import CustomHover from './CustomHover'
import { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import { isMobile } from 'react-device-detect'
import useRamHistory from '@/hooks/useRamHistory'

type Props = {
  isInView: boolean
  normalize?: boolean
}

const Graph = ({ isInView, normalize = false }: Props) => {
  const { normalizedData, mergedData, emptyData } = useRamHistory()
  const chartData = useMemo(() => {
    return isInView ? (normalize ? normalizedData : mergedData) : emptyData
  }, [isInView, normalize, normalizedData, mergedData, emptyData])

  return (
    <Box position="relative" w="100%" h={{ base: '100%', lg: '80%' }} zIndex={2}>
      <ResponsiveContainer width="100%" height="100%">
        {/* @ts-ignore */}
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: normalize ? -50 : 10 }}>
          <CartesianGrid vertical={false} horizontal={true} stroke="#1a1a1a" strokeDasharray="0" />
          <XAxis
            dataKey="date"
            interval={0}
            padding={{ left: 30 }}
            tickFormatter={(value, index) => {
              const current = new Date(value)

              const month = current.getMonth()
              const year = String(current.getFullYear()).slice(-2)

              if (index === 0) {
                return isMobile ? '' : `${MONTHS[month]}/${year}`
              }

              const previous = new Date(chartData[index - 1].date)

              if (
                previous.getMonth() !== month ||
                previous.getFullYear() !== current.getFullYear()
              ) {
                return `${MONTHS[month]}/${year}`
              }

              return ''
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            width={100}
            padding={{ bottom: 20 }}
            tickFormatter={(value) => (normalize ? `${value.toFixed(0)}` : `${toBrl(value)}`)}
            domain={normalize ? ['auto', 'auto'] : [450, 2500]}
            axisLine={false}
            tickLine={false}
          />

          <CustomHover normalize={normalize} />

          <linearGradient id="priceGradientDDR4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D170" stopOpacity={0.35} />
            <stop offset="40%" stopColor="#0FA135" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#0FA135" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="priceGradientDDR5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#66D6FF" stopOpacity={0.35} />
            <stop offset="40%" stopColor="#00B8FF" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#00B8FF" stopOpacity={0} />
          </linearGradient>
          <Area
            key={isInView ? 'animatedDDR5' : 'idleDDR5'}
            type="monotone"
            dataKey={normalize ? 'ddr5Normalized' : 'avgPriceDDR5'}
            stroke="#00B8FF"
            fill="url(#priceGradientDDR5)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={isInView}
            animationDuration={2500}
            animationEasing="ease-out"
            zIndex={1}
          />
          <Area
            key={isInView ? 'animatedDDR4' : 'idleDDR4'}
            type="monotone"
            dataKey={normalize ? 'ddr4Normalized' : 'avgPriceDDR4'}
            stroke="#0FA135"
            fill="url(#priceGradientDDR4)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={isInView}
            animationDuration={2500}
            animationEasing="ease-out"
            zIndex={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default Graph
