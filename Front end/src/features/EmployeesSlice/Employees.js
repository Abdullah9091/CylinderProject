import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

// Add new employee
export const addEmployeeToBackend = createAsyncThunk(
  'employees/addEmployeeToBackend',
  async (employeeData, thunkAPI) => {
    try {
      const res = await axios.post(API_URL, employeeData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Add failed');
    }
  }
);

// Get all employees
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
    }
  }
);

// Delete employee
export const deleteEmployeeFromBackend = createAsyncThunk(
  'employees/deleteEmployeeFromBackend',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Delete failed');
    }
  }
);

// Update employee
export const updateEmployeeInBackend = createAsyncThunk(
  'employees/updateEmployeeInBackend',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    toggleStatus: (state, action) => {
      const emp = state.list.find(emp => emp._id === action.payload);
      if (emp) emp.status = emp.status === 'active' ? 'deactivated' : 'active';
    }
  },
  extraReducers: builder => {
    builder
      // Add employee
      .addCase(addEmployeeToBackend.pending, state => {
        state.status = 'loading';
      })
      .addCase(addEmployeeToBackend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(addEmployeeToBackend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch employees
      .addCase(fetchEmployees.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete employee
      .addCase(deleteEmployeeFromBackend.fulfilled, (state, action) => {
        state.list = state.list.filter(emp => emp._id !== action.payload);
      })
      .addCase(deleteEmployeeFromBackend.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update employee
      .addCase(updateEmployeeInBackend.fulfilled, (state, action) => {
        const index = state.list.findIndex(emp => emp._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateEmployeeInBackend.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { toggleStatus } = employeeSlice.actions;

export const selectEmployees = (state) => state.employees.list;

export default employeeSlice.reducer;
