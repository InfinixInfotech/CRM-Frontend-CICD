import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAddLead, getAllAddLead, getByIdAddLead, postAddLead, putAddLead } from "../apis/AddLeadsApi";



export const postAddLeadThunk = createAsyncThunk(
    'addlead/postAddLead',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postAddLead(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllAddLeadThunk = createAsyncThunk(
    'addlead/getAllAddLead',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllAddLead();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const deleteAddLeadThunk = createAsyncThunk(
    'addlead/deleteAddLead',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteAddLead(id); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
      }
    }
  );

export const putAddLeadThunk = createAsyncThunk(
    'addlead/putAddLead',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putAddLead(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

export const getByIdAddLeadThunk = createAsyncThunk(
    'addlead/getByIdAddLead',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdAddLead(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
); 