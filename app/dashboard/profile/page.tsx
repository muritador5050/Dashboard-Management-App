// 'use client';
// import React from 'react';
// import {
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Box,
//   Image,
// } from '@chakra-ui/react';

// import PageTitle from '@/components/pageTitle';

// //Profile
// export default function Profile() {
//   return (
//     <div>
//       <Box>
//         <PageTitle />
//         <Image
//           src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/profilebg.jpg'
//           alt='profile-bg'
//         />
//       </Box>
//       <Tabs>
//         <TabList justifyContent='flex-end'>
//           <Tab>Profile</Tab>
//           <Tab>Followers</Tab>
//           <Tab>Freinds</Tab>
//           <Tab>Gallery</Tab>
//         </TabList>
//         <TabPanels>
//           <TabPanel>
//             <p>one!</p>
//           </TabPanel>
//           <TabPanel>
//             <p>two!</p>
//           </TabPanel>
//           <TabPanel>
//             <p>three!</p>
//           </TabPanel>
//           <TabPanel>
//             <p>four!</p>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </div>
//   );
// }

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
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';
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

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/mockProfile.json'); // replace with your hosted URL
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  if (!profile) return <Text>Loading...</Text>;

  return (
    <Box maxW='5xl' mx='auto' p={5}>
      <Box>
        <PageTitle />
        <Image
          src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/profilebg.jpg'
          alt='al'
        />
        <Stack>
          <Text>Friends</Text>
          <Text>Friends</Text>
          <Text>Friends</Text>
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
    </Box>
  );
}
