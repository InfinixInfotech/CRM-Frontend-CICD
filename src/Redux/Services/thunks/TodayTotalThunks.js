import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodayTotal } from "../apis/TodayTotalApi";


export const getAllTodayTotalThunk = createAsyncThunk(
    'todayTotal/getTodayTotal',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getTodayTotal();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);