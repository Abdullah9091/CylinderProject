import React from 'react';

const StatCard = ({ title, value, change, isPositive }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <p className="text-sm text-gray-500 font-medium">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
  </div>
);

export default StatCard;