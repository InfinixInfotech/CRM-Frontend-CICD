import { createAsyncThunk } from "@reduxjs/toolkit";
import { postSegmentPlan } from "../apis/SegmentPlanApi";

export const postSegmentPlanThunk = createAsyncThunk(
    'segmentplan/postSegmentPlan',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postSegmentPlan(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

