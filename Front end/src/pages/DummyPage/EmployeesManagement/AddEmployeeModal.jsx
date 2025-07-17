import React from 'react';

const AddEmployeeModal = ({ isOpen, onClose, onSubmit, formData = {}, setFormData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} autoComplete='off' className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>

        <input
          type="text"
          name="name"
          value={formData?.name || ''}
          onChange={handleChange}
          placeholder="Name"
          className="border w-full p-2 mb-3"
          required
          autoComplete='off'
        />

        <input
          type="email"
          name="email"
          value={formData?.email || ''}
          onChange={handleChange}
          placeholder="Email"
          className="border w-full p-2 mb-3"
          required
            autoComplete="new-email"

        />

        <input
          type="password"
          name="password"
          value={formData?.password || ''}
          onChange={handleChange}
          placeholder="Password"
          className="border w-full p-2 mb-4"
          required
            autoComplete="new-password"

        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeModal;
