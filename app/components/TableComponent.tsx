import React, { JSX, useEffect, useState } from 'react';
import { formatTime, Product } from '../lib/utils';
import Image from 'next/image';
import { Badge, Progress } from '@chakra-ui/react';

//tables
export default function ProductWithStatusAndPayment() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=5')
      .then((response) => response.json())
      .then((data: { products: Product[] }) => {
        const productsWithPaymentAndStatus = data.products.map((product) => ({
          ...product,
          payment: getPaymentStatus(product.price),
          status: getOrderStatus(product.stock),
        }));
        setProducts(productsWithPaymentAndStatus);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getPaymentStatus = (price: number): JSX.Element => {
    if (price > 50) {
      return (
        <span className='flex flex-col'>
          <small>Paid</small>
          <progress max={100} value={100}></progress>
        </span>
      );
    } else {
      return (
        <span className='flex flex-col'>
          <small> pending</small>
          <Progress size='sm' value={25} />
        </span>
      );
    }
  };

  const getOrderStatus = (stock: number): string => {
    if (stock > 0) {
      return 'confirmed';
    } else {
      return 'pending';
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='table-auto min-[980px]:w-full'>
        <thead>
          <tr className=' text-left h-24'>
            <th>Products</th>
            <th></th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-t h-24'>
              <td className='flex items-center '>
                <Image
                  src={product.images[0]}
                  alt='product-img'
                  width={product.dimensions.width * 5}
                  height={product.dimensions.height * 5}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.payment}</td>
              <td>
                <Badge
                  borderRadius='2xl'
                  p={1}
                  variant='subtle'
                  colorScheme='green'
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
      <table className='table-auto min-[980px]:w-full'>
        <thead>
          <tr className='h-24'>
            <th className='text-left'>#</th>
            <th className='text-left '>Products</th>
            <th></th>
            <th className='text-left'>Customer</th>
            <th className='text-left'>Reviews</th>
            <th className='text-left'>Status</th>
            <th className='text-left'>Time</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-t h-24'>
              <td className='text-left'>
                <input type='checkbox' />
              </td>
              <td className='text-leftflex items-center '>
                <Image
                  src={product.images[0]}
                  alt='product-img'
                  width={product.dimensions.width * 5}
                  height={product.dimensions.height * 5}
                />
              </td>
              <td>{product.title}</td>
              <td className='text-left'>{product.warrantyInformation}</td>
              <td className='text-left'>
                {<UnicodeStarRating rating={product.rating} />}
              </td>
              <td className='text-left'>{product.status}</td>
              <td className='text-left'>
                {formatTime(product.meta?.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UnicodeStarRating({ rating }: { rating: number }) {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return (
    <span>
      {filledStars}
      {emptyStars}
    </span>
  );
}
