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

//products
interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}
interface Meta {
  createdAt: string; // Assuming ISO 8601 date-time string
  updatedAt: string; // Assuming ISO 8601 date-time string
  barcode: string;
  qrCode: string; // Or whatever type the QR code is
}
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  dimensions: Dimensions;
  price: number;
  discountPercentage: number;
  meta: Meta;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
  payment?: string | React.ReactNode;
  status?: string;
}

export type { Review, Product };
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
