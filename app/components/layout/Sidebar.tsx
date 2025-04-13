'use client';
import { LogOut, X, Rocket } from 'lucide-react';
import { route_config } from '@/lib/route-config';
import { NavigationItemComponent } from '../../../data/navigation-config';
import { useDrawer, useNav } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
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
  const signOutColor = useColorModeValue(
    'rgb(125, 211, 252)',
    'rgb(31, 41, 55)'
  );
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

  if (!isMinWidth) {
    return isOpen ? (
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={childBgColor} color={textColor}>
          <DrawerHeader>
            <DrawerCloseButton />
            <span className='flex gap-5 items-center'>
              <Rocket size={48} />
              <h2 className='font-bold'>Admin</h2>
            </span>
          </DrawerHeader>
          <DrawerBody>
            <nav className='flex flex-col gap-7'>
              {route_config.map((item, index) => (
                <NavigationItemComponent
                  key={index}
                  item={item}
                  isWide={isWide}
                />
              ))}
            </nav>
          </DrawerBody>
          <DrawerFooter>
            <Flex
              bg={signOutColor}
              position='sticky'
              left={0}
              bottom={0}
              align='center'
              justifyContent='space-between'
              p={5}
              borderRadius='3xl'
              w='full'
            >
              <Username />
              <Tooltip hasArrow placement='top' label='Logout'>
                <LogOut
                  onClick={handleSignOut}
                  size={32}
                  className='cursor-pointer'
                />
              </Tooltip>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : null;
  }

  return (
    <aside
      style={{ backgroundColor: childBgColor, color: textColor }}
      className={`text-custom-color w-64 py-4 px-2`}
    >
      <span className='flex justify-between items-center'>
        <span className='flex justify-between items-center'>
          <Rocket size={48} />
          {!isWide && <h2 className='font-bold '>Admin</h2>}
        </span>
        <span
          className='cursor-pointer min-[980px]:hidden'
          onClick={closeSideBar}
        >
          <X />
        </span>
      </span>
      <nav className={`mt-5 `}>
        {route_config.map((item, index) => (
          <NavigationItemComponent key={index} item={item} isWide={isWide} />
        ))}

        {!isWide && (
          <Flex
            bg={signOutColor}
            position='sticky'
            left={0}
            bottom={0}
            align='center'
            justifyContent='space-between'
            p={5}
            borderRadius='3xl'
          >
            <Username />
            <Tooltip hasArrow placement='top' label='Logout'>
              <LogOut
                onClick={handleSignOut}
                size={32}
                className='cursor-pointer'
              />
            </Tooltip>
          </Flex>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
