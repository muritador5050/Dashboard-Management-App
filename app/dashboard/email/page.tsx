'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  Input,
  Textarea,
  Button,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Avatar,
  HStack,
  Badge,
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
import { useThemeColor } from '@/lib/themeUtil';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
};

export default function Emails() {
  const { childBgColor, textColor } = useThemeColor();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error fetching users',
        description: 'Could not load users from Firebase',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleSend = async () => {
    if (!selectedUser || !subject || !message) return;

    try {
      setSending(true);

      // Simulate API call with 2-3 seconds delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      toast({
        title: 'Email sent successfully!',
        description: `Email sent to ${
          selectedUser.displayName || selectedUser.email
        }`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      // Reset form
      setSelectedUser(null);
      setSubject('');
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Send failed:', error);
      toast({
        title: 'Error sending email',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSending(false);
    }
  };

  const handleModalClose = () => {
    if (!sending) {
      setSelectedUser(null);
      setSubject('');
      setMessage('');
      onClose();
    }
  };

  return (
    <Box p={6}>
      <PageTitle />
      <Heading mb={4}>📥 Users</Heading>

      {loading ? (
        <Box display='flex' justifyContent='center' py={8}>
          <Spinner size='lg' />
        </Box>
      ) : (
        <VStack align='stretch' spacing={4}>
          <Text fontSize='md' color='gray.600' mb={2}>
            Click on a user to send them an email
          </Text>
          {users.map((user) => (
            <Box
              key={user.uid}
              p={4}
              border='1px solid gray'
              borderRadius='md'
              bg={childBgColor}
              cursor='pointer'
              transition='all 0.2s'
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'md',
                borderColor: 'blue.300',
              }}
              onClick={() => handleUserSelect(user)}
            >
              <HStack spacing={3}>
                <Avatar size='md' src={user.photoURL} />
                <Box flex={1}>
                  <Text fontWeight='bold'>
                    {user.displayName || 'Anonymous'}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    {user.email}
                  </Text>
                </Box>
                <Badge colorScheme='blue' variant='outline'>
                  Send Email
                </Badge>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}

      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        closeOnOverlayClick={!sending}
        closeOnEsc={!sending}
      >
        <ModalOverlay />
        <ModalContent bg={childBgColor} color={textColor}>
          <ModalHeader>
            <HStack spacing={3}>
              <Text>✉️ Send Email</Text>
              {sending && <Spinner size='sm' />}
            </HStack>
          </ModalHeader>
          {!sending && <ModalCloseButton />}

          <ModalBody>
            {selectedUser && (
              <Box mb={4} p={3} bg='gray.50' borderRadius='md'>
                <Text fontSize='sm' color='gray.600' mb={1}>
                  To:
                </Text>
                <HStack>
                  <Avatar size='sm' src={selectedUser.photoURL} />
                  <Box>
                    <Text fontWeight='semibold'>
                      {selectedUser.displayName || 'Anonymous'}
                    </Text>
                    <Text fontSize='sm' color='gray.500'>
                      {selectedUser.email}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}

            <VStack align='stretch' spacing={4}>
              <Input
                placeholder='Subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={sending}
              />
              <Textarea
                placeholder='Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                disabled={sending}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={handleSend}
              isLoading={sending}
              loadingText='Sending...'
              disabled={!subject || !message || !selectedUser}
            >
              Send Email
            </Button>
            <Button
              variant='ghost'
              onClick={handleModalClose}
              disabled={sending}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
