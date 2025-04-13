// 'use client';
// import React, { useCallback, useEffect, useState } from 'react';
// import { Flower, TableOfContents } from 'lucide-react';
// import {
//   useDisclosure,
//   Drawer,
//   DrawerBody,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   Radio,
//   RadioGroup,
//   Stack,
//   Button,
//   Text,
//   Box,
//   Image,
//   Center,
//   Tooltip,
//   Flex,
// } from '@chakra-ui/react';
// import Link from 'next/link';
// import Search from '@/components/Search';
// import { Product } from '@/lib/utils';
// import { UnicodeStarRating } from '@/components/StarRating';
// import { useCart } from '@/context/ThemeContext';
// import { useThemeColor } from '@/lib/themeUtil';

// //Shop
// export default function Shop() {
//   const { childBgColor, textColor } = useThemeColor();
//   const { addToCart } = useCart();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedByPrice, setSelectedByPrice] = useState('all');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [searchItem, setSearchItem] = useState('');
//   //Reset function
//   function handleReset() {
//     setSelectedCategory('all');
//     setSelectedByPrice('all');
//   }

//   //SearchInput function
//   const handleOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const search = e.target.value;
//     setSearchItem(search);

//     if (!search) {
//       const allProducts = await fetchProductsByCategory(selectedCategory);
//       setProducts(filterProductsByPrice(allProducts, selectedByPrice));
//       return;
//     }

//     const filteredProducts = await searchProductByCategory(
//       selectedCategory,
//       search
//     );
//     setProducts(filteredProducts);
//   };

