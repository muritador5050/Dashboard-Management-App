'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Flower, TableOfContents } from 'lucide-react';
import {
  useDisclosure,
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
  Text,
  Box,
  Image,
  Center,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import Search from '@/components/Search';
import { Product } from '@/lib/utils';
import { UnicodeStarRating } from '@/components/StarRating';
import { useCart } from '@/context/ThemeContext';
import { useThemeColor } from '@/lib/themeUtil';

//Shop
export default function Shop() {
  const { childBgColor, textColor } = useThemeColor();
  const { addToCart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedByPrice, setSelectedByPrice] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchItem, setSearchItem] = useState('');
  //Reset function
  function handleReset() {
    setSelectedCategory('all');
    setSelectedByPrice('all');
  }

  //SearchInput function
  const handleOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearchItem(search);

    if (!search) {
      const allProducts = await fetchProductsByCategory(selectedCategory);
      setProducts(filterProductsByPrice(allProducts, selectedByPrice));
      return;
    }

    const filteredProducts = await searchProductByCategory(
      selectedCategory,
      search
    );
    setProducts(filteredProducts);
  };

  //Fetch products
  const fetchProductsByCategory = async (category: string) => {
    try {
      const url =
        category === 'all'
          ? 'https://dummyjson.com/products'
          : `https://dummyjson.com/products/category/${category}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          'Failed to fetch. Please check your internet connection!'
        );
      }
      const data: { products: Product[] } = await response.json();
      return data.products;
    } catch (error) {
      console.error('error in network' + error);
      return [];
    }
  };

  //Filter products by price
  const filterProductsByPrice = (products: Product[], priceRange: string) => {
    if (priceRange === 'all') return products;

    return products.filter((product) => {
      if (priceRange === '0-15')
        return product.price >= 0 && product.price <= 15;
      if (priceRange === '15-50')
        return product.price > 15 && product.price <= 50;
      if (priceRange === '50-100')
        return product.price > 50 && product.price <= 100;
      if (priceRange === 'Over100') return product.price > 100;
      return true;
    });
  };

  //SearchQuery
  const searchProductByCategory = useCallback(
    async (category: string, searchQuery: string) => {
      try {
        const allProducts = await fetchProductsByCategory(category);

        return allProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } catch (error) {
        console.error('Error searching products:', error);
        return [];
      }
    },
    []
  );

  //Effect
  useEffect(() => {
    const fetchAndSearchProducts = async () => {
      if (!searchItem) {
        const allProducts = await fetchProductsByCategory(selectedCategory);
        setProducts(filterProductsByPrice(allProducts, selectedByPrice));
      } else {
        const searchResults = await searchProductByCategory(
          selectedCategory,
          searchItem
        );
        setProducts(searchResults);
      }
    };

    fetchAndSearchProducts();
  }, [searchItem, selectedCategory, selectedByPrice, searchProductByCategory]);

  return (
    <Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={childBgColor} color={textColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
          <DrawerBody>
            <div className='flex flex-col gap-7 p-5'>
              <section className='flex flex-col gap-5 '>
                <h1>By Category</h1>
                <RadioGroup
                  onChange={setSelectedCategory}
                  value={selectedCategory}
                >
                  <Stack spacing={3}>
                    <Radio value='all'>All</Radio>
                    <Radio value='beauty'>Beauty</Radio>
                    <Radio value='skin-care'>Skin-care</Radio>
                    <Radio value='fragrances'>Fragrances</Radio>
                    <Radio value='groceries'>Groceries</Radio>
                    <Radio value='furniture'>Furniture</Radio>
                    <Radio value='smartphones'>Smartphones</Radio>
                    <Radio value='mens-shirts'>Mens-shirt</Radio>
                    <Radio value='womens-dresses'>Womens-shirt</Radio>
                    <Radio value='sports-accessories'>Sport-accessories</Radio>
                  </Stack>
                </RadioGroup>
              </section>
              <section className='border-b-4 border-white'>
                <h1>By Pricing</h1>
                <RadioGroup
                  onChange={setSelectedByPrice}
                  value={selectedByPrice}
                >
                  <Stack spacing={3}>
                    <Radio value='all'>All</Radio>
                    <Radio value='0-15'>0-15</Radio>
                    <Radio value='15-50'>15-50</Radio>
                    <Radio value='50-100'>50-100</Radio>
                    <Radio value='Over100'>Over100</Radio>
                  </Stack>
                </RadioGroup>
              </section>
              <section className='my-3'>
                <div className='flex items-center gap-3 break-all'>
                  <div className='w-7 h-7 rounded-full bg-red-500'></div>
                  <div className='w-7 h-7 rounded-full bg-blue-500'></div>
                  <div className='w-7 h-7 rounded-full bg-purple-500'></div>
                  <div className='w-7 h-7 rounded-full bg-green-500'></div>
                  <div className='w-7 h-7 rounded-full bg-yellow-500'></div>
                  <div className='w-7 h-7 rounded-full bg-brown-500'></div>
                </div>
              </section>
              <Button colorScheme='cyan' onClick={handleReset}>
                Reset filter
              </Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex
        // className='flex gap-3 rounded-3xl'
        bg={childBgColor}
        color={textColor}
        borderRadius='3xl'
        gap={3}
      >
        <div
          className='flex flex-col gap-7 p-5  max-[980px]:hidden grow-1'
          style={{ borderTopLeftRadius: '30px' }}
        >
          <section className='flex flex-col gap-5 '>
            <h1>By Category</h1>
            <RadioGroup onChange={setSelectedCategory} value={selectedCategory}>
              <Stack spacing={3}>
                <Radio value='all'>All</Radio>
                <Radio value='beauty'>Beauty</Radio>
                <Radio value='skin-care'>Skin-care</Radio>
                <Radio value='fragrances'>Fragrances</Radio>
                <Radio value='groceries'>Groceries</Radio>
                <Radio value='furniture'>Furniture</Radio>
                <Radio value='smartphones'>Smartphones</Radio>
                <Radio value='mens-shirts'>Mens-shirt</Radio>
                <Radio value='womens-dresses'>Womens-shirt</Radio>
                <Radio value='sports-accessories'>Sport-accessories</Radio>
              </Stack>
            </RadioGroup>
          </section>
          <section className='border-b-4 border-white'>
            <h1>By Pricing</h1>
            <RadioGroup onChange={setSelectedByPrice} value={selectedByPrice}>
              <Stack spacing={3}>
                <Radio value='all'>All</Radio>
                <Radio value='0-15'>0-15</Radio>
                <Radio value='15-50'>15-50</Radio>
                <Radio value='50-100'>50-100</Radio>
                <Radio value='Over100'>Over100</Radio>
              </Stack>
            </RadioGroup>
          </section>
          <section className='my-3'>
            <div className='flex items-center gap-3 break-all'>
              <div className='w-7 h-7 rounded-full bg-red-500'></div>
              <div className='w-7 h-7 rounded-full bg-blue-500'></div>
              <div className='w-7 h-7 rounded-full bg-purple-500'></div>
              <div className='w-7 h-7 rounded-full bg-green-500'></div>
              <div className='w-7 h-7 rounded-full bg-yellow-500'></div>
              <div className='w-7 h-7 rounded-full bg-brown-500'></div>
            </div>
          </section>
          <Button colorScheme='cyan' onClick={handleReset}>
            Reset filter
          </Button>
        </div>
        <div className=' grow-7 p-5'>
          <div className='flex justify-between items-center mb-9'>
            <span onClick={onOpen} className='min-[980px]:hidden'>
              <TableOfContents />
            </span>
            <h1 className='max-[980px]:hidden'>Product</h1>
            <Search
              value={searchItem}
              placeholder='Try search by title...'
              onChange={handleOnchange}
            />
          </div>
          <div className='min-[980px]:grid grid-cols-2 gap-5'>
            {products.length === 0 ? (
              <Text className='text-center text-xl'>Please wait...</Text>
            ) : (
              <>
                {products.map((product) => {
                  return (
                    <Box
                      key={product.id}
                      sx={{
                        transition: 'transform 0.2s ease-in-out',
                        _hover: { transform: 'translateY(-10px)' },
                      }}
                      bg='rgba(17, 28, 45, 0.4)'
                      boxShadow='0 10px 1em black'
                      borderRadius='2xl'
                      paddingBottom={3}
                      cursor='pointer'
                      className='max-[980px]:mb-9'
                    >
                      <Stack spacing={3}>
                        <Box position='relative'>
                          <Link
                            href={{
                              pathname: `/dashboard/ecommerce/details`,
                              query: { id: product.id },
                            }}
                          >
                            <Image
                              src={product.images[0]}
                              alt='product'
                              objectFit='cover'
                              width='100%'
                              maxH='50vh'
                              borderTopRadius='2xl'
                              background='whitesmoke'
                            />
                          </Link>
                          <Center
                            background='skyblue'
                            position='absolute'
                            width='50px'
                            height='50px'
                            rounded='full'
                            bottom='0.5'
                            right='0.5'
                          >
                            <Tooltip
                              hasArrow
                              placement='top'
                              label='Add To Cart'
                              background='white'
                              color='black'
                            >
                              <Flower
                                size={32}
                                onClick={() => addToCart(product)}
                              />
                            </Tooltip>
                          </Center>
                        </Box>
                        <Text px={3} fontWeight='bold' fontSize='lg'>
                          {product.title}
                        </Text>
                        <Text px={3}>Category: {product.category}</Text>
                        <Text px={3}>Gender: {product.brand}</Text>
                        <Text px={3}>Price: ${product.price}</Text>
                        <Text px={3}>
                          Review: <UnicodeStarRating rating={product.rating} />
                        </Text>
                      </Stack>
                    </Box>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </Flex>
    </Box>
  );
}
