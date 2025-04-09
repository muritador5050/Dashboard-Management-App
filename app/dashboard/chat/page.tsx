'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Box, Flex, Stack, Text, VStack } from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
import Search from '@/components/Search';
import ChatHeader from '@/components/chatComponent/chatHeader';
import ChatMessages from '@/components/chatComponent/chatMessage';
import ChatInput from '@/components/chatComponent/chatInput';
import { auth, db } from '@/config/firebase';
import dynamic from 'next/dynamic';
import { collection, getDocs, query, where } from 'firebase/firestore';

const CallModal = dynamic(() => import('@/components/call'), {
  ssr: false,
});

// Define the User type
type User = {
  uid: string;
  displayName: string;
  photoUrl: string;
};

export default function Chat() {
  const [callOpen, setCallOpen] = useState(false);
  const [callType, setCallType] = useState<'video' | 'voice' | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const [userName, setUserName] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<User[]>([]); // Users state is now an array

  // Fetch users from Firestore
  const fetchUsers = async () => {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const usersList: User[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.displayName && data.photoUrl) {
        usersList.push({
          uid: doc.id,
          displayName: data.displayName,
          photoUrl: data.photoUrl,
        });
      }
    });
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const handleSelect = async () => {
  //   const currentUser = auth.currentUser;
  //   const combinedId =
  //     currentUser?.uid > users?.uid
  //       ? currentUser?.uid + users?.uid
  //       : users?.uid + currentUser?.uid;
  //   const res = await getDocs(collection(db, 'chats', combinedId));

  // };

  // Handle user search
  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '>=', userName),
      where('displayName', '<=', userName + '\uf8ff') // Allows for partial search
    );
    const querySnapshot = await getDocs(q);
    const usersList: User[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.displayName && data.photoUrl) {
        usersList.push({
          uid: doc.id,
          displayName: data.displayName,
          photoUrl: data.photoUrl,
        });
      }
    });
    setUsers(usersList);
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    return event.code === 'Enter' && handleSearch();
  };

  const handleCall = (type: 'video' | 'voice') => {
    const user = auth.currentUser;
    if (!user) return;
    const id = `room-${user.uid}`;
    setRoomId(id);
    setCallType(type);
    setCallOpen(true);
  };

  const identity = auth.currentUser;

  return (
    <Box p={4}>
      <PageTitle />
      <Stack direction='row' bg='gray.800' borderRadius='3xl' p={4}>
        <Box borderRight='2px solid gray' flexBasis={300} pr={4}>
          <Search
            placeholder='Search user'
            value={userName}
            onKeyDown={handleKey}
            onChange={(e) => setUserName(e.target.value)}
          />
          <VStack spacing={2} mt={4}>
            {users && (
              <VStack spacing={2}>
                {users.map((user) => (
                  <Flex
                    key={user.uid}
                    bg='gray.700'
                    p={2}
                    borderRadius='lg'
                    minW={200}
                    align='center'
                    gap={3}
                  >
                    <Avatar src={user.photoUrl} />
                    <Text color='white'>{user.displayName}</Text>
                  </Flex>
                ))}
              </VStack>
            )}
          </VStack>
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
