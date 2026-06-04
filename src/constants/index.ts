import type { ManufacturersLogos } from '@/types/constants'

export const MONTHS = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
]

export const EVENTS: Record<
  string,
  {
    title: string
    description: string[]
  }
> = {
  '2025-12-03': {
    title: 'Micron reduz presença no mercado doméstico',
    description: [
      'Em dezembro de 2025, a Micron anunciou sua decisão de encerrar as atividades da Crucial no mercado de consumo, incluindo a venda de produtos da marca Crucial para o consumidor em importantes varejistas, lojas online e distribuidores em todo o mundo.',
    ],
  },

  '2025-12-22': {
    title: 'OpenAI garantiu até 40% do mercado',
    description: [
      "Segundo fontes da indústria e o canal analítico Moore's Law Is Dead, a OpenAI assinou importantes acordos com a Samsung e a SK Hynix no início de outubro.",
      'Esses acordos representam [...] quase metade da capacidade global de produção de memória projetada para 2025. Esses volumes são destinados ao projeto do data center Stargate, que tem um orçamento estimado em cerca de US$ 500 bilhões.',
    ],
  },

  '2026-05-16': {
    title: 'Pico do preço médio no varejo brasileiro',
    description: [
      'Nesta data, o preço médio das memórias DDR4 monitoradas atingiu o maior valor de toda a série histórica analisada. Mesmo após meses de alta, o mercado não apresentou sinais relevantes de correção, indicando uma tendência de preços elevados.',
      'Esse comportamento sugere que a oferta de módulos DDR4 continua pressionada. Uma possível explicação é a migração gradual da indústria para a produção de DDR5, reduzindo investimentos e capacidade produtiva dedicados ao DDR4.',
    ],
  },
}

export const DATASET_STATS = [
  {
    value: '39',
    label: 'MODELOS MONITORADOS',
  },
  {
    value: '3',
    label: 'DATASETS',
  },
  {
    value: 'BR + US',
    label: 'COMPARAÇÃO DE MERCADOS',
  },
  {
    value: '6',
    label: 'FONTES DE DADOS',
  },
]

export const MANUFAFACTURERS_LOGOS: ManufacturersLogos[] = [
  {
    src: '/images/logos/samsung.png',
    alt: 'samsung',
    color: '0,162,255',
  },
  {
    src: '/images/logos/sk_hynix.png',
    alt: 'sk-hynix',
    color: '255,162,0',
    shadowIntensity: [0.4, 0.3, 0.2],
  },
  { src: '/images/logos/micron.png', alt: 'micron', color: '162,0,255' },
]
