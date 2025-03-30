'use client';
import React, { useState } from 'react';
import Search from '../Search';
import BlinkingIcon from '../BlinkingIcon';
import {
  ChevronDown,
  AlignJustify,
  Ellipsis,
  X,
  SearchX,
  SunMoon,
  Layers2,
  ArrowUpWideNarrow,
  Rocket,
} from 'lucide-react';
import { useNav } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
//Navbar
export default function Navbar() {
  const { collapse, handleCollapse, handleToggle, toggleSiderbarWidth } =
    useNav();
  const [swipeModal, setSwipeModal] = useState(false);
  const [search, setSearch] = useState('');
  return (
    <>
      <nav className=' bg-custom-bg p-5 sticky top-0 right-0 z-1000  text-custom-color rounded-2xl m-[1em] text-2xl cursor-pointer'>
        {/* mobile-view */}
        <div className='px-2 min-[980px]:hidden'>
          <div className='flex justify-between items-center '>
            <span>
              <AlignJustify onClick={handleToggle} />
            </span>
            <span className='flex gap-4 items-center'>
              <Rocket /> Admin
            </span>
            <span onClick={handleCollapse}>
              <Ellipsis />
            </span>
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={
              collapse
                ? { opacity: 1, height: 'auto' }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <hr className='w-full my-4' />
            <div className='flex justify-between items-center'>
              <span>
                <AlignJustify onClick={() => setSwipeModal(true)} />
              </span>
              <ul className='flex gap-2 items-center'>
                <li>
                  <span>
                    <SearchX />
                  </span>
                </li>
                <li>
                  <BlinkingIcon />
                </li>
                <li>
                  <SunMoon size={32} />
                </li>
                <li>
                  <Layers2 size={32} />
                </li>
                <li className='flex gap-4 items-center'>
                  <Image
                    className='border-3 border-white-400 rounded-full'
                    src='/user-11.jpg'
                    alt='A'
                    width={50}
                    height={50}
                  />
                  <small>
                    Mike Nelson <br />
                    admin
                  </small>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        {/* desktop-view */}
        <div className='hidden min-[980px]:flex justify-between items-center '>
          <ul className='flex gap-3 items-center'>
            <li>
              <ArrowUpWideNarrow onClick={toggleSiderbarWidth} />
            </li>
            <li className='flex items-center'>
              Apps
              <ChevronDown />
            </li>
            <li>
              {' '}
              <Link href={'/dashboard/chat'}>Chat</Link>{' '}
            </li>
            <li>
              <Link href={'/dashboard/calendar'}>Calendar</Link>
            </li>
            <li>
              <Link href={'/dashboard/email'}>Email</Link>
            </li>
          </ul>
          <ul className='flex gap-3 items-center'>
            <li>
              <span className=''>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Try search here..'
                />
              </span>
            </li>
            <li>
              {' '}
              <BlinkingIcon />
            </li>
            <li>
              <SunMoon />
            </li>
            <li>
              <Layers2 />
            </li>
            <li className='flex gap-4 items-center '>
              <Image
                className='border-3 border-white-400 rounded-full'
                src='/user-11.jpg'
                alt='A'
                width={50}
                height={50}
              />
              <small className='wrap-all'>Mike Nelson admin</small>
            </li>
          </ul>
        </div>
      </nav>
      {/*overlay-modal */}
      <AnimatePresence>
        {swipeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black bg-opacity-10'
              onClick={() => setSwipeModal(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='fixed top-0 right-0 z-1000 w-80 h-full bg-custom-bg text-custom-color shadow-lg p-6 flex flex-col'
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
    </>
  );
}
