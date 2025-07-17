import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  deposits: [],
  refills: [],
  returns: [],
};

const cylinderSlice = createSlice({
  name: 'cylinders',
  initialState,
  reducers: {
    addDeposit: (state, action) => {
      state.deposits.push({ id: uuidv4(), ...action.payload });
    },
    addRefill: (state, action) => {
      state.refills.push({ id: uuidv4(), ...action.payload });
    },
    addReturn: (state, action) => {
      state.returns.push({ id: uuidv4(), ...action.payload });
    },
  },
});

export const { addDeposit, addRefill, addReturn } = cylinderSlice.actions;
export default cylinderSlice.reducer;
