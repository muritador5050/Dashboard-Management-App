'use client';
import { useState } from 'react';
import { useCart } from '@/context/ThemeContext';
import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

const deliveryAddress = [
  {
    value: 'free',
    label: 'Free Delivery',
    details: 'Delivered on Friday, May 8',
  },
  {
    value: 'fast',
    label: 'Fast Delivery ($2.00)',
    details: 'Delivered on Friday, May 8',
  },
];

const paymentMethod = [
  {
    value: 'paypal',
    label: 'Pay with Paypal',
    description:
      'You will be redirected to Paypal to complete your purchase securely.',
    imgSrc: '/paypal.png',
  },
  {
    value: 'card',
    label: 'Credit/Debit Card',
    description: 'We support Mastercard, Visa, Discover, and Stripe.',
    imgSrc: '/mastercard.png',
  },
  {
    value: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay with cash when your order is delivered.',
    imgSrc: null,
  },
];
export function BillingAndAddress() {
  const { cart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  // Calculate total price with discount
  const total = cart.reduce((acc, item) => {
    const subtotal = item.price * item.quantity;
    const discountAmount = (item.discountPercentage / 100) * subtotal;
    return acc + (subtotal - discountAmount);
  }, 0);

  return (
    <>
      {/* Delivery Options */}
      <Box
        mb={6}
        p={4}
        border='1px'
        borderColor='rgb(124, 143, 172)'
        borderRadius='lg'
      >
        <Text>Delivery Option</Text>
        <RadioGroup
          onChange={setSelectedDelivery}
          value={selectedDelivery}
          display='flex'
          gap={5}
        >
          {deliveryAddress.map((option) => (
            <Box
              key={option.value}
              p={4}
              border='2px solid'
              borderColor={
                selectedDelivery === option.value
                  ? 'blue.500'
                  : 'rgb(124, 143, 172)'
              }
              bg={
                selectedDelivery === option.value ? 'blue.900' : 'transparent'
              }
              borderRadius='lg'
              flex='1'
              transition='all 0.3s ease'
              cursor='pointer'
              _hover={{ bg: 'blue.800', borderColor: 'blue.400' }}
              onClick={() => setSelectedDelivery(option.value)}
            >
              <Radio value={option.value}>
                <Text fontWeight='bold'>{option.label}</Text>
              </Radio>
              <Text>{option.details}</Text>
            </Box>
          ))}
        </RadioGroup>
      </Box>

      {/* Payment Options */}
      <Box
        mb={6}
        p={4}
        border='1px'
        borderColor='gray.200'
        borderRadius='lg'
        display={{ xxl: 'flex' }}
        alignItems={{ xxl: 'center' }}
        gap={{ xxl: '10' }}
        minW='xxl'
      >
        <RadioGroup
          onChange={setSelectedPayment}
          value={selectedPayment}
          display='flex'
          flexDirection='column'
          flex='1'
          gap={5}
        >
          {paymentMethod.map((option) => (
            <Box
              key={option.value}
              p={4}
              border='2px solid'
              borderColor={
                selectedDelivery === option.value
                  ? 'blue.500'
                  : 'rgb(124, 143, 172)'
              }
              bg={
                selectedDelivery === option.value ? 'blue.900' : 'transparent'
              }
              borderRadius='lg'
              flex='1'
              transition='all 0.3s ease'
              cursor='pointer'
              _hover={{ bg: 'blue.800', borderColor: 'blue.400' }}
              onClick={() => setSelectedPayment(option.value)}
            >
              <Radio value={option.value}>
                <Text fontWeight='bold'>{option.label}</Text>
              </Radio>
              <Flex gap={5} align='center' mt={2}>
                <Text fontSize='sm' color='gray.600'>
                  {option.description}
                </Text>
                {option.imgSrc && (
                  <Image
                    objectFit='cover'
                    src={option.imgSrc}
                    alt={option.label}
                    width='50px'
                    height='50px'
                    background='white'
                    borderRadius='xl'
                  />
                )}
              </Flex>
            </Box>
          ))}
        </RadioGroup>
        <Image
          src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/products/payment.svg'
          alt='payment'
          objectFit='cover'
          width='350px'
          height='350px'
          mt={5}
        />
      </Box>

      {/* Total Payment */}
      <Box
        mt={6}
        p={6}
        border='1px'
        // borderColor='rgb(124, 143, 172)'
        borderRadius='2xl'
      >
        <Heading>Grand Total</Heading>
        <Flex justify='space-between'>
          <Text fontSize='xl' fontWeight='bold'>
            Total Payment
          </Text>
          <Text fontSize='xl' fontWeight='bold' color='green.400'>
            ${total.toFixed(2)}
          </Text>
        </Flex>
      </Box>
    </>
  );
}