//   //Fetch products
//   const fetchProductsByCategory = async (category: string) => {
//     try {
//       const url =
//         category === 'all'
//           ? 'https://dummyjson.com/products'
//           : `https://dummyjson.com/products/category/${category}`;

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(
//           'Failed to fetch. Please check your internet connection!'
//         );
//       }
//       const data: { products: Product[] } = await response.json();
//       return data.products;
//     } catch (error) {
//       console.error('error in network' + error);
//       return [];
//     }
//   };

//   //Filter products by price
//   const filterProductsByPrice = (products: Product[], priceRange: string) => {
//     if (priceRange === 'all') return products;

//     return products.filter((product) => {
//       if (priceRange === '0-15')
//         return product.price >= 0 && product.price <= 15;
//       if (priceRange === '15-50')
//         return product.price > 15 && product.price <= 50;
//       if (priceRange === '50-100')
//         return product.price > 50 && product.price <= 100;
//       if (priceRange === 'Over100') return product.price > 100;
//       return true;
//     });
//   };

//   //SearchQuery
//   const searchProductByCategory = useCallback(
//     async (category: string, searchQuery: string) => {
//       try {
//         const allProducts = await fetchProductsByCategory(category);

//         return allProducts.filter((product) =>
//           product.title.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       } catch (error) {
//         console.error('Error searching products:', error);
//         return [];
//       }
//     },
//     []
//   );

//   //Effect
//   useEffect(() => {
//     const fetchAndSearchProducts = async () => {
//       if (!searchItem) {
//         const allProducts = await fetchProductsByCategory(selectedCategory);
//         setProducts(filterProductsByPrice(allProducts, selectedByPrice));
//       } else {
//         const searchResults = await searchProductByCategory(
//           selectedCategory,
//           searchItem
//         );
//         setProducts(searchResults);
//       }
//     };

//     fetchAndSearchProducts();
//   }, [searchItem, selectedCategory, selectedByPrice, searchProductByCategory]);

//   return (
//     <Box>
//       <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent bg={childBgColor} color={textColor}>
//           <DrawerCloseButton />
//           <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
//           <DrawerBody>
//             <div className='flex flex-col gap-7 p-5'>
//               <section className='flex flex-col gap-5 '>
//                 <h1>By Category</h1>
//                 <RadioGroup
//                   onChange={setSelectedCategory}
//                   value={selectedCategory}
//                 >
//                   <Stack spacing={3}>
//                     <Radio value='all'>All</Radio>
//                     <Radio value='beauty'>Beauty</Radio>
//                     <Radio value='skin-care'>Skin-care</Radio>
//                     <Radio value='fragrances'>Fragrances</Radio>
//                     <Radio value='groceries'>Groceries</Radio>
//                     <Radio value='furniture'>Furniture</Radio>
//                     <Radio value='smartphones'>Smartphones</Radio>
//                     <Radio value='mens-shirts'>Mens-shirt</Radio>
//                     <Radio value='womens-dresses'>Womens-shirt</Radio>
//                     <Radio value='sports-accessories'>Sport-accessories</Radio>
//                   </Stack>
//                 </RadioGroup>
//               </section>
//               <section className='border-b-4 border-white'>
//                 <h1>By Pricing</h1>
//                 <RadioGroup
//                   onChange={setSelectedByPrice}
//                   value={selectedByPrice}
//                 >
//                   <Stack spacing={3}>
//                     <Radio value='all'>All</Radio>
//                     <Radio value='0-15'>0-15</Radio>
//                     <Radio value='15-50'>15-50</Radio>
//                     <Radio value='50-100'>50-100</Radio>
//                     <Radio value='Over100'>Over100</Radio>
//                   </Stack>
//                 </RadioGroup>
//               </section>
//               <section className='my-3'>
//                 <div className='flex items-center gap-3 break-all'>
//                   <div className='w-7 h-7 rounded-full bg-red-500'></div>
//                   <div className='w-7 h-7 rounded-full bg-blue-500'></div>
//                   <div className='w-7 h-7 rounded-full bg-purple-500'></div>
//                   <div className='w-7 h-7 rounded-full bg-green-500'></div>
//                   <div className='w-7 h-7 rounded-full bg-yellow-500'></div>
//                   <div className='w-7 h-7 rounded-full bg-brown-500'></div>
//                 </div>
//               </section>
//               <Button colorScheme='cyan' onClick={handleReset}>
//                 Reset filter
//               </Button>
//             </div>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//       <Flex
//         // className='flex gap-3 rounded-3xl'
//         bg={childBgColor}
//         color={textColor}
//         borderRadius='3xl'
//         gap={3}
//       >
//         <div
//           className='flex flex-col gap-7 p-5  max-[980px]:hidden grow-1'
//           style={{ borderTopLeftRadius: '30px' }}
//         >
//           <section className='flex flex-col gap-5 '>
//             <h1>By Category</h1>
//             <RadioGroup onChange={setSelectedCategory} value={selectedCategory}>
//               <Stack spacing={3}>
//                 <Radio value='all'>All</Radio>
//                 <Radio value='beauty'>Beauty</Radio>
//                 <Radio value='skin-care'>Skin-care</Radio>
//                 <Radio value='fragrances'>Fragrances</Radio>
//                 <Radio value='groceries'>Groceries</Radio>
//                 <Radio value='furniture'>Furniture</Radio>
//                 <Radio value='smartphones'>Smartphones</Radio>
//                 <Radio value='mens-shirts'>Mens-shirt</Radio>
//                 <Radio value='womens-dresses'>Womens-shirt</Radio>
//                 <Radio value='sports-accessories'>Sport-accessories</Radio>
//               </Stack>
//             </RadioGroup>
//           </section>
//           <section className='border-b-4 border-white'>
//             <h1>By Pricing</h1>
//             <RadioGroup onChange={setSelectedByPrice} value={selectedByPrice}>
//               <Stack spacing={3}>
//                 <Radio value='all'>All</Radio>
//                 <Radio value='0-15'>0-15</Radio>
//                 <Radio value='15-50'>15-50</Radio>
//                 <Radio value='50-100'>50-100</Radio>
//                 <Radio value='Over100'>Over100</Radio>
//               </Stack>
//             </RadioGroup>
//           </section>
//           <section className='my-3'>
//             <div className='flex items-center gap-3 break-all'>
//               <div className='w-7 h-7 rounded-full bg-red-500'></div>
//               <div className='w-7 h-7 rounded-full bg-blue-500'></div>
//               <div className='w-7 h-7 rounded-full bg-purple-500'></div>
//               <div className='w-7 h-7 rounded-full bg-green-500'></div>
//               <div className='w-7 h-7 rounded-full bg-yellow-500'></div>
//               <div className='w-7 h-7 rounded-full bg-brown-500'></div>
//             </div>
//           </section>
//           <Button colorScheme='cyan' onClick={handleReset}>
//             Reset filter
//           </Button>
//         </div>
//         <div className=' grow-7 p-5'>
//           <div className='flex justify-between items-center mb-9'>
//             <span onClick={onOpen} className='min-[980px]:hidden'>
//               <TableOfContents />
//             </span>
//             <Text className='max-[980px]:hidden font-bold'>Product</Text>
//             <Search
//               value={searchItem}
//               placeholder='Try search by title...'
//               onChange={handleOnchange}
//             />
//           </div>
//           <Box className='min-[980px]:grid grid-cols-2 gap-5'>
//             {products.length === 0 ? (
//               <Text className='text-center text-xl'>Please wait...</Text>
//             ) : (
//               <>
//                 {products.map((product) => {
//                   return (
//                     <Box
//                       key={product.id}
//                       sx={{
//                         transition: 'transform 0.2s ease-in-out',
//                         _hover: { transform: 'translateY(-10px)' },
//                       }}
//                       bg='rgba(17, 28, 45, 0.4)'
//                       boxShadow='0 10px 1em black'
//                       borderRadius='2xl'
//                       paddingBottom={3}
//                       cursor='pointer'
//                       className='max-[980px]:mb-9'
//                     >
//                       <Stack spacing={3}>
//                         <Box position='relative'>
//                           <Link
//                             href={{
//                               pathname: `/dashboard/ecommerce/details`,
//                               query: { id: product.id },
//                             }}
//                           >
//                             <Image
//                               src={product.images[0]}
//                               alt='product'
//                               objectFit='cover'
//                               width='100%'
//                               maxH='50vh'
//                               borderTopRadius='2xl'
//                               background='whitesmoke'
//                             />
//                           </Link>
//                           <Center
//                             background='skyblue'
//                             position='absolute'
//                             width='50px'
//                             height='50px'
//                             rounded='full'
//                             bottom='0.5'
//                             right='0.5'
//                           >
//                             <Tooltip
//                               hasArrow
//                               placement='top'
//                               label='Add To Cart'
//                               background='white'
//                               color='black'
//                             >
//                               <Flower
//                                 size={32}
//                                 onClick={() => addToCart(product)}
//                               />
//                             </Tooltip>
//                           </Center>
//                         </Box>
//                         <Text px={3} fontWeight='bold' fontSize='lg'>
//                           {product.title}
//                         </Text>
//                         <Text px={3}>Category: {product.category}</Text>
//                         <Text px={3}>Gender: {product.brand}</Text>
//                         <Text px={3}>Price: ${product.price}</Text>
//                         <Text px={3}>
//                           Review: <UnicodeStarRating rating={product.rating} />
//                         </Text>
//                       </Stack>
//                     </Box>
//                   );
//                 })}
//               </>
//             )}
//           </Box>
//         </div>
//       </Flex>
//     </Box>
//   );
// }

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
                  // bg='rgba(17, 28, 45, 0.4)'
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
                    <Text>
                      Review: <UnicodeStarRating rating={product.rating} />
                    </Text>
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
