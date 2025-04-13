'use client';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

//config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
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
