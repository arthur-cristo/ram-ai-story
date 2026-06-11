import { VStack } from '@chakra-ui/react'
import Manufacturers from './manufacturers'
import ZEN3 from './zen3'

const News = () => {
  return (
    <VStack>
      <ZEN3 />
      <Manufacturers />
    </VStack>
  )
}

export default News
