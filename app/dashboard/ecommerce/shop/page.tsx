'use client';
import React, { useState } from 'react';
import {
  BookOpenText,
  Dot,
  Laptop,
  Shapes,
  Smile,
  TableOfContents,
  Webhook,
} from 'lucide-react';
import {
  useDisclosure,
  Link,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'; // Add Button import
import Search from '@/components/Search';

//Shop
export default function Shop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectByGender, setSelectByGender] = useState('All');
  return (
    <div>
      <p className='text-3xl'>Shop</p>
      <div className='flex items-center'>
        <Link href='/dashboard' _hover={{ color: 'blue.500' }}>
          Home
        </Link>
        <Dot size={28} />
        <p>Shop</p>
      </div>
      <div>
        <>
          <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
              <DrawerBody>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
        <div className='flex p-5 bg-custom-bg rounded-xl'>
          <div className='bg-red-400 border-r-4 border-purple-500 max-[980px]:hidden grow-1'>
            <section className='border-b-4 border-white'>
              <h1>Filter by category</h1>
              <ul className='flex flex-col justify-around'>
                <li className='flex items-center gap-3'>
                  {' '}
                  <Shapes /> All
                </li>
                <li className='flex items-center gap-3'>
                  {' '}
                  <Webhook /> Fashion
                </li>
                <li className='flex items-center gap-3'>
                  {' '}
                  <BookOpenText /> Books
                </li>
                <li className='flex items-center gap-3'>
                  {' '}
                  <Smile /> Toys
                </li>
                <li className='flex items-center gap-3'>
                  {' '}
                  <Laptop /> Electronics
                </li>
              </ul>
            </section>
            <section className='border-b-4 border-white'>
              <h1>Sort by</h1>
              <ul className='flex flex-col justify-around'>
                <li className='flex items-center gap-3'>
                  {' '}
                  <Shapes /> Newest
                </li>
                <li className='flex items-center gap-3'>
                  {' '}
                  <Webhook /> Price:High-Low
                </li>
                <li className='flex items-center gap-3'>
                  {' '}
                  <BookOpenText /> Price:Low-High
                </li>
                <li className='flex items-center gap-3'>
                  {' '}
                  <Smile /> Discounted
                </li>
              </ul>
            </section>
            <section className='border-b-4 border-white'>
              <h1>Sort by</h1>
              <RadioGroup onChange={setSelectByGender} value={selectByGender}>
                <Stack spacing={3}>
                  <Radio value='All'>All</Radio>
                  <Radio value='Men'>Men</Radio>
                  <Radio value='Women'>Women</Radio>
                  <Radio value='Kids'>Kids</Radio>
                </Stack>
              </RadioGroup>
            </section>
          </div>
          <div className=' bg-blue-500 grow-7'>
            <div className='flex justify-between items-center'>
              <span onClick={onOpen} className='min-[980px]:hidden'>
                <TableOfContents />
              </span>
              <h1 className='max-[980px]:hidden'>Product</h1>
              <Search />
            </div>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
