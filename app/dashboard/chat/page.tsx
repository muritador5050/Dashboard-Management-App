'use client';
import React, { useEffect, useRef, useState } from 'react';
import PageTitle from '@/components/pageTitle';
import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ImagePlus, Mic, Paperclip, Phone, Smile, Video } from 'lucide-react';

import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

interface Message {
  id: string;
  text: string;
  name: string;
  avatar: string;
  createdAt: Timestamp;
  uid: string;
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    const user = auth.currentUser;

    if (!user) return;

    const { uid, displayName, photoURL } = user;

    await addDoc(collection(db, 'chats'), {
      text: message,
      name: displayName || 'Anonymous',
      avatar: photoURL || '',
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage('');
  };

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: Message[] = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id } as Message);
      });
      const sortedMessages = fetchedMessages.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return a.createdAt.toMillis() - b.createdAt.toMillis();
      });
      setMessages(sortedMessages);
      setTimeout(
        () => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }),
        100
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box p={4}>
      <PageTitle />
      <Stack direction='row' bg='gray.800' borderRadius='3xl' p={4}>
        <Box borderRight='2px solid gray' flexBasis={300} pr={4}>
          <Avatar mb={2} />
          <Text color='white'>Sidebar</Text>
        </Box>
        <Box flex='1' display='flex' flexDirection='column'>
          <Flex justifyContent='space-between' alignItems='center' pb={2}>
            <Avatar size='sm' />
            <Center gap={3}>
              <Phone color='white' />
              <Video color='white' />
            </Center>
          </Flex>

          <VStack
            spacing={3}
            align='stretch'
            flex='1'
            overflowY='scroll'
            bg='gray.700'
            p={3}
            borderRadius='lg'
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                alignSelf={
                  msg.uid === auth.currentUser?.uid ? 'flex-end' : 'flex-start'
                }
                bg={msg.uid === auth.currentUser?.uid ? 'blue.500' : 'gray.600'}
                color='white'
                px={4}
                py={2}
                borderRadius='xl'
                maxW='70%'
              >
                <Text fontSize='sm' fontWeight='bold'>
                  {msg.name}
                </Text>
                <Text>{msg.text}</Text>
                {msg.createdAt?.seconds && (
                  <Text fontSize='xs' color='gray.300' mt={1}>
                    {new Date(
                      msg.createdAt.seconds * 1000
                    ).toLocaleTimeString()}
                  </Text>
                )}
              </Box>
            ))}
            <div ref={scrollRef} />
          </VStack>

          <InputGroup size='md' mt={3}>
            <InputLeftAddon bg='gray.600' border='none' cursor='pointer'>
              <Smile size={18} />
            </InputLeftAddon>
            <Input
              placeholder='Type a message...'
              border='none'
              bg='gray.600'
              color='white'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <InputRightAddon bg='gray.600' border='none'>
              <Flex gap={2}>
                <IconButton
                  icon={<ImagePlus size={18} />}
                  aria-label='Attach image'
                  variant='ghost'
                  size='sm'
                />
                <IconButton
                  icon={<Paperclip size={18} />}
                  aria-label='Attach file'
                  variant='ghost'
                  size='sm'
                />
                <IconButton
                  icon={<Mic size={18} />}
                  aria-label='Voice message'
                  variant='ghost'
                  size='sm'
                />
              </Flex>
            </InputRightAddon>
          </InputGroup>
        </Box>
      </Stack>
    </Box>
  );
}
