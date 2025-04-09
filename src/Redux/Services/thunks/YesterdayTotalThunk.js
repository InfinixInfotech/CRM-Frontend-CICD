import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getTodayTotal } from "../apis/TodayTotalApi";
import { getYerterdayTotal } from "../apis/YesterdayTotalApi";


export const getAllYesterdayTotalThunk = createAsyncThunk(
    'yesterdayTotal/getYesterdayTotal',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getYerterdayTotal();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);