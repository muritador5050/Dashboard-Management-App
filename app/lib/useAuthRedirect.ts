'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

//onAuthStateChanged
export default function useAuthRedirect(requireAuth: boolean) {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (requireAuth && !user) {
        router.push('/auth/login'); 
      } else if (!requireAuth && user) {
        router.push('/dashboard'); 
      }
    });
    return () => unsubscribe();
  }, [requireAuth, router]);
  return;
}
