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
import { Image, Progress } from '@chakra-ui/react';

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
    <div className='rounded-xl bg-custom-bg p-3 text-custom-color'>
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

export function LatestDeal() {
  return (
    <div className='rounded-xl bg-custom-bg py-10 px-3 text-custom-color flex flex-col '>
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
              style={{ border: '2px solid white' }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: '2px solid white' }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: '2px solid white' }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: '2px solid white' }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center'
            ></div>
            <div
              style={{ border: '2px solid white' }}
              className='w-[50px] h-[50px]   rounded-full border-2 border-text-sky-500 flex justify-center items-center bg-custom-bg text-sm'
            >
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
    <ResponsiveContainer width='100%' aspect={2} minWidth={300}>
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
    <div className='bg-custom-bg rounded-xl px-5 py-7 '>
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

export function YearlyProfitPieChart() {
  return (
    <div className='bg-custom-bg rounded-xl px-3 py-7.5 w-full max-w-md mx-auto'>
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
