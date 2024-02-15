import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import modelService from "../../services/modelService";
import { AddModelRequest } from "../../models/carModels/requests/addModelRequest";
import { UpdateModelRequest } from "../../models/carModels/requests/updateModelRequest";

export const modelList = createAsyncThunk(
    "models/modelList",
    async(thunkAPI) =>{
        try {
            const response = await modelService.getAll();
            return response.data;
        } catch (error) {
            console.error("Model listeleme hatası:", error);
            throw error;
        }
    },
);

// export const getByIdmodel = createAsyncThunk(
//     "models/getByIdModel",
//     async({brandId}: {brandId: number;})=>{
//         try {
//             const response = await modelService.getByBrandId(brandId);
//             return response.data;
//         } catch (error) {
//             console.error("BrandId ekleme hatası:", error);
//             throw error;
//         }
//     }
// )
export const addModel = createAsyncThunk(
    "models/addModel",
    async (newModel: AddModelRequest, thunkAPI) =>{
        try {
            const addedModel = await modelService.add(newModel);
            console.log("asdasdas4dasd")
            return addedModel.data;
        } catch (error) {
            console.error("Model ekleme hatası:", error);
            throw error;
        }
    },
);

export const updateModel = createAsyncThunk(
    "models/updateModel",
    async (newModel: UpdateModelRequest, thunkAPI)=>{
        try {
            const updatedModel = await modelService.update(newModel);
            return updatedModel.data;
        } catch (error) {
            console.error("Model güncelleme hatası:", error);
            throw error;
        }
    },
);


export const deleteModel = createAsyncThunk(
    "models/deleteModel",
    async ({id}: {id:number}, thunkAPI)=>{
        try {
            await modelService.delete(id);
            return{
                deletedModelId: id
            };
        } catch (error) {
            console.error("Model silme hatası:", error);
            throw error;
        }
    }
);

const initialState = {
    models: [] as any,
    loading: "initial",
}

const modelSlice = createSlice({
    name: "models",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(modelList.pending, state=>{
            state.loading = "loading";
        });
        builder.addCase(modelList.fulfilled, (state, action)=>{
            state.models = action.payload;
        });
        builder.addCase(modelList.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(addModel.pending, state=>{
            state.loading = "loading";
        });
        builder.addCase(addModel.fulfilled, (state, action)=>{
            state.models.push(action.payload);
        });
        builder.addCase(addModel.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(updateModel.pending, state=>{
            state.loading = "loading";
        });
        builder.addCase(updateModel.fulfilled, (state, action)=>{
            state.models = [];
        });
        builder.addCase(updateModel.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(deleteModel.pending, state=>{
            state.loading = "loading";
        });
        builder.addCase(deleteModel.fulfilled, (state, action)=>{
            const deletedModel = action.payload.deletedModelId;
            state.models = state.models.filter((model: any)=> model.id !== deletedModel);
        });
        builder.addCase(deleteModel.rejected, state=>{
            state.loading = "error";
        });


        // builder.addCase(getByIdmodel.pending, state=>{
        //     state.loading = "loading";
        // });
        // builder.addCase(getByIdmodel.fulfilled, (state, action)=>{
        //     state.models = action.payload;
        // });
        // builder.addCase(getByIdmodel.rejected, state=>{
        //     state.loading = "error";
        // });
    },
});

export const modelReducer = modelSlice.reducer;
export const {} = modelSlice.actions;