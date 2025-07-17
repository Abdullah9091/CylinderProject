import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sales: [
    {
      id: '1',
      invoice: 'INV-2024-001',
      customer: 'Ahmed Al Mansouri',
      date: '2024-01-15',
      products: [
        { name: 'Cooking Gas Cylinder', quantity: 2, price: 57.75 }
      ],
      total: 115.50,
      paid: 100.50,
      due: 0,
      status: 'paid',
      note: ''
    }
  ]
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addSale: (state, action) => {
      state.sales.push(action.payload);
    },
    deleteSale: (state, action) => {
      state.sales = state.sales.filter(sale => sale.id !== action.payload);
    },
    updateSale: (state, action) => {
      const index = state.sales.findIndex(sale => sale.id === action.payload.id);
      if (index !== -1) {
        state.sales[index] = action.payload;
      }
    }
  }
});

export const { addSale, deleteSale, updateSale } = salesSlice.actions;
export default salesSlice.reducer;
