import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalRevenue: 4506.5,
  gasSold: 55,
  cylinderRefills: 29,
  customersServed: 45,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalytics: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
