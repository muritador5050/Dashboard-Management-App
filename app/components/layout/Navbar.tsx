'use client';
import React, { useState } from 'react';
// import Search from '../Search';
import BlinkingIcon from '../BlinkingIcon';
import { ChevronDown, AlignJustify, Ellipsis, X, SearchX } from 'lucide-react';
import { useNav } from '@/app/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
export default function Navbar() {
  const { collapse, handleCollapse, handleToggle } = useNav();
  const [swipeModal, setSwipeModal] = useState(false);
  return (
    <nav className='flex flex-col items-center justify-between bg-custom-bg p-5  top-0 text-custom-color rounded-2xl m-[1em] text-2xl cursor-pointer'>
      <div className='flex justify-between items-center px-4'>
        <div className='flex gap-20 items-center min-[980px]:hidden'>
          <span>
            <AlignJustify onClick={handleToggle} />
          </span>
          <span>Admin dashboard</span>
          <span onClick={handleCollapse}>
            <Ellipsis />
          </span>
        </div>
      </div>
      <ul className='hidden min-[980px]:flex gap-10'>
        <li className='flex items-center'>
          Apps
          <ChevronDown />
        </li>
        <li>Chat</li>
        <li>Calendar</li>
        <li>Email</li>
      </ul>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          collapse ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='overflow-hidden p-4 rounded-md mt-2'
      >
        <div className=''>
          <hr className='w-full my-4' />
          <ul className='flex gap-10'>
            <li>
              <AlignJustify onClick={() => setSwipeModal(true)} />
            </li>
            <li>
              {/* <Search /> */}
              <SearchX className='min-[980px]:hidden' />
              <BlinkingIcon />
            </li>
            <li>logout</li>
            <li>read</li>
          </ul>
        </div>
      </motion.div>
      {/*overlay-modal */}
      <AnimatePresence>
        {swipeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black bg-opacity-50'
              onClick={() => setSwipeModal(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='fixed top-0 right-0 w-80 h-full bg-custom-bg shadow-lg p-6 flex flex-col'
            >
              <span>
                <X
                  className='float-right'
                  onClick={() => setSwipeModal(false)}
                />
              </span>
              <ul className='flex flex-col gap-5'>
                <li className='flex justify-between items-center'>
                  Apps
                  <ChevronDown />
                </li>
                <li>Chat</li>
                <li>Calendar</li>
                <li>Email</li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
