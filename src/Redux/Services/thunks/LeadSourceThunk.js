import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteLeadSource, getAllLeadSource, postLeadSource, putLeadSource } from "../apis/LeadSourceApi";

export const postLeadSourceThunk = createAsyncThunk(
    'leadsource/postLeadSource',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postLeadSource(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const getAllLeadSourceThunk = createAsyncThunk(
    'leadsource/getAllLeadSource',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllLeadSource();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const deleteLeadSourceThunk = createAsyncThunk(
    'leadsource/deleteLeadSource',
    async(param, {rejectWithValue})=>{
        try {
            const response = await deleteLeadSource(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const putLeadSourceThunk = createAsyncThunk(
    'leadsource/putLeadSource',
    async(param, {rejectWithValue})=>{
        try {
            const response = await putLeadSource(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const getByIdLeadSourceThunk = createAsyncThunk(
    'leadsource/getByIdLeadSource',
    async(param, {rejectWithValue})=>{
        try {
            const response = await getByIdLeadSource(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);