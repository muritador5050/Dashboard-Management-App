'use client';
import { Product } from '@/lib/utils';
import {
  Checkbox,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  Tooltip,
  Button,
  Select,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function List() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Rows per page
  const [totalProducts, setTotalProducts] = useState(100);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const skip = (page - 1) * limit;
        const request = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        const response: { products: Product[]; total: number } =
          await request.json();
        setProductList(response.products);
        setTotalProducts(response.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, [page, limit]);
  const totalPages = Math.ceil(totalProducts / limit);
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Products</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Price</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productList.map((product) => (
            <Tr key={product.id}>
              <Td>
                <Checkbox />
              </Td>
              <Td>
                <Flex alignItems='center' gap={3}>
                  <Image
                    width='70px'
                    height='70px'
                    rounded='full'
                    background='white'
                    src={product.images[0]}
                    alt={product.title}
                  />
                  <Text>{product.title} </Text>
                </Flex>
              </Td>
              <Td>
                {' '}
                <Badge
                  borderRadius='2xl'
                  p={1}
                  variant='subtle'
                  colorScheme='green'
                >
                  {product.status}
                </Badge>
              </Td>
              <Td>{product.meta?.createdAt}</Td>
              <Td>${product.price}</Td>
              <Td cursor='pointer'>
                <Tooltip hasArrow label='Edit' placement='top' fontSize='md'>
                  <EllipsisVertical />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div className='mt-10 flex gap-5 items-center float-right'>
        <p>Rows per page:</p>
        <Select
          sx={{
            option: {
              backgroundColor: 'gray.100',
              color: 'black',
            },
          }}
          variant='flushed'
          width='12'
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
        </Select>
        <Button
          background='transparent'
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={page === 1}
        >
          <ChevronLeft color='red' />
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          background='transparent'
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={page === totalPages}
        >
          <ChevronRight color='red' />
        </Button>
      </div>
    </TableContainer>
  );
}
