'use client';
import { LogOut, X, Rocket } from 'lucide-react';
import { routes } from '@/lib/route';
import { NavigationItemComponent } from '../NavigationItems';
import { useDrawer, useNav } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Username from '@/lib/username';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { showToast } from '@/lib/toastService';

const Sidebar = () => {
  const { isWide, closeSideBar } = useNav();
  const [isMinWidth, setIsMinWidth] = useState(false);
  const { isOpen, onClose } = useDrawer();
  const router = useRouter();
  useEffect(() => {
    const checkWidth = () => setIsMinWidth(window.innerWidth >= 980);
    checkWidth(); // Run initially
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
        <DrawerContent bg='rgb(17, 28, 45)' color='rgb(124, 143, 172)'>
          <DrawerHeader>
            <DrawerCloseButton />
            <span className='flex gap-5 items-center'>
              <Rocket size={48} />
              <h2 className='font-bold'>Admin</h2>
            </span>
          </DrawerHeader>
          <DrawerBody>
            <nav className='flex flex-col gap-7'>
              {routes.map((item, index) => (
                <NavigationItemComponent
                  key={index}
                  item={item}
                  isWide={isWide}
                />
              ))}
            </nav>
          </DrawerBody>
          <DrawerFooter>
            <div className='w-full flex justify-between items-center p-3 bg-gray-800 rounded-4xl h-32 sticky left-0 bottom-0'>
              <Box>
                Admin
                <Username />{' '}
              </Box>
              <LogOut
                onClick={handleSignOut}
                size={32}
                className='cursor-pointer'
              />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : null;
  }

  return (
    <aside className={`bg-custom-bg text-custom-color w-64 py-4 px-2`}>
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
        {routes.map((item, index) => (
          <NavigationItemComponent key={index} item={item} isWide={isWide} />
        ))}

        {!isWide && (
          <div className='w-[100%] flex justify-between items-center p-3 bg-gray-800 rounded-4xl h-32 sticky left-0 bottom-0'>
            <Box>
              Admin
              <Username />{' '}
            </Box>
            <LogOut
              onClick={handleSignOut}
              size={32}
              className='cursor-pointer'
            />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
