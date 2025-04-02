'use client';
import { ChangeEvent, useState } from 'react';
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
  Divider,
  Center,
  AbsoluteCenter,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SignUpCredentialProp } from '@/lib/utils';
import { registerUserWithUsername } from '@/lib/authentication';
import { useRouter } from 'next/navigation';
//Loginpage
export default function SignUp() {
  const [credential, setCredential] = useState<SignUpCredentialProp>({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const handleSignUp = async () => {
    try {
      const signUp = await registerUserWithUsername(credential);
      if (signUp?.user) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
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
            <Text fontSize='xs'>Sign in with Google</Text>
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
          <FormLabel>Name </FormLabel>
          <Input
            type='text'
            name='name'
            value={credential.name}
            onChange={handleOnchange}
            mb={5}
          />
          <FormLabel>Username </FormLabel>
          <Input
            type='email'
            name='email'
            value={credential.email}
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
          <Button
            onClick={handleSignUp}
            colorScheme='blue'
            width='100%'
            borderRadius='3xl'
            mt={5}
          >
            Sign Up
          </Button>
        </FormControl>
        <Flex gap={3}>
          Already have an Account?{' '}
          <Link href={'/auth/login'}>
            <Text color='blue'>Sign In</Text>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}
