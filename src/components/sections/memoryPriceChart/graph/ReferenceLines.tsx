import { ReferenceLine } from 'recharts'
import { EVENTS } from '@/constants'

const ReferenceLines = () => (
  <>
    {Object.entries(EVENTS).map(([date]) => (
      <ReferenceLine key={date} x={date} stroke="#34D170" />
    ))}
  </>
)

export default ReferenceLines
