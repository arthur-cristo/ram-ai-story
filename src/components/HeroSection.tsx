import { Box, Heading } from '@chakra-ui/react'

export function HeroSection() {
  return (
    <Box
      h="100dvh"
      display="flex"
      alignItems="center"
      px="12"
    >
      <Heading
        fontSize={{
          base: '6xl',
          md: '8xl',
        }}
        lineHeight="0.9"
        fontWeight="900"
        letterSpacing="-0.04em"
      >
        A Crise de RAM
        <br />
        Na Era da IA
      </Heading>
    </Box>
  )
}