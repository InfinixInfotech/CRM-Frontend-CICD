import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLeadStatus, postLeadStatus } from "../apis/LeadStatusApi";

export const postLeadStatusThunk = createAsyncThunk(
    'leadstatus/postLeadStatus',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postLeadStatus(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllLeadStatusThunk = createAsyncThunk(
    'leadstatus/getAllLeadStatus',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllLeadStatus();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);