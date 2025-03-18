'use client';
import { LogOut, X, Rocket } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/app/lib/route';
import { NavigationItemComponent } from '../NavigationItems';
import { useNav } from '@/app/context/ThemeContext';
// import { useState } from 'react';

const Sidebar = () => {
  const { isOpen, isWide, closeSideBar } = useNav();
  // const [isHover, setIsHover] = useState(false);
  return (
    <aside
      className={`bg-custom-bg text-custom-color h-screen p-4 overflow-y-scroll  ${
        isWide ? 'w-20 p-2' : 'w-84'
      } 
        ${
          isOpen
            ? 'translate-x-0 transition duration-500 ease-in-out '
            : '-translate-x-full block transition duration-500 ease-in-out'
        } `}
    >
      <span className='flex justify-between items-center'>
        <span className='flex justify-between items-center'>
          <Rocket size={48} />
          {!isWide && <h2 className='font-bold '>Admin</h2>}
        </span>
        <span
          className='cursor-pointer min-[980px]:hidden'
          onClick={closeSideBar}
        >
          <X />
        </span>
      </span>
      <nav className={`mt-5 `}>
        {routes.map((item, index) => (
          <NavigationItemComponent key={index} item={item} isWide={isWide} />
        ))}

        {!isWide && (
          <div className='w-[100%] flex justify-between items-center p-3 bg-gray-800 rounded-4xl h-32 sticky left-0 bottom-0'>
            <small>admin</small>
            <Link href='/auth/login'>
              <LogOut size={32} className='inline-block mr-2' />
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
