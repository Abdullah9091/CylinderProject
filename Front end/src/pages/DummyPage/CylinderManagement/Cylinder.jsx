import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DepositForm from './DepositForm';
import RefillForm from './RefillForm';
import ReturnForm from './ReturnForm';
import SignatureModal from './Signature';
import { LuReceiptText } from "react-icons/lu";
import DepositInvoice from './DepositInvoice';
import RefillInvoice from './RefillInvoice';
import ReturnInvoice from './ReturnInvoice';

import { 
  fetchCylinders, 
  fetchRefills, 
  fetchReturns, 
  deleteDeposit,
  deleteRefill,
  deleteReturn
} from '../../../features/CylinderManagement/CylinderSlice';
import { IoTrash } from "react-icons/io5";

const CylinderManagement = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('Deposits');
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showRefillForm, setShowRefillForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  const deposits = useSelector((state) => state.cylinders.deposits || []);
  const refills = useSelector((state) => state.cylinders.refills || []);
  const returns = useSelector((state) => state.cylinders.returns || []);






 const handleDeleteDeposit = (id) => {
  if (window.confirm("Are you sure you want to delete this deposit?")) {
    dispatch(deleteDeposit(id)); 
  }
};

const handleDeleterefill = (id) => {
  if (window.confirm("Are you sure you want to delete this refill?")) {
    dispatch(deleteRefill(id)); 
  }
};

