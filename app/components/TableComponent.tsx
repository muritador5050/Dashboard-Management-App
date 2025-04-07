'use client';
import React, { JSX, useEffect, useState } from 'react';
import { formatTime, Product } from '../lib/utils';
import { Image } from '@chakra-ui/react';
import { Badge, Progress } from '@chakra-ui/react';
import { UnicodeStarRating } from '@/components/StarRating';
//tables
export default function ProductWithStatusAndPayment() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=5')
      .then((response) => response.json())
      .then((data: { products: Product[] }) => {
        const updatedProducts: Product[] = data.products.map((product) => ({
          ...product,
          payment: getPaymentStatus(product.price), // Ensure JSX output
          status: getOrderStatus(product.stock),
        }));
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function that returns JSX based on price
  const getPaymentStatus = (price: number): JSX.Element => {
    if (price > 50) {
      return (
        <span className='flex flex-col'>
          <small>Paid</small>
          <Progress value={100} colorScheme='green' size='sm' />
        </span>
      );
    } else {
      return (
        <div className='flex flex-col gap-1'>
          {[
            { status: 'Pending', value: 25 },
            { status: 'Cancelled', value: 45 },
            { status: 'Confirmed', value: 60 },
            { status: 'Unpaid', value: 80 },
          ].map((item, index) => (
            <div key={index} className='flex flex-col'>
              <small>{item.status}</small>
              <Progress value={item.value} colorScheme='red' size='sm' />
            </div>
          ))}
        </div>
      );
    }
  };

  // Determine order status
  const getOrderStatus = (stock: number): string => {
    return stock > 0 ? 'Confirmed' : 'Pending';
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
                <Badge
                  borderRadius='2xl'
                  p={1}
                  variant='subtle'
                  colorScheme='green'
                  fontSize='.75rem'
                >
                  {product.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductWithRewiewAndTime() {
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

  const getOrderStatus = (stock: number): string => {
    if (stock > 0) {
      return 'confirmed';
    } else {
      return 'pending';
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='table-auto w-full border-collapse'>
        <thead>
          <tr className='h-16 border-b'>
            <th className='text-left px-4 py-2'>#</th>
            <th className='text-left px-4 py-2'>Products</th>
            <th className='text-left px-4 py-2'>Customer</th>
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
                  width={product.dimensions.width * 5}
                  height={product.dimensions.height * 5}
                  className='rounded-md'
                />
                <span>{product.title}</span>
              </td>
              <td className='px-4 py-2'>{product.warrantyInformation}</td>
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
