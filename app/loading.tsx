import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function Loading() {
  return (
    <Center>
      <Spinner
        thickness='4px'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Center>
  );
}
