import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteGroups, getAllGroups, getByIdGroups, postGroups, putGroups } from "../apis/GroupsApi";

export const postGroupsThunk = createAsyncThunk(
    'groups/postGroups',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postGroups(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
   

export const getAllGroupsThunk = createAsyncThunk(
    'groups/getAllGroups',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllGroups();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

// Delete a lead status
export const deleteGroupsThunk = createAsyncThunk(
    'groups/deleteGroups',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteGroups(id); // Assuming you are passing the id in the body
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
export const putGroupsThunk = createAsyncThunk(
    'groups/putGroups',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putGroups(param);
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
export const getByIdGroupsThunk = createAsyncThunk(
    'groups/getByIdGroups',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdGroups(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);