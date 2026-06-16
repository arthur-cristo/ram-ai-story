import { Flex } from '@chakra-ui/react'
import Systems from './components/Systems'
import Sections from './components/sections'

function App() {
  return (
    <Flex direction="column" userSelect="none" gap="16" overflow="hidden">
      <Systems />
      <Sections />
    </Flex>
  )
}

export default App
