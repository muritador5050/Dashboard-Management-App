'use client';
import React, { useEffect, useState } from 'react';
import { XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { type EarningsData } from '../../lib/utils';
import { useThemeColor } from '@/lib/themeUtil';

// data
export default function EarningsChart() {
  const { childBgColor, textColor } = useThemeColor();
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch(
          'https://api.mockfly.dev/mocks/d76be295-a722-4dd9-9228-9eef11fe411b/earnings'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: EarningsData[] = await response.json();
        setEarningsData(data);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };

    fetchEarnings();
  }, []);

  const chartData: EarningsData[] = earningsData.map((item) => ({
    day: item.day,
    lastYear: item.lastYear,
    thisYear: item.thisYear,
  }));

  const customTooltipStyle = {
    backgroundColor: 'transparent',
    border: 'none',
  };

  return (
    <div
      style={{ backgroundColor: childBgColor, color: textColor }}
      className='rounded-xl  p-3 text-custom-color'
    >
      <div className='flex flex-col gap-1'>
        <span className='flex justify-between items-center text-sm'>
          <small>Latest Deal</small>
          <small>12,345</small>
        </span>
        <span className='flex justify-between items-center text-sm'>
          <small>Last 7 Days</small>
          <small className='text-red-500'>-32%</small>
        </span>
      </div>

      <ResponsiveContainer width='100%' aspect={0.9}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <XAxis dataKey='day' domain={[0, 20]} />
          <Tooltip
            itemStyle={{ fontSize: 10 }}
            wrapperStyle={customTooltipStyle}
            contentStyle={customTooltipStyle}
          />
          <Bar
            dataKey='thisYear'
            stackId='a'
            fill='blue'
            radius={[10, 10, 0, 0]}
            barSize={10}
            style={{ pointerEvents: 'none' }}
          />
          <Bar
            dataKey='lastYear'
            stackId='a'
            fill='rgb(124, 143, 172)'
            radius={[10, 10, 0, 0]}
            style={{ pointerEvents: 'none' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
