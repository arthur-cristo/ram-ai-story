import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import useRamHistory from '@/hooks/useRamHistory'
import { useMemo, useRef } from 'react'
import FontLink from '@/components/graphs/FontLink'
import { useInView } from 'framer-motion'

const ZEN3 = () => {
  const { ddr4Count, ddr5Count } = useRamHistory()
  const chartRef = useRef(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.5 })
  const pieData = useMemo(
    () => [
      { name: 'DDR4', value: ddr4Count, color: '#0FA135' },
      { name: 'DDR5', value: ddr5Count, color: '#00B8FF' },
    ],
    [ddr4Count, ddr5Count],
  )
  const animatedPieData = useMemo(() => {
    if (!isInView) {
      return pieData.map((item) => ({
        ...item,
        value: 0,
      }))
    }

    return pieData
  }, [isInView, pieData])

  return (
    <Flex
      h="100dvh"
      w="100%"
      position="relative"
      align="center"
      justify="center"
      overflow="hidden"
      p={8}
      pr={16}
      flexDir="column"
    >
      <Flex
        h="100%"
        w="100%"
        position="relative"
        align="center"
        justify="center"
        overflow="hidden"
        transform={{ base: 'scale(1)', xl: 'scale(1.5)' }}
      >
        <Box w="350px" h="400px" position="relative" ref={chartRef}>
          <ResponsiveContainer height="100%">
            <PieChart>
              <Pie
                data={animatedPieData}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140}
                paddingAngle={10}
                dataKey="value"
                stroke="none"
                isAnimationActive={isInView}
                animationDuration={1500}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <Box
                        bg="rgba(0,0,0,.45)"
                        backdropFilter="blur(12px)"
                        border="1px solid"
                        borderColor="primary"
                        borderRadius="12px"
                        px="5"
                        py="3"
                        zIndex={10}
                      >
                        <Text color={data.color} fontWeight="800" fontSize="xl">
                          {data.name}: {data.value}
                        </Text>
                        <Text color="whiteAlpha.700" fontSize="sm">
                          Modelos monitorados
                        </Text>
                      </Box>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <VStack
            position="absolute"
            top="47%"
            left="50%"
            transform="translate(-50%, -50%)"
            gap={0}
            pointerEvents="none"
          >
            <Text fontSize="5xl" fontWeight="900" color="white">
              {ddr4Count + ddr5Count}
            </Text>
            <Text
              fontSize="sm"
              color="whiteAlpha.600"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Total de modelos
            </Text>
          </VStack>
        </Box>

        <VStack w={{ base: '30%', '2xl': '20%' }} align="start" position="relative" gap={4}>
          <Text
            position="absolute"
            top={{ base: '-3rem', md: '-5rem', lg: '-7rem' }}
            left="-2rem"
            fontSize="20rem"
            lineHeight="1"
            fontWeight="900"
            color="primary"
            opacity={0.4}
            pointerEvents="none"
            userSelect="none"
          >
            ❝
          </Text>

          <Heading
            position="relative"
            zIndex={1}
            fontSize={{ base: 'lg', md: 'xl', lg: '4xl' }}
            textAlign="end"
          >
            Executivo da AMD confirma retorno de chips Zen 3 antigos em resposta ao aumento nos
            preços de RAM
          </Heading>

          <Text
            position="relative"
            zIndex={1}
            color="whiteAlpha.800"
            fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
            textAlign="end"
          >
            AMD e outras gigantes da tecnologia olham para o passado como alternativa para
            consumidores domésticos.
          </Text>
        </VStack>
      </Flex>
      <Text color="whiteAlpha.700" fontSize="sm" w="100%" textAlign="right">
        Fonte:{' '}
        <FontLink
          name="Adrenaline"
          url="https://www.adrenaline.com.br/amd/executivo-da-amd-confirma-retorno-de-chips-zen-3-antigos-em-resposta-ao-aumento-nos-precos-de-ram/"
        />
      </Text>
    </Flex>
  )
}

export default ZEN3
