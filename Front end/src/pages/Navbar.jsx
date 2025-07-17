import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/ui/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <button onClick={() => dispatch(toggleSidebar())}>
          <FiMenu className="text-xl" />
        </button>
        <span className="text-blue-600 font-medium">GasCorp Management</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-700 font-semibold">Dashboard</span>
      </div>
    </div>
  );
};

export default Navbar;