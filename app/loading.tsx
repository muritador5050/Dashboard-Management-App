import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function Loading() {
  return (
    <Center>
      <Spinner emptyColor='gray.200' color='blue.500' />
    </Center>
  );
}
