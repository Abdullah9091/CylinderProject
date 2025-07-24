import React from 'react';
import StatCard from './StateCard';
import { TrendingUp, PackageCheck, Users, RotateCcw } from 'lucide-react';
import { useSelector } from 'react-redux';

const ReportsDashboard = () => {
  const { sales } = useSelector((state) => state.sales);
  const { customers } = useSelector((state) => state.customers);

  // Calculate total revenue from sales (paid amount)
  const totalRevenue =
    sales?.reduce((sum, sale) => sum + Number(sale.paid || 0), 0) || 0;

  // Calculate total gas products sold
  const gasSold =
    sales?.reduce((total, sale) => {
      return (
        total +
        (sale.products?.reduce((sum, product) => sum + product.quantity, 0) || 0)
      );
    }, 0) || 0;

  const totalCustomers = customers?.length || 0;

  // Placeholder: You can connect this to actual refills if needed
  const cylinderRefills = 25;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-sm text-gray-600">Daily sales and performance overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={`AED ${totalRevenue.toFixed(2)}`}
          subtitle="All employees"
          icon={TrendingUp}
        />
        <StatCard
          title="Gas Sales"
          value={gasSold}
          subtitle="Units sold"
          icon={PackageCheck}
        />
        <StatCard
          title="Cylinder Refills"
          value={cylinderRefills}
          subtitle="Refills completed"
          icon={RotateCcw}
        />
        <StatCard
          title="Customers Served"
          value={totalCustomers}
          subtitle="Total customers"
          icon={Users}
        />
      </div>
    </div>
  );
};

export default ReportsDashboard;
