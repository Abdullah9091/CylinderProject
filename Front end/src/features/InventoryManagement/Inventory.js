import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  receipts: [
    {
      poNumber: 'PO001',
      supplier: 'Al Khaleej Gas Co.',
      product: 'Cooking Gas Cylinder',
      code: 'CGC001',
      category: 'cylinder',
      purchasePrice: 45.5,
      sellingPrice: 55.0,
      quantity: 30,
      date: '2024-07-10',
      received: false,
    },
    {
      poNumber: 'PO002',
      supplier: 'Emirates Gas Supply',
      product: 'Industrial Gas Tank',
      code: 'IGT001',
      category: 'gas',
      purchasePrice: 120.0,
      sellingPrice: 150.0,
      quantity: 75,
      date: '2024-07-11',
      received: false,
    }
  ],
  inventory: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Add a new receipt
    addReceipt: (state, action) => {
      const {
        poNumber,
        supplier,
        product,
        code,
        category,
        purchasePrice,
        sellingPrice,
        quantity,
        date
      } = action.payload;

      const exists = state.receipts.find(r => r.poNumber === poNumber);
      if (!exists) {
        state.receipts.push({
          poNumber,
          supplier,
          product,
          code,
          category,
          purchasePrice,
          sellingPrice,
          quantity,
          date,
          received: false,
        });
      }
    },

    // Mark receipt as received and update inventory
    receiveInventory: (state, action) => {
      const poNumber = action.payload;
      const receipt = state.receipts.find(r => r.poNumber === poNumber);

      if (receipt && !receipt.received) {
        receipt.received = true;

        const itemIndex = state.inventory.findIndex(item => item.code === receipt.code);

        if (itemIndex !== -1) {
          // Update existing inventory item
          state.inventory[itemIndex].stock += receipt.quantity;
          state.inventory[itemIndex].history.push({
            date: receipt.date,
            quantity: receipt.quantity
          });
        } else {
          // Add new inventory item
          state.inventory.push({
            product: receipt.product,
            code: receipt.code,
            category: receipt.category,
            supplier: receipt.supplier,
            purchasePrice: receipt.purchasePrice,
            sellingPrice: receipt.sellingPrice,
            stock: receipt.quantity,
            status: 'In Stock',
            history: [
              {
                date: receipt.date,
                quantity: receipt.quantity
              }
            ]
          });
        }
      }
    },
  },
});

export const { addReceipt, receiveInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
