import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { UpdateUserRequest } from "../../models/users/requests/updateUserRequest";

export const userList = createAsyncThunk("users/userList", async (thunkAPI) => {
  try {
    const response = await userService.getAll();
    return response.data;
  } catch (error) {
    console.error("User listeleme hatası:", error);
    throw error;
  }
});

export const userInfo = createAsyncThunk(
  "users/userInfo",
  async (email: string, thunkAPI) => {
    try {
      const response = await userService.getUserInfo(email);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("User info hatası:", error);
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (newUser: UpdateUserRequest, thunkAPI) => {
    try {
      const updatedUser = await userService.update(newUser);
      return updatedUser.data;
    } catch (error) {
      console.error("User güncelleme hatası:", error);
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      await userService.delete(id);
      return {
        deletedUserId: id,
      };
    } catch (error) {
      console.error("User silme hatası:", error);
      throw error;
    }
  }
);

const initialState = {
  users: [] as any,
  isloggedIn: false,
  loading: "initial",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isloggedIn = action.payload
  },
  },
  extraReducers: (builder) => {
    builder.addCase(userList.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(userList.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.users = action.payload;
    });
    builder.addCase(userList.rejected, (state) => {
      state.loading = "error";
    });

    builder.addCase(userInfo.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.users = action.payload;
    });
    builder.addCase(userInfo.rejected, (state) => {
      state.loading = "error";
    });


    builder.addCase(updateUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.users = [];
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = "error";
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = "loaded";
      const deletedUser = action.payload.deletedUserId;
      state.users = state.users.filter((user: any) => user.id !== deletedUser);
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = "error";
    });
  },
});

export const userReducer = userSlice.reducer;
export const {setIsLoggedIn} = userSlice.actions;
