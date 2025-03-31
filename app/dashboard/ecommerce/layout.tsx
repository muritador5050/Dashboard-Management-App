'use client';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define a mapping of paths to page titles
  const pageTitles: Record<string, string> = {
    '/dashboard/ecommerce/shop': 'Shop',
    '/dashboard/ecommerce/details': 'Product Details',
    '/dashboard/ecommerce/list': 'Shop List',
    '/dashboard/ecommerce/checkout': 'checkout',
    '/dashboard/ecommerce/addProduct': 'Add Product',
    '/dashboard/ecommerce/editProduct': 'Edit Product',
  };

  const pageTitle = pageTitles[pathname] || '';
  return (
    <>
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
      <main>{children}</main>
    </>
  );
}
