import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "../../services/brandService";
import { AddBrandRequest } from "../../models/brands/requests/addBrandRequest";
import { UpdateBrandRequest } from "../../models/brands/requests/updateBrandRequest";

export const brandList = createAsyncThunk(
    "brands/brandList",
    async(thunkAPI) => {
        try {
            const response = await brandService.getAll();
        return response.data;
        } catch (error) {
            console.error("Marka listeleme hatası:", error);
            throw error;
        }
    },
);

export const addBrand = createAsyncThunk(
    "brands/addBrand",
    async (newBrand: AddBrandRequest, thunkAPI) =>{
        try{
            const addedBrand = await brandService.add(newBrand);
            return addedBrand.data;
        }catch(error){
            console.error("Marka ekleme hatası:", error);
            throw error;
        }
    }
);

export const updateBrand = createAsyncThunk(
    "brands/updateBrand",
    async (newBrand: UpdateBrandRequest, thunkAPI) =>{
        try {
            const updatedBrand = await brandService.update(newBrand);
            return updatedBrand.data;
        } catch (error) {
            console.error("Marka güncelleme hatası:", error);
            throw error;
        }
    }
);

export const deleteBrand = createAsyncThunk(
    "brands/deleteBrand",
    async ({id}: {id: number;}, thunkAPI) =>{
        try {
            await brandService.delete(id);
            return{
                deletedBrandId: id
            };
        } catch (error) {
            console.error("Marka silme hatası:", error);
            throw error;
        }
    }
);

const initialState ={
    brands: [] as any,
    loading: "initial",
}
const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(brandList.pending, state=>{
            state.loading = "loading";
        });
        builder.addCase(brandList.fulfilled, (state, action)=>{
            state.brands = action.payload;    
        });
        builder.addCase(brandList.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(addBrand.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(addBrand.fulfilled, (state, action)=>{
            state.brands.push(action.payload);
        });
        builder.addCase(addBrand.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(updateBrand.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(updateBrand.fulfilled, (state, action) =>{
            state.brands = [];
        });
        builder.addCase(updateBrand.rejected, state =>{
            state.loading = "error";
        });


        builder.addCase(deleteBrand.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(deleteBrand.fulfilled, (state, action) =>{
            const deletedBrand = action.payload.deletedBrandId;
            state.brands = state.brands.filter((brand: any) => brand.id !== deletedBrand);
        });
        builder.addCase(deleteBrand.rejected, state =>{
            state.loading = "error";
        });
    },
});

export const brandReducer = brandSlice.reducer;
export const {} = brandSlice.actions;