import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSegmentList, getAllSegmentList, getByIdSegmentList, postSegmentList, putSegmentList  } from "../apis/SegmentListApi";


export const postSegmentListThunk = createAsyncThunk(
    'segmentlist/postSegmentList',
    async(param, {rejectWithValue})=>{
        console.log(param)
        try {
            const response = await postSegmentList(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllSegmentListThunk = createAsyncThunk(
    'segmentlist/getAllSegmentList',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllSegmentList();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

// Delete a lead status
export const deleteSegmentListThunk = createAsyncThunk(
    'segmentlist/deleteSegmentList',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteSegmentList(id); // Assuming you are passing the id in the body
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
export const putSegmentListThunk = createAsyncThunk(
    'segmentlist/putSegmentList',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putSegmentList(param);
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
export const getByIdSegmentListThunk = createAsyncThunk(
    'segmentlist/getByIdSegmentList',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdSegmentList(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);