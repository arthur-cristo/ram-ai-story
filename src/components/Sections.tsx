import BrXUSA from './sections/brXusa'
import DatasetSection from './sections/dataset'
import DDR5 from './sections/ddr5'
import EndSection from './sections/end'
import { HeroSection } from './sections/hero'
import { MemoryPriceChart } from './sections/memoryPriceChart'
import Metodology from './sections/metodology'
import News from './sections/news'
import ZEN3 from './sections/news/zen3'

const Sections = () => (
  <>
    <HeroSection />
    <DatasetSection />
    <MemoryPriceChart />
    <DDR5 />
    <ZEN3 />
    <BrXUSA />
    <News />
    <Metodology />
    <EndSection />
  </>
)

export default Sections
