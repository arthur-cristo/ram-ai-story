import { Flex } from "@chakra-ui/react";
import { HeroSection } from "./components/HeroSection";
import { SmoothScroll } from "./components/SmoothScroll";

function App() {
  return (
    <Flex direction="column">
      <SmoothScroll />
      <HeroSection />
      <HeroSection />
    </Flex>
  );
}

export default App;
