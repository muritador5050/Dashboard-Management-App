import {
  Avatar,
  Center,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Phone, Video } from 'lucide-react';
import React from 'react';
import { User } from 'firebase/auth';

//typePorps
interface ChatHeaderProps {
  identity: User | null;
  onCall: (type: 'voice' | 'video') => void;
}

export default function ChatHeader({ identity, onCall }: ChatHeaderProps) {
  const headColor = useColorModeValue('black', 'white');
  return (
    <Flex justifyContent='space-between' alignItems='center' pb={2}>
      <Flex align='center' gap={2}>
        <Avatar size='sm' src={identity?.photoURL ?? ''} />
        <Text color={headColor} fontFamily='cursive'>
          {identity?.displayName?.toLocaleUpperCase()}
        </Text>
      </Flex>
      <Center gap={3}>
        <IconButton
          icon={<Phone color='blue' />}
          aria-label='Voice Call'
          variant='ghost'
          size='sm'
          onClick={() => onCall('voice')}
        />
        <IconButton
          icon={<Video color='blue' />}
          aria-label='Video Call'
          variant='ghost'
          size='sm'
          onClick={() => onCall('video')}
        />
      </Center>
    </Flex>
  );
}
