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
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  ListItem,
  ListIcon,
  List as ListParent,
  IconButton,
  HStack,
  useColorModeValue,
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useCart, useDrawer, useNav } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Username from '@/lib/username';
import ThemeToggleButton from '../themeToggleButton';
import CartWithBadge from '../cartComponents/cartWithBadge';
import { SearchDropdown } from '../searchDropdown';
import { useThemeColor } from '@/lib/themeUtil';

const MotionBox = motion(Box);

export default function Navbar() {
  const { cart } = useCart();
  const { collapse, handleCollapse, toggleSiderbarWidth } = useNav();
  const { onOpen } = useDrawer();
  const [swipeModal, setSwipeModal] = useState(false);
  const { childBgColor, textColor } = useThemeColor();

  // Enhanced colors
  const hoverColor = useColorModeValue('blue.500', 'blue.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconButtonBg = useColorModeValue('gray.100', 'gray.700');
  const iconButtonHoverBg = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
      <Box
        as='nav'
        bg={childBgColor}
        color={textColor}
        py={3}
        px={{ base: 2, md: 4 }}
        position='sticky'
        top={0}
        right={0}
        zIndex={100}
        borderRadius='xl'
        m={2}
        boxShadow='sm'
        transition='all 0.3s ease'
      >
        {/* Mobile View */}
        <Box display={{ base: 'block', xxl: 'none' }}>
          <Flex justify='space-between' align='center' mb={3}>
            <IconButton
              icon={<AlignJustify />}
              onClick={onOpen}
              variant='ghost'
              aria-label='Open sidebar'
            />
            <HStack spacing={2}>
              <Icon as={Rocket} boxSize={5} />
              <Text fontWeight='bold'>Admin</Text>
            </HStack>
            <IconButton
              icon={<Ellipsis />}
              onClick={handleCollapse}
              variant='ghost'
              aria-label='Toggle menu'
            />
          </Flex>

          <MotionBox
            initial={{ height: 0, opacity: 0 }}
            animate={
              collapse
                ? { opacity: 1, height: 'auto' }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            overflow='hidden'
          >
            <Divider my={4} />
            <Flex align='center' justify='space-between' mt={5}>
              <IconButton
                icon={<AlignJustify />}
                onClick={() => setSwipeModal(true)}
                variant='ghost'
                aria-label='Open side menu'
              />
              <HStack spacing={4}>
                <Popover placement='bottom'>
                  <PopoverTrigger>
                    <IconButton
                      icon={<SearchX />}
                      variant='ghost'
                      aria-label='Search'
                    />
                  </PopoverTrigger>
                  <PopoverContent bg={childBgColor} borderColor={borderColor}>
                    <PopoverArrow />
                    <PopoverBody>
                      <SearchDropdown />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <BlinkingIcon />
                <ThemeToggleButton />

                <Link href='/dashboard/ecommerce/checkout' passHref>
                  <CartWithBadge cartLength={cart.length} />
                </Link>

                <Username />
              </HStack>
            </Flex>
          </MotionBox>
        </Box>

        {/* Desktop View */}
        <Flex
          justify='space-between'
          align='center'
          display={{ base: 'none', xxl: 'flex' }}
        >
          <HStack spacing={4}>
            <IconButton
              icon={<ArrowUpWideNarrow />}
              variant='ghost'
              aria-label='Toggle sidebar width'
              onClick={toggleSiderbarWidth}
              bg={iconButtonBg}
              _hover={{ bg: iconButtonHoverBg }}
              size='sm'
            />

            <Menu>
              <MenuButton
                bg='transparent'
                color='gray.500'
                _hover={{ bg: 'transparent', color: hoverColor }}
                as={Button}
                rightIcon={<ChevronDown />}
              >
                Apps
              </MenuButton>
              <MenuList
                display='flex'
                gap={5}
                bg={childBgColor}
                borderRadius='xl'
                borderColor={borderColor}
                p={4}
                boxShadow='lg'
              >
                <MenuGroup>
                  <MenuItem
                    as={Link}
                    href='/dashboard/chat'
                    display='flex'
                    alignItems='center'
                    gap={3}
                    bg={childBgColor}
                    _hover={{ color: hoverColor }}
                    px={4}
                    py={2}
                    borderRadius='md'
                  >
                    <Icon as={MessagesSquare} boxSize={4} /> Chat App
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    href='/dashboard/email'
                    display='flex'
                    alignItems='center'
                    gap={3}
                    bg={childBgColor}
                    _hover={{ color: hoverColor }}
                    px={4}
                    py={2}
                    borderRadius='md'
                  >
                    <Icon as={Mails} boxSize={4} /> Email App
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem
                    as={Link}
                    href='/dashboard/profile'
                    display='flex'
                    alignItems='center'
                    gap={3}
                    bg={childBgColor}
                    _hover={{ color: hoverColor }}
                    px={4}
                    py={2}
                    borderRadius='md'
                  >
                    <Icon as={UserPen} boxSize={4} /> User Profile
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    href='/dashboard/calendar'
                    display='flex'
                    alignItems='center'
                    gap={3}
                    bg={childBgColor}
                    _hover={{ color: hoverColor }}
                    px={4}
                    py={2}
                    borderRadius='md'
                  >
                    <Icon as={CalendarDays} boxSize={4} /> Calendar
                  </MenuItem>
                </MenuGroup>
                <Center height='100px'>
                  <Divider orientation='vertical' />
                </Center>
                <Box>
                  <Text fontWeight='bold' mb={2}>
                    Quick links
                  </Text>
                  <ChakraLink
                    as={Link}
                    href='/dashboard/pricing'
                    display='block'
                    _hover={{ color: hoverColor }}
                  >
                    Pricing page
                  </ChakraLink>
                </Box>
              </MenuList>
            </Menu>

            <HStack spacing={4} ml={2}>
              <ChakraLink
                as={Link}
                href='/dashboard/chat'
                _hover={{ color: hoverColor }}
                fontWeight='medium'
              >
                Chat
              </ChakraLink>
              <ChakraLink
                as={Link}
                href='/dashboard/calendar'
                _hover={{ color: hoverColor }}
                fontWeight='medium'
              >
                Calendar
              </ChakraLink>
              <ChakraLink
                as={Link}
                href='/dashboard/email'
                _hover={{ color: hoverColor }}
                fontWeight='medium'
              >
                Email
              </ChakraLink>
            </HStack>
          </HStack>

          <HStack spacing={4}>
            <SearchDropdown />
            <BlinkingIcon />
            <ThemeToggleButton />
            <Box>
              <Link href='/dashboard/ecommerce/checkout' passHref>
                <CartWithBadge cartLength={cart.length} />
              </Link>
            </Box>
            <Username />
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {swipeModal && (
          <>
            <MotionBox
              position='fixed'
              inset={0}
              bg='blackAlpha.600'
              onClick={() => setSwipeModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              zIndex={1000}
            />

            <MotionBox
              position='fixed'
              top={0}
              right={0}
              zIndex={1001}
              width='320px'
              height='100vh'
              bg={childBgColor}
              boxShadow='xl'
              p={6}
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Flex justify='flex-end' mb={6}>
                <IconButton
                  icon={<X />}
                  onClick={() => setSwipeModal(false)}
                  variant='ghost'
                  aria-label='Close menu'
                />
              </Flex>

              <Box as='ul'>
                <Box as='li' mb={4}>
                  <Accordion allowToggle width='100%'>
                    <AccordionItem borderWidth='0'>
                      <h2>
                        <AccordionButton
                          _hover={{ bg: iconButtonHoverBg }}
                          borderRadius='md'
                        >
                          <Box
                            as='span'
                            flex='1'
                            textAlign='left'
                            fontWeight='medium'
                          >
                            Apps
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <ListParent spacing={3}>
                          <ListItem>
                            <ListIcon as={MessagesSquare} color={hoverColor} />
                            <ChakraLink
                              as={Link}
                              href='/dashboard/chat'
                              _hover={{ color: hoverColor }}
                            >
                              Chat App
                            </ChakraLink>
                          </ListItem>
                          <ListItem>
                            <ListIcon as={Mails} color={hoverColor} />
                            <ChakraLink
                              as={Link}
                              href='/dashboard/email'
                              _hover={{ color: hoverColor }}
                            >
                              Email App
                            </ChakraLink>
                          </ListItem>
                          <ListItem>
                            <ListIcon as={UserPen} color={hoverColor} />
                            <ChakraLink
                              as={Link}
                              href='/dashboard/profile'
                              _hover={{ color: hoverColor }}
                            >
                              User Profile
                            </ChakraLink>
                          </ListItem>
                          <ListItem>
                            <ListIcon as={CalendarDays} color={hoverColor} />
                            <ChakraLink
                              as={Link}
                              href='/dashboard/calendar'
                              _hover={{ color: hoverColor }}
                            >
                              Calendar
                            </ChakraLink>
                          </ListItem>
                        </ListParent>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>

                <Box
                  as='li'
                  py={2}
                  px={4}
                  _hover={{ bg: iconButtonHoverBg }}
                  borderRadius='md'
                  mb={2}
                >
                  <ChakraLink
                    as={Link}
                    href='/dashboard/chat'
                    display='block'
                    _hover={{ color: hoverColor }}
                  >
                    Chat
                  </ChakraLink>
                </Box>

                <Box
                  as='li'
                  py={2}
                  px={4}
                  _hover={{ bg: iconButtonHoverBg }}
                  borderRadius='md'
                  mb={2}
                >
                  <ChakraLink
                    as={Link}
                    href='/dashboard/calendar'
                    display='block'
                    _hover={{ color: hoverColor }}
                  >
                    Calendar
                  </ChakraLink>
                </Box>

                <Box
                  as='li'
                  py={2}
                  px={4}
                  _hover={{ bg: iconButtonHoverBg }}
                  borderRadius='md'
                >
                  <ChakraLink
                    as={Link}
                    href='/dashboard/email'
                    display='block'
                    _hover={{ color: hoverColor }}
                  >
                    Email
                  </ChakraLink>
                </Box>
              </Box>
            </MotionBox>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
