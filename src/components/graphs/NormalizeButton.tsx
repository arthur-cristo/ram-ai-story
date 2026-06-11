import { HStack, Button } from '@chakra-ui/react'

type Props = {
  normalize: boolean
  setNormalize: (normalize: boolean) => void
}

const NormalizeButton = ({ normalize, setNormalize }: Props) => (
  <HStack
    borderWidth="1px"
    borderColor="whiteAlpha.200"
    borderRadius="full"
    p="1"
    bg="whiteAlpha.50"
  >
    <Button
      size="sm"
      variant={!normalize ? 'solid' : 'ghost'}
      borderRadius="24px 0px 0px 24px"
      _hover={{ bg: !normalize ? 'gray/30' : 'gray/10' }}
      onClick={() => setNormalize(false)}
    >
      R$
    </Button>

    <Button
      size="sm"
      variant={normalize ? 'solid' : 'ghost'}
      borderRadius="0px 24px 24px 0px"
      _hover={{ bg: normalize ? 'gray/30' : 'gray/10' }}
      onClick={() => setNormalize(true)}
    >
      Índice
    </Button>
  </HStack>
)

export default NormalizeButton
