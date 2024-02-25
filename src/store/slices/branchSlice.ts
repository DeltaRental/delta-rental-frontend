import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import branchService from "../../services/branchService";
import { AddBranchRequest } from "../../models/branches/requests/addBranchRequest";


export const fetchBranches = createAsyncThunk(
	"branches/fetchBranches",
	async (args, thunkAPI) => {
		const state: any = thunkAPI.getState();

		if (
			state.branch.branches.length > 0 &&
			!(new Date().getTime() - state.branch.lastFetch > 60000)
		) {
			return state.branch.branches;
		}

		const response = await branchService.getAll();
		return response.data;
	},
);
export const addBranch = createAsyncThunk(
    "branches/addBranch",
    async (newBranch: AddBranchRequest, thunkAPI) =>{
        try{
            const addedBranch = await branchService.add(newBranch);
            return addedBranch.data;
        }catch(error){
            console.error("Şube ekleme hatası:", error);
            throw error;
        }
    }
);

export const deleteBranch = createAsyncThunk(
    "branches/deleteBranch",
    async ({id}: {id: number;}, thunkAPI) =>{
        try {
            await branchService.delete(id);
            return{
                deletedBranchId: id
            };
        } catch (error) {
            console.error("Ofis silme hatası:", error);
            throw error;
        }
    }
);
const branchSlice = createSlice({
	name: "branch",
	initialState: {
		loading: "initial",
		branches: [] as any[],
		selectedBranch: [] as any[],
		lastFetch: new Date().getTime(),
	},
	reducers: {
    setBranches(state, action) {
      state.selectedBranch = action.payload
    }
  },
	extraReducers: builder => {
		builder.addCase(fetchBranches.pending, state => {
			state.loading = "loading";
		});
		builder.addCase(fetchBranches.fulfilled, (state, action) => {
			state.loading = "loaded";
			state.branches = action.payload;
		});
		builder.addCase(fetchBranches.rejected, state => {
			state.loading = "error";
		});


		builder.addCase(addBranch.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(addBranch.fulfilled, (state, action)=>{
            state.branches.push(action.payload);
        });
        builder.addCase(addBranch.rejected, state=>{
            state.loading = "error";
        });


		builder.addCase(deleteBranch.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(deleteBranch.fulfilled, (state, action) =>{
            const deletedBranch = action.payload.deletedBranchId;
            state.branches = state.branches.filter((branch: any) => branch.id !== deletedBranch);
        });
        builder.addCase(deleteBranch.rejected, state =>{
            state.loading = "error";
        });
	},
});

export const branchReducer = branchSlice.reducer;
export const {setBranches} = branchSlice.actions;