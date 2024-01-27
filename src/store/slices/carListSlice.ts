import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CarService from "../../services/carService";


export const fetchCars = createAsyncThunk(
	"cars/fetchCars",
	async (args, thunkAPI) => {
		const state: any = thunkAPI.getState();

		if (
			state.car.cars.length > 0 &&
			!(new Date().getTime() - state.car.lastFetch > 60000)
		) {
			return state.car.cars;
		}

		const service: CarService = new CarService();
		const response = await service.getAll();
		return response.data;
	},
);

const carSlice = createSlice({
	name: "car",
	initialState: {
		loading: "initial",
		cars: [] as any[],
		lastFetch: new Date().getTime(),
	},
	reducers: {

  },
	extraReducers: builder => {
		builder.addCase(fetchCars.pending, state => {
			state.loading = "loading";
		});
		builder.addCase(fetchCars.fulfilled, (state, action) => {
			state.loading = "loaded";
			state.cars = action.payload;
		});
		builder.addCase(fetchCars.rejected, state => {
			state.loading = "error";
		});
	},
});

export const carReducer = carSlice.reducer;
export const {} = carSlice.actions;