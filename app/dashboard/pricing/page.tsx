'use client';
import PageTitle from '@/components/pageTitle';
import {
  Box,
  Heading,
  Image,
  Stack,
  Stat,
  StatLabel,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  Tag,
  Flex,
  Switch,
} from '@chakra-ui/react';
import { Check, X as Uncheck } from 'lucide-react';
import React from 'react';

export default function Pricing() {
  return (
    <Box>
      <PageTitle />
      <Stack alignItems='center' my={7}>
        <Heading maxW={600}>
          Flexible Plans Tailored to Fit Your Community&apos;s Unique Needs!
        </Heading>
        <Flex alignItems='center' gap={2}>
          <Text>monthly</Text>
          <Switch id='email-alerts' />
          <Text>yearly</Text>
        </Flex>
      </Stack>
      <Stack direction={{ base: 'column', xxl: 'row' }} gap={9}>
        <Box
          display='flex'
          flexDirection='column'
          gap={7}
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='3xl'
          width='80%'
          alignSelf={{ base: 'center' }}
        >
          <Text fontWeight='medium'>SILVER</Text>
          <Image
            width={100}
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/silver.png'
            alt='silver'
          />
          <Stat>
            <StatLabel fontSize='5xl' fontWeight='bold' color='white'>
              Free
            </StatLabel>
          </Stat>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={Check} color='green.500' />3 Members
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Single Devise
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              50GB Storage
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Monthly Backups
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Permissions & workflows
            </ListItem>
          </List>
          <Button colorScheme='blue' borderRadius='3xl'>
            Choose Silver
          </Button>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={7}
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='3xl'
          maxW='fit-content'
          alignSelf={{ base: 'center' }}
        >
          <Flex justifyContent='space-between' w='full'>
            <Text fontWeight='medium'>BRONZE</Text>
            <Tag bg='goldenrod' borderRadius='3xl'>
              POPULAR
            </Tag>
          </Flex>
          <Image
            width={100}
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/bronze.png'
            alt='bronze'
          />
          <Stat>
            <Flex alignItems='center'>
              <StatLabel fontSize='5xl' fontWeight='bold' color='white'>
                <sup>$</sup> 4.99
              </StatLabel>
              <p className='text-xl ml-3'> /mo</p>
            </Flex>
          </Stat>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={Check} color='green.500' />5 Members
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Single Devise
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              80GB Storage
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Monthly Backups
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Permissions & workflows
            </ListItem>
          </List>
          <Button colorScheme='blue' borderRadius='3xl'>
            Choose Bronze
          </Button>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={7}
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='3xl'
          maxW='fit-content'
          alignSelf={{ base: 'center' }}
        >
          <Text fontWeight='medium'>GOLD</Text>
          <Image
            width={100}
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/gold.png'
            alt='gold'
          />
          <Stat>
            <Flex alignItems='center'>
              <StatLabel fontSize='5xl' fontWeight='bold' color='white'>
                <sup>$</sup> 9.99
              </StatLabel>
              <p className='text-xl ml-3'> /mo</p>
            </Flex>
          </Stat>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={Check} color='green.500' />5 Members
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Single Devise
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              120GB Storage
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Monthly Backups
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Permissions & workflows
            </ListItem>
          </List>
          <Button colorScheme='blue' borderRadius='3xl'>
            Choose Gold
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
