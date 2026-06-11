import { Flex } from '@chakra-ui/react'
import { HeroSection } from './components/sections/hero'
import DatasetSection from './components/sections/dataset'
import Scroll from './components/scroll'
import { MemoryPriceChart } from './components/sections/memoryPriceChart'
import FullScreenButton from './components/FullScreenButton'
import News from './components/sections/news'
import DDR5 from './components/sections/ddr5'
import ZEN3 from './components/sections/news/zen3'
import BrXUSA from './components/sections/brXusa'

function App() {
  return (
    <Flex direction="column" userSelect="none" gap="16" overflow="hidden">
      <FullScreenButton />
      <Scroll />
      <HeroSection />
      <DatasetSection />
      <MemoryPriceChart />
      <DDR5 />

      <ZEN3 />
      <BrXUSA />
      <News />
    </Flex>
  )
}

export default App
