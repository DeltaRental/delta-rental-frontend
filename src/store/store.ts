import { configureStore } from '@reduxjs/toolkit'
import availableCarListReducer from './slices/availableCarListSlice'
import { branchReducer } from './slices/branchSlice'

export const store = configureStore({
  reducer: {
    availableCarList:availableCarListReducer,
    branch:branchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch