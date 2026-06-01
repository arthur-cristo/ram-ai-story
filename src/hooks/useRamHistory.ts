import { useEffect, useState } from "react";
import Papa from "papaparse";

import csvUrl from "../assets/db/memorias_ddr4_historico.csv?url";

type ChartPoint = {
  date: string;
  avgPrice: number;
};

export function useRamHistory() {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [emptyData, setEmptyData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result: { data: Record<string, string>[] }) => {
        const rows = result.data as Record<string, string>[];

        if (!rows.length) {
          setData([]);
          setEmptyData([]);
          setLoading(false);
          return;
        }

        const dateColumns = Object.keys(rows[0]).filter((key) =>
          /^\d{4}-\d{2}-\d{2}$/.test(key),
        );

        const chartData = dateColumns.map((date) => {
          const prices = rows
            .map((row) => Number(row[date]))
            .filter((value) => !Number.isNaN(value) && value > 0);

          const avgPrice =
            prices.reduce((sum, value) => sum + value, 0) / prices.length;

          return {
            date,
            avgPrice: Number(avgPrice.toFixed(2)),
          };
        });

        const chartEmptyData = dateColumns.map((date) => {
          return {
            date,
            avgPrice: 0,
          };
        });

        setData(chartData);
        setEmptyData(chartEmptyData);
        setLoading(false);
      },
    });
  }, []);

  return {
    data,
    emptyData,
    loading,
  };
}

export default useRamHistory;
