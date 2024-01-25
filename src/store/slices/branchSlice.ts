import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BranchService from "../../services/branchService";


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

		const service: BranchService = new BranchService();
		const response = await service.getAll();
		return response.data;
	},
);

const branchSlice = createSlice({
	name: "branch",
	initialState: {
		loading: "initial",
		branches: [] as any[],
		lastFetch: new Date().getTime(),
	},
	reducers: {
    setBranches(state, action) {
      state.branches = action.payload
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
	},
});

export const branchReducer = branchSlice.reducer;
export const {setBranches} = branchSlice.actions;