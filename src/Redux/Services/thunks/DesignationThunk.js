import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateDesignation, deleteDesignation, fetchByIdDesignation, GetAllDesignation, UpdateDesignation } from "../apis/DesignationApi";


export const CreateDesignationThunk = createAsyncThunk(
    'designation/CreateDesignation',
    async(param, {rejectWithValue})=>{
        try {
            const response = await CreateDesignation(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const GetAllDesignationThunk = createAsyncThunk(
    'designation/GetAllDesignation',
    async(_, {rejectWithValue})=>{
        try {
            const response = await GetAllDesignation();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const deleteDesignationThunk = createAsyncThunk(
    'designation/deleteDesignation',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteDesignation(id); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
      }
    }
  );

export const UpdateDesignationThunk = createAsyncThunk(
    'designation/UpdateDesignation',
    async(param, {rejectWithValue}) => {
        try {
            const response = await UpdateDesignation(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

export const fetchByIdDesignationThunk = createAsyncThunk(
    'designation/fetchByIdDesignation',
    async(param, {rejectWithValue}) => {
        try {
            const response = await fetchByIdDesignation(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);