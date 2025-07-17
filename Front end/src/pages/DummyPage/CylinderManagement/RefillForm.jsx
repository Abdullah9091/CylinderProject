import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRefill } from '../../../features/CylinderManagement/CylinderSlice';

const cylinderPrices = {
  Small: 50,
  Large: 80,
};

const RefillForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers); // Get customers from Redux

  const [formData, setFormData] = useState({
    customer: '',
    cylinderType: '',
    quantity: 1,
    date: new Date().toISOString().split('T')[0],
  });

  const price = cylinderPrices[formData.cylinderType] || 0;
  const totalPrice = price * formData.quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRefill({ ...formData, price: totalPrice }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-30">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Refill Cylinder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Customer Dropdown */}
          <select
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Cylinder Type Dropdown */}
          <select
            value={formData.cylinderType}
            onChange={(e) => setFormData({ ...formData, cylinderType: e.target.value })}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Cylinder Type</option>
            <option value="Small">Small</option>
            <option value="Large">Large</option>
          </select>

          {/* Show Price Info */}
          {formData.cylinderType && (
            <div className="text-blue-600 font-semibold">
              Price per Cylinder: AED {price} | Total: AED {totalPrice}
            </div>
          )}

          {/* Quantity Input */}
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            min="1"
            className="w-full border p-2 rounded"
            required
          />

          {/* Date Picker */}
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border p-2 rounded"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Proceed Refill</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefillForm;
