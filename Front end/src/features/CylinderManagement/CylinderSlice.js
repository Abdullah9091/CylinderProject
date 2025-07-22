import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/cylinders';
const REFILL_URL = 'http://localhost:5000/api/refills';
const RETURN_URL = 'http://localhost:5000/api/returns';

// ======== DEPOSIT ========
export const fetchCylinders = createAsyncThunk('cylinders/fetchDeposits', async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

export const addDeposit = createAsyncThunk('cylinders/addDeposit', async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
});

export const updateDeposit = createAsyncThunk('cylinders/updateDeposit', async ({ id, updatedData }) => {
  const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return res.data;
});

export const deleteDeposit = createAsyncThunk('cylinders/deleteDeposit', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

// ======== REFILL ========
export const fetchRefills = createAsyncThunk('cylinders/fetchRefills', async () => {
  const res = await axios.get(REFILL_URL);
  return res.data;
});

export const addRefill = createAsyncThunk('cylinders/addRefill', async (data) => {
  const res = await axios.post(REFILL_URL, data);
  return res.data;
});

export const deleteRefill = createAsyncThunk('cylinders/deleteRefill', async (id) => {
  await axios.delete(`${REFILL_URL}/${id}`);
  return id;
});

// ======== RETURN ========
export const fetchReturns = createAsyncThunk('cylinders/fetchReturns', async () => {
  const res = await axios.get(RETURN_URL);
  return res.data;
});

export const addReturn = createAsyncThunk('cylinders/addReturn', async (data) => {
  const res = await axios.post(RETURN_URL, data);
  return res.data;
});

export const deleteReturn = createAsyncThunk('cylinders/deleteReturn', async (id) => {
  await axios.delete(`${RETURN_URL}/${id}`);
  return id;
});

// ======== SLICE ========
const cylinderSlice = createSlice({
  name: 'cylinders',
  initialState: {
    deposits: [],
    refills: [],
    returns: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ==== Deposits ====
      .addCase(fetchCylinders.fulfilled, (state, action) => {
        state.deposits = action.payload;
      })
      .addCase(addDeposit.fulfilled, (state, action) => {
        state.deposits.push(action.payload);
      })
      .addCase(updateDeposit.fulfilled, (state, action) => {
        const index = state.deposits.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) state.deposits[index] = action.payload;
      })
      .addCase(deleteDeposit.fulfilled, (state, action) => {
        state.deposits = state.deposits.filter((d) => d._id !== action.payload);
      })

      // ==== Refills ====
      .addCase(fetchRefills.fulfilled, (state, action) => {
        state.refills = action.payload;
      })
      .addCase(addRefill.fulfilled, (state, action) => {
        state.refills.push(action.payload);
      })
      .addCase(deleteRefill.fulfilled, (state, action) => {
        state.refills = state.refills.filter((r) => r._id !== action.payload);
      })

      // ==== Returns ====
      .addCase(fetchReturns.fulfilled, (state, action) => {
        state.returns = action.payload;
      })
      .addCase(addReturn.fulfilled, (state, action) => {
        state.returns.push(action.payload);
      })
      .addCase(deleteReturn.fulfilled, (state, action) => {
        state.returns = state.returns.filter((r) => r._id !== action.payload);
      });
  },
});

export default cylinderSlice.reducer;
