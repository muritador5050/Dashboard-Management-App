import React, { JSX, useEffect, useState } from 'react';
import { Product } from '../lib/utils';
import Image from 'next/image';

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
          <progress max={100} value={50}></progress>
        </span>
      );
    }
  };

  const getOrderStatus = (stock: number): string => {
    if (stock > 0) {
      return 'In Stock';
    } else {
      return 'Out of Stock';
    }
  };

  return (
    <table className='table-auto bg-custom-bg p-3 rounded-xl min-[980px]:grow'>
      <thead>
        <tr className='h-32'>
          <th>Products</th>
          <th>Payment</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className='border-t h-32'>
            <td className='flex items-center '>
              <Image
                src={product.images[0]}
                alt='product-img'
                width={product.dimensions.width * 5}
                height={product.dimensions.height * 5}
              />
              <p>{product.title}</p>
            </td>
            <td>{product.payment}</td>
            <td>{product.status}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
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
          <progress max={100} value={50}></progress>
        </span>
      );
    }
  };

  const getOrderStatus = (stock: number): string => {
    if (stock > 0) {
      return 'In Stock';
    } else {
      return 'Out of Stock';
    }
  };

  return (
    <table className='table-auto bg-custom-bg p-3 rounded-xl min-[980px]:w-full'>
      <thead>
        <tr className='h-32'>
          <th className='text-left'>#</th>
          <th className='text-left'>Products</th>
          <th className='text-left'>Customer</th>
          <th className='text-left'>Reviews</th>
          <th className='text-left'>Status</th>
          <th className='text-left'>Time</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className='border-t h-32 hover:bg-gray-500'>
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
              <p>{product.title}</p>
            </td>
            <td className='text-left'>{product.warrantyInformation}</td>
            <td className='text-left'>
              {<UnicodeStarRating rating={product.rating} />}
            </td>
            <td className='text-left'>{product.status}</td>
            <td className='text-left'>{product.meta.createdAt}</td>
            <td className='text-left'></td>
          </tr>
        ))}
      </tbody>
    </table>
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

export interface TableData {
  id: number;
  [key: string]: any;
}

export interface TableHeader {
  key: string;
  label: string | React.ReactNode;
  renderImage?: boolean; // Add renderImage property
}

interface ReusableTableProps {
  data: TableData[];
  headers: TableHeader[];
}

export const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  headers,
}) => {
  return (
    <table className='table-auto bg-custom-bg p-3 rounded-xl min-[980px]:grow'>
      <thead>
        <tr className='h-32'>
          {headers.map((header) => (
            <th key={header.key}>
              {typeof header.label === 'string' ? header.label : header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className='border-t h-32'>
            {headers.map((header) => {
              if (header.renderImage) {
                return (
                  <td key={header.key} className='flex items-center'>
                    <Image
                      src={item.images[0]}
                      alt='product-img'
                      width={item.dimensions.width * 5}
                      height={item.dimensions.height * 5}
                    />
                    <p>{item.title}</p>
                  </td>
                );
              } else {
                return <td key={header.key}>{item[header.key]}</td>;
              }
            })}
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
