'use client';
import React, { useEffect, useState } from 'react';
import { Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import { CustomersEarning } from '../../lib/utils';

import { useThemeColor } from '@/lib/themeUtil';

export default function Customers() {
  const { childBgColor, textColor } = useThemeColor();
  const [customers, setCustomers] = useState<CustomersEarning[]>();
  useEffect(() => {
    async function fecthCustomer() {
      try {
        const req = await fetch(
          'https://api.mockfly.dev/mocks/d76be295-a722-4dd9-9228-9eef11fe411b/customers'
        );
        if (!req.ok) {
          throw new Error('Error in fetching' + req.status);
        }
        const res: CustomersEarning[] = await req.json();
        setCustomers(res);
      } catch (error) {
        console.log('error' + error);
      }
    }
    fecthCustomer();
  }, []);
  return (
    <div
      style={{ backgroundColor: childBgColor, color: textColor }}
      className='rounded-xl p-3'
    >
      <div>
        <span className='flex justify-between'>
          <p>Profit</p>
          <small>432</small>
        </span>
        <span className='flex justify-between'>
          <p>Years</p>
          <small>32%</small>
        </span>
      </div>
      <div>
        <ResponsiveContainer aspect={1.2}>
          <LineChart data={customers}>
            <Tooltip />
            <Line type='monotone' dataKey='totalSpent' stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <span className='flex justify-between'>
        <p>Profit</p>
        <small>432</small>
      </span>
      <span className='flex justify-between'>
        <p>Years</p>
        <small>32%</small>
      </span>
    </div>
  );
}
