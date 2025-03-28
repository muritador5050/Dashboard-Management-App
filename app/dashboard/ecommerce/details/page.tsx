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
  Tab,
  TabList,
  Tabs,
  TabIndicator,
  TabPanels,
  TabPanel,
  Flex,
  Box,
  Divider,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/utils';
import { UnicodeStarRating } from '@/components/TableComponent';
import Link from 'next/link';
import { useCart } from '@/context/ThemeContext';

//Details
export default function Details() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { addToCart } = useCart();

  //Effect
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
    <>
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
        <Stack px={3}>
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
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='20px' mt='12'>
              <Link href='/dashboard/ecommerce/checkout'>
                <Button background='skyblue' borderRadius='2xl' px='12'>
                  Buy Now
                </Button>
              </Link>
              <Button
                onClick={() => addToCart(product)}
                background='orange.300'
                borderRadius='2xl'
                px='12'
              >
                Add to Cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
      <Tabs
        background='rgb(17, 28, 45)'
        color='rgb(124, 143, 172)'
        p={3}
        borderRadius='2xl'
        my={9}
        height='500px'
      >
        <TabList>
          <Tab>Description</Tab>
          <Tab>Reviews</Tab>
        </TabList>
        <TabIndicator
          mt='-1.5px'
          height='2px'
          bg='blue.500'
          borderRadius='1px'
        />
        <TabPanels>
          <TabPanel>
            <Heading>{product.description}</Heading>
          </TabPanel>
          <TabPanel>
            <Flex>
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
