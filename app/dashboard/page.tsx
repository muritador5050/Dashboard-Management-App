'use client';
import { useMemo } from 'react';
import {
  Customers,
  EarningsChart,
  LatestDeal,
  TotalOrders,
  YearlyProfitPieChart,
} from '../components/Chartscomponent';
import dynamic from 'next/dynamic';
import ProductWithStatusAndPayment, {
  ProductWithRewiewAndTime,
} from '../components/TableComponent';

const Dashboard = () => {
  const MyMap = useMemo(
    () =>
      dynamic(() => import('../components/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <main className='min-h-screen'>
      <section className='min-[980px]:flex gap-7 mb-9'>
        <div className='flex flex-col gap-5 min-[980px]:basis-1/2'>
          <EarningsChart />
          <LatestDeal />
        </div>
        <div className='rounded-xl min-[980px]:basis-3/3'>
          <TotalOrders />
        </div>

        <div className='flex flex-col gap-5 min-[980px]:basis-1/2'>
          <YearlyProfitPieChart />
          <Customers />
        </div>
      </section>
      <section className='min-[980px]:flex gap-10 mb-9'>
        <div className=''>
          <MyMap />
        </div>
        <div className='w-full h-fit bg-custom-bg px-5 py-2 rounded-xl'>
          <ProductWithStatusAndPayment />
        </div>
      </section>
      <section>
        <div className='bg-custom-bg py-3 px-5 rounded-xl'>
          <ProductWithRewiewAndTime />
        </div>
      </section>
    </main>
  );
};
//  ;
export default Dashboard;
