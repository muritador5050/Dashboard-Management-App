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
  Button,
} from '@chakra-ui/react';
import Search from '@/components/Search';

const products = [
  { id: 1, name: 'Product A', category: 'Fashion', gender: 'Men', price: 30 },
  { id: 2, name: 'Product B', category: 'Fashion', gender: 'Women', price: 70 },
  { id: 3, name: 'Product C', category: 'Books', gender: 'Kids', price: 120 },
  {
    id: 4,
    name: 'Product D',
    category: 'Electronics',
    gender: 'Men',
    price: 250,
  },
  { id: 5, name: 'Product E', category: 'Toys', gender: 'Women', price: 40 },
  { id: 6, name: 'Product F', category: 'Fashion', gender: 'All', price: 150 },
];
export default function Shop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectByGender, setSelectByGender] = useState('All');
  const [selectByPrice, setSelectByPrice] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All'); // New state for category
  const [selectedSort, setSelectedSort] = useState('Newest'); // New state for sort

  const categoryOptions = [
    { label: 'All', icon: <Shapes /> },
    { label: 'Fashion', icon: <Webhook /> },
    { label: 'Books', icon: <BookOpenText /> },
    { label: 'Toys', icon: <Smile /> },
    { label: 'Electronics', icon: <Laptop /> },
  ];

  const sortOptions = [
    { label: 'Newest', icon: <Shapes /> },
    { label: 'Price:High-Low', icon: <Webhook /> },
    { label: 'Price:Low-High', icon: <BookOpenText /> },
    { label: 'Discounted', icon: <Smile /> },
  ];

  const filteredByCategory =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const filteredByGenderAndPrice = filteredByCategory.filter((product) => {
    const genderMatch =
      selectByGender === 'All' || product.gender === selectByGender;
    const priceMatch =
      selectByPrice === 'All' ||
      (selectByPrice === '0-50' && product.price >= 0 && product.price <= 50) ||
      (selectByPrice === '50-100' &&
        product.price > 50 &&
        product.price <= 100) ||
      (selectByPrice === '100-200' &&
        product.price > 100 &&
        product.price <= 200) ||
      (selectByPrice === 'Over200' && product.price > 200);

    return genderMatch && priceMatch;
  });
  const sortedProducts = [...filteredByGenderAndPrice];

  if (selectedSort === 'Price:High-Low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'Price:Low-High') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'Discounted') {
    sortedProducts.sort((a, b) => {
      if (a && !b) {
        return -1;
      } else if (!a && b) {
        return 1;
      } else {
        return 0;
      }
    });

    // Example: If 'discount' is a number, sort by discount percentage (descending)
    // sortedProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  } else {
    // Newest: return the original order (no sorting needed)
  }
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
                {categoryOptions.map((option) => (
                  <li
                    key={option.label}
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => setSelectedCategory(option.label)}
                  >
                    {option.icon} {option.label}
                  </li>
                ))}
              </ul>
            </section>
            <section className='border-b-4 border-white'>
              <h1>Sort by</h1>
              <ul className='flex flex-col justify-around'>
                {sortOptions.map((option) => (
                  <li
                    key={option.label}
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => setSelectedSort(option.label)}
                  >
                    {option.icon} {option.label}
                  </li>
                ))}
              </ul>
            </section>
            <section className='border-b-4 border-white'>
              <h1>By Gender</h1>
              <RadioGroup onChange={setSelectByGender} value={selectByGender}>
                <Stack spacing={3}>
                  <Radio value='All'>All</Radio>
                  <Radio value='Men'>Men</Radio>
                  <Radio value='Women'>Women</Radio>
                  <Radio value='Kids'>Kids</Radio>
                </Stack>
              </RadioGroup>
            </section>
            <section className='border-b-4 border-white'>
              <h1>By Pricing</h1>
              <RadioGroup onChange={setSelectByPrice} value={selectByPrice}>
                <Stack spacing={3}>
                  <Radio value='All'>All</Radio>
                  <Radio value='0-50'>0-50</Radio>
                  <Radio value='50-100'>50-100</Radio>
                  <Radio value='100-200'>100-200</Radio>
                  <Radio value='Over200'>Over200</Radio>
                </Stack>
              </RadioGroup>
            </section>
            <section className='border-b-4 border-white'>
              <h1>By Color</h1>
              <div className='flex items-center gap-3 break-all'>
                <div className='w-7 h-7 rounded-full bg-red-500'></div>
                <div className='w-7 h-7 rounded-full bg-blue-500'></div>
                <div className='w-7 h-7 rounded-full bg-purple-500'></div>
                <div className='w-7 h-7 rounded-full bg-green-500'></div>
                <div className='w-7 h-7 rounded-full bg-yellow-500'></div>
                <div className='w-7 h-7 rounded-full bg-brown-500'></div>
              </div>
            </section>
            <Button colorScheme='cyan'>Reset filter</Button>
          </div>
          <div className='bg-blue-500 grow-7'>
            <div className='flex justify-between items-center'>
              <span onClick={onOpen} className='min-[980px]:hidden'>
                <TableOfContents />
              </span>
              <h1 className='max-[980px]:hidden'>Product</h1>
              <Search />
            </div>
            {/* <div>
            
              <h2>Selected Category: {selectedCategory}</h2>
              <h2>Selected Sort: {selectedSort}</h2>
              <h2>Selected Gender: {selectByGender}</h2>
              <h2>Selected Price: {selectByPrice}</h2>
            
            </div> */}
            {sortedProducts.map((product) => (
              <div key={product.id}>
                <p>{product.name}</p>
                <p>Category: {product.category}</p>
                <p>Gender: {product.gender}</p>
                <p>Price: {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
