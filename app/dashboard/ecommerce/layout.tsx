'use client';
import PageTitle from '@/components/pageTitle';
import { useThemeColor } from '@/lib/themeUtil';
import { Box } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { childBgColor, textColor } = useThemeColor();
  return (
    <>
      <PageTitle />
      <Box bg={childBgColor} color={textColor} p={2} borderRadius='2xl'>
        {children}
      </Box>
    </>
  );
}
