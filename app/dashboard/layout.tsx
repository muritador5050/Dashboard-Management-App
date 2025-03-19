'use client';
import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { Settings } from 'lucide-react';
import { useNav } from '@/app/context/ThemeContext';

function DasboardLayout({ children }: { children: React.ReactNode }) {
  const { isWide } = useNav();
  const sidebarWidth = isWide ? 'w-20' : 'w-80';
  const contentMargin = isWide ? 'ml-20' : 'ml-80';

  return (
    <div className='flex bg-gray-800 min-h-screen'>
      <div
        className={`fixed top-0 left-0 h-screen overflow-y-scroll ${sidebarWidth} `}
      >
        <Sidebar />
      </div>
      <div className={`${contentMargin} w-full`}>
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
