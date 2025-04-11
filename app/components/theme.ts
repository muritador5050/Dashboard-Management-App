// components/theme.ts
import {
  extendTheme,
  type ThemeConfig,
  useColorModeValue,
} from '@chakra-ui/react';

//config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      // 'html, body': {
      //   bg: props.colorMode === 'light' ? 'green' : 'rgb(11, 30, 59)',
      //   color: props.colorMode === 'light' ? 'black' : 'rgb(124, 143, 172)',
      // },
      // body: {
      //   bg: props.colorMode === 'light' ? 'white' : 'rgb(11, 30, 59)',
      // },
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

// utils/themeUtils.ts

export const useThemeColor = () => {
  const bgColor = useColorModeValue('#e7ecf0', 'rgb(11, 30, 59)');
  const textColor = useColorModeValue('black', 'rgb(124, 143, 172)');
  const childBgColor = useColorModeValue('white', 'rgb(17, 28, 45)');

  return { bgColor, textColor, childBgColor };
};
