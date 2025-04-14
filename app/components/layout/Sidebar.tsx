'use client';
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { LogOut, X, Rocket } from 'lucide-react';
import { route_config } from '@/lib/route-config';
import { NavigationItemComponent } from '../../../data/navigation-config';
import { useDrawer, useNav } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Username from '@/lib/username';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { showToast } from '@/lib/toastService';
import { useThemeColor } from '@/lib/themeUtil';

const Sidebar = () => {
  const { isWide, closeSideBar } = useNav();
  const [isMinWidth, setIsMinWidth] = useState(false);
  const { isOpen, onClose } = useDrawer();
  const router = useRouter();
  const { childBgColor, textColor } = useThemeColor();

  // Enhanced color modes
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('blue.50', 'gray.700');
  const signOutBg = useColorModeValue('blue.50', 'gray.700');
  const signOutHoverBg = useColorModeValue('blue.100', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const scrollColor = useColorModeValue('gray.300', 'gray.600');
  //Enhance resize
  useEffect(() => {
    const checkWidth = () => setIsMinWidth(window.innerWidth >= 980);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/auth/login');
    } catch (err) {
      console.error('Sign-out error:', err);
      showToast({
        title: 'Sign-out failed',
        description: 'Error signing out',
        status: 'error',
      });
    }
  };

  // Mobile drawer sidebar
  if (!isMinWidth) {
    return isOpen ? (
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='xs'>
        <DrawerOverlay />
        <DrawerContent bg={childBgColor} color={textColor} boxShadow='xl'>
          <DrawerHeader
            bg={headerBg}
            borderBottomWidth='1px'
            borderColor={borderColor}
            py={4}
          >
            <DrawerCloseButton size='lg' mt={2} />
            <HStack spacing={3} align='center'>
              <Icon as={Rocket} boxSize={8} color={iconColor} />
              <Text fontSize='xl' fontWeight='bold'>
                Admin Dashboard
              </Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody pt={4} overflowY='auto'>
            <VStack spacing={3} align='stretch'>
              {route_config.map((item, index) => (
                <NavigationItemComponent
                  key={index}
                  item={item}
                  isWide={isWide}
                />
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px' borderColor={borderColor}>
            <Flex
              bg={signOutBg}
              align='center'
              justify='space-between'
              p={4}
              borderRadius='lg'
              w='full'
              _hover={{ bg: signOutHoverBg }}
              transition='all 0.2s'
            >
              <Username />
              <Tooltip hasArrow placement='top' label='Logout'>
                <IconButton
                  icon={<LogOut />}
                  onClick={handleSignOut}
                  variant='ghost'
                  colorScheme='blue'
                  aria-label='Logout'
                  size='md'
                />
              </Tooltip>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : null;
  }

  // Desktop sidebar with vertical scrolling
  return (
    <Box
      as='aside'
      bg={childBgColor}
      color={textColor}
      w={isWide ? '80px' : '240px'}
      h='100vh'
      position='fixed'
      left={0}
      top={0}
      boxShadow='md'
      borderRightWidth='1px'
      borderColor={borderColor}
      transition='width 0.3s ease'
      display='flex'
      flexDirection='column'
    >
      {/* Header area - fixed */}
      <Flex
        justify='space-between'
        align='center'
        px={isWide ? 2 : 4}
        py={6}
        borderBottomWidth='1px'
        borderColor={borderColor}
        bg={sidebarBg}
      >
        <HStack spacing={isWide ? 0 : 3}>
          <Icon as={Rocket} boxSize={8} color={iconColor} />
          {!isWide && (
            <Text fontSize='xl' fontWeight='bold'>
              Admin
            </Text>
          )}
        </HStack>
        <IconButton
          icon={<X />}
          size='sm'
          display={{ base: 'flex', lg: 'none' }}
          onClick={closeSideBar}
          variant='ghost'
          aria-label='Close sidebar'
        />
      </Flex>

      {/* Navigation items - scrollable */}
      <Box
        flex='1'
        overflowY='auto'
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: `${scrollColor}`,
            borderRadius: '24px',
          },
        }}
        px={isWide ? 2 : 4}
        py={4}
      >
        <VStack spacing={isWide ? 5 : 3} align='stretch'>
          {route_config.map((item, index) => (
            <NavigationItemComponent key={index} item={item} isWide={isWide} />
          ))}
        </VStack>
      </Box>

      {/* Footer area - fixed */}
      {!isWide && (
        <Box
          px={4}
          py={3}
          borderTopWidth='1px'
          borderColor={borderColor}
          bg={sidebarBg}
        >
          <Flex
            bg={signOutBg}
            align='center'
            justify='space-between'
            p={4}
            borderRadius='lg'
            boxShadow='sm'
            _hover={{ bg: signOutHoverBg }}
            transition='all 0.2s'
          >
            <Username />
            <Tooltip hasArrow placement='top' label='Logout'>
              <IconButton
                icon={<LogOut />}
                onClick={handleSignOut}
                variant='ghost'
                colorScheme='blue'
                aria-label='Logout'
                size='md'
              />
            </Tooltip>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
