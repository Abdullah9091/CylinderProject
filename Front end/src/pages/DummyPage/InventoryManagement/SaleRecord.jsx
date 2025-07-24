import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 5;

const GasSales = () => {
  const sales = useSelector((state) => state.sales.sales);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSales = sales.filter((sale) =>
    sale.invoice?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE);

  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gas Sales</h2>
        <input
          type="text"
          placeholder="Search by Invoice #"
          className="border px-3 py-2 rounded w-64"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="bg-white border rounded p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Recent Sales</h2>
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-2">Invoice #</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Date</th>
              <th className="p-2">Paid</th>
              <th className="p-2">Pending</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSales.map((s, index) => (
              <tr key={s.id || s.invoice || index} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium">{s.invoice}</td>
                <td className="p-2">{s.customer}</td>
                <td className="p-2">{s.date}</td>
                <td className="p-2">AED {parseFloat(s.paid).toFixed(2)}</td>
                <td className="p-2">
                  {s.due > 0 ? (
                    <span className="text-red-600">AED {s.due.toFixed(2)}</span>
                  ) : (
                    <span className="text-green-600">-</span>
                  )}
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      s.status === 'paid'
                        ? 'bg-green-100 text-green-900'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredSales.length)} of{' '}
            {filteredSales.length}
          </p>

          <div className="space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 border rounded text-sm"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 border rounded text-sm"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasSales;
