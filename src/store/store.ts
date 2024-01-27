import { configureStore } from '@reduxjs/toolkit'
import { branchReducer } from './slices/branchSlice'
import { carReducer } from './slices/carListSlice'

export const store = configureStore({
  reducer: {
    car:carReducer,
    branch:branchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch