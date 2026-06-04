import { useEffect, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void>
}

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>
}

type ScreenOrientationWithLock = ScreenOrientation & {
  lock?: (orientation: OrientationLockType) => Promise<void>
}

type ScreenWithOrientation = Screen & {
  orientation?: ScreenOrientationWithLock
}

const FullscreenToggleButton = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  useEffect(() => {
    const syncFullscreenState = (): void => {
      const fullscreenDocument: FullscreenDocument = document as FullscreenDocument

      setIsFullscreen(
        Boolean(document.fullscreenElement || fullscreenDocument.webkitFullscreenElement),
      )
    }

    syncFullscreenState()

    document.addEventListener('fullscreenchange', syncFullscreenState)
    document.addEventListener('webkitfullscreenchange', syncFullscreenState)

    return (): void => {
      document.removeEventListener('fullscreenchange', syncFullscreenState)
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState)
    }
  }, [])

  const toggleFullscreen = async (): Promise<void> => {
    const fullscreenDocument: FullscreenDocument = document as FullscreenDocument
    const fullscreenElement =
      document.fullscreenElement || fullscreenDocument.webkitFullscreenElement || null

    try {
      if (fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (fullscreenDocument.webkitExitFullscreen) {
          await fullscreenDocument.webkitExitFullscreen()
        }

        return
      }

      const target = document.documentElement as FullscreenElement

      if (target.requestFullscreen) {
        await target.requestFullscreen()
      } else if (target.webkitRequestFullscreen) {
        await target.webkitRequestFullscreen()
      }

      // Mobile: tenta travar em landscape
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        try {
          const screenWithOrientation = screen as ScreenWithOrientation

          await screenWithOrientation.orientation?.lock?.('landscape')
        } catch (err) {
          console.warn('Orientation lock não suportado', err)
        }
      }
    } catch (error) {
      console.error('Não foi possível alternar tela cheia:', error)
    }
  }

  return (
    <IconButton
      aria-label={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
      title={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
      onClick={toggleFullscreen}
      position="fixed"
      bottom="4"
      left="4"
      zIndex="9999"
      w="10"
      h="10"
      aspectRatio={1}
      borderRadius="full"
      borderWidth="1px"
      borderColor="whiteAlpha.400"
      bg="marinho/55"
      color="white"
      boxShadow="0 6px 18px rgba(0,0,0,0.28)"
      backdropFilter="blur(12px)"
      transition="all 0.3s"
      _hover={{ borderColor: 'whiteAlpha.700', bg: 'marinho/78' }}
      _focusVisible={{
        boxShadow: '0 0 0 2px var(--chakra-colors-white), 0 0 0 4px var(--chakra-colors-marinho)',
      }}
      opacity={isFullscreen ? 0.4 : 1}
    >
      {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
    </IconButton>
  )
}

export default FullscreenToggleButton
