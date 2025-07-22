import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {
  fetchEmployees,
  deleteEmployeeFromBackend,
  toggleStatus,
  updateEmployeeInBackend,
} from '../../../features/EmployeesSlice/Employees';

const EmployeeManager = () => {
  const dispatch = useDispatch();
  const { list: employees, status, error } = useSelector(state => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || '',
        email: selectedEmployee.email || '',
        password: ''
      });
    }
  }, [selectedEmployee]);

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployeeFromBackend(id));
    }
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleStatus(id));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      const updatedData = { ...selectedEmployee, ...formData };
      dispatch(updateEmployeeInBackend({ id: selectedEmployee._id, data: updatedData }));
      setSelectedEmployee(null);
    }
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employee Management</h1>

      {/* Edit Form */}
      {selectedEmployee && (
        <div className="mb-6 border p-4 rounded shadow bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Edit Employee</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                Update
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Status & Error */}
      {status === 'loading' && <p>Loading employees...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}

      {/* Employee Table */}
      {status === 'succeeded' && (
        <table className="w-full bg-white rounded shadow text-sm">
          <thead className="text-gray-600 font-semibold border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{emp.name}</td>
                <td className="text-center">{emp.email}</td>
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
                    onClick={() => handleEdit(emp)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(emp._id)}
                    className="text-yellow-600 hover:text-yellow-800 text-xs"
                    title="Toggle Status"
                  >
                    {emp.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
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
      )}
    </div>
  );
};

export default EmployeeManager;
