'use client';
import { useCart } from '@/context/ThemeContext';
import { showToast } from '@/lib/toastService';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
// Step 3 Component
export function Payment() {
  const { clearCart } = useCart();
  const [loading, setIsloading] = useState(false);

  function downloadReceipt() {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
      showToast({
        title: "Oops! We're out of paper.",
        description: 'Please try again later.',
        duration: 3000,
      });
    }, 3000);
  }
  return (
    <Box p={5}>
      <Stack>
        <Center display='flex' flexDirection='column'>
          <Text textAlign='center'>Thank you for your purchase!</Text>
          <Text color='blue' mb='-4'>
            Your order id:3fa7-69e1-79b4-dbe0d35f5f5d
          </Text>
          <Image
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/products/payment-complete.svg'
            alt='payment'
            width='400px'
            height='400px'
            margin='none'
          />
          <Text fontSize='sm' mt='-12'>
            We will send you a notification within 2 days when it ships.
          </Text>
        </Center>
      </Stack>
      {loading && (
        <Center>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Center>
      )}

      <ButtonGroup display='flex' justifyContent='space-between' mt='12'>
        <Link href='/dashboard/ecommerce/shop'>
          <Button
            onClick={clearCart}
            borderRadius='3xl'
            px='12'
            py='6'
            colorScheme='teal'
          >
            Continue Shopping
          </Button>
        </Link>
        <Button
          onClick={downloadReceipt}
          borderRadius='3xl'
          px='12'
          py='6'
          colorScheme='blue'
        >
          Download Receipt
        </Button>
      </ButtonGroup>
    </Box>
  );
}
