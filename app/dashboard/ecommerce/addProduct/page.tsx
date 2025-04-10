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
import RichEditor from '@/components/RichEditor';
import { Product } from '@/lib/utils';
import { showToast } from '@/lib/toastService';
//AddProduct
function AddProduct() {
  const [selectedValue, setSelectedValue] = useState('no-discount');
  const [discount, setDiscount] = useState<number>(0);
  const [product, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addProduct, setAddProduct] = useState({
    name: '',
    description: '',
    status: '',
    price: '',
    discountPercentage: discount,
    image: [] as File[],
    thumbNail: [] as File[],
    productTemplate: '',
    productDetails: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setAddProduct((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleRichChange = (value: string, name: string) => {
    setAddProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: File[], field: string) => {
    setAddProduct((prev) => ({
      ...prev,
      [field]: files,
    }));
  };
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('title', addProduct.name);
    formData.append('description', addProduct.description);
    formData.append('status', addProduct.status);
    formData.append('price', addProduct.price);
    formData.append(
      'discountPercentage',
      addProduct.discountPercentage.toString()
    );

    // Append files
    if (addProduct.image.length > 0)
      formData.append('image', addProduct.image[0]);
    if (addProduct.thumbNail.length > 0)
      formData.append('thumbNail', addProduct.thumbNail[0]);

    formData.append('productTemplate', addProduct.productTemplate);
    formData.append('productDetails', addProduct.productDetails);

    try {
      setIsLoading(true);
      const request = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        body: formData,
      });

      const response = await request.json();
      setProduct(response);
      console.log(product);
      setIsLoading(false);
      setAddProduct({
        name: '',
        description: '',
        status: '',
        price: '',
        discountPercentage: discount,
        image: [] as File[],
        thumbNail: [] as File[],
        productTemplate: '',
        productDetails: '',
      });
      showToast({
        title: 'Post product',
        description: 'Item successfully post',
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      showToast({
        title: 'Post error',
        description: 'Something went wrong',
        status: 'error',
      });
    }
  };
  return (
    <Box width='100%' display={{ xxl: 'flex' }} gap={{ xxl: '10' }}>
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
            <Input
              type='text'
              name='name'
              value={addProduct.name}
              onChange={handleChange}
            />
            <FormHelperText>
              A product name is required and recommended to be unique.
            </FormHelperText>
          </FormControl>
          <FormControl h='max-content'>
            <FormLabel>Description</FormLabel>
            <RichEditor
              name='description'
              onChange={handleRichChange}
              value={addProduct.description}
            />
            <FormHelperText mt={7}>
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
          <FileDropzone
            onFilesChange={(files) => handleFileChange(files, 'image')}
          />
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
            <Input
              type='number'
              name='price'
              value={addProduct.price}
              onChange={handleChange}
            />
            <FormHelperText>Set the product price.</FormHelperText>
          </FormControl>
          <RadioGroup onChange={setSelectedValue} value={selectedValue}>
            <Stack direction={{ base: 'column', xxl: 'row' }} gap={3}>
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
        <ButtonGroup my={7} gap={5}>
          <Button
            isLoading={isLoading}
            onClick={handleAddProduct}
            colorScheme='blue'
            px={12}
            borderRadius='3xl'
          >
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
            <FileDropzone
              onFilesChange={(files) => handleFileChange(files, 'image')}
            />
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
              <option defaultValue='Published' value='option1'>
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
          mb={3}
          borderRadius='xl'
          color='rgb(124, 143, 172)'
        >
          <Heading>Product Template</Heading>
          <FormControl>
            <FormLabel>Select a product template</FormLabel>
            <Select>
              <option defaultValue='Default Template' value='option2'>
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
