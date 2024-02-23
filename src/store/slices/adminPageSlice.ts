import { createSlice } from '@reduxjs/toolkit';

export const adminPageSlice = createSlice({
  name: 'adminPage',
  initialState: {
    toggle: false,
    active: '',
  },
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setToggle, setActive } = adminPageSlice.actions;

export const adminPageReducer = adminPageSlice.reducer;
