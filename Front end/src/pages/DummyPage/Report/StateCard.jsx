import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="bg-white border rounded-xl p-5 w-full sm:w-[260px] shadow hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm text-gray-500">{title}</h4>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
        {Icon && <Icon className="text-gray-400 w-6 h-6" />}
      </div>
    </div>
  );
};

export default StatCard;
