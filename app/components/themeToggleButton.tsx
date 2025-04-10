'use client';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label='Toggle theme'
      icon={colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      onClick={toggleColorMode}
      variant='ghost'
      size='md'
      rounded='full'
      _hover={{ bg: 'gray.200', _dark: { bg: 'gray.700' } }}
    />
  );
}
