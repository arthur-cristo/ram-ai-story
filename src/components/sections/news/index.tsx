import { VStack } from '@chakra-ui/react'
import Manufacturers from './manufacturers'
import OpenAI from './openai'
import Finances from './finances'

const News = () => {
  return (
    <VStack h="100%">
      <Manufacturers />
      <OpenAI />
      <Finances />
    </VStack>
  )
}

export default News
