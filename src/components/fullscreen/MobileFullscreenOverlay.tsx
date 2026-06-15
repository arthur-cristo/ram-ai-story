import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

const MobileFullscreenOverlay = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const update = () => {
      const fullscreen = !!document.fullscreenElement

      setIsFullscreen(fullscreen)

      document.body.style.overflow = fullscreen ? '' : 'hidden'
      document.documentElement.style.overflow = fullscreen ? '' : 'hidden'
    }

    update()

    document.addEventListener('fullscreenchange', update)

    return () => {
      document.removeEventListener('fullscreenchange', update)

      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (!isMobile || isFullscreen) {
    return null
  }

  return (
    <Box position="fixed" inset={0} zIndex={99999} bg="rgba(1,1,2,.96)" backdropFilter="blur(24px)">
      <VStack h="100%" px={8} justify="center" textAlign="center">
        <Heading size="lg">Melhor experiência em tela cheia!</Heading>

        <Text color="whiteAlpha.800" maxW="400px">
          Clique no botão de tela cheia no canto inferior esquerdo para visualizar a apresentação da
          forma como ela foi projetada.
        </Text>

        <Text fontSize="sm" color="whiteAlpha.500">
          Recomendado girar o dispositivo para horizontal
        </Text>
      </VStack>
    </Box>
  )
}

export default MobileFullscreenOverlay
