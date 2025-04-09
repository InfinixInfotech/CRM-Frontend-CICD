import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getFollowupDetailsFilterTillDate } from "../apis/FollowUpTillDateApi";
import { getFollowupDetailsFilterTillDateData } from "../apis/FollowUpTillDateDataApi";

export const getFollowUpDetailsFilterTillDateDataThunk = createAsyncThunk(
    'followuptilldatedata/getFollowupDetailsFilterTillDateData',
    async(param, {rejectWithValue}) => {
        try {
            const response = await getFollowupDetailsFilterTillDateData(param);
            if (response?.success) {
                return response;
            }
            return rejectWithValue(response?.message || 'Failed to fetch lead by ID');
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching lead by ID');
        }
    }
);