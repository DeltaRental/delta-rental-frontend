import { createSlice } from "@reduxjs/toolkit";

export interface CarList {

}

const initialState = {
  
}

export const availableCarListSlice = createSlice({
  name: 'availableCarList',
  initialState,
  reducers: {
    addToCart: () => {}
    
  },
})

export const { addToCart } = availableCarListSlice.actions
export default availableCarListSlice.reducer