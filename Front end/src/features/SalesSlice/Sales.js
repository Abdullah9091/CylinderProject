import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const response = await axios.get('http://localhost:5000/api/sales');
  return response.data;
});

export const addSale = createAsyncThunk(
  'sales/addSale',
  async (saleData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/sales', saleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  sales: [],
  status: 'idle', 
  error: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    deleteSale: (state, action) => {
      state.sales = state.sales.filter((sale) => sale.id !== action.payload);
    },

    updateSale: (state, action) => {
      const index = state.sales.findIndex((sale) => sale.id === action.payload.id);
      if (index !== -1) {
        state.sales[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addSale.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sales.push(action.payload); 
      })
      .addCase(addSale.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add sale';
      });
  },
});

export const { deleteSale, updateSale } = salesSlice.actions;

export default salesSlice.reducer;
