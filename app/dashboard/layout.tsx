'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { Settings } from 'lucide-react';
import { useNav } from '@/context/ThemeContext';

function DasboardLayout({ children }: { children: React.ReactNode }) {
  const { isWide, isOpen, closeSideBar } = useNav();
  const [isMinWidth, setIsMinWidth] = useState(window.innerWidth >= 980);
  const sidebarWidth = isWide ? 'w-20' : '';
  const contentMargin = isWide ? 'ml-20' : 'ml-80';
  const sidebarOpen = isOpen
    ? 'translate-x-0 transition duration-500 ease-in-out absolute left-0'
    : '-translate-x-full block transition duration-500 ease-in-out bg-red-500';
  const minWidth = isMinWidth
    ? 'fixed top-0 left-0 w-full'
    : 'absolute top-0 left-0 z-2000';

  //Effect
  // useEffect(() => {
  //   const handleResize = () => {
  //     const isNowMinWidth = window.innerWidth >= 980;
  //     if (isNowMinWidth !== isMinWidth) {
  //       closeSideBar();
  //     }
  //     setIsMinWidth(isNowMinWidth);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [isMinWidth, closeSideBar]);
  return (
    <div className='flex bg-gray-800 min-h-screen text-white'>
      {/* {isOpen && ( */}
      <div
        className={` fixed top-0 left-0 h-screen overflow-y-scroll ${sidebarWidth}`}
      >
        <Sidebar />
      </div>
      {/* // )} */}
      <div className={`${contentMargin} w-full max-[980px]:ml-0`}>
        <Navbar />
        <main className='mx-5'>{children}</main>
        <div className=' flex justify-center items-center fixed bottom-10 right-15 bg-sky-600 text-custom-color cursor-pointer w-[70px] h-[70px] rounded-full'>
          <Settings size={48} className='' />
        </div>
      </div>
    </div>
  );
}

export default DasboardLayout;
