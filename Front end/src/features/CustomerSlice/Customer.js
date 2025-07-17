import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ API Base URL
const API_URL = 'http://localhost:5000/api/customers';

// ✅ Async Thunks
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addCustomer = createAsyncThunk('customers/addCustomer', async (customer) => {
  const res = await axios.post(API_URL, customer);
  return res.data;
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (customer) => {
  const res = await axios.put(`${API_URL}/${customer._id}`, customer);
  return res.data;
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// ✅ Initial State
const initialState = {
  customers: [],
  loading: false,
  error: null,
};

// ✅ Slice
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        const idx = state.customers.findIndex(c => c._id === action.payload._id);
        if (idx !== -1) state.customers[idx] = action.payload;
      })

      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(c => c._id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
