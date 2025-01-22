import { createSlice } from "@reduxjs/toolkit";
import { GetLeadByMobileOrLeadIdThunk } from "../Services/thunks/GetLeadByMobileOrLeadIdThunk";

const GetLeadByMobileOrLeadIdUrlReducer = createSlice({
  name: "GetLeadByMobileOrLeadId",
  initialState: {
    data: null, // Default to null for object-based API response.
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLeadByMobileOrLeadIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetLeadByMobileOrLeadIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetLeadByMobileOrLeadIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred.";
      });
  },
});

export default GetLeadByMobileOrLeadIdUrlReducer.reducer;
