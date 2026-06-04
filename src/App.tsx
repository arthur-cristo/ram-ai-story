import { Flex } from '@chakra-ui/react'
import { HeroSection } from './components/sections/hero'
import DatasetSection from './components/sections/dataset'
import Scroll from './components/scroll'
import { MemoryPriceChart } from './components/sections/memoryPriceChart'
import FullScreenButton from './components/FullScreenButton'
import News from './components/sections/news'

function App() {
  return (
    <Flex direction="column" userSelect="none" h="1000dvh" gap="16" overflow="hidden">
      <FullScreenButton />
      <Scroll />
      <HeroSection />
      <DatasetSection />
      <MemoryPriceChart />
      <News />
    </Flex>
  )
}

export default App
