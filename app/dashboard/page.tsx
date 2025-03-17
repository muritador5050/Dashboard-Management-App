'use client';
import { useAuthGuard } from '../lib/authGuard';

const Dashboard = () => {
  useAuthGuard();
  return <h1 className='text-2xl font-bold'>Welcome, </h1>;
};

export default Dashboard;
