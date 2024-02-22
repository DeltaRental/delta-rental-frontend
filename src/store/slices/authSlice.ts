import { RegisterRequest } from './../../models/auth/requests/registerRequest';

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import authService from '../../services/authService';
import { AuthenticateRequest } from '../../models/auth/requests/authenticateRequest';



export const authRegister = createAsyncThunk(
    "auth/register",
    async (register: RegisterRequest, thunkAPI) =>{
        try{
            const addedUser = await authService.register(register);
            return addedUser.data;
        }catch(error){
            console.error("Auth hatası:", error);
            throw error;
        }
    }
);

export const authAuthenticate = createAsyncThunk(
  "auth/authenticate",
  async (authenticate: AuthenticateRequest, thunkAPI) =>{
      try{
          const loggedUser = await authService.authenticate(authenticate);
          return loggedUser;
      }catch(error){
          console.error("Auth hatası:", error);
          throw error;
      }
  }
);
const authSlice = createSlice({
	name: "auth",
	initialState: {
		loading: "initial",
    token: "",
		lastFetch: new Date().getTime(),
	},
	reducers: {},
	extraReducers: builder => {
    builder.addCase(authRegister.pending, state =>{
      state.loading = "loading";
  });
  builder.addCase(authRegister.fulfilled, (state, action)=>{
    state.token = action.payload;
  });
  builder.addCase(authRegister.rejected, state=>{
      state.loading = "error";
  });
  }
		
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;