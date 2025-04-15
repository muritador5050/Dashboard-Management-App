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
import { useRouter } from 'next/navigation';
import useAuthRedirect from '@/lib/useAuthRedirect';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db, googleProvider } from '@/config/firebase';
import { showToast } from '@/lib/toastService';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useThemeColor } from '@/lib/themeUtil';

//Loginpage
export default function LoginPage() {
  const { childBgColor, textColor } = useThemeColor();

  const [credential, setCredential] = useState<SignInCredentialProp>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useAuthRedirect(false);

  //onChange
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const userData = await loginUser(credential, rememberMe);
      if (userData) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // SignIn with Email/Password
  const loginUser = async (
    { email, password }: SignInCredentialProp,
    rememberMe: boolean
  ) => {
    if (!email || !password) {
      showToast({
        title: 'Missing Info',
        description: 'Email and password are required.',
        status: 'warning',
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }
    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        showToast({
          title: 'Error',
          status: 'error',
          description: 'No user with this email',
        });
        return;
      }

      const userData = querySnapshot.docs[0]?.data();
      const userEmail = userData?.email;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      return { user, displayName: userData?.displayname };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Login error:', err);
      let message = 'Something went wrong. Please try again.';
      if (err.code === 'auth/invalid-credential') {
        message = 'Email or password is incorrect';
      }
      showToast({
        title: 'Login failed',
        description: message,
        status: 'error',
        duration: 4000,
      });
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      });
      return { user, displayName: user.displayName };
    } catch (err) {
      console.error('Google sign-in error:', err);
      showToast({
        title: 'Google Sign-in failed',
        description: 'Error signing in with Google',
        status: 'error',
      });
    }
  };

  return (
    <Stack
      bg={childBgColor}
      color={textColor}
      borderRadius='3xl'
      direction={{ base: 'column', xxl: 'row' }}
      gap={9}
      px={9}
      py={12}
      h='100vh'
    >
      <Stack>
        <Flex color={textColor}>
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
      <Stack gap={{ base: 5, xxl: 3 }} pb={3}>
        <Box>
          <Heading color='white'>Welcome to Spike Admin</Heading>
          <Text>Your Admin Dashboard</Text>
        </Box>
        <Stack direction='row' gap={5}>
          <Center
            onClick={handleGoogleSignIn}
            gap={3}
            border='1px'
            borderColor='rgb(124, 143, 172)'
            borderRadius='xl'
            p={3}
            cursor='pointer'
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
            cursor='pointer'
            width={200}
          >
            <Image
              src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/svgs/icon-facebook.svg'
              alt='facebook'
            />
            <Text fontSize='xs'>Sign in with FB</Text>
          </Center>
        </Stack>
        <Box position='relative' mt='3'>
          <Divider />
          <AbsoluteCenter bg={childBgColor} px='7'>
            or sign in with
          </AbsoluteCenter>
        </Box>
        <FormControl>
          <FormLabel>Username </FormLabel>
          <Input
            type='email'
            name='email'
            value={credential.email}
            onChange={handleOnchange}
            mb={3}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            name='password'
            value={credential.password}
            onChange={handleOnchange}
            mb={3}
          />
          <Flex justify='space-between' mb={5}>
            <Checkbox
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember me
            </Checkbox>{' '}
            <Link href={'/auth/passwordReset'}>
              <Text color='blue'>Forget password?</Text>
            </Link>{' '}
          </Flex>
          <Button
            onClick={handleSignIn}
            isLoading={isLoading}
            colorScheme='blue'
            width='100%'
            borderRadius='3xl'
            mt={2}
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
    </Stack>
  );
}
