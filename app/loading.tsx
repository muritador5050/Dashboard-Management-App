import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function Loading() {
  return (
    <Center mt={6} display='flex' justifyContent='center' alignItems='center'>
      <Spinner emptyColor='gray.200' color='blue.500' />
    </Center>
  );
}
