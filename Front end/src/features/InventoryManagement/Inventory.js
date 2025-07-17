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
  inventory: [], // ✅ NEW inventory list
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    receiveInventory: (state, action) => {
      const receipt = state.receipts.find(r => r.poNumber === action.payload);
      if (receipt && !receipt.received) {
        receipt.received = true;

        // Check if item already exists in inventory
        const existing = state.inventory.find(item => item.code === receipt.code);

        if (existing) {
          // Update stock and history
          existing.stock += receipt.quantity;
          existing.history.push({ date: receipt.date, quantity: receipt.quantity });
        } else {
          // Add new item to inventory
          state.inventory.push({
            product: receipt.product,
            code: receipt.code,
            category: receipt.category,
            supplier: receipt.supplier,
            purchasePrice: receipt.purchasePrice,
            sellingPrice: receipt.sellingPrice,
            stock: receipt.quantity,
            status: 'In Stock',
            history: [{ date: receipt.date, quantity: receipt.quantity }],
          });
        }
      }
    },
  },
});

export const { receiveInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
