'use client';
import { BillingAndAddress } from '@/components/cartComponents/Address';
import { Cart } from '@/components/cartComponents/Cart';
import { Payment } from '@/components/cartComponents/Payment';
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
