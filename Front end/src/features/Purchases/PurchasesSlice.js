import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/purchases';

// Thunks
export const fetchPurchases = createAsyncThunk('purchase/fetchPurchases', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addPurchase = createAsyncThunk('purchase/addPurchase', async (newPurchase) => {
  const response = await axios.post(BASE_URL, newPurchase);
  return response.data;
});

export const approvePurchase = createAsyncThunk('purchase/approvePurchase', async (id) => {
  const response = await axios.patch(`${BASE_URL}/${id}/approve`);
  return response.data; // assumes backend returns updated purchase
});

export const removePurchase = createAsyncThunk('purchase/removePurchase', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

// Slice
const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    showForm: false,
    activeTab: 'orders',
    selectedPurchase: null,
    purchases: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleForm: (state) => {
      state.showForm = !state.showForm;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedPurchase: (state, action) => {
      state.selectedPurchase = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPurchases.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.purchases = action.payload;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add
      .addCase(addPurchase.fulfilled, (state, action) => {
        state.purchases.push(action.payload);
        state.showForm = false;
      })

      // Approve
      .addCase(approvePurchase.fulfilled, (state, action) => {
        const index = state.purchases.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.purchases[index] = action.payload;
        }
      })

      // Remove
      .addCase(removePurchase.fulfilled, (state, action) => {
        state.purchases = state.purchases.filter((p) => p.id !== action.payload);
      });
  },
});

// Export actions and reducer
export const {
  toggleForm,
  setActiveTab,
  setSelectedPurchase,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
