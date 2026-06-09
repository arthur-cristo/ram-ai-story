import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'

import csvUrl from '../assets/db/memorias_ddr4_historico.csv?url'
import ddr5CsvUrl from '../assets/db/memorias_ddr5_historico.csv?url'

type ChartPoint = {
  date: string
  avgPrice: number
}

type CombinedChartPoint = {
  date: string
  avgPriceDDR4: number | null
  avgPriceDDR5: number | null
}

export function useRamHistory() {
  const [data, setData] = useState<ChartPoint[]>([])
  const [ddr5Data, setDdr5Data] = useState<ChartPoint[]>([])
  const [emptyData, setEmptyData] = useState<ChartPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result: { data: Record<string, string>[] }) => {
        const rows = result.data as Record<string, string>[]

        if (!rows.length) {
          setData([])
          setEmptyData([])
          setLoading(false)
          return
        }

        const dateColumns = Object.keys(rows[0]).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key))

        const chartData = dateColumns.map((date) => {
          const prices = rows
            .map((row) => Number(row[date]))
            .filter((value) => !Number.isNaN(value) && value > 0)

          const avgPrice = prices.reduce((sum, value) => sum + value, 0) / prices.length

          return {
            date,
            avgPrice: Number(avgPrice.toFixed(2)),
          }
        })

        const chartEmptyData = dateColumns.map((date) => {
          return {
            date,
            avgPrice: 0,
          }
        })

        setData(chartData)
        setEmptyData(chartEmptyData)
        setLoading(false)
      },
    })
  }, [])

  useEffect(() => {
    Papa.parse(ddr5CsvUrl, {
      download: true,
      header: true,
      complete: (result: { data: Record<string, string>[] }) => {
        const rows = result.data as Record<string, string>[]

        if (!rows.length) {
          setDdr5Data([])
          return
        }

        const dateColumns = Object.keys(rows[0]).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key))

        const chartData = dateColumns.map((date) => {
          const prices = rows
            .map((row) => Number(row[date]))
            .filter((value) => !Number.isNaN(value) && value > 0)

          const avgPrice = prices.reduce((sum, value) => sum + value, 0) / prices.length

          return {
            date,
            avgPrice: Number(avgPrice.toFixed(2)),
          }
        })

        setDdr5Data(chartData)
      },
    })
  }, [])

  const mergedData: CombinedChartPoint[] = useMemo(() => {
    const ddr5Map = new Map(ddr5Data.map((item) => [item.date, item.avgPrice]))

    return data.map((item) => ({
      date: item.date,
      avgPriceDDR4: item.avgPrice,
      avgPriceDDR5: ddr5Map.get(item.date) ?? null,
    }))
  }, [data, ddr5Data])

  const normalizedData = useMemo(() => {
    if (!mergedData.length) return []

    const ddr4Values = mergedData.map((d) => d.avgPriceDDR4).filter((v): v is number => v != null)

    const ddr5Values = mergedData.map((d) => d.avgPriceDDR5).filter((v): v is number => v != null)

    const minDDR4 = Math.min(...ddr4Values)
    const maxDDR4 = Math.max(...ddr4Values)

    const minDDR5 = Math.min(...ddr5Values)
    const maxDDR5 = Math.max(...ddr5Values)

    return mergedData.map((item) => ({
      date: item.date,

      ddr4Normalized:
        item.avgPriceDDR4 != null
          ? ((item.avgPriceDDR4 - minDDR4) / (maxDDR4 - minDDR4)) * 100
          : null,

      ddr5Normalized:
        item.avgPriceDDR5 != null
          ? ((item.avgPriceDDR5 - minDDR5) / (maxDDR5 - minDDR5)) * 100
          : null,
    }))
  }, [mergedData])

  return {
    data,
    emptyData,
    loading,
    mergedData,
    normalizedData,
  }
}

export default useRamHistory
