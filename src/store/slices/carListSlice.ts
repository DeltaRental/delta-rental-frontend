import { string } from 'yup';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import carService from "../../services/carService";
import { CarFilterRequest } from "../../models/cars/requests/CarFilterRequest";
import { fileURLToPath } from "url";
import { AddCarRequest } from "../../models/cars/requests/addCarRequest";
import { UpdateBrandRequest } from "../../models/brands/requests/updateBrandRequest";
import { UpdateCarRequest } from "../../models/cars/requests/updateCarRequest";



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
export const carList = createAsyncThunk(
	"cars/carList",
	async(thunkAPI)=>{
		try {
			const response = await carService.getAll();

			return response.data;
		} catch (error) {
			console.error("Araba listeleme hatası:", error);
		}
	}
);

export const addCar = createAsyncThunk(
	"cars/addCar",
	async(newCar: AddCarRequest)=>{
		try {
			const addedCar = await carService.add(newCar);
			console.log(addedCar.data);
			
			return addedCar.data;
		} catch (error) {
			console.error("Araba ekleme hatası:", error);
			throw error;
		}
	}
);

export const updateCar = createAsyncThunk(
    "cars/updateCar",
    async (newCar: UpdateCarRequest) =>{
        try {
            const updatedCar = await carService.update(newCar);
            return updatedCar.data;
        } catch (error) {
            console.error("Araba güncelleme hatası:", error);
            throw error;
        }
    }
);


export const deleteCar = createAsyncThunk(
    "cars/deleteCar",
    async ({id}: {id: number;}) =>{
        try {
            await carService.delete(id);
            return{
                deletedCarId: id
            };
        } catch (error) {
            console.error("Araba silme hatası:", error);
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
		carList: [] as any,
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


		
		builder.addCase(carList.pending, state=>{
			state.loading = "loading";
		});
		builder.addCase(carList.fulfilled, (state, action)=>{
			state.carList = action.payload;
		});
		builder.addCase(carList.rejected, state=>{
			state.loading = "error";
		});

		builder.addCase(addCar.pending, state=>{
			state.loading = "loading";
		});
		builder.addCase(addCar.fulfilled, (state, action)=>{
			state.cars.push(action.payload);
		});
		builder.addCase(addCar.rejected, state=>{
			state.loading = "error";
		});


		builder.addCase(updateCar.pending, state=>{
			state.loading = "loading";
		});
		builder.addCase(updateCar.fulfilled, (state, action)=>{
			state.cars = [];
		});
		builder.addCase(updateCar.rejected, state=>{
			state.loading = "error";
		});


		builder.addCase(deleteCar.pending, state=>{
			state.loading = "loading";
		});
		builder.addCase(deleteCar.fulfilled, (state, action)=>{
			const deletedCar = action.payload.deletedCarId;
			state.cars.filter((car: any)=> car.id !== deletedCar);
		});
		builder.addCase(deleteCar.rejected, state=>{

			state.loading = "error";
		});
	},
});

export const carReducer = carSlice.reducer;
export const {setSelectedCar } = carSlice.actions;