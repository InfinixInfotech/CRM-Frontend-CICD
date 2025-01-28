import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGrandTotal } from "../apis/GrandTotalApi ";


export const getAllTotalGrandTotalThunk = createAsyncThunk(
    'grandTotal/getGrandTotal',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getGrandTotal();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);