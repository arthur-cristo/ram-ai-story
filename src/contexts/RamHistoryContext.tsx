import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
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

interface RamHistoryContextType {
  data: ChartPoint[]
  ddr5Data: ChartPoint[]
  emptyData: ChartPoint[]
  usaProductData: ChartPoint[]
  brProductData: ChartPoint[]
  loading: boolean
  ddr4Count: number
  ddr5Count: number
  mergedData: CombinedChartPoint[]
  normalizedData: any[]
  brXusaData: BrXUsaPoint[]
}

const RamHistoryContext = createContext<RamHistoryContextType | undefined>(undefined)

export function RamHistoryProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ChartPoint[]>([])
  const [ddr5Data, setDdr5Data] = useState<ChartPoint[]>([])
  const [emptyData, setEmptyData] = useState<ChartPoint[]>([])
  const [usaProductData, setUsaProductData] = useState<ChartPoint[]>([])
  const [brProductData, setBrProductData] = useState<ChartPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [ddr4Count, setDdr4Count] = useState(0)
  const [ddr5Count, setDdr5Count] = useState(0)

  const processAverages = (rows: Record<string, string>[]) => {
    const dateColumns = Object.keys(rows[0]).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key))

    const sums: Record<string, number> = {}
    const counts: Record<string, number> = {}

    rows.forEach((row) => {
      dateColumns.forEach((date) => {
        const val = Number(row[date])
        if (!Number.isNaN(val) && val > 0) {
          sums[date] = (sums[date] || 0) + val
          counts[date] = (counts[date] || 0) + 1
        }
      })
    })

    return dateColumns.map((date) => ({
      date,
      avgPrice: counts[date] ? Number((sums[date] / counts[date]).toFixed(2)) : 0,
    }))
  }

  useEffect(() => {
    const loadData = async () => {
      Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: (result) => {
          const rows = result.data as Record<string, string>[]
          if (rows.length) {
            setDdr4Count(rows.length)
            const chartData = processAverages(rows)
            setData(chartData)
            setEmptyData(chartData.map((d) => ({ date: d.date, avgPrice: 0 })))
          }

          setTimeout(() => {
            Papa.parse(ddr5CsvUrl, {
              download: true,
              header: true,

              complete: (res) => {
                const d5Rows = res.data as Record<string, string>[]
                if (d5Rows.length) {
                  setDdr5Count(d5Rows.length)
                  setDdr5Data(processAverages(d5Rows))
                }
                setLoading(false)
              },
            })
          }, 100)
        },
      })

      const parsePrice = (val: string) =>
        parseFloat(val?.replace(/"/g, '').replace(',', '.') || '0')
      const parseFile = (url: string, setter: (d: ChartPoint[]) => void) => {
        Papa.parse(url, {
          download: true,
          header: true,

          complete: (result) => {
            const rows = result.data as Record<string, string>[]
            setter(
              rows
                .map((row) => ({ date: row.Data, avgPrice: parsePrice(row.Valor) }))
                .filter((item) => item.date && !isNaN(item.avgPrice)),
            )
          },
        })
      }

      parseFile(usaProductUrl, setUsaProductData)
      parseFile(brProductUrl, setBrProductData)
    }

    loadData()
  }, [])

  const mergedData = useMemo(() => {
    const ddr5Map = new Map(ddr5Data.map((item) => [item.date, item.avgPrice]))
    return data.map((item) => ({
      date: item.date,
      avgPriceDDR4: item.avgPrice,
      avgPriceDDR5: ddr5Map.get(item.date) ?? null,
    }))
  }, [data, ddr5Data])

  const normalizedData = useMemo(() => {
    if (!mergedData.length) return []
    const d4 = mergedData.map((d) => d.avgPriceDDR4).filter((v): v is number => v != null)
    const d5 = mergedData.map((d) => d.avgPriceDDR5).filter((v): v is number => v != null)
    const minD4 = Math.min(...d4),
      maxD4 = Math.max(...d4)
    const minD5 = Math.min(...d5),
      maxD5 = Math.max(...d5)

    return mergedData.map((item) => ({
      date: item.date,
      ddr4Normalized:
        item.avgPriceDDR4 != null ? ((item.avgPriceDDR4 - minD4) / (maxD4 - minD4)) * 100 : null,
      ddr5Normalized:
        item.avgPriceDDR5 != null ? ((item.avgPriceDDR5 - minD5) / (maxD5 - minD5)) * 100 : null,
    }))
  }, [mergedData])

  const brXusaData = useMemo(() => {
    const dates = Array.from(
      new Set([...usaProductData.map((d) => d.date), ...brProductData.map((d) => d.date)]),
    ).sort()
    const usaMap = new Map(usaProductData.map((d) => [d.date, d.avgPrice]))
    const brMap = new Map(brProductData.map((d) => [d.date, d.avgPrice]))

    const combined = dates.map((date) => ({
      date,
      priceUSA: usaMap.get(date) || null,
      priceBR: brMap.get(date) || null,
    }))

    const firstValid = combined.findIndex((d) => d.priceUSA !== null && d.priceBR !== null)
    const synced = firstValid !== -1 ? combined.slice(firstValid) : combined

    const usaV = synced.map((d) => d.priceUSA).filter((v): v is number => v != null)
    const brV = synced.map((d) => d.priceBR).filter((v): v is number => v != null)
    const minUSA = Math.min(...usaV),
      maxUSA = Math.max(...usaV)
    const minBR = Math.min(...brV),
      maxBR = Math.max(...brV)

    return synced.map((item) => ({
      ...item,
      usaNormalized:
        item.priceUSA != null ? ((item.priceUSA - minUSA) / (maxUSA - minUSA)) * 100 : null,
      brNormalized: item.priceBR != null ? ((item.priceBR - minBR) / (maxBR - minBR)) * 100 : null,
    }))
  }, [usaProductData, brProductData])

  return (
    <RamHistoryContext.Provider
      value={{
        data,
        ddr5Data,
        emptyData,
        usaProductData,
        brProductData,
        loading,
        ddr4Count,
        ddr5Count,
        mergedData,
        normalizedData,
        brXusaData,
      }}
    >
      {children}
    </RamHistoryContext.Provider>
  )
}

export const useRamHistoryContext = () => {
  const context = useContext(RamHistoryContext)
  if (!context) throw new Error('useRamHistoryContext must be used within RamHistoryProvider')
  return context
}
