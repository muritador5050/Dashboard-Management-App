'use client';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define a mapping of paths to page titles
  const pageTitles: Record<string, string> = {
    '/dashboard/ecommerce/shop': 'shop',
    '/dashboard/ecommerce/details': 'details',
    '/dashboard/ecommerce/list': 'list',
    '/dashboard/ecommerce/checkout': 'checkout',
    '/dashboard/ecommerce/addProduct': 'addProduct',
    '/dashboard/ecommerce/editProduct': 'editProduct',
  };

  const pageTitle = pageTitles[pathname] || '';
  return (
    <>
      <header>
        <p className='text-3xl'>Shop</p>
        <div className='flex items-center'>
          <Link href='/dashboard' className='hover:text-blue-500'>
            Home
          </Link>
          <Dot size={28} />
          <p>{pageTitle}</p>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
