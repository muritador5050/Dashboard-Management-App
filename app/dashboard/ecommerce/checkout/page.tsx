'use client';
import { useCart } from '@/context/ThemeContext';
import {
  useSteps,
  Box,
  Button,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  Image,
  Flex,
  Divider,
  Stack,
  ButtonGroup,
  Heading,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';

// Define steps
const steps = [
  { title: 'Step 1', description: 'Cart' },
  { title: 'Step 2', description: 'Billing & address' },
  { title: 'Step 3', description: 'Payment' },
];

// Step 1 Component
function Cart() {
  const { cart, decreaseQuantity, increaseQuantity, deleteItem } = useCart();
  return (
    <div>
      <Flex width='100%' justify='space-between' fontSize='1rem'>
        <Text>Product</Text>
        <Text>Quantity</Text>
        <Text>Price</Text>
      </Flex>
      <Divider my={4} />
      {cart.length === 0 ? <Text>No items in cart</Text> : null}
      {cart.map((item) => (
        <>
          <Flex key={item.id} width='100%' justify='space-between'>
            <Flex fontSize='1rem' gap={3}>
              <Image
                src={item.images[0]}
                alt={item.title}
                width='70px'
                height='70px'
                background='white'
                borderRadius='2xl'
              />
              <Stack>
                <Text width='16' lineHeight='shorter'>
                  {item.title}
                </Text>
                <Trash2
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => deleteItem(item.id)}
                />
              </Stack>
            </Flex>
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
            <Text>{item.price}</Text>
          </Flex>
          <Box
            mt={6}
            mb={24}
            border='1px'
            borderColor='rgb(124, 143, 172)'
            borderRadius='2xl'
            height='96'
            p={6}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Heading>Order Summary</Heading>
            <Flex justify='space-between'>
              <Text>Sub total</Text>
              <Text>{item.price * item.quantity}</Text>
            </Flex>
            <Flex justify='space-between'>
              <Text>Discount 5%</Text>
              <Text color='red'>-${item.discountPercentage}</Text>
            </Flex>
            <Flex justify='space-between'>
              <Text>Shipping</Text>
              <Text>Free</Text>
            </Flex>
            <Flex justify='space-between'>
              <Text>Total</Text>
              <Text>
                {' '}
                ${item.price * item.quantity - item.discountPercentage}
              </Text>
            </Flex>
          </Box>
        </>
      ))}
    </div>
  );
}

// Step 2 Component
function BillingAndAddress() {
  return <Box p={5}>📝 Fill in the product details...</Box>;
}

// Step 3 Component
function Payment() {
  return <Box p={5}>✅ Review and submit your details...</Box>;
}

// Stepper Component
export default function StepperWithPages() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  // Function to render the current step's page
  const renderStepPage = () => {
    switch (activeStep) {
      case 0:
        return <Cart />;
      case 1:
        return <BillingAndAddress />;
      case 2:
        return <Payment />;
      default:
        return null;
    }
  };

  return (
    <Box p={5}>
      {/* Stepper Navigation */}
      <Stepper size='lg' index={activeStep} colorScheme='blue'>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete='✔️' incomplete='⬜' active='🔵' />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {/* Step Page Content */}
      <div>{renderStepPage()}</div>

      {/* Navigation Buttons */}
      <Box mt={6} display='flex' gap={3} float='right'>
        <Button
          onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
          isDisabled={activeStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setActiveStep(Math.min(activeStep + 1, steps.length - 1))
          }
          colorScheme='blue'
          isDisabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
