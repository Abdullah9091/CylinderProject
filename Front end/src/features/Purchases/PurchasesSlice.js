import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/purchases';


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
  return response.data;
});

export const removePurchase = createAsyncThunk('purchase/removePurchase', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});



const initialState = {
  showForm: false,
  activeTab: 'orders', 
  selectedPurchase: null,
  purchases: [],
  status: 'idle', 
  error: null,
};



const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
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

      .addCase(addPurchase.fulfilled, (state, action) => {
        state.purchases.push(action.payload);
        state.showForm = false;
      })

      .addCase(approvePurchase.fulfilled, (state, action) => {
        const index = state.purchases.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.purchases[index] = action.payload;
        }
      })

      .addCase(removePurchase.fulfilled, (state, action) => {
        state.purchases = state.purchases.filter(p => p.id !== action.payload);
      });
  },
});

export const selectPurchases = (state) => state.purchase.purchases;

export const selectPurchaseTypes = createSelector(
  [selectPurchases],
  (purchases) =>
    [...new Set(purchases.map((p) => p.gasType).filter(Boolean))]
);


export const {
  toggleForm,
  setActiveTab,
  setSelectedPurchase,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
