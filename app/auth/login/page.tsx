'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Checkbox,
  Link,
  Heading,
  Stack,
  Image,
  Button,
  Text,
  Divider,
  Center,
  AbsoluteCenter,
} from '@chakra-ui/react';
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    router.push('/dashboard');
  };
  return (
    <Box
      p={7}
      className='bg-custom-bg text-custom-color rounded-xl flex flex-col items-center min-[980px]:flex-row gap-9 m-auto'
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
          <FormLabel>Username </FormLabel>
          <Input type='email' mb={5} />
          <FormLabel>Password</FormLabel>
          <Input type='password' mb={5} />
          <Flex justify='space-between' mb={5}>
            <Checkbox defaultChecked>Remember me</Checkbox>{' '}
            <Link color='blue'>Forget password?</Link>{' '}
          </Flex>
          <Button colorScheme='blue' width='100%' borderRadius='3xl' mt={5}>
            Sign in
          </Button>
        </FormControl>
        <Box>
          New to Spike? <Link color='blue'>Create an Account</Link>
        </Box>
      </Stack>
    </Box>
  );
}
