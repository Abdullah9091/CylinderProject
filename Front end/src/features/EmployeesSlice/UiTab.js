import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    currentTab: 'employees',
  },
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setTab } = uiSlice.actions;
export default uiSlice.reducer;
