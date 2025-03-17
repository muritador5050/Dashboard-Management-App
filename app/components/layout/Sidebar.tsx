'use client';
import { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/app/lib/route';
import { NavigationItemComponent } from '../NavigationItems';
import { usePathname, useRouter } from 'next/navigation';
import { useNav } from '@/app/context/ThemeContext';

const Sidebar = () => {
  const { isOpen, closeSideBar } = useNav();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === '/') {
      router.push('/dashboard');
    }
  }, [pathname, router]);
  return (
    <aside
      className={`w-80 absolute  md:relative bg-custom-bg text-custom-color h-screen p-4 overflow-y-scroll ${
        isOpen ? 'translate-x-0' : '-translate-x-full block'
      } `}
    >
      <span className='flex justify-between items-center'>
        <h2 className='font-bold'>Admin</h2>
        <span className='cursor-pointer md:hidden' onClick={closeSideBar}>
          <X />
        </span>
      </span>
      <nav className='mt-5 space-y-2'>
        {routes.map((item, index) => (
          <NavigationItemComponent key={index} item={item} />
        ))}

        <Link
          href='/auth/login'
          className='w-full p-3 mt-5 text-left bg-red-600 rounded-lg'
        >
          <LogOut
            className='inline-block mr-2'
            onClick={() => localStorage.clear()}
          />{' '}
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
