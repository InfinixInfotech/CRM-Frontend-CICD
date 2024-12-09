import { createAsyncThunk } from "@reduxjs/toolkit";
import { postDepartment, deleteDepartment, getAllDepartment, getByIdDepartment,putDepartment } from "../apis/DepartmentApi";

export const postDepartmentThunk = createAsyncThunk(
    'department/postDepartment',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postDepartment(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllDepartmentThunk = createAsyncThunk(
    'department/getAllDepartment',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllDepartment();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const deleteDepartmentThunk = createAsyncThunk(
    'department/deleteDepartment',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteDepartment(id); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
      }
    }
  );

export const putDepartmentThunk = createAsyncThunk(
    'department/putDepartment',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putDepartment(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

export const getByIdDepartmentThunk = createAsyncThunk(
    'department/getByIdDepartment',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdDepartment(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);