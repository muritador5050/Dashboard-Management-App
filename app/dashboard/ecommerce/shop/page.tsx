'use client';
import React, { useEffect, useState } from 'react';
import { Dot, TableOfContents } from 'lucide-react';
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
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import Search from '@/components/Search';
import { Product } from '@/lib/utils';
import { UnicodeStarRating } from '@/components/TableComponent';

export default function Shop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedByPrice, setSelectedByPrice] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchItem, setSearchItem] = useState('');
  function handleReset() {
    setSelectedCategory('all');
    setSelectedByPrice('all');
  }
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearchItem(search);

    const filterItems = products.filter((product) =>
      product.category.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filterItems);
  };

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
      console.error('Error fetching products:', error);
      return [];
    }
  };

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
  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      const allProducts = await fetchProductsByCategory(selectedCategory);
      const filteredProducts = filterProductsByPrice(
        allProducts,
        selectedByPrice
      );
      setProducts(filteredProducts);
    };

    fetchAndFilterProducts();
  }, [selectedCategory, selectedByPrice]);

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
          <div className='flex flex-col gap-5  border-r-4 border-purple-500 max-[980px]:hidden grow-1'>
            <section className='flex flex-col gap-5 border-b-4 border-white'>
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
            <Button colorScheme='cyan' onClick={handleReset}>
              Reset filter
            </Button>
          </div>
          <div className=' grow-7'>
            <div className='flex justify-between items-center mb-7'>
              <span onClick={onOpen} className='min-[980px]:hidden'>
                <TableOfContents />
              </span>
              <h1 className='max-[980px]:hidden'>Product</h1>
              <Search
                value={searchItem}
                placeholder='Try search by category...'
                onChange={handleOnchange}
              />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              {products.map((product) => (
                <Box
                  key={product.id}
                  borderWidth='1px'
                  borderRadius='lg'
                  padding='4'
                  marginBottom='2'
                >
                  <Stack spacing={2}>
                    <Image
                      src={product.images[0]}
                      alt='product'
                      objectFit='cover'
                      boxSize='300px'
                    />
                    <Text fontWeight='bold' fontSize='lg'>
                      {product.title}
                    </Text>
                    <Text>Category: {product.category}</Text>
                    <Text>Gender: {product.brand}</Text>
                    <Text>Price: ${product.price}</Text>
                    <Text>
                      Review: <UnicodeStarRating rating={product.rating} />
                    </Text>
                  </Stack>
                </Box>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
