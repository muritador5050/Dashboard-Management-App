'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
import Search from '@/components/Search';
import ChatHeader from '@/components/chatComponent/chatHeader';
import ChatMessages from '@/components/chatComponent/chatMessage';
import ChatInput from '@/components/chatComponent/chatInput';
import { auth, db } from '@/config/firebase';
import dynamic from 'next/dynamic';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

const CallModal = dynamic(() => import('@/components/call'), {
  ssr: false,
});

// Define the User type
type User = {
  uid: string;
  displayName: string;
  photoURL: string;
};

export default function Chat() {
  const [callOpen, setCallOpen] = useState(false);
  const [callType, setCallType] = useState<'video' | 'voice' | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User[] | null>([]);

  // Fetch users from Firestore

  const handleSelect = async (selectedUser: User) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', selectedUser.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle user search
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '>=', searchQuery),
      where('displayName', '<=', searchQuery + '\uf8ff')
    );

    try {
      const querySnapshot = await getDocs(q);
      const results: User[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.uid !== auth.currentUser?.uid) {
          results.push({
            uid: doc.id,
            displayName: data.displayName,
            photoURL: data.photoURL,
          });
        }
      });
      setUser(results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCall = (type: 'video' | 'voice') => {
    const user = auth.currentUser;
    if (!user) return;
    const id = `room-${user.uid}`;
    setRoomId(id);
    setCallType(type);
    setCallOpen(true);
  };

  //Effects
  const fetchUsers = async () => {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const usersList: User[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.uid !== auth.currentUser?.uid) {
        usersList.push({
          uid: doc.id,
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      }
    });
    setUser(usersList); // changed from setUser to setUsers
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        fetchUsers();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [handleSearch, searchQuery]);

  const identity = auth.currentUser;

  return (
    <Box p={4}>
      <PageTitle />
      <Stack direction='row' bg='gray.800' borderRadius='3xl' p={4} minH={600}>
        <Box borderRight='2px solid gray' flexBasis={300} pr={4}>
          <Search
            placeholder='Search user'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Box mt={9}>
            {user &&
              user.map((u) => (
                <Flex
                  key={u.uid}
                  // bg='gray.700'
                  my={3}
                  p={2}
                  borderRadius='lg'
                  align='center'
                  gap={3}
                  cursor='pointer'
                  onClick={() => handleSelect(u)}
                >
                  <Avatar src={u.photoURL} />
                  <Text color='white'>{u.displayName}</Text>
                </Flex>
              ))}
          </Box>
        </Box>
        <Box flex='1' display='flex' flexDirection='column'>
          <ChatHeader identity={identity} onCall={handleCall} />
          <ChatMessages scrollRef={scrollRef} />
          <ChatInput scrollRef={scrollRef} />
        </Box>
      </Stack>
      {callType && (
        <CallModal
          isOpen={callOpen}
          onClose={() => setCallOpen(false)}
          type={callType}
          roomId={roomId}
        />
      )}
    </Box>
  );
}
