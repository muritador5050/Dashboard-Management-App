import React, { useEffect, useState } from 'react';
import { auth, db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Avatar, Flex, Text } from '@chakra-ui/react';

export default function Username() {
  const [userName, setUserName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // Set photoURL directly from the authenticated user
        setPhotoURL(user.photoURL || '');

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserName(userSnap.data().displayName);
        } else {
          console.error('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!auth.currentUser) return null;

  return (
    <Flex align='center' gap={4}>
      <Avatar src={photoURL || '../user-11.png'} />
      <Text fontWeight='light'>
        {userName} <br /> Admin!
      </Text>
    </Flex>
  );
}
