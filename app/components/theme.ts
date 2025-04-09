import { extendTheme } from '@chakra-ui/react';
const customTheme = extendTheme({
  breakpoints: {
    xs: '320px', // Extra small devices
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '980px', // Custom breakpoint
  },
});

export default customTheme;
