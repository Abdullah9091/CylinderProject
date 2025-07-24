import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to assign stock
export const assignStock = createAsyncThunk(
  'assignedStock/assignStock',
  async (stockData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/stock-assignments', stockData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk to fetch all assigned stock
export const fetchAssignedStock = createAsyncThunk(
  'assignedStock/fetchAssignedStock',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/stock-assignments');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const assignedStockSlice = createSlice({
  name: 'assignedStock',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearAssignedStockState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    resetAssignStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // assignStock
      .addCase(assignStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(assignStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(assignStock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // fetchAssignedStock
      .addCase(fetchAssignedStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssignedStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAssignedStock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAssignedStock = (state) => state.assignedStock.data;

export const selectEmployees = (state) => state.employees.data;

export const selectPurchaseTypes = (state) => {
  const types = state.purchases.purchases.map((p) => p.gasType);
  return [...new Set(types)];
};

// Action creators
export const {
  clearAssignedStockState,
  resetAssignStatus, // ✅ Exported for modal cleanup
} = assignedStockSlice.actions;

// Reducer export
export default assignedStockSlice.reducer;
