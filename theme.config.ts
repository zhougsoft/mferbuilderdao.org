import { ThemeConfig } from 'types/ThemeConfig'
import { lightTheme } from 'theme/default'
import merge from 'lodash.merge'

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: 'monospace',
    },
  },
  nav: {
    primary: [
      { label: 'auction', href: '/' },
      { label: 'vote', href: '/vote' },
      { label: 'manifesto', href: '/manifesto' },
    ],
    secondary: [],
  },
} as Partial<ThemeConfig>)
