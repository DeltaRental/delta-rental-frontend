import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "../../services/colorService";
import { AddColorRequest } from "../../models/colors/requests/AddColorRequest";
import { UpdateColorRequest } from "../../models/colors/requests/UpdateColorRequest";

export const colorList = createAsyncThunk(
    "colors/colorList",
    async(thunkAPI) => {
        try {
            const response = await colorService.getAll();
        return response.data;
        } catch (error) {
            console.error("Renk listeleme hatası:", error);
            throw error;
        }
    },
);

export const addColor = createAsyncThunk(
    "colors/addcolor",
    async (newColor: AddColorRequest, thunkAPI) =>{
        try{
            const addedColor = await colorService.add(newColor);
            return addedColor.data;
        }catch(error){
            console.error("Renk ekleme hatası:", error);
            throw error;
        }
    }
);

export const updateColor = createAsyncThunk(
    "colors/updateColor",
    async (newColor: UpdateColorRequest, thunkAPI) =>{
        try {
            const updatedColor = await colorService.update(newColor);
            return updatedColor.data;
        } catch (error) {
            console.error("Renk güncelleme hatası:", error);
            throw error;
        }
    }
);

export const deleteColor = createAsyncThunk(
    "colors/deletecolor",
    async ({id}: {id: number;}, thunkAPI) =>{
        try {
            await colorService.delete(id);
            return{
                deletedColorId: id
            };
        } catch (error) {
            console.error("Renk silme hatası:", error);
            throw error;
        }
    }
);

const initialState ={
    colors: [] as any,
    loading: "initial",
}
const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(colorList.pending, state=>{
            state.loading = "loading";
        });
        builder.addCase(colorList.fulfilled, (state, action)=>{
            state.colors = action.payload;    
        });
        builder.addCase(colorList.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(addColor.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(addColor.fulfilled, (state, action)=>{
            state.colors.push(action.payload);
        });
        builder.addCase(addColor.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(updateColor.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(updateColor.fulfilled, (state, action) =>{
            state.colors = [];
        });
        builder.addCase(updateColor.rejected, state =>{
            state.loading = "error";
        });


        builder.addCase(deleteColor.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(deleteColor.fulfilled, (state, action) =>{
            const deletedColor = action.payload.deletedColorId;
            state.colors = state.colors.filter((color: any) => color.id !== deletedColor);
        });
        builder.addCase(deleteColor.rejected, state =>{
            state.loading = "error";
        });
    },
});

export const colorReducer = colorSlice.reducer;
export const {} = colorSlice.actions;