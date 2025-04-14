'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { Settings } from 'lucide-react';
import { useNav } from '@/context/ThemeContext';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Heading,
  useColorMode,
  Button,
  HStack,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useThemeColor } from '@/lib/themeUtil';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isWide } = useNav();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgColor, childBgColor, textColor } = useThemeColor();
  const { colorMode, setColorMode } = useColorMode();
  const [changeTheme, setChangeTheme] = useState(colorMode === 'dark');

  // Dynamic sidebar width calculation
  const sidebarWidth = isWide ? '80px' : '240px';

  // Settings button styling
  const settingsBgColor = useColorModeValue('blue.500', 'purple.500');
  const settingsHoverBgColor = useColorModeValue('blue.600', 'purple.600');

  useEffect(() => {
    setChangeTheme(colorMode === 'dark');
  }, [colorMode]);

  return (
    <Flex minH='100vh' bg={bgColor} color={textColor}>
      {/* Sidebar area */}
      <Box
        position='fixed'
        top='0'
        left='0'
        h='100vh'
        w={sidebarWidth}
        transition='width 0.3s ease'
        zIndex='10'
      >
        <Sidebar />
      </Box>

      {/* Main content area */}
      <Box
        ml={{ base: 0, xxl: sidebarWidth }}
        w='full'
        transition='margin-left 0.3s ease'
      >
        <Navbar />

        {/* Main content */}
        <Box as='main' p={4} pt={2}>
          {children}
        </Box>

        {/* Settings button */}
        <IconButton
          icon={<Settings size={24} />}
          aria-label='Open settings'
          position='fixed'
          bottom='10'
          right='9'
          rounded='full'
          w='50px'
          h='50px'
          bg={settingsBgColor}
          color='white'
          _hover={{ bg: settingsHoverBgColor }}
          onClick={onOpen}
          boxShadow='lg'
        />

        {/* Settings drawer */}
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
          <DrawerOverlay />
          <DrawerContent bg={childBgColor} color={textColor}>
            <DrawerCloseButton size='lg' mt={2} />
            <DrawerHeader borderBottomWidth='1px' py={4}>
              <Text fontSize='xl'>Account Settings</Text>
            </DrawerHeader>

            <DrawerBody py={6}>
              <Heading size='md' mb={4}>
                Theme Preferences
              </Heading>
              <HStack spacing={4}>
                <Button
                  onClick={() => setColorMode('light')}
                  colorScheme={!changeTheme ? 'blue' : 'gray'}
                  variant={!changeTheme ? 'solid' : 'outline'}
                  size='md'
                  flex='1'
                >
                  Light Mode
                </Button>

                <Button
                  onClick={() => setColorMode('dark')}
                  colorScheme={changeTheme ? 'purple' : 'gray'}
                  variant={changeTheme ? 'solid' : 'outline'}
                  size='md'
                  flex='1'
                >
                  Dark Mode
                </Button>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  );
}

export default DashboardLayout;
