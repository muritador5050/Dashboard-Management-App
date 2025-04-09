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
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';

type EmailType = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function Emails() {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchEmails() {
      setLoading(true);
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/comments?_limit=10'
      );
      const data = await res.json();
      setEmails(data);
      setLoading(false);
    }

    fetchEmails();
  }, []);

  const handleSend = async () => {
    if (!to || !subject || !message) return;

    // Replace this with your webhook.site URL
    const fakeEmailApi = 'https://jsonplaceholder.typicode.com/posts';
    setLoading(true);
    await fetch(fakeEmailApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, message }),
    });
    setLoading(false);
    toast({
      title: 'Email sent!',
      description: 'This is a mock send using webhook.site.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setTo('');
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <Box p={6}>
      <PageTitle />
      <Heading mb={4}>📥 Inbox</Heading>

      {loading ? (
        <Spinner />
      ) : (
        <VStack align='stretch' spacing={4}>
          <Button
            width={200}
            borderRadius='3xl'
            onClick={onOpen}
            colorScheme='blue'
          >
            Compose
          </Button>
          {emails.map((email) => (
            <Box
              key={email.id}
              p={4}
              border='1px solid gray'
              borderRadius='md'
              bg=' rgb(17, 28, 45)'
            >
              <Text fontWeight='bold'>{email.name}</Text>
              <Text fontSize='sm' color='gray.500'>
                {email.email}
              </Text>
              <Text mt={2}>{email.body}</Text>
            </Box>
          ))}
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg=' rgb(17, 28, 45)' color='rgb(124, 143, 172);'>
          <ModalHeader>New Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading mt={10} mb={4}>
              ✉️ Send Email
            </Heading>
            <VStack align='stretch' spacing={4}>
              <Input
                placeholder='To'
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <Input
                placeholder='Subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Textarea
                placeholder='Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                isLoading={loading}
                colorScheme='blue'
                onClick={handleSend}
              >
                Send
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
