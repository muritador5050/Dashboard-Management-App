'use client';
import React, { useEffect, useState } from 'react';
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
} from 'recharts';

import { formatAxisTick } from '../../lib/utils';
import { Bike, ListOrdered, Pause, Truck, XCircle } from 'lucide-react';
import { type TotalOrderData, type DailyProfitData } from '../../lib/utils';
import { dailyProfitData } from '../../lib/datas';
import { Image } from '@chakra-ui/react';
import { useThemeColor } from '@/lib/themeUtil';

const statusIcons = {
  Pending: Pause,
  Shipped: Truck,
  Delivered: Bike,
  Cancelled: XCircle,
  Ordered: ListOrdered,
};

const DailyProfitBreakdownChart: React.FC<{ data: DailyProfitData[] }> = ({
  data,
}) => {
  return (
    <ResponsiveContainer
      className='-ml-7!'
      width='100%'
      aspect={2}
      minWidth={300}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='day'
          fontSize={12} /* Default font size */
          className='md:text-lg text-sm' /* Responsive font */
        />
        <YAxis
          tickFormatter={formatAxisTick}
          fontSize={14} /* Default font size */
          className='md:text-lg text-sm' /* Responsive font */
        />
        <Tooltip itemStyle={{ fontSize: 10 }} />
        <Line
          type='monotone'
          dataKey='breakdown.productA'
          stroke='#8884d8'
          name='Product A'
          strokeWidth={2}
        />
        <Line
          type='monotone'
          dataKey='breakdown.productB'
          stroke='#82ca9d'
          name='Product B'
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default function TotalOrders() {
  const { childBgColor, textColor } = useThemeColor();
  const [totalOrder, setTotalOrder] = useState<TotalOrderData[]>([]);

  function groupOrdersByStatus(orders: TotalOrderData[]) {
    const groupedOrders: { [status: string]: TotalOrderData[] } = {};
    orders.forEach((order) => {
      if (!groupedOrders[order.orderStatus]) {
        groupedOrders[order.orderStatus] = [];
      }
      groupedOrders[order.orderStatus].push(order);
    });

    return groupedOrders;
  }
  const groupedOrders = groupOrdersByStatus(totalOrder);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const order = await fetch(
          'https://api.mockfly.dev/mocks/d76be295-a722-4dd9-9228-9eef11fe411b/orders'
        );
        if (!order.ok) {
          throw new Error('Error in fectching' + order.status);
        }
        const result: TotalOrderData[] = await order.json();
        setTotalOrder(result);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      style={{ backgroundColor: childBgColor, color: textColor }}
      className='rounded-xl px-5 py-7 '
    >
      <div className='flex relative border-b-2 border-indigo-600 mb-10  min-h-1/2'>
        <div className='flex flex-col gap-5'>
          <span>
            <p>Congratulation mike</p>
            <p>You have done 30% more sales</p>
          </span>
          {Object.keys(groupedOrders).map((status) => (
            <div key={status}>
              {groupedOrders[status].map((order) => {
                const IconComponent =
                  statusIcons[order.orderStatus as keyof typeof statusIcons];
                return (
                  <div key={order.id} className='flex gap-5 items-center'>
                    <IconComponent
                      size={48}
                      style={{
                        background: 'purple',
                        padding: '3px',
                        borderRadius: '50%',
                      }}
                    />{' '}
                    <span className='flex flex-col'>
                      <p>{order.orderTotal}</p>
                      <small>{order.orderStatus}</small>
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className='absolute bottom-0 right-0'>
          <Image
            src='	https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/man-working-on-laptop.png'
            alt='man'
            w='355px'
            h='241px'
          />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-5 min-h-1/2'>
        <div className='flex items-center justify-between'>
          <span>
            <p>Total order</p>
            <p>Weekyly order update</p>
          </span>
          <select name='' id=''>
            <option value='This week'>This week</option>
            <option value='May 2025'>May 2025</option>
            <option value='June 2025'>June 2025</option>
            <option value='july 2025'>July 2025</option>
          </select>
        </div>
        <DailyProfitBreakdownChart data={dailyProfitData} />
      </div>
    </div>
  );
}
