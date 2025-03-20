export interface NavigationItem {
  title?: string | null;
  segment?: string;
  icon?: React.ReactElement;
  kind?: 'header';
  children?: NavigationItem[];
}

export interface EarningsData {
  day: string;
  lastYear: number;
  thisYear: number;
}

export interface TotalOrderData {
  id: number;
  orderDate: string;
  customerId: number;
  orderTotal: number;
  orderStatus: string;
}

export type ProfitBreakdown = {
  productA: number;
  productB: number;
};
export type DailyProfitData = {
  day: string;
  totalProfit: number;
  breakdown: ProfitBreakdown;
};

export interface YearlyProfitData {
  name: string;
  value: number;
  color: string;
}

export type CustomersEarning = {
  totalOrders: number;
  totalSpent: number;
};

export function formatCurrency(number: number) {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return currency.format(number);
}

export function formatAxisTick(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toString();
}
