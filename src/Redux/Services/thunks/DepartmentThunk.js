import { createAsyncThunk } from "@reduxjs/toolkit";
import { postDepartment } from "../apis/DepartmentApi";

export const postDepartmentThunk = createAsyncThunk(
    'department/postDepartment',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postDepartment(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
   

