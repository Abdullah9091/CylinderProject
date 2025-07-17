import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    addEmployee: (state, action) => {
      state.push({ ...action.payload, status: 'active', stock: 0 });
    },
    updateEmployee: (state, action) => {
      const index = state.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) state[index] = { ...state[index], ...action.payload };
    },
    toggleStatus: (state, action) => {
      const emp = state.find(emp => emp.id === action.payload);
      if (emp) emp.status = emp.status === 'active' ? 'deactivated' : 'active';
    },
    deleteEmployee: (state, action) => {
      return state.filter(emp => emp.id !== action.payload);
    }
  }
});

export const { addEmployee, updateEmployee, toggleStatus, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
