import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleForm,
  addPurchase,
  setActiveTab,
  approvePurchase,
  removePurchase,
  setSelectedPurchase,
  fetchPurchases,
} from '../../../features/Purchases/PurchasesSlice';
import { fetchSuppliers } from '../../../features/suppliers/suppliersSlice';
import { MdOutlineCheck } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

// ... (imports stay the same)
const App = () => {
  const dispatch = useDispatch();
  const { purchases, showForm, activeTab, selectedPurchase } = useSelector((state) => state.purchase);
  const supplierList = useSelector((state) => state.suppliers.list);

  const [supplier, setSupplier] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedGas, setSelectedGas] = useState('');
  const [gasKg, setGasKg] = useState('');
  const [gasPricePerKg, setGasPricePerKg] = useState('');
  const [cylinderCount, setCylinderCount] = useState('');
  const [cylinderPrice, setCylinderPrice] = useState('');

  useEffect(() => {
    dispatch(fetchSuppliers());
    dispatch(fetchPurchases());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let total = 0;
    if (selectedGas === 'Gas') {
      const kg = parseFloat(gasKg);
      const pricePerKg = parseFloat(gasPricePerKg);
      if (!isNaN(kg) && !isNaN(pricePerKg)) {
        total = kg * pricePerKg;
      }
    } else if (selectedGas === 'Cylinder') {
      const count = parseInt(cylinderCount);
      const price = parseFloat(cylinderPrice);
      if (!isNaN(count) && !isNaN(price)) {
        total = count * price;
      }
    }

    const newPurchase = {
      id: `PO-${Date.now()}`,
      supplier,
      orderDate: purchaseDate,
      total: `AED ${total.toFixed(2)}`,
      status: 'pending',
      notes,
      gasType: selectedGas,
      gasKg: selectedGas === 'Gas' ? gasKg : null,
      gasPricePerKg: selectedGas === 'Gas' ? gasPricePerKg : null,
      cylinderCount: selectedGas === 'Cylinder' ? cylinderCount : null,
      cylinderPrice: selectedGas === 'Cylinder' ? cylinderPrice : null,
    };

    dispatch(addPurchase(newPurchase));

    setSupplier('');
    setPurchaseDate('');
    setNotes('');
    setSelectedGas('');
    setGasKg('');
    setGasPricePerKg('');
    setCylinderCount('');
    setCylinderPrice('');
  };

  // ... (the rest of the component remains unchanged)


  return (
    <div className="min-h-screen bg-white p-6 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Purchase Management</h1>
          <p className="text-gray-500">Create and manage purchase orders from suppliers</p>
        </div>
        <button
          onClick={() => dispatch(toggleForm())}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + New Purchase Order
        </button>
      </div>

      {/* TABS */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => dispatch(setActiveTab('orders'))}
          className={`px-4 py-2 rounded font-medium ${activeTab === 'orders' ? 'bg-gray-200' : 'text-gray-500'}`}
        >
          Purchase Orders
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded p-4">
        <h2 className="text-xl font-semibold mb-1">Purchase Orders</h2>
        <p className="text-sm text-gray-500 mb-4">All purchase orders and their status</p>

        <table className="w-full text-left border-t">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="py-2">PO Number</th>
              <th>Supplier</th>
              <th>Purchase Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((po) => (
              <tr key={po.id} className="border-t text-sm">
                <td className="py-2">{po.id}</td>
                <td>{po.supplier}</td>
                <td>{po.orderDate}</td>
                <td>{po.total}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded text-xs ${
                      po.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {po.status}
                  </span>
                </td>
                <td className="space-x-1">
                  <button
                    className="border p-1 rounded hover:bg-gray-100"
                    onClick={() => dispatch(setSelectedPurchase(po))}
                  >
                    <IoEyeOutline />
                  </button>
                  {po.status === 'pending' && (
                    <button
                      className="border p-1 rounded hover:bg-gray-100"
                      onClick={() => dispatch(approvePurchase(po.id))}
                    >
                      <MdOutlineCheck />
                    </button>
                  )}
                  <button
                    className="border p-1 rounded hover:bg-gray-100"
                    onClick={() => dispatch(removePurchase(po.id))}
                  >
                    <RxCross2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW PURCHASE MODAL */}
      {selectedPurchase && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => dispatch(setSelectedPurchase(null))}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Purchase Details</h3>
            <p><strong>ID:</strong> {selectedPurchase.id}</p>
            <p><strong>Supplier:</strong> {selectedPurchase.supplier}</p>
            <p><strong>Purchase Date:</strong> {selectedPurchase.orderDate}</p>
            <p><strong>Total:</strong> {selectedPurchase.total}</p>
            <p><strong>Status:</strong> {selectedPurchase.status}</p>
            <p><strong>Purchase Type:</strong> {selectedPurchase.gasType || 'N/A'}</p>
            <p><strong>Notes:</strong> {selectedPurchase.notes || 'None'}</p>
            {selectedPurchase.gasType === 'Gas' && (
              <p>
                <strong>Gas Details:</strong> {selectedPurchase.gasKg} KG @ AED {selectedPurchase.gasPricePerKg}/KG
              </p>
            )}
            {selectedPurchase.gasType === 'Cylinder' && (
              <p>
                <strong>Cylinder Details:</strong> {selectedPurchase.cylinderCount} units @ AED {selectedPurchase.cylinderPrice}/Cylinder
              </p>
            )}
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => dispatch(toggleForm())}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">New Purchase Order</h3>
            <form onSubmit={handleSubmit}>
              {/* Supplier */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Supplier</label>
                <select
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select supplier</option>
                  {supplierList.map((sup) => (
                    <option key={sup.id} value={sup.company}>
                      {sup.company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purchase Date */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Purchase Date</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Purchase Type */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Purchase Type</label>
                <select
                  value={selectedGas}
                  onChange={(e) => {
                    setSelectedGas(e.target.value);
                    setGasKg('');
                    setGasPricePerKg('');
                    setCylinderCount('');
                    setCylinderPrice('');
                  }}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Gas">Gas</option>
                  <option value="Cylinder">Cylinder</option>
                </select>
              </div>

              {/* Gas Fields */}
              {selectedGas === 'Gas' && (
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Gas KG</label>
                    <input
                      type="number"
                      value={gasKg}
                      onChange={(e) => setGasKg(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price per KG</label>
                    <input
                      type="number"
                      value={gasPricePerKg}
                      onChange={(e) => setGasPricePerKg(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Cylinder Fields */}
              {selectedGas === 'Cylinder' && (
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Cylinder Count</label>
                    <input
                      type="number"
                      value={cylinderCount}
                      onChange={(e) => setCylinderCount(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price per Cylinder</label>
                    <input
                      type="number"
                      value={cylinderPrice}
                      onChange={(e) => setCylinderPrice(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
