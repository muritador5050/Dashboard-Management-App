'use client';
import React from 'react';
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
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
function DasboardLayout({ children }: { children: React.ReactNode }) {
  const { isWide } = useNav();
  const sidebarWidth = isWide ? 'w-20' : 'w-fit-content';
  const contentMargin = isWide ? 'ml-20' : 'ml-67';
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className='flex bg-gray-800 min-h-screen text-custom-color'>
      <div
        className={`fixed top-0 left-0 h-screen overflow-y-scroll ${sidebarWidth}`}
      >
        <Sidebar />
      </div>
      <div className={`${contentMargin} w-full max-[980px]:ml-0`}>
        <Navbar />
        <main className='px-3'>{children}</main>
        <div className=' flex justify-center items-center fixed bottom-10 right-15 bg-sky-600 text-custom-color cursor-pointer w-[70px] h-[70px] rounded-full'>
          <Settings size={48} className='' onClick={onOpen} />
        </div>
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg='rgb(17, 28, 45)'>
            <DrawerCloseButton />
            <DrawerHeader>Account Setting</DrawerHeader>
            <DrawerBody>
              <Heading>Theme</Heading>
              <Flex>
                <Box>Drak</Box>
                <Box>Light</Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default DasboardLayout;
