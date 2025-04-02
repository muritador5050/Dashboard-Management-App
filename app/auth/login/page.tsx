'use client';
import { ChangeEvent, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Checkbox,
  Heading,
  Stack,
  Image,
  Button,
  Text,
  Divider,
  Center,
  AbsoluteCenter,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SignInCredentialProp } from '@/lib/utils';
import { loginUser, signInGoogle } from '@/lib/authentication';
import { useRouter } from 'next/navigation';

//Loginpage
export default function LoginPage() {
  const [credential, setCredential] = useState<SignInCredentialProp>({
    username: '',
    password: '',
  });
  const router = useRouter();

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async () => {
    try {
      const userData = await loginUser(credential);
      if (userData) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

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
      <Stack gap={10}>
        <Box>
          <Heading color='white'>Welcome to Spike Admin</Heading>
          <Text>Your Admin Dashboard</Text>
        </Box>
        <Stack direction='row' gap={5}>
          <Center
            gap={3}
            border='1px'
            borderColor='rgb(124, 143, 172)'
            borderRadius='xl'
            p={3}
            width={200}
          >
            <Image
              src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/svgs/google-icon.svg'
              alt='google'
            />
            <Text fontSize='xs' onClick={signInGoogle}>
              Sign in with Google
            </Text>
          </Center>
          <Center
            gap={3}
            border='1px'
            borderColor='rgb(124, 143, 172)'
            borderRadius='xl'
            p={3}
            width={200}
          >
            <Image
              src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/svgs/icon-facebook.svg'
              alt='facebook'
            />
            <Text fontSize='xs'>Sign in with FB</Text>
          </Center>
        </Stack>
        <Box position='relative'>
          <Divider />
          <AbsoluteCenter bg='rgb(17, 28, 45)' px='7'>
            or sign in with
          </AbsoluteCenter>
        </Box>
        <FormControl>
          <FormLabel>Username </FormLabel>
          <Input
            type='email'
            name='username'
            value={credential.username}
            onChange={handleOnchange}
            mb={5}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            name='password'
            value={credential.password}
            onChange={handleOnchange}
            mb={5}
          />
          <Flex justify='space-between' mb={5}>
            <Checkbox defaultChecked>Remember me</Checkbox>{' '}
            <Link href={'/auth/passwordReset'}>
              <Text color='blue'>Forget password?</Text>
            </Link>{' '}
          </Flex>
          <Button
            onClick={handleSignIn}
            colorScheme='blue'
            width='100%'
            borderRadius='3xl'
            mt={5}
          >
            Sign In
          </Button>
        </FormControl>
        <Flex gap={3}>
          New to Spike?{' '}
          <Link href={'/auth/register'}>
            <Text color='blue'>Create an Account</Text>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}
