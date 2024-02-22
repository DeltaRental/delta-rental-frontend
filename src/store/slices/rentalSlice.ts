import rentalService from "../../services/rentalService";
import { AddRentalRequest } from "../../models/rentals/requests/AddRentalRequest";
import { UpdateRentalRequest } from "../../models/rentals/requests/UpdateRentalRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const rentalList = createAsyncThunk(
  "rentals/rentalList",
  async (thunkAPI) => {
    try {
      const response = await rentalService.getAll();
      return response.data;
    } catch (error) {
      console.error("Kiralama listeleme hatası:", error);
      throw error;
    }
  }
);

export const getRentalByUser = createAsyncThunk(
  "rentals/getRentalByUser",
  async ({id}: {id: number;},thunkAPI) => {
    try {
      const response = await rentalService.getRentalByUser(id);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error("Kiralama listeleme hatası:", error);
      throw error;
    }
  }
);

export const addRental = createAsyncThunk(
  "rentals/addRental",
  async (newRental: AddRentalRequest, thunkAPI) => {
    try {
      const addedRental = await rentalService.add(newRental);
      return addedRental.data;
    } catch (error) {
      console.error("Kiralama ekleme hatası:", error);
      throw error;
    }
  }
);

export const updateRental = createAsyncThunk(
  "rentals/updateRental",
  async (newRental: UpdateRentalRequest, thunkAPI) => {
    try {
      const updatedRental = await rentalService.update(newRental);
      return updatedRental.data;
    } catch (error) {
      console.error("Kiralama güncelleme hatası:", error);
      throw error;
    }
  }
);

export const deleteRental = createAsyncThunk(
  "rentals/deleteRental",
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      await rentalService.delete(id);
      return {
        deletedRentalId: id,
      };
    } catch (error) {
      console.error("Kiralama silme hatası:", error);
      throw error;
    }
  }
);

const initialState = {
  rentals: [] as any,
  loading: "initial",
  selectedStartDate: "",
  selectedEndDate: "",
};
const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    setStartDate(state, action) {
      state.selectedStartDate = action.payload;
    },
    setEndDate(state, action) {
      state.selectedEndDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(rentalList.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(rentalList.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.rentals = action.payload;
    });
    builder.addCase(rentalList.rejected, (state) => {
      state.loading = "error";
    });

    builder.addCase(addRental.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(addRental.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.rentals.push(action.payload);
    });
    builder.addCase(addRental.rejected, (state) => {
      state.loading = "error";
    });

    builder.addCase(updateRental.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(updateRental.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.rentals = [];
    });
    builder.addCase(updateRental.rejected, (state) => {
      state.loading = "error";
    });

    builder.addCase(deleteRental.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(deleteRental.fulfilled, (state, action) => {
      state.loading = "loaded";
      const deletedRental = action.payload.deletedRentalId;
      state.rentals = state.rentals.filter(
        (rental: any) => rental.id !== deletedRental
      );
    });
    builder.addCase(deleteRental.rejected, (state) => {
      state.loading = "error";
    });
  },
});

export const rentalReducer = rentalSlice.reducer;
export const { setStartDate, setEndDate } = rentalSlice.actions;
