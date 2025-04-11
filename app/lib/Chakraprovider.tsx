'use client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '@/components/theme';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
