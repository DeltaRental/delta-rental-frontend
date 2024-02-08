// import { GetAllBrandResponse } from './../../model/brands/response/getAllBrandResponse';
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import brandService from '../../services/brandService';
// import { AddBrandRequest } from '../../model/brands/request/addBrandRequest';
// import { UpdateBrandRequest } from '../../model/brands/request/updateBrandRequest';
// import { UpdateBrandResponse } from '../../model/brands/response/updateBrandResponse';

// export const fetchBrands = createAsyncThunk(
//     "brands/fetchBrands",
//     async (args, thunkAPI) =>{
        
//         try {
//             const allBrands = await brandService.getAll();
//             return allBrands.data.brands;
//         } catch (error) {
//             console.error("Error fetching brands:", error);
//             throw error;
//         }
//     }
// );

// export const addBrand = createAsyncThunk(
//     "brands/addBrand",
//     async(newBrand: AddBrandRequest, thunkAPI) =>{
//         try {
//             const addBrand = await brandService.add(newBrand);
//             console.log(addBrand);

//             return addBrand.data;
            
//         } catch (error) {
//             console.error("Error adding brand:", error);
//         }
//     }
// );

// export const updateBrand = createAsyncThunk(
//     "brands/updateBrand",
//     async(newBrand: UpdateBrandRequest, thunkAPI) =>{
//         try {
//             const updateBrand = await brandService.update(newBrand);
//             console.log(updateBrand);
            
//             return updateBrand.data;
//         } catch (error) {
//             console.error("Error updating brand:", error);
//         }
//     }
// );

// export const deleteBrand = createAsyncThunk(
//     "brands/deleteBrand",
//     async(brandId: number, thunkAPI)=>{
//         try {
//             await brandService.delete(brandId);
//             return brandId;
//         } catch (error) {
//             console.error("Brand deletion failed:", error);
//         }
//     }
// );

// const brandSlice = createSlice({
//     name: "brand",
//     initialState: {brands: [] as any[], error:null},
//     reducers: {},
//     extraReducers: (builder) =>{
//         builder.addCase(fetchBrands.pending, (state) =>{});
//         builder.addCase(fetchBrands.fulfilled, (state, action) =>{
//             state.brands = action.payload;
//         });
//         builder.addCase(fetchBrands.rejected, (state) =>{});


//         builder.addCase(addBrand.pending, (state) =>{});
//         builder.addCase(addBrand.fulfilled, (state, action) =>{
//             state.brands.push(action.payload);
//         });
//         builder.addCase(addBrand.rejected, (state) =>{});


//         builder.addCase(updateBrand.pending, (state) =>{});
//         builder.addCase(updateBrand.fulfilled, (state, action) =>{
//             state.brands = [];
//         });
//         builder.addCase(updateBrand.rejected, (state)=>{});


//         builder.addCase(deleteBrand.pending, (state)=>{});
//     },
// });

// export const brandReducer = brandSlice.reducer;
// export const {} = brandSlice.actions;