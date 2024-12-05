import { createAsyncThunk } from "@reduxjs/toolkit";
import { postQualification } from "../apis/QualificationApi";

export const postQualificationThunk = createAsyncThunk(
    'qualification/postQualification',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postQualification(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

