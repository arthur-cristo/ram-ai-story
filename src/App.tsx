import { Flex } from "@chakra-ui/react";
import { HeroSection } from "./components/sections/hero";
import DatasetSection from "./components/sections/dataset";
import Scroll from "./components/scroll";

function App() {
  return (
    <Flex direction="column" userSelect="none">
      <Scroll />
      <HeroSection />
      <DatasetSection />
    </Flex>
  );
}

export default App;
