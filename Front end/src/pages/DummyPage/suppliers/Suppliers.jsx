import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteSupplier,
  addSupplier,
  updateSupplier,
  fetchSuppliers
} from '../../../features/suppliers/suppliersSlice';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const Suppliers = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) =>
    Array.isArray(state.suppliers.list) ? state.suppliers.list : []
  );

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    company: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    trn: '',
    paymentTerms: '',
    status: 'active',
  });

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateSupplier(formData));
    } else {
      dispatch(addSupplier(formData));
    }

    setFormData({
      id: '',
      company: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      trn: '',
      paymentTerms: '',
      status: 'active',
    });

    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (supplier) => {
    setFormData(supplier);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Supplier Management</h1>
          <p className="text-gray-500">Manage your suppliers</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus /> Add Supplier
        </button>
      </div>

      {showForm && (
        <div className="absolute inset-0 bg-opacity-30 flex justify-center items-start pt-20 z-10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Supplier' : 'Add Supplier'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="Invoice Number"
                className="border p-2 rounded"
                disabled={isEditing}
              />
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Company Name"
                className="border p-2 rounded"
              />
              <input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                placeholder="Contact Person"
                className="border p-2 rounded"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone"
                className="border p-2 rounded"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Address"
                className="border p-2 rounded"
              />
              <input
                name="trn"
                value={formData.trn}
                onChange={handleChange}
                required
                placeholder="TRN Number"
                className="border p-2 rounded"
              />
              <input
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                required
                placeholder="Payment Terms"
                className="border p-2 rounded"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {isEditing ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-1">Suppliers List</h2>
        <p className="text-sm text-gray-500 mb-4">All registered suppliers</p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 px-4">Invoice #</th>
                <th className="py-2 px-4">Company</th>
                <th className="py-2 px-4">Contact Person</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">TRN #</th>
                <th className="py-2 px-4">Payment Terms</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{s.id}</td>
                  <td className="py-2 px-4">{s.company}</td>
                  <td className="py-2 px-4">{s.contactPerson}</td>
                  <td className="py-2 px-4">{s.phone}</td>
                  <td className="py-2 px-4">{s.email}</td>
                  <td className="py-2 px-4">{s.address}</td>
                  <td className="py-2 px-4">{s.trn}</td>
                  <td className="py-2 px-4">{s.paymentTerms}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        s.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="p-1 hover:text-blue-600"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => dispatch(deleteSupplier(s.id))}
                      className="p-1 hover:text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-4 text-gray-500"
                  >
                    No suppliers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
