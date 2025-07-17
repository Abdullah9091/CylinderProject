import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSale } from '../../../features/SalesSlice/Sales';
import { v4 as uuidv4 } from 'uuid';

const NewSaleForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const productsList = ['Cooking Gas Cylinder', 'Industrial Gas Tank'];

  const [formData, setFormData] = useState({
    invoice: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
    customer: '',
    date: new Date().toISOString().split('T')[0],
    products: [],
    paid: '',
    note: ''
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addProductToList = () => {
    if (!selectedProduct || !quantity) return;
    const price = selectedProduct === 'Cooking Gas Cylinder' ? 57.75 : 75.0;
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { name: selectedProduct, quantity: Number(quantity), price }]
    }));
    setSelectedProduct('');
    setQuantity(1);
  };

  const calculateTotal = () =>
    formData.products.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    const due = total - parseFloat(formData.paid || 0);
    const status = due <= 0 ? 'paid' : 'partial';

    const sale = {
      id: uuidv4(),
      ...formData,
      total,
      due,
      status
    };

    dispatch(addSale(sale));
    onClose();
  };

  const total = calculateTotal();
  const paid = parseFloat(formData.paid || 0);
  const due = total - paid;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-start z-20 pt-10">
      <div className="bg-white w-full max-w-2xl rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Sale</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>

            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Product</option>
              {productsList.map((prod) => (
                <option key={prod} value={prod}>{prod}</option>
              ))}
            </select>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded w-24"
            />
            <button
              type="button"
              onClick={addProductToList}
              className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>

          {formData.products.length > 0 && (
            <div className="border rounded p-2 text-sm">
              {formData.products.map((item, i) => (
                <div key={i} className="flex justify-between py-1">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="text-gray-600">AED {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                <span>Total</span>
                <span>AED {total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="paid"
              value={formData.paid}
              onChange={(e) => setFormData({ ...formData, paid: e.target.value })}
              placeholder="Paid Amount"
              className="border p-2 rounded"
            />
            <input
              name="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Optional Note"
              className="border p-2 rounded"
            />
          </div>

          {/* ✅ Due Amount Field */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={`AED ${due.toFixed(2)}`}
              disabled
              className="border p-2 rounded bg-gray-100 text-red-600 font-semibold"
              placeholder="Due Amount"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSaleForm;
