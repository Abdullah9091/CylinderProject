import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPurchases } from '../../../features/Purchases/PurchasesSlice';
import { fetchSales } from '../../../features/SalesSlice/Sales';

const Inventory = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchase.purchases);
  const purchaseStatus = useSelector((state) => state.purchase.status);
  const purchaseError = useSelector((state) => state.purchase.error);

  const sales = useSelector((state) => state.sales?.sales || []);
  const salesStatus = useSelector((state) => state.sales.status);
  const salesError = useSelector((state) => state.sales.error);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (purchaseStatus === 'idle') dispatch(fetchPurchases());
    if (salesStatus === 'idle') dispatch(fetchSales());
  }, [dispatch, purchaseStatus, salesStatus]);

  // Show loading state
  if (purchaseStatus === 'loading' || salesStatus === 'loading') {
    return <div className="p-6 text-gray-600">Loading inventory data...</div>;
  }

  // Show error state
  if (purchaseStatus === 'failed' || salesStatus === 'failed') {
    return (
      <div className="p-6 text-red-600">
        Error loading data:
        <div>{purchaseError || 'Purchase error not specified'}</div>
        <div>{salesError || 'Sales error not specified'}</div>
      </div>
    );
  }

  // Group approved purchases
  const groupedPurchases = purchases
    .filter((p) => p.approved)
    .reduce((acc, purchase) => {
      const key = purchase.code;
      if (!acc[key]) {
        acc[key] = {
          product: purchase.product,
          code: purchase.code,
          category: purchase.category,
          supplier: purchase.supplier,
          purchasePrice: purchase.purchasePrice,
          purchaseQty: purchase.quantity,
          saleQty: 0,
          stock: purchase.quantity,
          purchaseHistory: [{ date: purchase.date, quantity: purchase.quantity }],
          saleHistory: [],
        };
      } else {
        acc[key].purchaseQty += purchase.quantity;
        acc[key].stock += purchase.quantity;
        acc[key].purchaseHistory.push({ date: purchase.date, quantity: purchase.quantity });
      }
      return acc;
    }, {});

  // Subtract sold quantities
  sales
    .filter((s) => s.approved)
    .forEach((sale) => {
      const key = sale.code;
      if (groupedPurchases[key]) {
        groupedPurchases[key].saleQty += sale.quantity;
        groupedPurchases[key].stock -= sale.quantity;
        groupedPurchases[key].saleHistory.push({ date: sale.date, quantity: sale.quantity });
      }
    });

  const inventoryList = Object.values(groupedPurchases);

  const filteredInventory = inventoryList.filter(
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStock = inventoryList.reduce((sum, item) => sum + item.stock, 0);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-1">Inventory Management</h1>
      <p className="text-gray-500 mb-6">Track and manage your cylinder and gas stock</p>

      {/* Search and Total Stock */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by product or category..."
          className="border px-3 py-2 rounded shadow-sm w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="text-sm text-gray-600">
          <strong>Total Stock:</strong> {totalStock} units
        </div>
      </div>

      {/* Inventory Table */}
      <div className="border rounded p-4 bg-gray-50 shadow">
        <h2 className="text-xl font-semibold mb-2">Current Inventory</h2>
        <p className="text-sm text-gray-500 mb-4">Based on approved purchases and sales</p>

        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-gray-100 text-gray-700">
              <th className="p-2">Product</th>
              <th className="p-2">Category</th>
              <th className="p-2">Purchase Price</th>
              <th className="p-2">Purchased</th>
              <th className="p-2">Sold</th>
              <th className="p-2">In Stock</th>
              <th className="p-2">Purchase History</th>
              <th className="p-2">Sales History</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 italic p-4">
                  No matching inventory found.
                </td>
              </tr>
            ) : (
              filteredInventory.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{item.product}</td>
                  <td className="p-2">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-2">AED {item.purchasePrice.toFixed(2)}</td>
                  <td className="p-2 text-green-700">{item.purchaseQty}</td>
                  <td className="p-2 text-red-700">{item.saleQty}</td>
                  <td className="p-2 font-semibold">{item.stock}</td>
                  <td className="p-2 whitespace-pre-wrap text-green-700">
                    {item.purchaseHistory.map((h, i) => (
                      <div key={i}>{h.date}: +{h.quantity}</div>
                    ))}
                  </td>
                  <td className="p-2 whitespace-pre-wrap text-red-700">
                    {item.saleHistory.map((h, i) => (
                      <div key={i}>{h.date}: -{h.quantity}</div>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
