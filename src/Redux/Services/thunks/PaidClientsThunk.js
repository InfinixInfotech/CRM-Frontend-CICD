import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPaidClientsApi } from "../apis/PaidClientApi";

export const getAllPaidClientsThunk = createAsyncThunk(
    'paidclients/getAllPaidClients',
    async(param, {rejectWithValue})=>{
        try {
            const response = await getAllPaidClientsApi(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);