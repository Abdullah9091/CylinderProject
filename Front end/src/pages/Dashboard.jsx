import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatCard from '../components/Card/StatCard';
import { fetchCustomers } from '../features/CustomerSlice/Customer';
import { fetchSales } from '../features/SalesSlice/Sales';

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetch sales and customers when dashboard mounts
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchSales());
  }, [dispatch]);

  // Access customers from Redux
  const { customers } = useSelector((state) => state.customers);
  const totalCustomers = customers?.length || 0;

  // Access sales from Redux
  const { sales } = useSelector((state) => state.sales);

  // ✅ Total products sold
  const totalProductsSold = sales?.reduce((total, sale) => {
    const saleTotalProducts = sale.products?.reduce((sum, product) => sum + product.quantity, 0);
    return total + saleTotalProducts;
  }, 0) || 0;

  // ✅ Total revenue (based on paid amount, not total invoice)
  const totalRevenue = sales?.reduce((sum, sale) => sum + Number(sale.paid || 0), 0) || 0;

  // Placeholder value for cylinder services (you can later fetch from backend)
  const cylinderServices = 15;

  return (
    <div className="flex-1">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to GasCorp Management System</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Revenue"
            value={`AED ${totalRevenue.toFixed(2)}`}
            change="+12.5% from last month"
            isPositive
          />
          <StatCard
            title="Total Customers"
            value={totalCustomers}
            change="+180 new this month"
            isPositive
          />
          <StatCard
            title="Products Sold"
            value={totalProductsSold}
            change="+19% from last month"
            isPositive
          />
          <StatCard
            title="Cylinder Services"
            value={cylinderServices}
            change="-5% from last month"
            isPositive={false}
          />
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
