'use client';
import { useColorModeValue } from '@chakra-ui/react';
export const useThemeColor = () => {
  const bgColor = useColorModeValue('#e7ecf0', 'rgb(11, 30, 59)');
  const textColor = useColorModeValue('black', 'rgb(124, 143, 172)');
  const childBgColor = useColorModeValue('white', 'rgb(17, 28, 45)');
  const borderColor = useColorModeValue('2px solid black', '2px solid white');
  return { bgColor, textColor, childBgColor, borderColor };
};
