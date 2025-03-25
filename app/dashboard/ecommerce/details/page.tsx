'use client';
import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Stack } from '@chakra-ui/react';
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
    <div>
      <Box mx='auto' p={5}>
        <Stack spacing={2}>
          <Image
            src={product.images[0]}
            alt={product.title}
            objectFit='cover'
            width='100%'
            borderTopRadius='2xl'
            background='whitesmoke'
          />
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
    </div>
  );
}
