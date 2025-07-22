import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // totalRevenue: 55600,
  // activeCustomers: 2350,
  productsSold: 3040,
  cylinderServices: 573,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
