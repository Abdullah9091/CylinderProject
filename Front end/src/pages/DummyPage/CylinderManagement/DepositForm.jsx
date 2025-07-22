import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDeposit } from '../../../features/CylinderManagement/CylinderSlice';
import { fetchCustomers } from '../../../features/CustomerSlice/Customer';

const DepositForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer: '',
    cylinderType: '',
    quantity: 1,
    paymentMethod: 'Cash',
    checkNumber: '',
    bankName: '',
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer || !formData.cylinderType || formData.quantity < 1) {
      alert('Please fill all required fields correctly.');
      return;
    }

    console.log('Submitting Deposit:', formData);

    setLoading(true);
    await dispatch(addDeposit(formData));
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-30 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">New Cylinder Deposit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Selection */}
          <div>
            <label className="block mb-1 font-medium">Customer</label>
            <select
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Customer</option>
              {customers.map((cust) => (
                <option key={cust._id} value={cust._id}>
                  {cust.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cylinder Type */}
          <div>
            <label className="block mb-1 font-medium">Cylinder Type</label>
            <select
              name="cylinderType"
              value={formData.cylinderType}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="Small">Small</option>
              <option value="Large">Large</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash"
                  checked={formData.paymentMethod === 'Cash'}
                  onChange={handleChange}
                />
                <span>Cash</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Check"
                  checked={formData.paymentMethod === 'Check'}
                  onChange={handleChange}
                />
                <span>Check</span>
              </label>
            </div>
          </div>

          {/* Check Payment Fields */}
          {formData.paymentMethod === 'Check' && (
            <>
              <div>
                <label className="block mb-1 font-medium">Check Number</label>
                <input
                  type="text"
                  name="checkNumber"
                  value={formData.checkNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter check number"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter bank name"
                />
              </div>
            </>
          )}

          {/* Form Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Creating...' : 'Create Deposit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
