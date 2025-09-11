'use client';
import { ChangeEvent, useState, useEffect } from 'react';
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
  AbsoluteCenter,
  AspectRatio,
  InputGroup,
  InputRightElement,
  IconButton,
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
  signInWithRedirect,
  getRedirectResult,
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
import { Eye, EyeClosed } from 'lucide-react';

//Loginpage
export default function LoginPage() {
  const { childBgColor, textColor } = useThemeColor();

  const [credential, setCredential] = useState<SignInCredentialProp>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          await setDoc(
            doc(db, 'users', user.uid),
            {
              displayName: user.displayName,
              email: user.email,
              uid: user.uid,
              photoURL: user.photoURL,
            },
            { merge: true }
          );

          showToast({
            title: 'Sign-in successful',
            description: `Welcome, ${user.displayName}!`,
            status: 'success',
          });

          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error handling redirect result:', err);
        showToast({
          title: 'Sign-in failed',
          description: 'Error completing Google sign-in',
          status: 'error',
        });
      }
    };

    handleRedirectResult();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithRedirect(auth, googleProvider);
    } catch (err: unknown) {
      console.error('Google sign-in error:', err);
      if (typeof err === 'object' && err !== null && 'code' in err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorCode = (err as any).code;
        if (errorCode === 'auth/unauthorized-domain') {
          showToast({
            title: 'Domain not authorized',
            description: 'This domain is not authorized for Google sign-in',
            status: 'error',
          });
        } else {
          showToast({
            title: 'Google Sign-in failed',
            description: 'Error signing in with Google',
            status: 'error',
          });
        }
      } else {
        showToast({
          title: 'Google Sign-in failed',
          description: 'Error signing in with Google',
          status: 'error',
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <Flex
      bg={childBgColor}
      color={textColor}
      direction={{ base: 'column', xxl: 'row' }}
      justify={{ base: 'normal', xxl: 'space-evenly' }}
      align={{ base: 'normal', xxl: 'center' }}
      p={{ base: 3, xxl: 6 }}
      py={9}
      h='100vh'
    >
      <AspectRatio
        minW='500px'
        ratio={4 / 4}
        display={{ base: 'none', xxl: 'block' }}
      >
        <Image
          src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/login-security.png'
          alt='big-img'
          objectFit='cover'
          display={{ base: 'none', xxl: 'block' }}
        />
      </AspectRatio>
      <Stack gap={{ base: 5, xxl: 3 }} minW={'50%'}>
        <Box>
          <Heading fontSize={{ base: 'sm', xxl: '3xl' }} color='white'>
            Welcome to Spike Admin
          </Heading>
          <Text>Your Admin Dashboard</Text>
        </Box>
        <Flex
          onClick={handleGoogleSignIn}
          gap={3}
          border='1px'
          borderColor='rgb(124, 143, 172)'
          borderRadius='xl'
          p={3}
          cursor='pointer'
          justify='center'
          align='center'
          display='none'
        >
          <Image
            src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/svgs/google-icon.svg'
            alt='google'
          />
          <Text fontSize='xs'>Sign in with Google</Text>
        </Flex>

        <Box position='relative' mt='3' display='none'>
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
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={credential.password}
              onChange={handleOnchange}
              mb={3}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <Eye /> : <EyeClosed />}
                variant='ghost'
                size='sm'
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </InputRightElement>
          </InputGroup>
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
    </Flex>
  );
}
