import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteLeadStatus, getAllLeadStatus, getByIdLeadStatus, postLeadStatus, putLeadStatus } from "../apis/LeadStatusApi";

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

// Delete a lead status
export const deleteLeadStatusThunk = createAsyncThunk(
    'leadstatus/deleteLeadStatus',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteLeadStatus({ id }); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
      }
    }
  );
// Update a lead status
export const putLeadStatusThunk = createAsyncThunk(
    'leadstatus/putLeadStatus',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putLeadStatus(param);
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
export const getByIdLeadStatusThunk = createAsyncThunk(
    'leadstatus/getByIdLeadStatus',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdLeadStatus(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);