const handledeleteReturn = (id) => {
  if (window.confirm("Are you sure you want to delete this refill?")) {
    dispatch(deleteReturn(id)); 
  }
};


  useEffect(() => {
    dispatch(fetchCylinders());
    dispatch(fetchRefills());
    dispatch(fetchReturns());


  }, [dispatch]);

  const handleConfirmSignature = (image) => {
    setSignatureImage(image);
  };

  const handleEditSignature = () => {
    setSignatureImage(null);
  };

  const handleGenerateReceipt = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  const handleDepositSuccess = (newDeposit) => {
    setShowDepositForm(false);
    setSelectedItem(newDeposit);
    setSelectedType('deposit');
  };

  const generateInvoiceData = (item) => {
    const base = {
      invoice: `${selectedType.charAt(0).toUpperCase()}-${item._id}`,
      customer: item.customer,
      date: new Date().toISOString().split('T')[0],
    };

    switch (selectedType) {
      case 'refill':
        return {
          ...base,
          total: parseFloat(item.price),
          products: [
            {
              name: `${item.cylinderType} Refill`,
              quantity: item.quantity,
              price: parseFloat(item.price / item.quantity),
            },
          ],
        };
      case 'deposit':
        return {
          ...base,
          total: item.quantity * 100,
          products: [
            {
              name: `${item.cylinderType} Deposit`,
              quantity: item.quantity,
              price: 100,
            },
          ],
        };
      case 'return':
        return {
          ...base,
          total: 0,
          products: [
            {
              name: `${item.cylinderType} Return`,
              quantity: item.quantity,
              price: 0,
            },
          ],
        };
      default:
        return {};
    }
  };

  const renderRows = () => {
    if (activeTab === 'Deposits') {
      return deposits.length > 0 ? (
        deposits.map((d) => (
          <tr key={d._id} className="border-b">
            <td className="p-2">{d.customer}</td>
            <td className="p-2">{d.cylinderType}</td>
            <td className="p-2">{d.quantity}</td>
            <td className="p-2">{d.paymentMethod}</td>
            <td className="p-2 flex gap-2">
              <button
                className="text-2xl px-3 py-1 rounded"
                onClick={() => handleGenerateReceipt(d, 'deposit')}
                title="Generate Receipt"
              >
                <LuReceiptText />
              </button>
              <button
                className="text-red-600 text-sm"
                onClick={() => handleDeleteDeposit(d._id)}
                title="Delete Deposit"
              >
                <IoTrash />

                  </button>
            </td>

          </tr>
        ))
      ) : (
        <tr><td colSpan="5" className="text-center p-4">No deposits yet</td></tr>
      );
    }

    if (activeTab === 'Refills') {
      return refills.length > 0 ? (
        refills.map((r) => (
          <tr key={r._id} className="border-b">
            <td className="p-2">{r.customer}</td>
            <td className="p-2">{r.cylinderType}</td>
            <td className="p-2">{r.quantity}</td>
            <td className="p-2">AED {r.price}</td>
            <td className="p-2">
              <button
                className="text-2xl px-3 py-1 rounded"
                onClick={() => handleGenerateReceipt(r, 'refill')}
              >
                <LuReceiptText />
              </button>
              <button
                className="text-red-600 text-sm"
                onClick={() => handleDeleterefill(r._id)}
                title="Delete Refill"
              >
                <IoTrash />

              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr><td colSpan="5" className="text-center p-4">No refills yet</td></tr>
      );
    }

    if (activeTab === 'Returns') {
      return returns.length > 0 ? (
        returns.map((ret) => (
          <tr key={ret._id} className="border-b">
            <td className="p-2">{ret.customer}</td>
            <td className="p-2">{ret.cylinderType}</td>
            <td className="p-2">{ret.quantity}</td>
            <td className="p-2">{ret.returnDate}</td>
            <td className="p-2">
              <button
                className="text-2xl px-3 py-1 rounded"
                onClick={() => handleGenerateReceipt(ret, 'return')}
              >
                <LuReceiptText />
              </button>
              <button
                className="text-red-600 text-sm"
                onClick={() =>handledeleteReturn(ret._id)}
                title="Delete Return"
              >
                <IoTrash />

              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr><td colSpan="5" className="text-center p-4">No returns yet</td></tr>
      );
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Cylinder Management</h1>
        <p className="text-gray-500">Manage deposits, refills, and returns</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {['Deposits', 'Refills', 'Returns'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded border ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => setShowDepositForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Deposit
        </button>
        <button onClick={() => setShowRefillForm(true)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
          Refill
        </button>
        <button onClick={() => setShowReturnForm(true)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
          Return
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">{activeTab} List</h2>
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              {activeTab === 'Deposits' && (
                <>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Cylinder Type</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Payment</th>
                  <th className="p-2">Receipt</th>
                </>
              )}
              {activeTab === 'Refills' && (
                <>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Cylinder Type</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total Price</th>
                  <th className="p-2">Receipt</th>
                </>
              )}
              {activeTab === 'Returns' && (
                <>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Cylinder Type</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Return Date</th>
                  <th className="p-2">Receipt</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>

      {/* Modals */}
      {showDepositForm && (
        <DepositForm
          onClose={() => setShowDepositForm(false)}
          onSuccess={handleDepositSuccess}
        />
      )}
      {showRefillForm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <RefillForm onClose={() => setShowRefillForm(false)} />
        </div>
      )}
      {showReturnForm && (
        <ReturnForm onClose={() => setShowReturnForm(false)} />
      )}

      {/* Signature Modal */}
      {selectedItem && !signatureImage && (
        <SignatureModal
          invoice={selectedItem._id}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirmSignature}
        />
      )}

      {/* Invoice Preview */}
      {signatureImage && selectedItem && selectedType === 'deposit' && (
  <DepositInvoice
    invoiceData={generateInvoiceData(selectedItem)}
    signature={signatureImage}
    onEdit={handleEditSignature}
    onClose={() => {
      setSignatureImage(null);
      setSelectedItem(null);
      setSelectedType(null);
    }}
  />
)}

{signatureImage && selectedItem && selectedType === 'refill' && (
  <RefillInvoice
    invoiceData={generateInvoiceData(selectedItem)}
    signature={signatureImage}
    onEdit={handleEditSignature}
    onClose={() => {
      setSignatureImage(null);
      setSelectedItem(null);
      setSelectedType(null);
    }}
  />
)}

{signatureImage && selectedItem && selectedType === 'return' && (
  <ReturnInvoice
    invoiceData={generateInvoiceData(selectedItem)}
    signature={signatureImage}
    onEdit={handleEditSignature}
    onClose={() => {
      setSignatureImage(null);
      setSelectedItem(null);
      setSelectedType(null);
    }}
  />
)}

    </div>
  );
};

export default CylinderManagement;
