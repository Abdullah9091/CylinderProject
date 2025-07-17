import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { name: 'Cooking Gas Cylinder', sellingPrice: 57.75 },
    { name: 'Industrial Gas Tank', sellingPrice: 75.00 }
  ]
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export default productsSlice.reducer;
