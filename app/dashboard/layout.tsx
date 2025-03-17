import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

function DasboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-gray-800 text-3xl'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Navbar />
        <main className='p-4'>{children}</main>
      </div>
    </div>
  );
}

export default DasboardLayout;
