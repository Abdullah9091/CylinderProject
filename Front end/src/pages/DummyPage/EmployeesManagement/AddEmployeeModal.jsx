import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployeeToBackend } from '../../../features/EmployeesSlice/Employees'; // adjust path as needed

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(addEmployeeToBackend(formData)).unwrap();
      setFormData({ name: '', email: '', password: '' });
      onClose();
    } catch (err) {
      console.error('Failed to add employee:', err);
      alert('Error saving employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-6 rounded shadow-md w-[400px]"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border w-full p-2 mb-3"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border w-full p-2 mb-3"
          required
          autoComplete="new-email"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border w-full p-2 mb-4"
          required
          autoComplete="new-password"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeModal;
