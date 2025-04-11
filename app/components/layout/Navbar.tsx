'use client';
import React, { useState } from 'react';
import BlinkingIcon from '../BlinkingIcon';
import {
  ChevronDown,
  AlignJustify,
  Ellipsis,
  X,
  SearchX,
  ArrowUpWideNarrow,
  Rocket,
  MessagesSquare,
  Mails,
  UserPen,
  CalendarDays,
} from 'lucide-react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Box,
  Text,
  Divider,
  Center,
} from '@chakra-ui/react';
import { useCart, useDrawer, useNav } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Username from '@/lib/username';
import ThemeToggleButton from '../themeToggleButton';
import { CartWithBadge } from '../cartComponents/cartWithBadge';
import { SearchDropdown } from '../searchDropdown';
import { useThemeColor } from '@/lib/themeUtil';

//Navbar
export default function Navbar() {
  const { cart } = useCart();
  const { collapse, handleCollapse, toggleSiderbarWidth } = useNav();
  const { onOpen } = useDrawer();
  const [swipeModal, setSwipeModal] = useState(false);
  const { childBgColor, textColor } = useThemeColor();
  return (
    <>
      <nav
        style={{ backgroundColor: childBgColor, color: textColor }}
        className='p-5 sticky top-0 right-0 z-1000  text-custom-color rounded-2xl m-[1em]  cursor-pointer'
      >
        {/* mobile-view */}
        <div className='px-2 min-[980px]:hidden'>
          <div className='flex justify-between items-center'>
            <span>
              <AlignJustify onClick={onOpen} />
            </span>
            <span className='flex gap-4 items-center'>
              <Rocket /> Admin
            </span>
            <span onClick={handleCollapse}>
              <Ellipsis />
            </span>
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={
              collapse
                ? { opacity: 1, height: 'auto' }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <hr className='w-full my-4' />
            <div className='flex justify-between items-center'>
              <span>
                <AlignJustify onClick={() => setSwipeModal(true)} />
              </span>
              <ul className='flex gap-2 items-center'>
                <li>
                  <span>
                    <SearchX />
                  </span>
                </li>
                <li>
                  <BlinkingIcon />
                </li>
                <li>
                  <ThemeToggleButton />
                </li>
                <li>
                  <Link href='/dashboard/ecommerce/checkout'>
                    <CartWithBadge cartLength={cart.length} />
                  </Link>
                </li>
                <li className='flex gap-4 items-center'>
                  <Username />
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        {/* desktop-view */}
        <div className='hidden min-[980px]:flex justify-between items-center '>
          <ul className='flex gap-3 items-center'>
            <li>
              <ArrowUpWideNarrow onClick={toggleSiderbarWidth} />
            </li>
            <li className='flex items-center'>
              <Menu>
                <MenuButton
                  bg='transparent'
                  color='rgb(124, 143, 172)'
                  _hover={{ bg: 'transparent' }}
                  as={Button}
                  rightIcon={<ChevronDown />}
                >
                  Apps
                </MenuButton>

                <MenuList
                  display='flex'
                  gap={5}
                  bg='rgb(17,28,45)'
                  borderRadius='2xl'
                  border='none'
                  p={3}
                >
                  <MenuGroup>
                    <MenuItem
                      as='a'
                      href='/dashboard/chat'
                      display='flex'
                      alignItems='center'
                      gap={3}
                      bg='rgb(17,28,45)'
                      _hover={{ color: 'blue.500' }}
                    >
                      {' '}
                      <MessagesSquare /> Chat App
                    </MenuItem>
                    <MenuItem
                      as='a'
                      href='/dashboard/email'
                      display='flex'
                      alignItems='center'
                      gap={3}
                      bg='rgb(17,28,45)'
                      _hover={{ color: 'blue.500' }}
                    >
                      <Mails /> Email App{' '}
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem
                      as='a'
                      href='/dashboard/profile'
                      display='flex'
                      alignItems='center'
                      gap={3}
                      bg='rgb(17,28,45)'
                      _hover={{ color: 'blue.500' }}
                    >
                      {' '}
                      <UserPen /> User Profile
                    </MenuItem>
                    <MenuItem
                      as='a'
                      href='/dashboard/calendar'
                      display='flex'
                      alignItems='center'
                      gap={3}
                      bg='rgb(17,28,45)'
                      _hover={{ color: 'blue.500' }}
                    >
                      {' '}
                      <CalendarDays /> Calendar
                    </MenuItem>
                  </MenuGroup>
                  <Center height='100px'>
                    <Divider orientation='vertical' />
                  </Center>
                  <Box>
                    <Text fontWeight='bold'>Quick links</Text>
                    <Link href='/dashboard/pricing'>
                      <Text _hover={{ color: 'blue.500' }}>Pricing page</Text>
                    </Link>
                    <Link href='/dashboard/pricing'>
                      <Text _hover={{ color: 'blue.500' }}>
                        Account setting
                      </Text>
                    </Link>
                  </Box>
                </MenuList>
              </Menu>
            </li>
            <li>
              {' '}
              <Link href={'/dashboard/chat'}>Chat</Link>{' '}
            </li>
            <li>
              <Link href={'/dashboard/calendar'}>Calendar</Link>
            </li>
            <li>
              <Link href={'/dashboard/email'}>Email</Link>
            </li>
          </ul>
          <ul className='flex gap-3 items-center'>
            <li>
              <SearchDropdown />
            </li>
            <li>
              {' '}
              <BlinkingIcon />
            </li>
            <li>
              <ThemeToggleButton />
            </li>
            <li className='relative'>
              <Link href='/dashboard/ecommerce/checkout'>
                <CartWithBadge cartLength={cart.length} />
              </Link>
            </li>
            <li className='flex gap-4 items-center '>
              <Username />
            </li>
          </ul>
        </div>
      </nav>
      {/*overlay-modal */}
      <AnimatePresence>
        {swipeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black bg-opacity-10'
              onClick={() => setSwipeModal(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='fixed top-0 right-0 z-1000 w-80 h-full bg-custom-bg text-custom-color shadow-lg p-6 flex flex-col'
            >
              <span>
                <X
                  className='float-right'
                  onClick={() => setSwipeModal(false)}
                />
              </span>
              <ul className='flex flex-col gap-5'>
                <li className='flex justify-between items-center'>
                  Apps
                  <ChevronDown />
                </li>
                <li>Chat</li>
                <li>Calendar</li>
                <li>Email</li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
