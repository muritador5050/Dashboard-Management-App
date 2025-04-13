'use client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/components/theme';
import NavContext from '@/context/ThemeContext';
import { type ThemeConfig } from '@chakra-ui/react';
interface ProvidersProps {
  children: React.ReactNode;
  initialColorMode: ThemeConfig['initialColorMode'];
}
export default function Providers({ children }: ProvidersProps) {
  return (
    <NavContext>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </NavContext>
  );
}
