'use client';
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
} from '@chakra-ui/react';

// Define steps
const steps = [
  { title: 'Step 1', description: 'Cart' },
  { title: 'Step 2', description: 'Billing & address' },
  { title: 'Step 3', description: 'Payment' },
];

// Step 1 Component
function Cart() {
  return <Box p={5}>🛍️ Select a product to continue...</Box>;
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
      <Box
        mt={6}
        p={5}
        border='1px solid'
        borderColor='gray.300'
        borderRadius='md'
      >
        {renderStepPage()}
      </Box>

      {/* Navigation Buttons */}
      <Box mt={6} display='flex' justifyContent='space-between'>
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
