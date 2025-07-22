import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveInventory } from '../../features/InventoryManagement/Inventory';

const InventoryManagement = () => {
  const dispatch = useDispatch();
  const receipts = useSelector((state) => state.inventory.receipts);
  const inventory = useSelector((state) => state.inventory.inventory);

  const pendingReceipts = receipts.filter((r) => !r.received);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-1">Inventory Management</h1>
      <p className="text-gray-500 mb-6">Manage your gas and cylinder inventory</p>

      {/* CURRENT INVENTORY */}
      <div className="border rounded p-4 mb-6">
        <h2 className="text-xl font-semibold">Current Inventory</h2>
        <p className="text-sm text-gray-500 mb-4">All products in stock with pricing and availability</p>

        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product</th>
              <th className="p-2">Code</th>
              <th className="p-2">Category</th>
              <th className="p-2">Purchase Price</th>
              <th className="p-2">Selling Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Purchase History</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length === 0 ? (
              <tr><td colSpan="9" className="text-gray-400 italic p-4">No inventory yet.</td></tr>
            ) : (
              inventory.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{item.product}</td>
                  <td className="p-2"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.code}</span></td>
                  <td className="p-2"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">{item.category}</span></td>
                  <td className="p-2">AED {item.purchasePrice.toFixed(2)}</td>
                  <td className="p-2 font-bold">AED {item.sellingPrice.toFixed(2)}</td>
                  <td className="p-2">{item.stock} units</td>
                  <td className="p-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded">In Stock</span></td>
                  <td className="p-2">{item.supplier}</td>
                  <td className="p-2 whitespace-pre">
                    {item.history.map((h, i) => (
                      <div key={i}>{h.date}: +{h.quantity}</div>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PENDING RECEIPTS */}
      <div className="border rounded p-4">
        <h2 className="text-lg font-semibold mb-1">Pending Receipts</h2>
        <p className="text-sm text-gray-500 mb-4">Approved purchase orders awaiting receipt</p>

        {pendingReceipts.length === 0 ? (
          <p className="text-gray-400 italic">No pending receipts.</p>
        ) : (
          pendingReceipts.map((receipt, idx) => (
            <div key={idx} className="border rounded p-4 mb-3 bg-white shadow-sm">
              <p><strong>Purchase Order:</strong> {receipt.poNumber}</p>
              <p><strong>Supplier:</strong> {receipt.supplier}</p>
              <p>{receipt.product} - Quantity: {receipt.quantity}</p>
              <button
                onClick={() => dispatch(receiveInventory(receipt.poNumber))}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Receive Inventory
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
