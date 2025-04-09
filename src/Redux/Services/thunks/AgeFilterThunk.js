import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAgeFilter, getAllPaiddClientFilter, getAllpaymentFilter, getAllSoFilter } from "../apis/AgeFilterApi";

export const getPaymentFilterThunk = createAsyncThunk(
    'agefilter/getPaymentFilter',
    async(filters, {rejectWithValue})=>{
        try {
            const response = await getAllpaymentFilter(filters);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
export const getSoFilterThunk = createAsyncThunk(
    'agefilter/getAllSoFilter',
    async(filters, {rejectWithValue})=>{
        try {
            const response = await getAllSoFilter(filters);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const getAllAgeFilterThunk = createAsyncThunk (
    'agefilter/getAllAgeFilter',
    async(filters, {rejectWithValue})=>{
        try {
            const response = await getAllAgeFilter(filters);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
export const getAllPaidClientFilterThunk = createAsyncThunk (
    'agefilter/getAllPaiddClientFilter',
    async(filters, {rejectWithValue})=>{
        try {
            const response = await getAllPaiddClientFilter(filters);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);



