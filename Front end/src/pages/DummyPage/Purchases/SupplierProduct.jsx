import React from 'react';

const supplierData = [
  {
    name: 'Al Khaleej Gas Co.',
    contact: {
      name: 'Ahmed Hassan',
      phone: '+971501234567',
      email: 'ahmed@alkhaleejgas.ae',
    },
    products: [
      {
        name: 'Cooking Gas Cylinder',
        code: 'CGC001',
        category: 'cylinder',
        price: 'AED 45.50',
        minQty: '10 units',
      },
      {
        name: 'Industrial Gas Tank',
        code: 'IGT001',
        category: 'gas',
        price: 'AED 120.00',
        minQty: '5 units',
      },
    ],
  },
  {
    name: 'Emirates Gas Supply',
    contact: {
      name: 'Fatima Al Zahra',
      phone: '+971507654321',
      email: 'fatima@emiratesgas.ae',
    },
    products: [
      {
        name: 'Portable Gas Burner',
        code: 'PGB001',
        category: 'gas',
        price: 'AED 25.00',
        minQty: '20 units',
      },
    ],
  },
];

const categoryColor = {
  gas: 'bg-green-100 text-green-800',
  cylinder: 'bg-orange-100 text-orange-800',
};

const SupplierProducts = () => {
  return (
    <div className="space-y-6">
      {supplierData.map((supplier, idx) => (
        <div key={idx} className="border rounded p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold">{supplier.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            Contact: {supplier.contact.name} | {supplier.contact.phone} |{' '}
            <span className="text-blue-600">{supplier.contact.email}</span>
          </p>

          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2">Product Name</th>
                <th>Code</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Min Order Qty</th>
              </tr>
            </thead>
            <tbody>
              {supplier.products.map((product, pIdx) => (
                <tr key={pIdx} className="border-b last:border-none">
                  <td className="py-2">{product.name}</td>
                  <td>
                    <span className="bg-gray-100 px-2 py-1 rounded font-medium">{product.code}</span>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        categoryColor[product.category] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.minQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SupplierProducts;
