import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPurchases,
  setSelectedPurchase,
} from '../../../features/Purchases/PurchasesSlice';
import { fetchSuppliers } from '../../../features/suppliers/suppliersSlice';
import SaleRecord from './SaleRecord';

const App = () => {
  const dispatch = useDispatch();
  const { purchases, selectedPurchase } = useSelector((state) => state.purchase);
  const supplierList = useSelector((state) => state.suppliers.list);

  const [view, setView] = useState('purchase');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSuppliers());
    dispatch(fetchPurchases());
  }, [dispatch]);

  // Filter and Paginate
  const filteredPurchases = purchases.filter((po) =>
    po.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPurchases = filteredPurchases.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-white p-6 relative">
      {/* View Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setView('purchase')}
          className={`px-4 py-2 rounded font-semibold border ${
            view === 'purchase' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Purchase Record
        </button>
        <button
          onClick={() => setView('sales')}
          className={`px-4 py-2 rounded font-semibold border ${
            view === 'sales' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Sale Record
        </button>
      </div>

      {view === 'purchase' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Purchase Management</h1>
              <p className="text-gray-500">Create and manage purchase orders from suppliers</p>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search PO Number..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
              className="border rounded px-3 py-1 text-sm"
            />
          </div>

          <div className="bg-white border rounded p-4">
            <h2 className="text-xl font-semibold mb-1">Purchase Orders</h2>
            <p className="text-sm text-gray-500 mb-4">All purchase orders and their status</p>

            {/* Table */}
            <table className="w-full text-left border-t">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="py-2">PO Number</th>
                  <th>Supplier</th>
                  <th>Purchase Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentPurchases.length > 0 ? (
                  currentPurchases.map((po) => (
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Optional Modal View for PO Details */}
          {selectedPurchase && (
            <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                  onClick={() => dispatch(setSelectedPurchase(null))}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                >
                  &times;
                </button>
                {/* Add more details if needed */}
              </div>
            </div>
          )}
        </>
      )}

      {view === 'sales' && <SaleRecord />}
    </div>
  );
};

export default App;
