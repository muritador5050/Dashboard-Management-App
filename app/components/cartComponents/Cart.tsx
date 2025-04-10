'use client';
import { useCart } from '@/context/ThemeContext';
import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  Divider,
  ButtonGroup,
  Heading,
  Center,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
export function Cart() {
  const { cart, decreaseQuantity, increaseQuantity, deleteItem } = useCart();

  return (
    <div>
      {/* Header */}
      <Flex width='100%' justify='space-between' fontSize='1rem'>
        <Text>Product</Text>
        <Text>Quantity</Text>
        <Text>Price</Text>
      </Flex>
      <Divider my={4} />

      {/* If Cart is Empty */}
      {cart.length === 0 ? <Center>No items in cart</Center> : null}

      {/* Loop through cart items */}
      {cart.map((item) => {
        const total = item.price * item.quantity;
        const discountAmount = (item.discountPercentage / 100) * total;
        const finalTotal = total - discountAmount;

        return (
          <Box
            key={item.id}
            mb={6}
            p={4}
            border='1px'
            borderColor='gray.200'
            borderRadius='lg'
          >
            {/* Product Info */}
            <Flex
              width='100%'
              justify='space-between'
              align='center'
              className='max-sm:flex-col gap-5 '
            >
              <Flex align='center' gap={3}>
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width='100px'
                  height='100px'
                  background='white'
                  borderRadius='2xl'
                />
                <Box ml={3}>
                  <Text mb={3} width='16' lineHeight='shorter'>
                    {item.title}
                  </Text>
                  <Trash2
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => deleteItem(item.id)}
                  />
                </Box>
              </Flex>

              {/* Quantity Buttons */}
              <ButtonGroup fontSize='1rem' variant='outline'>
                <Button
                  background='rgb(17, 28, 45)'
                  color='rgb(124, 143, 172)'
                  borderRight='2px solid rgb(124, 143, 172)'
                  _hover={{ background: 'none' }}
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </Button>
                <Text>{item.quantity}</Text>
                <Button
                  background='rgb(17, 28, 45)'
                  color='rgb(124, 143, 172)'
                  borderLeft='2px solid rgb(124, 143, 172)'
                  _hover={{ background: 'none' }}
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </Button>
              </ButtonGroup>

              {/* Price */}
              <Text>${item.price.toFixed(2)}</Text>
            </Flex>

            {/* Order Summary */}
            <Box
              mt={4}
              p={4}
              border='1px'
              borderColor='gray.300'
              borderRadius='lg'
            >
              <Heading size='md'>Order Summary</Heading>
              <Flex justify='space-between'>
                <Text>Subtotal</Text>
                <Text>${total.toFixed(2)}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>Discount 5%</Text>
                <Text color='red'>-${discountAmount.toFixed(2)}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>Shipping</Text>
                <Text>Free</Text>
              </Flex>
              <Flex justify='space-between' fontWeight='bold'>
                <Text>Total</Text>
                <Text>${finalTotal.toFixed(2)}</Text>
              </Flex>
            </Box>
          </Box>
        );
      })}
    </div>
  );
}
