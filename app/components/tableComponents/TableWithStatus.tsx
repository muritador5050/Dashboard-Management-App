'use client';
import React, { useEffect, useState } from 'react';
import { Product } from '../../lib/utils';
import { Image, Tag } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
//tables
export default function ProductWithStatusAndPayment() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=5')
      .then((response) => response.json())
      .then((data: { products: Product[] }) => {
        const updatedProducts: Product[] = data.products.map((product) => ({
          ...product,
          payment: getPaymentStatus(product.stock),
          status: getOrderStatus(product.stock),
        }));
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function that returns JSX based on price
  const getPaymentStatus = (stock: number) => {
    if (stock <= 5) {
      return (
        <div className='flex flex-col'>
          <small>Cancelled</small>
          <Progress
            value={stock}
            colorScheme='red'
            borderRadius='3xl'
            size='sm'
          />
        </div>
      );
    } else if (stock >= 10 && stock <= 25) {
      return (
        <div className='flex flex-col'>
          <small>Paid</small>
          <Progress
            value={stock}
            colorScheme='yellow'
            borderRadius='3xl'
            size='sm'
          />
        </div>
      );
    } else if (stock >= 30 && stock <= 45) {
      return (
        <div className='flex flex-col'>
          <small>Pending</small>
          <Progress
            value={stock}
            colorScheme='gray'
            borderRadius='3xl'
            size='sm'
          />
        </div>
      );
    } else {
      return (
        <div className='flex flex-col'>
          <small>Paid</small>
          <Progress
            value={stock}
            colorScheme='green'
            borderRadius='3xl'
            size='sm'
          />
        </div>
      );
    }
  };

  // Determine order status
  const getOrderStatus = (stock: number) => {
    if (stock <= 5) {
      return (
        <Tag
          borderRadius='2xl'
          p={1}
          variant='subtle'
          colorScheme='red'
          fontSize='.75rem'
        >
          Cancelled
        </Tag>
      );
    } else if (stock >= 10 && stock <= 25) {
      return (
        <Tag
          borderRadius='2xl'
          p={1}
          variant='subtle'
          colorScheme='yellow'
          fontSize='.75rem'
        >
          Pending
        </Tag>
      );
    } else if (stock >= 30 && stock <= 45) {
      return (
        <Tag
          borderRadius='2xl'
          p={1}
          variant='subtle'
          colorScheme='green'
          fontSize='.75rem'
        >
          Processing
        </Tag>
      );
    } else {
      return (
        <Tag
          borderRadius='2xl'
          p={1}
          variant='subtle'
          colorScheme='gray'
          fontSize='.75rem'
        >
          Delivered
        </Tag>
      );
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='table-auto w-full border-collapse'>
        <thead>
          <tr className='text-left h-16 border-b'>
            <th className='px-4 py-2'>Products</th>
            <th className='px-4 py-2'>Payment</th>
            <th className='px-4 py-2 text-right'>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-t h-16'>
              <td className='px-4 py-2 flex items-center gap-4'>
                <Image
                  src={product.images[0]}
                  alt='product-img'
                  width={70}
                  height={70}
                  className='rounded-full bg-white'
                />
                <span className='whitespace-nowrap'>{product.title}</span>
              </td>
              <td className='px-4 py-2'>{product.payment}</td>
              <td className='px-4 py-2 text-right'>
                <Tag
                  borderRadius='2xl'
                  p={1}
                  variant='subtle'
                  colorScheme='green'
                  fontSize='.75rem'
                >
                  {product.status}
                </Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
