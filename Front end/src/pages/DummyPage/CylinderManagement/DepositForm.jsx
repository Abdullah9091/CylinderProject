import React, { useEffect, useState } from 'react'; // 👈 import useEffect
import { useDispatch, useSelector } from 'react-redux';
import { addDeposit } from '../../../features/CylinderManagement/CylinderSlice';
import { fetchCustomers } from '../../../features/CustomerSlice/Customer'; // 👈 import thunk

const DepositForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);

  const [formData, setFormData] = useState({
    customer: '',
    cylinderType: '',
    quantity: 1,
    paymentMethod: 'Cash',
    checkNumber: '',
    bankName: '',
  });

  // ✅ Fetch customers when the form mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDeposit(formData));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-30">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">New Deposit</h2>
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
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Cylinder Type */}
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

          {/* Quantity */}
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full border p-2 rounded"
            min="1"
            required
          />

          {/* Payment Method */}
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash"
                checked={formData.paymentMethod === 'Cash'}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              /> Cash
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Check"
                checked={formData.paymentMethod === 'Check'}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              /> Check
            </label>
          </div>

          {/* Check Fields */}
          {formData.paymentMethod === 'Check' && (
            <div className="space-y-2">
              <input
                placeholder="Check Number"
                value={formData.checkNumber}
                onChange={(e) => setFormData({ ...formData, checkNumber: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Deposit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
