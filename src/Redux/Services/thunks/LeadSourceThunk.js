import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteLeadSource, getAllLeadSource, getByIdLeadSource, postLeadSource, putLeadSource } from "../apis/LeadSourceApi";

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
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteLeadSource(id); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
      }
    }
  );

export const putLeadSourceThunk = createAsyncThunk(
    'leadsource/putLeadSource',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putLeadSource(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

export const getByIdLeadSourceThunk = createAsyncThunk(
    'leadsource/getByIdLeadSource',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdLeadSource(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);