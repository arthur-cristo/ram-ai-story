import { VStack } from '@chakra-ui/react'
import Manufacturers from './manufacturers'
import OpenAI from './openai'

const News = () => {
  return (
    <VStack h="100%">
      <Manufacturers />
      <OpenAI />
    </VStack>
  )
}

export default News
