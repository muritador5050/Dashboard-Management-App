'use client';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import useAuthRedirect from '@/lib/useAuthRedirect';
import { useThemeColor } from '@/lib/themeUtil';
import Customers from '@/components/chartComponents/Customers';
import ProductWithRewiewAndTime from '@/components/tableComponents/TableWithTime';
import ProductWithStatusAndPayment from '@/components/tableComponents/TableWithStatus';
import EarningsChart from '@/components/chartComponents/EarningsChart';
import LatestDeal from '@/components/chartComponents/LatestDeal';
import TotalOrders from '@/components/chartComponents/TotalOrders';
import YearlyProfitPieChart from '@/components/chartComponents/YearlyPieChart';

const Dashboard = () => {
  useAuthRedirect(false);
  const { childBgColor, bgColor, textColor } = useThemeColor();
  const MyMap = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <main style={{ backgroundColor: bgColor }} className='min-h-screen'>
      <section className='min-[980px]:flex gap-7 mb-9'>
        <div className='flex flex-col gap-5 min-[980px]:basis-1/2'>
          <EarningsChart />
          <LatestDeal />
        </div>
        <div className='max-[980px]:my-5 rounded-xl min-[980px]:basis-3/3'>
          <TotalOrders />
        </div>

        <div className='flex flex-col gap-5 min-[980px]:basis-1/2'>
          <YearlyProfitPieChart />
          <Customers />
        </div>
      </section>
      <section className='min-[980px]:flex gap-7 mb-7'>
        <div className='max-[980px]:mb-7'>
          <MyMap />
        </div>
        <div
          style={{ backgroundColor: childBgColor, color: textColor }}
          className='w-full h-fit px-5 py-2 rounded-xl max-[980px]:mb-7'
        >
          <ProductWithStatusAndPayment />
        </div>
      </section>
      <section>
        <div
          style={{ backgroundColor: childBgColor, color: textColor }}
          className='py-3 px-5 rounded-xl'
        >
          <ProductWithRewiewAndTime />
        </div>
      </section>
    </main>
  );
};
//  ;
export default Dashboard;
