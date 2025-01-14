import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUser, getByIdUser, postUser, putUser } from "../apis/UserApi";


export const postUserThunk = createAsyncThunk(
    'user/postUser',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postUser(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
   

export const getAllUserThunk = createAsyncThunk(
    'user/getAllUser',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllUser();
            return response;   
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


// Update a lead status
export const putUserThunk = createAsyncThunk(
    'user/putUser',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putUser(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

// Get lead status by ID
export const getByIdUserThunk = createAsyncThunk(
    'user/getByIdUser',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdUser(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);