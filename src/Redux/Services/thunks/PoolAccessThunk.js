import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPoolAccess, DeletePoolAccess, getAllPoolAccess, UpdatePoolAccess } from "../apis/PoolAccessApi";
// import { deleteSegmentPlan, getAllSegmentPlan, getByIdSegmentPlan, postSegmentPlan, putSegmentPlan } from "../apis/SegmentPlanApi";

export const createPoolAccessThunk = createAsyncThunk(
    'poolAccess/createPoolAccess',
    async(param, {rejectWithValue})=>{
        try {
            const response = await createPoolAccess(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllPoolAccessThunk = createAsyncThunk(
    'poolAccess/getAllPoolAccess',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllPoolAccess();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const DeletePoolAccessThunk = createAsyncThunk(
    'poolAccess/DeletePoolAccess',
    async (id, { rejectWithValue }) => {
      try {
        const response = await DeletePoolAccess(id); // Assuming you are passing the id in the body
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
export const UpdatePoolAccessThunk = createAsyncThunk(
    'poolAccess/UpdatePoolAccess',
    async(param, {rejectWithValue}) => {
        try {
            const response = await UpdatePoolAccess(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

// // Get lead status by ID
// export const getByIdSegmentPlanThunk = createAsyncThunk(
//     'segmentplan/getByIdSegmentPlan',
//     async(param, {rejectWithValue}) => {
//         try {
//             const response = await getByIdSegmentPlan(param);
//             if (response?.success) {
//                 return response.data;
//             }
//             return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
//         } catch (error) {
//             return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
//         }
//     }
// );