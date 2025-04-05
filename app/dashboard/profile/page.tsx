'use client';
import React, { useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Text,
  Stack,
  Box,
  Image,
  SimpleGrid,
  Flex,
  Center,
  AbsoluteCenter,
  Button,
  Circle,
  Stat,
  StatNumber,
  StatHelpText,
  StatGroup,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Textarea,
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
import { auth } from '@/config/firebase';
import {
  CircleUserRound,
  Facebook,
  Globe,
  Mail,
  PictureInPicture2,
  StickyNote,
  UserRoundCheck,
  Youtube,
} from 'lucide-react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
type CommentType = {
  id: string;
  comment: string;
  name: string;
  createdAt: Date;
};
export default function ProfileTabs() {
  const [commentText, setCommentText] = useState('');
  const [comment, setComment] = useState<CommentType[]>([]);

  const userDetail = auth.currentUser;
  const userField = [
    { label: <PictureInPicture2 />, value: userDetail?.displayName },
    { label: <Mail />, value: userDetail?.email },
  ];

  const handlePost = async () => {
    if (!commentText.trim()) return;

    const docRef = await addDoc(collection(db, 'comments'), {
      comment: commentText,
      name: auth.currentUser?.displayName || 'Anonymous',
      createdAt: new Date(),
    });

    setComment((prev) => [
      ...prev,
      {
        id: docRef.id,
        comment: commentText,
        name: auth.currentUser?.displayName || 'Anonymous',
        createdAt: new Date(),
      },
    ]);

    setCommentText('');
  };

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getDocs(collection(db, 'comments'));

        const response: CommentType[] = data.docs.map((doc) => {
          const docData = doc.data();

          return {
            id: doc.id,
            comment: docData.comment,
            name: docData.name,
            createdAt: docData.createdAt?.toDate?.() || new Date(), // convert Firestore Timestamp to JS Date
          };
        });

        setComment(response);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, []);

  return (
    <>
      <PageTitle />
      <Box bg='rgb(17, 28, 45)' borderTopRadius='xl'>
        <Image
          src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/profilebg.jpg'
          alt='al'
          borderTopRadius='xl'
        />
        <Box position='relative' mb={{ base: '24', xxl: '12' }}>
          <AbsoluteCenter>
            <Avatar
              size='xl'
              src={auth.currentUser?.photoURL ?? '../user'}
              border='4px'
            />
            <Text textAlign='center'>{auth.currentUser?.displayName}</Text>
            <Text textAlign='center'>Admin</Text>
          </AbsoluteCenter>
        </Box>
        <Stack
          direction={{ base: 'column', xxl: 'row' }}
          justifyContent={{ base: 'center', xxl: 'space-between' }}
          alignItems='center'
          pb='8'
        >
          <StatGroup gap={5} pl='4' mb={{ base: '8' }}>
            <Stat>
              <Center>
                <StickyNote size={20} />
              </Center>
              <StatNumber fontSize='xl' color='white'>
                23,6477
              </StatNumber>
              <StatHelpText>Posts</StatHelpText>
            </Stat>
            <Stat>
              <Center>
                <CircleUserRound size={20} />
              </Center>
              <StatNumber fontSize='xl' color='white'>
                23,6477
              </StatNumber>
              <StatHelpText>Followers</StatHelpText>
            </Stat>
            <Stat>
              <Center>
                <UserRoundCheck size={20} />
              </Center>
              <StatNumber fontSize='xl' color='white'>
                23,6477
              </StatNumber>
              <StatHelpText>Followers</StatHelpText>
            </Stat>
          </StatGroup>

          <Stack direction='row' gap={5} align='center' pr='4'>
            <Circle size='40px' bg='blue' cursor='pointer'>
              <Facebook />
            </Circle>
            <Circle size='40px' bg='cyan' cursor='pointer'>
              <Globe />
            </Circle>
            <Circle size='40px' bg='tomato' cursor='pointer'>
              <Youtube />
            </Circle>
            <Button borderRadius='2xl' colorScheme='blue'>
              Add to Story
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Tabs>
        <Flex justify='flex-end'>
          <TabList>
            <Tab>Profile</Tab>
            <Tab>Followers</Tab>
            <Tab>Friends</Tab>
            <Tab>Gallery</Tab>
          </TabList>
        </Flex>
        <TabPanels>
          <TabPanel>
            <Stack direction={{ base: 'column', xxl: 'row' }} gap={7}>
              <Card
                bg='rgb(17, 28, 45)'
                color='white'
                border='1px'
                borderRadius='xl'
                pl='5'
                width={{ xxl: '500px' }}
              >
                <CardHeader>
                  <Heading> Introduction</Heading>
                </CardHeader>
                <Text>
                  Hello, I am {auth.currentUser?.displayName}. I love making
                  websites and graphics. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.{' '}
                </Text>

                {userField.map(({ label, value }, i) => (
                  <CardBody key={i}>
                    <Flex gap='3' key={i}>
                      <>{label}</>
                      <Text>{value}</Text>
                    </Flex>
                  </CardBody>
                ))}
              </Card>
              <Box
                bg='rgb(17, 28, 45)'
                color='white'
                border='1px'
                borderRadius='xl'
                px='4'
                py='12'
                width={{ xxl: '100%' }}
              >
                <Textarea
                  placeholder='Leave a comment here'
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  bg='blue'
                  borderRadius='xl'
                  float='right'
                  mt='5px'
                  onClick={handlePost}
                >
                  Post
                </Button>
              </Box>
            </Stack>
            <Box
              minH='2xl'
              mt={8}
              bg='rgb(17, 28, 45)'
              border='1px'
              borderRadius='xl'
              p={5}
            >
              <Stack direction='row' gap={3}>
                <Avatar src={auth.currentUser?.photoURL ?? ''} />
                <Text>{auth.currentUser?.displayName}</Text>
              </Stack>
              {comment.map((cm, i) => (
                <Stack key={i}>
                  <Text> {cm.comment}</Text>
                  <Text fontSize='sm' color='gray.400'>
                    {dayjs(cm.createdAt).fromNow()}
                  </Text>
                </Stack>
              ))}
            </Box>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={5}></SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={5}></SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={5}></SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
