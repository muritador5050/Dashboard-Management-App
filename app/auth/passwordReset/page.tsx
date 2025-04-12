'use client';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Heading,
  Stack,
  Image,
  Button,
  Text,
} from '@chakra-ui/react';
import { useThemeColor } from '@/lib/themeUtil';
import Link from 'next/link';
import { showToast } from '@/lib/toastService';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/config/firebase';

//Loginpage
export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { childBgColor, textColor } = useThemeColor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast({
        title: 'Email required',
        description: 'Please enter your email address.',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Firebase method to send password reset email
      await sendPasswordResetEmail(auth, email);
      showToast({
        title: 'Reset Link Sent',
        description: 'Check your email to reset your password.',
        status: 'success',
        duration: 4000,
      });
      setEmail('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error sending reset email:', error);
      let message = 'Something went wrong. Please try again later.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email address.';
      }

      showToast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      bg={childBgColor}
      color={textColor}
      borderRadius='3xl'
      direction={{ base: 'column', xxl: 'row' }}
      gap={9}
      p={9}
    >
      <Stack>
        <Flex>
          <Image
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/logos/logo-dark.svg'
            alt='logo'
          />
        </Flex>
        <Box className='max-[980px]:hidden'>
          <Image
            src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/login-security.png'
            alt='big-img'
            width={600}
            height={400}
          />
        </Box>
      </Stack>
      <Stack gap={10} width={{ xxl: 500 }}>
        <Box>
          <Heading color='white'>Forgot your password?</Heading>
          <Text>
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Text>
        </Box>
        <FormControl>
          <FormLabel>Email address </FormLabel>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={5}
          />

          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            colorScheme='blue'
            width='100%'
            borderRadius='3xl'
            mt={5}
          >
            Send Reset Link
          </Button>
          <Button
            background='rgba(30, 42, 51, 0.6)'
            color='blue'
            width='100%'
            borderRadius='3xl'
            colorScheme='blue'
            mt={5}
          >
            <Link href={'/auth/login'}>Back to Login</Link>
          </Button>
        </FormControl>
      </Stack>
    </Stack>
  );
}
