import { Box, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { auth, db } from '@/config/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  Timestamp,
} from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Timestamp;
  uid: string;
}
interface ChatMessagesProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}
export default function ChatMessages({ scrollRef }: ChatMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(msgs);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, [scrollRef]);

  return (
    <VStack
      spacing={3}
      align='stretch'
      flex='1'
      overflowY='scroll'
      bg='rgb(10, 28, 49)'
      p={3}
      borderRadius='lg'
      maxH={500}
    >
      {messages.map((msg) => (
        <Box
          key={msg.id}
          alignSelf={
            msg.uid === auth.currentUser?.uid ? 'flex-end' : 'flex-start'
          }
          bg={msg.uid === auth.currentUser?.uid ? 'purple.500' : 'gray.600'}
          color='white'
          px={2}
          py={2}
          borderTopRightRadius='2xl'
          borderBottomLeftRadius='2xl'
          minW='40%'
        >
          <Text>{msg.text}</Text>
          {msg.createdAt?.seconds && (
            <Text fontSize='xs' color='gray.300' mt={1}>
              {new Date(msg.createdAt.seconds * 1000).toLocaleTimeString()}
            </Text>
          )}
        </Box>
      ))}
      <div ref={scrollRef} />
    </VStack>
  );
}
