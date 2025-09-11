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
  AbsoluteCenter,
  InputGroup,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useThemeColor } from '@/lib/themeUtil';
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
import { Eye, EyeClosed } from 'lucide-react';
//Register
export default function SignUp() {
  const { childBgColor, textColor } = useThemeColor();
  const [credential, setCredential] = useState<SignUpCredentialProp>({
    displayName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
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
    if (!displayName || !email || !password) {
      showToast({
        title: 'Signup',
        description: 'Please input your details',
        status: 'info',
      });
      setIsLoading(false);
      return;
    }
    try {
      const usersRef = collection(db, 'users');
      const emailQuery = query(usersRef, where('email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        showToast({
          title: 'Signup Info',
          description: 'User with this email already exists!',
          status: 'warning',
        });
        return;
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
        title: 'SingUp',
        description: 'SignUp successful',
        status: 'success',
        duration: 3000,
      });
      return { user, displayName };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error registering user:', err);
      let message = 'Something went wrong. Please try again.';
      if (err.code === 'auth/invalid-credential') {
        message = 'Invalid credentials';
      }
      showToast({
        title: 'SingUp failed',
        description: message,
        status: 'error',
        duration: 4000,
      });
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
      h='100vh'
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
      <Stack gap={5}>
        <Box>
          <Heading color='white'>Welcome to Spike Admin</Heading>
          <Text>Your Admin Dashboard</Text>
        </Box>

        <Box position='relative'>
          <Divider />
          <AbsoluteCenter bg={childBgColor} px='7'>
            Register
          </AbsoluteCenter>
        </Box>
        <FormControl>
          <FormLabel>Name </FormLabel>
          <Input
            type='text'
            name='displayName'
            value={credential.displayName}
            onChange={handleOnchange}
            mb={3}
          />
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

          <Button
            onClick={handleSignUp}
            isLoading={isLoading}
            colorScheme='blue'
            width='100%'
            borderRadius='3xl'
            mt={2}
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
    </Stack>
  );
}
