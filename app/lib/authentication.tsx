'use client';
import { auth, db, googleProvider } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { SignInCredentialProp, SignUpCredentialProp } from './utils';
import { showToast } from './toastService';

// Helper function to set persistence
const setAuthPersistenceMode = async (rememberMe: boolean) => {
  const persistence = rememberMe
    ? browserLocalPersistence
    : browserSessionPersistence;
  await setPersistence(auth, persistence); // Set persistence before sign-in
};

// SignUp
export const registerUserWithUsername = async ({
  name,
  email,
  password,
}: SignUpCredentialProp) => {
  try {
    // Check if the email already exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast({
        title: 'Signup info',
        description: 'Email already exists!',
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

    //updateProfile
    await updateProfile(user, {
      displayName: name,
    });
    // Store user data in Firestore
    await setDoc(doc(db, 'users', user.uid), { name, email, uid: user.uid });

    showToast({
      title: 'Signup info',
      description: 'SignUp successful',
      status: 'success',
    });

    return { user, name };
  } catch (error) {
    console.error(error);
    showToast({
      title: 'Error registering',
      description: 'Error registering user',
      status: 'error',
    });
  }
};

// SignIn with Email/Password
export const loginUser = async (
  { email, password }: SignInCredentialProp,
  rememberMe: boolean
) => {
  try {
    // Set persistence
    await setAuthPersistenceMode(rememberMe);

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      showToast({
        title: 'Error',
        status: 'error',
        description: 'User does not exist!',
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

    showToast({
      title: 'Sign in',
      status: 'success',
      description: 'Sign in successful',
    });

    return { user, name: userData?.name };
  } catch (err) {
    console.error('Login error:', err);
    showToast({
      title: 'Error',
      status: 'error',
      description: 'Error signing in',
    });
  }
};

// SignIn with Google
export const signInGoogle = async (rememberMe: boolean) => {
  try {
    // Set persistence before signing in
    await setAuthPersistenceMode(rememberMe);

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Store user data in Firestore (optional)
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL, // You can store the photo URL as well
    });

    showToast({
      title: 'Google Sign-in',
      description: 'User signed in with Google!',
      status: 'success',
    });

    return { user, name: user.displayName }; // Return user data
  } catch (err) {
    console.error('Google sign-in error:', err);
    showToast({
      title: 'Google Sign-in failed',
      description: 'Error signing in with Google',
      status: 'error',
    });
  }
};

// SignOut
export const signOutUser = async () => {
  try {
    await signOut(auth);
    showToast({
      title: 'Sign-out',
      description: 'Signed out successfully',
      status: 'success',
    });
  } catch (err) {
    console.error('Sign-out error:', err);
    showToast({
      title: 'Sign-out failed',
      description: 'Error signing out',
      status: 'error',
    });
  }
};
