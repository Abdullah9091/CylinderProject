import React from 'react';

const AssignStockModal = ({ onClose, stockData = {}, onSubmit }) => {
  const { employeeId = '', productId = '', quantity = '' } = stockData;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ employeeId, productId, quantity });
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Assign Stock</h2>

        <select
          name="employeeId"
          defaultValue={employeeId}
          className="border w-full p-2 mb-3"
          required
        >
          <option value="">Select Employee</option>
          {/* dynamically map your employees here */}
        </select>

        <select
          name="productId"
          defaultValue={productId}
          className="border w-full p-2 mb-3"
          required
        >
          <option value="">Select Product</option>
          {/* dynamically map your products here */}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          defaultValue={quantity}
          className="border w-full p-2 mb-4"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Assign
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignStockModal;
