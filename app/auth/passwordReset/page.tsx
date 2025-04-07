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
import Link from 'next/link';

//Loginpage
export default function PasswordReset() {
  const [email, setEmail] = useState('');

  return (
    <Box className='bg-custom-bg text-custom-color p-9 rounded-xl flex flex-col items-center min-[980px]:flex-row gap-9 m-auto'>
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
      <Stack gap={10} width={500}>
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

          <Button colorScheme='blue' width='100%' borderRadius='3xl' mt={5}>
            Forgot Password
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
    </Box>
  );
}
