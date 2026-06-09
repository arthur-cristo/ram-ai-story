import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
          value: '#010102',
        },

        primary: {
          value: '#0FA135',
        },

        'primary.light': {
          value: '#34D170',
        },

        secondary: {
          value: '#00B8FF',
        },
      
        'secondary.light': {
          value: '#66D6FF',
        },

        destructive: {
          value: '#E82C34',
        },

        white: {
          value: '#FFFFFF',
        },
      },

      fonts: {
        heading: {
          value: `'Inter', sans-serif`,
        },

        body: {
          value: `'Inter', sans-serif`,
        },
      },
    },

    semanticTokens: {
      colors: {
        background: {
          value: '{colors.bg}',
        },

        text: {
          value: '{colors.white}',
        },
      },
    },
  },

  globalCss: {
    html: {
      scrollBehavior: 'smooth',
    },

    body: {
      bg: '#010102',
      color: 'white',
      overflowX: 'hidden',
    },

    '#root': {
      bg: '#010102',
      minHeight: '100vh',
    },
  },
})

export const system = createSystem(defaultConfig, config)
