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
  VStack,
  Divider,
  Container,
  Stack,
  ButtonGroup,
  Heading,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
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
  const { cart, decreaseQuantity, increaseQuantity } = useCart();
  return (
    <div>
      <Flex width='100%' justify='space-between'>
        <Text>Product</Text>
        <Text>Quantity</Text>
        <Text>Price</Text>
      </Flex>
      <Divider />
      {cart.length === 0 ? <Text>No items in cart</Text> : null}
      {cart.map((item) => (
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
            <Stack width='fit-content'>
              <Text width='16'>{item.title}</Text>
              <Text>{item.category}</Text>
              <Trash2 style={{ color: 'red', cursor: 'pointer' }} />
            </Stack>
          </Flex>
          <ButtonGroup>
            <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
            <Text>{item.quantity}</Text>
            <Button onClick={() => increaseQuantity(item.id)}>+</Button>
          </ButtonGroup>
          <Text>{item.price}</Text>
        </Flex>
      ))}

      <Box>
        <Heading>Order Summary</Heading>
        <Flex justify='space-between'>
          <Text>Sub total</Text>
          <Text>all q*p</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text>Discount 5%</Text>
          <Text>-$price</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text>Shipping</Text>
          <Text>Free</Text>
        </Flex>

        <Text>Total</Text>
      </Box>
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
