// src/components/CustomerManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    trn: '',
    phone: '',
    email: '',
    totalPurchases: 0,
    outstanding: 0,
    lastPurchase: '',
  });

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:5000/api/customers');
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/customers/${formData._id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/customers', formData);
    }
    fetchCustomers();
    resetForm();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/customers/${id}`);
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      trn: '',
      phone: '',
      email: '',
      totalPurchases: 0,
      outstanding: 0,
      lastPurchase: '',
    });
    setShowForm(false);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <p className="text-gray-500">Manage customer information and ledgers</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Customer
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Customer' : 'Add Customer'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Customer Name" className="border p-2 rounded" required />
              <input name="trn" value={formData.trn} onChange={handleChange} placeholder="TRN Number" className="border p-2 rounded" required />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded" required />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
              <input name="totalPurchases" value={formData.totalPurchases} onChange={handleChange} placeholder="Total Purchases" className="border p-2 rounded" />
              <input name="outstanding" value={formData.outstanding} onChange={handleChange} placeholder="Outstanding" className="border p-2 rounded" />
              <input name="lastPurchase" value={formData.lastPurchase} onChange={handleChange} placeholder="Last Purchase (yyyy-mm-dd)" className="border p-2 rounded" />
              <div className="col-span-2 flex justify-end gap-2">
                <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="border rounded p-4 mt-4">
        <h2 className="text-lg font-semibold mb-1">Customers List</h2>
        <p className="text-sm text-gray-500 mb-4">All registered customers and their account status</p>

        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">TRN</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Total Purchases</th>
              <th className="p-2">Outstanding</th>
              <th className="p-2">Last Purchase</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.trn}</td>
                <td className="p-2">{c.phone}<br />{c.email}</td>
                <td className="p-2">AED {Number(c.totalPurchases).toFixed(2)}</td>
                <td className="p-2" style={{ color: c.outstanding > 0 ? 'red' : 'green' }}>
                  AED {Number(c.outstanding).toFixed(2)}
                </td>
                <td className="p-2">{c.lastPurchase}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleView(c)} className="hover:text-blue-600"><FiEye /></button>
                  <button onClick={() => handleEdit(c)} className="hover:text-yellow-600"><FiEdit /></button>
                  <button onClick={() => handleDelete(c._id)} className="hover:text-red-600"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>TRN:</strong> {selectedCustomer.trn}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Total Purchases:</strong> AED {selectedCustomer.totalPurchases}</p>
            <p><strong>Outstanding:</strong> AED {selectedCustomer.outstanding}</p>
            <p><strong>Last Purchase:</strong> {selectedCustomer.lastPurchase}</p>
            <div className="mt-4 text-right">
              <button onClick={() => setSelectedCustomer(null)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
