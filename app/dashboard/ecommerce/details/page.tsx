'use client';
import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Button, Stack, HStack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

import { Product } from '@/lib/utils';
import { UnicodeStarRating } from '@/components/TableComponent';

export default function Details() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const request = await fetch(`https://dummyjson.com/products/${id}`);
        if (!request.ok) {
          throw new Error('Failed to fetch product data');
        }
        const response: Product = await request.json();
        setProduct(response);
      } catch (err) {
        setError(err + 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color='red'>{error}</Text>;
  }

  if (!product) {
    return <Text>Product not found.</Text>;
  }

  return (
    <div className='min-[980px]:flex gap-15 rounded-xl bg-custom-bg p-3 inset-shadow-sm border border-indigo-600'>
      <Image
        src={product.images[0]}
        alt={product.title}
        objectFit='cover'
        // width='50%'
        // maxH='50vh'
        height='500px'
        borderRadius='2xl'
        background='whitesmoke'
      />
      <Stack spacing={20} p={5}>
        <Box display='flex' flexDir='column' gap='3'>
          <Text fontWeight='bold' fontSize='lg'>
            {product.title}
          </Text>
          <Text>Desc: {product.description}</Text>
          <Text>Price: ${product.price}</Text>
          <Text>
            Review: <UnicodeStarRating rating={product.rating} />
          </Text>
        </Box>
        <HStack borderTop='1px' borderBottom='1px' py={16}>
          <Text>QTY: </Text>
          <Box display='flex' border='1px' color='skyblue' borderRadius='2xl'>
            <Button
              borderRight='1px'
              background='inherit'
              color='skyblue'
              fontSize='2xl'
              px={6}
              _hover={{ background: 'none' }}
            >
              -
            </Button>
            <Text background='inherit' color='skyblue' fontSize='2xl' px={6}>
              0
            </Text>
            <Button
              borderLeft='1px'
              background='inherit'
              color='skyblue'
              fontSize='2xl'
              px={6}
              _hover={{ background: 'none' }}
            >
              +
            </Button>
          </Box>
        </HStack>
        <HStack>
          <Button background='skyblue' borderRadius='2xl' px='12'>
            Buy Now
          </Button>
          <Button background='orange.300' borderRadius='2xl' px='12'>
            Add to Cart
          </Button>
        </HStack>
      </Stack>
    </div>
  );
}
