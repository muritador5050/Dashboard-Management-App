'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
import { Flower, TableOfContents } from 'lucide-react';
import Link from 'next/link';

import Search from '@/components/Search';
import { Product } from '@/lib/utils';
import { UnicodeStarRating } from '@/components/StarRating';
import { useCart } from '@/context/ThemeContext';
import { useThemeColor } from '@/lib/themeUtil';

export default function Shop() {
  const { childBgColor, textColor } = useThemeColor();
  const { addToCart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedByPrice, setSelectedByPrice] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchItem, setSearchItem] = useState('');

  // Fetch all or category-based products
  const fetchProductsByCategory = async (category: string) => {
    try {
      const url =
        category === 'all'
          ? 'https://dummyjson.com/products'
          : `https://dummyjson.com/products/category/${category}`;
      const response = await fetch(url);
      const data: { products: Product[] } = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  const filterProductsByPrice = (products: Product[], priceRange: string) => {
    switch (priceRange) {
      case '0-15':
        return products.filter((p) => p.price <= 15);
      case '15-50':
        return products.filter((p) => p.price > 15 && p.price <= 50);
      case '50-100':
        return products.filter((p) => p.price > 50 && p.price <= 100);
      case 'Over100':
        return products.filter((p) => p.price > 100);
      default:
        return products;
    }
  };

  const searchProductByCategory = useCallback(
    async (category: string, searchQuery: string) => {
      const allProducts = await fetchProductsByCategory(category);
      return allProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    []
  );

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchItem(value);

    if (!value) {
      const allProducts = await fetchProductsByCategory(selectedCategory);
      return setProducts(filterProductsByPrice(allProducts, selectedByPrice));
    }

    const searched = await searchProductByCategory(selectedCategory, value);
    setProducts(searched);
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setSelectedByPrice('all');
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = !searchItem
        ? await fetchProductsByCategory(selectedCategory)
        : await searchProductByCategory(selectedCategory, searchItem);
      setProducts(filterProductsByPrice(result, selectedByPrice));
    };
    fetchData();
  }, [selectedCategory, selectedByPrice, searchItem, searchProductByCategory]);

  const categoryOptions = [
    'all',
    'beauty',
    'skin-care',
    'fragrances',
    'groceries',
    'furniture',
    'smartphones',
    'mens-shirts',
    'womens-dresses',
    'sports-accessories',
  ];

  const priceOptions = ['all', '0-15', '15-50', '50-100', 'Over100'];

  const renderFilterSection = () => (
    <>
      <Text fontWeight='bold' mb={2}>
        By Category
      </Text>
      <RadioGroup value={selectedCategory} onChange={setSelectedCategory}>
        <Stack spacing={2}>
          {categoryOptions.map((cat) => (
            <Radio key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Box mt={6}>
        <Text fontWeight='bold' mb={2}>
          By Price
        </Text>
        <RadioGroup value={selectedByPrice} onChange={setSelectedByPrice}>
          <Stack spacing={2}>
            {priceOptions.map((price) => (
              <Radio key={price} value={price}>
                {price}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>

      <Box mt={6}>
        <Text fontWeight='bold' mb={2}>
          Colors
        </Text>
        <Flex gap={2}>
          {['red', 'blue', 'purple', 'green', 'yellow', 'brown'].map(
            (color) => (
              <Box
                key={color}
                w={6}
                h={6}
                borderRadius='full'
                bg={`${color}.500`}
              />
            )
          )}
        </Flex>
      </Box>

      <Button mt={6} colorScheme='cyan' onClick={handleReset}>
        Reset Filter
      </Button>
    </>
  );

  return (
    <Box>
      {/* Drawer for mobile filter */}
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={childBgColor} color={textColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Filter</DrawerHeader>
          <DrawerBody>{renderFilterSection()}</DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex
        gap={4}
        p={4}
        bg={childBgColor}
        color={textColor}
        borderRadius='2xl'
      >
        {/* Sidebar */}
        <Box
          display={{ base: 'none', md: 'block' }}
          minW='250px'
          borderRight='1px solid gray'
          pr={4}
        >
          {renderFilterSection()}
        </Box>

        {/* Products Section */}
        <Box flex='1'>
          <Flex justify='space-between' mb={4} align='center'>
            <Box display={{ base: 'block', md: 'none' }} onClick={onOpen}>
              <TableOfContents />
            </Box>
            <Text fontWeight='bold' display={{ base: 'none', md: 'block' }}>
              Products
            </Text>
            <Search
              placeholder='Try search by title...'
              value={searchItem}
              onChange={handleSearchChange}
            />
          </Flex>

          <Box
            display='grid'
            gridTemplateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
            }}
            gap={6}
          >
            {products.length === 0 ? (
              <Text textAlign='center'>Loading or no results found.</Text>
            ) : (
              products.map((product) => (
                <Box
                  key={product.id}
                  bg={childBgColor}
                  boxShadow='0 10px 1em black'
                  borderRadius='2xl'
                  pb={4}
                  transition='0.3s'
                  _hover={{ transform: 'translateY(-5px)' }}
                >
                  <Link
                    href={{
                      pathname: `/dashboard/ecommerce/details`,
                      query: { id: product.id },
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      objectFit='cover'
                      w='100%'
                      maxH='250px'
                      borderTopRadius='2xl'
                      bg='white'
                    />
                  </Link>
                  <Center mt={-6} mr={2} justifyContent='flex-end'>
                    <Tooltip label='Add To Cart' hasArrow>
                      <Box
                        bg='skyblue'
                        w='50px'
                        h='50px'
                        borderRadius='full'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        onClick={() => addToCart(product)}
                        cursor='pointer'
                      >
                        <Flower size={28} />
                      </Box>
                    </Tooltip>
                  </Center>
                  <Stack spacing={1} px={3} mt={3}>
                    <Text fontWeight='bold'>{product.title}</Text>
                    <Text>Category: {product.category}</Text>
                    <Text>Brand: {product.brand}</Text>
                    <Text>Price: ${product.price}</Text>
                    <Box>
                      Review: <UnicodeStarRating rating={product.rating} />
                    </Box>
                  </Stack>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
