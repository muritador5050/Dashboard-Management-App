'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';

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
    '/dashboard/accountSetting': 'Account Setting',
    '/dashboard/email': 'Email',
    '/dashboard/calendar': 'Calendar',
    '/dashboard/kanban': 'Kanban',
    '/dashboard/chat': 'Chat',
    '/dashboard/pricing': 'Pricing',
    '/dashboard/faq': 'FAQ',
  };

  const pageTitle = pageRoutes[pathname] || '';
  const titleColor = useColorModeValue('black', 'white');
  return (
    <Box>
      <Heading fontSize='2xl' color={titleColor}>
        {pageTitle}
      </Heading>
      <Flex align='center'>
        <Link href='/dashboard'>
          <span className='hover:text-blue-500'>Home</span>
        </Link>
        <Dot size={28} />
        <small>{pageTitle}</small>
      </Flex>
    </Box>
  );
}
