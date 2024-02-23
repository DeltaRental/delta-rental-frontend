import { createSlice } from '@reduxjs/toolkit';

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    isOpen: false,
    selectedOption: '',
  },
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectOption: (state, action) => {
      state.selectedOption = action.payload;
      state.isOpen = false;
    },
  },
});

export const { toggleDropdown, selectOption } = dropdownSlice.actions;

export const dropdownReducer = dropdownSlice.reducer;
