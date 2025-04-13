'use client';
import React from 'react';

import { formatCurrency } from '../../lib/utils';

import { Progress } from '@chakra-ui/react';
import { useThemeColor } from '@/lib/themeUtil';

export default function LatestDeal() {
  const { childBgColor, textColor, borderColor } = useThemeColor();
  return (
    <div
      style={{ backgroundColor: childBgColor, color: textColor }}
      className='rounded-xl py-10 px-3 text-custom-color flex flex-col '
    >
      <div>
        <span className='flex justify-between items-center'>
          <small>Earning </small> <small>86.5%</small>
        </span>{' '}
        <span className='flex justify-between items-center'>
          <small>Last 7days </small>
        </span>{' '}
      </div>
      <div>
        <div className='mt-5'>
          <div className='flex justify-between'>
            <small>{formatCurrency(98500)}</small>{' '}
            <small>{formatCurrency(122900)}</small>
          </div>
          <Progress
            style={{ borderRadius: '20px' }}
            value={70}
            h='1.5'
            mt='1'
          />
          <small className=''>Coupons used:18/22</small>
        </div>
        <div className='mt-5'>
          <small className=''>Recent purchasers</small>
          <div className='flex items-center mt-10 relative'>
            <div
              style={{ border: borderColor }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: borderColor }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: borderColor }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: borderColor }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: borderColor }}
              className='w-[50px] h-[50px]  rounded-full border-2 border-text-sky-500 flex justify-center items-center b text-sm'
            >
              80+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
