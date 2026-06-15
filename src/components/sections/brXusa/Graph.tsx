import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area } from 'recharts'
import { MONTHS } from '@/constants'
import toBrl from '@/utils/toBrl'
import CustomHover from './CustomHover'
import { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import { isMobile } from 'react-device-detect'
import { useRamHistoryContext } from '@/contexts/RamHistoryContext'

type Props = {
  isInView: boolean
  normalize?: boolean
}

const Graph = ({ isInView, normalize = false }: Props) => {
  const { brXusaData, emptyData } = useRamHistoryContext()
  const chartData = useMemo(() => {
    return isInView ? brXusaData : emptyData
  }, [isInView, brXusaData, emptyData])

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

              if (index === 0) return isMobile ? '' : `${MONTHS[month]}/${year}`

              const prevDateStr = chartData[index - 1]?.date
              if (!prevDateStr) return ''
              const previous = new Date(prevDateStr)

              const isNewMonth =
                previous.getMonth() !== month || previous.getFullYear() !== current.getFullYear()

              if (isNewMonth && month % (isMobile ? 6 : 4) === 0) {
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
            domain={normalize ? [0, 100] : ['auto', 'auto']}
            axisLine={false}
            tickLine={false}
          />

          <CustomHover normalize={normalize} />

          <linearGradient id="priceGradientUSA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#66D6FF" stopOpacity={0.35} />
            <stop offset="40%" stopColor="#00B8FF" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#00B8FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="priceGradientBR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D170" stopOpacity={0.35} />
            <stop offset="40%" stopColor="#0FA135" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#0FA135" stopOpacity={0} />
          </linearGradient>
          <Area
            key={isInView ? 'animatedUSA' : 'idleUSA'}
            type="monotone"
            dataKey={normalize ? 'usaNormalized' : 'priceUSA'}
            stroke="#00B8FF"
            fill="url(#priceGradientUSA)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={isInView}
            animationDuration={2500}
            animationEasing="ease-out"
            zIndex={1}
            connectNulls
          />
          <Area
            key={isInView ? 'animatedBR' : 'idleBR'}
            type="monotone"
            dataKey={normalize ? 'brNormalized' : 'priceBR'}
            stroke="#0FA135"
            fill="url(#priceGradientBR)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={isInView}
            animationDuration={2500}
            animationEasing="ease-out"
            zIndex={2}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default Graph
