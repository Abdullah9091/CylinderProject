import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSale } from '../../../features/SalesSlice/Sales';
import NewSaleForm from './NewSale';
import SignatureModal from './Signature';
import InvoicePreview from './InvoicePreview';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiReceipt } from "react-icons/tfi";

const GasSales = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.sales);

  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  const handleConfirmSignature = (image) => {
    setSignatureImage(image);
  };

  const handleEditSignature = () => {
    setSignatureImage(null); 
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Gas Sales</h1>
          <p className="text-gray-500">Process gas sales and generate invoices</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Sale
        </button>
      </div>

      {showForm && <NewSaleForm onClose={() => setShowForm(false)} />}

      <div className="bg-white border rounded p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Recent Sales</h2>
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-2">Invoice #</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Date</th>
              <th className="p-2">Total</th>
              <th className="p-2">Paid</th>
              <th className="p-2">Pending</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, index) => (
              <tr key={s.id || s.invoice || index} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium">{s.invoice}</td>
                <td className="p-2">{s.customer}</td>
                <td className="p-2">{s.date}</td>
                <td className="p-2">AED {s.total.toFixed(2)}</td>
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
                <td className="p-2 space-x-2">
                  <button
                    className="p-1 hover:text-gray-700"
                    title="Receipt"
                    onClick={() => {
                      setSelectedInvoice(s.invoice);
                      setSelectedSale(s);
                    }}
                  >
                    <TfiReceipt />
                  </button>
                  <button
                    onClick={() => dispatch(deleteSale(s.id))}
                    className="p-1 hover:text-red-600"
                    title="Delete"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature Modal */}
      {selectedInvoice && !signatureImage && (
        <SignatureModal
          invoice={selectedInvoice}
          onClose={() => {
            setSelectedInvoice(null);
            setSelectedSale(null);
          }}
          onConfirm={handleConfirmSignature}
        />
      )}

      {/* Invoice Preview with signature and actions */}
      {signatureImage && selectedSale && (
        <InvoicePreview
          invoiceData={selectedSale}
          signature={signatureImage}
          onEdit={handleEditSignature}
          onClose={() => {
            setSignatureImage(null);
            setSelectedInvoice(null);
            setSelectedSale(null);
          }}
        />
      )}
    </div>
  );
};

export default GasSales;
