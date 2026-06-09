const toBrl = (value: number | null): string => {
  if (value === null) return 'N/A'
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default toBrl
