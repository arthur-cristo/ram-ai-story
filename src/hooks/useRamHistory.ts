import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'

import csvUrl from '../assets/db/memorias_ddr4_historico.csv?url'
import ddr5CsvUrl from '../assets/db/memorias_ddr5_historico.csv?url'
import usaProductUrl from '../assets/db/CORSAIR Vengeance LPX DDR4 RAM 16GB.csv?url'
import brProductUrl from '../assets/db/Memória de 16GB DIMM DDR4 3200Mhz FURY Beast_2.csv?url'

type ChartPoint = {
  date: string
  avgPrice: number
}

type CombinedChartPoint = {
  date: string
  avgPriceDDR4: number | null
  avgPriceDDR5: number | null
}

type BrXUsaPoint = {
  date: string
  priceUSA: number | null
  priceBR: number | null
  usaNormalized: number | null
  brNormalized: number | null
}

export function useRamHistory() {
  const [data, setData] = useState<ChartPoint[]>([])
  const [ddr5Data, setDdr5Data] = useState<ChartPoint[]>([])
  const [emptyData, setEmptyData] = useState<ChartPoint[]>([])
  const [usaProductData, setUsaProductData] = useState<ChartPoint[]>([])
  const [brProductData, setBrProductData] = useState<ChartPoint[]>([])

  const [loading, setLoading] = useState(true)
  const [ddr4Count, setDdr4Count] = useState(0)
  const [ddr5Count, setDdr5Count] = useState(0)

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

        setDdr4Count(rows.length)

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

        setDdr5Count(rows.length)

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

  useEffect(() => {
    const parsePrice = (val: string) => {
      if (!val) return 0
      return parseFloat(val.replace(/"/g, '').replace(',', '.'))
    }

    const parseFile = (url: string, setter: (d: ChartPoint[]) => void) => {
      Papa.parse(url, {
        download: true,
        header: true,
        complete: (result) => {
          const rows = result.data as Record<string, string>[]
          const parsed = rows
            .map((row) => ({
              date: row.Data,
              avgPrice: parsePrice(row.Valor),
            }))
            .filter((item) => item.date && !isNaN(item.avgPrice))
          setter(parsed)
        },
      })
    }

    parseFile(usaProductUrl, setUsaProductData)
    parseFile(brProductUrl, setBrProductData)
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

  const brXusaData: BrXUsaPoint[] = useMemo(() => {
    const dates = Array.from(
      new Set([...usaProductData.map((d) => d.date), ...brProductData.map((d) => d.date)])
    ).sort()

    const usaMap = new Map(usaProductData.map((d) => [d.date, d.avgPrice]))
    const brMap = new Map(brProductData.map((d) => [d.date, d.avgPrice]))

    const combined = dates.map((date) => {
      const rawUSA = usaMap.get(date)
      const rawBR = brMap.get(date)
      return {
        date,
        priceUSA: rawUSA && rawUSA > 0 ? rawUSA : null,
        priceBR: rawBR && rawBR > 0 ? rawBR : null,
      }
    })

    const firstValidIndex = combined.findIndex((d) => d.priceUSA !== null && d.priceBR !== null)
    
    const syncedCombined = firstValidIndex !== -1 ? combined.slice(firstValidIndex) : combined

    const usaValues = syncedCombined.map((d) => d.priceUSA).filter((v): v is number => v != null)
    const brValues = syncedCombined.map((d) => d.priceBR).filter((v): v is number => v != null)

    const minUSA = usaValues.length ? Math.min(...usaValues) : 0
    const maxUSA = usaValues.length ? Math.max(...usaValues) : 0
    const minBR = brValues.length ? Math.min(...brValues) : 0
    const maxBR = brValues.length ? Math.max(...brValues) : 0

    return syncedCombined.map((item) => ({
      ...item,
      usaNormalized:
        item.priceUSA != null && maxUSA !== minUSA
          ? ((item.priceUSA - minUSA) / (maxUSA - minUSA)) * 100
          : null,
      brNormalized:
        item.priceBR != null && maxBR !== minBR
          ? ((item.priceBR - minBR) / (maxBR - minBR)) * 100
          : null,
    }))
  }, [usaProductData, brProductData])

  return {
    data,
    emptyData,
    loading,
    mergedData,
    normalizedData,
    brXusaData,
    ddr4Count,
    ddr5Count,
  }
}

export default useRamHistory
