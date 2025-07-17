import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DepositForm from './DepositForm';
import RefillForm from './RefillForm';
import ReturnForm from './ReturnForm';

const CylinderManagement = () => {
  const [activeTab, setActiveTab] = useState('Deposits');
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showRefillForm, setShowRefillForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);

  const deposits = useSelector((state) => state.cylinders.deposits);
  const refills = useSelector((state) => state.cylinders.refills);
  const returns = useSelector((state) => state.cylinders.returns);

  const renderRows = () => {
    if (activeTab === 'Deposits') {
      return deposits.length > 0 ? (
        deposits.map((d) => (
          <tr key={d.id} className="border-b">
            <td className="p-2">{d.customer}</td>
            <td className="p-2">{d.cylinderType}</td>
            <td className="p-2">{d.quantity}</td>
            <td className="p-2">{d.paymentMethod}</td>
          </tr>
        ))
      ) : (
        <tr><td colSpan="4" className="text-center p-4">No deposits yet</td></tr>
      );
    }

    if (activeTab === 'Refills') {
      return refills.length > 0 ? (
        refills.map((r) => (
          <tr key={r.id} className="border-b">
            <td className="p-2">{r.customer}</td>
            <td className="p-2">{r.cylinderType}</td>
            <td className="p-2">{r.quantity}</td>
            <td className="p-2">AED {r.price}</td>
          </tr>
        ))
      ) : (
        <tr><td colSpan="4" className="text-center p-4">No refills yet</td></tr>
      );
    }

    if (activeTab === 'Returns') {
      return returns.length > 0 ? (
        returns.map((ret) => (
          <tr key={ret.id} className="border-b">
            <td className="p-2">{ret.customer}</td>
            <td className="p-2">{ret.cylinderType}</td>
            <td className="p-2">{ret.quantity}</td>
            <td className="p-2">{ret.returnDate}</td>
          </tr>
        ))
      ) : (
        <tr><td colSpan="4" className="text-center p-4">No returns yet</td></tr>
      );
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Cylinder Management</h1>
        <p className="text-gray-500">Manage deposits, refills, and returns</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {['Deposits', 'Refills', 'Returns'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded border ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Buttons aligned right */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setShowDepositForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Deposit
        </button>
        <button
          onClick={() => setShowRefillForm(true)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
        >
          Refill
        </button>
        <button
          onClick={() => setShowReturnForm(true)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
        >
          Return
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded p-4">
        <h2 className="text-lg font-semibold mb-2">{activeTab} List</h2>
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              {activeTab === 'Deposits' && (
                <>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Cylinder Type</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Payment</th>
                </>
              )}
              {activeTab === 'Refills' && (
                <>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Cylinder Type</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total Price</th>
                </>
              )}
              {activeTab === 'Returns' && (
                <>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Cylinder Type</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Return Date</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showDepositForm && <DepositForm onClose={() => setShowDepositForm(false)} />}
      {showRefillForm && <RefillForm onClose={() => setShowRefillForm(false)} />}
      {showReturnForm && <ReturnForm onClose={() => setShowReturnForm(false)} />}
    </div>
  );
};

export default CylinderManagement;
