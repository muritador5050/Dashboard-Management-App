import React, { useEffect, useState } from 'react';
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { formatCurrency, formatAxisTick, CustomersEarning } from '../lib/utils';
import { Bike, ListOrdered, Pause, Truck, XCircle } from 'lucide-react';
import {
  type EarningsData,
  type TotalOrderData,
  type DailyProfitData,
} from '../lib/utils';
import { dailyProfitData, yearlyProfit } from '../lib/datas';
import Image from 'next/image';

// data
export function EarningsChart() {
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
    <div className='rounded-xl bg-custom-bg  p-3 text-custom-color'>
      <span className='flex justify-between items-center'>
        <small>Latest Deal </small> <small>12,345</small>
      </span>{' '}
      <span className='flex justify-between items-center'>
        <small>Last 7days </small> <small>-32%</small>
      </span>{' '}
      <ResponsiveContainer aspect={0.85}>
        <BarChart
          data={chartData}
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        >
          <XAxis dataKey='day' domain={[0, 20]} />
          <Tooltip
            itemStyle={{
              fontSize: 10,
            }}
            wrapperStyle={customTooltipStyle}
            contentStyle={customTooltipStyle}
          />
          <Bar
            dataKey='thisYear'
            stackId='a'
            fill='red'
            radius={[100, 100, 100, 100]}
            barSize={10}
            style={{ pointerEvents: 'none' }}
          />
          <Bar
            dataKey='lastYear'
            stackId='a'
            fill='#82ca9d'
            radius={[100, 100, 100, 100]}
            style={{ pointerEvents: 'none' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LatestDeal() {
  return (
    <div className='h-96 p-4 rounded-xl bg-custom-bg  p-3 text-custom-color flex flex-col justify-between'>
      <div>
        <span className='flex justify-between items-center'>
          <small>Earning </small> <small>86.5%</small>
        </span>{' '}
        <span className='flex justify-between items-center'>
          <small>Last 7days </small>
        </span>{' '}
      </div>
      <div>
        <div className=''>
          <span className='flex justify-between'>
            <small>{formatCurrency(98500)}</small>{' '}
            <small>{formatCurrency(122900)}</small>
          </span>
          <progress
            className='[&::-webkit-progress-bar]:h-[10px] [&::-webkit-progress-value]:h-[10px] [&::-webkit-progress-bar]:rounded-3xl [&::-webkit-progress-value]:rounded-3xl [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-sky-700 [&::-moz-progress-bar]:bg-slate-400'
            value='70'
            max='100'
          ></progress>
          <small className='-mt-5'>Coupons used:18/22</small>
        </div>
        <div className=''>
          <small className=''>Recent purchasers</small>
          <div className='flex items-center mt-10 relative'>
            <div className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'></div>
            <div className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'></div>
            <div className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'></div>
            <div className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'></div>
            <div className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center bg-custom-bg text-sm'>
              80+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <ResponsiveContainer height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='day' fontSize={15} />
        <YAxis tickFormatter={formatAxisTick} fontSize={20} />
        <Tooltip itemStyle={{ fontSize: 10 }} />
        <Line
          type='monotone'
          dataKey='breakdown.productA'
          stroke='#8884d8'
          name='Product A'
        />
        <Line
          type='monotone'
          dataKey='breakdown.productB'
          stroke='#82ca9d'
          name='Product B'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export function TotalOrders() {
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
    <div className='bg-custom-bg rounded-xl p-4 min-h-[850px]'>
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
          <Image src='/man.png' alt='man' priority width={400} height={400} />
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

export function YearlyProfitPieChart() {
  return (
    <div className='bg-custom-bg rounded-xl p-3'>
      <span className='flex justify-between'>
        <p>Profit</p>
        <small>432</small>
      </span>
      <span className='flex justify-between'>
        <p>Years</p>
        <small>32%</small>
      </span>
      <div className=''>
        <ResponsiveContainer aspect={0.95}>
          <PieChart>
            <Pie
              data={yearlyProfit}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius={120}
              outerRadius={140}
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
      <p className='text-center'>$18k profit more then last year</p>
    </div>
  );
}

export function Customers() {
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
    <div className='bg-custom-bg rounded-xl p-3'>
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
