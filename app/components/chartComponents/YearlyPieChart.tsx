'use client';
import React from 'react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { yearlyProfit } from '../../lib/datas';
import { useThemeColor } from '@/lib/themeUtil';

export default function YearlyProfitPieChart() {
  const { childBgColor, textColor } = useThemeColor();
  return (
    <div
      style={{ backgroundColor: childBgColor, color: textColor }}
      className='rounded-xl px-3 py-7.5 w-full mx-auto'
    >
      {/* Header */}
      <div className='flex justify-between text-sm md:text-base'>
        <p>Profit</p>
        <small>432</small>
      </div>
      <div className='flex justify-between text-sm md:text-base'>
        <p>Years</p>
        <small>32%</small>
      </div>

      {/* Chart Container */}
      <div className='flex justify-center'>
        <ResponsiveContainer width='100%' aspect={1.2} minWidth={250}>
          <PieChart>
            <Pie
              data={yearlyProfit}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius='45%' /* Adjust based on screen */
              outerRadius='60%' /* Adjust based on screen */
              fill='#8884d8'
            >
              {yearlyProfit.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Text */}
      <p className='text-center text-xs md:text-sm mt-2'>
        $18k profit more than last year
      </p>
    </div>
  );
}
