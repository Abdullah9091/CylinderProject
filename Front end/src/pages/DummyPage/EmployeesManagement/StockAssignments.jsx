import React from 'react';

const StockAssignments = ({ assignments, employees, products }) => {
  // Helper to get employee name by ID
  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === Number(id));
    return emp ? emp.name : 'Unknown';
  };

  // Helper to get product name & code
  const getProductInfo = (id) => {
    const prod = products.find(p => p.id === Number(id));
    return prod ? `${prod.name}\n${prod.code}` : 'Unknown';
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-1">Stock Assignments</h2>
      <p className="text-gray-500 mb-4">All stock assignments to employees</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-2">Employee</th>
              <th className="py-2">Product</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Assigned Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{getEmployeeName(item.employeeId)}</td>
                <td className="py-2 whitespace-nowrap">
                  <div className="text-gray-800 font-medium">
                    {getProductInfo(item.productId).split('\n')[0]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getProductInfo(item.productId).split('\n')[1]}
                  </div>
                </td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">{item.assignedDate}</td>
                <td className="py-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-4">No stock assigned yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockAssignments;
