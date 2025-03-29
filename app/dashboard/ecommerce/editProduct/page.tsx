import React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';

function EditProduct() {
  return (
    <Box
      width='100%'
      p={6}
      display={{ xxl: 'flex' }}
      gap={{ xxl: '10' }}
      // minW='xxl'
    >
      <Stack flex='1'>
        <Box>
          <Heading>General</Heading>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            <FormHelperText> Well never share your email.</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <Heading>Media</Heading>
        </Box>
        <Box>
          <Heading>Variation</Heading>
        </Box>
        <Box>
          <Heading>Pricing</Heading>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            <FormHelperText> Well never share your email.</FormHelperText>
          </FormControl>
        </Box>
        <ButtonGroup>
          <Button>Save changes</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </Stack>
      <Stack>
        <Box>
          <Heading>Thumbnail</Heading>
        </Box>
        <Box>
          <Heading>Status</Heading>
        </Box>
        <Box>
          <Heading>Product Details</Heading>
        </Box>
        <Box>
          <Heading>Product Template</Heading>
        </Box>
      </Stack>
    </Box>
  );
}

export default EditProduct;
