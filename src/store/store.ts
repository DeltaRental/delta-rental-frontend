import { dropdownReducer } from './slices/dropdownSlice';
import { configureStore } from '@reduxjs/toolkit'
import { branchReducer } from './slices/branchSlice'
import { carReducer } from './slices/carListSlice'
import { loadingReducer } from './slices/loadingSlice'
import { brandReducer } from './slices/brandSlice'
import { modelReducer } from './slices/modelSlice'
import { rentalReducer } from './slices/rentalSlice'
import { colorReducer } from './slices/colorSlice'
import { userReducer } from './slices/userSlice'
import { authReducer } from './slices/authSlice'
import {adminPageReducer} from './slices/adminPageSlice'
import { invoiceReducer } from './slices/invoiceSlice';
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
    auth: authReducer,
    dropdown: dropdownReducer,
    adminPage: adminPageReducer,
    invoice : invoiceReducer
    
    
 

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch