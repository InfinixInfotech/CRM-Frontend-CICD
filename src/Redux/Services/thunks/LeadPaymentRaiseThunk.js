import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteLeadPaymentRaise, getAllLeadPaymentRaise, getByIdLeadPaymentRaise, postLeadPaymentRaise, putLeadPaymentRaise } from "../apis/LeadPaymentRaiseApi";

export const postLeadPaymentRaiseThunk = createAsyncThunk(
    'leadpaymentraise/postLeadPaymentRaise',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postLeadPaymentRaise(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllLeadPaymentRaiseThunk = createAsyncThunk(
    'leadpaymentraise/getAllLeadPaymentRaise',
    async(params, {rejectWithValue})=>{
        try {
            const response = await getAllLeadPaymentRaise(params);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getByIdLeadPaymentRaiseThunk = createAsyncThunk(
    'leadpaymentraise/getByIdLeadPaymentRaise',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getByIdLeadPaymentRaise(param);
            if (response?.success) {
                return response.data;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
        }
    }

);


export const deleteLeadPaymentRaiseThunk = createAsyncThunk(
    'leadpaymentraise/deleteLeadPaymentRaise',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteLeadPaymentRaise(id); // Assuming you are passing the id in the body
        if (response?.success) {
          return response; // Return the successful response data
        }
        return rejectWithValue(response?.message || 'Failed to delete lead status');
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while deleting lead status');
    }
}
);

export const putLeadPaymentRaiseThunk = createAsyncThunk(
    'leadpaymentraise/putLeadPaymentRaise',
    async(param, {rejectWithValue}) => {
        try {
            const response = await putLeadPaymentRaise(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to update lead status');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while updating lead status');
        }
    }
);
