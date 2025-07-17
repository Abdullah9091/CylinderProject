import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="mb-6">You are not authorized to access this page.</p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">Back to Home</Link>
    </div>
  );
};

export default Unauthorized;
