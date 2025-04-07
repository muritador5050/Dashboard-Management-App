'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Dot } from 'lucide-react';
import Link from 'next/link';

//pageTitle
export default function PageTitle() {
  const pathname = usePathname();
  const pageRoutes: Record<string, string> = {
    '/dashboard/ecommerce/shop': 'Shop',
    '/dashboard/ecommerce/details': 'Product Details',
    '/dashboard/ecommerce/list': 'Shop List',
    '/dashboard/ecommerce/checkout': 'checkout',
    '/dashboard/ecommerce/addProduct': 'Add Product',
    '/dashboard/ecommerce/editProduct': 'Edit Product',
    '/dashboard/blog/post': 'Blog',
    '/dashboard/blog/details': 'Blog Details',
    '/dashboard/profile': 'Profile',
    '/dashboard/email': 'Email',
    '/dashboard/calendar': 'Calendar',
    '/dashboard/kanban': 'Kanban',
    '/dashboard/chat': 'Chat',
    '/dashboard/pricing': 'Pricing',
    '/dashboard/fag': 'FAQ',
  };

  const pageTitle = pageRoutes[pathname] || '';

  return (
    <header>
      <h1 className='text-3xl'>{pageTitle}</h1>
      <div className='flex items-center'>
        <Link href='/dashboard'>
          <span className='hover:text-blue-500'>Home</span>
        </Link>
        <Dot size={28} />
        <small>{pageTitle}</small>
      </div>
    </header>
  );
}
