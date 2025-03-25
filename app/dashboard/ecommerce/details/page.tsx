'use client';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  Button,
  Stack,
  Card,
  Heading,
  CardBody,
  CardFooter,
  ButtonGroup,
  Spinner,
  Center,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/utils';
import { UnicodeStarRating } from '@/components/TableComponent';
import Link from 'next/link';

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
    return (
      <Center>
        <Spinner
          thickness='4px'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    );
  }

  if (error) {
    return <Text color='red'>{error}</Text>;
  }

  if (!product) {
    return (
      <AbsoluteCenter>
        <Text>Product not found try to select a product</Text>
      </AbsoluteCenter>
    );
  }

  return (
    <Card
      direction={{ base: 'column', xxl: 'row' }}
      background='rgb(17, 28, 45)'
      color='rgb(124, 143, 172)'
      p={3}
      borderRadius='2xl'
    >
      <Image
        src={product.images[0]}
        alt={product.title}
        objectFit='cover'
        height='500px'
        borderRadius='2xl'
        background='whitesmoke'
      />
      <Stack>
        <CardBody>
          <Stack>
            <Heading>{product.title}</Heading>
            <Text>{product.description}</Text>
            <Text>${product.price}</Text>
            <Text>
              <UnicodeStarRating rating={product.rating} />
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <Stack width='100%'>
            <ButtonGroup borderTop='1px' borderBottom='1px' py={16}>
              <Text>QTY: </Text>
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
            </ButtonGroup>
            <ButtonGroup spacing='20px' mt='12'>
              <Link href='/dashboard/ecommerce/checkout'>
                <Button background='skyblue' borderRadius='2xl' px='12'>
                  Buy Now
                </Button>
              </Link>
              <Button background='orange.300' borderRadius='2xl' px='12'>
                Add to Cart
              </Button>
            </ButtonGroup>
          </Stack>
        </CardFooter>
      </Stack>
    </Card>
  );
}
