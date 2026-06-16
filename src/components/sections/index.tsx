import BrXUSA from './brXusa'
import DatasetSection from './dataset'
import DDR5 from './ddr5'
import { HeroSection } from './hero'
import { MemoryPriceChart } from './memoryPriceChart'
import Metodology from './metodology'
import News from './news'
import ZEN3 from './news/zen3'

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
  </>
)

export default Sections
