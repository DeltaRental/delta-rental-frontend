import { string } from 'yup';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import carService from "../../services/carService";
import { CarFilterRequest } from "../../models/cars/requests/CarFilterRequest";
import { fileURLToPath } from "url";


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

		const response = await carService.getAll();
		return response.data;
	},
);

export const getFilteredCars = createAsyncThunk(
	"cars/filterCars",
	async (carFilterDto:CarFilterRequest, thunkAPI) =>{
		try{
				const filteredCars = await carService.getFilteredCars(carFilterDto.endDate,carFilterDto.startDate,carFilterDto.startLocation);
				console.log("filteredCar",filteredCars);
				return filteredCars.data;
		}catch(error){
				console.error("Filtreleme hatası:", error);
				throw error;
		}
}
);


const carSlice = createSlice({
	name: "car",
	initialState: {
		loading: "initial",
		cars: [] as any[],
		filteredCars: [] as any[],
		selectedCar: [] as any,
		lastFetch: new Date().getTime(),
	},
	reducers: {
		setSelectedCar(state, action) {
      state.selectedCar = action.payload
    }
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

		builder.addCase(getFilteredCars.pending, state => {
			state.loading = "loading";
		});
		builder.addCase(getFilteredCars.fulfilled, (state, action) => {
			state.loading = "loaded";
			state.filteredCars = action.payload;
		});
		builder.addCase(getFilteredCars.rejected, state => {
			state.loading = "error";
		});
	},
});

export const carReducer = carSlice.reducer;
export const {setSelectedCar } = carSlice.actions;