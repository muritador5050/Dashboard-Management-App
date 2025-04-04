import { JSX } from 'react';

//Authentication
export type SignInCredentialProp = {
  email: string;
  password: string;
};

export type SignUpCredentialProp = {
  name: string;
  email: string;
  password: string;
};

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

export interface Product {
  quantity: number;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  dimensions: { width: number; height: number };
  payment?: JSX.Element;
  status?: string;
  meta?: { createdAt: string };
  warrantyInformation?: string;
}

export interface PostProps {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
  imageUrl?: string; // 👈 new field
}

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

export function formatTime(dateString: string | undefined): string {
  if (!dateString) {
    return 'N/A'; // Or any default value
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Handle invalid date strings
  }

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format (AM/PM)
  });
}
