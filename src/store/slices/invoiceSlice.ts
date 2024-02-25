import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import invoiceService from "../../services/invoiceService";
import { addInvoiceRequest } from "../../models/invoices/requests/addInvoiceRequest";
import { updateInvoiceRequest } from "../../models/invoices/requests/updateInvoiceRequest";


export const invoiceList = createAsyncThunk(
    "invoices/invoiceList",
    async(thunkAPI) => {
        try {
            const response = await invoiceService.getAll();
        return response.data;
        } catch (error) {
            console.error("Fatura listeleme hatası:", error);
            throw error;
        }
    },
);

export const addInvoice = createAsyncThunk(
    "invoices/addinvoice",
    async (newInvoice: addInvoiceRequest, thunkAPI) =>{
        try{
            const addedInvoice = await invoiceService.add(newInvoice);
            return addedInvoice.data;
        }catch(error){
            console.error("Fatura ekleme hatası:", error);
            throw error;
        }
    }
);

export const updateInvoice = createAsyncThunk(
    "invoices/updateInvoice",
    async (newInvoice: updateInvoiceRequest, thunkAPI) =>{
        try {
            const updatedInvoice = await invoiceService.update(newInvoice);
            return updatedInvoice.data;
        } catch (error) {
            console.error("Fatura güncelleme hatası:", error);
            throw error;
        }
    }
);

export const deleteInvoice = createAsyncThunk(
    "invoices/deleteinvoice",
    async ({id}: {id: number;}, thunkAPI) =>{
        try {
            await invoiceService.delete(id);
            return{
                deletedInvoiceId: id
            };
        } catch (error) {
            console.error("Fatura silme hatası:", error);
            throw error;
        }
    }
);

const initialState ={
    invoices: [] as any,
    loading: "initial",
}
const invoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(invoiceList.pending, state=>{
            state.loading = "loading";
        });
        builder.addCase(invoiceList.fulfilled, (state, action)=>{
            state.invoices = action.payload;    
        });
        builder.addCase(invoiceList.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(addInvoice.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(addInvoice.fulfilled, (state, action)=>{
            state.invoices.push(action.payload);
        });
        builder.addCase(addInvoice.rejected, state=>{
            state.loading = "error";
        });


        builder.addCase(updateInvoice.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(updateInvoice.fulfilled, (state, action) =>{
            state.invoices = [];
        });
        builder.addCase(updateInvoice.rejected, state =>{
            state.loading = "error";
        });


        builder.addCase(deleteInvoice.pending, state =>{
            state.loading = "loading";
        });
        builder.addCase(deleteInvoice.fulfilled, (state, action) =>{
            const deletedInvoice = action.payload.deletedInvoiceId;
            state.invoices = state.invoices.filter((invoice: any) => invoice.id !== deletedInvoice);
        });
        builder.addCase(deleteInvoice.rejected, state =>{
            state.loading = "error";
        });
    },
});

export const invoiceReducer = invoiceSlice.reducer;
export const {} = invoiceSlice.actions;