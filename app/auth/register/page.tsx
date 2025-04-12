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
import { useRouter } from 'next/navigation';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { showToast } from '@/lib/toastService';
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { useThemeColor } from '@/lib/themeUtil';
//Loginpage
export default function SignUp() {
  const { childBgColor, textColor } = useThemeColor();
  const [credential, setCredential] = useState<SignUpCredentialProp>({
    displayName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //handleInput
  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  //handleSignUp
  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const signUpResult = await registerUserWithUsername(credential);
      await signOut(auth);
      if (signUpResult) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Sign-up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUserWithUsername = async ({
    displayName,
    email,
    password,
  }: SignUpCredentialProp) => {
    try {
      const usersRef = collection(db, 'users');
      const emailQuery = query(usersRef, where('email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        showToast({
          title: 'Signup Info',
          description: 'Email already exists!',
          status: 'warning',
        });
        return null;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        displayName,
        email,
        uid: user.uid,
      });
      await updateProfile(user, {
        displayName,
      });
      await setDoc(doc(db, 'userChats', user.uid), {});
      showToast({
        title: 'Success',
        description: 'User registered successfully',
        status: 'success',
      });
      return { user, displayName };
    } catch (error) {
      console.error('Error registering user:', error);
      showToast({
        title: 'Error registering',
        description: 'Failed to register user',
        status: 'error',
      });
      throw error;
    }
  };
  return (
    <Box
      bg={childBgColor}
      color={textColor}
      className=' p-9 rounded-xl flex flex-col items-center min-[980px]:flex-row gap-9 m-auto'
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
            src=' https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/login-security.png'
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
            cursor='pointer'
            width={200}
          >
            <Image
              src=' https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/svgs/google-icon.svg'
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
            cursor='pointer'
            width={200}
          >
            <Image
              src=' https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/svgs/icon-facebook.svg'
              alt='facebook'
            />
            <Text fontSize='xs'>Sign in with FB</Text>
          </Center>
        </Stack>
        <Box position='relative'>
          <Divider />
          <AbsoluteCenter bg={childBgColor} px='7'>
            or sign in with
          </AbsoluteCenter>
        </Box>
        <FormControl>
          <FormLabel>Name </FormLabel>
          <Input
            type='text'
            name='displayName'
            value={credential.displayName}
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
            isLoading={isLoading}
            colorScheme='blue'
            width='100%'
            borderRadius='3xl'
            mt={5}
          >
            Sign Up
          </Button>
        </FormControl>
        <Flex gap={3}>
          Already have an Account?
          <Link href={'/auth/login'}>
            <Text color='blue'>Sign In</Text>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}
