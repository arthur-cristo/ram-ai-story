import { Flex } from "@chakra-ui/react";
import { HeroSection } from "./components/sections/hero";
import DatasetSection from "./components/sections/dataset";
import Scroll from "./components/scroll";
import { MemoryPriceChart } from "./components/sections/memoryPriceChart";

function App() {
  return (
    <Flex direction="column" userSelect="none" gap="16" overflow="hidden">
      <Scroll />
      <HeroSection />
      <DatasetSection />
      <MemoryPriceChart />
    </Flex>
  );
}

export default App;
