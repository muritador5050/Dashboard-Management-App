'use client';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '@/components/theme';
export default function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
