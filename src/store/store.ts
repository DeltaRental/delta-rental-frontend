import { configureStore } from '@reduxjs/toolkit'
import { branchReducer } from './slices/branchSlice'
import { carReducer } from './slices/carListSlice'
import { loadingReducer } from './slices/loadingSlice'

export const store = configureStore({
  reducer: {
    car:carReducer,
    branch:branchReducer,
    loading:loadingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch