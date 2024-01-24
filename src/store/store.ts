import { configureStore } from '@reduxjs/toolkit'
import availableCarListReducer from './slices/availableCarListSlice'

export const store = configureStore({
  reducer: {
    availableCarList:availableCarListReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch