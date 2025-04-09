import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEmpCodeName, getAllleadInfo, getExtensionEmp, getPersnolDetailsApi, getTodayFollowUpDataApi, getUserByIdApi, postCallingEmp, searchUserApi } from "../apis/AdditionalApi";

export const getAllEmpCodeNameThunk = createAsyncThunk(
    'additional/getAllEmpCodeName',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllEmpCodeName();
            // console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
export const getAllleadInfoThunk = createAsyncThunk(
    'additional/getAllleadInfo',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllleadInfo();
            // console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getExtensionEmpThunk = createAsyncThunk(
    'additional/getExtensionEmp',
    async(empCode, {rejectWithValue})=>{
        try {
            const response = await getExtensionEmp(empCode);
            // console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);



export const postCallingEmpThunk = createAsyncThunk(
    'additional/postCallingEmp',
    async(params, {rejectWithValue})=>{
        try {
            const response = await postCallingEmp(params);
            // console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
// persnolDetailsApi empCode

export const persnolDetailsThunk = createAsyncThunk(
    'additional/getPersnolDetails',
    async(empCode, {rejectWithValue})=>{
        try {
            const response = await getPersnolDetailsApi(empCode);
            console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
export const todayFollowUpDataThunk = createAsyncThunk(
    'additional/getTodayFollowUpData',
    async(empCode, {rejectWithValue})=>{
        try {
            const response = await getTodayFollowUpDataApi(empCode);
            console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const searchUserThunk = createAsyncThunk(
    'additional/searchUser',
    async(params, {rejectWithValue})=>{
        try {
            const response = await searchUserApi(params);
            // console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getUserByIdThunk = createAsyncThunk(
    'additional/getUserById',
    async(id, {rejectWithValue})=>{
        try {
            const response = await getUserByIdApi(id);
            console.log("Data-------------------"+response)
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);