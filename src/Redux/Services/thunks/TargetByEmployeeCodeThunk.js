
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TargetByEmployeeCodeApi } from "../apis/TargetByEmployeeCodeApi";


export const getTargetByEmployeeCodeThunk = createAsyncThunk(
    'targetEmployeeCode/targetByEmployeeCode',
    async(_, {rejectWithValue})=>{
        try {
            const response = await TargetByEmployeeCodeApi();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);