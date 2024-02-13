import { configureStore } from '@reduxjs/toolkit'
import { branchReducer } from './slices/branchSlice'
import { carReducer } from './slices/carListSlice'
import { loadingReducer } from './slices/loadingSlice'
import { brandReducer } from './slices/brandSlice'
import { modelReducer } from './slices/modelSlice'
import { rentalReducer } from './slices/rentalSlice'
import { colorReducer } from './slices/colorSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    car:carReducer,
    branch:branchReducer,
    loading:loadingReducer,
    brand: brandReducer,
    model: modelReducer,
    rental: rentalReducer,
    color: colorReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch