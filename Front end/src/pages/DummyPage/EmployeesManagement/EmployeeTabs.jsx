import React from 'react';

const tabs = [
  { key: 'employees', label: 'Employees' },
];

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none transition-all duration-200
            ${
              activeTab === tab.key
                ? 'bg-blue-100 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
