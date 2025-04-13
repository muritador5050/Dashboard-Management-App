'use client';
import React, { useEffect, useState } from 'react';
import { formatTime, Product } from '../../lib/utils';
import { Image, Tag } from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import { UnicodeStarRating } from '@/components/StarRating';
//tables

export default function ProductWithRewiewAndTime() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=5')
      .then((response) => response.json())
      .then((data: { products: Product[] }) => {
        const productsWithPaymentAndStatus = data.products.map((product) => ({
          ...product,
          status: getOrderStatus(product.stock),
          rating: product.rating,
        }));
        setProducts(productsWithPaymentAndStatus);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
          <tr className='h-16 border-b'>
            <th className='text-left px-4 py-2'>#</th>
            <th className='text-left px-4 py-2'>Products</th>
            <th className='text-left px-4 py-2'>Brand</th>
            <th className='text-left px-4 py-2'>Reviews</th>
            <th className='text-left px-4 py-2'>Status</th>
            <th className='text-left px-4 py-2'>Time</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-t h-24'>
              <td className='px-4 py-2'>
                <input type='checkbox' />
              </td>
              <td className='px-4 py-2 flex items-center gap-4'>
                <Image
                  src={product.images[0]}
                  alt='product-img'
                  width={70}
                  height={70}
                  className='rounded-full bg-white'
                />
                <span>{product.title}</span>
              </td>
              <td className='px-4 py-2'>{product.brand}</td>
              <td className='px-4 py-2'>
                <UnicodeStarRating rating={product.rating} />
              </td>
              <td className='px-4 py-2'>
                <Badge
                  borderRadius='2xl'
                  p={1}
                  variant='subtle'
                  colorScheme='green'
                  fontSize='0.75rem'
                >
                  {product.status}
                </Badge>
              </td>
              <td className='px-4 py-2'>
                {formatTime(product.meta?.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
