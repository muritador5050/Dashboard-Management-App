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
  Tag,
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
import { auth } from '@/config/firebase';
import {
  Apple,
  CircleUserRound,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  PictureInPicture2,
  StickyNote,
  Twitter,
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

interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  followers: FollowerFriend[];
  friends: FollowerFriend[];
  gallery: GalleryImage[];
}

interface FollowerFriend {
  id: number;
  name: string;
  avatar: string;
  status?: string;
  country?: string;
  proffession?: string;
}

interface GalleryImage {
  id: number;
  image: string;
  caption: string;
  date: string;
}

export default function ProfileTabs() {
  const [commentText, setCommentText] = useState('');
  const [comment, setComment] = useState<CommentType[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

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
            createdAt: docData.createdAt?.toDate?.() || new Date(),
          };
        });

        setComment(response);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();

    async function fetchProfile() {
      const res = await fetch('/mockProfile.json'); // replace with your hosted URL
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
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
            <SimpleGrid columns={{ base: 1, md: 2, xxl: 3 }} spacing={5}>
              {profile?.followers.map((follower) => (
                <Box
                  key={follower.id}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  bg='rgb(17, 28, 45)'
                  borderRadius='xl'
                  p={7}
                >
                  <Flex align='center' gap={3}>
                    <Avatar src={follower.avatar} size='md' mb={2} />
                    <Stack gap={0}>
                      <Text>{follower.name}</Text>
                      <Flex align='center'>
                        <MapPin size={12} />
                        <Text fontSize='xs'>{follower.country}</Text>
                      </Flex>
                    </Stack>
                  </Flex>
                  <Tag
                    colorScheme='blue'
                    borderRadius='xl'
                    cursor='pointer'
                    variant={`${
                      follower.status === 'Follow' ? 'outline' : 'solid'
                    }`}
                  >
                    {follower.status}
                  </Tag>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, xxl: 3 }} spacing={5}>
              {profile?.friends.map((friend) => (
                <Box
                  key={friend.id}
                  bg='rgb(17, 28, 45)'
                  borderRadius='xl'
                  pt={7}
                  cursor='pointer'
                  sx={{
                    transition: 'transform 0.2s ease-in-out',
                    _hover: { transform: 'translateY(-10px)' },
                  }}
                >
                  <Center mb={16}>
                    <Stack align='center' gap={0}>
                      <Avatar src={friend.avatar} size='md' mb={2} />
                      <Text>{friend.name}</Text>
                      <Text fontSize='xs'>{friend.proffession}</Text>
                    </Stack>
                  </Center>
                  <Flex
                    bg='whiteAlpha.400'
                    justifyContent='center'
                    gap={3}
                    py={4}
                  >
                    <Facebook color='blue' size={20} />
                    <Instagram size={20} color='orange' />
                    <Apple size={20} color='purple' />
                    <Twitter size={20} color='cyan' />
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, xxl: 3 }} spacing={5}>
              {profile?.gallery.map((img) => (
                <Box
                  key={img.id}
                  bg='rgb(17, 28, 45)'
                  borderRadius='xl'
                  pb={5}
                  cursor='pointer'
                  sx={{
                    transition: 'transform 0.2s ease-in-out',
                    _hover: { transform: 'translateY(-10px)' },
                  }}
                >
                  <Image
                    width='100%'
                    src={img.image}
                    borderTopRadius='xl'
                    alt='img'
                    bg='white'
                  />
                  <Text mt={2} ml={3}>
                    {img.caption}
                  </Text>
                  <Text ml={3}>{img.date}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
