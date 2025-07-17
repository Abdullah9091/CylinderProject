import React from 'react';
import { useSelector } from 'react-redux';
import StatCard from '../components/Card/StatCard';

const Dashboard = () => {
  const { totalRevenue, activeCustomers, productsSold, cylinderServices } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="flex-1">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to GasCorp Management System</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Revenue" value={`AED ${totalRevenue.toLocaleString()}`} change="+12.5% from last month" isPositive />
          <StatCard title="Active Customers" value={activeCustomers} change="+180 new this month" isPositive />
          <StatCard title="Products Sold" value={productsSold} change="+19% from last month" isPositive />
          <StatCard title="Cylinder Services" value={cylinderServices} change="-5% from last month" isPositive={false} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Weekly Sales Overview</h2>
            <p className="text-gray-500 text-sm">Gas sales, cylinder services, and revenue</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Revenue Distribution</h2>
            <p className="text-gray-500 text-sm">Breakdown by service type</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
