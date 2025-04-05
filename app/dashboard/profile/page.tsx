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
  Heading,
  Stack,
  Box,
  Image,
  SimpleGrid,
  Flex,
  Center,
  AbsoluteCenter,
  Button,
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
import { auth } from '@/config/firebase';
import {
  CircleUserRound,
  Facebook,
  Globe,
  StickyNote,
  UserRoundCheck,
  Youtube,
} from 'lucide-react';
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
}

interface GalleryImage {
  id: number;
  image: string;
  caption: string;
}

export default function ProfileTabs() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const userProfile = auth.currentUser?.photoURL;
  const userEmail = auth.currentUser?.email;
  console.log(userEmail);
  const userName = auth.currentUser?.displayName;
  console.log(userName);
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/mockProfile.json');
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  if (!profile) return <Text>Loading...</Text>;

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
              src={userProfile ?? profile.avatar}
              border='4px'
            />
            <Text textAlign='center'>{userName}</Text>
            <Text textAlign='center'>Admin</Text>
          </AbsoluteCenter>
        </Box>
        <Stack
          direction={{ base: 'column', xxl: 'row' }}
          justifyContent={{ base: 'center', xxl: 'space-between' }}
          alignItems='center'
          pb='8'
        >
          <Flex gap={5} pl='4' mb={{ base: '8' }}>
            <Center display='flex' flexDirection='column'>
              <StickyNote />
              <Text>Post</Text>
            </Center>
            <Center display='flex' flexDirection='column'>
              <CircleUserRound />
              <Text>Follower</Text>
            </Center>
            <Center display='flex' flexDirection='column'>
              <UserRoundCheck />
              <Text>Following</Text>
            </Center>
          </Flex>

          <Flex gap={5} align='center' pr='4'>
            <Facebook />
            <Globe />
            <Youtube />
            <Button borderRadius='2xl' colorScheme='blue'>
              Add to Story
            </Button>
          </Flex>
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
            <Stack direction='row' spacing={5} align='center'>
              <Avatar size='xl' src={profile.avatar} />
              <Box>
                <Heading size='md'>{profile.name}</Heading>
                <Text>@{profile.username}</Text>
                <Text>{profile.bio}</Text>
                <Text fontSize='sm' color='gray.400'>
                  {profile.email}
                </Text>
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={5}>
              {profile.followers.map((follower) => (
                <Center key={follower.id} flexDir='column'>
                  <Avatar src={follower.avatar} size='lg' mb={2} />
                  <Text>{follower.name}</Text>
                </Center>
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={5}>
              {profile.friends.map((friend) => (
                <Center key={friend.id} flexDir='column'>
                  <Avatar src={friend.avatar} size='lg' mb={2} />
                  <Text>{friend.name}</Text>
                </Center>
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={[1, 2, 3]} spacing={5}>
              {profile.gallery.map((img) => (
                <Box key={img.id}>
                  <Image src={img.image} borderRadius='lg' alt='al' />
                  <Text mt={2}>{img.caption}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
