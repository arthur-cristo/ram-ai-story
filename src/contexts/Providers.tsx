import React from 'react'
import { RamHistoryProvider } from './RamHistoryContext'
import { system } from '@/styles/system'
import { ChakraProvider } from '@chakra-ui/react'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={system}>
    <RamHistoryProvider>{children}</RamHistoryProvider>
  </ChakraProvider>
)

export default Providers
