import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { Settings } from 'lucide-react';

function DasboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-gray-800 text-3xl'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Navbar />
        <main className='p-4'>{children}</main>
        <div className=' flex justify-center items-center fixed bottom-10 right-15 bg-sky-600 text-custom-color cursor-pointer w-[70px] h-[70px] rounded-full'>
          <Settings size={48} className='' />
        </div>
      </div>
    </div>
  );
}

export default DasboardLayout;
