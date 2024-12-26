import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSalesOrder, getAllSalesOrder, getByIdSalesOrder, postSalesOrder, putSalesOrder } from "../apis/salesOrderApi";

export const postSalesOrderThunk = createAsyncThunk(
    'salesorder/postSalesOrder',
    async(param, {rejectWithValue})=>{
        try {
            console.log(param)
            const response = await postSalesOrder(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllSalesOrderThunk = createAsyncThunk(
    'salesorder/getAllSalesOrder',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllSalesOrder();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const deleteSalesOrderThunk = createAsyncThunk(
    'salesorder/deleteSalesOrder',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteSalesOrder(id); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
      }
    }
  );

export const putSalesOrderThunk = createAsyncThunk(
    'salesorder/putSalesOrder',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putSalesOrder(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);

export const getByIdSalesOrderThunk = createAsyncThunk(
    'salesorder/getByIdSalesOrder',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdSalesOrder(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }
);
