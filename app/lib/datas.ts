import { YearlyProfitData, type DailyProfitData } from './utils';

export const dailyProfitData: DailyProfitData[] = [
  {
    day: 'Mon',
    totalProfit: 5000,
    breakdown: { productA: 2000, productB: 3000 },
  },
  {
    day: 'Tue',
    totalProfit: 6200,
    breakdown: { productA: 2500, productB: 3700 },
  },
  {
    day: 'Wed',
    totalProfit: 5800,
    breakdown: { productA: 2200, productB: 3600 },
  },
  {
    day: 'Thu',
    totalProfit: 7100,
    breakdown: { productA: 3000, productB: 4100 },
  },
  {
    day: 'Fri',
    totalProfit: 6500,
    breakdown: { productA: 2800, productB: 3700 },
  },
  {
    day: 'Sat',
    totalProfit: 7500,
    breakdown: { productA: 3200, productB: 4300 },
  },
  {
    day: 'Sun',
    totalProfit: 7500,
    breakdown: { productA: 3200, productB: 4300 },
  },
];

export const yearlyProfit: YearlyProfitData[] = [
  { name: 'Product A', value: 120000, color: '#8884d8' },
  { name: 'Product B', value: 80000, color: '#82ca9d' },
  { name: 'Product C', value: 50000, color: '#ffc658' },
  { name: 'Other', value: 30000, color: '#a4de6c' },
];
