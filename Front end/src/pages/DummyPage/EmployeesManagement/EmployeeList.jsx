import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const EmployeeList = ({ employees = [], onEdit, onDelete, onToggleStatus }) => (
  <table className="w-full bg-white rounded shadow text-sm">
    <thead className="text-gray-600 font-semibold border-b">
      <tr>
        <th className="p-3 text-left">Name</th>
        <th>Contact</th>
        <th>Join Date</th>
        <th>Assigned Stock</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map(emp => (
        <tr key={emp.id} className="border-b hover:bg-gray-50">
          <td className="p-3 font-medium">{emp.name}</td>
          <td className="text-center">{emp.email}<br />{emp.phone || '-'}</td>
          <td className="text-center">{emp.joinDate}</td>
          <td className="text-center">{emp.stock?.length || 0} items</td>
          <td className="text-center">
            <span
              className={`px-2 py-1 rounded text-xs ${
                emp.status === 'active'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {emp.status}
            </span>
          </td>
          <td className="text-center space-x-2">
            <button
              onClick={() => onEdit(emp)}
              className="text-blue-600 hover:text-blue-800"
              title="Edit"
            >
              <FiEdit />
            </button>
            <button
              onClick={() => onToggleStatus(emp.id)}
              className="text-yellow-600 hover:text-yellow-800 text-xs"
              title="Toggle Status"
            >
              {emp.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
            <button
              onClick={() => onDelete(emp.id)}
              className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <FiTrash2 />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeList;
