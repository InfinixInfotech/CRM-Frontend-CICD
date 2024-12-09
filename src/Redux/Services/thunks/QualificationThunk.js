import { createAsyncThunk } from "@reduxjs/toolkit";
import { postQualification, getAllQualification, deleteQualification , putQualification, getByIdQualification } from "../apis/QualificationApi";

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


export const getAllQualificationThunk = createAsyncThunk(
    'qualification/getAllQualification',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllQualification();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const deleteQualificationThunk = createAsyncThunk(
    'qualification/deleteQualification',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteQualification(id); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
      }
    }
  );

export const putQualificationThunk = createAsyncThunk(
    'qualification/putQualification',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putQualification(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

export const getByIdQualificationThunk = createAsyncThunk(
    'qualification/getByIdQualification',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdQualification(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);
