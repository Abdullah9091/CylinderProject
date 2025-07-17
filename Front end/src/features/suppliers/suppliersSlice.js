import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchSuppliers',
  async () => {
    const response = await axios.get('http://localhost:5000/api/suppliers');
    return response.data;
  }
);

export const addSupplier = createAsyncThunk(
  'suppliers/addSupplier',
  async (newSupplier) => {
    const response = await axios.post('http://localhost:5000/api/suppliers', newSupplier);
    return response.data;
  }
);

export const updateSupplier = createAsyncThunk(
  'suppliers/updateSupplier',
  async (updatedSupplier) => {
    const response = await axios.put(`http://localhost:5000/api/suppliers/${updatedSupplier.id}`, updatedSupplier);
    return response.data;
  }
);

export const deleteSupplier = createAsyncThunk(
  'suppliers/deleteSupplier',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
    return id;
  }
);

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        const index = state.list.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s.id !== action.payload);
      });
  }
});

export default suppliersSlice.reducer;
