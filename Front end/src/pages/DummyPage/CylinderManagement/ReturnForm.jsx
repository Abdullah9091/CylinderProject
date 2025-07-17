import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReturn } from '../../../features/CylinderManagement/CylinderSlice';

const ReturnForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const deposits = useSelector((state) => state.cylinders.deposits);

  const [selectedDepositId, setSelectedDepositId] = useState('');

  const selectedDeposit = deposits.find((d) => d.id === selectedDepositId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDeposit) return;
    dispatch(addReturn({ ...selectedDeposit, returnDate: new Date().toISOString().split('T')[0] }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-30">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Return Cylinder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedDepositId}
            onChange={(e) => setSelectedDepositId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Active Deposit</option>
            {deposits.map((d) => (
              <option key={d.id} value={d.id}>
                {d.customer} - {d.cylinderType} x {d.quantity}
              </option>
            ))}
          </select>

          {selectedDeposit && (
            <div className="text-sm text-gray-600">
              Returning: {selectedDeposit.quantity} {selectedDeposit.cylinderType} for {selectedDeposit.customer}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Proceed Return</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnForm;
