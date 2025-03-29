'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react';
import FileDropzone from '@/components/FiledropZone';
import DiscountSlider from '@/components/Slider';
import SearchableDropdown from '@/components/Select';
//AddProduct
function AddProduct() {
  const [selectedValue, setSelectedValue] = useState('no-discount');
  const [discount, setDiscount] = useState<number>(0);
  return (
    <Box width='100%' p={6} display={{ xxl: 'flex' }} gap={{ xxl: '10' }}>
      <Stack flex='1'>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>General</Heading>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input type='email' />
            <FormHelperText>
              A product name is required and recommended to be unique.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <FormHelperText>
              Set a description to the product for better visibility.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>Media</Heading>
          <FileDropzone />
        </Box>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>Variation</Heading>
        </Box>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
          display='flex'
          flexDirection='column'
          gap={7}
        >
          <Heading>Pricing</Heading>
          <FormControl isRequired>
            <FormLabel>Base Price </FormLabel>
            <Input type='text' />
            <FormHelperText>Set the product price.</FormHelperText>
          </FormControl>
          <RadioGroup onChange={setSelectedValue} value={selectedValue}>
            <Stack direction='row'>
              <Box
                border={
                  selectedValue === 'no-discount'
                    ? '2px solid blue'
                    : '2px solid gray'
                }
                borderRadius='md'
                p={3}
                width='100%'
              >
                <Radio value='no-discount'>No Discount</Radio>
              </Box>
              <Box
                border={
                  selectedValue === 'percentage'
                    ? '2px solid blue'
                    : '2px solid gray'
                }
                borderRadius='md'
                p={3}
                width='100%'
              >
                <Radio value='percentage'>Percentage %</Radio>
              </Box>
              <Box
                border={
                  selectedValue === 'fixed-price'
                    ? '2px solid blue'
                    : '2px solid gray'
                }
                borderRadius='md'
                p={3}
                width='100%'
              >
                <Radio value='fixed-price'>Fixed Price</Radio>
              </Box>
            </Stack>
          </RadioGroup>
          <Box mt={4} fontWeight='bold'>
            {selectedValue === 'no-discount' && ''}
            {selectedValue === 'percentage' && (
              <FormControl isRequired>
                <FormLabel>Set Discount Percentage</FormLabel>
                <DiscountSlider value={discount} setValue={setDiscount} />
                <FormHelperText>
                  Set a percentage discount to be applied on this product.
                </FormHelperText>
              </FormControl>
            )}
            {selectedValue === 'fixed-price' && (
              <FormControl isRequired>
                <FormLabel>Fixed Discounted Price</FormLabel>
                <Input type='text' placeholder='Discount Price' />
                <FormHelperText>
                  Set the discounted product price. The product will be reduced
                  at the determined fixed price.
                </FormHelperText>
              </FormControl>
            )}
          </Box>
          <Stack direction='row' gap={9}>
            <FormControl isRequired>
              <FormLabel>Tax Class</FormLabel>
              <Select placeholder='Select option'>
                <option value='option1'>Tax Free</option>
                <option value='option2'>Taxable Goods</option>
                <option value='option3'>Downloadable Products</option>
              </Select>
              <FormHelperText>Set the product tax class.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>VAT Amount (%)</FormLabel>
              <Input type='text' placeholder='Discount Price' />
              <FormHelperText>Set the product VAT about.</FormHelperText>
            </FormControl>
          </Stack>
        </Box>
        <ButtonGroup mt={6} gap={5}>
          <Button colorScheme='blue' px={12} borderRadius='3xl'>
            Save changes
          </Button>
          <Button
            px={8}
            borderRadius='3xl'
            bg='red.500'
            opacity='30'
            _hover={{ bg: 'tomato', color: 'white' }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Stack>
      <Stack>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>Thumbnail</Heading>
          <FormControl>
            <FileDropzone />
            <FormHelperText textAlign='center'>
              Set the product thumbnail image. <br />
              Only *.png, *.jpg and *.jpeg image files are accepted.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>Status</Heading>
          <FormControl>
            <Select>
              <option selected value='option1'>
                Published
              </option>
              <option value='option2'>Draft</option>
              <option value='option3'>Scheduled</option>
              <option value='option3'>InActive</option>
            </Select>
            <FormHelperText>Set the product status.</FormHelperText>
          </FormControl>
        </Box>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>Product Details</Heading>
          <FormControl>
            <FormLabel>Categories</FormLabel>
            <SearchableDropdown />
            <FormHelperText>Add product to a category.</FormHelperText>
          </FormControl>
        </Box>
        <Box
          bg='rgb(17, 28, 45)'
          p={5}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>Product Template</Heading>
          <FormControl>
            <FormLabel>Select a product template</FormLabel>
            <Select>
              <option selected value='option2'>
                Default Template
              </option>
              <option value='option3'>Fashion</option>
              <option value='option3'>Office Stationary</option>
              <option value='option3'>Electronics</option>
            </Select>
            <FormHelperText>
              Assign a template from your current theme to define how a single
              product is displayed.
            </FormHelperText>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  );
}

export default AddProduct;
