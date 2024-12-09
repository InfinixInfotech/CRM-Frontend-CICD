import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSegmentPlan, getAllSegmentPlan, getByIdSegmentPlan, postSegmentPlan, putSegmentPlan } from "../apis/SegmentPlanApi";

export const postSegmentPlanThunk = createAsyncThunk(
    'segmentplan/postSegmentPlan',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postSegmentPlan(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllSegmentPlanThunk = createAsyncThunk(
    'segmentplan/getAllSegmentPlan',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllSegmentPlan();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const deleteSegmentPlanThunk = createAsyncThunk(
    'segmentplan/deleteSegmentPlan',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteSegmentPlan(id); // Assuming you are passing the id in the body
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
export const putSegmentPlanThunk = createAsyncThunk(
    'segmentplan/putSegmentPlan',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putSegmentPlan(param);
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
export const getByIdSegmentPlanThunk = createAsyncThunk(
    'segmentplan/getByIdSegmentPlan',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdSegmentPlan(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);