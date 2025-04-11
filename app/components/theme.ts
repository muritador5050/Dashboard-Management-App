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
  const borderColor = useColorModeValue('2px solid black', '2px solid white');
  return { bgColor, textColor, childBgColor, borderColor };
};
