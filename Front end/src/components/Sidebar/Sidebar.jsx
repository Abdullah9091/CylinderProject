import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiHome,
  FiUsers,
  FiBox,
  FiShoppingCart,
  FiActivity,
  FiTrendingUp,
  FiFileText,
  FiPieChart,
} from 'react-icons/fi';

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const role = useSelector((state) => state.auth.user?.role); // Get role from auth

  if (!sidebarOpen) return null;

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 h-screen px-6 py-8 shadow-sm">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">GasCorporation</h1>
        <span className="text-sm text-gray-500">Management System</span>
      </div>

      <nav className="mt-8 flex flex-col gap-3">
        <SidebarLink icon={<FiHome />} label="Dashboard" to="/" />

        {/* Admin Only Links */}
        {role === 'admin' && (
          <>
            <SidebarLink icon={<FiShoppingCart />} label="Suppliers" to="/suppliers" />
            <SidebarLink icon={<FiBox />} label="Purchases" to="/purchases" />
            <SidebarLink icon={<FiActivity />} label="Inventory" to="/inventory" />
            <SidebarLink icon={<FiUsers />} label="Customers" to="/customers" />
            <SidebarLink icon={<FiTrendingUp />} label="Gas Sales" to="/gas-sales" />
            <SidebarLink icon={<FiBox />} label="Cylinders" to="/cylinders" />
            <SidebarLink icon={<FiUsers />} label="Employees" to="/employees" />
          </>
        )}

        {/* Shared Links (Admin + Employee) */}
        <SidebarLink icon={<FiFileText />} label="Reports" to="/reports" />
        <SidebarLink icon={<FiPieChart />} label="P&L" to="/pl" />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
        isActive
          ? 'bg-blue-100 text-blue-600 font-semibold'
          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
      }`
    }
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
