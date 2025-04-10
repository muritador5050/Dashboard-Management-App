// components/theme.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      'html, body': {
        bg: props.colorMode === 'light' ? '#ffffff' : 'rgb(17, 28, 45)',
        color: props.colorMode === 'light' ? 'black' : 'rgb(124, 143, 172)',
      },
    }),
  },
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '980px',
  },
});

export default theme;
