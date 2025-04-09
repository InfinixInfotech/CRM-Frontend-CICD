import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getAllAgeFilter } from "../apis/AgeFilterApi";
import { searchStatefilter } from "../apis/StateFilterApi";
export const getsearchStatefilterThunk = createAsyncThunk(
    'searchstatefilter/getAllsearchStatefilter',
    async(params, {rejectWithValue})=>{
        try {
            const response = await searchStatefilter(params);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);