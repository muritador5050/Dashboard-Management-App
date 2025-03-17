'use client';
import { LogOut, X, Rocket } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/app/lib/route';
import { NavigationItemComponent } from '../NavigationItems';
import { useNav } from '@/app/context/ThemeContext';

const Sidebar = () => {
  const { isOpen, closeSideBar } = useNav();
  return (
    <aside
      className={`w-80 absolute min-[980px]:relative bg-custom-bg text-custom-color h-screen p-4 overflow-y-scroll ${
        isOpen
          ? 'translate-x-0 transition duration-500 ease-in-out '
          : '-translate-x-full block transition duration-500 ease-in-out'
      } `}
    >
      <span className='flex justify-between items-center'>
        <span className='flex justify-between items-center'>
          <Rocket />
          <h2 className='font-bold '>Admin</h2>
        </span>
        <span
          className='cursor-pointer min-[980px]:hidden'
          onClick={closeSideBar}
        >
          <X />
        </span>
      </span>
      <nav className='mt-5 space-y-2'>
        {routes.map((item, index) => (
          <NavigationItemComponent key={index} item={item} />
        ))}

        <div className='w-[100%] flex justify-between items-center p-3 bg-gray-800 rounded-4xl h-32 sticky left-0 bottom-0'>
          <small>admin</small>
          <Link href='/auth/login'>
            <LogOut className='inline-block mr-2' />
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
