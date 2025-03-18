'use client';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // LineProps,
} from 'recharts';

interface EarningsData {
  year: number;
  earnings: number;
}

interface ProfitData {
  year: number;
  profit: number;
}

interface ChartData {
  year: number;
  earnings: number;
  profit: number;
}

const Dashboard = () => {
  return (
    <main className=''>
      <section>
        <div className='flex flex-col gap-5'>
          <div className='rounded-xl'>{YearlyEarningsProfitChart()}</div>
          <div className='rounded-xl'></div>
        </div>
        <div className='rounded-xl'></div>
        <div>
          <div className='rounded-xl'></div>
          <div className='rounded-xl'></div>
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

export function YearlyEarningsProfitChart() {
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [profitData, setProfitData] = useState<ProfitData[]>([]);

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

    const fetchProfits = async () => {
      try {
        const response = await fetch('YOUR_MOCKAPI_ENDPOINT/profits');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ProfitData[] = await response.json();
        setProfitData(data);
      } catch (error) {
        console.error('Error fetching profit data:', error);
      }
    };

    fetchEarnings();
    fetchProfits();
  }, []);

  const chartData: ChartData[] = earningsData.map((item, index) => ({
    year: item.year,
    earnings: item.earnings,
    profit: profitData[index] ? profitData[index].profit : 0,
  }));

  return (
    <LineChart
      width={600}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='year' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type='monotone'
        dataKey='earnings'
        stroke='#8884d8'
        name='Earnings'
      />
      <Line type='monotone' dataKey='profit' stroke='#82ca9d' name='Profit' />
    </LineChart>
  );
}
