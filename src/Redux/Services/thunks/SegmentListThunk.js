import { createAsyncThunk } from "@reduxjs/toolkit";
import { postSegmentList } from "../apis/SegmentListApi";


export const postSegmentListThunk = createAsyncThunk(
    'segmentlist/postSegmentList',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postSegmentList(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

