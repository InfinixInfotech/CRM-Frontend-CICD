import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetLeadByMobileOrLeadIdApi } from "../apis/GetLeadByMobileOrLeadIdApi";

export const GetLeadByMobileOrLeadIdThunk = createAsyncThunk(
  "GetLeadByMobileOrLeadId/fetch",
  async (param, { rejectWithValue }) => {
    try {
      const response = await GetLeadByMobileOrLeadIdApi(param);
      if (response?.success) {
        return response.data; // Modify if API structure is different.
      }
      return rejectWithValue(
        response?.message || "Failed to fetch lead status by ID"
      );
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while fetching lead status by ID"
      );
    }
  }
);
