import { Flex } from "@chakra-ui/react";
import { HeroSection } from "./components/sections/hero";
import { SmoothScroll } from "./components/SmoothScroll";

function App() {
  return (
    <Flex direction="column" userSelect="none" h='1000dvh'>
      <SmoothScroll />
      <HeroSection />
    </Flex>
  );
}

export default App;
