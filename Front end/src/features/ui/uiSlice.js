import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  currentTab: 'dashboard', // add a tab state if needed
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { toggleSidebar, setTab } = uiSlice.actions;
export default uiSlice.reducer;
