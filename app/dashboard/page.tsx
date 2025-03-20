'use client';
import {
  Customers,
  EarningsChart,
  LatestDeal,
  TotalOrders,
  YearlyProfitPieChart,
} from '../components/chartscomponent';
const Dashboard = () => {
  return (
    <main className='min-h-screen'>
      <section className='min-[980px]:flex gap-7'>
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
      <section>
        <div></div>
        <div></div>
      </section>
      <section>
        <div></div>
      </section>
    </main>
  );
};
//  ;
export default Dashboard;
